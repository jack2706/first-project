Ext.define('ext.view.counselService.newEnrolledStudent.component.ChecklistForm', {
	extend: 'Ext.form.Panel',
	width : '100%',
	layout: 'vbox',
	border: false,
	style: 'border: 1px solid #ccc; border-bottom: 0px; border-top: 0px;',
	reloadParent: function() {},
	reloadComponet: function(){},
	loadData: function(){},
	initComponent : function() {
		
		let me = this;
		
		me.reloadComponet = function(allChecklist) {
			try {
				buildForm(allChecklist);
			}catch(e) {
				handleException(e);
			}
		}
		
		let studentInfo;
		me.loadData = function(info) {
			studentInfo = info;
			getCounselCheckListData();
		}
		
		let mainTab = Ext.widget('tabpanel', {
			width: '100%',
			flex: 1,
			layout: 'fit',
			activeTab: 0,
			border: false,
			cls: 'checklistForm',
			items: [
				{title: 'Parent Tendency', xtype: 'form', layout: 'vbox', border: false, padding: 5,
					items: [
						{xtype: 'container', width: '100%', layout: 'vbox',
							items: [
								{xtype: 'component', html: 'Education', cls: 'group-title'},
								{xtype: 'checkboxgroup', fieldLabel: `Requirements / Completion Frequency<span style="color: red">*</span>`, labelWidth: 160, width: '100%', margin: '5 0 0 0',
									columns: 3, name: 'checkbox', labelSeparator: '', margin: '0 0 0 5',
									allowBlank: false, invalidCls: Ext.baseCSSPrefix + 'form-invalid',
						        	items: [
						    	        {boxLabel: 'Good', inputValue: '1', name: 'checkbox'},
						    	        {boxLabel: 'Normal', inputValue: '2', name: 'checkbox'},
						    	        {boxLabel: 'Not Good', inputValue: '3', name: 'checkbox'},
						    	        {xtype: 'container', width: '100%', layout: 'hbox', padding: '0 5 0 0',
    	        	        	        	items: [
	        	        	        	        {xtype: 'checkbox', boxLabel: 'Etc.', inputValue: '4', name: 'checkbox', etcYn: 'Y',
	        	        	        	        	listeners: {
	        	        	        	        		change: function() {
	        	        	        	        			this.nextSibling().setDisabled(!this.value);
	        	        	        	        		}
	        	        	        	        	}
	        	        	        	        },
	        	        	        	        {xtype: 'metext', flex: 1, margin: '0 0 0 5'}
        	        	        	        ]
    	        	        	        }
							        ],
						        },
						        {xtype: 'radiogroup', fieldLabel: `Completion Frequency`, labelWidth: 160, width: '100%', 
						        	columns: 3, name: 'radio', labelSeparator: '', margin: '0 0 0 5',
						        	items: [
						    	        {boxLabel: 'Professional', inputValue: '1', name: 'radio'},
						    	        {boxLabel: 'Officer', inputValue: '2', name: 'radio'},
						    	        {boxLabel: 'Self-employee', inputValue: '3', name: 'radio'},
							        ],
						        },
							]
						},
						{xtype: 'container', width: '100%', layout: 'vbox',
							items: [
								{xtype: 'component', html: 'Level of Living', cls: 'group-title'},
								{xtype: 'checkboxgroup', fieldLabel: 'Income Level', labelWidth: 160, width: '100%', 
									columns: 3, name: 'checkbox', labelSeparator: '', margin: '0 0 0 5',
						        	items: [
						    	        {boxLabel: 'Very High', inputValue: '1', name: 'checkbox'},
						    	        {boxLabel: 'High', inputValue: '2', name: 'checkbox'},
						    	        {boxLabel: 'Average', inputValue: '3', name: 'checkbox'},
							        ],
						        }
							]
						}
					]
				},
				{title: 'Counsel Evaluation', layout: 'fit', border: false, padding: 5,
					items: [
						
					]
				},
			]
		});
		
		let btnReset = Ext.widget('mebutton', {
	    	text: 'Checklist Reset', 
	    	iconCls: 'far fa-save btn-icon', 
	    	padding: '8 10',
	    	handler: function() {
	    		let form = mainTab.getActiveTab();
	    		form.reset();
			}
	    });
		let btnCompleted = Ext.widget('mebutton', {
	    	text: 'Checklist Completed', 
	    	iconCls: 'far fa-save btn-icon', 
	    	padding: '8 10',
	    	margin: '0 0 0 5',
	    	handler: function() {
	    		saveChecklist();
			}
	    });
		
		this.items = [
			mainTab,
			{xtype: 'container', width: '100%', layout: 'hbox', padding: 5, style: 'border-top: 1px solid #ccc', //hidden: !me.writeAuth,
	        	items: [{xtype: 'tbfill'}, btnReset, btnCompleted]
	        }
		];
		this.callParent(arguments);
		
		function buildForm(allChecklist) {
			allChecklist.forEach(s => {
				s.parentCode = `${s.checklistGbn}-${s.grandpaCode}-${s.parentCode}`;
				s.grandpaCode = `${s.checklistGbn}-${s.grandpaCode}`;
			})
			
			let dataToRecursive = prepareDataToRecursive(allChecklist);
			let root = {
				items: []
		    };
    		buildComponent(dataToRecursive, root.items, 0);
			root.items.forEach(s => {
				s.items.forEach(a => {
					a.items.unshift({xtype: 'component', html: a.groupTitle, cls: 'group-title'});
				})
			})
			mainTab.removeAll();
			mainTab.add(root.items);
			mainTab.setActiveTab(0);
		}
		function prepareDataToRecursive(allChecklist) {
			let dataToRecursive = [];
			dataToRecursive = dataToRecursive.concat(
				_(allChecklist)
				.uniqBy('checklistGbn')
				.map(s => {
					return {
						code		: s.checklistGbn,
						name		: s.checklistGbnName,
						level		: 1,
						parentCode	: 0,
					}
				})
				.value()
			);
			dataToRecursive = dataToRecursive.concat(
				_(allChecklist)
				.uniqBy('grandpaCode')
				.map(s => {
					return {
						code		: s.grandpaCode,
						name		: s.grandpaText,
						level		: 2,
						parentCode	: s.checklistGbn
					}
				})
				.value()
			);
			dataToRecursive = dataToRecursive.concat(
				_(allChecklist)
				.uniqBy('parentCode')
				.map(s => {
					return {
						code			: s.parentCode,
						name			: s.parentText,
						level			: 3,
						parentCode		: s.grandpaCode,
						evaluationType	: s.evaluationType,
						requireYn		: s.requireYn
					}
				})
				.value()
			);
			dataToRecursive = dataToRecursive.concat(
				_(allChecklist)
				.map(s => {
					return {
						code			: s.itemCode,
						name			: s.itemText,
						level			: 4,
						parentCode		: s.parentCode,
						etcYn			: s.etcYn,
						evaluationType	: s.evaluationType,
					}
				})
				.value()
			);
			return dataToRecursive;
		}
		
		function buildComponent(data, items, parentCode) {
			data.forEach(s => {
				if(s.parentCode == parentCode) {
					let self = getItemByLevel(s);
					items.push(self);
					buildComponent(data, self.items, s.code);
				}
				if(s.level == 4) {
					return;
				}
			})
		}
		function getItemByLevel(info) {
			switch(info.level) {
				case 1: 
					return {
						title: info.name, xtype: 'form', border: false, layout: 'vbox', padding: '0 0 0 5', autoScroll: true, checklistGbn: info.code,
						items: []
					};
					break;
				case 2: 
					return {
						xtype: 'container', width: '100%', layout: 'vbox', groupTitle: info.name,
						items: []
					};
					break;
				case 3: 
					let xtype = info.evaluationType == 'C' ? 'checkboxgroup' : 'radiogroup';
					let groupName = info.evaluationType == 'C' ? 'checkbox' : `radio-${info.code}`;
					if(info.requireYn == 'N') {
						return {
							xtype: xtype, fieldLabel: info.name, labelWidth: 160, width: '100%', labelStyle: 'font-weight: bold; color: #6b6b6b;',
							columns: 3, name: groupName, labelSeparator: '', margin: '5 0 5 5',
							items: []
						}
					}
					return {
						xtype: xtype, fieldLabel: `${info.name}<span style="color: red">*</span>`, labelWidth: 160, width: '100%', labelStyle: 'font-weight: bold; color: #6b6b6b;',
						columns: 3, name: groupName, labelSeparator: '', margin: '5 0 5 5',
						allowBlank: false, invalidCls: Ext.baseCSSPrefix + 'form-invalid',
						items: []
					}
					break;
				case 4: 
					let name = info.evaluationType == 'C' ? 'checkbox' : `radio-${info.parentCode}`;
					if(info.etcYn == 'Y') {
						return {
							xtype: 'container', width: '100%', layout: 'hbox', padding: '0 5 0 0',
							items: [
								{xtype: 'checkbox', boxLabel: info.name, inputValue: info.code, name: 'checkbox', etcYn: 'Y',
									listeners: {
										change: function() {
											this.nextSibling().setDisabled(!this.value);
										}
									}
								},
								{xtype: 'metext', flex: 1, margin: '0 0 0 5', disabled: !info.check}
							]
						}
					}
					return {boxLabel: info.name, inputValue: info.code, name: name, items: []};
					break;
			}
		}
		
		let counselInfo;
		async function getCounselCheckListData(allChecklist) {
			try {
				let params = {
					memberCode	: studentInfo.memberCode,
					clientCode	: studentInfo.clientCode,
					orderSeq	: me.orderSeq,
				}
        		let json = await getDataAjax('/counselServiceController/getCounselCheckListData.json', params);
        		let data = json.data;
        		counselInfo = data.counselInfo;
        		setDataToForm(data.data);
        		setStateBtnResetComplete(counselInfo);
//        		console.log(data)
				unMask();
        	}catch(e) {
        		handleException(e);
        		btnReset.setDisabled(true);
        		btnCompleted.setDisabled(true);
        	}
		}
		function setStateBtnResetComplete(info) {
			if(info.counselStageGbn != 'CP') {
				btnReset.setDisabled(true);
				btnCompleted.setDisabled(true);
				return;
			}
			btnReset.setDisabled(false);
			btnCompleted.setDisabled(false);
		}
		function setDataToForm(data) {
			mainTab.items.items.forEach(form => {
				form.reset();
				let allField = form.getForm().getFields().items;
				data.forEach(s => {
					let field = _(allField)
						.find(a => a.inputValue == s.itemCode && _.includes(['checkbox','radiofield'], a.getXType()));
					if(field != undefined) {
						field.setValue(true);
						if(field.etcYn == 'Y' && s.etcText != '') {
							field.nextSibling().setValue(s.etcText);
						}
					}
				})
			})
			mainTab.setActiveTab(0);
		}
		
		async function saveChecklist() {
			try {
				let form = mainTab.getActiveTab();
				if(!form.isValid()) {
					throw new Error();
				}
				let checklist = [];
	    		form.getForm().getFields().each(function(s) {
					if(_.includes(['checkbox','radiofield'], s.getXType()) && s.value == true) {
						checklist.push({
							itemCode	: s.inputValue,
							etcText		: s.etcYn == 'Y' ? s.nextSibling().getValue() : ''
						})
					}
				});
				let params = {
					param: {
						memberCode		: studentInfo.memberCode,
						clientCode		: studentInfo.clientCode,
						checklistGbn	: form.checklistGbn,
						counselId		: counselInfo.counselId,
						orderSeq		: me.orderSeq,
					},
					checklist: checklist,
				}
				console.log(params)
				await saveDataAjaxJson('Do you want to save?', '/counselServiceController/saveChecklist.json', Ext.JSON.encode(params), 'Save Successfully.', 'New Enrolled Student');
				me.reloadParent();
			}catch(e) {
				handleException(e);
			}
		}
		
//	END
	}
});

