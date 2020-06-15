Ext.define('ext.view.counselService.newEnrolledStudent.component.CounselInfoTab', {
	extend: 'Ext.container.Container',
	width : '100%',
	layout: 'vbox',
	reloadTab: function(){},
	initComponent : function() {
		
		let me = this;
		
		let studentInfo;
		me.reloadTab = function(info) {
			studentInfo = _.cloneDeep(info);
			studentInfo.orderMgbn = me.orderMgbn;
			getNewEnrollCounselData();
		}
		
		let targetStore = Ext.widget('mestore');
		let typeStore = Ext.widget('mestore');
		
		let targetStoreOpt = getStoreOpt(false, 'All', '', false, '');
		let typeStoreOpt = getStoreOpt(false, 'All', '', false, '');
		
		let btnStart = Ext.widget('mebutton', {
	    	text: 'Start', 
	    	margin: '0 0 0 10',
	    	handler: function() {
	    		saveNewEnrollCounsel('ST');
			}
	    });
		
		let changeCounselorPopup = Ext.create('ext.view.counselService.newEnrolledStudent.component.ChangeCounselorPopup', {
			reloadParent: function(info) {
				counselInfo.counselMemCode = info.memberCode;
				counselInfo.counselMemName = info.memberName;
				getFormField(formInfo, 'counselor').setValue(info.memberName);
				getFormField(formInfo, 'counselor').counselMemCode = info.memberCode;
			}
		});
		let btnCounselor = Ext.widget('mebutton', {
	    	text: 'Change Counselor', 
	    	margin: '0 0 0 5',
	    	iconCls: 'far fa-save btn-icon',
	    	handler: function() {
	    		changeCounselorPopup.reloadPopup(_.cloneDeep(counselInfo));
			}
	    });
		
		let changeMemoPopup = Ext.create('ext.view.counselService.newEnrolledStudent.component.ChangeMemoPopup', {
			reloadParent: function(info) {
				counselInfo.memoContent = info.memoContent;
			}
		});
		let btnMemo = Ext.widget('mebutton', {
	    	text: 'Memo', 
	    	margin: '0 0 0 5',
	    	iconCls: 'far fa-save btn-icon',
	    	handler: function() {
	    		changeMemoPopup.reloadPopup(_.cloneDeep(counselInfo));
			}
	    });
		
		let categoryList = [];
		let addCategoryPopup = Ext.create('ext.view.counselService.newEnrolledStudent.component.AddCategoryPopup', {
			reloadParent: function(data) {
				let categoryCodeList = categoryContainer.categoryCodeList;
				data.forEach(s => {
					if(_.includes(categoryCodeList, s.categoryCode)) {
						return;
					}
					let info = _(categoryList)
						.find(a => a.categoryCode == s.categoryCode);
					let categoryForm = Ext.create('ext.view.counselService.newEnrolledStudent.component.CategoryForm', {
						info: s,
						title: info.title,
						reloadParent: function() {
							categoryContainer.remove(categoryForm);
						}
					});
					categoryContainer.add(categoryForm);
				})
			},
			giveDataToParent: function(data) {
				categoryList = data;
			}
		});
		let btnAddCategory = Ext.widget('mebutton', {
	    	text: 'Category Add', 
	    	iconCls: 'fas fa-plus-circle btn-icon',
	    	margin: '5 0 0 0',
	    	handler: function() {
	    		addCategoryPopup.reloadPopup();
			}
	    });
		let btnAssignFile = Ext.widget('mebutton', {
	    	text: 'Assignment File', 
	    	iconCls: 'fas fa-plus-circle btn-icon',
	    	handler: function() {
	    		assignmentCounselFilePopup.reloadPopup();
			}
	    });
		
		let assignmentCounselFilePopup = Ext.create('ext.view.serviceSetting.categoryManagement.popup.AssignmentCounselFilePopup', {
			reloadParent: function(data) {
				data.forEach(s => {
					if(assignmentFileStore.findRecord('fileCode', s.fileCode) == null) {
						s.planYn = 'N';
						assignmentFileStore.add(s);
					}
				})
			}
		});
		let assignmentFileStore = Ext.widget('mestore');
		let assignmentFileGrid = Ext.create('Ext.grid.Panel',{
			width: '100%',
			height: 150,
			margin: '0 5',
			store: assignmentFileStore,
			tbar: [
				{xtype: 'label', text: 'Counsel File'},
				{xtype: 'tbfill'},
				btnAssignFile
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
				{text: '', align: 'center', sortable: false, menuDisabled: true,
	                renderer: function(value, metaData, record, row, col, store, gridView) {
	                	if(record.data.planYn == 'Y' || record.data.counselStageGbn == 'CP') {
	                		return '';
	                	}
	                	return `<a href="#" action="delete" class="fa fa-trash grid-icon"> Delete</a>`;
	           		}
		        }
        	]
		});
		let categoryContainer = Ext.widget('container', {
			width: '100%', 
			layout: 'vbox',
			margin: '0 5 0 5',
			categoryCodeList: [],
			items: []
		})
		let formInfo = Ext.create('Ext.form.Panel', {
			width: '100%',
			border: false,
			autoScroll: true,
			flex: 1,
			bodyPadding: '5 0 5 0',
			layout: 'vbox',
			items: [
				{xtype: 'container', width: '100%', layout: 'hbox', padding: '0 5 0 0',
					items: [{xtype: 'tbfill'}, btnCounselor, btnMemo]
				},
				{xtype: 'container', width: '100%', margin: '0 0 0 5',
					layout: {
						type: 'table',
						columns: 3,
						tdAttrs: {style: 'padding: 0px 5px 0px 0px; vertical-align: bottom;'}
					},
					items: [
						{xtype: 'medisplayfield', width: '100%', labelWidth: 95, name: 'id', fieldLabel: 'Counsel ID', margin: 0, labelStyle: 'font-weight: bold;'},
						{xtype: 'medisplayfield', width: '100%', labelWidth: 90, name: 'counselor', fieldLabel: 'Counselor', margin: 0, counselMemCode: '', labelStyle: 'font-weight: bold;'},
						{xtype: 'mecombo', width: '100%', labelWidth: 100, name: 'target', fieldLabel: 'Counsel Target', margin: 0, labelStyle: 'font-weight: bold;',
				        	store: targetStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false, labelStyle: 'font-weight: bold;',
				        },
				        {xtype: 'medisplayfield', width: '100%', labelWidth: 95, name: 'status', fieldLabel: 'Counsel Status', margin: 0, labelStyle: 'font-weight: bold;'},
						{xtype: 'medisplayfield', width: '100%', labelWidth: 90, name: 'classification', fieldLabel: 'Classification', margin: 0, labelStyle: 'font-weight: bold;'},
						{xtype: 'mecombo', width: '100%', labelWidth: 100, name: 'type', fieldLabel: 'Counsel Type', margin: 0, labelStyle: 'font-weight: bold;',
				        	store: typeStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
				        },
				        {xtype: 'medisplayfield', width: '100%', labelWidth: 95, name: 'scheduleDate', fieldLabel: 'Schedule Date', margin: 0, labelStyle: 'font-weight: bold;'},
						{xtype: 'medisplayfield', width: '100%', labelWidth: 90, name: 'startDate', fieldLabel: 'Start Date', margin: 0, labelStyle: 'font-weight: bold;'},
						{xtype: 'medisplayfield', width: '100%', labelWidth: 100, name: 'completedDate', fieldLabel: 'Completed Date', margin: 0, labelStyle: 'font-weight: bold;'},
						{xtype: 'medisplayfield', width: '100%', labelWidth: 95, name: 'planTime', fieldLabel: 'Schedule Time', margin: 0, labelStyle: 'font-weight: bold;'},
						{xtype: 'fieldcontainer', width: '100%', labelWidth: 90, fieldLabel: 'Start Time', layout: 'hbox', labelSeparator: '', margin: 0, labelStyle: 'font-weight: bold;',
							items: [
								{xtype: 'medisplayfield', value: '13:26', name: 'startTime'},
								btnStart
							]
						},
						{xtype: 'medisplayfield', width: '100%', labelWidth: 100, name: 'completedTime', fieldLabel: 'Completed Time', margin: 0, labelStyle: 'font-weight: bold;'},
					]
				},
				assignmentFileGrid,
		        categoryContainer,
				{xtype: 'container', width: '100%', colspan: 3, items: [btnAddCategory],
					layout: {
						type: 'vbox',
						pack: 'center',
						align: 'middle'
					},
				},
			]
		});
		
		let btnSave = Ext.widget('mebutton', {
	    	text: 'Temporary Save', 
	    	iconCls: 'far fa-save btn-icon', 
	    	padding: '8 10',
	    	handler: function() {
	    		saveNewEnrollCounsel('SA');
			}
	    });
		let btnCompleted = Ext.widget('mebutton', {
	    	text: 'Counsel Completed', 
	    	iconCls: 'far fa-save btn-icon', 
	    	padding: '8 10',
	    	margin: '0 0 0 5',
	    	handler: function() {
	    		saveNewEnrollCounsel('CP');
			}
	    });
		let btnCancel = Ext.widget('mebutton', {
	    	text: 'Cancel Completed', 
	    	iconCls: 'far fa-save btn-icon', 
	    	padding: '8 10',
	    	margin: '0 0 0 5',
	    	handler: function() {
	    		cancelCompleteCounsel();
			}
	    });
		
		this.items = [
			formInfo,
			{xtype: 'container', width: '100%', layout: 'hbox', padding: 5, style: 'border-top: 1px solid #ccc', //hidden: !me.writeAuth,
	        	items: [{xtype: 'tbfill'}, btnSave, btnCompleted, btnCancel]
	        },
		];
		this.callParent(arguments);
		
		init();
		async function init() {
			Common.getGeneralCode(targetStore, 'CS', 'CS0012', 'TI', targetStoreOpt, getFormField(formInfo, 'target'));
			Common.getGeneralCode(typeStore, 'CS', 'CS0003', 'TI', typeStoreOpt, getFormField(formInfo, 'type'));
		}
		
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
		
		async function getStudentSttList(classification) {
			try {
        		let json = await getDataAjax('/counselServiceController/getStudentSttList.json', {parentDetailCode: classification});
        		let data = json.data;
        		if(data.length > 0) {
        			data.unshift({
        				codeName	: 'All',
        				detailCode	: ''
        			});
        			statusStore.loadData(data);
        			getFormField(formSearch, 'level').setValue('');
        		}else {
        			statusStore.removeAll();
        			getFormField(formSearch, 'level').reset();
        		}
				unMask();
        	}catch(e) {
        		handleException(e);
        	}
		}
		
		let current = Ext.Date.format(new Date(), 'Ymd');
		async function getNewEnrollCounselData() {
			try {
        		let json = await getDataAjax('/counselServiceController/getNewEnrollCounselData.json', studentInfo);
        		let data = json.data;
        		if(data.info == null) {
        			throw new Error();
        		}
//        		console.log(data)
        		loadData(data);
				unMask();
        	}catch(e) {
        		handleException(e);
        		btnStart.setDisabled(true);
        		btnSave.setDisabled(true);
				btnCompleted.setDisabled(true);
				btnAssignFile.setDisabled(true);
				btnCancel.setDisabled(true);
        	}
		}
		let counselInfo;
		function loadData(data) {
			let info = data.info,
				category = data.category,
				file = data.file;
			counselInfo = info;
			file.forEach(s => {
				s.counselStageGbn = info.counselStageGbn;
			})
			category.forEach(s => {
				s.counselStageGbn = info.counselStageGbn;
			})
			
			getFormField(formInfo, 'id').setValue(info.counselId);
			getFormField(formInfo, 'counselor').setValue(info.counselMemName);
			getFormField(formInfo, 'counselor').counselMemCode = info.counselMemCode;
			getFormField(formInfo, 'target').setValue(info.counselTarget == '' ? targetStore.first() : info.counselTarget);
			getFormField(formInfo, 'status').setValue(info.counselStageStatus);
			getFormField(formInfo, 'classification').setValue(info.counselGbn);
			getFormField(formInfo, 'type').setValue(info.counselType == '' ? typeStore.first() : info.counselType);
			getFormField(formInfo, 'scheduleDate').setValue(stringToDate(info.scheduleDate));
			getFormField(formInfo, 'startDate').setValue(stringToDate(info.progressSrtDate));
			getFormField(formInfo, 'completedDate').setValue(stringToDate(info.progressEndDate));
			getFormField(formInfo, 'planTime').setValue(info.scheduleTime);
			getFormField(formInfo, 'startTime').setValue(info.progressSrtTime);
			getFormField(formInfo, 'completedTime').setValue(info.progressEndTime);
			
			btnCounselor.setDisabled(info.counselStageGbn == 'CP' ? true : false);
			btnMemo.setDisabled(info.counselStageGbn == 'PL' ? true : false);
			setStateBtnStart(info);
			setStateBtnSaveComplete(info);
			setStateBtnAddFileCategory(info);
			setStateBtnCancel(info);
			
			if(file.length > 0) {
				assignmentFileStore.loadData(file);
			}else {
				assignmentFileStore.removeAll();
			}
			
			categoryContainer.removeAll();
			categoryContainer.categoryCodeList = [];
			category.forEach(s => {
				let info = _(categoryList)
					.find(a => a.categoryCode == s.categoryCode);
				let categoryForm = Ext.create('ext.view.counselService.newEnrolledStudent.component.CategoryForm', {
					info: s,
					title: info.title,
					reloadParent: function() {
						categoryContainer.remove(categoryForm);
					}
				});
				categoryContainer.add(categoryForm);
				categoryContainer.categoryCodeList.push(info.categoryCode);
			})
			
		}
		function setStateBtnStart(info) {
			if(info.counselStageGbn != 'PL') {
				btnStart.setDisabled(true);
				return;
			}
			if(current < info.scheduleDate) {
				btnStart.setDisabled(true);
				return;
			}
			btnStart.setDisabled(false);
		}
		function setStateBtnSaveComplete(info) {
			if(info.counselStageGbn == 'CP') {
				btnSave.setDisabled(true);
				btnCompleted.setDisabled(true);
				return;
			}
			if(current < info.scheduleDate) {
				btnSave.setDisabled(true);
				btnCompleted.setDisabled(true);
				return;
			}
			btnSave.setDisabled(false);
			btnCompleted.setDisabled(false);
		}
		function setStateBtnAddFileCategory(info) {
			if(info.counselStageGbn == 'CP') {
				btnAssignFile.setDisabled(true);
				btnAddCategory.setDisabled(true);
				return;
			}
			btnAssignFile.setDisabled(false);
			btnAddCategory.setDisabled(false);
		}
		function setStateBtnCancel(info) {
			if(info.counselStageStatus == 'CP' || info.counselStageGbn != 'CP') {
				btnCancel.setDisabled(true);
				return;
			}
			btnCancel.setDisabled(false);
		}
		
		async function saveNewEnrollCounsel(button) {
			try {
				if(button != 'ST' && !formInfo.isValid()) {
					throw new Error();
				}
				
				let current = new Date();
				let progressSrtDate = button == 'ST' ? Common.getRawDate(current) : counselInfo.progressSrtDate;
				progressSrtDate = progressSrtDate == '' ? Common.getRawDate(current) : progressSrtDate;
				let progressSrtTime = button == 'ST' ? Common.getRawTime(current) : counselInfo.progressSrtTime;
				progressSrtTime = progressSrtTime == '' ? Common.getRawTime(current) : progressSrtTime;
				
				let progressEndDate = counselInfo.progressEndDate;
				progressEndDate = progressEndDate == '' && button == 'CP' ? Common.getRawDate(current) : progressSrtDate;
				let progressEndTime = counselInfo.progressEndTime;
				progressEndTime = progressEndTime == '' && button == 'CP' ? Common.getRawTime(current) : progressEndTime;
				
				let fileList = _(assignmentFileStore.data.items)
					.map(s => s.data.fileCode)
					.value();
				
				let categoryList = _(categoryContainer.items.items)
					.map(s => s.getInfo())
					.value()
				
				let params = {
					param: {
						memberCode			: studentInfo.memberCode,
						clientCode			: studentInfo.clientCode,
						counselId			: counselInfo.counselId,
						counselMemCode		: getFormField(formInfo, 'counselor').counselMemCode,
						counselTarget		: getFormField(formInfo, 'target').getValue(),
						counselType			: getFormField(formInfo, 'type').getValue(),
						counselStageGbn		: button == 'CP' ? 'CP' : 'CS',
						counselStageStatus	: 'IP',
						scheduleDate		: counselInfo.scheduleDate,
						scheduleTime		: counselInfo.scheduleTime,
						progressSrtDate		: progressSrtDate,
						progressSrtTime		: progressSrtTime,
						progressEndDate		: progressEndDate,
						progressEndTime		: progressEndTime,
						completeYn			: button == 'CP' ? 'Y' : 'N'
					},
					fileList: fileList,
					categoryList: categoryList
				}
				
				console.log(params)
				await saveDataAjaxJson('Do you want to save?', '/counselServiceController/saveNewEnrollCounsel.json', Ext.JSON.encode(params), 'Save Successfully.', 'New Enrolled Student');
//				rightPanel.setDisabled(true);
			}catch(e) {
				handleException(e);
			}
		}
		
		async function cancelCompleteCounsel() {
			try {
				let params = {
					counselId: counselInfo.counselId,
				}
				await saveDataAjax('Do you want to cancel?', '/counselServiceController/cancelCompleteCounsel.json', params, 'Cancel Successfully.', 'New Enrolled Student');
//				rightPanel.setDisabled(true);
			}catch(e) {
				handleException(e);
			}
		}
		
//	END
	}
});

