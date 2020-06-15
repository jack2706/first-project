Ext.define('ext.view.common.popup.systemConfigPopup', {
	extend : 'Ext.window.Window',			
	alias: 'widget.systemConfigPopup',
	layout : 'border',
	title:'System Config',
    width: 960,
    height: 680,
    modal : true,
	resizable : false,
	closable : true,
	closeAction: 'hide',
	overflowY : 'hidden',
	overflowX : 'hidden',
	requires:[
       //'ext.model.common.sybTreeCodeModel',
       //'ext.model.common.sybGeneralCodeModel'
    ],
    memberCode:0,
    reloadParent:function(){},
    resetPopup : function(){},
    reloadPopup : function(memberCodeList, titleHw){},
    memberCodeList:[],
	initComponent: function() {
		
		let me = this;
		
		let info;
		me.reloadPopup = function(studentInfo) {
			//info = studentInfo;
			//formInfo.reset();
			me.show();
			campusInformationComponent.reloadTab();
		}


//		var approvalLineComponent = Ext.create('ext.view.common.component.approvalLineComponent', {});
		var campusInformationComponent = Ext.create('ext.view.common.component.campusInformationComponent', {});
		var basicInfoMenu = Ext.create('Ext.menu.Menu', {
		    width: '100%',
		    floating: false,
		    plain: true,
		    border : false,
		    cls : 'systemConfigSubMenu',
		    padding: '10',
		    bodyPadding: '10 0 0',
			bodyStyle: 'background-color: #eaeaea;',
		    title : '<i class=\"fa fa-caret-right\"></i> Basic Information Inquiry',
		    items: [
	            {text: "<i class=\"fa fa-caret-right\"></i> Campus Information", cls : 'systemConfigSubMenu-item', activeCls : '',
	            	id : 'systemConfigSubMenu-campusInfo',
        		},
	            /*{text: '<i class=\"fa fa-caret-right\"></i> Couse/Level/Subject', cls : 'systemConfigSubMenu-item', activeCls : '',
        			id : 'systemConfigSubMenu-couseLevel',
	            },*/
            ],
            listeners: {

            	afterrender: function () {
            		var idFirst = "#" + this.getId();
            		$(idFirst).find(".systemConfigSubMenu-item:eq(0) a").addClass("x-menu-active");
                },
                click: function( menu, item, e, eOpts ) {
    				$(".systemConfigSubMenu-item a").removeClass("x-menu-active");
    				$("#" + item.getId()).find("a").addClass("x-menu-active");
                	var idPanel = item.getId();
                	if(idPanel == "systemConfigSubMenu-campusInfo"){
                		var item = formInfo.items.first();
	    				formInfo.remove(item, false);
                		formInfo.add(campusInformationComponent);
                	}
                }
            }
		});
		var approvalLineMenu = Ext.create('Ext.menu.Menu', {
		    width: '100%',
		    floating: false,
		    plain: true,
		    border : false,
		    cls : 'systemConfigSubMenu',
		    padding: '0 10',
		    bodyPadding: '10 0 0',
			bodyStyle: 'background-color: #eaeaea;',
		    title : '<i class=\"fa fa-caret-right\"></i> Approval Line',
		    items: [
	            {text: "<i class=\"fa fa-caret-right\"></i> Approval Line Appoint", cls : 'systemConfigSubMenu-item', activeCls : '',
	            	id : 'systemConfigSubMenu-approvalLine',
	            },
            ],
            listeners: {
                click: function( menu, item, e, eOpts ) {
    				$(".systemConfigSubMenu-item a").removeClass("x-menu-active");
    				$("#" + item.getId()).find("a").addClass("x-menu-active");
                	var idPanel = item.getId();
                	if(idPanel == "systemConfigSubMenu-approvalLine"){
                		var item = formInfo.items.first();
	    				formInfo.remove(item, false);
                		formInfo.add(approvalLineComponent);
                		approvalLineComponent.reloadTab();
                	}
                }
            }
		});
		var systemConfigMenu = Ext.create('Ext.form.Panel',{
			width : "25%",
			layout : 'vbox',
			bodyStyle: 'background-color: #eaeaea;',
			//border : false,
			//title : 'System Config',
			region : 'center',
			autoScroll:true,
			split: false,
			items: [{xtype: 'label', text: 'System Config', cls: 'systemConfigSubMenu-title', width: '100%'}, basicInfoMenu, approvalLineMenu],
		});
		
		var formInfo = Ext.create('Ext.form.Panel', {
			collapsible : true,
			border : false,
			header : false,
			layout : 'vbox',
			width : "75%",
			autoScroll : true,
			region : 'east',
			split : false,
            listeners: {
            },
			items : []
		});
		this.items = [systemConfigMenu, formInfo];
		this.callParent(arguments);
		

		formInfo.add(campusInformationComponent);
		
		/*--End--*/
	}
});
