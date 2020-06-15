Ext.define('ext.view.myMenu.counselApproval.approvalSubmit', {
	extend : 'Ext.form.Panel',
	header: false,
	width : "100%",
	layout: 'border',
	border: false,
	//cls: 'colpan',
	bodyCls: 'colpan-body',
	openFrom: '',
	noticeParam :{approvalCode:''},
	openDetailPage:function(noticeParam){},
	requires: [
	],
	initComponent : function() {
		var me = this;

		/*==========detail============*/
	    var mainDetails = Ext.create('ext.view.myMenu.counselApproval.component.approvalSubmitDetail');
		var paramsSearch  = {
				startDate:'',
				toDate:'',
				approvalClassSearchType:'',
				approvalClassSearchVal:'',
				approvalStatus :'',
				counselClassification:'',
		}
		
		me.openDetailPage = function(noticeParam){
			///to be define
//			Ext.Ajax.request({
//				url:CONTEXT_PATH+'/counselApproval/getSubmitApprovalForNotif.json',
//				params:{approvalCode:noticeParam.approvalCode},
//				aynsc:false,
//				success:function(response){
//					//use
//					var data = Ext.decode(response.responseText);
//					var submitApprovalTemp = data.submitApprovalForNotif;
//					var submitApproval = {};
//					submitApproval.approvalCode = submitApprovalTemp.approvalCode; 
//					submitApproval.counselId = submitApprovalTemp.counselId; 
//					submitApproval.counselPlanId = submitApprovalTemp.counselPlanId; 
//					submitApproval.stMemCode = submitApprovalTemp.stMemCode; 
//					submitApproval.stMemberName = submitApprovalTemp.stMemberName; 
//					submitApproval.assignCode = submitApprovalTemp.assignCode; 
//					mainDetails.initDetailFromNotif(submitApproval);
//					
//				}
//			});
	     		
			
		}
		
//		function handleOpenFromAnotherPage(){
//			if(me.openFrom =='POPUP_NOTICE'){
				//use
				// to be de
//				me.openDetailPage(me.noticeParam);
//			}
//		}
		
		var listCounselClass = [];
		var couselClassifStoreOtp = getStoreOpt(true, 'All', '', true, '');
		var couselClassifStore = Ext.widget('mestore',{
			autoLoad:true,
			listeners:{
				load:function(store,records,success,operation){
//					console.log('records.data.detailCode : '+records.data.detailCode)
//					if(records.data.detailCode == 'NC'){
//						couselClassifStore.removeAt(couselClassifStore.find('detailCode','NC'));
//					}
//					if(records.data.detailCode == 'RC'){
//						couselClassifStore.removeAt(couselClassifStore.find('detailCode','RC'));
//					}
//					if(records.data.detailCode == 'WC'){
//						couselClassifStore.removeAt(couselClassifStore.find('detailCode','WC'));
//					}
					
				}
			}
			});
		var statusStoreOtp = getStoreOpt(true, 'All', '', true, '');
		var statusStore = Ext.widget('mestore');

		var approvalClasssifStoreOtp = getStoreOpt(true, 'All', '', true, '');
		var approvalClasssifStore = Ext.widget('mestore');
		var mainStore = Ext.widget('mestore', {
			pageSize :10,
			proxy : {
				type : 'ajax',
				url : CONTEXT_PATH
						+ '/counselApproval/getSubmitApprovalList.json',
				reader : {
					type : 'json',
					enablePaging : true,
					rootProperty : 'listSubmitApproval',
					totalProperty:'totalCount'
				}
			},
			listeners:{
				load:function(store,records,success,operation){
				}
			},
			queryMode : 'local'
		})
		var btnSearch = Ext.widget('mebutton', {
			text: 'Search',
			cls: 'btn-button',
			iconCls: 'fa fa-search',
			padding: '8 10',
			//colspan: 2,
			minWidth: 100,
			handler: function() {
				searchSubmittedApproval();
			}
		});
		var classificationForm = Ext.widget('mecombo',{
			width: 300, fieldLabel: 'Approval Classification ',  labelWidth : 130, padding: '0 10 0 0', name:'approvalClassification',valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', store: approvalClasssifStore
			,listeners:{
				change:function(field, newValue, oldValue) {
	            	if(newValue == ''){
	            		formSearch.getComponent('classificationForm').getComponent('approvalClassSearchVal').setDisabled(true)
	            	}else{
	            		formSearch.getComponent('classificationForm').getComponent('approvalClassSearchVal').setDisabled(false)
	            	}
				}
			}
		})
		var statusForm = Ext.widget('mecombo',{
			 columnWidth : 0.3, fieldLabel: 'Approval Status ', labelWidth : 130, name:'status',valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', store: statusStore
		})
		var counselClassificationForm = Ext.widget('mecombo',{
			 columnWidth : 0.3, fieldLabel: 'Counsel Classification', labelWidth : 130, padding: '0 10', name:'counselClassification',valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', store: couselClassifStore
		})
		var formSearch = Ext.create('Ext.form.Panel', {
			width: '100%',
			border: false,
			padding: '10 0 10 10',
			style: 'border:1px solid #b5b8c8; border-radius:3px;',
			margin: "0 0 5",
			minWidth: 980,
			layout: 'column',
	      	items : [
			   	       {xtype: 'medate', columnWidth : 0.28, fieldLabel: 'Period Search', labelSeparator: '', labelWidth : 130,name:'startDate'},
			   	       {xtype: 'medate', columnWidth : 0.22, fieldLabel: '~', labelStyle: 'text-align: center; ',  labelWidth : 40,name:'toDate'},
				   	   {xtype:'panel',  columnWidth : 0.5, itemId:'classificationForm', layout: 'hbox', padding: '0 10 10',  border: false, 
		       	        	items:[ 
			       	        	    classificationForm,
			     		   	       {xtype:'metext',name:'approvalClassSearchVal', flex: 1,itemId:'approvalClassSearchVal', allowBlank: false,
			       	        	    	listeners:{
			       	        	    		specialkey:function(f,e){
			       	        	    			if(e.getKey() == e.ENTER){
			       	        	    				searchSubmittedApproval();
			       	        	    			}
			       	        	    		}
			       	        	    	}
			     		   	       }, 
		       	        	       ]
		       	        },
			   	       statusForm,
			   	       counselClassificationForm,
			   	       {xtype: 'container', layout: 'hbox', padding: '0 10 0 0', columnWidth : 0.4, items: [{xtype: 'tbfill'}, btnSearch]}
			   	       
			   	       
	       	        ]
			});
		/*========================*/
		
		var mainGrid = Ext.create('Ext.grid.Panel', {
			  store             : mainStore,
			  stripeRows        : true,
	    	  width             : "100%",
	    	  autoScroll: true,
	    	  flex: 1,
	    	  minHeight: 100,
	    	  header: false,
	    	  preserveScrollOnRefresh : true,
	    	  collapsible       : true,
	    	  enableColumnMove  :true,
	    	  enableColumnResize:true,
	    	  viewConfig : {
	    		   forceFit : true,
	    	  },
	          columns: [
	             /*{header: "Number", dataIndex: 'rowNo', align: 'center', minWidth: 60, maxWidth: 80, flex:  1, sortable: false, hideable: true,
	                 renderer : function(value, meta, record, rowIndex, colIndex, store){
	                   return rowIndex + 1;
	                 }
	             },*/
	             {header: "NO", dataIndex: 'rowNumber', align: 'center', width: 90,  sortable: false, hideable: true},
	             {header: "Approval No", dataIndex: 'approvalCode', align: 'center', minWidth: 150, flex:  1.5, sortable: true, hideable: false},
	             {header: "Counsel ID", dataIndex: 'counselIdTemp', align: 'center',  minWidth: 120, flex:  1.2, sortable: true,
	            	
	             },
	             {header: "Counsel Classification", dataIndex: 'counselClassification', align: 'center', flex: 1.5, minWidth: 150,  sortable: true},
	             {header: "Approval Status", dataIndex: 'approvalStatusName', align: 'center', flex: 1.3, minWidth: 130, sortable: true},
	             {header: "Counsel Plan name", dataIndex: '', align: 'center', flex: 1.5, minWidth: 150, sortable: true,
	            	 renderer:function(val,meta,record){
	            		 var counselPlanName = '';
	            		 if(record.data.counselId != '' && record.data.counselPlanId == ''){
	            			 counselPlanName =  '-';
	            		 }else{
	            			 counselPlanName = record.data.counselPlanName;
	            		 }
	            		 return counselPlanName;
	            	 }
	             },
	             {header: "Counsel Category", dataIndex: 'counselCategory', align: 'center', flex: 2.3, minWidth: 230, sortable: true},
	             {header: "Submit date", dataIndex: '', align: 'center', flex: 2, minWidth: 200, sortable: true,
	            	 renderer: function(val,meta,record){
//	        		  return formatDateTime(record.data.submitDate,'/')[0];
	        		  return record.data.submitDate;
	        	  }},
	             {header: "Approval date", dataIndex: '', align: 'center', flex: 1.1, minWidth: 110, sortable: true,
	        		  renderer: function(val,meta,record){
//	        		  return formatDateTime(record.data.approvalDate,'/')[0];
	        			  return record.data.approvalDate;
	        	  }},
	             {header: "Final approver", dataIndex: 'finalApproverName', align: 'center', flex: 1.1, minWidth: 110, sortable: true,}
	         ],
	         listeners: {
	        	 rowclick : function(grid, record, columnIndex ){
	        		 //console.log(rightPanel.collapsed);
	        		 //rightPanel.toggleCollapse(true);
	        		 //rightPanel.expand(true);
	        		 console.log(rightPanel.collapsed);
	        		 if(rightPanel.collapsed=="right"){
		        		 mainDetails.reloadPage(record.data);
		        		 //me.removeCls("colpan");
		        		 rightPanel.expand(true);
		        		 rightPanel.setDisabled(false);	        			 
	        		 }else{
		        		 //me.addCls("colpan");	
	     				 if(rightPanel.collapsed == "right"){
		        			 rightPanel.setDisabled(true);     				
	    				 }   
	        			 rightPanel.toggleCollapse(true);			 
	        		 }
	             },
	             
	         },
			bbar : {
				xtype : 'pagingtoolbar',pageSize : 10,displayInfo : true,
				store:mainStore,
				listeners : {
   				beforechange : function(pagingtoolbar, page, eOpts) {
//   					flgPagging = 'pagging';

					mainGrid.setLoading(true);
   					var myProxy = this.store.getProxy();
   					myProxy.setExtraParam('startDate',paramsSearch.startDate);
   					myProxy.setExtraParam('toDate',paramsSearch.toDate);
   					myProxy.setExtraParam('approvalClassSearchType',paramsSearch.approvalClassSearchType);
   					myProxy.setExtraParam('approvalClassSearchVal',paramsSearch.approvalClassSearchVal);
   					myProxy.setExtraParam('approvalStatus',paramsSearch.approvalStatus);
   					myProxy.setExtraParam('counselClassification',paramsSearch.counselClassification);
   				}, 
   				change: function(pagingtoolbar, page, eOpts){
                	mainGrid.setLoading(false);
                },
                
   			}
			},
	       });
	    /*===========end detail===========*/
	    
	    var mainWrapContainer = Ext.create('Ext.container.Container', {
	    	width: "100%",
	    	cls: 'group-main',
	    	border: false,
	    	header: false,
	    	padding: 15,
	    	margin: '15 0 0',
	    	//items: [formSearch,mainGrid]
	    });
	   
	    let leftPanel = Ext.widget('panel', {
	    	width: '5%',
			layout: 'vbox',
			border: false,
			region: 'center',
			split: false,
			bodyPadding: 5,
			
			items: [formSearch,mainGrid],
	         listeners: {
	             render: function(panel) {
		             panel.body.on('click', function() {
		                 //alert(rightPanel.collapsed);
		                 if(rightPanel.collapsed!="right"){
			        		 //me.removeCls("colpan");
		        			 rightPanel.toggleCollapse(true);	
		        			 //rightPanel.setDisabled(true);
		        			 //console.log("aaaa");   
			        		 /*me.removeCls("colpan");	
		        			 if(rightPanel.collapsed=="right"){
				        		 me.addCls("colpan");		        				 
		        			 }	 */
		        		 }else{
			        		 //me.addCls("colpan");
		        		 }
	     				 if(rightPanel.collapsed == "right"){
		        			 rightPanel.setDisabled(true);     				
	    				 }   
		             });
		          }
	        	 
	         }
		});
		let rightPanel = Ext.widget('form', {
			region: 'east',
			collapsible: true,
			border: false,
			header: false,
			layout: 'vbox',
			collapsed: true,
			width: '95%',
			autoScroll: true,
			split: true,
			id:"detailApprovalSubmit",
			//hidden: true,
	        items: [mainDetails]
		});
		this.items = [leftPanel, rightPanel];
		this.callParent(arguments);

		rightPanel.setDisabled(true);
		function initCombobox(){
			Common.getGeneralCode(statusStore, 'CS', 'CS0013','TI', statusStoreOtp,getFormField(formSearch, 'status'));
			Common.getGeneralCode(couselClassifStore, 'CS', 'CS0001','TI', couselClassifStoreOtp,getFormField(formSearch, 'counselClassification'));
			Common.getGeneralCode(approvalClasssifStore, 'CS', 'CS0019','TI', approvalClasssifStoreOtp,getFormField(formSearch, 'approvalClassification'));
		
			 // Load counsel classification
			
			var url = CONTEXT_PATH+'/general/generalCodes.json';
			var params = {
				systemCode:'CS',
				commonCode:'CS0001',
			}
			Ext.Ajax.request({
				url:url,
				params : params,
				async:false,
				success:function(response){
					var json = Ext.decode(response.responseText);
					var data = json.data;
					listCounselClass = data;
					listCounselClass = listCounselClass.filter(function(el){
						return ( el.detailCode != 'NC' || el.detailCode != 'RC' || el.detailCode != 'WC')
					})
				}
			})
		}
		
		// call initCombobox
		initCombobox();
		
		function searchSubmittedApproval(){
			paramsSearch.startDate = Ext.Date.format(getFormField(formSearch,'startDate').getValue(),'Ymd');
			paramsSearch.toDate = Ext.Date.format(getFormField(formSearch,'toDate').getValue(),'Ymd');
			paramsSearch.approvalStatus = getFormField(formSearch,'status').getValue();
			paramsSearch.counselClassification = getFormField(formSearch,'counselClassification').getValue();
			paramsSearch.approvalClassSearchType = getFormField(formSearch,'approvalClassification').getValue();
			paramsSearch.approvalClassSearchVal = getFormField(formSearch,'approvalClassSearchVal').getValue();
			
			var startDateConvert = new Date(getFormField(formSearch,'startDate').getValue()).getTime();
			var toDateConvert = new Date(getFormField(formSearch,'toDate').getValue()).getTime();
			if(paramsSearch.approvalClassSearchVal != '' ||  paramsSearch.approvalClassSearchType == ''){
				if(startDateConvert < toDateConvert || paramsSearch.toDate == '' || paramsSearch.startDate == '' ){
					if(formSearch.isValid() == true){
						mainStore.removeAll();
						mainGrid.setLoading(true);
						mainStore.loadPage(1, {
							params: paramsSearch,
							callback:function(){
								mainGrid.setLoading(false);
							}
							
						});
					}
					
				}else{
	        		showMessageBoxWarning("Please choose correct search period !");
	        		return;
				}
			}
		}
//		mainDetails.reloadParent = function(paramCommonMsg){
//			if(paramCommonMsg.cancelMsg = 'success'){
//				searchSubmittedApproval();
//			}
//		}
		
//		handleOpenFromAnotherPage();
	}
});