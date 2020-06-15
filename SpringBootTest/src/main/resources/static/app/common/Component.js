
Ext.define('component.MeText', {
	extend : 'Ext.form.field.Text',
	labelSeparator: '',
	alias : 'widget.metext',
    width : "100%",
	initComponent : function() {
		var me = this;
        this.afterLabelTextTpl = new Ext.XTemplate(
            '<tpl if="this.allowBlank()">',
                '<span style = "color:red;">*</span>',
            '</tpl>',
            {disableFormats: true,
                allowBlank: function(){
                   return me.allowBlank === false;
                }
            }
        );
		this.callParent(arguments);
	}
});
Ext.define('component.MeEmail', {
	extend: 'Ext.form.field.Text',
	labelSeparator: '',
	alias: 'widget.meemail',
    width: '100%',
    vtype: 'email',
	initComponent: function() {
		let me = this;
        this.afterLabelTextTpl = new Ext.XTemplate(
            '<tpl if="this.allowBlank()">',
                '<span style = "color:red;">*</span>',
            '</tpl>',
            {disableFormats: true,
                allowBlank: function() {
                   return me.allowBlank === false;
                }
            }
        );
		this.callParent(arguments);
	},
	listeners: {
		change: function() {
			this.setValue(this.value.trim())
		}
	}
});

Ext.define('component.MeDate', {
	extend : 'Ext.form.field.Date',
	alias : 'widget.medate',
	labelSeparator: '',
	format : 'Y/m/d',
	initComponent : function() {
		var me = this;
        this.afterLabelTextTpl = new Ext.XTemplate(
            '<tpl if="this.allowBlank()">',
                '<span style = "color:red;">*</span>',
            '</tpl>',
            {disableFormats: true,
                allowBlank: function(){
                   return me.allowBlank === false;
                }
            }
        );
		this.callParent(arguments);
	}
});

Ext.define('component.MeComboBox', {
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.mecombo',
	labelSeparator: '',
    width : "100%",
	initComponent : function() {
		var me = this;
        this.afterLabelTextTpl = new Ext.XTemplate(
            '<tpl if="this.allowBlank()">',
                '<span style = "color:red;">*</span>',
            '</tpl>',
            {disableFormats: true,
                allowBlank: function(){
                   return me.allowBlank === false;
                }
            }
        );
		this.callParent(arguments);
	},
	checkChangeEvents : Ext.isIE ? 
        ['change', 'propertychange', 'keyup'] :
        ['change', 'input', 'textInput', 'keyup', 'dragdrop']
});

Ext.define('component.MeTextArea', {
	extend : 'Ext.form.TextArea',
	alias : 'widget.mearea',
	labelSeparator: '',
	initComponent : function() {
		var me = this;
        this.afterLabelTextTpl = new Ext.XTemplate(
            '<tpl if="this.allowBlank()">',
                '<span style = "color:red;">*</span>',
            '</tpl>',
            {disableFormats: true,
                allowBlank: function(){
                   return me.allowBlank === false;
                }
            }
        );
		this.callParent(arguments);
	}
});

Ext.define('component.MeDisplayfield', {
	extend : 'Ext.form.field.Display',
	alias : 'widget.medisplayfield',
	labelSeparator: '',
	initComponent : function() {
		this.callParent(arguments);
	}
});

Ext.define('component.MeNumber', {
	extend : 'Ext.form.field.Number',
	alias : 'widget.menumber',
	labelSeparator: '',
	width: '100%',
	hideTrigger: true,
	keyNavEnabled: false,
	mouseWheelEnabled: false,
	allowExponential: false,
//    decimalPrecision : 0,
	initComponent : function() {
		var me = this;
        this.afterLabelTextTpl = new Ext.XTemplate(
            '<tpl if="this.allowBlank()">',
                '<span style = "color:red;">*</span>',
            '</tpl>',
            {disableFormats: true,
                allowBlank: function(){
                   return me.allowBlank === false;
                }
            }
        );
		this.callParent(arguments);
	}
});

