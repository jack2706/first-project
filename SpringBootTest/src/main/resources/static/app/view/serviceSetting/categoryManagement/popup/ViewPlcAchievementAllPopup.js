Ext.define('ext.view.serviceSetting.categoryManagement.popup.ViewPlcAchievementAllPopup', {
	extend: 'component.MeWindow',
	title: 'Counsel File',
	width: 1400,
	defaultWidth: 1400,
	layout: 'vbox',
	bodyPadding: 5,
	reloadPopup: function(){},
	initComponent : function() {
		
		let me = this;
		
//		{memberCode, memberName, learningYearCode, semesterGbn}
		me.reloadPopup = function(data) {
			formSearch.reset();
			studentStore.loadData(data);
			getFormField(formSearch, 'studentName').setValue(data[0].memberCode);
			setYearSemester(data[0].memberCode);
			paramsToSearch.selectGridFlag = 'SA';
			btnBack.hide();
			clickSearch();
			me.show();
		}
		
		let studentStore = Ext.widget('mestore');
		let semesterFromStore = Ext.widget('mestore');
		let yearFromStore = Ext.widget('mestore');
		let semesterToStore = Ext.widget('mestore');
		let yearToStore = Ext.widget('mestore');
		
        let semesterFromStoreOpt = getStoreOpt(false, 'All', '', true, '01');
  		let semesterToStoreOpt = getStoreOpt(false, 'All', '', true, '02');
 		let yearFromStoreOpt = getStoreOpt(false, 'All', '', false, new Date().getFullYear());
		
		let btnSearch = Ext.widget('mebutton', {
	    	text: 'Search', 
	    	padding: '8 10', 
	    	margin: '0 0 0 10',
	    	iconCls: 'fa fa-search btn-icon', 
	    	style: 'float: right;',
	    	handler: function() {
	    		clickSearch();
            }
	    });
		let btnBack = Ext.create('Ext.Button', {
        	cls: 'btn-button pull-left btn-back',
            text: 'Back',
            width: 80,
            margin: '5 0 0 0',
            handler: function() {
            	backFunction();
            }
        });
		
		let formSearch = Ext.create('Ext.form.Panel', {
			width : '100%',
			border : false,
			padding : 10,
			style : 'border: 1px solid #b5b8c8; border-radius: 3px;',
			layout: 'vbox',
			items: [
				{xtype: 'container', width: '100%', layout: 'hbox',
					items: [
						{xtype: 'mecombo', width: 305, labelWidth: 90, name: 'studentName', fieldLabel: 'Student Name',
				        	store: studentStore, valueField: 'memberCode', displayField: 'memberName', queryMode: 'local', editable: false,
				        	listeners: {
				        		select: function() {
				        			setYearSemester(this.value);
				        		}
				        	}
				        }
					]
				},
    	        {xtype: 'container', width: '100%', layout: 'hbox', margin: '5 0 0 0',
					items: [
						{xtype: 'mecombo', width: 200, labelWidth: 90, name: 'yearFrom', fieldLabel: 'Year/Semester', margin: '0 5 0 0',
				        	store: yearFromStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
				        },
				        {xtype: 'mecombo', width: 140, name: 'semesterFrom',
				        	store: semesterFromStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
				        },
				        {xtype: 'melabel', text: '~', margin: '7 5 0 5'},
				        {xtype: 'mecombo', width: 100, name: 'yearTo',
				        	store: yearToStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
				        },
				        {xtype: 'mecombo', width: 140, name: 'semesterTo', margin: '0 5',
				        	store: semesterToStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
				        },
				        {xtype: 'checkboxfield', boxLabel: 'Monthly', name: 'monthly'},
				        {xtype: 'tbfill'},
				        btnSearch
					]
				},
			]
		});
		
		let plcChartPopup = Ext.create('ext.view.serviceSetting.categoryManagement.popup.PlcChartPopup');
		let gridTitle = Ext.widget('label', {
			text: 'e-POLY % Correct'
		});
		let mainStore = Ext.widget('mestore');
		let mainGrid = Ext.create('ext.view.serviceSetting.categoryManagement.popup.AchievementGrid', {
			margin: '5 0 0 0',
			tbar: [
				gridTitle,
				{xtype: 'tbfill'},
				{xtype: 'button', text: 'Graph', iconCls: 'fas fa-chart-bar btn-icon',
                	handler: function() {
                		plcChartPopup.reloadPopup(cloneParam(paramsToSearch), _.cloneDeep(searchDataChart));
                	}
                }
			],
			listeners: {
                cellclick: function(view, cell, cellIndex, record, row, rowIndex, e) {
                	console.log(record.data)
                	let cellTarget = $(e.target).data('action');
                	switch(cellTarget) {
	                	case 'SS':
				    		paramsToSearch.selectGridFlag = 'SA';
	                		backData.push(cloneParam(paramsToSearch));
	                		paramsToSearch.measureStandardCode = record.data.measureStandardCode;
	                		paramsToSearch.measureStandardName = record.data.measureStandardName;
	                		paramsToSearch.subjectCode = 0;
				    		getAchievementList('SS');
	                		break;
	                	case 'SK':
	                		paramsToSearch.selectGridFlag = 'SS';
	                		backData.push(cloneParam(paramsToSearch));
	                		paramsToSearch.subjectCode = record.data.subjectCode;
	                		paramsToSearch.subjectName = record.data.subjectName;
				    		getAchievementList('SK');
	                		break;
	                	case 'MS':
	                		paramsToSearch.selectGridFlag = 'MA';
	                		backData.push(cloneParam(paramsToSearch));
	                		paramsToSearch.measureStandardCode = record.data.measureStandardCode;
	                		paramsToSearch.measureStandardName = record.data.measureStandardName;
				    		paramsToSearch.subjectCode = 0;
				    		getAchievementList('MS');
	                		break;
	                	case 'MK':
	                		paramsToSearch.selectGridFlag = 'MS';
	                		backData.push(cloneParam(paramsToSearch));
	                		paramsToSearch.subjectCode = record.data.subjectCode;
	                		paramsToSearch.subjectName = record.data.subjectName;
				    		getAchievementList('MK');
	                		break;
                	}
			    }
         	}
		});
		let pagingComponent = Ext.create('ext.view.serviceSetting.categoryManagement.popup.PagingComponent', {
			reloadParent: function(yearTermLevel) {
				paramsToSearch.yearTermLevel = yearTermLevel;
        		getAchievementList(paramsToSearch.selectGridFlag);
			}
		});
		
		let labelNoData = Ext.widget('label', {
			width: '100%',
			margin: '10 0 5 0',
			style: 'text-align: center;',
        	text: 'No data ...'
		})
		
		this.items = [
			formSearch, 
			btnBack,
			pagingComponent,
			mainGrid, 
			labelNoData
        ];
		this.callParent(arguments);
		
		let listYear = [];
		init();
		async function init() {
			Common.getGeneralCode(yearFromStore, 'LC', 'SY0003', 'TI', yearFromStoreOpt, getFormField(formSearch, 'yearFrom'));
			Common.getGeneralCode(semesterFromStore, 'LC', 'SY0004', 'TI', semesterFromStoreOpt, getFormField(formSearch, 'semesterFrom'));
			Common.getGeneralCode(yearToStore,'LC', 'SY0003', 'TI', yearFromStoreOpt, getFormField(formSearch, 'yearTo'));
			Common.getGeneralCode(semesterToStore,'LC', 'SY0004', 'TI', semesterToStoreOpt, getFormField(formSearch, 'semesterTo'));
			
			let json = await getDataAjax( "/general/generalCodes.json", {systemCode: 'LC', commonCode: 'SY0003', system: 'TI'});
    		listYear = json.data;
		}
		function setYearSemester(memberCode) {
			if(memberCode == null) {
				return;
			}
			let studentInfo = studentStore.findRecord('memberCode', memberCode);
			let info = getYearBeforeSixSemester(listYear, {year: studentInfo.data.learningYearCode, semester: studentInfo.data.semesterGbn});
			getFormField(formSearch, 'yearFrom').setValue(info.fromYear);
			getFormField(formSearch, 'semesterFrom').setValue(info.fromSem);
			getFormField(formSearch, 'yearTo').setValue(info.toYear);
			getFormField(formSearch, 'semesterTo').setValue(info.toSem);
		}
		
		function changeSemesterLabel() {
			searchData.listYearSem.forEach(s => {
				switch(s.termGbn) {
					case '01': 
						s.termName = '1<sup>st</sup> Semester';
						break;
					case '02': 
						s.termName = '2<sup>nd</sup> Semester';
						break;
					case '03': 
						s.termName = '3<sup>rd</sup> Semester';
						break;
				}
			})
		}
		
		function clickSearch() {
			paramsToSearch.memberCode = getFormField(formSearch, 'studentName').getValue();
        	paramsToSearch.fromYearTerm = getFormField(formSearch, 'yearFrom').getValue() + getFormField(formSearch, 'semesterFrom').getValue();
        	paramsToSearch.toYearTerm = getFormField(formSearch, 'yearTo').getValue() + getFormField(formSearch, 'semesterTo').getValue();
        	let monthlyCheck = getFormField(formSearch, 'monthly').getValue();
        	let selectGridFlag = paramsToSearch.selectGridFlag;
        	paramsToSearch.selectGridFlag = (monthlyCheck == false ? 'S' : 'M') + selectGridFlag.substr(selectGridFlag.length - 1);
        	paramsToSearch.yearTermLevel = '';
        	getAchievementList(paramsToSearch.selectGridFlag);
		}

		let paramsToSearch = {
			memberCode			: '',
			fromYearTerm		: '',
			toYearTerm			: '',
			subjectCode			: 0,
			yearTermLevel 		: '',
			selectGridFlag		: ''
		};
		let selectGridFlag;
		async function getAchievementList(flag) {
			if(['SA','MA'].includes(flag)) {
				backData = [];
			}
			paramsToSearch.selectGridFlag = flag;
			selectGridFlag = flag;
			if(mainGrid.getView().features != undefined) {
				mainGrid.getView().features[0].expandAll();
			}
        	console.log(paramsToSearch)
			try {
        		let json = await getDataAjax('/serviceSettingController/getAchievementList.json', paramsToSearch);
        		searchData = json.data;
//        		console.log(searchData)
        		if(searchData.listYearSem.length == 0) {
        			throw new Error();
        		}
        		if(searchData.listValue.length == 0) {
        			if(!['SA','MA'].includes(flag)) {
						btnBack.show();
						setTitleGrid(flag);
        			}
        			throw new Error();
				}
				// changeSemesterLabel();

        		mainGrid.show();
				labelNoData.hide();
				setTitleGrid(flag);
        		switch(selectGridFlag) {
	        		case 'SA':	//Semester achievement
	        			getAchievement_SA();
	        			break;
	        		case 'SS':	//Semester subject
	        			getAchievement_SS();
	        			break;
	        		case 'SK':	//Semester skill
	        			getAchievement_SK();
	        			break;
	        		case 'MA':	//Monthly achievement
	        			getAchievement_MA();
	        			break;
	        		case 'MS':	//Monthly subject
	        			getAchievement_MS();
	        			break;
	        		case 'MK':	//Monthly skill
	        			getAchievement_MK();
	        			break;
        		}
        		setHeightGrid();
        		unMask();
        		me.center();
        	}catch(e) {
        		mainGrid.hide();
    			labelNoData.show();
    			pagingComponent.hide();
    			mainStore.removeAll();
				handleException(e);
        	}
		}
		
		function setHeightGrid() {
        	let flag = paramsToSearch.selectGridFlag;
        	let otherHeight = 73; //formInfo
        	otherHeight += 51; //formSearch
        	otherHeight += ['MA', 'MS', 'MK'].includes(flag) ? 55 : 0; //paging
        	otherHeight += ['SS', 'SK', 'MS', 'MK'].includes(flag) ? 40 : 0; //back
        	let heightGrid = Ext.getBody().getViewSize().height - otherHeight;
        	mainGrid.setHeight(heightGrid > 500 ? 500 : heightGrid);
        }
		
        let searchData, searchDataChart;
        let FORMAT3_COL1 = 0, FORMAT3_COL2 = 1, FORMAT3_COL3 = 2;
        let FORMAT4_COL1 = 0, FORMAT4_COL2 = 1, FORMAT4_COL3 = 2, FORMAT4_COL4 = 3;
        let SA_TOTAL_END_ROW = '99';
        function getAchievement_SA() {
        	searchDataChart = _.cloneDeep(searchData);
        	paramsToSearch.graphTitle = 'Semester';
        	pagingComponent.setHidden(true);
			let listYearSem = searchData.listYearSem,
				listMeasure = searchData.listMeasure,
				listValue = searchData.listValue,
				achievementSynthesisName = listMeasure[0].achievementSynthesisName,
				listData = [];
			
			if(listValue.length > 0) {
				listMeasure.push({groupMeaStdCode: 'fake'});
				let groupMeaStdCode = listMeasure[0].groupMeaStdCode,
					groupMeaStdName = listMeasure[0].groupMeaStdName
				Ext.each(listMeasure, function(item) {
					if(groupMeaStdCode == item.groupMeaStdCode) {
						listData.push(item);
					}else {
						listData.push({groupMeaStdCode: groupMeaStdCode, measureStandardName: groupMeaStdName, totalRow: 'total'});
						if(item.groupMeaStdCode != 'fake'){
							listData.push(item);
						}
						groupMeaStdCode = item.groupMeaStdCode;
						groupMeaStdName = item.groupMeaStdName;
					}
				});
				listMeasure = listMeasure.splice(listMeasure.length - 1, 1);
				listData.push({groupMeaStdCode: SA_TOTAL_END_ROW, measureStandardName: achievementSynthesisName, totalRow: 'total'});
			}
			
			let gridColumns = [];
			gridColumns.push(
				{text : 'Year / Semester / Level', flex: 1, minWidth: 400, sortable: false, menuDisabled: true, locked: true,
					columns: [
						{text: 'Achievement', dataIndex: 'measureStandardName', minWidth: 400, flex: 1, sortable: false, menuDisabled: true, align: 'center', tdCls: 'col-total',
							renderer: function (value, metaData, record, row, col, store, gridView) {
								if(record.data.totalRow != 'total') {
									if(record.data.measureStandardCode == 16) {
//										return `<span style="color: #2f6dca;">${value}</span>`;
										return '<a href="#" data-action="">' + value + '</a>';
									}
									return '<a href="#" data-action="SS">' + value + '</a>';
								}
								return value;
							}
						}
					]
				}
			);
			
			Ext.each(listYearSem, function(item) {
				gridColumns.push(
					{header: item.yearGbn + " / " + item.termName, align : 'center', flex : 1, minWidth : 360, sortable: false, menuDisabled: true,
						columns: [
							{header: item.levelName, flex: 1, minWidth: 360, sortable: false, menuDisabled: true,
								columns: [
									{text: '% Score', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_SA}, 
									{text: 'P/R', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_SA}, 
									{text: 'Evaluation', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_SA} 
								]
							}
						]
					}
				)
			});
			
			mainStore.removeAll();
			mainGrid.reconfigure(mainStore, gridColumns);
			if(listData.length > 0) {
				mainStore.loadData(listData);
			}
			btnBack.hide();
        }
        function renderder_SA(value, metaData, record, row, col, store, gridView) {
        	try {
        		let colIndex = col,
        			yearSemItem = searchData.listYearSem[Math.floor(colIndex/3)],
					listValue = searchData.listValue,
					measureStandardCode = record.data.measureStandardCode,
					groupMeaStdCode = record.data.groupMeaStdCode,
					value = '-';
				
				if(record.data.totalRow == 'total') {
					value = '';
					if (colIndex % 3 == 1) {
						let params = {
							clientCode		: yearSemItem.clientCode, 
							classCode		: yearSemItem.classCode, 
							groupMeaStdCode	: groupMeaStdCode
						}
						let totalItem = _.find(searchData.listTotal, params);
						value = setTotalRowCircleColor(totalItem);
					}
				}else {
					listValue.forEach(s => {
						if(s.measureStandardCode == measureStandardCode && s.clientClass == yearSemItem.clientClass) {
							value = getCellValue_format3(colIndex, s);
							return false;
						}
					})
				}
				return value;
        	}catch(e) {
        		console.log(e.stack)
        	}
		}
        
        function getAchievement_SS() {
        	searchDataChart = _.cloneDeep(searchData);
        	pagingComponent.setHidden(true);
			let listYearSem = searchData.listYearSem,
				listData = searchData.listData;
			
        	// create Grid Colums
        	let gridColumns = [];
			gridColumns.push(
				{text : 'Year / Month / Level', flex: 1, minWidth: 400, locked: true, sortable: false, menuDisabled: true,
					columns: [
						{text: 'Subject', dataIndex: 'subjectName', minWidth: 400, flex: 1, sortable: false, menuDisabled: true, align: 'center', tdCls: 'col-total',
							renderer: function (value, metaData, record, row, col, store, gridView) {
								if(record.data.totalRow != 'total') {
									if(paramsToSearch.measureStandardCode == 5) {
										return `<span style="color: #2f6dca;">${value}</span>`;
									}
									return '<a href="#" data-action="SK">' + value + '</a>';
								}
								return value;
							}
						}
					]
				}
			);
			Ext.each(listYearSem, function(item) {
				gridColumns.push(
					{header: item.yearGbn + " / " + item.termName, align : 'center', flex : 1, minWidth : 360, sortable: false, menuDisabled: true,
						columns: [
							{header: item.levelName, flex : 1, sortable: false, menuDisabled: true,
								columns: [
									{text: '% Score', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_SS}, 
									{text: 'P/R', flex: 1, minWidth: 120,align: 'center', sortable: false, menuDisabled: true, renderer: renderder_SS}, 
									{text: 'Evaluation', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_SS} 
								]
							}
						]
					}
				)
			});
			mainStore.removeAll();
			mainGrid.reconfigure(mainStore, gridColumns);
			if(listData.length > 0) {
				mainStore.loadData(listData);
			}
			btnBack.show();
        }
        function renderder_SS(value, metaData, record, row, col, store, gridView) {
        	try {
        		let colIndex = col,
	        		yearTerm = searchData.listYearSem[Math.floor(colIndex / 3)].classYearTermGbn,
	        		clientClass = searchData.listYearSem[Math.floor(colIndex/3)].clientClass,
	        		subject = record.data.subjectCode,
	        		listValue,
	        		value = '-';
	        	
	        	if(record.data.totalRow == 'total') {
					listValue = searchData.listTotal;
					Ext.each(listValue, function(item) {
						if(item.classYearTermGbn == yearTerm && item.clientClass == clientClass) {
							value = getCellValueTotal_format3(colIndex, item);
							return false;
						}
					});
				}else {
					listValue = searchData.listValue;
					Ext.each(listValue, function(item) {
						if(item.classYearTermGbn == yearTerm && item.subjectCode == subject && item.clientClass == clientClass) {
							value = getCellValue_format3(colIndex, item);
							return false;
						}
					});
				}
	        	return value;
        	}catch(e) {
        		console.log(e.stack)
        	}
		}
        
        function getAchievement_SK() {
        	searchDataChart = _.cloneDeep(searchData);
        	mainGrid.setHidden(false);
			pagingComponent.setHidden(true);
			let listYearSem = searchData.listYearSem,
				listData = searchData.listData;
			
			let gridColumns = [];
			gridColumns.push({
				text : 'Skill', flex: 1, minWidth: 400, sortable: false, menuDisabled: true, locked: true,
				columns: [
					{text: '', cls: 'th-row-name ', flex: 1, minWidth: 400, dataIndex: 'skillName', sortable: false, menuDisabled: true, tdCls: 'col-total',
						renderer: function(value, metaData, record, row, col, store, gridView) {
							if(record.data.totalRow == 'total') {
								return '<div style="text-align: center;">Total</div>'
							}
							return value;
						}
					}
	            ]
			});
			
			Ext.each(listYearSem, function(item) {
				gridColumns.push(
					{header: item.yearGbn + " / " + item.termName, align : 'center', flex : 4, minWidth : 480, sortable: false, menuDisabled: true,
						columns: [
							{header: item.levelName, flex : 4, minWidth: 480, sortable: false, menuDisabled: true,
								columns: [
									{text: 'Score / Out of',flex: 1, minWidth: 120,align: 'center', sortable: false, menuDisabled: true, renderer: renderder_SK}, 
									{text: '% Score',flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_SK}, 
									{text: 'P/R',flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_SK}, 
									{text: 'Evaluation', minWidth: 120,flex: 1, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_SK}, 
								]
							}
						]
					}
				)
			});
			mainStore.removeAll();
			mainGrid.reconfigure(mainStore, gridColumns);
			if(listData.length > 0) {
				mainStore.loadData(listData);
			}
        }
        function renderder_SK(value, metaData, record, row, col, store, gridView) {
        	try {
        		let colIndex = col,
					yearTerm = searchData.listYearSem[Math.floor(colIndex/4)].classYearTermGbn,
					clientClass = searchData.listYearSem[Math.floor(colIndex/4)].clientClass,
					listValue = searchData.listValue,
					skill = record.data.skillCode,
					value = '-';
				
				if(record.data.totalRow == 'total') {
					listValue = searchData.listTotal;
					Ext.each(listValue, function(item) {
						if(item.classYearTermGbn == yearTerm && item.clientClass == clientClass) {
							value = getCellValueTotal_format4(colIndex, item);
							return false;
						}
					});
				}else {
					listValue = searchData.listValue;
					Ext.each(listValue, function(item) {
						if(item.classYearTermGbn == yearTerm && item.clientClass == clientClass && item.skillCode == skill) {
							value = getCellValue_format4(colIndex, item);
							return false;
						}
					});
				}
				return value;
        	}catch(e) {
        		console.log(e.stack)
        	}
		}
        
        function getAchievement_MA() {
        	pagingComponent.setHidden(false);
			let listYearSem = searchData.listYearSem,
				listMeasure = searchData.listMeasure,
				achievementSynthesisName = listMeasure[0].achievementSynthesisName,
				listMonth = searchData.listMonth,
				listData = [];
			
			if(paramsToSearch.yearTermLevel == '') {
				paramsToSearch.yearTermLevel = listYearSem[0].yearTermLevel;
			}
			pagingComponent.loadData(listYearSem, paramsToSearch.yearTermLevel);
	    	
			searchDataChart = _.cloneDeep(searchData);
			
			listMeasure.push({groupMeaStdCode: 'fake'});
			let groupMeaStdCode = listMeasure[0].groupMeaStdCode,
				groupMeaStdName = listMeasure[0].groupMeaStdName
			Ext.each(listMeasure, function(item) {
				if(groupMeaStdCode == item.groupMeaStdCode) {
					listData.push(item);
				}else {
					listData.push({groupMeaStdCode: groupMeaStdCode, measureStandardName: groupMeaStdName, totalRow: 'total'});
					if(item.groupMeaStdCode != 'fake'){
						listData.push(item);
					}
					groupMeaStdCode = item.groupMeaStdCode;
					groupMeaStdName = item.groupMeaStdName;
				}
			});
			listMeasure = listMeasure.splice(listMeasure.length - 1, 1);
			listData.push({groupMeaStdCode: '99', measureStandardName: achievementSynthesisName, totalRow: 'total'});
			
			let gridColumns = [];
			gridColumns.push(
				{text: 'Year / Month', flex: 1, minWidth: 400, sortable: false, menuDisabled: true, locked: true,
					columns: [
						{text: 'Achievement', dataIndex: 'measureStandardName', flex: 1, minWidth: 400, sortable: false, menuDisabled: true, align: 'center', tdCls: 'col-total',
							renderer: function (value, metaData, record, row, col, store, gridView) {
								if(record.data.totalRow != 'total') {
									if(record.data.measureStandardCode == 16) {
										return `<span style="color: #2f6dca;">${value}</span>`;
									}
									return '<a href="#" data-action="MS">' + value + '</a>';
								}
								return value;
							}
						}
					]
				}
			);
			Ext.each(listMonth, function(item) {
				gridColumns.push(
					{header: stringToYearMonth(item.examYearMonthGbn), align: 'center', flex: 1, minWidth: 360, sortable: false, menuDisabled: true,
						columns: [
							{text: '% Score', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_MA}, 
							{text: 'P/R', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_MA}, 
							{text: 'Evaluation', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_MA}
						]
					}
				)
			});
			mainStore.removeAll();
			mainGrid.reconfigure(mainStore, gridColumns);
			if(listData.length > 0) {
				mainStore.loadData(listData);
			}
			btnBack.hide();
        }
        function renderder_MA(value, metaData, record, row, col, store, gridView) {
        	try {
        		let colIndex = col,
        			yearMonthItem = searchData.listMonth[Math.floor(colIndex/3)],
					yearMonth = yearMonthItem.examYearMonthGbn,
					listValue = searchData.listValue,
					measureStandardCode = record.data.measureStandardCode,
					groupMeaStdCode = record.data.groupMeaStdCode,
					value = '-';
				
				if(record.data.totalRow == 'total') {
					value = '';
					if (colIndex % 3 == 1) {
						let params = {
							examYearMonthGbn	: yearMonth, 
							groupMeaStdCode		: groupMeaStdCode
						}
						let totalItem = _.find(searchData.listTotal, params);
						value = setTotalRowCircleColor(totalItem);
					}
				}else {
					Ext.each(listValue, function(item) {
						if(item.examYearMonthGbn == yearMonth && item.measureStandardCode == measureStandardCode) {
							value = getCellValue_format3(colIndex, item);
							return false;
						}
					});
				}
				return value;
        	}catch(e) {
        		console.log(e.stack)
        	}
		}
        
        function getAchievement_MS() {
        	pagingComponent.setHidden(false);
			let listYearSem = searchData.listYearSem,
				listMonth = searchData.listMonth,
				listData = searchData.listData;
			
			if(paramsToSearch.yearTermLevel == '') {
				paramsToSearch.yearTermLevel = listYearSem[0].yearTermLevel;
			}
			pagingComponent.loadData(listYearSem, paramsToSearch.yearTermLevel);
	    	
    		searchDataChart = _.cloneDeep(searchData);
        	
        	// create Grid Colums
        	let gridColumns = [];
        	gridColumns.push(
				{header: 'Year / Month', flex: 1, minWidth: 400, sortable: false, menuDisabled: true, locked: true,
					columns: [
						{text: 'Subject', cls: 'th-col-thead', dataIndex: 'subjectName', flex: 1, minWidth: 400, sortable: false, menuDisabled: true, align: 'center', tdCls: 'col-total',
							renderer: function (value, metaData, record, row, col, store, gridView) {
								if(record.data.totalRow != 'total') {
									if(paramsToSearch.measureStandardCode == 5) {
										return `<span style="color: #2f6dca;">${value}</span>`;
									}
									return '<a href="#" data-action="MK">' + value + '</a>';
								}
								return value;
							}
						}
					]
				}
			);
			
			Ext.each(listMonth, function(item) {
				gridColumns.push(
					{header: stringToYearMonth(item.examYearMonthGbn), align: 'center', flex: 1, minWidth: 360, sortable: false, menuDisabled: true,
						columns: [
							{text: '% Score', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_MS}, 
							{text: 'P/R', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_MS}, 
							{text: 'Evaluation', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_MS}, 
						]
					}
				)
			});
			mainStore.removeAll();
			mainGrid.reconfigure(mainStore, gridColumns);
			if(listData.length > 0) {
				mainStore.loadData(listData);
			}
			btnBack.show();
        }
        function renderder_MS(value, metaData, record, row, col, store, gridView) {
        	try {
        		let colIndex = col,
					yearMonth = searchData.listMonth[Math.floor(colIndex / 3)].examYearMonthGbn,
					subjectCode = record.data.subjectCode,
					listValue = [],
					value = '-';
				
				if(record.data.totalRow == 'total') {
					listValue = searchData.listTotal;
					Ext.each(listValue, function(item) {
						if(item.examYearMonthGbn == yearMonth) {
							value = getCellValueTotal_format3(colIndex, item);
							return false;
						}
					});
				}else {
					listValue = searchData.listValue;
					Ext.each(listValue, function(item) {
						if(item.examYearMonthGbn == yearMonth && item.subjectCode == subjectCode) {
							value = getCellValue_format3(colIndex, item);
							return false;
						}
					});
				}
				return value;
        	}catch(e) {
        		console.log(e.stack)
        	}
		}
        
        function getAchievement_MK() {
        	pagingComponent.setHidden(false);
			let listYearSem = searchData.listYearSem,
				listMonth = searchData.listMonth,
				listValue = searchData.listValue,
				listData = searchData.listData;
			
			if(paramsToSearch.yearTermLevel == '') {
				paramsToSearch.yearTermLevel = listYearSem[0].yearTermLevel;
			}
			pagingComponent.loadData(listYearSem, paramsToSearch.yearTermLevel);
        	
        	searchDataChart = _.cloneDeep(searchData);
	    	
        	let gridColumns = [];
        	gridColumns.push(
				{text: 'Skill', flex: 1, minWidth: 400, sortable: false, menuDisabled: true, locked: true,
	        		columns: [
	        			{text: '', flex: 1, minWidth: 400, dataIndex: 'skillName', sortable: false, menuDisabled: true, tdCls: 'col-total',
	        				renderer: function(value, metaData, record, row, col, store, gridView) {
	        					if(record.data.totalRow == 'total') {
	        						return '<div style="text-align: center;">Total</div>'
	        					}
	        					return value;
	        				}
	        			}
	        		], 
				}
			);
        	if(listValue.length > 0) {
        		Ext.each(listMonth, function(item) {
        			gridColumns.push(
    					{header: stringToYearMonth(item.examYearMonthGbn), align : 'center', flex: 4, minWidth : 480, sortable: false, menuDisabled: true,
							columns: [
								{text: 'Score / Out of', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_MK}, 
								{text: '% Score', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_MK}, 
								{text: 'P/R', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_MK}, 
								{text: 'Evaluation', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_MK}, 
							]
    					}
        			)
        		});
        	}
        	mainStore.removeAll();
			mainGrid.reconfigure(mainStore, gridColumns);
			if(listData.length > 0) {
				mainStore.loadData(listData);
			}
        }
        function renderder_MK(value, metaData, record, row, col, store, gridView) {
        	try {
        		let colIndex = col,
					yearMonth = searchData.listMonth[Math.floor(colIndex/4)].examYearMonthGbn,
					listValue = searchData.listValue,
					skill = record.data.skillCode,
					value = '-';
				if(record.data.totalRow == 'total') {
					listValue = searchData.listTotal;
					Ext.each(listValue, function(item) {
						if(item.examYearMonthGbn == yearMonth) {
							value = getCellValueTotal_format4(colIndex, item);
							return false;
						}
					});
				}else {
					listValue = searchData.listValue;
					Ext.each(listValue, function(item) {
						if(item.examYearMonthGbn == yearMonth && item.skillCode == skill) {
							value = getCellValue_format4(colIndex, item);
							return false;
						}
					});
				}
				return value;
        	}catch(e) {
        		console.log(e.stack)
        	}
		}
        function cloneParam(params) {
        	return {
        		memberCode			: params.memberCode,
        		fromYearTerm		: params.fromYearTerm,
        		toYearTerm			: params.toYearTerm,
        		measureStandardCode	: params.measureStandardCode == undefined ? 0 : params.measureStandardCode,
        		selectGridFlag		: params.selectGridFlag,
        		subjectCode			: params.subjectCode,
        		yearTermLevel		: params.yearTermLevel,
        		subjectName			: params.subjectName,
        		measureStandardName	: params.measureStandardName,
        	}
        }
        
        let backData = [];
        function backFunction() {
        	paramsToSearch = cloneParam(backData[backData.length - 1]);
        	paramsToSearch.fromYearTerm = getFormField(formSearch, 'yearFrom').getValue() + getFormField(formSearch, 'semesterFrom').getValue();
        	paramsToSearch.toYearTerm = getFormField(formSearch, 'yearTo').getValue() + getFormField(formSearch, 'semesterTo').getValue();
        	let monthlyCheck = getFormField(formSearch, 'monthly').getValue();
        	let selectGridFlag = paramsToSearch.selectGridFlag;
        	paramsToSearch.selectGridFlag = (monthlyCheck == false ? 'S' : 'M') + selectGridFlag.substr(selectGridFlag.length - 1);
        	getAchievementList(paramsToSearch.selectGridFlag);
        	backData.pop();
        }
        
        function getCellValueTotal_format3(colIndex, item) {
        	let value;
        	if (colIndex % 3 == FORMAT3_COL1) {
				value = item.percentPoint;
			} else if (colIndex % 3 == FORMAT3_COL2) {
				value = item.rankPoint;
			} else if (colIndex % 3 == FORMAT3_COL3) {
				value = item.evaluationDegree;
			}
        	return `<span class="evaluation-${item.evaluationDegree}">${value}</span>`;
        }
        function getCellValue_format3(colIndex, item) {
        	let value;
        	if (colIndex % 3 == FORMAT3_COL1) {
				value = item.percentPoint;
			} else if (colIndex % 3 == FORMAT3_COL2) {
				value = item.rankPoint;
			} else if (colIndex % 3 == FORMAT3_COL3) {
				if(item.evaluationDegree != '') {
					value = setTotalRowColor(item.evaluationDegree);
				}
			}
        	return value;
        }
        function getCellValueTotal_format4(colIndex, item) {
			let value;
			if (colIndex % 4 == FORMAT4_COL1) {
				value = item.correctNumber + '/' + item.totalNumber;
			} else if (colIndex % 4 == FORMAT4_COL2) {
				value = item.percentPoint;
			} else if (colIndex % 4 == FORMAT4_COL3) {
				value = item.rankPoint;
			} else if (colIndex % 4 == FORMAT4_COL4) {
				if(item.evaluationDegree != '') {
					value = item.evaluationDegree;
				}
			}
        	return `<span class="evaluation-${item.evaluationDegree}">${value}</span>`;
        }
        function getCellValue_format4(colIndex, item) {
        	let value;
        	if (colIndex % 4 == FORMAT4_COL1) {
				value = item.correctNumber + '/' + item.totalNumber;
			} else if (colIndex % 4 == FORMAT4_COL2) {
				value = item.percentPoint;
			} else if (colIndex % 4 == FORMAT4_COL3) {
				value = item.rankPoint;
			} else if (colIndex % 4 == FORMAT4_COL4) {
				if(item.evaluationDegree != '') {
					value = setTotalRowColor(item.evaluationDegree);
				}
			}
        	return value;
        }
        function setTotalRowColor(eval) {
        	let returnVal = '';
        	switch(eval.toUpperCase()) {
        	    case 'A':
        	    	returnVal = '<span class="char-1 text-uppercase">' + eval +'</span>';
        	        break;
        	    case 'P':
        	    	returnVal = '<span class="char-2 text-uppercase">' + eval +'</span>';
        	    	break;
        	    case 'R':
        	    	returnVal = '<span class="char-3 text-uppercase">' + eval +'</span>';
        	        break;
        	}
        	return returnVal;
		}
        function setTotalRowCircleColor(info) {
        	let returnVal = '';
        	switch(info.evaluationDegree.toUpperCase()) {
        	    case 'A':
        	    	returnVal = `<span class="char-cic-1 text-uppercase">${info.evaluationDegree}</span>`;
        	        break;
				case 'P':
					returnVal = `<span class="char-cic-2 text-uppercase">${info.evaluationDegree}</span>`;
        	    	break;
				case 'R':
					returnVal = `<span class="char-cic-3 text-uppercase">${info.evaluationDegree}</span>`;
        	        break;
        	}
        	return returnVal;
		}
		function setTitleGrid(flag) {
			gridTitle.setHidden(['SA','MA'].includes(flag) ? true : false);
			if(!['SA','MA'].includes(flag)) {
				let text = paramsToSearch.measureStandardName;
				if(['SK','MK'].includes(flag)) {
					text += ' > ' + paramsToSearch.subjectName;
				}
				gridTitle.setText(text);
			}
		}
		
		
//		END
	}
});

