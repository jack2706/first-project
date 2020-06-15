/*===============================================================*/
Ext.define('ext.view.myMenu.counselApproval.component.approvalSubmitDetail', {
	extend : 'Ext.panel.Panel',
	//cls: 'wrapper-group-modal',
	//bodyCls: 'wrapper-group-modal-inner',
	layout: 'vbox',
	width: '100%',
	requires: [
    ],
    reloadPage: function(param) {},
    initDetailFromNotif:function(param){},
    initComponent: function () {
    	
        var me =  this;
        
        /* =========Init global variable ========= */
        var paramCommonMsg = {
        		cancelMsg:'error',
        }
	  	var listCounselFileMain = [];
	  	var listCounselCategoryTemp = [];
	  	var studentDetail = {}
		  var commonParam = {
  			
	  		}
	  	var paramsCounsel = {
	  			counselId:'',
	  			counselPlanId:'',
	  			counselState:'',
	  			sendYN:'Y',
	  			sendType:'',
	  			listCounselFileParams:[],
	  			listApprovalParams:[]
	  	}
	  	var paramsCancelSubmitApproval = {
	  			approvalCode:'',
	  			counselId:'',
	  			counselPlanId:'',
	  	}
	  	
	  	/* =========Init global component from another source ========= */
//        var checklistPopup = Ext.create('ext.view.myMenu.counselApproval.component.popup.checklistPopup');
	  	//use
//        var openUrlPopup = Ext.create('ext.view.counselService.planning.component.popup.employeeSelectPopup');
        
//    	var monitoringPlanCtn = Ext.create('ext.view.myMenu.counselApproval.component.grid.counselApprovalComponent.planMonitoringDetail');
		var plannedDetailCtn = Ext.create('ext.view.myMenu.counselApproval.component.grid.counselApprovalComponent.plannedDetail');
//		var planResultDetailCtn = Ext.create('ext.view.myMenu.counselApproval.component.grid.counselApprovalComponent.planResultDetail');
//		var instantCounselDetailCtn = Ext.create('ext.view.myMenu.counselApproval.component.grid.counselApprovalComponent.instantCounselDetail');
        
	    /* =========Init global component UI ========= */
        
	  	var btnClose = Ext.create('Ext.Button', {
			text: 'Close',
			cls: 'btn-button',
			margin: '0 0 0 10',
			//iconCls: 'fa fa-search',
			minWidth: 100,
			handler: function() {
//            	mPopUPHide();
				mcloseDetail();
				
			}
		});
        function mcloseDetail(){
        	var detailApprovalSubmit  = Ext.getCmp('detailApprovalSubmit');
			detailApprovalSubmit.toggleCollapse(true);	 
			//console.log(detailApprovalSubmit.collapsed);
			if(detailApprovalSubmit.collapsed == "right"){
				detailApprovalSubmit.setDisabled(true);					
			}
        }

        var btnCancelSubmit = Ext.create('Ext.Button', {
			text: 'Cancel Submit',
			cls: 'btn-button',
			//iconCls: 'fa fa-search',
			itemId:'btnCancelRS',
			minWidth: 100,
			padding: '8 10',
			handler: function() {
				cancelSubmitApproval();
			}
		});
        var wrpBtnButton = Ext.create('Ext.container.Container', {
			itemId:'wrpBtnButton4',
			layout: 'hbox',
			width : "100%", padding: '10', items: [{xtype: 'tbfill'},btnCancelSubmit,btnClose] ,
		});
       
        /*================*/
//		Ext.define('uploadFileModel', {
//			   extend: 'Ext.data.Model',
//			   fields: [
//			     {name: 'no', mapping : 'no'},
//			     {name: 'name', mapping : 'name'},
//			     {name: 'classa', mapping : 'classa'},
//			     {name: 'ids', mapping : 'ids'},
//			     {name: 'level', mapping : 'level'},
//			     {name: 'grade', mapping : 'grade'}
//			   ]
//		});
//		
		/* =========Init store ========= */
        var counselFileStore = Ext.widget('mestore');
		var uploadStore = Ext.widget('mestore');
		
    	/*=================================================================================================================*/
		
        me.reloadPage = function (param){
        	// Init paramsCancelSubmitApproval
        	paramsCancelSubmitApproval.approvalCode = param.approvalCode;
        	paramsCancelSubmitApproval.counselId = param.counselId;
        	paramsCancelSubmitApproval.counselPlanId = param.counselPlanId;
        	
      	   	paramsCounsel.counselId = param.counselId;
      	   	paramsCounsel.counselPlanId = param.counselPlanId;
      	   	
      	   	// Init StudentDetail
          	studentDetail.stMemCode = param.stMemberCode;
          	studentDetail.studentName = param.studentName;
        
          	// call function of Init commn component each page
          	initCommonComponent(param);
//          	 mPopUPShow();
        } 
        me.initDetailFromNotif = function(param){
        	// Init paramsCancelSubmitApproval
        	paramsCancelSubmitApproval.approvalCode = param.approvalCode;
        	paramsCancelSubmitApproval.counselId = param.counselId;
        	paramsCancelSubmitApproval.counselPlanId = param.counselPlanId;
        	
      	   	paramsCounsel.counselId = param.counselId;
      	   	paramsCounsel.counselPlanId = param.counselPlanId;
      	   	
      	   	// Init StudentDetail
          	studentDetail.stMemCode = param.stMemCode;
          	studentDetail.studentName = param.stMemberName;
        
          	// call function of Init commn component each page
          	initCommonComponent(param);
          	 mPopUPShow();
        }
        this.items = [plannedDetailCtn,wrpBtnButton];
        this.callParent(arguments);
      
//        function fileDownload(info) {
//        	console.log('fileDownload')
//			var ajaxUrl = '/fileMgmt/selectFileDetail.json';
//			var paramToGet = {
//					fileCode			:	info,
//			};
//			apiCallAjaxGetData(ajaxUrl, paramToGet, fileDownloadSuccess);
//		}
//		
//		function fileDownloadSuccess(response){
//			var json = Ext.decode(response.responseText);
//			file = json.data.file;
//			var actualFileName = file.actualFileName;
//			var filePath = file.filePath;
//			var userFileName = file.userFileName;
//			location.href = CONTEXT_PATH + '/general/fileDownload?actualFileName=' + actualFileName + "&filePath=" + filePath + "&userFileName=" + userFileName;
//		}
     
        function initCommonComponent(param) {
    	  var listApprovalLine = getApprovalLineList(param);
    	  var listCategory = searchListCounselCategory(param);
    	  var commonParam = {
    			  approval : param,
    			  listApprovalLine :listApprovalLine,
    			  listCategory:listCategory
    	  }
    	  // init cancel button
    	  setShowedBtnCancel(commonParam);
    	  
    	 
         // Init component Monitoring, Planned, Plan counsel finish and Instant
      	  if(param.counselId != '' && param.counselId.substring(0,2) == 'IC'){
      		  /** for Instant */
//    		instantCounselDetailCtn.setHidden(false);
//            instantCounselDetailCtn.reloadPage(commonParam);
//    		planResultDetailCtn.setHidden(true);
//    		monitoringPlanCtn.setHidden(true);
//    		plannedDetailCtn.setHidden(true);
    	  }else{
//    		instantCounselDetailCtn.setHidden(true);
    		if(param.assignCode != ''){
    			/** for Monitoring*/
//        		monitoringPlanCtn.setHidden(false);
//    			monitoringPlanCtn.reloadPage(commonParam.approval.approvalCode);
//    			planResultDetailCtn.setHidden(true);
//        		instantCounselDetailCtn.setHidden(true);
    			plannedDetailCtn.setHidden(true);
    		}else{
//    			monitoringPlanCtn.setHidden(true);
    			if(param.counselId == '' && param.counselPlanId != ''){
        			plannedDetailCtn.setHidden(false);
        			plannedDetailCtn.reloadPage(commonParam.approval.approvalCode);
//        			planResultDetailCtn.setHidden(true);
        		}else {
//        			planResultDetailCtn.setHidden(false);
//        			planResultDetailCtn.reloadPage(commonParam);
        			plannedDetailCtn.setHidden(true);
        		}
    		}
    	  }
		}
        function setShowedBtnCancel(commonParam){
          	 var listApprovalLine = commonParam.listApprovalLine;
          	 var approval = commonParam.approval;
          	 var isNotApproval = true;
          	
          	 if(typeof listApprovalLine != 'undefined'){
   				if(listApprovalLine.length > 0){
   					Ext.each(listApprovalLine,function(item){
           				if(item.approvalLineGbn.trim() == 'A'){
           					if(item.approvalLineState.trim() == 'P'){
           						isNotApproval = false;
               					return 
               				}
           				}
           			})
   				}else{
   					isNotApproval = false;
   				}
   				
   			}
          	
      		if(isNotApproval){
          		btnCancelSubmit.setHidden(false);
          		
			}else{
				btnCancelSubmit.setHidden(true);
			}
        }
		 async function cancelSubmitApproval(param){
			 
			 var url = '/counselApproval/cancelSubmitApproval.json';
			 var message = 'Cancel submit approval success';
			 try {
				 var data = saveDataAjax('Do you want to cancel submit approval ? ',url,paramsCancelSubmitApproval, message, 'Cancel submit approval');
				 if(data.actionStatus == 'success'){
						paramCommonMsg.cancelMsg = 'success';
						mPopUPHide();
						me.reloadParent(paramCommonMsg);
				 }
				 unMask();
			} catch (e) {
				// TODO: handle exception
			}
		 }
		 
		 // Saerch list category to be used for Instant and plan counsel result
		 function searchListCounselCategory(param){
			 var listCategory = [];
			 var url = CONTEXT_PATH+'/counselApproval/getListCounselCategory.json';
			 var params = {
					counselId:param.counselId
			 }
			Ext.Ajax.request({
				url:url,
				params : params,
				async:false,
				success:function(response){
					var data = Ext.decode(response.responseText);
        			if(data.actionStatus == "success"){
    					var listCounselCategory = data.listCounselCategory;
    					listCategory = [].concat(listCounselCategory);
        			}
        			unMask();
				}
			})
			return listCategory;
		 }
		   
        // Search list approval line to be used for all
        function getApprovalLineList(param) {
        	var listApprovalLine = [];
        	var params = {counselId:param.counselId,approvalCode:param.approvalCode,counselPlanId:param.counselPlanId};
        	Ext.Ajax.request({
        		url:CONTEXT_PATH+'/counselApproval/getApprovalLinesForSubmit.json',
        		params:params,
        		async:false,
        		success:function(response){
        			var data = Ext.decode(response.responseText);
        			if(data.actionStatus == "success"){
        				var listSubmitApprovalLines = data.listSubmitApprovalLines
            			var isNotApproval = true;
            			
                    	var index = 0;
            			if(typeof  listSubmitApprovalLines != 'undefined'){
            				
            				listApprovalLine = [].concat(listSubmitApprovalLines);
            			}
        			}
        		}
        	})
        	return listApprovalLine;
		}
       
    }
});
