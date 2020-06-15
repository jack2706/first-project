Ext.define('ext.view.serviceSetting.checkListMgmt.popup.newChecklistPopup', {
	extend: 'component.MeWindow',
	title: 'Add new Checklist',
	width: 910,
	layout: 'vbox',
	reloadPopup: function() {},
	reloadParent: function() {},
	initComponent : function() {
		
		var me = this;
		var event = {};		
		var parentTreeInfo = {
				checklistGbn :'',
				parentDtlCode :''}
		var checklistDtl = {
				checklistCd : 0,
				clientCode:''
		}

		 var listCheckItem = [
		                 
		            ];
		 var listScaleItem = [
				                 
		  		            ];
		 var listCheckToRemove = [
				                 
			  		            ];
		 var otherChkItemTemp = {
				itemCd:0,
				checkListDepth2Cd :0,
				itemValue:0,
				itemText:'',
				etcYN:'Y',
				orderNo:0,
				delYN:'N'
			};
		var classificationStoreOtp = getStoreOpt(true, '', '', true, '');
		var classificationStore = Ext.widget('mestore',{
			});
		me.reloadPopup = function(parentTreeInfoTemp,checklistDtlTemp) {
			parentTreeInfo.checklistGbn = parentTreeInfoTemp.checklistGbn;
			parentTreeInfo.parentDtlCode = parentTreeInfoTemp.parentDtlCode;
			checklistDtl.checklistCd = checklistDtlTemp.checklistCd;
      		checklistDtl.clientCode = checklistDtlTemp.clientCode;
			if(parentTreeInfoTemp.parentDtlCode == 1){
				classificationStore.loadData(dataTab1)
			}else{
				classificationStore.loadData(dataTab2)
			}
			var assessmentAll = {
					treeId:'',
					codeName :''
			}
			classificationStore.insert(0,assessmentAll);
			initChecklistDtl();
			initForm(checklistDtlTemp.campusId)
			me.show();
		}

		var btnSave = Ext.widget('mebutton', {
			cls: 'btn-button',
			iconCls: 'icon-nw-save', 
        	text: 'Save',
          	minWidth: 100,
          	margin: '0 0 0 10',
          	border: false, 
          	handler: function() {
          		insertChecklist();
          	}
		});
		var btnCancel = Ext.widget('mebutton', {
			cls: 'btn-button',
			iconCls: 'icon-nw-cancel', 
        	text: 'Cancel',
          	minWidth: 100,
          	margin: '0 0 0 10',
          	border: false,
          	handler: function() {
          		me.close();
          	}
		});
		var btnDelte = Ext.widget('mebutton', {
			cls: 'btn-button',
			iconCls: 'icon-nw-delete', 
        	text: 'Delete',
          	minWidth: 100,
          	border: false,
          	margin: '0 0 0 10',
          	handler: function() {
          		deleteChecklist();
          	}
		});
		var radioAssessment = Ext.widget('meradiogroup', {
			fieldLabel : 'Assessment Type',
			labelWidth:135,
			width : '100%',
			padding : '10 0 5',
			columns : 2,
			name : 'assessmentType',
			items : [ {
				boxLabel : 'Check type',
				inputValue : 'C',
				name : 'assessmentType',
			}, {
				boxLabel : 'Scale type',
				inputValue : 'S',
				name : 'assessmentType',
			} ],
			listeners: {
                change: {
                    fn: function(field, newValue, oldValue, options) {
                    	showAssessment(newValue.assessmentType);
                    }
                }
            }
		});
		var radioUseYN = Ext.widget('meradiogroup', {
			fieldLabel : 'Use YN',
			labelWidth:135,
			labelSeparator : '',
			// labelWidth: 150,
			margin: '10 0 5',
			width : '100%',
			columns : 2,
			name : 'useYN',
			hideLabel:false,
			items : [ {
				boxLabel : 'Use',
				inputValue : 'U',
				name : 'useYN'
			}, {
				boxLabel : 'Not Use',
				inputValue : 'N',
				name : 'useYN'
			} ]
		});
		var classificationCmp = Ext.widget('mecombo',{
			 name: 'classification',width: '100%',hideLabel:false, fieldLabel: 'Checklist Classification',
	            labelWidth: 140,
	            store:classificationStore,valueField:'treeId',displayField:'codeName',queryMode:'local',allowBlank:false,
	        	listeners: {
	        		select: function() {
	        			
	        		}
	        	}
		})
		var checkListAreaCmp = Ext.widget('metext', {
			 hideLabel:false,
			 fieldLabel: 'Checklist Area',
			 labelWidth: 140, width: '100%',
			 allowBlank:false,
			 name:'checkListArea'
			});
		 var checkTypeForm = Ext.create('Ext.form.Panel', {
		    	width: '100%', 
	            margin: 0,
				border : false,
				layout: 'vbox',
				items : [
					{xtype: 'form', width: '100%', border: false, layout: 'hbox',cls: 'aaaa',
						items: [
							{xtype: 'metext', flex: 1, fieldLabel: '',labelSeparator: '', name:'assessment',value:''},
							{xtype:'container', width: 80,
	                	         items:[
		                	                {xtype : 'mebutton', text : '',iconCls: 'fa fa-minus', cls: 'btn-button',index: 0, width: 30,
								            	handler : function(){
								            		removeItem({index: this.index,value: '',itemCd:0})
								            	}
								            },
								            {xtype : 'mebutton', iconCls: 'fa fa-plus', text : '', cls: 'btn-button',index: 0, width: 30,
								            	handler : function(){
								            		addItem({index: this.index, value: '',itemCd:0});
								            	}
								            }    
	                	                ]
	                	    },
							{xtype: 'hidden', cls: 'form-controls', value:0,name:'itemCd'},
					    ]
					},
				]
			});
	    	  
		var otherItemsChk = Ext.create('Ext.form.field.Checkbox',{
			boxLabel: 'Other Items',
			width: "100%",
			margin:'0 0 0 20'
		});
		var noticeLb = Ext.widget('melabel',{
			hidden:true,
			style: 'display: block; font-weight: normal;',
	        text: '※※ The point item is displayed from 10 points or less and not allow duplicate point',
	        padding: '0 0 0 10'
		});
		var assessmentTxtHight = Ext.widget('metext', {
			flex: 1, hideLabel: true,  fieldLabel: '',labelSeparator: '', name:'assessmentTxtHight', padding: '0 10 0 0',
		});
		var assessmentValHight = Ext.widget('menumber', {
			 hideLabel: true, fieldLabel: '',labelSeparator: '', width: 100,name:'assessmentValHight'
		});
		var assessmentTxtMedium = Ext.widget('metext', {
			 flex: 1, hideLabel: true, fieldLabel: '',labelSeparator: '', name:'assessmentTxtMedium', padding: '0 10 0 0',
		});
		var assessmentValMedium = Ext.widget('menumber', {
			 hideLabel: true, fieldLabel: '',labelSeparator: '',width: 100,name:'assessmentValMedium'
		});
		var assessmentTxtValLow = Ext.widget('metext', {
			 flex: 1, hideLabel: true, fieldLabel: '',labelSeparator: '', name:'assessmentTxtValLow', padding: '0 10 0 0',
		});
		var assessmentValLow = Ext.widget('menumber', {
			 hideLabel: true, fieldLabel: '',labelSeparator: '', width: 100,name:'assessmentValLow'
		});
		var scaleCtn = Ext.create('Ext.container.Container', {
			padding: '0 0 0 145',hidden:false,
			layout: 'vbox',
			items: [
        	        {
						xtype: 'container', 
						width: '100%',
			            layout: 'hbox',
			            margin: '0 0 10',
	                	items: [
								assessmentTxtHight,
								{xtype: 'hidden', name:'hiddCdHight',value:0},
								assessmentValHight,
						]
        	        },
        	        {
						xtype: 'container', 
						width: '100%',
			            layout: 'hbox',
			            margin: '0 0 10',
	                	items: [
								assessmentTxtMedium,
								{xtype: 'hidden', name:'hiddCdMedium',value:0},
								assessmentValMedium,
	        	        ]
        	        },
        	        {
        	        	xtype: 'container', 
						width: '100%',
			            layout: 'hbox',
			            margin: '0 0 10',
	                	items: [
								assessmentTxtValLow,
								{xtype: 'hidden',name:'hiddCdLow',value:0},
								assessmentValLow,
	        	        ]
        	        },
        	        
	        ]
		});
		var checkCtn =  Ext.create('Ext.container.Container', {
			labelWidth: false,labelSeparator: '',  padding: '0 0 0 145',hidden:false,width: '100%',hideLabel:false,
        	items: [
        	        checkTypeForm, 
        	        otherItemsChk
                             
        	]
		});
		var formInfo = Ext.create('Ext.form.Panel', {
			border: false,
			bodyPadding: 15,
			flex: 1,
			height: 300,
			autoScroll: true,
            width: '100%',
            bodyCls: 'overflow-x',
            items: [
                {xtype: 'hiddenfield', name: 'checkListDepth2Cd',value:0},
                {xtype: 'hiddenfield', name: 'orderNo',value:0},
                classificationCmp,
                checkListAreaCmp,
                radioAssessment,
                checkCtn,
                scaleCtn,
                noticeLb,
                radioUseYN,
                /*{xtype: 'fieldcontainer',cls: 'wrap-container', bodyCls: 'wrap-container-body',fieldLabel: '',labelWidth: 0,labelSeparator: '',margin:'0 0 0 450',
                	items: []
                }, */
            ]
		});

		var wrpBtn = Ext.create('Ext.container.Container', {
        	width: "100%",
        	layout: 'hbox',
        	padding: '5 0',
			items: [{xtype: 'tbfill'}, btnSave,btnCancel,btnDelte]
		});
		this.items = [formInfo];
		this.bbar = [wrpBtn];
		this.callParent(arguments);
		
		Common.getTreeCode2(classificationStore, 'IC', 'SY0003', 2, 1,'TI',classificationStoreOtp ,getFormField(formInfo, 'classification'));
		console.log('classificationStore')
		console.log(classificationStore)
		var dataTab1 = [];
		var dataTab2 = [];
		function getClassification1(){
			var url = CONTEXT_PATH+'/general/treeCodes2.json';
			var params = {
				systemCode:'IC',
				commonCode:'SY0003',
				parentDetailCode: 1,
				treeLevel:2,
				system:'TI',
				useYn 			: 'Y'
				
			}
			Ext.Ajax.request({
				url:url,
				params : params,
				success:function(response){
					var json = Ext.decode(response.responseText);
					var data = json.data;
					dataTab1 = data;
				}
			})
		}
		getClassification1();
		function getClassification2(){
			var url = CONTEXT_PATH+'/general/treeCodes2.json';
			var params = {
					systemCode:'IC',
					commonCode:'SY0003',
					parentDetailCode: 2,
					treeLevel:2,
					system:'TI',
					useYn 			: 'Y'
			}
			Ext.Ajax.request({
				url:url,
				params : params,
				success:function(response){
					var json = Ext.decode(response.responseText);
					var data = json.data;
					
					dataTab2 = data;
				}
			})
		}
		getClassification2();
		
		function showAssessment(value){
			if( value == 'C'){
				scaleCtn.setHidden(true);
				noticeLb.setHidden(true);
				checkCtn.setHidden(false);
			}else{
				scaleCtn.setHidden(false);
				noticeLb.setHidden(false);
				checkCtn.setHidden(true);
			}
		}
		/**
		 * Create Assessment content params
		 */
		
		function getAssessmentCteParams(){
			var arrContentParams = [];
			if(getFormField(formInfo,'assessmentType').getValue().assessmentType == 'C'){
				Ext.each(checkTypeForm.items.items,function(item){
					var item = {
							itemCd:item.items.items[2].value,
							itemValue:'',
							itemText:item.items.items[0].value,
							etcYN:'N',
							delYN:'N',
							orderNo:item.items.items[1].items.items[0].index +1
					}
					arrContentParams.push(item);
		    	})
		    	// get maxOrder
		    	var maxOrder = arrContentParams[arrContentParams.length -1].orderNo + 1;
				
				// Add other item
				var otherItem = {
						itemCd:0,
						itemValue:'',
						itemText:'',
						etcYN:'Y',
						delYN:'N',
						orderNo:maxOrder
				}
			
		    	if(otherItemsChk.getValue() == true){
		    	
		    		// For new checklist
			    	if(getFormField(formInfo,'checkListDepth2Cd').getValue() == 0){
			    		otherItem.itemCd = 0;
			    		otherItem.checkListDepth2Cd = getFormField(formInfo,'checkListDepth2Cd').getValue();
			    		otherItem.itemValue = '';
			    		otherItem.itemText = 'Etc.';
			    		otherItem.etcYN = 'Y';
			    		otherItem.orderNo = maxOrder;
			    		otherItem.delYN = 'N';
			    	}else{
			    		// For update
		    			otherItem.itemCd = otherChkItemTemp.itemCd;
		    			otherItem.checkListDepth2Cd = otherChkItemTemp.checkListDepth2Cd;
		    			otherItem.itemValue = otherChkItemTemp.itemValue;
		    			otherItem.itemText = 'Etc.';
		    			otherItem.etcYN = 'Y';
		    			otherItem.orderNo = maxOrder;
		    			otherItem.delYN = 'N';
			    	}
	    			arrContentParams.push(otherItem);
		    	}else{
		    		// Uncheck for existed
		    		if(otherChkItemTemp.itemCd > 0 && otherChkItemTemp.checkListDepth2Cd > 0){
		    			otherItem.itemCd = otherChkItemTemp.itemCd;
		    			otherItem.checkListDepth2Cd = otherChkItemTemp.checkListDepth2Cd;
		    			otherItem.itemValue = otherChkItemTemp.itemValue;
		    			otherItem.itemText = 'Etc.';
		    			otherItem.etcYN = 'Y';
		    			otherItem.orderNo = maxOrder;
		    			otherItem.delYN = 'Y';
		    			arrContentParams.push(otherItem);
		    		}
		    	}

			}else{
				var assessmentTxtHight = getFormField(formInfo,'assessmentTxtHight').getValue();
				var assessmentValHight = getFormField(formInfo,'assessmentValHight').getValue();
				var assessmentTxtMedium = getFormField(formInfo,'assessmentTxtMedium').getValue();
				var assessmentValMedium = getFormField(formInfo,'assessmentValMedium').getValue();
				var assessmentTxtValLow = getFormField(formInfo,'assessmentTxtValLow').getValue();
				var assessmentValLow = getFormField(formInfo,'assessmentValLow').getValue();

				var hiddCdHight = getFormField(formInfo,'hiddCdHight').getValue();
				var hiddCdMedium = getFormField(formInfo,'hiddCdMedium').getValue();
				var hiddCdLow = getFormField(formInfo,'hiddCdLow').getValue();
				
				var itemHeight = {
						itemCd:hiddCdHight,
						itemValue:assessmentValHight,
						itemText:assessmentTxtHight,
						etcYN:'N',
						delYN:'N',
						orderNo:1
				}
				
				var itemMedium = {
						itemCd:hiddCdMedium,
						itemValue:assessmentValMedium,
						itemText:assessmentTxtMedium,
						etcYN:'N',
						delYN:'N',
						orderNo:2
				}
				
				var itemLow = {
						itemCd:hiddCdLow,
						itemValue:assessmentValLow,
						itemText:assessmentTxtValLow,
						etcYN:'N',
						delYN:'N',
						orderNo:3
				}
				arrContentParams.push(itemHeight);
				arrContentParams.push(itemMedium);
				arrContentParams.push(itemLow);
			}
			
			return arrContentParams;
		}
		/**
		 * Insert or update Checklist
		 */
		async function insertChecklist(){
			var arrContentParams = getAssessmentCteParams();
			var params = {
					checkListDepth2Cd : getFormField(formInfo,'checkListDepth2Cd').getValue(),
					checkListArea : getFormField(formInfo,'checkListArea').getValue(),
					classificationCd : getFormField(formInfo,'classification').getValue(),
					checklistGbn : parentTreeInfo.checklistGbn,
					assessmentTypeCd :getFormField(formInfo,'assessmentType').getValue().assessmentType,
					orderNo :getFormField(formInfo,'orderNo').getValue(),
					useYN :getFormField(formInfo,'useYN').getValue().useYN,
					arrContentParams : Ext.encode(arrContentParams),
					listCheckToRemove : Ext.encode(listCheckToRemove)
			}
			
			// Validate value of scale item of assessment
			var isItemValild = validateItemValue(arrContentParams,params.assessmentTypeCd);
			
			// validate blanl text of assessment type
			for(var i = 0; i < arrContentParams.length; i++){
				if(arrContentParams[i].etcYN != 'Y'){
					if(arrContentParams[i].itemText == ''){
						showMessageBoxWarning('Not allow blank text of Assessment content. Please fill!');
						return;
					}
				}
				
			}
			
			var url = '/checkListMgmt/insertChecklist.json';
			var message = 'Save Checklist successfully !';
			if(formInfo.isValid()){
				if(isItemValild){
					try {

						await saveDataAjax('Do you want to save ?',url,params,"Insert successfully","Insert Checklist");
						me.reloadParent();
						me.close();
					} catch (e) {
						// TODO: handle exception
					}
				}else{
					showMessageBoxWarning('The limit of the Item value must be between 1 to 10');
				}
			}
		}
		function validateItemValue(arrContentParams,assesmentType){
			var isItemValild = false;
			if(typeof arrContentParams != 'undefined' && arrContentParams.length > 0){
				if(assesmentType == 'S'){
					for(var i = 0;i < arrContentParams.length;i++){
						var item = arrContentParams[i]
						if(item.itemValue <= 10 && item.itemValue >= 1){
							isItemValild = true;
						}else{
							isItemValild = false;
							return
						}
					}
				}else{
					isItemValild = true;
				}
			}
			return isItemValild;
		}
//		function insertChecklistSuccess(response){
//			var data = Ext.decode(response.responseText);
//			if(data.actionStatus == 'success'){
//				me.reloadParent();
//				me.close();
//			}
//		}
		function initChecklistDtl(){
			// reset default otherItems
			otherItemsChk.setValue(false);
			listCheckToRemove = [];
			// init data value for checklist
			if(checklistDtl.checklistCd == 0){
				getFormField(formInfo,'checkListDepth2Cd').setValue(0);
				getFormField(formInfo,'checkListArea').setValue('');
				getFormField(formInfo,'assessmentType').setValue({assessmentType:'C'});
				getFormField(formInfo,'useYN').setValue({useYN:'U'});
				getFormField(formInfo,'classification').setValue('');
				getFormField(formInfo,'orderNo').setValue(0)
				
				// reset check & scale
				listCheckItem = [{index:0,value:'',itemCd:0,etcYN:'N'}];
				listScaleItem = [{itemText:'',itemValue:'',itemCd:0,orderNo:1},
				                 {itemText:'',itemValue:'',itemCd:0,orderNo:2},
				                 {itemText:'',itemValue:'',itemCd:0,orderNo:3}
				                ];
				
				refreshCheckForm(listCheckItem);
				refreshScaleForm(listScaleItem);
				// 
				//
				//
				//
				//reset otherChkItemTemp
				//
				//
				//
				//
				otherChkItemTemp = {
						itemCd:0
						,checkListDepth2Cd:0
						,itemValue:0
						,itemText:''
						,etcYN:'N',
						orderNo:0,
						delYN:'N'
				};
				// remove delete button
				btnDelte.setHidden(true);
			}else{
				var params = {
						checkListDepth2Cd : checklistDtl.checklistCd
				}
				Ext.Ajax.request({
					url:CONTEXT_PATH+'/checkListMgmt/getChecklistDetail.json',
					params:params,
					async:false,
					success:function(response){
						getChecklistDetailSuccess(response);
					}
				});
				
			}
			
		}
		
		function getChecklistDetailSuccess(response){
				listCheckItem = [];
				listScaleItem = [];
				var data = Ext.decode(response.responseText);
				var checklistDtl = data.checklistDtl;
				var listChecklistEval = data.listChecklistEval;
				if(checklistDtl != null){
					getFormField(formInfo,'checkListDepth2Cd').setValue(checklistDtl.checkListDepth2Cd);
					getFormField(formInfo,'checkListArea').setValue(checklistDtl.checkListArea);
					getFormField(formInfo,'assessmentType').setValue({assessmentType:checklistDtl.assessmentTypeCd});
					getFormField(formInfo,'useYN').setValue({useYN:checklistDtl.useYN});
					getFormField(formInfo,'classification').setValue(checklistDtl.classificationCd);
					getFormField(formInfo,'orderNo').setValue(checklistDtl.orderNo);
				}
				
				if(typeof listChecklistEval != 'undefined' || listChecklistEval.length > 0 ){
					for(var i = 0;i < listChecklistEval.length;i++){
						var item = listChecklistEval[i];
						if(checklistDtl.assessmentTypeCd == 'C'){
							// Set for check
							var checkEvaluation = {index: item.orderNo,value: item.itemText,itemCd:item.itemCd,etcYN : item.etcYN}
							listCheckItem.push(checkEvaluation);
							if(item.etcYN == 'Y'){
								otherItemsChk.setValue(true);
								otherChkItemTemp.itemCd = item.itemCd;
								otherChkItemTemp.checkListDepth2Cd = item.checkListDepth2Cd;
								otherChkItemTemp.itemValue = item.itemValue;
								otherChkItemTemp.itemText = item.itemText;
								otherChkItemTemp.etcYN = item.etcYN;
								otherChkItemTemp.orderNo = item.orderNo;
								otherChkItemTemp.delYN = item.delYN;
							}
							getFormField(formInfo,'assessmentTxtHight').setValue('');
							getFormField(formInfo,'assessmentValHight').setValue('');
							getFormField(formInfo,'assessmentTxtMedium').setValue('');
							getFormField(formInfo,'assessmentValMedium').setValue('');
							getFormField(formInfo,'assessmentTxtValLow').setValue('');
							getFormField(formInfo,'assessmentValLow').setValue('');
							getFormField(formInfo,'hiddCdHight').setValue(0);
							getFormField(formInfo,'hiddCdMedium').setValue(0);
							getFormField(formInfo,'hiddCdLow').setValue(0);
						}else{
							var scaleEvaluation = {itemText:item.itemText,itemValue:item.itemValue,itemCd:item.itemCd}
							listScaleItem.push(scaleEvaluation)
							// Set for Scale
							if(item.orderNo == 1){
								getFormField(formInfo,'assessmentTxtHight').setValue(item.itemText);
								getFormField(formInfo,'assessmentValHight').setValue(item.itemValue);
								getFormField(formInfo,'hiddCdHight').setValue(item.itemCd);
							}else if(item.orderNo == 2){
								getFormField(formInfo,'assessmentTxtMedium').setValue(item.itemText);
								getFormField(formInfo,'assessmentValMedium').setValue(item.itemValue);
								getFormField(formInfo,'hiddCdMedium').setValue(item.itemCd);
							}else if(item.orderNo == 3){
								getFormField(formInfo,'assessmentTxtValLow').setValue(item.itemText);
								getFormField(formInfo,'assessmentValLow').setValue(item.itemValue);
								getFormField(formInfo,'hiddCdLow').setValue(item.itemCd);
							}
						}
					}

					refreshCheckForm(listCheckItem);
					refreshScaleForm(listScaleItem);
				}
				
				
		}
		async function deleteChecklist(){
			if(getFormField(formInfo,'checkListDepth2Cd').getValue() == 0){
				showMessageBoxWarning('Checklist is not exist. Please show detial before delete');
			}else{
				var params = {
						checkListDepth2Cd : getFormField(formInfo,'checkListDepth2Cd').getValue(),
				}
				
				var url = '/checkListMgmt/deleteChecklist.json';
				try {
					await saveDataAjax('Do you want to delete ?',url,params,"Delete successfully","Delete Checklist");
					 me.reloadParent();
					me.close();
				} catch (e) {
					// TODO: handle exception
				}
			}
			
		}
//		function deleteChecklistSuccess(response){
//			var data = Ext.decode(response.responseText);
//			if(data.actionStatus = 'success'){
//				me.reloadParent();
//				me.close();
//			}
//		}
// function initAssesmentContent(listCheckItemTemp,listScaleItemTemp){
//			
// /** reset check or scale item in case close popup without click in Cancel
// button so the values will be kept */
// listCheckItem = [];
// listScaleItem = [];
// if(typeof listCheckItemTemp != 'undefined' || listCheckItemTemp.length > 0){
// Ext.each(listCheckItemTemp,function(item){
// listCheckItem.push(item);
// });
// refreshCheckForm(listCheckItem);
// }
// if(typeof listScaleItemTemp != 'undefined' || listScaleItemTemp.length > 0){
// Ext.each(listScaleItemTemp,function(item){
// listScaleItem.push(item);
// });
// refreshCheckForm(listCheckItem);
// }
// }
		function addItem(info) {
	    	listCheckItem = [];
		    Ext.each(checkTypeForm.items.items,function(item){
		    	var itemTemp = {index:item.items.items[1].index,value:item.items.items[0].value,itemCd:item.items.items[2].value,etcYN:item.items.items[3].value}
		    	listCheckItem.push(itemTemp);
		    })
	    	var item = {index:info.index+1,value:'',itemCd:0,etcYN:'N'}
		    listCheckItem.splice(info.index+1,0, item);
			refreshCheckForm(listCheckItem);
	    }
		
		function removeItem(info){
			if(checkTypeForm.items.items.length == 1){
				// validate if there is only 1 item in list assessment content.The prerequisites is must have 1 item at least
				showMessageBoxWarning('Can not remove.Require at least one item to save');	
			}else{
				var index = info.index;
				listCheckItem = [];
				Ext.each(checkTypeForm.items.items,function(item){
		    		var itemTemp = {index:item.items.items[1].index,value:item.items.items[0].value,itemCd:item.items.items[2].value,etcYN:item.items.items[3].value}
		    		listCheckItem.push(itemTemp);
		    	})
				listCheckItem.splice(index,1);
				if(info.itemCd > 0){
					listCheckToRemove.push(info);
				}
				refreshCheckForm(listCheckItem);
			}
		}
		
		function refreshCheckForm(listCheck){
			if(listCheck.length == 0){
				listCheck = [{index:0,value:'',itemCd:0,etcYN:'N'}];
			}
				/**
				 * ===================== Reset check type form
				 * =====================
				 */
				checkTypeForm.removeAll();
				var index = 0;
		    	Ext.each(listCheck, function(item) {
		    		if(item.etcYN == 'N'){
		    			var form = Ext.widget('form', {
			    			width: '100%', 
					    	/*cls: 'form-wrapper',
					    	bodyCls: 'row row-auto',
				            style: 'border: none; height: auto;',
				            bodyStyle: 'border: none;',*/
				            margin: '0 0 10',
							border : false,
							layout: 'hbox',
			    			items: [
								{xtype: 'metext', flex: 1, fieldLabel: '', value:item.value,name:'assessment'},
								{xtype:'container',80: null,name:'btnCheckForm',
		                	         items:[
			                	                {xtype : 'mebutton', text : '', iconCls: 'fa fa-minus',cls: 'btn-button',margin: '0 10',index: index, height: 30, width: 30,name:'plusBtn',
									            	handler : function(){
									            		removeItem({index: this.index,value: '',itemCd:item.itemCd})
									            	}
									            },
									            {xtype : 'mebutton', text : '', iconCls: 'fa fa-plus',cls: 'btn-button', index: index, height: 30, width: 30,name:'subtrBtn',
									            	handler : function(){
									            		addItem({index: this.index,value: '',itemCd:item.itemCd});
									            	}
									            }    
		                	                ]
		                	    },
								{xtype: 'hidden', cls: 'form-controls', fieldLabel: '',labelSeparator: '', margin: '0 0 0 0', width: "100%",value:item.itemCd,name:'itemCd'},
								{xtype: 'hidden', cls: 'form-controls', fieldLabel: '',labelSeparator: '', margin: '0 0 0 0', width: "100%",value:item.etcYN,name:'etcYN'},
						    ]
			    		});

			    		checkTypeForm.add(form);
			    		index++;
		    		}
		    	});
		}
		function refreshScaleForm(listScale){
			/** ===================== Reset scale form ===================== */
			Ext.each(listScale,function(item){
				if(item.orderNo == 1){
					getFormField(formInfo,'assessmentTxtHight').setValue(item.itemText);
					getFormField(formInfo,'assessmentValHight').setValue(item.itemValue);
					getFormField(formInfo,'hiddCdHight').setValue(item.itemCd);
				}else if(item.orderNo == 2){
					getFormField(formInfo,'assessmentTxtMedium').setValue(item.itemText);
					getFormField(formInfo,'assessmentValMedium').setValue(item.itemValue);
					getFormField(formInfo,'hiddCdMedium').setValue(item.itemCd);
				}else if(item.orderNo == 3){
					getFormField(formInfo,'assessmentTxtValLow').setValue(item.itemText);
					getFormField(formInfo,'assessmentValLow').setValue(item.itemValue);
					getFormField(formInfo,'hiddCdLow').setValue(item.itemCd);
				}
			});
		}
		function initForm(campusId){
			if(campusId != ''){
				btnSave.setHidden(true);
				btnDelte.setHidden(true);
				checkListAreaCmp.setReadOnly(true);
				 classificationCmp.setReadOnly(true);
                radioAssessment.setReadOnly(true);
                otherItemsChk.setReadOnly(true);
        		assessmentTxtHight.setReadOnly(true);
				assessmentValHight.setReadOnly(true);
				assessmentTxtMedium.setReadOnly(true);
				assessmentValMedium.setReadOnly(true);
				assessmentTxtValLow.setReadOnly(true);
				assessmentValLow.setReadOnly(true);
                radioUseYN.setReadOnly(true);
                disableCheckForm();
			}else{
				btnSave.setHidden(false);
				btnDelte.setHidden(false);
			}
		}
//		function getFormFields(){
//        	var form = checkTypeForm.getForm();
//    		var allFields = form.getFields();
//    		return allFields;
//        }
		function disableCheckForm(){
		
        	for(var i = 0;i  < checkTypeForm.items.length;i++){
        		var item = checkTypeForm.items.items[i];
        		if(item.items.items[0].name == 'assessment'){
        			item.items.items[0].setReadOnly(true);
    			}
        		if(item.items.items[1].name == 'btnCheckForm'){
        			for(var k= 0;k  < item.items.items[1].items.length;k++){
        				item.items.items[1].items.items[k].setDisabled(true)
        			}
    			}
        	}
		}
		/*--End--*/
	}
});
