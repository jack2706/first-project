Ext.define('ext.view.common.component.approvalLineComponent', {
	extend : 'Ext.form.Panel',
	alias : 'widget.approvalLineComponent',
	layout : 'fit',
	width  : '100%',
	flex: 1,
	border : false,
	requires : [
	    //'ext.model.common.sybGeneralCodeModel',
	    //'ext.model.common.bankAccountModel',
	    //'ext.model.fa.incomeExpense.raeExpenseConfirmModel',
	    //'ext.model.common.syfConfirmLineVoModel',
    ],
	reloadTab: function(){},
	resetTab: function(){},
	reloadParent : function(){},
	initComponent : function() {
		
		var me = this;
		
		me.reloadTab = function(){
			resetFormInfo();
			mainStore.load();
		}
		
		me.resetTab = function(){
			
		}
		var mainStore = Ext.create('Ext.data.Store', {
		    proxy: {
				type: 'ajax',
				method : 'POST',
				url: CONTEXT_PATH+'/systemConfigMgmt/getApprovalLineList.json',
		        reader: {
		        	type: 'json',
		            root: 'appLineList'
		        }
		    }
		});
		
		var mainGrid = Ext.create('Ext.grid.Panel', {
 			width : '100%',
 			flex: 1,
 			margin: '7 10 10',
			store : mainStore,
		 	columns:[
 	         	{text : 'No', width : 43, dataIndex: '', align : 'center',
					renderer: function(value, meta, record, rowIndex, colIndex) {
				       return rowIndex + 1;
				    }
				},
				{text : 'Approval Line Name', dataIndex : 'confirmLineName', flex : 3 },
				{text : 'Default', dataIndex : 'basicConfigYn', flex : 1, align: 'center'},
			],
			listeners: { 
				rowclick : function(grid, record, columnIndex ){	
					getApprovalInfo(record.data.confirmLineCode);
		        },
		 	},
 		});
		
		var formInfo = Ext.create('Ext.form.Panel',{
			width: '100%',
			border : false,
			padding: '0 0 0 15',
			margin: '0 10',
			layout: 'hbox',
			items : [
		        {xtype: 'hiddenfield', name: 'confirmLineCode'},
				{xtype: 'metext', flex: 1.5, labelWidth : 120, fieldLabel: 'Approval Line Name', name : 'name'},
				{xtype: 'checkbox', boxLabel: 'Default', name: 'default', flex: 1, value: true, margin: '0 0 0 15'},
    		]
		});
		
		var staffPopup = Ext.create('ext.view.finance.popup.searchClbEmployeePopup');	
		
		staffPopup.applyToParentWindow = function(selectedData){
			addApproval(botStore, selectedData);
		}
		
		var btnAddApprover = Ext.widget('mebutton',{
	    	text : 'Add', padding : '8 10', iconCls: 'icon-nw-plus',
	     	handler : function(){
            	staffPopup.refreshDataPanel();
            	staffPopup.show();
        	},
	    });
		var botStore =  Ext.widget('mestore');
		var botGrid = Ext.create('Ext.grid.Panel', {
			width : '100%',
 			flex : 1,
 			margin: '10 10 0 10',
 			autoScroll: true,
 			store: botStore, 
			tbar: [{xtype : 'tbfill'}, btnAddApprover],
			listeners: { 
		        cellclick : function(iView, iCellEl, iColIdx, iStore, iRowEl, iRowIdx, iEvent) {
			    	if($(iEvent.target).data('action') == 'delete'){
			    		botStore.remove(iStore);
			    	}
			    },
		 	},
		 	viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop'
                },
                listeners: {
                    drop: function(node, data, overModel, dropPosition, dropFunction) {
                    	sortStore(botStore);
                    	botGrid.getView().refresh();
                    }
                }
            },
            plugins: [{ptype : 'cellediting'}],
		 	columns: [
				{text: 'No', dataIndex: '', width : 40, align: 'center',
					renderer: function(value, meta, record, rowIndex, colIndex) {
				        return rowIndex+1;
				    }
				},
				{text: 'Position', dataIndex: 'personClassName', width: 120},
				{text: 'StaffName', dataIndex:'memberName', flex: 1},
				{xtype: 'checkcolumn', header: 'Approver', dataIndex: 'approvalStt', width: 80, 
					listeners : {
	                    beforecheckchange : function(cmp, rowIndex, checked, eOpts){
	                    	if(botStore.data.items[rowIndex].data.approvalStt == false) {
		                    	botStore.data.items[rowIndex].data.confirmGbn = checked == true ? 'AC': 'RD';
		                    	botStore.data.items[rowIndex].data.approvalStt = true;
		                    	botStore.data.items[rowIndex].data.viewerStt = false;
		                    	sortStore(botStore);
		                    	botGrid.getView().refresh();
	                    	}else {
	                    		return false;
	                    	}	                    }
		            }
				},
				{xtype: 'checkcolumn', header: 'Viewer', dataIndex: 'viewerStt', width: 80,
					listeners : {
	                    beforecheckchange : function(cmp, rowIndex, checked, eOpts){
	                    	if(botStore.data.items[rowIndex].data.viewerStt == false) {
		                    	botStore.data.items[rowIndex].data.confirmGbn = checked == true ? 'RD': 'AC';
		                    	botStore.data.items[rowIndex].data.viewerStt = true;
		                    	botStore.data.items[rowIndex].data.approvalStt = false;
		                    	sortStore(botStore);
		                    	botGrid.getView().refresh();
	                    	}else {
	                    		return false;
	                    	}
	                    }
		            }
				},
				{text : '', width : 80, align : 'center',
					renderer  : function(value, rootRecord, record) {
						if(btnSave.disabled == true) {
							return '';
						}
        	   			return "<a href=\"#\" data-action=\"delete\"><i class=\"fa fa-trash\"></i> Delete</a>";
	           		},
				},
			],
 		});
		
		var btnNew = Ext.widget('mebutton',{
	    	text : 'New', iconCls : 'icon-nw-new', padding : '8 10',// hidden: !checkWriteAuth(), hideMode:'visibility',
	    	handler: function(){
	    		resetFormInfo();
			}
	    });
		
		var btnSave = Ext.widget('mebutton',{
	    	text : 'Save', iconCls : 'icon-nw-save', padding : '8 10', margin: '0 0 0 10',// hidden: !checkWriteAuth(), hideMode:'visibility',
	    	handler: function(){
	    		if(formInfo.isValid()) {
	    			saveApprovalLine();
	    		}
			}
	    });
		
		var btnDelete = Ext.widget('mebutton',{
	    	text : 'Delete', iconCls : 'icon-nw-delete', padding : '8 10', margin : '0 0 0 10',// hidden: !checkWriteAuth(), hideMode:'visibility',
	    	handler: function(){
	    		if(formInfo.isValid()) {
	    			deleteApprovalLine();
        		}
			}
	    });
		
		var formMain = Ext.create('Ext.form.Panel',{
			width: '100%',
			border : false,
			//bodyPadding : 5,
			layout: 'vbox',
			items : [
		        {xtype : 'label', html: '<i class="fa fa-caret-right" style="font-size: 14px; color: #007CC3;"></i> Approval Line Appointment', width: '100%',
		        	style : 'background-color: #e2e2e2', padding: 10, 
        		},
        		mainGrid,
        		{xtype : 'label', text : '※ Approval Line Detail', margin: '0 10 10 10'},
        		formInfo,
        		botGrid,
        		{xtype: 'container', width: '100%', layout: 'hbox', padding: '10', items: [{xtype: 'tbfill'}, btnNew, btnSave, btnDelete]}
    		]
		});
		
		this.items = [formMain];
		this.callParent(arguments);
		
		var urlGeneralCode = CONTEXT_PATH + '/common/generalCode.json';
		
		function addApproval(store, selectedRows) {
			if(selectedRows.length > 0) {
				Ext.each(selectedRows, function(item) {
					var flag = false;
					store.each(function(record) {
						if(item.clientMemCode == record.data.clientMemCode) {
							flag = true;
							return false;
						}
					});
					if(flag == false) {
						item.confirmGbn = 'AC';
						item.approvalStt = true;
						item.viewerStt = false;
						store.insert(store.data.length, item);
					}
				});
				sortStore(store);
				botGrid.getView().refresh();
			}
		}
		function sortStore(store) {
			var list = [];
			store.each(function(record) {
				list.push(record.data);
			});
			list.sort(function(a, b){
				if(a.confirmGbn < b.confirmGbn) return -1;
				if(a.confirmGbn > b.confirmGbn) return 1;
				return 0;
            });
			store.removeAll();
			store.loadData(list);
		}
		function resetFormInfo() {
			formInfo.reset();
			getFormField(formInfo, 'confirmLineCode').setValue(0);
			getFormField(formInfo, 'default').setValue(false);
			botStore.removeAll();
			btnDelete.setDisabled(true);
		}
		function getApprovalInfo(confirmLineCode){
			formInfo.reset();
			botStore.removeAll();
			var ajaxUrl = '/systemConfigMgmt/getApprovalLineDetail.json';
			var params = {
				confirmLineCode: confirmLineCode
			};
			apiCallAjaxGetData(ajaxUrl, params, successApprovalInfo);
		}
		
		function successApprovalInfo(response) {
			var json = Ext.decode(response.responseText);
			var info = json.appLineBasicInfo;
			var list = json.appLineDetailList;
			getFormField(formInfo, 'confirmLineCode').setValue(info.confirmLineCode);
			getFormField(formInfo, 'name').setValue(info.confirmLineName);
			getFormField(formInfo, 'default').setValue(info.basicConfigYn == 'Y' ? true : false);
			Ext.each(list, function(item) {
				item.approvalStt = item.confirmGbn == 'AC' ? true : false;
				item.viewerStt = item.confirmGbn == 'RD' ? true : false;
			});
			botStore.loadData(list);
			sortStore(botStore);
			btnDelete.setDisabled(false);
		}
		function saveApprovalLine() {
			if(botStore.data.length == 0) {
				showMessageBoxWarning('Please Add approval, viewer.');
				return;
			}
			
			var arrayJson = [];
			botStore.each(function(record){
				arrayJson.push({	
					confirmGbn		: record.data.confirmGbn,
					clientMemCode	: record.data.clientMemCode
				});
 			});
			var basicConfigYn = getFormField(formInfo, 'default').getValue();
        	var params = {
    			confirmLineCode	: getFormField(formInfo, 'confirmLineCode').getValue(),
    			confirmLineName	: getFormField(formInfo, 'name').getValue(),
    			basicConfigYn	: basicConfigYn == true ? 'Y' : 'N',
    			arrayJson		: Ext.encode(arrayJson)
        	};
        	var actionUrl = '/systemConfigMgmt/saveApprovalLine.json';
 			var message = 'Save Approval Line was successful';
        	callAjaxFunction('Do you want to save Approval Line ?', actionUrl, params, successSaveApprovalLine, message);
		}
		
		function deleteApprovalLine() {
			if(getFormField(formInfo, 'confirmLineCode').getValue() == 0) {
				return;
			}
        	var params = {
    			confirmLineCode	: getFormField(formInfo, 'confirmLineCode').getValue(),
        	};
        	var actionUrl = '/systemConfigMgmt/deleteApprovalLine.json';
 			var message = 'Delete Approval Line was successful';
        	callAjaxFunction('Do you want to delete Approval Line ?', actionUrl, params, successSaveApprovalLine, message);
		}
		
		function successSaveApprovalLine(response){
			var json = Ext.decode(response.responseText);
			if(json.actionStatus == 'success'){
				resetFormInfo();
				mainStore.load();
			}else if(json.actionStatus == 'error') {
				
			}
		}
		
		/*--End--*/
	}
});