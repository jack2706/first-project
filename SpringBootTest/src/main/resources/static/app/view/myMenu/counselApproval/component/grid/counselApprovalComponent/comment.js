/*===============================================================*/
Ext.define('ext.view.myMenu.counselApproval.component.grid.counselApprovalComponent.comment', {
	extend : 'Ext.form.Panel',
	cls: 'form-container tb-shadow',
	bodyCls: "form-nonetran",
	header: false,
	border: false,
	width: '100%', 
	//padding: "0 0 5",
    //bodyStyle: "background: #fff !important;",
	//margin: '0 0 10',
	layout: 'vbox',
	requires: [
	           ],
	resizePrint: function(){},
    reloadPage: function() {},
    reloadGrid: function(){},
    initComponent: function () {
        var me =  this;
        var paramComment = {
        		approvalCode  : '',
    			approvalState : '',
    			commentContent : '',
    			commentSeq     : 0
            };
        
        var memberCode = '';
        var CommentStore = Ext.widget('mestore', {
			proxy : {
		        type: 'ajax',
		        url: CONTEXT_PATH + '/counselApproval/getApprovalCommentList.json',
		        reader: {
		            type: 'json',
		            enablePaging: true,
		            rootProperty: 'data',
		            getResponseData : function(response){
		   	 			var json = Ext.decode(response.responseText);
		   				memberCode = json.memberCode;
		   				//console.log(memberCode);
		   				return json.data;
	   	 			}
		        }
			},
		 });
        var formContent = Ext.create('Ext.form.Panel',{
        	width: '100%',
        	cls: 'form-comment',
        	bodyCls: 'form-comment-body',
        	header: false,
        	border: false,
            //bodyStyle: "background: #fff !important;",
        	padding: "10",
        	items:[
					{xtype: 'label', html: "<span class='errors'>*</span> Approval Notices - Please input if have notices",  cls: 'd-block', width: '100%'},
					 {xtype: 'form', width: "100%", layout: 'hbox', cls: 'form-input', border: false, header: false, padding: "5 0",itemId : 'formInput',
					 	items: [
					 	       {xtype: 'mearea',flex: 1, allowBlank: false, border: false, hideLabel: false, cls: 'input-text', name : 'input',itemId : 'textMain'},
					 	       {xtype: 'hiddenfield', name: 'flag',value:'1'},					 	        
					 	       {xtype: 'button', cls: 'input-btn btn-button', text: 'Input', style: 'border-radius: 0;', width: 84, height: "100%",
					 	        	handler: function() {
					 	        	
					 	        		var flag = getFormField(formContent.getComponent('formInput'), 'flag').getValue();
					 	        		var contentSave = Ext.String.trim(paramComment.commentContent);
					 	        		if(flag ==  '1'){
					 	        			paramComment.commentContent = getFormField(formContent.getComponent('formInput'), 'input').getValue();
						 	        		//console.log(Ext.String.trim(paramComment.commentContent));
						 	        		paramComment.approvalState = '';
						 	        		submitComment();
						 	        		//formContent.getComponent('formInput').getComponent('textMain').setValue('');
					 	        		}else{
					 	        			paramComment.commentContent = getFormField(formContent.getComponent('formInput'), 'input').getValue();
					 	        			//console.log(paramComment.commentContent);
					 	        			updateApprovalComment(paramComment.approvalCode,paramComment.commentSeq);
					 	        		}
					 	        		getFormField(formContent.getComponent('formInput'), 'flag').setValue('1');
					 	        		
					 	             }
					 	        }
					 	       ]
					 },
//					 approvalGrid
        	       ]
        });
        var test = true;
		var approvalGrid = Ext.create('Ext.grid.Panel',{
			store : CommentStore,
			//columnWidth: 1,
			maxHeight:330,
			autoScroll : true,
			padding: '0 10',
			minHeight: 0,
	     	border: false,
	        header: false,
	     	autoHeight : true,
	        stripeRows : true,
	        collapsible : true,
	        preserveScrollOnRefresh : true,
	        enableColumnMove  :true,
	        enableColumnResize:true,
	        //style: 'background: #fff !important;',
	        //bodyStyle: 'background: #fff !important;',
	        //cls: 'upload-grid wrapper-file tb-file tb-comment',
	     	width: '100%',
		  	columns: [
			          {text : '', flex: 1, dataIndex: 'approvalStateName', align: 'center', tdCls: 'v-mid', header: false, maxWidth: 90,
					        	  renderer  : function(value, demo, record) {
					        		 // console.log(record.data.approvalState)
					        		  if(record.data.approvalState == 'P ') {
					        			  var strBox = '<span class="box-titw box-approval"><span>'+value+'</span></span>';
					        			  return strBox; 
					        		  }
					        		  if(record.data.approvalState == 'R ') {
					        			 var  strBox = '<span class="box-titw box-return"><span>'+value+'</span></span>';
					        			 return strBox
					        		  }
					        	  }
					          },
					          {text : '', minWidth : 200, dataIndex: 'name', header: false,  flex: 2,
					        	  renderer:function(value, demo, record){
					        		//  console.log(record.data)
					        		  var strBox = '<div class="content"><p><strong>' + record.data.memberName + '</strong> : ' + record.data.lastUpdDttm + '</p>';
					        		      strBox += '<p class="description">' + record.data.commentContent + '<p></div>';
					        		  return strBox;
					        	  }
					          },
					          {text : '', width : 40, dataIndex: 'status', align : 'center', tdCls: 'v-mid', header: false, 
					        	  renderer  : function(value, rootRecord, record) {
					        		  if(memberCode == record.data.memberCode){
					        			  var  btnEdit = "<a href=\"#\" data-action=\"edit\" class=\"btn-edit btn-a fa fa-pencil-square-o\"></a>";
						        		  return btnEdit ;
					        		  }
					        		//  console.log(record.data);
					        		
					        	  }
					          },
					          {text : '', width : 40, dataIndex: 'status', align : 'center', tdCls: 'v-mid', header: false, 
					        	  renderer  : function(value, rootRecord, record) {
					        		  if(memberCode == record.data.memberCode){
					        			  var btnDel = "<a href=\"#\" data-action=\"delete\" class=\"btn-del btn-a fa fa-times\"></a>";
						        		  	return btnDel;
					        		  }
					        		 
					        	  }
					          },
					          
		  	],
		  	viewConfig : {
				forceFit : true
			},
		  	listeners: { 
		  		cellclick : function(view,cell, cellIndex,record, row, rowIndex,e) {
		  			if(cellIndex == 3) { 
		  				deleteApprovalComment(record.data.approvalCode,record.data.commentSeq);
					}
		  			if(cellIndex == 2){
		  			//	console.log('Edit');
		  				getFormField(formContent.getComponent('formInput'), 'input').setValue(record.data.commentContent);
		  				paramComment.commentSeq = record.data.commentSeq;
		  				getFormField(formContent.getComponent('formInput'), 'flag').setValue('2');
		  			}
		  		}
		  	}
		  });
        
        me.reloadPage = function(param){
        	//comment.reloadPage(param);
        	//console.log(param);
        	paramComment.approvalCode = param;
        	getCommentList();
        	var confirm = true;
//        	formContent.getComponent('formInput').getComponent('textMain').setValue('');
        	formContent.reset();
        	
        }

		this.items = [formContent, approvalGrid];
        this.callParent(arguments);
        
 
        // SUBMIT COMMENT
        async function submitComment(){
		//	console.log(CommentStore.data.items[0].data.commentSeqMax);
        	if(formContent.getComponent('formInput').getComponent('textMain').getValue().trim() == ''){
        		showMessageBoxWarning('Should be input requirement field!');
        		//formContent.getComponent('formInput').getComponent('textMain').setValue('');
        		return;
        	}
        //	console.log(CommentStore.data.items.length);
//        	if (CommentStore.data.items.length == 0){
//        		paramComment.commentSeq = 1;
//        	}else{
//        		if(CommentStore.data.items[0].data.commentSeqMax > 0)
//        		paramComment.commentSeq = CommentStore.data.items[0].data.commentSeqMax + 1;
//        	}
//        	if (paramComment.commentSeq < 1){
//        		return;
//        	}
       // 	console.log('CommentStoreaaaaaa')
        //	console.log(paramComment.commentSeq)
        	var ajaxUrl = '/counselApproval/insertApprovalComment.json';
			var message = 'Insert Approval Comment is successful';
			console.log(paramComment);
			try {
				var data = await saveDataAjax('Do you want to insert Approval Comment ?', ajaxUrl, paramComment, 'Insert Comment successfully','Insert Comment');
				
				//	console.log(json.actionStatus)
				if(data.actionStatus == 'success'){
					getCommentList();
					formContent.getComponent('formInput').getComponent('textMain').setValue('');
				}else if(data.actionStatus == 'error') {
			//		console.log('error')
					showMessageBoxError('Please Input Comment');
				}
				unMask();
			} catch (e) {
				// TODO: handle exception
			}
        }
       
        //LIST COMMENT
        function getCommentList(){
			var params = {
					approvalCode : paramComment.approvalCode,
			}
			CommentStore.removeAll();
			CommentStore.loadPage(1, {params: params})
			
		}
        ///DELETE
        async function deleteApprovalComment(approvalCode,commentSeq){
        	var params = {
					approvalCode : approvalCode,
					commentSeq	 : commentSeq,
					
			}
        	
        	var ajaxUrl = '/counselApproval/deleteApprovalComment2.json';
        	var message = 'Delete Approval Comment is successful';
        	try {
        		var data = await saveDataAjax('Do you want to delete Approval Comment ?', ajaxUrl, params, message, 'Delete Approval Comment');
			
				if(data.actionStatus == 'success'){
					getCommentList();
				}else if(data.actionStatus == 'error') {
					showMessageBoxError('Delete Error.');
				}				
				unMask();
        	} catch (e) {
				// TODO: handle exception
			}
        }
       
        //UPDATE COMMENT
        async function updateApprovalComment(approvalCode,commentSeq){
        	var params = {
					approvalCode   : approvalCode,
					commentSeq	   : commentSeq,
					commentContent : paramComment.commentContent,
			}
        	if(formContent.getComponent('formInput').getComponent('textMain').getValue().trim() == ''){
        		showMessageBoxWarning('Should be input requirement field!');
        		formContent.getComponent('formInput').getComponent('textMain').setValue('');
        		return;
        	}
        	var ajaxUrl = '/counselApproval/updateApprovalComment.json';
        	var message = 'Update Approval Comment is successful';
        	try {
        		var data = await saveDataAjax('Do you want to update Approval Comment ?', ajaxUrl, params, message,'Update Approval Comment');
        		if(data.actionStatus == 'success'){
    				formContent.getComponent('formInput').getComponent('textMain').setValue('');
    				paramComment.commentSeq = 0;
    				getCommentList();
    			}else if(data.actionStatus == 'error') {
    				showMessageBoxError('Update Error.');
    			}
        		unMask();
        	} catch (e) {
				// TODO: handle exception
			}
        //	formContent.reset();
        }
        me.reloadGrid = function(param){
        	//comment.reloadPage(param);
        	paramComment.approvalCode = param;
        	getCommentList();
        	
        }
        //function format for 'PRINT'
       me.resizePrint =  function (confirm){
       	 if (confirm == true){
       		approvalGrid.autoScroll = true;
     		approvalGrid.setMaxHeight(330);
       	 }else{
       		approvalGrid.autoScroll = false;
     		approvalGrid.setMaxHeight(2000);
       	 }
        }

    }
});