Ext.define('component.meMoney', {
	extend : 'Ext.form.field.Text',
	alias : 'widget.memoney',
	width: '100%',
	labelSeparator: '',
	enableKeyEvents: true,
	maskRe : /[0-9,]/,
	validateOnBlur : false, validateOnChange : true,
   	validator : function(value) {
    	var value = value;
    	var newValue = '';
		value = value.toString().replaceAll(/[^0-9]/g, '');
		newValue = Ext.util.Format.number(value, '0,000');
		this.setValue(newValue);
    	return true;
   	},
	initComponent : function() {
		var me = this;
        this.afterLabelTextTpl = new Ext.XTemplate(
            '<tpl if="this.allowBlank()">',
                '<span style = "color:red;">*</span>',
            '</tpl>',
            {disableFormats: true,
                allowBlank: function(){
                   return me.allowBlank === false;
                }
            }
        );
		this.callParent(arguments);
	}
});
Ext.define('component.MeCheckboxfield', {
	extend : 'Ext.form.field.Checkbox',
	labelSeparator: '',
	alias : 'widget.mecheckboxfield',
    width : '100%',
	initComponent : function() {
		var me = this;
        this.afterLabelTextTpl = new Ext.XTemplate(
            '<tpl if="this.allowBlank()">',
                '<span style = "color:red;">*</span>',
            '</tpl>',
            {disableFormats: true,
                allowBlank: function(){
                   return me.allowBlank === false;
                }
            }
        );
		this.callParent(arguments);
	}
});
Ext.define('component.meMoneys', {
	extend : 'Ext.form.field.Text',
	alias : 'widget.meMoney',
	labelSeparator: '',
	enableKeyEvents: true,
//	maskRe : /[0-9,]/,
//	validateOnBlur : false, validateOnChange : true,
//   	validator : function(value) {
//   		var newValue = '';
//    	if(value != null && value != '0') {
//    		value = value.toString().replaceAll(/[^0-9]/g, '');
//    		newValue = Ext.util.Format.number(value, '0,000');
//    	}
//    	this.setValue(newValue);
//    	return true;
//   	},
	listeners: {
		keyup:  function( f, e, eOpts ){ 
			var value = f.getValue();
        	var newValue = '';
        	if(value != null && value != '0') {
        		value = value.toString().replaceAll(/[^0-9]/g, '');
        		newValue = Ext.util.Format.number(value, '0,000');
        	}
        	f.setValue(newValue);
        }
        
	},
	initComponent : function() {
		this.callParent(arguments);
	}
});

Ext.define('component.mePhone', {
	extend : 'Ext.form.field.Text',
	alias : 'widget.mephone',
	width: '100%',
	labelSeparator: '',
	enableKeyEvents: true,
	maskRe : /[0-9.]/,
	validateOnBlur : false, validateOnChange : true,
   	validator : function(value) {
   		var newValue = '';
   		value = value.toString().replaceAll(/[^0-9]/g, '');
		if(value.length < 4) {
			newValue = value;
		}else if(value.length == 4) {
			newValue = value.substr(0, 4) + '-';
		}else if(value.length < 7) {
			newValue = value.substr(0, 4) + '-' + value.substr(4, value.length - 4);
		}else if(value.length == 7) {
			newValue = value.substr(0, 4) + '-' + value.substr(4, 3) + '-';
		}else if(value.length <= 11) {
			newValue = value.substr(0, 4) + '-' + value.substr(4, 3) + '-' + value.substr(7, value.length - 7);
		}else {
			newValue = value.substr(0, 4) + '-' + value.substr(4, 3) + '-' + value.substr(7, 4);
		}
    	this.setValue(newValue);
   		if((value.length > 0 && value.length < 10) || value.length > 11) 
   			return 'Phone Number must be 10 or 11 digit';
   		else 
   			return true;
   	},
   	listeners:  {
   		keydown: function(f, e) {
        	var lastValue = f.lastValue;
        	if(e.getKey() == e.BACKSPACE && lastValue.length > 0) {
            	if(lastValue.charAt(e.target.selectionEnd - 1) == '-') {
            		var position = e.target.selectionEnd;
            		lastValue = lastValue.replaceAt(position - 2, '-');
            		f.setValue(lastValue);
            		f.selectText(position - 2, position - 2);
            		e.preventDefault();
            	}
            }
        }
    },
	initComponent : function() {
		var me = this;
        this.afterLabelTextTpl = new Ext.XTemplate(
            '<tpl if="this.allowBlank()">',
                '<span style = "color:red;">*</span>',
            '</tpl>',
            {disableFormats: true,
                allowBlank: function(){
                   return me.allowBlank === false;
                }
            }
        );
		this.callParent(arguments);
	}
});

