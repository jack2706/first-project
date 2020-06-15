Ext.define("TreeComboSubjectMulti", {
    extend : "Ext.form.field.Picker",
    alias : 'widget.treecombosubjectmulti',
    defautText: '',
    labelSeparator: '',
    allowBlank: true,
    triggers: {
  		clear: {
  			cls: 'x-form-clear-trigger', weight: 1, hidden: true,
  			handler: function() {
  				this.reset();
  				this.getTriggers().clear.hide();
  			}
  		},
    },
    listeners:{
    	afterrender: function() {
    		var tree = this;
    		var tooltip = {
				anchor: 'top',
				trackMouse: true,
				html: '',
				listeners : {
					beforeshow: function updateTipBody(tip) {
						tip.update(tree.rawValue);
					}
				}
    		}
    		Ext.create('Ext.tip.ToolTip', Ext.applyIf(tooltip, {target: this.getEl()}));
    	}
    },
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
            height : 400, autoScroll : true, floating : true, resizable: false, focusOnToFront : false, shadow : true, ownerCt : this.ownerCt,
            useArrows : true, store : self.store, root: self.root, anyMatch: true, multiSelect : true, canSelectFolders: true, rootVisible : false,
            listeners:{
                scope:this,
                itemclick:  function(view, record, item, index, e, eOpts) {
					this.itemTreeClick(view, record, item, index, e, eOpts)
				},
				checkchange: function(node, checked, eOpts) {
					node.set('checked',!checked);
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
                picker.setXY(picker.getAlignToXY(me.triggerWrap, me.pickerAlign, me.pickerOffset));
                isAbove = picker.el.getY() < me.inputEl.getY();
                me.bodyEl[isAbove ? 'addCls' : 'removeCls'](me.openCls + aboveSfx);
                picker.el[isAbove ? 'addCls' : 'removeCls'](picker.baseCls + aboveSfx);
            }
        }
    },
    itemTreeClick: function(view, record, item, index, e, eOpts) {
    	record.set('checked', !record.get('checked'));
		var me = this;
		var records = this.picker.getChecked();
		var value = me.defaultText;
		Ext.each(records, function(item) {
			if (value == me.defaultText) {
				value = item.data.text;
			} else {
				value = value + ', ' + item.data.text;
			}
		})
		me.setRawValue(value);
		if (value == me.defaultText) {
			this.getTriggers().clear.hide();
		} else {
			this.getTriggers().clear.show();
		}
	},
	reset: function() {
		if (this.picker != undefined) {
	    	var records = this.picker.getChecked();
	    	Ext.each(records, function(item) {
	    		item.set('checked', false);
			})
    	}
		this.setRawValue(this.defaultText);
		this.rawValue = '';
	},
	setValue: function (value) {
		var me = this;
		if (me.store.root != undefined) {
			if (me.picker == undefined) {
				me.expand();
				me.collapse();
			}
			me.reset();
			if(Common.isString(value)) {
	    		value = value.replaceAll(' ', '');
	    	}
	    	var arrayId = Common.isNumber(value) ? [value.toString()] : value.split(',');
	    	for (var i=0;i<arrayId.length;i++) {
	    		this.picker.store.root.cascade( function(){
	    			if (this.data.id.toString() == arrayId[i]){
	    				this.set('checked', true);
	    			}
	    		});
	    	}
	    	var value = me.defaultText;
	    	var records = this.picker.getChecked();
			Ext.each(records, function(item) {
				if (value == me.defaultText) {
					value = item.data.text;
				} else {
					value = value + ', ' + item.data.text;
				}
			})
			me.setRawValue(value);
			if (value == me.defaultText) {
				this.getTriggers().clear.hide();
			} else {
				this.getTriggers().clear.show();
			}
		}
	},
	getValue: function () {
		var result = '';
    	var me = this;
    	if (this.picker != undefined) {
	    	var records = this.picker.getChecked();
	    	Ext.each(records, function(item) {
				if (result == '') {
					result = item.data.id;
				} else {
					result = result + ',' + item.data.id;
				}
			})
    	}
        return result;
	},
	setDefaultText: function(text) {
		this.defaultText = text;
		this.setRawValue(this.defaultText);
	},
});