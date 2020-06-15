/*===============================================================*/
Ext.define('ext.view.myMenu.counselApproval.component.grid.counselApprovalComponent.plannedDetailPrint', {
	extend : 'Ext.panel.Panel',
	//cls: 'over-show',
	//bodyCls: 'over-show',
	//background:'#edf0f5',
	border: false,
	header: false,
	//width: "100%",
	width: "100%",
	minWidth: 1280,
	autoHeight:true,
    bodyStyle: 'background: #edf0f5;',
	requires: [
    ],
    reloadPage: function() {},
    reloadCommentGrid : function(){},
    initComponent: function () {
        var me =  this;
    	var counselFileStore = Ext.widget('mestore', {
			});
    	var listStudent =[];
        var studentDetail = {
        		stMemCode:'',
        		studentName:''
        };
        
    	
		////////////////format uploadfile for 
    	////////counselUploadFile
		var counselUploadFileRsPRINT = Ext.create('Ext.grid.Panel',{
			columnWidth: 1,
			store:counselFileStore,
	     	//height: 98,
			minHeight: 98,
	     	border: false,
	        header: false,
	     	//autoScroll : true,
	     	autoHeight : true,
	        stripeRows : true,
	        collapsible : true,
	        preserveScrollOnRefresh : true,
	        enableColumnMove  :true,
	        enableColumnResize:true,
	         padding: 0,
	        style: 'background: #fff !important;',
	        bodyStyle: 'background: #fff !important;',
		    cls: 'upload-grid wrapper-file tb-file table-full',
		    bodyCls: 'table-full-body',
	         //style: 'paading: 10px;',
	     	width: "100%",
		  	listeners: { 
		  		cellclick : function(iView, iCellEl, iColIdx, iStore, iRowEl, iRowIdx, iEvent) {
		  		},
		  	},
		  	columns: [
			  	        {text : 'File Name', flex: 3, dataIndex: 'title', header: false, minWidth: 500,
				        	  renderer  : function(value, rootRecord, record) {
				        		  if(record.data.uploaded == false) {
				        			  return value;
				        		  }
				        		  return value;
				        	  }
				          },
			  	],
			  	listeners:{
			  		cellclick:function(iView, iCellEl, iColIdx, iStore, iRowEl, iRowIdx, iEvent){
			  		}
			  	}
		  });
		///////////////
//    	Ext.define('uploadFileModel', {
//			extend : 'Ext.data.Model',
//			fields : [ 
//			
//			]
//		});
        var uploadStore = Ext.widget('mestore', {
//         	model : 'uploadFileModel',
//         	data: [
//     	       {userFileName: 'file 1', fileSize: '80.86KB', uploaded: true},
//     	       {userFileName: 'file 2', fileSize: '80.86KB', uploaded: true},
//     	       {userFileName: 'file 3', fileSize: '80.86KB', uploaded: true},
//     	       {userFileName: 'file 4', fileSize: '80.86KB', uploaded: true}
//    	        ]
         });

	
		var csaPlanPlannedCtn = Ext.create('Ext.container.Container', {
			autoHeight: true,
        	width: "100%",
        	cls: 'wrapper-print',
            style: 'background: #edf0f5;',
        	itemId:'csaPlanPlannedCtn',
            items: [
                    {xtype: 'label', cls: 'lb-titbg d-block', width: 1056, margin: "0 0 10", padding: "10 15", text: 'Counsel Plan'},
                    {xtype: "container",
                        style: 'background: #fff;',
                        padding: 15,
                        itemId:'approvalDtlPLCtn',
                		layout : {
                            type :'table',
                            columns : 4,
                            tableAttrs: {
                               style: {
                                  width: '100%'
                               }
                            }
                         },
                         margin: '0 0 10',
                         cls: 'tb-table tb-info tb-shadow',
                         //width: '100%',
                         width: 1056,
                         items : [
                                  	{xtype: 'label', cls:'td-w140', text : 'Number of Approval a'},
                     	            {xtype: 'label', text : '',itemId:'approvalCd'},
                     	            {xtype: 'label', text : 'Approval', rowspan: 5},
                     	            {xtype: 'container',cls: 'text-left', cellCls: 'tb-box-cell', cls:'wrap-box-cell pos-cell noscroll', height: "100%", width: 630, rowspan :5,itemId:'listApprovalPlanned',
                     	            	items: [
                     	            	       
                     	                       ]
                     	            },

      	               	        {xtype: 'label', cls:'td-w140', text : 'Counsel ID'},
      	          	            {xtype: 'label', text : '',itemId:'counselId'},
      	          	            {xtype: 'label', cls:'td-w140', text : 'Submit Date'},
      	          	            {xtype: 'label', text : '',itemId:'approvalDate'},
      	          	            {xtype: 'label', cls:'td-w140', text : 'Submitter'},
      	          	            {xtype: 'label', text : '',itemId:'submitter'},
      	          	            {xtype: 'label', cls:'td-w140', text : 'Counsel Classification'},
      	          	            {xtype: 'label', text : '',itemId:'counselClassf'},
      	          	            {xtype: 'label', cls:'td-w140', text : 'Receive reference'},
      	          	            {xtype: 'label', text : '', colspan :3,itemId:'listRefNamePlanned'}   
                         ]
            	 },
            	 
            	 {   xtype: "container", 
                     style: 'background: #fff;',
                     padding: 15,itemId:'counselInfoPlannedCtn', 
              		 layout : {
                          type :'table',
                          columns : 2,
                          tableAttrs: {
                             style: {
                                width: '100%'
                             }
                          }               
                       },
                       //margin: '0 0 15',
                       cls: 'tb-table tb-2 tb-shadow',
                       width:1056,
                       items : [
           	            {xtype: 'label', cls:'td-w140', text : 'Counsel Plan Name'}, {xtype: 'label', text : '',itemId:'planTitlePL'},     	                    	                    	            
           	            {xtype: 'label', cls:'td-w140', text : 'Content'}, {xtype: 'label', text : '',itemId:'planContentPL'},     	                    	                    	            
           	            {xtype: 'label', cls:'td-w140', text : 'Counselor Name'}, {xtype: 'label', text : '',itemId:'counselorPL'},     	                    	                    	            
           	            {xtype: 'label', cls:'td-w140', text : 'Counsel Plan Date'}, {xtype: 'label', text : '',itemId:'scheduleDatePL'},     	                    	                    	            
           	            {xtype: 'label', cls:'td-w140', text : 'Counsel Plan Time'}, {xtype: 'label', text : '',itemId:'scheduleTimePL'},    	                    	                    	            
           	            {xtype: 'label', cls:'td-w140', text : 'Student Name'}, {xtype: 'label', text : '',itemId:'stMemberName'},    	                    	                    	            
           	            {xtype: 'label', cls:'td-w140', text : 'Counsel Category'}, {xtype: 'label', text : '',itemId:'counselCategoryPL'},     	                    	                    	            
           	            {xtype: 'label', cls:'td-w140', text : 'Counsel File'},  {xtype: 'container', width: 840, items: [counselUploadFileRsPRINT]},
           	           // {xtype: 'label', cls:'td-w140', text : 'Counsel File'},  {xtype: 'container', cls: 'wrap-tbc', width: '100%', items: [counselUploadFileRsPRINT]}
                       ]
              	 }


            ]
		
         });
	
        this.items = [csaPlanPlannedCtn];
        this.callParent(arguments);
        me.reloadPage = function(param){
        	me.param = param;
        	getDetailApproval(param);
        	console.log('param palnned')
        	console.log(param)
        	listStudent = [];
        }
          	
		 async function getDetailApproval(approvalCode){
				var ajaxUrl = "/counselApproval/getDetailApproval.json"
				var params = {
						approvalCode : approvalCode,
				}
				 try {
						var data1 = await getDataAjax(ajaxUrl, params);
						var data = data1.data;
						

						console.log('successgetDetailApproval ' );
						getCounselPlanFile(data[0]);
						studentDetail.stMemberCode = data[0].stMemberCode;
						studentDetail.studentName = data[0].studentName;
			        	var caseCounselId = data[0].counselId;
						if(caseCounselId == ''){
							csaPlanPlannedCtn.getComponent('approvalDtlPLCtn').getComponent('counselId').setText(data[0].counselPlanId);
						}else{
							csaPlanPlannedCtn.getComponent('approvalDtlPLCtn').getComponent('counselId').setText(caseCounselId);
						}
						csaPlanPlannedCtn.getComponent('approvalDtlPLCtn').getComponent('approvalCd').setText(data[0].approvalCode);
						var submitDateFormat = new Date(data[0].submitDate);
		 				var submitDateShow = submitDateFormat.getFullYear()+'/'+(submitDateFormat.getMonth()+1)+'/'+submitDateFormat.getDate()+' '+submitDateFormat.getHours()+':'+submitDateFormat.getMinutes();
						csaPlanPlannedCtn.getComponent('approvalDtlPLCtn').getComponent('approvalDate').setText(submitDateShow);
						csaPlanPlannedCtn.getComponent('approvalDtlPLCtn').getComponent('submitter').setText(data[0].submitter);
						
						var valueCounselClass ='';
			        	if(data[0].counselClassification == 'PC'){
			        		valueCounselClass = 'Planning Counsel';
			        	}else if(data[0].counselClassification == 'IC'){
			        		valueCounselClass = 'Instant Counsel';
			        	}else if(data[0].counselClassification == 'NC'){
			        		valueCounselClass = 'New Entrance Counsel';
			        	}else if(data[0].counselClassification == 'RC'){
			        		valueCounselClass = 'Return Counsel';
			        	}else if(data[0].counselClassification == 'WC'){
			        		valueCounselClass = 'Withdraw Counsel';
			        	}
						csaPlanPlannedCtn.getComponent('approvalDtlPLCtn').getComponent('counselClassf').setText(valueCounselClass);
						csaPlanPlannedCtn.getComponent('counselInfoPlannedCtn').getComponent('planTitlePL').setText(data[0].counselPlanName);
						csaPlanPlannedCtn.getComponent('counselInfoPlannedCtn').getComponent('planContentPL').setText(data[0].counselInfoPla);
						csaPlanPlannedCtn.getComponent('counselInfoPlannedCtn').getComponent('counselorPL').setText(data[0].counselorName);
						csaPlanPlannedCtn.getComponent('counselInfoPlannedCtn').getComponent('scheduleDatePL').setText(stringToDate(data[0].counselPlanDatePla));
						csaPlanPlannedCtn.getComponent('counselInfoPlannedCtn').getComponent('scheduleTimePL').setText(data[0].counselPlanTimePla);
						csaPlanPlannedCtn.getComponent('counselInfoPlannedCtn').getComponent('stMemberName').setText(data[0].studentNameList != '' ? data[0].studentNameList : data[0].studentName);
						csaPlanPlannedCtn.getComponent('counselInfoPlannedCtn').getComponent('counselCategoryPL').setText(data[0].counselCategory);
						
						studentDetail.stMemberCode = data[0].stMemCodeList;
						studentDetail.studentName = data[0].studentNameList;
						
						
					
						var listStudentCollectionC = data[0].stMemCodeList;
						var listStudentCollectionN = data[0].studentNameList;
						
						var listStudentCode = listStudentCollectionC.split(',');
						var listStudentName = listStudentCollectionN.split(',');
							
						console.log('AraryCode ' +listStudentCode);
						console.log('AraryName ' +listStudentName);
						
						for (var i = 0;i<listStudentCode.length;i++){
							listStudent.push ({
					    		memberCode:	listStudentCode[i].trim(),
					    		memberName:	listStudentName[i].trim(),
					    	})
						}

						
						console.log('----------------'+listStudentCode[0]);
						console.log(listStudent)
						initListMemberApproval(data[0]);	
						unMask();
				 } catch (e) {
						// TODO: handle exception
				 }
			}		
				 ///////////---RECEIVE
				 function initListMemberApproval(param){
			        	getApprovalReceiveList(param);
			        }
				 function getApprovalReceiveList(param) {
			        	var params = {counselId:param.counselId,approvalCode:param.approvalCode,counselPlanId:param.counselPlanId};
			        	console.log('params')
	        			console.log(param)
			        	Ext.Ajax.request({
			        		url:CONTEXT_PATH+'/counselApproval/getApprovalLinesForSubmit.json',
			        		params:params,
			        		async:false,
			        		success:function(response){
			        			var data = Ext.decode(response.responseText);
			        			if(data.actionStatus == "success"){
			        				var listSubmitApprovalLines = data.listSubmitApprovalLines
//				        			console.log(csaPlanMonitoring);
				        			console.log('listSubmitApprovalLines')
				        			console.log(listSubmitApprovalLines)
				        			csaPlanPlannedCtn.getComponent('approvalDtlPLCtn').getComponent('listApprovalPlanned').removeAll();
				        			csaPlanPlannedCtn.getComponent('approvalDtlPLCtn').getComponent('listRefNamePlanned').setText('');
				                	var index = 0;
				        			if(typeof  listSubmitApprovalLines != 'undefined'){
				        				var listRefName = '';
				                		for(var i= 0; i < listSubmitApprovalLines.length;i++){
				                			var item = listSubmitApprovalLines[i];
				                			 var approvalDate = new Date(item.approvalLineDate);
				                	           // for approval list
				                	           if(item.approvalLineGbn.trim() == 'A'){
				                	            var approvalItem ;
				                	            if(item.approvalLineState.trim() == 'P'){
				                	            	approvalItem = Ext.widget('container',{
				                	                 cls: 'box-cell', width: 90, 
				                	                            items: [
				                	                                       {xtype: 'label', height: 52, cls : 'th-head', text : item.personClassName},
				                	                                       {xtype: 'container', cls: 'content tb-content', width: "100%", 
				                	                                        items: [
				                	                                                 {xtype: 'label', cls:'box box-app d-block',text: approvalDate.getFullYear()+'-'+(approvalDate.getMonth()+1)+'-'+approvalDate.getDate()+' '+approvalDate.getHours()+':'+approvalDate.getMinutes()}, 
				                	                                                 {xtype: 'label',height: 64, cls: 'd-block tit-tb',text : item.memberName}
				                	                                                ]
				                	                                       },
				                	                                   ]
				                	                      });
				                	            }else if(item.approvalLineState.trim() == 'R' ){
				                	            	approvalItem = Ext.widget('container',{
				                	                 cls: 'box-cell', width: 90, 
				                	                            items: [
				                	                                       {xtype: 'label', height: 52, cls : 'th-head', text : item.personClassName},
				                	                                      {xtype: 'container', cls: 'content tb-content', width: "100%", 
				                	                                        items: [
				                	                                                 {xtype: 'label', cls:'box box-app-return d-block',text: approvalDate.getFullYear()+'-'+(approvalDate.getMonth()+1)+'-'+approvalDate.getDate()+' '+approvalDate.getHours()+':'+approvalDate.getMinutes()}, 
				                	                                                 {xtype: 'label',height: 64, cls: 'd-block tit-tb mto',text : item.memberName}
				                	                                                ]
				                	                                       },
				                	                                   ]
				                	                      });
				                	            
				                	            }else{
				                	            	approvalItem = Ext.widget('container',{
				                	                 cls: 'box-cell', width: 90, 
				                	                            items: [
				                	                                      {xtype: 'label', height: 52, cls : 'th-head', text : item.personClassName},
				                	                                      {xtype: 'container', cls: 'content tb-content', width: "100%", 
				                	                                       items: [
				                	                                               {xtype: 'label', cls:'box box-num d-block', text: item.approvalSeq}, 
				                	                                               {xtype: 'label',height: 64, cls: 'd-block tit-tb', text : item.memberName}
				                	                                               ]
				                	                                      },
				                	                                   ]
				                	                      });
				                	            }
				                				csaPlanPlannedCtn.getComponent('approvalDtlPLCtn').getComponent('listApprovalPlanned').insert(index,approvalItem);

				                        		index++;
				                			}
				                			// for reference list
				                			if(item.approvalLineGbn == 'R' || item.approvalLineGbn == 'R ' ){
				                				listRefName += item.memberName+", ";
				                			}
				                    	}
				                		listRefName = listRefName.slice(0,listRefName.length-2)
				                		csaPlanPlannedCtn.getComponent('approvalDtlPLCtn').getComponent('listRefNamePlanned').setText(listRefName);
				        			}
			        			}
			        		}
			        	})
					}
			///////	 /////GET LIST COUNSEL PLAN FILE
					async function getCounselPlanFile(param){
					    var ajaxUrl = '/counselApproval/getCounselPlanFile.json';
					    
					    var params = {
					      counselPlanId: param.counselPlanId
					    };
					    try {
							var data1 = await getDataAjax(ajaxUrl, params, callBackSuccessFncFiles);
						    counselFileStore.loadData(data1.data);
							unMask();
						 } catch (e) {
								// TODO: handle exception
						 }
					 }
					async function fileDownload(info) {
							var ajaxUrl = '/serviceSettingController/selectFileDetail.json';
							var paramToGet = {
									fileCode			:	info,
							};
							 try {
									var data1 = await getDataAjax(ajaxUrl, paramToGet);
									file = data1.data.file;
									var actualFileName = file.actualFileName;
									var filePath = file.filePath;
									var userFileName = file.userFileName;
									downloadAttachmentFile(actualFileName,userFileName,filePath);
									  unMask();
							 } catch (e) {
									// TODO: handle exception
							 }
					}
					me.reloadApprovalReceive = function(param){
				    	   getApprovalReceiveList(param)
				       }
  }
});