Ext.define('component.meTime', {
	extend : 'Ext.form.field.Text',
	alias : 'widget.metime',
	width: '100%',
	labelSeparator: '',
	enableKeyEvents: true,
	maskRe : /[0-9.]/,
	validateOnBlur : false, validateOnChange : true,
   	validator : function(value) {
   		var newValue = '';
   		value = value.toString().replaceAll(/[^0-9]/g, '');
		if(value.length < 2) {
			newValue = value;
		}else if(value.length == 2) {
			newValue = value.substr(0, 2) + ':';
		}else if(value.length < 4) {
			newValue = value.substr(0, 2) + ':' + value.substr(2, value.length - 2);
		}else if(value.length >= 4) {
			newValue = value.substr(0, 2) + ':' + value.substr(2, 2);
		}
    	this.setValue(newValue);
    	var check = true;
    	if(value.length == 4) {
    		var hours = parseInt(value.substr(0, 2));
    		var minute = parseInt(value.substr(2, 2));
    		if(hours > 23 || minute > 59) {
    			check = false;
    		}
    	}
   		if((value.length > 0 && value.length < 4) || check == false) 
   			return 'Time must be HH:mm';
   		else 
   			return true;
   	},
   	listeners:  {
   		keydown: function(f, e) {
        	var lastValue = f.lastValue;
        	if(e.getKey() == e.BACKSPACE && lastValue.length > 0) {
            	if(lastValue.charAt(e.target.selectionEnd - 1) == ':') {
            		var position = e.target.selectionEnd;
            		lastValue = lastValue.replaceAt(position - 2, '-');
            		f.setValue(lastValue);
            		f.selectText(position - 2, position - 2);
            		e.preventDefault();
            	}
            }
        }
    },
	initComponent : function() {
		this.callParent(arguments);
	}
});

Ext.define('component.MeButton', {
	extend : 'Ext.button.Button',
	alias : 'widget.mebutton',
	initComponent : function() {
		this.addClsWithUI(this.overCls);
		this.callParent(arguments);
	},
	onMouseLeave : function(e) {
	}
});

Ext.define('component.meStore', {
	extend : 'Ext.data.Store',
	alias : 'widget.mestore',
	listeners: {
		load: async function(store, record, success, opts){
			try {
				await handleCheckSessionLoadStore(store, record, success, opts);
				let data = Ext.decode(opts.getResponse().responseText);
				if(data.actionStatus == 'error') {
					showMessageBoxError(data.message);
				}
			}catch(e) {
		
			}
		}
    },
	initComponent : function() {
		this.callParent(arguments);
	}
});

Ext.define('component.meTreeStore', {
	extend : 'Ext.data.TreeStore',
	alias : 'widget.metreestore',
	initComponent : function() {
		this.callParent(arguments);
	}
});

Ext.define('component.MeGridPanel', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.megrid',
	cls: 'wrapper-table',
	bodyCls: 'wrapper-table-body tb-cell tb-cell-center',
	layout:{
        type:'fit',
        align:'stretch',
        pack:'start'
	},
	border: false,
    header: false,
	autoScroll : true,
	autoHeight : true,
    stripeRows : true,
    collapsible : true,
    preserveScrollOnRefresh : true,
    enableColumnMove  :true,
    enableColumnResize:true,
	width : "100%",
	minHeight: 100,
    viewConfig : {
        forceFit : true
    },
	initComponent : function() {
		this.callParent(arguments);
	}
});

Ext.define('component.MeWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.mewindow',
	layout: 'fit',
	width: 600,
	closeAction: 'hide',
	overflowY : 'hidden',
	overflowX : 'hidden',
	modal: true,
	maximizable : true,
	resizable : true,
	resizeHandles: 'w e',
	autoScroll: true,
	style: 'box-shadow: 0 0 16px rgba(0, 0, 0, 0.12), 0 16px 16px rgba(0, 0, 0, 0.24) !important;',
	bodyStyle: 'background: white;',
	listeners: {
	    'show': function() {
	    	if(this.lastBox.height > Ext.getBody().getViewSize().height) {
	    		this.setHeight(Ext.getBody().getViewSize().height);
	    	}
	    	
//            var dom = Ext.dom.Query.select('.x-mask');
//            Ext.each(dom, function(item) {
//            	var el = Ext.get(item);
//            	el.addCls('customWindow-Mask');
//            });
            if(this.defaultWidth != undefined) {
            	this.setWidth(this.defaultWidth);
            }
            this.center();
	    },
	    'hide': function() {
	    	
	    },
	},
	initComponent : function() {
		var me = this;
	    me.callParent(arguments);
//	    me.mon(Ext.getBody(), 'click', function(el, e) {
//            me.close(me.closeAction);
//        }, me, {
//            delegate: '.x-mask'
//        });
	}
});

Ext.define('Ext.ux.form.MultiFile', {
    extend: 'Ext.form.field.File',
    alias: 'widget.multifilefield',
    labelSeparator: '',
    buttonText: 'Browse...',
    msgTarget: 'side',
	allowBlank: false,
    initComponent: function () {
        var me = this;
        me.on('render', function () {
            me.fileInputEl.set({ multiple: 'multiple' });
        });
        me.callParent(arguments);
    },
    onFileChange: function (button, e, value) {
        var me = this,
            upload = me.fileInputEl.dom,
            files = upload.files,
            names = [];
 
        if (files.length > 0) {
        	value = _(files)
        		.map(s => s.name)
        		.join(', ')
        }
        me.callParent(arguments);
    }
});
Ext.define('Ext.ux.form.MeFile', {
    extend: 'Ext.form.field.File',
    alias: 'widget.mefile',
    labelSeparator: '',
    buttonText: 'Browse...',
    msgTarget: 'side',
    allowBlank: false,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    },
    onFileChange: function (button, e, value) {
        var me = this,
            upload = me.fileInputEl.dom,
            files = upload.files,
            names = [];
 
        if (files.length > 0) {
        	value = _(files)
        		.map(s => s.name)
        		.join(', ')
        }
        me.callParent(arguments);
    }
});
//regex: (/.(gif|jpg|jpeg|png)$/i)
//accept: 'image/*'

