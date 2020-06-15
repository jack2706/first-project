Ext.define('ext.view.counselService.newEnrolledStudent.component.ChangeCounselorPopup', {
	extend: 'component.MeWindow',
	title: 'Change Counselor',
	width: 700,
	defaultWidth: 700,
	layout: 'vbox',
	bodyPadding: 5,
	reloadPopup: function() {},
	reloadParent: function() {},
	initComponent : function() {
		
		let me = this;
		
		let counselInfo;
		me.reloadPopup = function(info) {
			counselInfo = info;
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
			padding: 10,
			style: 'border: 1px solid #b5b8c8; border-radius: 3px;',
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
		
		let mainStore = Ext.widget('mestore', {
			pageSize: 10,
            proxy: {
				type: 'ajax',
				url: CONTEXT_PATH + '/counselServiceController/getEmployeeList.json',
				reader: {
					type: 'json',
					enablePaging: true,
					rootProperty: 'data',
					totalProperty: 'totalCount',
				}
            },
            queryMode: 'local',
		});
		let mainGrid = Ext.create('Ext.grid.Panel', {
        	store: mainStore,
        	width: '100%',
        	height: 300,
        	margin: '5 0',
        	flex: 1,
        	columns: [
        		{text: 'No', width: 40, dataIndex: 'rowNo', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Position', width: 120, dataIndex: 'positionName', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Employee Name', flex: 1, dataIndex: 'memberName', align: 'center', sortable: false, menuDisabled: true},
        	],
        	bbar: new Ext.PagingToolbar({
    			store: mainStore,
    			pageSize: 10,
    			displayInfo: true,
    			listeners: {
    				beforechange : function(pagingtoolbar, page, eOpts) {
    					setParamsToProxy(paramsToSearch, this.store.getProxy());
    				}
    			}
    		}),
        	listeners: { 
				cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
					console.log(record.data)
		        }
		 	}
    	});
		
		let forward = Ext.widget('mearea', {
			width: '100%', 
			labelWidth: 100, 
			margin: '5 0 0 0',
			fieldLabel: 'Forward Content'
		})
		
		let btnApply = Ext.widget('button', {
			text: 'Apply', 
			iconCls: 'fas fa-check btn-icon', 
			padding: '8 10',
       	 	handler: function() {
       	 		apply();
       	 	}
		})
		
		this.items = [formSearch, mainGrid, forward];
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
		
		let paramsToSearch = {};
		async function getEmployeeList() {
			try {
				if(!formSearch.isValid()) {
					throw new Error();
				}
				paramsToSearch = {
					memberName : getFormField(formSearch, 'name').getValue(),
				}
				mainStore.loadPage(1, {
					params: paramsToSearch
				})
        	}catch(e) {
        		handleException(e);
        	}
		}
		
		async function apply() {
			try {
				let selected = mainGrid.getSelectionModel().getSelection();
	   		 	if(selected.length == 0) {
	   		 		throw new Error('Please select one row');
	   		 	}
	   		 	let info = selected[0].data;
	   		 	
	   		 	let params = {
					counselId		: counselInfo.counselId,
					counselMemCode	: info.memberCode,
					forwardComment	: forward.getValue().trim()
				}
				await saveDataAjax('Do you want to save?', '/counselServiceController/changeCounselor.json', params, 'Save Successfully.', 'Change Counselor');
	   		 	
				me.reloadParent({
					memberCode: info.memberCode,
					memberName: info.memberName
				});
				me.hide();
			}catch(e) {
				handleException(e);
			}
		}
		
//	END
	}
});

