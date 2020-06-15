Ext.define('ext.view.serviceSetting.categoryManagement.popup.ViewPlcAchievementPopup', {
	extend: 'component.MeWindow',
	title: 'Counsel File',
	width: 1200,
	defaultWidth: 1200,
	layout: 'vbox',
	bodyPadding: 5,
	reloadPopup: function(){},
	initComponent : function() {
		
		let me = this;
		
		let fileInfo;
		me.reloadPopup = function(info, data) {
			fileInfo = info;
			switch(fileInfo.measureStandard) {
				case 'UT' :
					fileInfo.measureStandardCode = 7;
					break;
				case 'LT' :
					fileInfo.measureStandardCode = 8;
	        		break;
	        	case 'EP' :
	        		fileInfo.measureStandardCode = 4;
	        		break;
	        	default:
	        		fileInfo.measureStandardCode = 0;
	        		break;
			}
			formSearch.reset();
			studentStore.loadData(data);
			getFormField(formSearch, 'studentName').setValue(studentStore.first());
			getFormField(formSearch, 'classification').setValue(fileInfo.title);
			getFormField(formSearch, 'start').setValue(Date.today().add(-30).days());
			getFormField(formSearch, 'end').setValue(new Date());
//			mainGrid.hide();
//			labelNoData.show();
			getDataMonthlySubject();
			me.show();
		}
		
		let studentStore = Ext.widget('mestore');
		
		let btnSearch = Ext.widget('mebutton', {
	    	text: 'Search', 
	    	padding: '8 10', 
	    	margin: '0 0 0 10',
	    	iconCls: 'fa fa-search btn-icon', 
	    	style: 'float: right;',
	    	handler: function() {
	    		getDataMonthlySubject();
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
						{xtype: 'mecombo', width: 300, labelWidth: 90, name: 'studentName', fieldLabel: 'Student Name',
				        	store: studentStore, valueField: 'memberCode', displayField: 'memberName', queryMode: 'local', editable: false,
				        },
				        {xtype: 'medisplayfield', width: 300, labelWidth: 90, name: 'classification', fieldLabel: 'Classification', margin: '0 0 0 10', labelSeparator: ':'}
					]
				},
		        {xtype: 'radiogroup', width: 600, vertical: true, name: 'radio', labelWidth: 90, fieldLabel: 'Search Period', labelSeparator: '',
    	            items: [
    	            	{boxLabel: 'Recent 30 days', name: 'radio', inputValue: 1, checked: true},
    	            	{boxLabel: 'Recent 3 months', name: 'radio', inputValue: 2},
    	            	{boxLabel: 'Current Year', name: 'radio', inputValue: 3},
    	            ],
    	            listeners: {
        	        	change: function(combo, value) {
        	        		setSearchPeriod(value.radio);
        	        	}
        	        }
    	        },
    	        {xtype: 'container', width: '100%', layout: 'hbox',
					items: [
				        {xtype: 'medate', flex: .5, name: 'start', margin: '0 0 0 95', editable: false,
				        	listeners: {
				        		change: function(combo, value) {
				        			if(this.value != null) {
				        				getFormField(formSearch, 'end').setMinValue(this.value);
				        			}
				        		}
				        	}
				        },
				        {xtype: 'melabel', text: '~', margin: '7 10 0 10'},
				        {xtype: 'medate', flex: .5, name: 'end', editable: false},
				        btnSearch
					]
				},
			]
		});
		
		let plcChartPopup = Ext.create('ext.view.serviceSetting.categoryManagement.popup.PlcChartPopup');
		let mainStore = Ext.widget('mestore');
		let mainGrid = Ext.create('ext.view.serviceSetting.categoryManagement.popup.AchievementGrid', {
			margin: '5 0 0 0',
			tbar: [
				{xtype: 'tbfill'},
				{xtype: 'button', text: 'Graph', iconCls: 'fas fa-chart-bar btn-icon',
                	handler: function() {
                		fileInfo.selectGridFlag = 'MS';
                		plcChartPopup.reloadPopup(fileInfo, _.cloneDeep(searchDataChart));
                	}
                }
			],
			listeners: { 
				cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
					console.log(record.data)
		        }
		 	}
		});
		
		let labelNoData = Ext.widget('label', {
			width: '100%',
			style: 'text-align: center;',
        	text: 'No data ...'
		})
		
		this.items = [
			formSearch, 
			mainGrid, 
			labelNoData
        ];
		this.callParent(arguments);
		
		function setSearchPeriod(value) {
			switch(value) {
				case 1 :
					getFormField(formSearch, 'start').setValue(Date.today().add(-30).days());
					getFormField(formSearch, 'end').setValue(new Date());
					break;
				case 2 :
					getFormField(formSearch, 'start').setValue(Date.today().moveToMonth(new Date().getMonth() - 3, -1));
					getFormField(formSearch, 'end').setValue(new Date());
					break;
				case 3 :
	    			getFormField(formSearch, 'start').setValue(new Date().getFullYear() + '/01/01');
	    			getFormField(formSearch, 'end').setValue(new Date().getFullYear() + '/12/31');
					break;
			}
		}
		
		let searchData, searchDataChart;
		async function getDataMonthlySubject() {
			try {
				if(!formSearch.isValid() || fileInfo.measureStandardCode == 0) {
					throw new Error();
				}
				let params = {
					memberCode			: getFormField(formSearch, 'studentName').getValue(),
					measureStandardCode	: fileInfo.measureStandardCode,
//					fromYearMonth		: Common.getRawDate(getFormField(formSearch, 'start').getValue()),
//					toYearMonth			: Common.getRawDate(getFormField(formSearch, 'start').getValue()),
					fromYearMonth		: '201910',
					toYearMonth			: '202010',
				}
				console.log(params)
        		let json = await getDataAjax('/serviceSettingController/getDataMonthlySubject.json', params);
        		searchData = json.data;
        		searchDataChart = _.cloneDeep(searchData);
        		console.log(searchData)
        		if(searchData.listValue.length == 0) {
        			throw new Error();
        		}
        		mainGrid.show();
    			labelNoData.hide();
    			getAchievement_MS();
    			me.center();
				unMask();
        	}catch(e) {
        		handleException(e);
        		mainGrid.hide();
    			labelNoData.show();
        	}
		}
		function getAchievement_MS() {
			let listYearSem = searchData.listYearSem,
				listMonth = searchData.listMonth,
				listData = searchData.listData;
        	
        	// create Grid Colums
        	let gridColumns = [];
        	gridColumns.push(
				{header: 'Year / Month', locked: true, sortable: false, menuDisabled: true,
					columns: [
						{text: 'Subject', dataIndex: 'subjectName', width: 200, align: 'center', sortable: false, menuDisabled: true, tdCls: 'col-total'}
					]
				}
			);
			
        	listMonth.forEach(s => {
        		gridColumns.push(
					{header: stringToYearMonth(s.examYearMonthGbn), align: 'center', flex: 1, minWidth: 360, sortable: false, menuDisabled: true,
						columns: [
							{text: '% Score', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_MS}, 
							{text: 'P/R', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_MS}, 
							{text: 'Evaluation', flex: 1, minWidth: 120, align: 'center', sortable: false, menuDisabled: true, renderer: renderder_MS}, 
						]
					}
				)
        	})
			mainStore.removeAll();
			mainGrid.reconfigure(mainStore, gridColumns);
			if(listData.length > 0) {
				mainStore.loadData(listData);
			}
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
					listValue.forEach(s => {
						if(s.examYearMonthGbn == yearMonth) {
							value = getCellValueTotal_format3(colIndex, s);
							return false;
						}
					})
				}else {
					listValue = searchData.listValue;
					listValue.forEach(s => {
						if(s.examYearMonthGbn == yearMonth && s.subjectCode == subjectCode) {
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
		let FORMAT3_COL1 = 0, FORMAT3_COL2 = 1, FORMAT3_COL3 = 2;
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
        	if (colIndex % 3 == FORMAT3_COL1) {
				return item.percentPoint;
        	}
			if (colIndex % 3 == FORMAT3_COL2) {
				return item.rankPoint;
			}
			if (colIndex % 3 == FORMAT3_COL3) {
				if(item.evaluationDegree != '') {
					return setTotalRowColor(item.evaluationDegree);
				}
				return '';
			}
        }
        function setTotalRowColor(eval) {
        	let returnVal = '';
        	switch(eval.toUpperCase()) {
        	    case 'A':
        	    	returnVal = `<span class="char-1">${eval}</span>`;
        	        break;
        	    case 'P':
        	    	returnVal = `<span class="char-2">${eval}</span>`;
        	    	break;
        	    case 'R':
        	    	returnVal = `<span class="char-3">${eval}</span>`;
        	        break;
        	}
        	return returnVal;
		}
		
//		END
	}
});