//regex: (/.(pdf)$/i)
//accept: 'application/pdf'

Ext.define('component.MePanelPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.mepanel',
	width: '100%',
	border: false,
	initComponent : function() {
		this.callParent(arguments);
	}
});

Ext.define('component.MeFieldSet', {
	extend : 'Ext.form.FieldSet',
	alias : 'widget.mefieldset',
	initComponent : function() {
		this.callParent(arguments);
	}
});
Ext.define('component.MeLabel', {
	extend : 'Ext.form.Label',
	alias : 'widget.melabel',
	margin: '7 0 0 0', 
	style: 'font-weight: 400',
	initComponent : function() {
		this.callParent(arguments);
	}
});
Ext.define('component.MeImage', {
    extend:  'Ext.Img',
    alias: 'widget.meimage',
    config: {
        fallbackImg: CONTEXT_PATH + '/resources/static/common/images/img/file_not_found.jpg'
    },
    onRender: function(){
        this.callParent(arguments);
        this.imgEl.on('error', this.onImageError, this);
    },
    onImageError: function(event, element, opts){
        this.setSrc(this.getFallbackImg());
    },
    onError : function(e) {
        this.detachListeners();
        this.setSrc(this.getFallbackImg());
        this.fireEvent('error', this, e);
    }
});

Ext.picker.Date.override({
    beforeRender: function() {
        this.clearBtn = new Ext.button.Button({
    		text: 'Clear',
            handler: this.clearDate,
            scope: this
    	});
        this.callOverridden(arguments);
    },
    initComponent: function() {
        var fn = function(){};
        var incmp = function(values, out){
        	Ext.DomHelper.generateMarkup(values.$comp.clearBtn.getRenderTree(), out);
        	fn(values, out);
        };
        if(this.renderTpl.length === undefined){
			fn = this.renderTpl.initialConfig.renderTodayBtn;
            this.renderTpl.initialConfig.renderTodayBtn = incmp;
        } else {
            fn = this.renderTpl[this.renderTpl.length-1].renderTodayBtn;
        	this.renderTpl[this.renderTpl.length-1].renderTodayBtn = incmp;
        }
        this.callOverridden(arguments);
	},
    finishRenderChildren: function () {
		this.clearBtn.finishRender();
		this.callOverridden(arguments);
    },
    clearDate: function(){
        this.fireEvent('select', this, '');
    }
});

Ext.define('component.MeRadioGroup', {
	extend : 'Ext.form.RadioGroup',
	alias : 'widget.meradiogroup',
	initComponent : function() {
		this.callParent(arguments);
	}
});

Ext.define('component.MeComboMulti', {
	extend : 'Ext.form.field.ComboBox',
	labelSeparator: '',
	alias : 'widget.mecombomulti',
    width : '100%',
    editable : false, 
    multiSelect: true,
	initComponent : function() {
		var me = this;
        this.afterLabelTextTpl = new Ext.XTemplate(
            '<tpl if="this.allowBlank()">',
                '<span style = "color:red;">*</span>',
            '</tpl>',
            {disableFormats: true,
                allowBlank: function(){
                   return me.allowBlank === false;
                }
            }
        );
		this.callParent(arguments);
	},
	triggers : {
  		clear : {
  			cls : 'x-form-clear-trigger', weight: 1, hidden: true,
  			handler : function() {
  				this.setValue();
  				this.getTriggers().clear.hide();
  			}
  		},
    },
    listeners: {
    	change: function(combo, value) {
			if(this.value.length > 0){
				this.getTriggers().clear.show();
			} else {
				this.getTriggers().clear.hide();
			}
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
	listConfig: {
        tpl: Ext.create('Ext.XTemplate',
        	'<li class="comboboxMulti">',
        		'<tpl for=".">',
        			'<div class="boundList x-boundlist-item" style="background:none;border:none;">',
        				'<span class="checkbox" style="display: inline-block; margin-right: 5px;" value={detailCode}></span>{codeName}',
        			'</div>',
        		'</tpl>',
        	'</li>'
        ),
    }
});
Ext.define('component.MeTabpanel', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.metabpanel',
	tabBar: {
	    ui: 'tabMain'
	},
	defaults: {
		tabConfig: {
			ui: 'tabMain'
	    }
	},
	initComponent : function() {
		this.callParent(arguments);
	}
});
