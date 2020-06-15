Ext.define('ext.view.common.popup.EmployeePopup', {
	extend : 'component.MeWindow',
	title : 'Employee Popup',
	width: 630,
    modal : true,
	resizable : false,
	closable : true,
	layout: 'vbox',
	height: 700,
	memberCode:'',
	clientMemCode:'',
	reloadPopup: function() {},
	reloadParent : function() {},
	initComponent : function() {
		
		var me = this;
//		let campusStore = Ext.widget('mestore');
//		let studentTypeStore = Ext.widget('mestore');
//		let optStudentType = getStoreOpt(false, 'All', '', true, '03');
		me.reloadPopup = function(clientCode) {
//			getFormField(wrapContiner,'campus').setValue(clientCode);
			searchList();
			me.show();
		}
		var btnApply = Ext.widget('mebutton', {
	    	text: 'Reflect', 
	    	padding: '8 10', 
	    	margin : "0 0 0 20",
	    	iconCls: 'fas fa-check btn-icon', 
	    	style: 'float : right;',
	    	handler: function(){
//	    		updateBirthday();
	    		var selectedItem = mainPanel.getSelectionModel().getSelection();
				if (selectedItem != null && selectedItem != undefined) {
					console.log(selectedItem)
						me.reloadParent(selectedItem[0].data.memberCode);
						me.hide();
				}else {
					showMessageBoxWarning('Please select at least one person.');
				}
			}
	    });
		var wrpBtn = Ext.create('Ext.container.Container', {
        	padding: 15,
			cls: 'modal-footer bt2 text-right', items: [btnApply] ,width : null
		});
		var btnSearch = Ext.widget('mebutton', {
	    	text: 'Search', 
	    	padding: '8 10', 
	    	margin : "0 0 0 20",
	    	iconCls: 'icon-nw-search', 
	    	style: 'float : right;',
	    	handler: function(){
//	    		updateBirthday();
	    		if(wrapContiner.isValid()) {
            		searchList();
 	    		}
			}
	    });
		var wrapContiner = Ext.create('Ext.form.Panel', {
			width : '100%',
			border : false,
			padding : '10 0 5 10',
			margin : 5,
			style : 'border:1px solid #b5b8c8; border-radius:3px;',
			layout: {
				type: 'table',
				columns: 2,
				tdAttrs: {style: 'padding: 0px 10px 0px 0px; vertical-align : top;'}
			},
			items:[
//				{xtype : 'mecombo', width: '100%', name : 'campus', fieldLabel : 'Campus',
//					store : campusStore, valueField : 'clientCode', displayField : 'clientName', queryMode : 'local', editable : false,
//				},
				{xtype: 'metext', fieldLabel: 'Employee Name',name:'memberName', cls: 'col-xs-10 item form-controls', width : '100%', labelWidth : 110,
					listeners:  {
				      		specialkey: function (f,e) {    
					            if (e.getKey() == e.ENTER) {
					            	if(wrapContiner.isValid()) {
					            		searchList();
					 	    		}
					            }
				      		}
					        } 
					},
//					{xtype: 'mecombo',name: 'schStudentSttCode', fieldLabel: 'Student Type',
//			        	store: studentTypeStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
//			        },
					btnSearch
          	  ]
		});
		
		var mainStore = Ext.create('component.meStore',{
			pageSize : PAGE_SIZE,
			proxy : {
	   	 		type : 'ajax',
	   	 		url : CONTEXT_PATH + '/general/getListEmployee.json',	   	 		
	   	 		reader : {
	   	 			type : 'json',
	   	 			enablePaging : true,
	   	 			totalProperty : 'totalCount',
		 			rootProperty : 'data',
	   	 		}
		
	   	 	}
		});
		//var transferSavingAccount = Ext.create('ext.view.vcms.popup.TransferSavingAccount');
		var mainGridPagingToolbar = Ext.create('Ext.toolbar.Paging',{
			store:mainStore ,
	        pageSize: PAGE_SIZE,
	        displayInfo: true,
	        listeners: {
                beforechange: function(pagingtoolbar, page, eOpts){
                 	var myProxy = this.store.getProxy();
//                 	myProxy.setExtraParam('clientCode', params.clientCode);
//                 	myProxy.setExtraParam('schStudentSttCode', params.schStudentSttCode);
                 	myProxy.setExtraParam('memberName', params.memberName);
//                 	myProxy.setExtraParam('memberCode', params.memberCode);
//                 	myProxy.setExtraParam('classCodeList', params.classCodeList);
                }
            }
	        
	    });
		var mainPanel = Ext.create('Ext.grid.Panel', {
			width: '100%',
			flex: 1,
			store: mainStore,
			padding: '0 5',
			columns:[
				{
				text : 'No',
				width : 90,
				dataIndex : 'rowNo',
				align : 'center'
				},
				{
					text : 'Department',
					width : 100,
					dataIndex : 'employeeSttName',
					align : 'center'
				},
				{
					text : 'Position',
					width : 200,
					dataIndex : 'personClassName',
					align : 'center'
				},
				{
					text : 'Employee Name',
					width : 200,
					dataIndex : 'memberName',
					align : 'center'
				},
				
			],
			listeners: { 
				cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {			    		 
//		    		if(cellIndex != 0){
//		    			if($(e.target).data('action') == 'Transfer'){
//							console.log(record.data);
//							transferSavingAccount.reloadPopup(record.data);
//				    	}
//		    		}
		        },
		        rowclick : function(grid, record, columnIndex ){
		        }
		 	},
		 	bbar: mainGridPagingToolbar,
		});
		
		
		this.items = [wrapContiner,mainPanel];
		this.bbar = [
            {xtype: 'mepanel', style: 'background: transparent;', bodyStyle: 'background: transparent;', padding: 5,
           	 layout: { 
           		 type: 'hbox', 
           		 align: 'middle', 
           		 pack: 'center'
   			 },
       		 items: [
       			btnApply
                ]
            },
        ];
		this.callParent(arguments);
//		Common.getCampusList(campusStore, getFormField(wrapContiner, 'campus'), true);
//		Common.getGeneralCodeKEMS(studentTypeStore, 'EM', 'MB0010',optStudentType, getFormField(wrapContiner,'schStudentSttCode'));
		var  params=[];
		function searchList(){
			params = {
//					schStudentSttCode 	: getFormField(wrapContiner,'schStudentSttCode').getValue(),
					memberName 			: getFormField(wrapContiner,'memberName').getValue(),
//					memberCode			: getFormField(formSearch,'memberCode').getValue(),
//					classCode			: getFormField(formSearch,'classCodeList').getValue(),
//					clientCode			: getFormField(wrapContiner,'campus').getValue(),
			}
			mainGridPagingToolbar.moveFirst();
			mainStore.loadPage(1, {
				params: params,
			});
		}
		
		/*--End--*/
	}
});
