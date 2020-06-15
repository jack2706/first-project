Ext.define('ext.view.myMenu.approvalLineRegister.approvalSetting', {
	extend: 'Ext.form.Panel',
	header: false,
	width: "100%",
	autoHeight: true,
	border: false,
	initComponent : function() {
	  
        var me =  this;

		var btnSave = Ext.create('Ext.Button', {
			text: 'Save',
			cls: 'btn-button',
			minWidth: 100,
			handler: function() {
//				saveApprovalSetting();
			}
		});
		
		var formCheckboxTop = Ext.widget('container', {
			layout: 'fit', 
			width: '100%',
        	items: [
				{xtype: 'checkboxgroup', fieldLabel: '<strong>Counsel</strong>', labelWidth: 60, width: '100%', columns: 5, name: 'checkGroupTop',
					cls: 'check-box form-check form-controls  mnone', bodyCls: 'group-check-inner', 
					items: [
				        {boxLabel: 'Plan Counsel', inputValue: '01', name: 'checkGroupTop'},
				        {boxLabel: 'Instant Counsel', inputValue: '02', name: 'checkGroupTop'},
				        {boxLabel: 'New enrolled student', inputValue: '03', name: 'checkGroupTop'},
				        {boxLabel: 'Recruit Counsel', inputValue: '04', name: 'checkGroupTop'},
				        {boxLabel: 'Withdrawn student Management', inputValue: '05', name: 'checkGroupTop'}
				    ]
				}  
	        ]
        
		});
		var formCheckboxBot = Ext.widget('container', {
			layout: 'fit', 
			width: '100%',
        	items: [
				{xtype: 'checkboxgroup', fieldLabel: '<strong>Counsel</strong>', labelWidth: 60, width: '100%', columns: 5, name: 'checkGroupBot',
					cls: 'check-box form-check form-controls mnone', bodyCls: 'group-check-inner', 
					items: [
				        {boxLabel: 'Plan Counsel', inputValue: '01', name: 'checkGroupBot'},
				        {boxLabel: 'Instant Counsel', inputValue: '02', name: 'checkGroupBot'},
				        {boxLabel: 'New enrolled student', inputValue: '03', name: 'checkGroupBot'},
				        {boxLabel: 'Recruit Counsel', inputValue: '04', name: 'checkGroupBot'},
				        {boxLabel: 'Withdrawn student Management', inputValue: '05', name: 'checkGroupBot'}
				    ]
				}  
	        ]
        
		});
		
		var mainPanel = Ext.create('Ext.form.Panel', {
        	//padding: 15,
        	bodyStyle: 'background: none !important;',
        	border: false,
			width: '100%',
			items: [
		        {xtype: 'hiddenfield', name: 'insertFlag', value: 'I'},
		        {xtype: 'container', width: null, cls: 'tb-shadow tb-wrap',margin: 15,
		        	items:[
						{xtype: 'label', text: 'Auto Approval Setting', padding: 15, cls: "lb-title d-block", width: "100%"}, 
						{xtype: "container", cls: 'tb-table tb-2 tb-label', width: "100%", 
							layout: {
								type: 'table', columns: 2,
								tableAttrs: {
									style: {
										width: '100%'
									}
								}               
							},
							items: [
						        {xtype: 'label', text: 'Use YN', rowspan: 3}, 
						        {xtype: 'meradiogroup', hideLabel: false, columns: 2, width: '100%', name: 'useYnTop', 
						        	cls: 'radio-check form-check form-controls', bodyCls: 'group-check-inner', 
						        	items: [
						    	        {boxLabel: 'Not Use', inputValue: 'N', name: 'useYnTop'},
						    	        {boxLabel: 'Use', inputValue: 'Y', name: 'useYnTop'}
							        ],
							        listeners: {
								        change : function(group, newValue, oldValue, eOpts) {
								        	var form = this.nextSibling(),
								        		flag = newValue.useYnTop == 'Y' ? false : true;
								        	form.getForm().getFields().each(function(item){
								        		item.setDisabled(flag)
							        		});
								        	getFormField(mainPanel, 'checkGroupTop').setDisabled(flag);
								    	}
								    }
						        },   	                    	                    	            
						        {xtype: 'form', bodyCls: 'row text-left', width: "100%",
						        	items: [
						    	        {xtype: 'medate',cls: 'col-xs-3 item form-controls datepiker', fieldLabel: 'Period', labelSeparator: '', labelWidth: 50,
						    	        	width: null, name: 'startDateTop', value: new Date()
							        	},
						    	        {xtype: 'timefield',cls: 'col-xs-3 item form-controls datetime', hideLabel: false, width: null,  minValue: '6:00',
						    	        	maxValue: '20:00', increment: 30, anchor: '100%', name: 'startTimeTop', format: 'H:i', value: '09:00'
						        		},
						 	   	       	{xtype: 'medate',cls: 'col-xs-3 item form-controls datepiker', fieldLabel: '~', labelSeparator: '', labelWidth : 40,
						        			width : null, name: 'endDateTop', value: new Date()
										},
						 	   	       	{xtype: 'timefield',cls: 'col-xs-3 item form-controls datetime', hideLabel: false, width : null,  minValue: '6:00',
						 	   	       		maxValue: '20:00', increment: 30, anchor: '100%', name: 'endTimeTop', format: 'H:i', value: '18:00'
							       			}
						            ]
						        },              
						        formCheckboxTop
						    ]
						}
		        	      ]
		        },

		        {xtype: 'container', width: null, cls: 'tb-shadow tb-wrap',margin: 15,
		        	items:[

		   				{xtype: 'label', text: 'Approval by delegated authority Setting', padding: 15, cls: "lb-title d-block", width: "100%"}, 
		   				{xtype: "container", cls: 'tb-table tb-2 tb-label', width: "100%",
		   					layout: {
		   						type: 'table', columns: 2,
		   						tableAttrs: {
		   							style: {
		   								width: '100%'
		   							}
		   						}               
		   					},
		   					items: [
		   				        {xtype: 'label', text: 'Use YN', rowspan: 3}, 
		   				        {xtype: 'meradiogroup', hideLabel: false, columns: 2, width: '100%', name: 'useYnBot', 
		   				        	cls: 'radio-check form-check form-controls', bodyCls: 'group-check-inner', 
		   				        	items: [
		   			        	        {boxLabel: 'Not Use', inputValue: 'N', name: 'useYnBot'},
		   			        	        {boxLabel: 'Use', inputValue: 'Y', name: 'useYnBot'}
		   					        ],
		   					        listeners: {
		   						        change : function(group, newValue, oldValue, eOpts) {
		   						        	var form = this.nextSibling(),
		   						        		flag = newValue.useYnBot == 'Y' ? false : true;
		   						        	form.getForm().getFields().each(function(item){
		   						        		item.setDisabled(flag)
		   					        		});
		   						        	getFormField(mainPanel, 'checkGroupBot').setDisabled(flag);
		   						    	}
		   						    }
		   				        },   	                    	                    	            
		   				        {xtype: 'form', bodyCls: 'row text-left', width: "100%",
		   				        	items: [
		   			        	        {xtype: 'medate',cls: 'col-xs-3 item form-controls datepiker', fieldLabel: 'Period', labelSeparator: '', labelWidth: 50,
		   			        	        	width: null, name: 'startDateBot', value: new Date()
		   		        	        	},
		   			        	        {xtype: 'timefield',cls: 'col-xs-3 item form-controls datetime', hideLabel: false, width: null,  minValue: '6:00',
		   			        	        	maxValue: '20:00', increment: 30, anchor: '100%', name: 'startTimeBot', format: 'H:i', value: '09:00'
		   	        	        		},
		   			     	   	       	{xtype: 'medate',cls: 'col-xs-3 item form-controls datepiker', fieldLabel: '~', labelSeparator: '', labelWidth : 40,
		   	        	        			width : null, name: 'endDateBot', value: new Date()
		       	        				},
		   			     	   	       	{xtype: 'timefield',cls: 'col-xs-3 item form-controls datetime', hideLabel: false, width : null,  minValue: '6:00',
		   			     	   	       		maxValue: '20:00', increment: 30, anchor: '100%', name: 'endTimeBot', format: 'H:i', value: '18:00'
		   	     	   	       			}
		   			                ]
		   				        },              
		   				        formCheckboxBot
		   			        ]
		   				}
		        	      ]
		        },
				{xtype: 'container', width: "100%", padding: "0 15 15", cls: 'text-right',
					items: [btnSave]
				}
			]
		});
		
        this.items = [mainPanel];
        this.callParent(arguments);
        
        function createCheckBox(){
			Ext.Ajax.request({
				url: CONTEXT_PATH + "/general/generalCodes.json",
				params: {
					systemCode: 'IC',
					commonCode: 'CS0001',
					system:'TI'
				},
				success : function(response) {
					var json = Ext.decode(response.responseText);
					var list = json.data;
					formCheckboxTop.removeAll();
					formCheckboxBot.removeAll();
					var itemsTop = [];
					var itemsBot = [];
					if(list.length == 0) {
						return;
					}
					Ext.each(list, function(item) {
						itemsTop.push(
							{boxLabel: item.codeName, inputValue: item.detailCode, name: 'checkGroupTop'}
						)
						itemsBot.push(
							{boxLabel: item.codeName, inputValue: item.detailCode, name: 'checkGroupBot'}
						)
					});
					formCheckboxTop.add(
						{xtype: 'checkboxgroup', fieldLabel: '<strong>Counsel</strong>', labelWidth: 60, width: '100%', 
							cls: 'check-box form-check form-controls', bodyCls: 'group-check-inner', 
							columns: list.length, name: 'checkGroupTop',
							items: itemsTop
						}
					);
					formCheckboxBot.add(
						{xtype: 'checkboxgroup', fieldLabel: '<strong>Counsel</strong>', labelWidth: 60, width: '100%', 
							cls: 'check-box form-check form-controls', bodyCls: 'group-check-inner', 
							columns: list.length, name: 'checkGroupBot',
							items: itemsBot
						}
					);
					getApprovalSetting();
				}
			});
		}
        createCheckBox();
        
        async function getApprovalSetting() {
        	mainPanel.reset();
			var ajaxUrl = '/approvalLineRegister/getApprovalSetting.json';
			var params = {};
			try {
				var json = await getDataAjax(ajaxUrl,params);
				var data = json.data;
				if(data != null && data.length > 0) {
					getFormField(mainPanel, 'insertFlag').setValue('U');
					Ext.each(data, function(item) {
						var topBot = item.settingGbn == 'AU' ? 'Top' : 'Bot';
						getFormField(mainPanel, 'startDate' + topBot).setValue(stringToDate(item.procDateStr));
						getFormField(mainPanel, 'endDate' + topBot).setValue(stringToDate(item.procDateEnd));
						getFormField(mainPanel, 'startTime' + topBot).setValue(item.procTimeStr);
						getFormField(mainPanel, 'endTime' + topBot).setValue(item.procTimeEnd);
						if(topBot == 'Top') {
							getFormField(mainPanel, 'useYnTop').setValue({useYnTop : item.useYn});
							if(item.counselCheckYn.trim() != '') {
								getFormField(mainPanel, 'checkGroupTop').setValue({'checkGroupTop' : item.counselCheckYn.split(',')});
							}
						}else {
							getFormField(mainPanel, 'useYnBot').setValue({useYnBot : item.useYn});
							if(item.counselCheckYn.trim() != '') {
								getFormField(mainPanel, 'checkGroupBot').setValue({'checkGroupBot' : item.counselCheckYn.split(',')});
							}
						}
					});
				}else {
					getFormField(mainPanel, 'useYnTop').setValue({useYnTop: 'Y'});
					getFormField(mainPanel, 'useYnBot').setValue({useYnBot: 'N'});
				}

				unMask();
			} catch (e) {
				// TODO: handle exception
			}
		}
		
		
		
		async function saveApprovalSetting() {
			if(!mainPanel.isValid()) {
				return;
			}
			var arrayJson = [];
			var counselCheckYn = getFormField(mainPanel, 'checkGroupTop').getValue().checkGroupTop;
			arrayJson.push({	
				settingGbn		: 'AU',
				useYn			: getFormField(mainPanel, 'useYnTop').getValue().useYnTop,
				procDateStr		: Ext.Date.format(getFormField(mainPanel, 'startDateTop').getValue(), 'Ymd'),
				procDateEnd		: Ext.Date.format(getFormField(mainPanel, 'endDateTop').getValue(), 'Ymd'),
				procTimeStr		: Ext.Date.format(getFormField(mainPanel, 'startTimeTop').getValue(), 'H:i'),
				procTimeEnd		: Ext.Date.format(getFormField(mainPanel, 'endTimeTop').getValue(), 'H:i'),
				counselCheckYn	: counselCheckYn == undefined ? '' : counselCheckYn.toString(),
			});
			
			counselCheckYn = getFormField(mainPanel, 'checkGroupBot').getValue().checkGroupBot;
			arrayJson.push({	
				settingGbn		: 'UR',
				useYn			: getFormField(mainPanel, 'useYnBot').getValue().useYnBot,
				procDateStr		: Ext.Date.format(getFormField(mainPanel, 'startDateBot').getValue(), 'Ymd'),
				procDateEnd		: Ext.Date.format(getFormField(mainPanel, 'endDateBot').getValue(), 'Ymd'),
				procTimeStr		: Ext.Date.format(getFormField(mainPanel, 'startTimeBot').getValue(), 'H:i'),
				procTimeEnd		: Ext.Date.format(getFormField(mainPanel, 'endTimeBot').getValue(), 'H:i'),
				counselCheckYn	: counselCheckYn == undefined ? '' : counselCheckYn.toString(),
			});
			
			var insertFlag = getFormField(mainPanel, 'insertFlag').getValue();
			var params = {
				insertFlag	: insertFlag == 'I' ? true : false,
				arrayJson	: Ext.encode(arrayJson),
			};
        	var actionUrl = '/approvalLineRegister/saveApprovalSetting.json';
			var message = 'Save approval setting is successful';
			try {
				var json = await saveDataAjax('Do you want to save ?',actionUrl,params,'Save successfully','Save Approval Setting');
				if(json.actionStatus == 'success'){
					unMask();
				}else if(json.actionStatus == 'error') {
					
				}
			} catch (e) {
				// TODO: handle exception
			}
		}
		
	
		
//      END
    }
});