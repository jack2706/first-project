Ext.define('ext.view.index', {
	alias : 'widget.index',
	extend : 'Ext.form.Panel',
	id: 'PLC-mainPanelID',
	width: '100%',	
	border: false,
	autoScroll: false,
	minWidth: 1280,
	layout : {
		type: 'border'             
	},
	initComponent : function() {
		
		var me = this;
		
		let projectName = `Lucy's library`;
		var caretIcon = '<i class="fa fa-caret-right" style="margin: 0px 10px 0px 10px;"></i>';
        var homeIcon = '<i class="fa fa-home" style="margin-right: 10px;"></i>';
        var userIcon = '<i class="fa fa-user-circle-o" style="margin-right: 10px; z-index: 100000;"></i>';

        var topMainMenu = Ext.create('Ext.toolbar.Toolbar', {
        	flex: 1,
        	ui: 'mainMenu',
        	cls: 'mainMenu',
    	    dock: 'top', 
    	    border: false,
    	    padding: '0 0 0 30',
    	    width: null,
            layout: {
        		overflowHandler: 'menu',
    		},
    		listeners: {
                afterrender: function(toolbar) {
                	var layout = toolbar.getLayout(),
                    overflowHandler = layout.getOverflowHandler(),
                    menu = overflowHandler && overflowHandler.type == 'menu' ? overflowHandler.menu : null;
	                if(menu) {
	                    menu.addCls('menu-sub-overflowHandler');
	                }
                },
            },
    	    items: [
    	        {text: 'Basic Information Management', ui: "buttonMenu", minWidth: 90, cls: 'menu-a',
    	        	menu: {
    	        		xtype: 'menu', layout : 'column',  plain: true, cls: 'menu-sub', 
    	        		listeners: {
    	        			'click': function( menu, e, eOpts){
    	        				menu.hide();
    	        				$('.menu-sub-overflowHandler').css('visibility', 'hidden');
    	        			},
    	        		},
	        			items: [
							{xtype: 'buttongroup', columns: 1, title: 'Test Administration',
							    items: [
							       
							    ]
							},
	        			]
        			}
    	        },
	        ]
    	});
        
        var pagePath = Ext.widget('medisplayfield', {
        	fieldStyle: 'color: #e4e4e4; font-size: 11px;',
        	height: 33,
        });
        var loginInfo = Ext.widget('label', {
        	margin: '5 0 0 30',
        	style: 'color: #fff;',
        	minWidth: 200,
        	text: 'Felix (PMH Campus)',
        });
        var topMenuPanel = Ext.create('Ext.panel.Panel', {
			width : '100%', 
			border : false, 
			region: 'north',
			bodyStyle: 'background: rgb(63, 100, 181);',
			bodyPadding: '10 10 3 10',
			layout: 'hbox',
			items: [
				 {xtype: 'label', text: 'ICMS', margin: '5 0 15 0', style: 'color: white;font-size: 35px;font-weight: 100;font-family: Impact;',
					 tooltip: {
						 anchor: 'top',
						 trackMouse: true,
						 html: '',
						 listeners : {
							 beforeshow: function updateTipBody(tip) {
								 tip.update(projectName);
							 }
						 }
					 }
				 },
				 topMainMenu,
				 loginInfo,
	        ],
	        listeners: {
	            afterrender: function() {
	                Ext.each(this.items.items, function (field) {
	                    Ext.create('Ext.tip.ToolTip', Ext.applyIf(field.tooltip, {target: field.getEl()}));
	                });
	            }
	        },
	        fbar: {
	            layout: 'fit', cls:'wrap-auto broad-site', style: 'background: #36589E;', padding: '0 15', items: [pagePath]
	        }
		});
        
        var linkPopup = Ext.create('ext.view.common.popup.LinkPopup');
        var systemConfigPopup = Ext.create('ext.view.common.popup.systemConfigPopup');
        var studentPopup = Ext.create('ext.view.common.popup.StudentPopup');
        var employeePopup = Ext.create('ext.view.common.popup.EmployeePopup');
        
		var leftMenuPanel = Ext.create('Ext.toolbar.Toolbar', {
			width: 64, 
			height: '100%', 
			dock: 'top', 
			layout: 'vbox', 
			region: 'west',
			split: false, 
			collapsible: false, 
			padding: '2 0',
    	    defaults: {
    	        scale: 'medium', 
    	        iconAlign: 'top'
    	    },
    	    items: [
//				{xtype: 'button', scale: 'medium', width: '100%', overCls: '', focusCls: '', iconCls: 'fas fa-home', cls: 'leftMenuIcon', text: 'HOME'},
//				{xtype: 'button', scale: 'medium', width: '100%', overCls: '', focusCls: '', iconCls: 'fas fa-bus', cls: 'leftMenuIcon', text: 'SHUTTLE'},
//				{xtype: 'button', scale: 'medium', width: '100%', overCls: '', focusCls: '', iconCls: 'fas fa-cog', cls: 'leftMenuIcon', text: 'SYSTEM'},
				{xtype: 'button', scale: 'medium', width: '100%', overCls: '', focusCls: '', iconCls: 'fas fa-reply-all', cls: 'leftMenuIcon', text: 'LINK',
					handler: function() {
						linkPopup.reloadPopup();
					}
				},
				{xtype: 'button', scale: 'medium', width: '100%', overCls: '', focusCls: '', iconCls: 'fas fa-gear', cls: 'leftMenuIcon', text: 'SYSTEM',
					handler: function() {
						systemConfigPopup.reloadPopup();
					}
				},
				{xtype: 'button', scale: 'medium', width: '100%', overCls: '', focusCls: '', iconCls: 'fas fa-sign-out-alt', cls: 'leftMenuIcon', text: 'LOGOUT',
					handler: function() {
						logout();
					}
				},
				{xtype: 'button', scale: 'medium', width: '100%', overCls: '', focusCls: '', iconCls: 'fas fa-bus', cls: 'leftMenuIcon', text: 'Student',
					handler: function() {
						studentPopup.reloadPopup();
					}
				},
				{xtype: 'button', scale: 'medium', width: '100%', overCls: '', focusCls: '', iconCls: 'fas fa-bus', cls: 'leftMenuIcon', text: 'Employee',
					handler: function() {
						employeePopup.reloadPopup();
					}
				},
            ]
    	});

		var mainPanel = Ext.create('Ext.TabPanel',{
			width: '100%', 
			height: '100%', 
			region: 'center', 
			id: 'tabWrap',
			border: false, 
			activeTab: 0, 
			split: false, 
			collapsible: false, 
			tabPosition: 'bottom', 
			items: [],
			tabBar: {
			    ui: "tabMain"
			},
		    
			defaults: {
				tabConfig: {
					ui: "tabMain"
			    }
			},
            listeners: {
                tabchange: function(tabPanel, newCard, oldCard){
                	pagePath.setValue(newCard.pagePath);
                },
                beforeremove: function (panel, item, eOpts) {
                	if(panel.items.length == 1) {
                		pagePath.setValue();
                	}
                }
            }
		});
		
		this.items = [topMenuPanel, leftMenuPanel, mainPanel];
		this.callParent(arguments);
		
		init();
		async function init() {
			try {
        		let json = await getDataAjax('/main/getMenuList.json', {});
				let dataToRecursive = prepareDataToRecursive(json.data);
				let root = {
					items: []
			    };
	    		buildComponent(dataToRecursive, root.items, 0);
	    		topMainMenu.removeAll();
				topMainMenu.add(root.items);
				unMask();
        	}catch(e) {
        		handleException(e);
        	}
		}
		
		function checkTimeout() {
			let deferred = new Ext.Deferred();
			Ext.Ajax.request({
				url: CONTEXT_PATH + '/main/checkTimeout.json',
				params : {},
				success : function(response) {
					if(checkAjaxSessionTimeOut(response)) {
						redirectedWhenSessionTimeOut()
					}
					deferred.resolve();
				}
			});
			return deferred.promise;
		}
		
		async function menuSelect(me) {
			let tabItems = mainPanel.items.items;
    		for(let i = 0; i < tabItems.length; i++) {
    			if(tabItems[i].name == me.name) {
    				mainPanel.setActiveTab(i);
    				return;
    			}
    		}
			await checkTimeout();
			let item = {
				title: me.text, name: me.name, closable: true, border: false, xtype: 'panel', layout: 'fit', pagePath: me.pagePath,
				items: [Ext.create(me.name, {
					writeAuth: me.writeAuth
				})]
			};
			mainPanel.setActiveTab(item);
		}
		
		function buildComponent(data, items, parentCode) {
			data.forEach(s => {
				if(s.parentCode == parentCode) {
					let self = getItemByLevel(s);
					items.push(self);
					buildComponent(data, s.level == 1 ? self.menu.items: self.items, s.code);
				}
				if(s.level == 3) {
					return;
				}
			})
		}
		function getItemByLevel(info) {
			switch(info.level) {
				case 1: 
					return {
						text: info.name, ui: "buttonMenu", minWidth: 90, cls: 'menu-a',
						menu: {
							xtype: 'menu', layout: 'column',  plain: true, cls: 'menu-sub', 
							listeners: {
								'click': function( menu, e, eOpts){
									menu.hide();
									$('.menu-sub-overflowHandler').css('visibility', 'hidden');
								}
							},
							items: []
						}
					};
					break;
				case 2: 
					return {xtype: 'buttongroup', cls: 'wrap-auto menu-group', border: false, columns: 1, title: info.name, items: []};
					break;
				case 3: 
					return {
						xtype: 'button', text: info.name, iconCls: 'fa fa-angle-right', minWidth: 230, scale: 'small', 
						style: 'display: block;', name: info.url, pagePath: info.pagePath, items: [],
						handler: function() {
							menuSelect(this);
						}
					}
					break;
			}
		}
		function prepareDataToRecursive(data) {
			data.lv3.forEach(s => {
				let parent = _(data.lv2)
					.find(a => a.menuCode == s.parentMenuCode);
				let grandpa = _(data.lv1)
					.find(a => a.menuCode == parent.parentMenuCode);
				s.pagePath = `${homeIcon}${grandpa.menuName}${caretIcon}${parent.menuName}${caretIcon}${s.menuName}`;
			})
			let returnData = [];
			returnData = returnData.concat(
				_(data.lv1)
				.map(s => {
					return {
						code		: s.menuCode,
						name		: s.menuName,
						parentCode	: 0,
						level		: 1
					}
				})
				.value()
			);
			returnData = returnData.concat(
				_(data.lv2)
				.map(s => {
					return {
						code		: s.menuCode,
						name		: s.menuName,
						parentCode	: s.parentMenuCode,
						level		: 2
					}
				})
				.value()
			);
			returnData = returnData.concat(
				_(data.lv3)
				.map(s => {
					return {
						code		: s.menuCode,
						name		: s.menuName,
						parentCode	: s.parentMenuCode,
						level		: 3,
						url			: s.menuUrl,
						writeAuth	: s.writeAuth,
						pagePath	: s.pagePath
					}
				})
				.value()
			);
			return returnData;
		}
		
		function logout() {
			window.location.href = CONTEXT_PATH + '/Logout.kps';
		}
		
//		mainPanel.add({xtype: 'panel', title: 'Register Test Framework', closable: true, border : false, layout: 'fit', 
//        	name : 'ext.view.serviceSetting.categoryManagement.CategoryManagement',
//        	pagePath: homeIcon + 'Basic Information Management' + caretIcon + 'Test Administration' + caretIcon + 'Register Test Framework',
//        	items: [Ext.create('ext.view.serviceSetting.categoryManagement.CategoryManagement', {writeAuth: true, getAuth: true})]
//        });
//		pagePath.setValue(homeIcon + 'Basic Information Management' + caretIcon + 'Test Administration' + caretIcon + 'Register Test Framework');
		
		
//		End
	}
});

