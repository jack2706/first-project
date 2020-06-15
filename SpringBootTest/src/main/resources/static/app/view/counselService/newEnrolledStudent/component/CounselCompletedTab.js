Ext.define('ext.view.counselService.newEnrolledStudent.component.CounselCompletedTab', {
	extend: 'Ext.container.Container',
	width : '100%',
	layout: 'vbox',
	reloadTab: function(){},
	initComponent : function() {
		
		let me = this;
		
		let studentInfo;
		me.reloadTab = function(info) {
			studentInfo = _.cloneDeep(info);
			getCounselCompleteTabData();
		}
		
		let assignmentFileStore = Ext.widget('mestore');
		let assignmentFileGrid = Ext.create('Ext.grid.Panel',{
			width: '100%',
			flex: 1,
			minHeight: 200,
			margin: '5 0 0 0',
			store: assignmentFileStore,
			tbar: [
				{xtype: 'label', text: 'Counsel File'},
			],
			listeners: { 
			    cellclick: function(view, cell, cellIndex, record, row, rowIndex, e) {
			    	console.log(record.data)
			    	let action = $(e.target).attr('action');
			    	if(action == 'delete') {
			    		assignmentFileStore.remove(record);
			    	}
			    	if(action == 'preview') {
			    		previewCounselFile(record.data);
			    	}
			    }
		 	},
			columns: [
        		{text: 'File Title', flex: 1, minWidth: 200, dataIndex: 'title', align: 'center', sortable: false, menuDisabled: true},
				{text: 'File Type', width: 120, dataIndex: 'fileTypeName', align: 'center', sortable: false, menuDisabled: true},
				{text: '', align: 'center', sortable: false, menuDisabled: true,
	                renderer: function(value, metaData, record, row, col, store, gridView) {
	                	if(record.data.fileType == 'U') {
	                		return `<a href="#" action="preview" class="grid-icon">Preview</a>`;
	                	}
	                	if(record.data.attachFileCode != 0) {
	                		return `<a href="#" action="download" class="grid-icon">Download</a>`;
	                	}
	           		}
		        },
        	]
		});
		
		let approvalLinePopup = Ext.create('ext.view.counselService.newEnrolledStudent.component.ApprovalLinePopup', {
			approvalList: [],
			receiveList: [],
			reloadParent: function(approvalList, receiveList) {
				try {
					buildApprovalLineForm(approvalList, receiveList);
					approvalLinePopup.approvalList = approvalList;
					approvalLinePopup.receiveList = receiveList;
				}catch(e) {
					handleException(e);
				}
			}
		});
		let approvalLineForm = Ext.widget('container', {
			width: '100%',
			minHeight: 120,
			margin: '5 0 0 0',
			style: 'border: 1px solid #ccc;',
			cls: 'approvalLineForm',
			layout: 'column',
			listeners: {
				el: {
					scope: this,
					click: function() {
						approvalLinePopup.reloadPopup();
					}
             	}
			},
			html: '<b class="labelSelect">Please Select Approval Line</b>',
			items: [
				{xtype: 'component', cls: 'component', height: 120, columnWidth: .25,
					html: `
						<div class="position">Payment Staff</div>
						<div class="number">1</div>
						<div class="name">Nguyễn Ngọc Tuyết Sương</div>
					`
				},
				{xtype: 'component', cls: 'component', height: 120, columnWidth: .25,
					html: `
						<div class="position">Payment Staff</div>
						<div class="number">1</div>
						<div class="name">Nguyễn Ngọc Tuyết Sương</div>
					`
				},
				{xtype: 'component', cls: 'component', height: 120, columnWidth: .25,
					html: `
						<div class="position">Payment Staff</div>
						<div class="number">1</div>
						<div class="name">Nguyễn Ngọc Tuyết Sương</div>
					`
				},
				{xtype: 'component', cls: 'component', height: 120, columnWidth: .25,
					html: `
						<div class="position">Payment Staff</div>
						<div class="number">1</div>
						<div class="name">Nguyễn Ngọc Tuyết Sương</div>
					`
				},
				{xtype: 'component', columnWidth: 1, margin: '5 0 5 8', html: '<h5><b>Received Referece</b>: Yohan (김요한), Thomas (김동환)</h5>'}
			]
		});
		
		let formInfo = Ext.create('Ext.form.Panel', {
			width: '100%',
			border: false,
			flex: 1,
			bodyPadding: 5,
			layout: 'vbox',
			autoScroll: true,
			items: [
				{xtype: 'radiogroup', fieldLabel: 'Counsel Result Notice', labelWidth: 130, width: 400, columns: 2, name: 'radio', labelSeparator: '',
		        	items: [
		    	        {boxLabel: 'Send', inputValue: 'Y', name: 'radio'},
		    	        {boxLabel: 'Not Send', inputValue: 'N', name: 'radio'},
			        ],
			        listeners: {
                        change: function(field, newValue, oldValue, eOpts) {
                        	getFormField(formInfo, 'checkbox').setReadOnly(newValue.radio == 'N');
                        	getFormField(formInfo, 'checkbox').reset();
                        }                                
                    }
		        },
		        {xtype: 'checkboxgroup', fieldLabel: ' ', labelWidth: 130, width: 400, columns: 2, name: 'checkbox', labelSeparator: '', readOnly: true,
		        	items: [
		    	        {boxLabel: 'App Send', inputValue: 'AS', name: 'checkbox', readOnly: true},
		    	        {boxLabel: 'SMS Send', inputValue: 'SM', name: 'checkbox', readOnly: true},
//		    	        {boxLabel: 'SMS Send', inputValue: 'AL', name: 'checkbox', hidden: true},
			        ]
		        },
		        assignmentFileGrid,
		        approvalLineForm
			]
		});
		
		let btnSubmit = Ext.widget('mebutton', {
	    	text: 'Submit', 
	    	iconCls: 'far fa-save btn-icon', 
	    	padding: '8 10',
	    	handler: function() {
	    		completeAllNewEnrollCounsel();
			}
	    });
		let btnAdd = Ext.widget('mebutton', {
	    	text: 'Add Counsel', 
	    	iconCls: 'far fa-save btn-icon', 
	    	padding: '8 10',
	    	margin: '0 0 0 5',
	    	handler: function() {
//	    		saveNewEnrollCounsel('CP');
			}
	    });
		
		this.items = [
			formInfo,
			{xtype: 'container', width: '100%', layout: 'hbox', padding: 5, style: 'border-top: 1px solid #ccc', //hidden: !me.writeAuth,
	        	items: [{xtype: 'tbfill'}, btnSubmit, btnAdd]
	        }
		];
		this.callParent(arguments);
		
		let viewPlcAchievementPopup = Ext.create('ext.view.serviceSetting.categoryManagement.popup.ViewPlcAchievementPopup');
		let viewPlcAchievementAllPopup = Ext.create('ext.view.serviceSetting.categoryManagement.popup.ViewPlcAchievementAllPopup');
		
		function previewCounselFile(info) {
			if(info.systemCode == 'LC') {
//				PLC
				switch(info.measureStandard) {
					case 'EP':
					case 'UT':
					case 'LT':
						viewPlcAchievementPopup.reloadPopup(info, [studentInfo]);
						break;
					case 'AC':
						viewPlcAchievementAllPopup.reloadPopup([studentInfo]);
						break;
					case 'US':
						break;
					case 'WH':
						break;
				}
			}
			if(info.systemCode == '') {
				let urlLink = info.url;
				window.open(urlLink, '_blank');
			}
		}
		
		function buildApprovalLineForm(approvalList, receiveList) {
			let items = [];
			approvalList.forEach((s, index) => {
				items.push({
					xtype: 'component', cls: 'component', height: 120, columnWidth: .25,
					html: `
						<div class="position">${s.positionName}</div>
						<div class="number">${++index}</div>
						<div class="name">${s.memberName}</div>
					`
				});
			})
			let receiveStr = _(receiveList)
				.map(s => s.memberName)
				.join(', ');
			items.push({xtype: 'component', columnWidth: 1, margin: '5 0 5 8', html: `<h5><b>Received Referece</b>: ${receiveStr}</h5>`});
			approvalLineForm.removeAll();
			approvalLineForm.add(items);
		}
		
		async function getCounselCompleteTabData() {
			try {
        		let json = await getDataAjax('/counselServiceController/getCounselCompleteTabData.json', studentInfo);
        		let data = json.data, info = data.info, file = data.file;
        		if(info == null) {
        			formInfo.reset();
        			getFormField(formInfo, 'radio').setValue({radio: 'N'});
        		}else {
        			getFormField(formInfo, 'radio').setValue({radio: info.sendYn});
        			getFormField(formInfo, 'checkbox').setValue({checkbox: info.sendType});
        		}
        		if(file.length > 0) {
        			assignmentFileStore.loadData(file);
        		}else {
        			assignmentFileStore.removeAll();
        		}
        		setStateBtnSubmitAdd(info);
				unMask();
        	}catch(e) {
        		handleException(e);
        		btnSubmit.setDisabled(true);
        		btnAdd.setDisabled(true);
        	}
		}
		function setStateBtnSubmitAdd(info) {
			btnSubmit.setDisabled(info != null);
			btnAdd.setDisabled(info == null);
		}
		
		async function completeAllNewEnrollCounsel() {
			try {
				let sendType = getFormField(formInfo, 'checkbox').getValue().checkbox;
				sendType = sendType == undefined ? '' : sendType;
				if(sendType instanceof Array) {
					sendType = 'AL';
				}
				let params = {
					param: {
						memberCode	: studentInfo.memberCode,
						clientCode	: studentInfo.clientCode,
						sendYn		: getFormField(formInfo, 'radio').getValue().radio,
						sendType	: sendType,
					},
					approvalList: [],
				}
				
				console.log(params)
				await saveDataAjaxJson('Do you want to save?', '/counselServiceController/completeAllNewEnrollCounsel.json', Ext.JSON.encode(params), 'Save Successfully.', 'New Enrolled Student');
//				rightPanel.setDisabled(true);
			}catch(e) {
				handleException(e);
			}
		}
		
//	END
	}
});

