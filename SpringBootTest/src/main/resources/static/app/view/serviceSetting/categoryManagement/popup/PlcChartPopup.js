Ext.define('ext.view.serviceSetting.categoryManagement.popup.PlcChartPopup', {
	extend: 'component.MeWindow',
	title: 'Counsel File',
	width: 1200,
	defaultWidth: 1200,
	autoScroll: true,
	layout: 'vbox',
	bodyPadding: 5,
	initComponent : function() {
		
		let me = this;
		
		me.reloadPopup = function(info, data) {
			searchData = data;
			selectGridFlag = info.selectGridFlag;
			me.show();
			getAchievementList(selectGridFlag);
			
			let title = '';
			switch(selectGridFlag) {
				case 'SA':
				case 'MA':
					title = 'Achievement > ' + (selectGridFlag == 'SA' ? 'Semester' : 'Monthly');
					break;
        		case 'SS':
        		case 'MS':
        			if(info.systemCode == 'LC') {
        				title = info.title;
        			}else {
        				title = 'Achievement > ' + (selectGridFlag == 'SS' ? 'Semester > ' : 'Monthly > ') + info.measureStandardName;
        			}
        			break;
        		case 'SK':
        		case 'MK':
        			title = 'Achievement > ' + (selectGridFlag == 'SK' ? 'Semester > ' : 'Monthly > ') 
        				+ info.measureStandardName + ' > ' + info.subjectName;
        			break;
	    	}
			me.setTitle(title);
		}
		
		let selectGridFlag;
      	
      	let mainStore = Ext.create('Ext.data.JsonStore', {
            fields: ['yearSem'],
            data: []
        });
		var mainChart = Ext.create('Ext.chart.CartesianChart', {
			width: '100%',
            height: 500,
			animate: false,
			shadow: true,
			style: 'background: #fff;',
			cls: "wrap-graph",
			store: mainStore,
			insetPadding: '20 0 20 10',
	        innerPadding: {
	            left: 0,
	            right: 40,
	            top: 45,
	            bottom: 0
	        },
	    	onAxisLabelRender: function (axis, label, layoutContext) {
	            return layoutContext.renderer(label) + '%';
	        },
	        onSeriesTooltipRender: function (tooltip, record, item) {
	            tooltip.setHtml(record.get(item.field) + '%');
	        },
	        interactions: [
	        	{type: 'panzoom', zoomOnPan: false}
        	],
			legend: {
				docked: 'right', boxStrokeWidth: 0, labelFont: '12px Helvetica', style: {left: 840}, autoScroll: true,
			},
			axes: [
		       {type: 'numeric', position: 'left', grid: true, title: false, minimum: 0, maximum: 100, roundToDecimal: false, renderer: 'onAxisLabelRender'},
               {type: 'category', position: 'bottom', title : false, grid: false, group: true, fields: 'yearSem', visibleRange: [0, 0.25]}
    		],
    		series: [],    
		});

		let listChartPie = Ext.create('Ext.container.Container', {
      		cls: 'wrap-pie-group',
      		items: []
      	});
		
		let labelNoData = Ext.widget('label', {
        	text: 'No data ...'
        })
        let containerChart = Ext.widget('panel', {
        	width: '100%', 
        	layout: 'fit',
        	border: false,
        	cls: 'chart-achievement',
        	tbar: [
//				{text: 'Preview',
//	                handler: function() {
//	                	this.up('panel').down('cartesian').preview();
//	                }
//	            },
	            {text: 'Reset pan/zoom',
	                handler: function() {
	                	let panel = this.up('panel'),
	                		chart = panel.down('cartesian'),
		                    axes = chart.getAxes();
	
		                axes[0].setVisibleRange([0, 1]);
		                axes[1].setVisibleRange([0, 1]);
		                chart.redraw();
	                }
	            }
			],
        	items: [mainChart],
      	});
      	
		this.items = [
			containerChart,
  	        listChartPie,
  	        {xtype: 'container', width: '100%', layout: {type: 'hbox', pack: 'center'}, items: [labelNoData]},
		];
		this.callParent(arguments);
		
        function createChartTotal(dataTotal) {
			let pieGroup = [];
			dataTotal.forEach(s => {
				let percentPoint = s.percentPoint;
	      		if(percentPoint > 100) {
	      			percentPoint = 100;
	      		}
	      		let info = {
					min		: percentPoint, 
					max		: 100, 
					yearSem	: s.yearSem,
					title	: changeChar(s.evaluationDegree), 
					color	: changeColor(s.evaluationDegree)
				};
		      	let pie = myPie(info);
		      	pieGroup.push(pie);
			});
	      	let listPie = Ext.create('Ext.container.Container', {
	      		cls: 'wrap-pie-group',
	      		items: pieGroup
	      	});
      		return listPie;
      	}
    	function getRandomColor() {
    		let letters = '0123456789ABCDEF';
    		let color = '#';
    		for (let i = 0; i < 6; i++) {
    			color += letters[Math.floor(Math.random() * 16)];
    		}
    		return color;
        }
        function myPie(options) {
			let minPie = options.min;
	      	let maxPie = options.max;
	      	let pieChart = Ext.create('Ext.chart.PolarChart', {
	            width: 150,
	            height: 150,
	            border: false,
	            cls: "graph-pie",
	            store: {
	               fields: ['name', 'g1'],
	               data: [
	                  {"name": "0", "g1": minPie},
	                  {"name": "1", "g1": (maxPie - minPie)}
	               ]
	            },
	            colors: [options.color, '#edf1f1'],
	            series: [{type: 'pie', border: false, xField: 'g1', donut: 94}]
	         });
	      	let pieText = Ext.create('Ext.Component', {
	      		html: '<span><strong>' + minPie + '%</strong>' + options.title +'</span>', cls: 'pie-text'
	      	});
	      	let containerPie = Ext.create('Ext.container.Container', {
	          	cls: 'wrap-pie',
	          	width: 150,
	          	items: [
					{xtype: 'container', height: 150, width: 150, 
						items: [pieText, pieChart]
					}, 
					{xtype: 'container', width: "100%", style: 'text-align: center; line-height: 16px;', html: options.yearSem}
				]
	      	});
	      	return containerPie;
		}
    	function changeChar(char){
    		let charText = '';
    	    switch(char.toUpperCase()) {
    	      	case "A":
    	      		charText = "Advanced";
    	      		break;
    	      	case "P":
    	      		charText = "Proficient";
    	      		break;
    	      	case "R":
    	      		charText = "At-Risk";
    	      		break;
    	      	default:
    	      		charText = "";
    	    }
    	    return charText;
    	}
    	function changeColor(char){
    		let charColor = '';
    	    switch(char.toUpperCase()) {
    	      	case "A":
    	      		charColor = "#5fcebe";
    	      		break;
    	      	case "P":
    	      		charColor = "#ffb100";
    	      		break;
    	      	case "R":
    	      		charColor = "#f85964";
    	      		break;
    	      	default:
    	      		charColor = "#FFFFFF";
    	    }
    	    return charColor;
    	}
    	
    	let colorList = [
//          red			green			orange			blue			yellow			turquoise		violet			black			pink
			'#ff0000',	'#87ff00',		'#ff6600',		'#005aff',		'#e5a202',		'#00e4ff',		'#4a00ff',		'#232323',		'#ff00de',
			'#f74545',	'#98ff23',		'#f4751f',		'#1e6eff',		'#ffb400',		'#38eaff',		'#5b19fc',		'#4f4f4f',		'#ff23e3',
			'#fc7171',	'#a9ff47',		'#f98f48',		'#5491ff',		'#ffc22d',		'#60efff',		'#966bff',		'#6b6b6b',		'#ff49e8',
			'#f99090',	'#bdff72',		'#f9a166',		'#72a5ff',		'#ffd366',		'#8df1fc',		'#b191ff',		'#878787',		'#ff68ec',
			'#fcb8b8',	'#d0ff9b',		'#f9bc93',		'#9ec1ff',		'#ffe6a8',		'#c1f9ff',		'#cebaff',		'#a8a8a8',		'#ff93f2',
        ];
    	
    	let searchData;
    	function getAchievementList(flag) {
			try {
        		mainChart.show();
        		listChartPie.show();
        		labelNoData.hide();
        		listChartPie.removeAll();
    			switch(selectGridFlag) {
    				case 'SA':
    					getAchievementChart_SA();
	        			break;
	        		case 'SS':
	        			getAchievementChart_SS();
	        			break;
	        		case 'SK':
	        			getAchievementChart_SK();
	        			break;
	        		case 'MA':
	        			getAchievementChart_MA();
	        			break;
	        		case 'MS':
	        			getAchievementChart_MS();
	        			break;
	        		case 'MK':
	        			getAchievementChart_MK();
	        			break;
    	    	}
    			me.center();
        	}catch(e) {
        		mainChart.hide();
        		listChartPie.hide();
        		labelNoData.show();
        		mainStore.removeAll();
        		handleException(e);
        	}
        }
        
    	function getAchievementChart_SA() {
        	let listYearSem = searchData.listYearSem,
				listValue = searchData.listValue,
				listMeasure = searchData.listMeasure;
        	
    		listMeasure.forEach((s, index) => {
    			s.color = colorList[index % colorList.length];
    		})
    		
    		let listDataChart = [];
    		Ext.each(listYearSem, function(yearSem) {
    			let classYearTermGbn = yearSem.classYearTermGbn;
    			let clientClass = yearSem.clientClass;
    			let object = {yearSem: yearSem.yearGbn + ' ' + yearSem.termName + '\n' + yearSem.levelName};
    			Ext.each(listMeasure, function(distinct) {
    				let measureStandardCode = distinct.measureStandardCode;
    				Ext.each(listValue, function(item) {
    					if(classYearTermGbn == item.classYearTermGbn && measureStandardCode == item.measureStandardCode && clientClass == item.clientClass) {
    						object[measureStandardCode] = item.percentPoint;
    						return false;
    					}
    				});
    			});
    			listDataChart.push(object);
    		});
    		
			let series = getSeriesAllMeasure(listMeasure);
			
			rebuildChart(listMeasure.length, series, listDataChart);
    		
			let listTotal = _.filter(searchData.listTotal, {groupMeaStdCode: '99'});
			listTotal.forEach(s => {
				let yearSem = _.find(listYearSem, {clientCode: s.clientCode, classCode: s.classCode});
				if(yearSem != undefined) {
					s.yearSem = `${yearSem.yearGbn} ${yearSem.termName}<br>${yearSem.levelName}`;
				}
			});
			listChartPie.add(createChartTotal(listTotal));
        }
    	
        function getAchievementChart_SS() {
        	let listYearSem = searchData.listYearSem,
				listValue = searchData.listValue,
				listDataDistinct = searchData.listData,
				listTotal = searchData.listTotal;
        	
        	listDataDistinct.pop();
        	listDataDistinct.forEach((s, index) => {
        		s.color = colorList[index % colorList.length];
        	})
    		
        	let listDataChart = [];
    		Ext.each(listYearSem, function(yearSem) {
    			let classYearTermGbn = yearSem.classYearTermGbn;
    			let levelCode = yearSem.levelCode;
    			let object = {yearSem: yearSem.yearGbn + ' ' + yearSem.termName + '\n' + yearSem.levelName};
    			Ext.each(listDataDistinct, function(distinct) {
    				let subjectCode = distinct.subjectCode;
    				Ext.each(listValue, function(item) {
    					if(classYearTermGbn == item.classYearTermGbn && subjectCode == item.subjectCode && levelCode == item.levelCode) {
    						object[subjectCode] = item.percentPoint;
    						return false;
    					}
    				});
    			});
    			listDataChart.push(object);
    		});
    		
        	let series = getSeriesSubject(listDataDistinct);
        	rebuildChart(listDataDistinct.length, series, listDataChart);
        	
			listTotal.forEach(s => {
				let yearSem = _.find(listYearSem, {clientClass: s.clientCode, classCode: s.classCode});
				if(yearSem != undefined) {
					s.yearSem = `${yearSem.yearGbn} ${yearSem.termName}<br>${yearSem.levelName}`;
				}
			});
			listChartPie.add(createChartTotal(listTotal));
        }
        
        function getAchievementChart_SK() {
        	let listYearSem = searchData.listYearSem,
				listValue = searchData.listValue,
				listDataDistinct = searchData.listData,
				listTotal = searchData.listTotal;
        	
        	listDataDistinct.pop();
        	listDataDistinct.forEach((s, index) => {
        		s.color = colorList[index % colorList.length];
        	})
    		
        	let listDataChart = [];
    		Ext.each(listYearSem, function(yearSem) {
    			let classYearTermGbn = yearSem.classYearTermGbn;
    			let levelCode = yearSem.levelCode;
    			let object = {yearSem: yearSem.yearGbn + ' ' + yearSem.termName + '\n' + yearSem.levelName};
    			Ext.each(listDataDistinct, function(distinct) {
    				let skillCode = distinct.skillCode;
    				Ext.each(listValue, function(item) {
    					if(classYearTermGbn == item.classYearTermGbn && skillCode == item.skillCode && levelCode == item.levelCode) {
    						object[skillCode] = item.percentPoint;
    						return false;
    					}
    				});
    			});
    			listDataChart.push(object);
    		});
    		
        	let series = getSeriesSkill(listDataDistinct);
        	rebuildChart(listDataDistinct.length, series, listDataChart);
    		
			listTotal.forEach(s => {
				let yearSem = _.find(listYearSem, {clientCode: s.clientCode, classCode: s.classCode});
				if(yearSem != undefined) {
					s.yearSem = `${yearSem.yearGbn} ${yearSem.termName}<br>${yearSem.levelName}`;
				}
			});
			listChartPie.add(createChartTotal(listTotal));
        }
        
        function getAchievementChart_MA() {
        	let listYearSem = searchData.listYearSem,
				listValue = searchData.listValue,
				listMeasure = searchData.listMeasure,
				listMonth = searchData.listMonth;
    		
    		listMeasure.forEach((s, index) => {
    			s.color = colorList[index % colorList.length];
    		})
    		
    		let listDataChart = [];
    		Ext.each(listMonth, function(yearSem) {
    			let examYearMonthGbn = yearSem.examYearMonthGbn;
    			let object = {yearSem: stringToYearMonth(yearSem.examYearMonthGbn)};
    			Ext.each(listMeasure, function(distinct) {
    				let measureStandardCode = distinct.measureStandardCode;
    				Ext.each(listValue, function(item) {
    					if(examYearMonthGbn == item.examYearMonthGbn && measureStandardCode == item.measureStandardCode) {
    						object[measureStandardCode] = item.percentPoint;
    						return false;
    					}
    				});
    			});
    			listDataChart.push(object);
    		});
    		
    		let series = getSeriesAllMeasure(listMeasure);
    		rebuildChart(listMeasure.length, series, listDataChart);
    		
			let listTotal = _.filter(searchData.listTotal, {groupMeaStdCode: '99'});
			listTotal.forEach(s => {
				s.yearSem = stringToYearMonth(s.examYearMonthGbn);
			});
			listChartPie.add(createChartTotal(listTotal));
        }
        
        function getAchievementChart_MS() {
        	let listYearSem = searchData.listYearSem,
				listValue = searchData.listValue,
				listDataDistinct = searchData.listData,
				listTotal = searchData.listTotal,
				listMonth = searchData.listMonth;
        	
        	listDataDistinct.pop();
    		listDataDistinct.forEach((s, index) => {
    			s.color = colorList[index % colorList.length];
    		})
    		
    		let listDataChart = [];
    		Ext.each(listMonth, function(yearSem) {
    			let examYearMonthGbn = yearSem.examYearMonthGbn;
    			let object = {yearSem: stringToYearMonth(yearSem.examYearMonthGbn)};
    			Ext.each(listDataDistinct, function(distinct) {
    				let subjectCode = distinct.subjectCode;
    				Ext.each(listValue, function(item) {
    					if(examYearMonthGbn == item.examYearMonthGbn && subjectCode == item.subjectCode) {
    						object[subjectCode] = item.percentPoint;
    						return false;
    					}
    				});
    			});
    			listDataChart.push(object);
    		});
    		
    		let series = getSeriesSubject(listDataDistinct);
    		
    		rebuildChart(listDataDistinct.length, series, listDataChart);
    		
    		listTotal.forEach(s => {
				s.yearSem = stringToYearMonth(s.examYearMonthGbn);
			});
			listChartPie.add(createChartTotal(listTotal));
        }
        
        function getAchievementChart_MK() {
        	let listYearSem = searchData.listYearSem,
				listValue = searchData.listValue,
				listDataDistinct = searchData.listData,
				listTotal = searchData.listTotal,
				listMonth = searchData.listMonth;
        	
			listDataDistinct.pop();
			// listDataDistinct = listDataDistinct.concat(_.cloneDeep(listDataDistinct))
												// .concat(_.cloneDeep(listDataDistinct))
												// .concat(_.cloneDeep(listDataDistinct))
												// .concat(_.cloneDeep(listDataDistinct))
												// .concat(_.cloneDeep(listDataDistinct))
    		listDataDistinct.forEach((s, index) => {
    			s.color = colorList[index % colorList.length];
    		})
    		
    		let listDataChart = [];
    		Ext.each(listMonth, function(yearSem) {
    			let examYearMonthGbn = yearSem.examYearMonthGbn;
    			let object = {yearSem: stringToYearMonth(yearSem.examYearMonthGbn)};
    			Ext.each(listDataDistinct, function(distinct) {
    				let skillCode = distinct.skillCode;
    				Ext.each(listValue, function(item) {
    					if(examYearMonthGbn == item.examYearMonthGbn && skillCode == item.skillCode) {
    						object[skillCode] = item.percentPoint;
    						return false;
    					}
    				});
    			});
    			listDataChart.push(object);
    		});
    		
    		let series = getSeriesSkill(listDataDistinct);
    		rebuildChart(listDataDistinct.length, series, listDataChart);
			listTotal.forEach(s => {
				s.yearSem = stringToYearMonth(s.examYearMonthGbn);
			});
			listChartPie.add(createChartTotal(listTotal));
        }
        
        function getSeriesAllMeasure(listMeasure) {
			let series = [];
			let yFieldArray = [];
			let titleArray = [];
			let colorArray = [];
        	listMeasure.forEach((s, index) => {
				yFieldArray.push(s.measureStandardCode);
				titleArray.push(s.measureStandardName);
				colorArray.push(s.color);
			})
			series.push({
				type: 'bar', axis: 'left', stacked: false,
				xField: 'yearSem', 
				yField: yFieldArray,
				title: titleArray,
				colors: colorArray,
				label: {
                    display: 'outside',
                    field: yFieldArray,
                    renderer: function(value, label, storeItem, item, i, display, animate, index) {
                        return value + '%';
                    }
				},
				style: {
					maxBarWidth: 25,
					minBarWidth: 20,
				},
//				tooltip: {
//					trackMouse: true,
//					renderer: 'onSeriesTooltipRender'
//				}
			});
    		return series;
        }
        function getSeriesSubject(listDataDistinct) {
			let series = [];
			let yFieldArray = [];
			let titleArray = [];
			let colorArray = [];
        	listDataDistinct.forEach((s, index) => {
				yFieldArray.push(s.subjectCode);
				titleArray.push(s.subjectName);
				colorArray.push(s.color);
			})
			series.push({
				type: 'bar', axis: 'left', stacked: false,
				xField: 'yearSem', 
				yField: yFieldArray,
				title: titleArray,
				colors: colorArray,
				label: {
                    display: 'outside',
                    field: yFieldArray,
                    renderer: function(value, label, storeItem, item, i, display, animate, index) {
                        return value + '%';
                    }
				},
				style: {
					maxBarWidth: 25,
					minBarWidth: 20,
				},
//				tooltip: {
//					trackMouse: true,
//					renderer: 'onSeriesTooltipRender'
//				}
			});
    		return series;
        }
        function getSeriesSkill(listDataDistinct) {
			let series = [];
			let yFieldArray = [];
			let titleArray = [];
			let colorArray = [];
        	listDataDistinct.forEach((s, index) => {
				yFieldArray.push(s.skillCode);
				titleArray.push(s.skillName);
				colorArray.push(s.color);
			})
			series.push({
				type: 'bar', axis: 'left', stacked: false,
				xField: 'yearSem', 
				yField: yFieldArray,
				title: titleArray,
				colors: colorArray,
				label: {
                    display: 'outside',
                    field: yFieldArray,
                    renderer: function(value, label, storeItem, item, i, display, animate, index) {
                        return value + '%';
                    }
				},
				style: {
					maxBarWidth: 25,
					minBarWidth: 20,
				},
//				tooltip: {
//					trackMouse: true,
//					renderer: 'onSeriesTooltipRender'
//				}
			});
    		return series;
        }
        
        function rebuildChart(itemCount, series, listDataChart) {
        	let visibleRange = 0;
        	if(itemCount < 7) {
        		visibleRange = 0.75;
        	}else if(itemCount < 12) {
        		visibleRange = 0.5;
        	}else {
        		visibleRange = 0.35;
        	}
        	
        	mainChart = Ext.create('Ext.chart.CartesianChart', {
    			width: '100%',
                height: 500,
    			animate: false,
    			shadow: true,
    			style: 'background: #fff;',
    			cls: "wrap-graph",
    			store: Ext.create('Ext.data.JsonStore', {
    	            fields: ['yearSem'],
    	            data: listDataChart
    	        }),
    			insetPadding: '20 0 20 10',
    	        innerPadding: {
    	            left: 0,
    	            right: 40,
    	            top: 45,
    	            bottom: 0
    	        },
    	    	onAxisLabelRender: function (axis, label, layoutContext) {
    	            return layoutContext.renderer(label) + '%';
    	        },
    	        onSeriesTooltipRender: function (tooltip, record, item) {
    	            tooltip.setHtml(record.get(item.field) + '%');
    	        },
    	        interactions: [
    	        	{type: 'panzoom', zoomOnPan: false}
            	],
    			legend: {
    				docked: 'right', boxStrokeWidth: 0, labelFont: '12px Helvetica', style: {left: 840}, autoScroll: true,
    			},
    			axes: [
    		       {type: 'numeric', position: 'left', grid: true, title: false, minimum: 0, maximum: 100, roundToDecimal: false, renderer: 'onAxisLabelRender'},
                   {type: 'category', position: 'bottom', title : false, grid: false, group: true, fields: 'yearSem', visibleRange: [0, 1]}
        		],
        		series: series,    
    		});
        	
        	containerChart.removeAll();
        	containerChart.add(mainChart);
        	
        	let panzoom = containerChart.down('cartesian').getInteractions()[0];
        	containerChart.down('toolbar').add(panzoom.getModeToggleButton());
        }
        
		/*--End--*/
	}
});
