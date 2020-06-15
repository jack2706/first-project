Ext.define('ext.view.counselService.newEnrolledStudent.NewEnrolledStudent', {
	extend: 'Ext.form.Panel',
	header: false,
	width : '100%',
	border: false,
	layout: 'border',
	writeAuth: true,
	initComponent : function() {
		
		let me = this;
		
		let levelStore = Ext.widget('metreestore');
		let classificationStore = Ext.widget('mestore');
		let statusStore = Ext.widget('mestore');
		
		let classificationStoreOpt = getStoreOpt(false, 'All', '', true, '03');
		
		let btnSearch = Ext.widget('mebutton', {
	    	text: 'Search', 
	    	padding: '8 10', 
	    	style: 'float: right;',
	    	iconCls: 'fa fa-search btn-icon', 
	    	handler: function() {
	    		getStudentList();
			}
	    });
		
		let periodStore = Ext.widget('mestore', {
			data: [
				{code: '', name: 'All'},
				{code: '01', name: 'Last 30 Days'},
				{code: '02', name: 'Current Quarter'},
				{code: '03', name: 'Current Year'},
			]
		});
		
		let specialEnterkey = {
			specialkey: function(f, e) {    
                if(e.getKey() == e.ENTER) {
                	console.log('a')
//                	getStudentList();
                }
            }
		}
		let formSearch = Ext.create('Ext.form.Panel', {
			width: '100%',
			border: false,
			padding: '10 0 0 10',
			style: 'border:1px solid #b5b8c8; border-radius:3px;',
			layout: {
				type: 'table',
				columns: 3,
				tdAttrs: {style: 'padding: 0px 10px 0px 0px; vertical-align : top;'}
			},
	        items: [
	        	{xtype: 'mecombo', width: '100%', labelWidth: 130, name: 'classification', fieldLabel: 'Student Classification',
		        	store: classificationStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false, readOnly: true,
		        },
		        {xtype: 'mecombo', width: '100%', labelWidth: 60, name: 'status', fieldLabel: 'Status',
		        	store: statusStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
		        },
		        {xtype: 'treecombojack', width: '100%', labelWidth: 90, name: 'level', fieldLabel: 'Level', treeWidth: 200, editable: false, emptyText: 'All', store: levelStore},
		        {xtype: 'treecomboclass', width: '100%', labelWidth: 130, fieldLabel: 'Class', multiSelect: true, name: 'class',
					params: {
						year		: new Date().getFullYear(),
						semester	: CURRENT_YEAR_SEM.semester,
						clientCode	: LOGIN_INFO.clientCode
					}
				},
				{xtype: 'metext', width: '100%', labelWidth: 60, name: 'memberCode', fieldLabel: 'Student ID', listeners: specialEnterkey},
		        {xtype: 'metext', width: '100%', labelWidth: 90, name: 'memberName', fieldLabel: 'Student Name', listeners: specialEnterkey},
		        {xtype: 'mecombo', width: '100%', labelWidth: 130, name: '', fieldLabel: 'Perod Setting',
		        	store: periodStore, valueField: 'code', displayField: 'name', queryMode: 'local', editable: false, value: '',
		        	listeners: {
		        		change: function() {
		        			changePeriod(this.value);
		        		}
		        	}
		        },
		        {xtype: 'container', width: '100%', layout: 'hbox', colspan: 2,
					items: [
						{xtype: 'melabel', text: 'Period', width: 65},
						{xtype: 'medate', flex: .5, name: 'start', editable: false,
							listeners: {
								change: function(combo, value) {
									if(this.value != null) {
										getFormField(formSearch, 'end').setMinValue(this.value);
									}
								}
							}
						},
						{xtype: 'melabel', text: ' ~ ', width: 30, style: 'text-align: center; font-weight: 400;'},
						{xtype: 'medate', flex: .5, name: 'end', style: 'float: right;', editable: false}
					]
				},
				{xtype: 'menumber', width: '100%', labelWidth: 130, name: 'day', fieldLabel: 'Admission Elaped Days', decimalPrecision: 0, listeners: specialEnterkey},
				{xtype: 'tbfill'},
				btnSearch
	        ]
		});
		
		let mainStore = Ext.widget('mestore', {
			pageSize: PAGE_SIZE,
            proxy: {
				type : 'ajax',
				url: CONTEXT_PATH + '/memberController/getStudentList.json',
				reader: {
					type: 'json',
					enablePaging: true,
					rootProperty: 'data',
					totalProperty: 'totalCount',
				}
            },
            queryMode: 'local',
            data: [
            	{memberCode: '59110105', memberName: 'aaa', clientCode: '1001001', learningYearCode: '2020', semesterGbn: '02'},
            	{memberCode: '12090470', memberName: 'GyuRi Kim', clientCode: '1001001', learningYearCode: '2020', semesterGbn: '02'}
            ]
		});
		let mainGrid = Ext.create('Ext.grid.Panel', {
        	store: mainStore,
        	width: '100%',
        	margin: '5 0',
        	flex: 1,
        	selModel: Ext.create('Ext.selection.CheckboxModel'),
        	cls: 'gridHeaderWrap',
        	columns: [
        		{text: 'No', width: 40, dataIndex: 'rowNo', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Student Name', flex: 1, minWidth: 200, dataIndex: 'memberName', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Student ID', width: 120, dataIndex: 'memberCode', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Class', width: 120, dataIndex: '', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Level', width: 120, dataIndex: '', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Classification', width: 120, dataIndex: '', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Status', width: 120, dataIndex: '', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Admission Day', width: 120, dataIndex: '', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Counsel Plan Date', width: 120, dataIndex: '', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Counsel Before Admission Day', width: 120, dataIndex: '', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Counsel In Admission Day', width: 120, dataIndex: '', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Counsel After Admission 1 week', width: 140, dataIndex: '', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Counsel After Admission 2 week', width: 140, dataIndex: '', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Counsel After Admission 4 week', width: 140, dataIndex: '', align: 'center', sortable: false, menuDisabled: true},
        	],
        	bbar: new Ext.PagingToolbar({
    			store: mainStore,
    			pageSize: PAGE_SIZE,
    			displayInfo: true,
    			listeners: {
    				beforechange : function(pagingtoolbar, page, eOpts) {
    					setParamsToProxy(paramsToSearch, this.store.getProxy());
    				}
    			}
    		}),
        	listeners: { 
				cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
					console.log(record.data)
					if(cellIndex != 0) {
						topTabs.setActiveTab(0);
						botTabs.setActiveTab(0);
						rightPanel.setDisabled(false);
						loadStudentDetail(record.data);
					}
		        }
		 	}
    	});
		
		let btnExcel = Ext.widget('mebutton', {
			text: 'Excel',
			iconCls: 'far fa-file-excel btn-icon',
			padding: '8 10',
			menu: [
				{text: 'Selected output',
					handler: function(value) {
						exportExcel('S');
					}
				},
				{text: 'Current Page',
					handler: function(value) {
						exportExcel('P');
					}
				},
				{text: 'All output',
					handler: function(value) {
						exportExcel('A');
					}
				}
			]
		});
		
		let parentChecklistForm = Ext.create('ext.view.counselService.newEnrolledStudent.component.ParentChecklistForm', {hidden: true});
		let studentInfoTab = Ext.create('ext.view.counselService.newEnrolledStudent.component.StudentInfo');
		let parentInfoTab = Ext.create('ext.view.counselService.newEnrolledStudent.component.StudentInfo');
		let counselHistory = Ext.create('ext.view.counselService.newEnrolledStudent.component.CounselHistory');
		
		let counselTab1 = Ext.create('ext.view.counselService.newEnrolledStudent.component.CounselInfoTab', {
			orderMgbn: 1,
			reloadParent: function() {
				
			}
		});
		let counselTab2 = Ext.create('ext.view.counselService.newEnrolledStudent.component.CounselInfoTab', {
			orderMgbn: 2,
			reloadParent: function() {
				
			}
		});
		let counselTab3 = Ext.create('ext.view.counselService.newEnrolledStudent.component.CounselInfoTab', {
			orderMgbn: 3,
			reloadParent: function() {
				
			}
		});
		let counselTab4 = Ext.create('ext.view.counselService.newEnrolledStudent.component.CounselInfoTab', {
			orderMgbn: 4,
			reloadParent: function() {
				
			}
		});
		let counselTab5 = Ext.create('ext.view.counselService.newEnrolledStudent.component.CounselInfoTab', {
			orderMgbn: 5,
			reloadParent: function() {
				
			}
		});
		let counselCompletedTab = Ext.create('ext.view.counselService.newEnrolledStudent.component.CounselCompletedTab', {
			reloadParent: function() {
				parentChecklistForm.reloadTab(info);
			}
		});
		let checklistTab = Ext.create('ext.view.counselService.newEnrolledStudent.component.ChecklistTab', {
			reloadParent: function() {
				parentChecklistForm.reloadTab(studentInfo);
			}
		});
		
		let topTabs = Ext.widget('metabpanel', {
			flex: .3, 
			region: 'north', 
			collapsible: true, 
			split: true, 
			border: false, 
			header: false,
			items: [
				{title: 'Student Information', name: 'student', xtype: 'container', layout: 'fit', items: [studentInfoTab]},
				{title: 'Parent Information', name: 'parent', xtype: 'container', layout: 'fit', items: [parentInfoTab]},
				{title: 'Counsel History', name: 'counsel', xtype: 'container', layout: 'fit', items: [counselHistory]},
			],
			listeners: {
	            'tabchange': function (tabPanel, tab) {
	                changeTabpanel(tab.name)
	            }
	        }
		})
		let botTabs = Ext.widget('metabpanel', {
			items: [
				{title: 'Counsel before <br> Admission day', xtype: 'container', layout: 'fit', items: [counselTab1]},
				{title: 'Counsel in <br> Admission day', xtype: 'container', layout: 'fit', items: [counselTab2]},
				{title: 'Counsel after <br> Admission 1 week', xtype: 'container', layout: 'fit', items: [counselTab3]},
				{title: 'Counsel after <br> Admission 2 week', xtype: 'container', layout: 'fit', items: [counselTab4]},
				{title: 'Counsel after <br> Admission 4 week', xtype: 'container', layout: 'fit', items: [counselTab5]},
				{title: 'Completed', xtype: 'container', layout: 'fit', items: [counselCompletedTab]},
				{title: 'Checklist Register', xtype: 'container', layout: 'fit', items: [checklistTab]},
			],
		})
		
		let leftPanel = Ext.widget('panel', {
			width: '50%',
			layout: 'vbox',
			border: false,
			region: 'center',
			split: true,
			bodyPadding: 5,
			items: [
				formSearch, 
				mainGrid,
				{xtype: 'container', width: '100%', layout: 'hbox',
	        		items: [btnExcel, {xtype: 'tbfill'}]
	        	}
	        ]
		});
		let rightPanel = Ext.widget('form', {
			region: 'east',
			collapsible: true,
			border: false,
			header: false,
			layout: 'border',
			width: '50%',
			split: true,
			bodyPadding: '5 0 0 0',
	        items: [
	        	topTabs,
	        	{xtype: 'form', flex: .7, layout: 'fit', region: 'center', border: false, header: false, margin: '5 0 0 0',
	        		items: [
	        			parentChecklistForm,
	        			botTabs
	        		]
	        	}
	        ]
		});
		
		this.items = [leftPanel, rightPanel];
		this.callParent(arguments);
		
		init();
		async function init() {
			Common.getLevelList(levelStore, getFormField(formSearch, 'level'), {clienCode: ''});
			await Common.getGeneralCode(classificationStore, 'EM', 'MB0010', 'KEMS', classificationStoreOpt, getFormField(formSearch, 'classification'));
			getStudentSttList(getFormField(formSearch, 'classification').getValue());
		}
		
		function initComponents() {
			if(counselTab2 == null)	{
				counselTab2 = Ext.create('ext.view.counselService.newEnrolledStudent.component.CounselInfoTab', {orderMgbn: 2});
				counselTab3 = Ext.create('ext.view.counselService.newEnrolledStudent.component.CounselInfoTab', {orderMgbn: 3});
				counselTab4 = Ext.create('ext.view.counselService.newEnrolledStudent.component.CounselInfoTab', {orderMgbn: 4});
				counselTab5 = Ext.create('ext.view.counselService.newEnrolledStudent.component.CounselInfoTab', {orderMgbn: 5});
			}
		}
		
		function changeTabpanel(tab) {
			switch(tab) {
				case 'student':
				case 'counsel':
					parentChecklistForm.hide();
					break;
				case 'parent':
					parentChecklistForm.show();
					break;
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
		function changePeriod(value) {
			if(value == '') {
				getFormField(formSearch, 'start').reset();
				getFormField(formSearch, 'end').reset();
				return;
			}
			let current = new Date();
			let quarters = [
				{start: new Date(current.getFullYear(), 0, 1), end: new Date(current.getFullYear(), 2, 31)},
				{start: new Date(current.getFullYear(), 3, 1), end: new Date(current.getFullYear(), 5, 30)},
				{start: new Date(current.getFullYear(), 6, 1), end: new Date(current.getFullYear(), 8, 30)},
				{start: new Date(current.getFullYear(), 9, 1), end: new Date(current.getFullYear(), 11, 31)},
			]
			let start = '', end  = '';
			switch(value) {
				case '01':
					start = new Date(current.getFullYear(), current.getMonth() - 1, current.getDate());
					end = current;
					break;
				case '02':
					let info = quarters[Math.floor(current.getMonth() / 3)];
					start = info.start;
					end = info.end;
					break;
				case '03':
					start = new Date(current.getFullYear(), 0, 1);
					end = new Date(current.getFullYear(), 11, 31);
					break;
			}
			getFormField(formSearch, 'start').setValue(start);
			getFormField(formSearch, 'end').setValue(end);
		}
		
		let studentInfo;
		function loadStudentDetail(info) {
			studentInfo = info;
			counselTab1.reloadTab(studentInfo);
			counselTab2.reloadTab(studentInfo);
			counselTab3.reloadTab(studentInfo);
			counselTab4.reloadTab(studentInfo);
			counselTab5.reloadTab(studentInfo);
			counselCompletedTab.reloadTab(studentInfo);
			checklistTab.reloadTab(studentInfo);
			counselHistory.reloadTab(studentInfo);
			studentInfoTab.reloadTab(studentInfo);
			parentInfoTab.reloadTab(studentInfo);
			parentChecklistForm.reloadTab(studentInfo);
		}
		
//	END
	}
});

