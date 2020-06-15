Ext.define("TreeComboSubject", {
    extend : "Ext.form.field.Picker",
    alias : 'widget.treecombosubject',
    defautText: '',
	value: '',
	rawValue: '',
	labelSeparator: '',
	rootVisibleCustom: true,
	allowBlank: true,
	canSelectParent: true,
	initComponent : function() {
		var self = this;
		Ext.apply(self, {
			fieldLabel : self.allowBlank == true ? self.fieldLabel : self.fieldLabel + '<span style = "color:red;">*</span>',
			labelWidth : self.labelWidth
		});
		self.callParent();
	},
	createPicker : function() {
		var self = this;
		self.picker = new Ext.tree.Panel({
			height : 400,
			autoScroll : true,
			floating : true,
			resizable: false,
			focusOnToFront : false,
			shadow : true,
			ownerCt : this.ownerCt,
			useArrows : true,
			store : self.store,
			root: self.root,
			anyMatch: true,
			multiSelect : false,
			canSelectFolders: false,
			rootVisible : self.rootVisibleCustom,
			listeners:{
				scope:this,
				itemclick:  function(view, record, item, index, e, eOpts) {
					this.itemTreeClick(view, record, item, index, e, eOpts)
				},
			}
		});
		return self.picker;
	},
	alignPicker : function() {
		// override the original method because otherwise the height of the treepanel would be always 0
		var me = this, picker, isAbove, aboveSfx = '-above';
		if (this.isExpanded) {
			picker = me.getPicker();
			if (me.matchFieldWidth) {
				// Auto the height (it will be constrained by min and max width) unless there are no records to display.
				if (me.bodyEl.getWidth() > this.treeWidth){
					picker.setWidth(me.bodyEl.getWidth());
				} else picker.setWidth(this.treeWidth);
			}
			if (picker.isFloating()) {
				picker.alignTo(me.inputEl, "", me.pickerOffset);// ""->tl
				// add the {openCls}-above class if the picker was aligned above the field due to hitting the bottom of the viewport
				isAbove = picker.el.getY() < me.inputEl.getY();
				picker.setXY(picker.getAlignToXY(me.triggerWrap, me.pickerAlign, me.pickerOffset));
				me.bodyEl[isAbove ? 'addCls' : 'removeCls'](me.openCls + aboveSfx);
				picker.el[isAbove ? 'addCls' : 'removeCls'](picker.baseCls + aboveSfx);
			}
		}
	},
	itemTreeClick: function(view, record, item, index, e, eOpts) {
		var me = this;
		let canSelectParent = me.canSelectParent;
		if (record.data.id == '0' || (canSelectParent == false && record.data.leaf == false)) {
			me.setRawValue(record.data.id == '0' ? record.data.text : '');
			me.rawValue = '';
			me.value = '';
		} else {
			me.value = record.data.id;
			me.setRawValue(record.data.text);
			me.rawValue = record.data.text;
		}
		me.collapse();
	},
	reset: function() {
		this.setRawValue(this.defaultText);
		this.rawValue = '';
		this.value = '';
	},
	setValue: function (value) {
		var me = this;
		if (me.store.root != undefined) {
			if (me.picker == undefined) {
				me.expand();
				me.collapse();
			}
			me.reset();
			me.store.root.cascade(function() {
				if (this.data.id == value) {
					me.value = value;
					me.setRawValue(this.data.text);
					me.rawValue = this.data.text;
				}
			})
		}
	},
	getValue: function () {
		return this.value;
	},
	getRawValue: function () {
		return this.rawValue;
	},
	setDefaultText: function(text) {
		this.defaultText = text;
		this.setRawValue(this.defaultText);
	},
});