Ext.define('ext.view.counselService.newEnrolledStudent.component.ApprovalLinePopup', {
	extend: 'component.MeWindow',
	title: 'Approval Line Register',
	width: 1000,
	defaultWidth: 1000,
	layout: 'fit',
	bodyPadding: 5,
	reloadPopup: function() {},
	reloadParent: function() {},
	initComponent : function() {
		
		let me = this;
		
		me.reloadPopup = function() {
			me.show();
		}
		
		let btnSearch = Ext.widget('mebutton', {
	    	text: 'Search', 
	    	padding: '8 10', 
	    	margin: '0 0 0 5',
	    	iconCls: 'fa fa-search btn-icon', 
	    	handler: function() {
	    		getEmployeeList();
			}
	    });
		let formSearch = Ext.create('Ext.form.Panel', {
			width: '100%',
			border: false,
			padding: '5 0',
			layout: 'hbox',
	        items: [
		        {xtype: 'metext', flex: 1, labelWidth: 100, name: 'name', fieldLabel: 'Employee Name', margin: 0,
		        	listeners: {
		        		specialkey: function(f, e) {    
		                    if(e.getKey() == e.ENTER) {
		                    	getEmployeeList();
		                    }
		                }
		        	}
		        },
				btnSearch
	        ]
		});
		
		let gridColumnRegister = [
    		{text: 'No', width: 40, dataIndex: 'rowNo', align: 'center', sortable: false, menuDisabled: true,
    			renderer: function(value, metaData, record, row, col, store, gridView) {
					return ++row;
				}
    		},
    		{text: 'Position', width: 150, dataIndex: 'positionName', align: 'center', sortable: false, menuDisabled: true},
    		{text: 'Employee Name', flex: 1, dataIndex: 'memberName', align: 'center', sortable: false, menuDisabled: true},
    		{text: '', align: 'center', sortable: false, menuDisabled: true,
                renderer: function(value, metaData, record, row, col, store, gridView) {
                	return `<a href="#" action="delete" class="fa fa-trash grid-icon"> Delete</a>`;
           		}
	        }
    	]
		let gridColumnLoad = [
    		{text: 'No', width: 40, dataIndex: 'rowNo', align: 'center', sortable: false, menuDisabled: true,
    			renderer: function(value, metaData, record, row, col, store, gridView) {
					return ++row;
				}
    		},
    		{text: 'Position', width: 150, dataIndex: 'positionName', align: 'center', sortable: false, menuDisabled: true},
    		{text: 'Employee Name', flex: 1, dataIndex: 'memberName', align: 'center', sortable: false, menuDisabled: true},
    	]
		
		let staffGrid = Ext.create('Ext.grid.Panel', {
			width: '100%',
        	flex: 1,
        	store: Ext.widget('mestore', {
        		groupField: 'positionName',
        	}),
        	features: [
				{ftype: 'grouping', groupHeaderTpl: '{name}', hideGroupedHeader: true, enableGroupingMenu: false},
			],
			viewConfig: {
				plugins: {
		            ptype: 'gridviewdragdrop',
		        },
		        listeners: {
	            	beforedrop: function(node, data, overModel, dropPosition, dropHandlers) {
	            		let check = staffGrid.getStore().findBy(function (record) {
	        				return record.data.memberCode == data.records[0].data.memberCode;
	        			});
	        			if(check != -1) {
	        				return false;
	        			}
	            	},
//	            	drop: function(node, data, dropRec, dropPosition) {
//	            		var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
//	            		approvalLineGrid.getView().refresh();
//	            	},
	            }
			},
        	columns: [
        		{text: 'Employee Name', flex: 1, dataIndex: 'memberName', align: 'center', sortable: false, menuDisabled: true},
        	],
        	listeners: { 
				cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
//					console.log(record.data)
		        }
		 	}
    	});
		
		let cellClickListener = { 
		    cellclick: function(view, cell, cellIndex, record, row, rowIndex, e) {
		    	let action = $(e.target).attr('action');
		    	if(action == 'delete') {
		    		view.getStore().remove(record);
		    	}
		    }
	 	}
		let approvalRegisterGrid = Ext.create('Ext.grid.Panel', {
        	store: Ext.widget('mestore'),
        	width: '100%',
        	flex: .5,
        	margin: '5 1 0 0',
        	dropItself: true,
        	viewConfig: {
				plugins: {
		            ptype: 'gridviewdragdrop',
		        },
		        listeners: {
	            	beforedrop: function(node, data, overModel, dropPosition, dropHandlers) {
	            		if(data.view.grid.dropItself == true) {
	            			return true;
	            		}
	            		let check = approvalRegisterGrid.getStore().findBy(function (record) {
	        				return record.data.memberCode == data.records[0].data.memberCode;
	        			});
	        			if(check != -1) {
	        				return false;
	        			}
	            	}
	            }
			},
			listeners: cellClickListener,
        	columns: gridColumnRegister,
    	});
		
		let receiveRegisterGrid = Ext.create('Ext.grid.Panel', {
        	store: Ext.widget('mestore'),
        	width: '100%',
        	margin: '5 1 0 0',
        	flex: .5,
        	dropItself: true,
        	title: 'Receive Reference',
        	viewConfig: {
				plugins: {
		            ptype: 'gridviewdragdrop',
		        },
		        listeners: {
	            	beforedrop: function(node, data, overModel, dropPosition, dropHandlers) {
	            		if(dropPosition == 'before') {
	            			return true;
	            		}
	            		let check = receiveRegisterGrid.getStore().findBy(function (record) {
	        				return record.data.memberCode == data.records[0].data.memberCode;
	        			});
	        			if(check != -1) {
	        				return false;
	        			}
	            	}
	            }
			},
			listeners: cellClickListener,
        	columns: gridColumnRegister,
    	});
		
//		approvalLineDetailList
		let approvalLineGrid = Ext.create('Ext.grid.Panel', {
        	store: Ext.widget('mestore'),
        	width: '100%',
        	flex: 1,
        	margin: '5 0 0 0',
        	columns: [
        		{text: 'No', width: 40, dataIndex: 'rowNo', align: 'center', sortable: false, menuDisabled: true,
        			renderer: function(value, metaData, record, row, col, store, gridView) {
    					return ++row;
    				}
        		},
        		{text: 'Approval Line', flex: 1, dataIndex: 'approvalTitle', align: 'center', sortable: false, menuDisabled: true},
        	],
        	listeners: { 
				cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
					getApprovalLineDetail(record.data)
		        }
		 	}
    	});
		let approvalLoadGrid = Ext.create('Ext.grid.Panel', {
        	store: Ext.widget('mestore'),
        	width: '100%',
        	flex: .5,
        	margin: '5 1 0 0',
        	columns: gridColumnLoad,
    	});
		let receiveLoadGrid = Ext.create('Ext.grid.Panel', {
        	store: Ext.widget('mestore'),
        	width: '100%',
        	margin: '5 1 0 0',
        	flex: .5,
        	title: 'Receive Reference',
        	columns: gridColumnLoad,
    	});
		
		let mainTab = Ext.widget('metabpanel', {
			border: false,
			height: 500,
			layout: 'fit',
			items: [
				{title: 'Approval Line Register', tabNumber: 1, xtype: 'container', layout: 'hbox', height: '100%',
					items: [
						{xtype: 'container', width: '40%', layout: 'vbox', margin: '0 10 0 0', height: '100%',
							items: [formSearch, staffGrid]
						},
						{xtype: 'container', width: '60%', layout: 'vbox', height: '100%',
							items: [approvalRegisterGrid, receiveRegisterGrid]
						}
					]
				},
				{title: 'Loading Approval Line', tabNumber: 2, xtype: 'container', layout: 'hbox', height: '100%',
					items: [
						{xtype: 'container', width: '40%', layout: 'vbox', margin: '0 10 0 0', height: '100%',
							items: [approvalLineGrid]
						},
						{xtype: 'container', width: '60%', layout: 'vbox', height: '100%',
							items: [approvalLoadGrid, receiveLoadGrid]
						}
					]
				},
			],
			listeners: {
	            'tabchange': function (tabPanel, tab) {
//	                changeTabpanel(tab.name)
	            }
	        }
		})
		
		let btnApply = Ext.widget('button', {
			text: 'Apply', 
			iconCls: 'fas fa-check btn-icon', 
			padding: '8 10',
       	 	handler: function() {
       	 		apply();
       	 	}
		})
		
		this.items = [mainTab];
		this.bbar = [
            {xtype: 'mepanel', style: 'background: transparent;', bodyStyle: 'background: transparent;',
           	 	layout: { 
           	 		type: 'hbox', 
           	 		align: 'middle', 
           	 		pack: 'center'
           	 	},
           	 	items: [btnApply]
            }
        ];
		this.callParent(arguments);
		
		init();
		let approvalLineDetailList;
		async function init() {
			try {
        		let json = await getDataAjax('/counselServiceController/getApprovalLineDetailList.json', {});
        		approvalLineDetailList = json.data;
        		if(approvalLineDetailList.length == 0) {
        			throw new Error();
        		}
        		let approvalLine = _(approvalLineDetailList)
        			.uniqBy('approvalCode')
        			.value();
        		approvalLineGrid.getStore().loadData(approvalLine);
				unMask();
        	}catch(e) {
        		handleException(e);
        	}
		}
		function getApprovalLineDetail(info) {
			let approvalList = _(approvalLineDetailList)
				.filter(s => s.approvalCode == info.approvalCode && s.approvalLineGbn == 'A')
				.value();
			if(approvalList.length > 0) {
				approvalLoadGrid.getStore().loadData(approvalList);
			}else {
				approvalLoadGrid.getStore().removeAll();
			}
			
			let receiptList = _(approvalLineDetailList)
				.filter(s => s.approvalCode == info.approvalCode && s.approvalLineGbn == 'R')
				.value();
			if(receiptList.length > 0) {
				receiveLoadGrid.getStore().loadData(receiptList);
			}else {
				receiveLoadGrid.getStore().removeAll();
			}
		}
		
		async function getEmployeeList() {
			try {
        		let json = await getDataAjax('/counselServiceController/getEmployeeList.json', {memberName : getFormField(formSearch, 'name').getValue()});
        		let data = json.data;
        		if(data.length > 0) {
        			staffGrid.getStore().loadData(data);
        		}else {
        			staffGrid.getStore().removeAll();
        		}
				unMask();
        	}catch(e) {
        		handleException(e);
        	}
		}
		
		function apply() {
			try {
				let tabNumber = mainTab.getActiveTab().tabNumber;
				let approvalStore = tabNumber == 1 ? approvalRegisterGrid.getStore() : approvalLoadGrid.getStore();
				let receiveStore = tabNumber == 1 ? receiveRegisterGrid.getStore() : receiveLoadGrid.getStore();
				let approvalList = _(approvalStore.data.items)
					.map(s => {
						return {
							memberCode		: s.data.memberCode,
							memberName		: s.data.memberName,
							positionName	: s.data.positionName,
							positionCode	: s.data.positionCode,
						}
					})
					.value();
				
				let receiveList = _(receiveStore.data.items)
					.map(s => {
						return {
							memberCode		: s.data.memberCode,
							memberName		: s.data.memberName,
							positionName	: s.data.positionName,
							positionCode	: s.data.positionCode,
						}
					})
					.value();
				
				if(approvalList.length == 0 || receiveList.length == 0) {
					throw new Error('data empty');
				}
				me.reloadParent(approvalList, receiveList);
				me.hide();
			}catch(e) {
				handleException(e);
			}
		}
		
//	END
	}
});

