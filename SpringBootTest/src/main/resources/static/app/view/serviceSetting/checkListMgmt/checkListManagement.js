Ext.define('ext.view.serviceSetting.checkListMgmt.checkListManagement', {
	extend : 'Ext.form.Panel',
	header: false,
	border: false,
	width : "100%",
	layout: 'vbox',
	padding: 5,
	requires: [
	],
	initComponent : function() {
		var me = this;
//		var sizeChecklist = 0;
		var campusId = '';
		var headquartersId = '';
		var classificationParent = '';
		var classificationCounsel = '';
		var assessmentTypeParent = '';
		var assessmentTypeCounsel = '';
		var paramsSearch = {
				checklistGbn:'',
				classificationCd : '',
				assessmentTypeCd :'',
				parentDtlCd:'',
//				campusId:''
			}
		// SET DEFAULT TREE CODE FOR PARAMS SEARCH
		var parentTreeInfo = {
				checklistGbn :'CS',
				parentDtlCode :'1'
		}

		var checklistDtl = {
				checklistCd:0,
				clientCode : '',
				campusId :''
				}
		paramsSearch.checklistGbn = parentTreeInfo.checklistGbn;
		paramsSearch.parentDtlCd = parentTreeInfo.parentDtlCode;
		/** Get list defined checklist Gbn from system **/
		var listChecklistGbn = [];
		getChecklistGbn();
		/**Init Store**/
		var mainStore = Ext.widget('mestore', {
//			pageSize :15,
//			proxy : {
//				type : 'ajax',
//				url : CONTEXT_PATH
//						+ '/checkListMgmt/getListChecklist.json',
//				reader : {
//					type : 'json',
//					enablePaging : true,
//					rootProperty : 'listCheckList',
//					totalProperty : 'totalCount',
//				}
//			},
//			autoLoad:true,
//			listeners:{
//				load:function(store,records,success,operation){
//					console.log('store.data.items111111')
//					console.log(store.data.items)
//					for(var i = 0;i < store.data.items.length;i++){
//						var item = store.data.items[i];
//						if(item.data.icCheckYN == 'N'){
//							item.data.icCheck = false;
//						}else if(item.data.icCheckYN == 'Y'){
//							item.data.icCheck = true;
//						}
//						
//						if(item.data.pcCheckYN == 'N'){
//							item.data.pcCheck = false;
//						}else if(item.data.pcCheckYN == 'Y'){
//							item.data.pcCheck = true;
//						}
//						
//						if(item.data.nscCheckYN == 'N'){
//							item.data.nscCCheck = false;
//						}else if(item.data.nscCheckYN == 'Y'){
//							item.data.nscCCheck = true;
//						}
//						
//						if(item.data.rcCheckYN == 'N'){
//							item.data.rcCheck = false;
//						}else if(item.data.rcCheckYN == 'Y'){
//							item.data.rcCheck = true;
//						}
//						
//						if(item.data.wcCheckYN == 'N'){
//							item.data.wcCheck = false;
//						}else if(item.data.wcCheckYN == 'Y'){
//							item.data.wcCheck = true;
//						}
//					}
//
//					console.log('store.data.items22222')
//					console.log(store.data.items)
//					gridResultParent.getView().refresh();
//					gridResultCounsel.getView().refresh();
//				}
//			},
//			queryMode : 'local'
		});
		var checklistGbnStore = Ext.widget('mestore');
		var assessmentTypeStoreOtp = getStoreOpt(true, 'All', '', true, '',true);
		var assessmentTypeStore = Ext.widget('mestore');
		var classificationStoreOtp = getStoreOpt(true, 'All', '', true, '');
		var classificationStore = Ext.widget('mestore');
		var newOrderPopup = Ext.create('ext.view.serviceSetting.checkListMgmt.popup.checkListOrderPopup', {});
		var btnOrder = Ext.widget('mebutton', {
			cls: 'btn-button',
        	text: 'Order',
        	minWidth: 60,
          	border: false,
          	handler: function() {
          			//use
          		paramsSearch.listChkYNParams = [];
          		newOrderPopup.reloadPopup(paramsSearch);
          	}
		});
		/*
		 * Form search
		 */
		
		var formHeaderTab =Ext.create('Ext.form.Panel', {
        	border: false,
        	header: false,
        	height: 32,
        	width: 610,
        	style: 'top: 2px; right: 0; position: absolute; !important',
        	layout: 'hbox',
        	items: [
        	        					
										{xtype: 'mecombo', flex: 2, fieldLabel: 'Checklist classification',labelWidth: 130,
											name: 'classification', valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', store: classificationStore,width:'100%',
											listeners: {
												change: function() {
													if(parentTreeInfo.parentDtlCode == '1'){
														classificationCounsel = getFormField(formHeaderTab,'classification').getValue();
													}else if(parentTreeInfo.parentDtlCode == '2'){
														classificationParent = getFormField(formHeaderTab,'classification').getValue();
													}

//													//use
													getListChecklist();
												}
											}
										},
									
										{xtype: 'mecombo', flex: 1, minWidth: 200, fieldLabel: 'Assessment type',labelWidth: 100, padding: '0 10',
											name: 'assessmentType',valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', store: assessmentTypeStore,width:'100%',
											listeners: {
												change: function() {
													if(parentTreeInfo.parentDtlCode == '1'){
														assessmentTypeCounsel = getFormField(formHeaderTab,'assessmentType').getValue();
														// reset page index to pagging
//														pageIndexParent = 1;
													}
													if(parentTreeInfo.parentDtlCode == '2'){
														assessmentTypeParent = getFormField(formHeaderTab,'assessmentType').getValue();
														// reset page index to pagging
//														pageIndexCounsel = 1;
													}
//													//use
													getListChecklist();
												}
											}
										},
										btnOrder
	        ]
        });
		/*
		 * 2 tabs
		 */
		var parentOrientationTab = Ext.create('ext.view.serviceSetting.checkListMgmt.tab.parentOrientationTab');
		var counselAssessmentTab = Ext.create('ext.view.serviceSetting.checkListMgmt.tab.counselAssessmentTab');
		var gridResultParent = Ext.create('Ext.grid.Panel',{
					width : "100%",
					header: false,
					autoScroll : true,
					minHeight : 100,
					flex: 1,
					stripeRows : true,
					preserveScrollOnRefresh : true,
					collapsible : true,
					enableColumnMove : true,
					enableColumnResize : true,
					store:mainStore,
					columns : [
								{header : "No",align : 'center',minWidth : 60,maxWidth : 80,flex : 1,sortable : false,hideable : true,dataIndex:'rowNo'},
								{header : "Classification",flex : 2,align : 'center',minWidth : 200,sortable : true,hideable : true,dataIndex:'classificationName',},
								{header : "Detail Area",flex : 3,minWidth : 300,sortable : true,hideable : true,
									renderer:function(value, metaData, records, row, col, store, gridView){
										return '<a href="#">'+records.data.checkListArea+'</a>'
									}
								},
								{header : "Assessment Type",align : 'center',minWidth : 120,flex : 1.2,sortable : true,hideable : false,dataIndex:'assessmentTypeName',},
								{header : "Number of Items",minWidth : 120,align : 'center',flex : 1.2,sortable : true,dataIndex:'numberOfItems',},
								{xtype:'checkcolumn',header : "Instant Counsel",minWidth : 120,align : 'center',flex : 1.2,dataIndex:'icCheck',
									listeners:{
										beforecheckchange:function(cmp, rowIndex, checked, eOpts){
//											console.log('icCheck Parent : '+checked)
//											if(mainStore.data.items[rowIndex].data.icCheck == false){
//												mainStore.data.items[rowIndex].data.icCheck == true;
//											}else{
//												mainStore.data.items[rowIndex].data.icCheck == false;
//											}

												mainStore.data.items[rowIndex].data.icCheck == checked;
										}
									}
								},
								{xtype:'checkcolumn',header : "Plan Counsel",minWidth : 120,align : 'center',flex : 1.2,dataIndex:'pcCheck',
									listeners:{
										beforecheckchange:function(cmp, rowIndex, checked, eOpts){
//											if(mainStore.data.items[rowIndex].data.pcCheck == false){
//												mainStore.data.items[rowIndex].data.pcCheck == true;
//											}else{
//												mainStore.data.items[rowIndex].data.pcCheck == false;
//											}

											mainStore.data.items[rowIndex].data.pcCheck == checked;
										}
									}
									},
								{xtype:'checkcolumn',header : "New enrolled student Counsel",minWidth : 200,align : 'center',flex : 2,dataIndex:'nscCCheck',
									listeners:{
										beforecheckchange:function(cmp, rowIndex, checked, eOpts){
//											if(mainStore.data.items[rowIndex].data.nscCCheck == false){
//												mainStore.data.items[rowIndex].data.nscCCheck == true;
//											}else{
//												mainStore.data.items[rowIndex].data.nscCCheck == false;
//											}

											mainStore.data.items[rowIndex].data.nscCCheck == checked;
										}
									}
									},
								{xtype:'checkcolumn',header : "Recruit Counsel",minWidth : 120,align : 'center',flex : 1.2,dataIndex:'rcCheck',style: 'color:#D6D5D5',
									listeners:{
										beforecheckchange:function(cmp, rowIndex, checked, eOpts){
//											if(mainStore.data.items[rowIndex].data.rcCheck == false){
//												mainStore.data.items[rowIndex].data.rcCheck == true;
//											}else{
//												mainStore.data.items[rowIndex].data.rcCheck == false;
//											}

											return false;
										}
									}
									},
								{xtype:'checkcolumn',header : "Widthaw Student management",minWidth : 200,align : 'center',flex : 2,dataIndex:'wcCheck',style: 'color:#D6D5D5',
									listeners:{
										beforecheckchange:function(cmp, rowIndex, checked, eOpts){
//											if(mainStore.data.items[rowIndex].data.wcCheck == false){
//												mainStore.data.items[rowIndex].data.wcCheck == true;
//											}else{
//												mainStore.data.items[rowIndex].data.wcCheck == false;
//											}

											return false;
										}
									}
									},
								
								],
					viewConfig : {
						forceFit : true
					},
//					bbar : {
//						xtype : 'pagingtoolbar',pageSize : 10,displayInfo : true,
//						store:mainStore,
//						listeners : {
//	          				beforechange : function(pagingtoolbar, page, eOpts) {
//	          					pageIndexParent = page;
//	          					var myProxy = this.store.getProxy();
//	          					myProxy.setExtraParam('classificationCd',paramsSearch.classificationCd);
//	          					myProxy.setExtraParam('assessmentTypeCd',paramsSearch.assessmentTypeCd);
//	          					myProxy.setExtraParam('checkListGbn',paramsSearch.checkListGbn);
//	          					myProxy.setExtraParam('parentDtlCd',paramsSearch.parentDtlCd);
//	          					myProxy.setExtraParam('clientCode',paramsSearch.clientCode);
//	          				},
//	          			}
//					},
					listeners : {
						cellclick : function(view,cell, cellIndex,record, row, rowIndex,e) {
							var checklistCd = record.data.checkListDepth2Cd;
							if(cellIndex == 2){
//			          			//use
								showChecklistDetail(checklistCd);
							}
						}
					}
					,
				 	
				});
		var gridResultCounsel = Ext.create('Ext.grid.Panel',{
					width : "100%",
					header: false,
					autoScroll : true,
					minHeight : 100,
					flex: 1,
					stripeRows : true,
					preserveScrollOnRefresh : true,
					collapsible : true,
					enableColumnMove : true,
					enableColumnResize : true,
					store:mainStore,
					columns : [
								{header : "No",align : 'center',minWidth : 60,maxWidth : 80,flex : 1,sortable : false,hideable : true,dataIndex:'rowNo'},
								{header : "Classification",flex : 2,align : 'center',minWidth : 200,sortable : true,hideable : true,dataIndex:'classificationName',},
								{header : "Detail Area",flex : 3,minWidth : 300,sortable : true,hideable : true,
									renderer:function(value, metaData, records, row, col, store, gridView){
										return '<a href="#" >'+records.data.checkListArea+'</a>'
									}
								},
								{header : "Assessment Type",align : 'center',minWidth : 120,flex : 1.2,sortable : true,hideable : false,dataIndex:'assessmentTypeName',},
								{header : "Number of Items",minWidth : 120,align : 'center',flex : 1.2,sortable : true,dataIndex:'numberOfItems',},
								{xtype:'checkcolumn',header : "Instant Counsel",minWidth : 120,align : 'center',flex : 1.2,dataIndex:'icCheck',
									listeners:{
										beforecheckchange:function(cmp, rowIndex, checked, eOpts){
//											if(mainStore.data.items[rowIndex].data.icCheck == false){
//												mainStore.data.items[rowIndex].data.icCheck == true;
//											}else{
//												mainStore.data.items[rowIndex].data.icCheck == false;
//											}
											mainStore.data.items[rowIndex].data.icCheck == checked;
										}
									}
								},
								{xtype:'checkcolumn',header : "Plan Counsel",minWidth : 120,align : 'center',flex : 1.2,dataIndex:'pcCheck',
									listeners:{
										beforecheckchange:function(cmp, rowIndex, checked, eOpts){
//											if(mainStore.data.items[rowIndex].data.pcCheck == false){
//												mainStore.data.items[rowIndex].data.pcCheck == true;
//											}else{
//												mainStore.data.items[rowIndex].data.pcCheck == false;
//											}

											mainStore.data.items[rowIndex].data.pcCheck == checked;
										}
									}
									},
								{xtype:'checkcolumn',header : "New enrolled student Counsel",minWidth : 200,align : 'center',flex : 2,dataIndex:'nscCCheck',
									listeners:{
										beforecheckchange:function(cmp, rowIndex, checked, eOpts){
//											if(mainStore.data.items[rowIndex].data.nscCCheck == false){
//												mainStore.data.items[rowIndex].data.nscCCheck == true;
//											}else{
//												mainStore.data.items[rowIndex].data.nscCCheck == false;
//											}

											mainStore.data.items[rowIndex].data.nscCCheck == checked;
										}
									}
									},
								{xtype:'checkcolumn',header : "Recruit Counsel",minWidth : 120,align : 'center',flex : 1.2,dataIndex:'rcCheck',style: 'color:#D6D5D5',
									listeners:{
										beforecheckchange:function(cmp, rowIndex, checked, eOpts){
//											if(mainStore.data.items[rowIndex].data.rcCheck == false){
//												mainStore.data.items[rowIndex].data.rcCheck == true;
//											}else{
//												mainStore.data.items[rowIndex].data.rcCheck == false;
//											}

//											mainStore.data.items[rowIndex].data.rcCheck == checked;
											 return false;
										}
									}
									},
								{xtype:'checkcolumn',header : "Widthaw Student management",minWidth : 200,align : 'center',flex : 2,dataIndex:'wcCheck',style: 'color:#D6D5D5',
									listeners:{
										beforecheckchange:function(cmp, rowIndex, checked, eOpts){
//											if(mainStore.data.items[rowIndex].data.wcCheck == false){
//												mainStore.data.items[rowIndex].data.wcCheck == true;
//											}else{
//												mainStore.data.items[rowIndex].data.wcCheck == false;
//											}

//											mainStore.data.items[rowIndex].data.wcCheck == checked;
											 return false;
										}
									}
									},
								],
					viewConfig : {
						forceFit : true
					},
//					bbar : {
//						xtype : 'pagingtoolbar',pageSize : 10,displayInfo : true,
//						store:mainStore,
//						listeners : {
//	          				beforechange : function(pagingtoolbar, page, eOpts) {
//	          					pageIndexCounsel = page;
//	          					var myProxy = this.store.getProxy();
//	          					myProxy.setExtraParam('classificationCd',paramsSearch.classificationCd);
//	          					myProxy.setExtraParam('assessmentTypeCd',paramsSearch.assessmentTypeCd);
//	          					myProxy.setExtraParam('checkListGbn',paramsSearch.checkListGbn);
//	          					myProxy.setExtraParam('parentDtlCd',paramsSearch.parentDtlCd);
//	          					myProxy.setExtraParam('clientCode',paramsSearch.clientCode);
//	          				}
//	          			}
//					},
					listeners : {
						cellclick : function(view,cell, cellIndex,record, row, rowIndex,e) {
							var checklistCd = record.data.checkListDepth2Cd;
							if(cellIndex == 2){
//			          			//use
							showChecklistDetail(checklistCd);
							}
						}
					}
				});
		var mainTabs = Ext.create('Ext.TabPanel',{
        	width: '100%', 
        	border: false, 
        	header: false,
        	flex: 1,
        	layout: 'vbox',
        	style: 'z-index: 1;',
			items : [
    	        {xtype: 'panel', title: listChecklistGbn[0].title, layout:"fit", border: false,treeId:'CS', items: [gridResultParent],tabConfig:{
    	        	listeners:{
    	        		click:function(){

//    	          			//use
//    	        			// Set tree value for param search
    	        			parentTreeInfo.checklistGbn = 'CS';
    	        			parentTreeInfo.parentDtlCode = 1;
    	        			
    	        			paramsSearch.checklistGbn = parentTreeInfo.checklistGbn;
    	        			paramsSearch.parentDtlCd = parentTreeInfo.parentDtlCode;
    	        			getClassification(1);
//    	        			getListChecklist();
    	        		}
    	        	}
    	        }},
    	        {xtype: 'panel', title: listChecklistGbn[1].title, layout:"fit", border: false,treeId: 'PA',  items: [gridResultCounsel],tabConfig:{
    	        	listeners:{
    	        		click:function(){
    	        			

//    	          			//use
//    	        			// Set tree value for param search
    	        			parentTreeInfo.checklistGbn = 'PA';
    	        			parentTreeInfo.parentDtlCode = 2;
    	        			
    	        			paramsSearch.checklistGbn = parentTreeInfo.checklistGbn;
    	        			paramsSearch.parentDtlCd = parentTreeInfo.parentDtlCode;
    	        			getClassification(2);
//    	        			getListChecklist();
    	        		}
    	        	}
    	        }},
	        ]
		});
		var wrapFormHeaderTab = Ext.create('Ext.container.Container', {
			style: 'z-index: 10;', height: 0, width: '100%',
        	items: [formHeaderTab]
        });
		
		var btnSave = Ext.create('Ext.Button', {
			cls: 'btn-button',
			iconCls: 'icon-nw-save', 
        	text: 'Save',
          	minWidth: 100,
          	margin: '0 0 0 5',
          	border: false,
          	handler: function() {

//      			//use
          		updateChecklist();
          	}
		});

		/*
		 * button new to create new Checklust
		 */
		var newChecklistPopup = Ext.create('ext.view.serviceSetting.checkListMgmt.popup.newChecklistPopup', {});
		var btnNew = Ext.create('Ext.Button', {
			cls: 'btn-button',
        	text: 'New',
			iconCls: 'icon-nw-new', 
          	minWidth: 100,
          	border: false,
          	handler: function() {
          		checklistDtl.checklistCd = 0;
//          		checklistDtl.clientCode = campus.getValue();
//          		checklistDtl.campusId = campusId;

//      			//use
          		newChecklistPopup.reloadPopup(parentTreeInfo,checklistDtl);
          	}
		});
		var wrapbtn = Ext.create('Ext.container.Container', {
        	width: "100%",
        	layout: 'hbox',
        	padding:'5 0 0',
        	items: [{xtype: 'tbfill'}, btnNew, btnSave]
        });


		this.items = [wrapFormHeaderTab,mainTabs, wrapbtn];
		this.callParent(arguments);
		
		// Get list defined checklist Gbn from system
		function getChecklistGbn(){
			Ext.Ajax.request({
				url:CONTEXT_PATH + '/general/treeCodes2.json',
				params:{
					systemCode 	: 'IC', 
					commonCode 	: 'SY0003',
					parentDetailCode	: 0,
					treeLevel		: 1,
					useYn 			: 'Y',
					system				: 'TI'
				},
				async:false,
				success:function(response){
					var json = Ext.decode(response.responseText);
					var data = json.data;
					for(var i = 0;i < data.length ;i++){
						var checklistGbn = {
								title: data[i].codeName,
								treeId :data[i].treeId,
								detailCode :data[i].detailCode
						}
						listChecklistGbn.push(checklistGbn);
					}
				}
			})
		}
		function checkCampus(){
			Ext.Ajax.request({
				url:CONTEXT_PATH+ '/checkListMgmt/checkCampus.json',
				params:{},
				async:false,
				success:function(response){
					var json = Ext.decode(response.responseText);
					if(typeof json.cpsMessg != 'undefined' && typeof json.campusId != 'undefined'){
						campusId = json.campusId;
						btnNew.setHidden(true);
						btnOrder.setHidden(true);
					}else{
						btnNew.setHidden(false);
						btnOrder.setHidden(false);
						campusId = '';
					}
					// Headquarter Code
					headquartersId = json.headquartersId;
				}
			})
		}
		/**
		 * Check campus or head quarters to hide/show button
		 */
		checkCampus();
		// Set defaul for Assessment
		Common.getTreeCode2(classificationStore, 'IC', 'SY0003', 2, 1,'TI',classificationStoreOtp ,getFormField(formHeaderTab, 'classification'));
		// Load classification
		Common.getGeneralCode(assessmentTypeStore, 'IC', 'SY0004','TI',assessmentTypeStoreOtp,getFormField(formHeaderTab, 'assessmentType'));
		
		// Get classification
		function getClassification(parentDetailCode){
			var url = CONTEXT_PATH+'/general/treeCodes2.json';
			var params = {
					systemCode:'IC',
					commonCode:'SY0003',
					parentDetailCode:parentDetailCode,
					treeLevel:2,
					system				: 'TI',
						useYn 			: 'Y'
			}
			Ext.Ajax.request({
				url:url,
				params : params,
				success:function(response){
					var json = Ext.decode(response.responseText);
					var data = json.data;
					var assessmentAll = {
							detailCode:'',
							codeName :'All'
					}
					classificationStore.loadData(data);
					classificationStore.insert(0,assessmentAll);
					
					if(parentDetailCode == '1'){
						getFormField(formHeaderTab,'classification').setValue(classificationCounsel);
						getFormField(formHeaderTab,'assessmentType').setValue(assessmentTypeCounsel);
					}else{
						getFormField(formHeaderTab,'classification').setValue(classificationParent);
						getFormField(formHeaderTab,'assessmentType').setValue(assessmentTypeParent);
					}
//					//use
					getListChecklist();
				}
			})
		}
		async function getListChecklist(){
			paramsSearch.classificationCd = getFormField(formHeaderTab,'classification').getValue();
			paramsSearch.assessmentTypeCd = getFormField(formHeaderTab,'assessmentType').getValue();
			paramsSearch.listChkYNParams = [];
			try {
				var url = '/checkListMgmt/getListChecklist.json';
				var data = await getDataAjax(url,paramsSearch);
				mainStore.loadData(data.listCheckList)
				unMask();
			} catch (e) {
				// TODO: handle exception
			}
		}
		
//		function getListChecklistSuccess(response){
//			var data = Ext.decode(response.responseText);
//			mainStore.loadData(data.listCheckList);
//			
//		}
		function showChecklistDetail(checklistCd){
			checklistDtl.checklistCd = checklistCd;
			checklistDtl.campusId = campusId;
////			//use
			newChecklistPopup.reloadPopup(parentTreeInfo,checklistDtl)
		}
		async function updateChecklist(){
			for(var i = 0;i < mainStore.data.items.length;i++){
				var item = mainStore.data.items[i];
				
				if(item.data.icCheck == false){
					item.data.icCheckYN = 'N';
				}else{
					item.data.icCheckYN = 'Y';
				}
				
				if(item.data.pcCheck == false){
					item.data.pcCheckYN = 'N';
				}else{
					item.data.pcCheckYN = 'Y';
				}
				
				if(item.data.nscCCheck == false){
					item.data.nscCheckYN = 'N';
				}else{
					item.data.nscCheckYN = 'Y';
				}
				
				if(item.data.rcCheck == false){
					item.data.rcCheckYN = 'N';
				}else{
					item.data.rcCheckYN = 'Y';
				}
				
				if(item.data.wcCheck == false){
					item.data.wcCheckYN = 'N';
				}else{
					item.data.wcCheckYN = 'Y';
				}
			}
			var listChkYN = [];
			// Get list checklist client
			for(var i = 0;i < mainStore.data.items.length;i++){
				var item = mainStore.data.items[i];
				listChkYN.push(item.data);
			}
			if(listChkYN.length == 0){
				showMessageBoxWarning('Please update at least one checklist');
			}else{
				var paramsUpdate = {
						listChkYNParams: Ext.encode(listChkYN)
				}
				var url = '/checkListMgmt/updateChecklistClient.json';
				var message = 'Update checklist client successfully !';
				try {
					await saveDataAjax('Do you want to save ?',url,paramsUpdate,'Update successfully','Update Checklist');
					getListChecklist();
					unMask();
				} catch (e) {
					// TODO: handle exception
				}
			}
		}
//		function updateChecklistSuccess(response){
//			var data = Ext.decode(response.responseText);
//			var actionStatus = data.actionStatus;
//			if(actionStatus == 'success'){
////				//use
//				getListChecklist();
//			}
//		}
		
		newChecklistPopup.reloadParent = function(){
			getListChecklist();
		}
		newOrderPopup.reloadParent = function(){
			getListChecklist();
		}
	}
});