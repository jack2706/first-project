/*===============================================================*/
Ext.define('ext.view.myMenu.counselApproval.component.grid.counselApprovalComponent.plannedDetail', {
	extend : 'Ext.panel.Panel',
	//cls: 'over-show',
	//bodyCls: 'over-show',
	border: false,
	header: false,
	layout:'vbox',
	width: "100%",
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
        var paramLoad = {
        		approvalcode: ''
        };

        var printer = Ext.create('ext.view.myMenu.counselApproval.printer');
        //WHETHER USE OR NOT
//        var openUrlPopup = Ext.create('ext.view.counselService.planning.component.popup.employeeSelectPopup');
//        var achievementPopup = Ext.create('ext.view.counselService.planning.component.popup.AchievementPopup');
//		var workHabitsPopup = Ext.create('ext.view.counselService.planning.component.popup.WorkHabitsPopup');
//		var UTSynthesisPopup = Ext.create('ext.view.counselService.planning.component.popup.UTSynthesisPopup');
//        var searchStudentPopup = Ext.create('ext.view.serviceSetting.fileMgmt.popup.searchStudentPopup');
        var comment = Ext.create('ext.view.myMenu.counselApproval.component.grid.counselApprovalComponent.comment');
        var plannedDetailPrint = Ext.create('ext.view.myMenu.counselApproval.component.grid.counselApprovalComponent.plannedDetailPrint');
       
    	////////counselUploadFile
		var counselUploadFileRs = Ext.create('Ext.grid.Panel',{
			//columnWidth: 1,
			store:counselFileStore,
	     	height: 98,
	     	//border: false,
	        header: false,
	     	autoScroll : true,
	     	//autoHeight : true,
	        stripeRows : true,
	        collapsible : true,
	        preserveScrollOnRefresh : true,
	        enableColumnMove  :true,
	        enableColumnResize:true,
	         //style: 'paading: 10px;',
	     	//width: '100%',
	        flex: 1,
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
				          {text : 'File Size', maxWidth: 40, dataIndex: 'fileSize', align : 'right', header: false,  flex: 1, 
				        	  renderer: function(val,meta,rec) {
					        	  if(rec.data.fileTypeCode == 'U' || rec.data.fileType == 'U'){
					        		  return "<a href=\"#\" data-action=\"preView\" class=\"btn-grid fa fa-list-alt\"></a>";
					        	  }else{
					        		  return "<a href=\"#\" data-action=\"download\" class=\"btn-grid fa fa-download\"></a>";
					        	  }
				        	  }
				          }
			  	],
			  	listeners:{
			  		cellclick:function(iView, iCellEl, iColIdx, iStore, iRowEl, iRowIdx, iEvent){
			  			if($(iEvent.target).data('action') == 'preView') {
			        		if (iStore.data.systemCode == 'LC') {
	                     	  // var listMember = [{memberCode: studentDetail.stMemCode,memberName: studentDetail.studentName}];
//	                     	   openUrlPopup.reloadPopup({list: listStudent, classification: iStore.data.param1});
	                        } else {
	                     	   window.open(iStore.data.url,'_blank');
	                        }
				    	}
			        	else if($(iEvent.target).data('action') == 'download') {
			        		fileDownload(iStore.data.fileCode);
				    	}
			  		}
			  	}
		  });
		var btnPrint2 = Ext.create('Ext.Button', {
			text: 'Print',
			cls: 'btn-button',
			iconCls: 'fa fa-print',
			minWidth: 100,
			handler: function() {
				//use
//				plannedDetailPrint.setHidden(false);
//				printer.print(plannedDetailPrint);
				//not use
			//	csaPlanPlannedCtn.reloadPage(paramLoad.approvalCode);

				//use
				plannedDetailPrint.setHidden(true);
			}
		});

		var wrpBtnButtonPrint2 = Ext.create('Ext.container.Container', {
			padding: "10 10 0",
			layout: 'hbox', items: [{xtype: 'tbfill'}, btnPrint2 ] ,width : "100%"
		});
		//==========================================================================================================
		
		var listApprovalPlannedCtn = Ext.create('Ext.container.Container', {
			cls: 'text-left', 
			cellCls: 'tb-box-cell', 
			cls:'wrap-box-cell pos-cell', 
			height: "100%", 
			width: 630, 
			rowspan :5,
		     items: [
		             
		     ]
       });
		let plannedApprovalDtl = Ext.create('Ext.form.Panel', {
			//width: '100%',
			flex: 1,
			border: false,
			//autoScroll: true,
			//bodyPadding: 5,
			layout: 'vbox',
			cls: 'tb-custom',
			bodyCls: 'tb-custom-body',
			items: [
				{xtype: 'medisplayfield', width: '100%', style: 'border-bottom: solid 1px #eee;', name: 'numOfApproval', labelStyle: 'padding-left: 10px;', fieldLabel: 'Number of Approval', value: '', labelWidth: 145, margin: "0"},
				{xtype: 'medisplayfield', width: '100%', style: 'border-bottom: solid 1px #eee;', name: 'counselId', labelStyle: 'padding-left: 10px;', fieldLabel: 'Counsel ID', value:'' , labelWidth: 145, margin: "0"},
				{xtype: 'medisplayfield', width: '100%', style: 'border-bottom: solid 1px #eee;', name: 'submitDate', labelStyle: 'padding-left: 10px;', fieldLabel: 'Submit Date', value: '', labelWidth: 145, margin: "0"},
				{xtype: 'medisplayfield', width: '100%', style: 'border-bottom: solid 1px #eee;', name: 'submitter', labelStyle: 'padding-left: 10px;', fieldLabel: 'Submitter', value:'' , labelWidth: 145, margin: "0"},
				{xtype: 'medisplayfield', width: '100%', style: 'border-bottom: solid 1px #eee;', name: 'counselClassification', labelStyle: 'padding-left: 10px;', fieldLabel: 'Counsel Classification', value:'' , labelWidth: 145, margin: "0"},
				{xtype: 'medisplayfield', width: '100%', name: 'refs', fieldLabel: 'Reference', labelStyle: 'padding-left: 10px;', value:'' , labelWidth: 145, margin: "0"},
	        ]
		});
		let approvalItem = Ext.create('Ext.container.Container', {
			columnWidth  : 0.2,
			layout: 'vbox',
			style: 'background: #fff; border-right: solid 1px #f6f6f6;',
			height: 215,
			items:[
			        {xtype: 'medisplayfield', width: '100%', height: 60, bodyPadding: '10 5', value: 'Librarian', style: 'background: #f6f6f6; text-align: center;'},
			        {xtype: 'medisplayfield', width: '100%', cls: 'num-text', padding: "10 5", value: '1', style: 'text-align: center; '},
			        {xtype: 'medisplayfield', width: '100%', value: 'Tracy (Nguyễn Thị Phương Thảo)', style: 'text-align: center;'}
			       ]
		});
		let approvalWrap = Ext.create('Ext.container.Container', {
			width: 580,
            layout : 'column' ,
			height: 215,
			style: 'background: #ececec; border-left: solid 1px #f6f6f6;',
			autoScroll: true,
			items:[approvalItem]
		});
		let plannedApprovalDtWrap = Ext.create('Ext.panel.Panel', {
			width: '100%',
			//flex: 1,
			//margin: 10,
			padding: "10",
			cls: 'box-shadow',
			//style: 'border: solid 1px #eee;',
			bodyStyle: 'border: solid 1px #eee;',
			margin: "10 10 15",
			//cls: 'box-shadow',
			//border: false,
			//bodyStyle: 'border: solid 5px #ccc;',
			//bodyPadding: 10,
			//margin: 10,
			layout: 'hbox',
			items:[plannedApprovalDtl, {xtype: 'label', style: 'border-left: solid 1px #f6f6f6; font-weight: normal; text-align: center; line-height: 210px;',  text: 'Approval', width: 120}, approvalWrap]
		});
		//==========================================================================================================
		var plannedCounselInfo = Ext.create('Ext.form.Panel', {
			width: '100%',
			padding: "10",
			//style: 'border: solid 1px #eee;',
			bodyStyle: 'border: solid 1px #eee;',
			layout: 'vbox',
			cls: 'tb-custom box-shadow',
			bodyCls: 'tb-custom-body',
			margin: "5 10 10",
			items: [
				{xtype: 'medisplayfield', style: 'border-bottom: solid 1px #eee;', margin: "0", name: 'counselPlanName', labelStyle: 'padding-left: 10px;', fieldLabel: 'Counsel Plan Name', value:'' , labelWidth: 145, width:"100%"},
				{xtype: 'medisplayfield', style: 'border-bottom: solid 1px #eee;', margin: "0", name: 'content', labelStyle: 'padding-left: 10px;', fieldLabel: 'Content', value:'' , labelWidth: 145, width:"100%"},
				{xtype: 'medisplayfield', style: 'border-bottom: solid 1px #eee;', margin: "0", name: 'counselorName', labelStyle: 'padding-left: 10px;', fieldLabel: 'Counselor Name', value: '', labelWidth: 145, width:"100%"},
				{xtype: 'medisplayfield', style: 'border-bottom: solid 1px #eee;', margin: "0", name: 'counselPlanDate', labelStyle: 'padding-left: 10px;', fieldLabel: 'Counsel Plan Date', value:'' , labelWidth: 145, width:"100%"},
				{xtype: 'medisplayfield', style: 'border-bottom: solid 1px #eee;', margin: "0", name: 'counselPlanTime', labelStyle: 'padding-left: 10px;', fieldLabel: 'Counsel Plan Time', value:'', labelWidth: 145, width:"100%"},
				{xtype: 'medisplayfield', style: 'border-bottom: solid 1px #eee;', margin: "0", name: 'studentName', labelStyle: 'padding-left: 10px;', fieldLabel: 'Student Name', value:'' , labelWidth: 145, width:"100%"},
				{xtype: 'medisplayfield', style: 'border-bottom: solid 1px #eee;', margin: "0", name: 'counselCategory', labelStyle: 'padding-left: 10px;', fieldLabel: 'Counsel Category', value:'' , labelWidth: 145, width:"100%"},
				//{xtype: 'medisplayfield', style: 'border-bottom: solid 1px #f6f6f6;', margin: "5 0 0", name: 'counselFile', fieldLabel: 'Counsel File', value:'' , labelWidth: 140, width:"100%"},
  	            {xtype: 'container', padding: "10 0", layout: 'hbox',  width: '100%', items: [{xtype: 'label', style: 'display: block; font-weight: normal; padding-left: 10px;', text: 'Counsel File', width: 155}, counselUploadFileRs]},
  	            ]
		});

		//==========================================================================================================
		var csaPlanPlannedCtn = Ext.create('Ext.container.Container', {
			//autoHeight: true,
        	width: '100%',
        	layout: 'vbox',
        	listeners : {
                resize : function(win,width,height,opt){
                	/*var wb = width - 191;
                	var idwb = csaPlanPlannedCtn.getId();
                	$("#" + idwb).find(".wrap-tbgrid").each(function(){
                    	var idgird = $(this).attr("id");
                    	Ext.getCmp(idgird).setWidth(wb);
                	});*/
                 }
        	},
        	itemId:'csaPlanPlannedCtn',
            items: [
                    {xtype: 'label', cls: 'lb-titbg d-block', style: 'background: #8e9fba; color: #fff; font-size: 15px; line-height: 20px;', width: "100%", margin: 0, padding: "10 15", text: 'Counsel Plan'},
                    wrpBtnButtonPrint2,
                    plannedApprovalDtWrap,
                    plannedCounselInfo,
            ]
		
         });
		plannedDetailPrint.setHidden(true);
        this.items = [plannedDetailPrint,csaPlanPlannedCtn,comment];
        this.callParent(arguments);
        me.reloadPage = function(param){
        	me.param = param;
        	paramLoad.approvalCode = param;
        	//use
//        	comment.reloadPage(param);
        	getDetailApproval(param);
        	//use
//        	plannedDetailPrint.reloadPage(param);
        	listStudent = [];
        }
          	
		 async function getDetailApproval(approvalCode){
				var ajaxUrl = "/counselApproval/getDetailApproval.json"
				var params = {
						approvalCode : approvalCode,
				}
				try {
					
					var data1 = await getDataAjax(ajaxUrl, params);
					listStudent = [];
					var data = data1.data;
					var dataListStudent = data1.dataListStudent;
					
					getCounselPlanFile(data[0]);
					
					studentDetail.stMemberCode = data[0].stMemberCode;
					studentDetail.studentName = data[0].studentName;
					
		        	var caseCounselId = data[0].counselId != '' ? data[0].counselId : data[0].counselPlanId;
					getFormField(plannedApprovalDtl,'counselId').setValue(caseCounselId);
					getFormField(plannedApprovalDtl,'numOfApproval').setValue(data[0].approvalCode);
					
					var submitDateShow = '';
					 if(typeof data[0].submitDate !='undefined'){
			            	if(data[0].submitDate !=''){
			            		var submitDateFormat = new Date(data[0].submitDate);
			     				submitDateShow = submitDateFormat.getFullYear()+'/'+(submitDateFormat.getMonth()+1)+'/'+submitDateFormat.getDate()+' '+submitDateFormat.getHours()+':'+submitDateFormat.getMinutes();
			        		}	
			            }
					
					 getFormField(plannedApprovalDtl,'submitDate').setValue(submitDateShow);
					 getFormField(plannedApprovalDtl,'submitter').setValue(data[0].submitter);
					
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
		        	
		        	getFormField(plannedApprovalDtl,'counselClassification').setValue(valueCounselClass);
		        	getFormField(plannedCounselInfo,'counselPlanName').setValue(data[0].counselPlanName);
		        	getFormField(plannedCounselInfo,'content').setValue(data[0].counselInfoPla);
		        	getFormField(plannedCounselInfo,'counselorName').setValue(data[0].counselorName);
		        	getFormField(plannedCounselInfo,'counselPlanDate').setValue(stringToDate(data[0].counselPlanDatePla));
		        	getFormField(plannedCounselInfo,'counselPlanTime').setValue(data[0].counselPlanTimePla);
		        	var tempStudentName = "";
		        	if(dataListStudent != null && dataListStudent.length > 0 ){
		        		for(var i = 0 ; i <  dataListStudent.length ; i++ ){
		        			var tempDataStudent = dataListStudent[i];
		        			if(tempStudentName == ""){
		        				tempStudentName = tempDataStudent.memberName;
		        			}else{
		        				tempStudentName = tempDataStudent +", " + tempDataStudent.memberName;
		        			}
		        			listStudent.push ({
		        				learningYearCode:	tempDataStudent.learningYearCode,
		        				termGbn:		tempDataStudent.semesterGbn,
		        				courseCode:		tempDataStudent.courseCode,
		        				levelCode:		tempDataStudent.levelCode,
		        				stMemCode:		tempDataStudent.stMemCode,
		        				memberCode:		tempDataStudent.stMemCode,
		        				clientCode:		tempDataStudent.clientCode,
		        				classCode:		tempDataStudent.classCode,
		        				memberName:		tempDataStudent.memberName
					    	})
		        		}
		        	}
		        	getFormField(plannedCounselInfo,'studentName').setValue(tempStudentName);
		        	stMemberNamePlanned.setText(data[0].studentNameList != '' ? data[0].studentNameList : data[0].studentName);
		        	getFormField(plannedCounselInfo,'counselCategory').setValue(data[0].counselCategory);
					
					studentDetail.stMemberCode = data[0].stMemCodeList;
					studentDetail.studentName = data[0].studentNameList;
					//param.approvalCode = data[0].approvalCode;
					//use
//					var listStudentCollectionC = data[0].stMemCodeList;
//					var listStudentCollectionN = data[0].studentNameList;
					
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
			        	Ext.Ajax.request({
			        		url:CONTEXT_PATH+'/counselApproval/getApprovalLinesForSubmit.json',
			        		params:params,
			        		async:false,
			        		success:function(response){
			        			var data = Ext.decode(response.responseText);
			        			if(data.actionStatus == "success"){
			        				var listSubmitApprovalLines = data.listSubmitApprovalLines
				        			listApprovalPlannedCtn.removeAll();
				        			listRefNamePlannedTxt.setText('');
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
				                	            listApprovalPlannedCtn.insert(index,approvalItem);

				                        		index++;
				                			}
				                			// for reference list
				                			if(item.approvalLineGbn.trim() == 'R'){
				                				listRefName += item.memberName+", ";
				                			}
				                    	}
				                		listRefName = listRefName.slice(0,listRefName.length-2)
				                		getFormField(plannedApprovalDtl,'refs').setValue(listRefName);
				        			}
			        			}
			        			unMask();
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
							var data1 = await getDataAjax(ajaxUrl, params);
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
									var data1 = await getDataAjax(ajaxUrl, paramToGet, fileDownloadSuccess);
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
//					me.reloadApprovalReceive = function(param){
//				    	   getApprovalReceiveList(param)
//				       }
					me.reloadCommentGrid = function(param){
						//use
//						comment.reloadGrid(param);
					};
  }
});
