Ext.define('TreeComboJack', {
    extend : "Ext.form.field.Picker",
    alias : 'widget.treecombojack',
    labelSeparator: '',
    allowBlank: true,
    triggers: {
  		clear: {
  			cls: 'x-form-clear-trigger', weight: 1, hidden: true,
  			handler: function() {
  				this.reset();
  				this.getTriggers().clear.hide();
  				this.getTriggers().picker.show();
  			}
  		},
    },
    listeners: {
    	expand: function() {
    		var me = this;
    		let tree = me.picker;
    		tree.collapseAll();
    		let value = me.getValue().split(',');
    		if(value.length == 0) {
    			return;
    		}
    		tree.getRootNode().cascadeBy(function (s) {
    			if(s.data.root == false && s.data.leaf == false) {
    				s.data.children.forEach(c => {
    					if(_.includes(value, c.id + '')) {
    						s.expand();
    						return false;
    					}
    				})
    			}
    		});
    	},
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
            fieldLabel : self.allowBlank == true ? self.fieldLabel : (self.fieldLabel == undefined ? '' : self.fieldLabel + '<span style = "color:red;">*</span>'),
            labelWidth : self.labelWidth
        });
        self.callParent();
    },
    createPicker : function() {
        var self = this;
        self.picker = new Ext.tree.Panel({
            height : 400, autoScroll : true, floating : true, resizable: false, focusOnToFront : false, shadow : true, ownerCt : this.ownerCt,
            useArrows : true, store : self.store, root: self.root, anyMatch: true, multiSelect : true, canSelectFolders: true, rootVisible : false,
            dockedItems: [
               {xtype: 'toolbar', dock: 'top', hidden: false, padding: 2, layout: 'fit',
            	   items: [
        	           {xtype: 'metext', emptyText: 'Search...',
							listeners : {
								change: function() {
									store  = this.up('panel').getStore();
									var searchTxt = this.getValue();
									if (searchTxt != '') {					
										var	reSearchTxt = new RegExp(searchTxt, 'i');				
										self.filterCustom(store, reSearchTxt);
									} else {
										self.clearFilterCustom();
									}
								}
							},
						},
					]
		        }
	        ],
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
    	let me = this;
    	record.set('checked', !record.get('checked'));
    	if (record.data.leaf == false) {
    		if (record.data.checked == true) {
    			record.set('expanded', true);
    		}
    		var checked = record.data.checked;
    		record.cascade(function(s) {
    			s.set('checked', checked);
    		});
    	}
    	if (record.data.checked == false) {
    		me.setParentNodeCustom(record, false);
    	} else {
    		me.setParentNodeCustom2(record);
    	}
    	let rawValue = me.getRawValue();
    	me.setRawValue(rawValue);
    	if(rawValue == '') {
    		me.getTriggers().clear.hide();
    		me.getTriggers().picker.show();
		}else {
			me.getTriggers().clear.show();
			me.getTriggers().picker.hide();
		}
    },
    setParentNodeCustom: function(node, checked) {
    	let me = this;
    	if (node.parentNode != undefined) {
    		if(checked == true) {
    			Ext.each(node.parentNode.childNodes, function(s) {
        			if (s.data.checked == false) {
        				checked = false;
        			}
        		})
    		}
    		node.parentNode.set('checked', checked)
    	}
    },
    setParentNodeCustom2: function(node) {
    	let me = this;
    	if (node.parentNode != undefined) {
    		var checked = true;
    		Ext.each(node.parentNode.childNodes, function(item) {
    			if (item.data.checked == false) {
    				checked = false;
    			}
    		})
    		node.parentNode.set('checked', checked);
    	}
    },
    reset: function() {
    	let me = this;
    	if (me.picker != undefined) {
    		let records = me.picker.getChecked();
	    	Ext.each(records, function(item) {
	    		item.set('checked', false);
			})
    	}
    	me.setRawValue();
    },
    setValue: function (value) {
    	var me = this;
    	if (me.picker == undefined) {
    		me.expand();
    		me.collapse();
    	}
    	value = Common.isString(value) ? value.replaceAll(' ', '') : value + '';
    	let arrayId = value.split(',');
    	me.picker.store.root.cascade(function(s) {
    		if(arrayId.includes(s.data.id.toString())) {
    			s.set('checked', true);
    			if (s.data.leaf == false) {
    				let checked = s.data.checked;
    				s.cascade( function() {
    					s.set('checked', checked);
    				});
    			}
    			if (s.data.checked == true) {
    				me.setParentNodeCustom2(s);
    			}
    		}
    	});
		me.setRawValue(me.getRawValue());
    },
    getValue: function () {
    	let me = this;
    	let result = [];
    	if (this.picker != undefined) {
    		me.picker.store.root.cascade(function(s) {
    			if(s.data.leaf == true && s.data.checked == true) {
    				result.push(s.data.id);
    			}
    		})
    	}
        return result.toString();
    },
    getRawValue: function () {
    	let me = this;
    	let result = [];
    	if (this.picker != undefined) {
    		me.picker.store.root.cascade(function(s) {
    			if(s.data.leaf == true && s.data.checked == true) {
    				result.push(s.data.text);
    			}
    		})
    	}
        return _
        	.chain(result)
        	.join(', ')
        	.value();
    },
    clearFilterCustom: function() {
    	this.picker.store.root.cascade(function() {
			this.set('visible', true)
    	});
    },
    filterCustom: function(store, value) {
    	var me = this;
    	store.root.cascade(function() {
    		if (this.data.id != 'root') {
    			this.set('visible', false)
    		}
    	});
    	store.root.cascade(function() {
    		if (this.data.text.match(value) != null) {
    			this.set('visible', true)
    			me.setParentNodeVisibleCustom(this, true);
    		}
    	});
    },
    setParentNodeVisibleCustom: function(node, checked) {
    	var me = this;
    	if (node.parentNode != undefined) {
    		node.parentNode.set('visible', checked)
    		me.setParentNodeVisibleCustom(node.parentNode, checked);
    	}
    },
    getObjectChecked: function(){
    	var result = [];
    	var me = this;
    	if (this.picker != undefined) {
    		var value = me.getRawValue() == me.defaultText ? '' : me.getRawValue();
    		value = value.replaceAll(' ', '');
    		var arrayId = value.split(',');
    		Ext.each(arrayId, function(item) {
    			me.picker.store.root.cascade(function() {
    				if (this.data.text.replaceAll(' ', '') == item) {
    					result.push({
    						id: this.data.id,
    						text: this.data.text
    					});
    				}
    			})
    		})
    	}
        return result;
    }
});