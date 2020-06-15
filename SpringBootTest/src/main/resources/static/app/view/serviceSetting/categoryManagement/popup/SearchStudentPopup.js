Ext.define('ext.view.serviceSetting.categoryManagement.popup.SearchStudentPopup', {
	extend: 'component.MeWindow',
	title: 'Student Search',
	width: 900,
	defaultWidth: 900,
	layout: 'vbox',
	reloadPopup: function(){},
	initComponent : function() {
		
		let me = this;
		
		let fileInfo;
		me.reloadPopup = function(info) {
			fileInfo = info;
			formSearch.reset();
			mainStore.loadPage(1, {
				params: {
					memberName: 'xyxyxy',
				}
			})
			me.show();
		}
		
		let btnSearch = Ext.widget('mebutton', {
	    	text: 'Search', 
	    	padding: '8 10', 
	    	margin: '0 0 0 10',
	    	iconCls: 'fa fa-search btn-icon', 
	    	style: 'float: right;',
	    	handler: function() {
	    		getStudentList();
			}
	    });
		
		let formSearch = Ext.create('Ext.form.Panel', {
			width : '100%',
			border : false,
			padding : 10,
			margin : '5 5 0 5',
			style : 'border: 1px solid #b5b8c8; border-radius: 3px;',
			layout: 'hbox',
			items: [
 				{xtype: 'metext', flex: 1, labelWidth: 90, name: 'name', fieldLabel: 'Student Name',
					listeners:  {
		                specialkey: function (f,e) {    
		                    if (e.getKey() == e.ENTER) {
		                    	getStudentList();
		                    }
		                }
		            }		    
				},
 				btnSearch
			]
		});
		
		let mainStore = Ext.widget('mestore', {
			pageSize: 10,
            proxy: {
				type : 'ajax',
				url: CONTEXT_PATH + '/serviceSettingController/getStudentList.json',
				reader: {
					type: 'json',
					enablePaging: true,
					rootProperty: 'data',
					totalProperty: 'totalCount',
				}
            },
            queryMode: 'local',
		});
		let mainGrid = Ext.create('Ext.grid.Panel', {
			width: '100%',
			height: 250,
			margin: 5,
			store: mainStore,
			selModel: Ext.create('Ext.selection.CheckboxModel'),
			columns: [
				{text: 'No', width: 50, dataIndex: 'rowNo', align: 'center', sortable: false, menuDisabled: true},
				{text: 'Student Name', minWidth: 200, flex: 1, dataIndex: 'memberName', align : 'center', sortable: false, menuDisabled: true},
				{text: 'Student ID', width: 100, dataIndex: 'memberCode', align : 'center', sortable: false, menuDisabled: true},
				{text: 'Class', width: 100, dataIndex: 'className', align : 'center', sortable: false, menuDisabled: true},
				{text: 'Level', width: 100, dataIndex: 'levelName', align : 'center', sortable: false, menuDisabled: true},
				{text: 'Grade', width: 100, dataIndex: 'gradeGbnName', align : 'center', sortable: false, menuDisabled: true},
			],
			bbar: new Ext.PagingToolbar({
    			store: mainStore,
    			pageSize: 10,
    			displayInfo: true,
    			listeners: {
    				beforechange : function(pagingtoolbar, page, eOpts) {
    					let proxy = this.store.getProxy();
    					setParamsToProxy(paramsToSearch, proxy);
    				}
    			}
    		}),
			listeners: {
				cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {			    		 
//		    		console.log(record.data)
		        }
		 	},
		});
		
		let btnApply = Ext.widget('button', {
			text: 'Apply', 
			iconCls: 'fas fa-check btn-icon', 
			padding: '8 10',
       	 	handler: function() {
       	 		apply();
       	 	}
		})
		
		this.items = [
			formSearch, 
			mainGrid
        ];
		this.bbar = [
             {xtype: 'mepanel', style: 'background: transparent;', bodyStyle: 'background: transparent;',
            	 layout: { 
            		 type: 'hbox', 
            		 align: 'middle', 
            		 pack: 'center'
    			 },
        		 items: [btnApply]
             },
        ];
		this.callParent(arguments);
		
		let paramsToSearch = {};
		async function getStudentList() {
			try {
				if(!formSearch.isValid()) {
					throw new Error();
				}
				paramsToSearch = {
					memberName	: getFormField(formSearch, 'name').getValue().trim(),
//					memberName: 'Alson'
				};
				mainStore.loadPage(1, {
					params: paramsToSearch
				})
        	}catch(e) {
        		handleException(e);
        	}
		}
		
		let viewPlcAchievementPopup = Ext.create('ext.view.serviceSetting.categoryManagement.popup.ViewPlcAchievementPopup');
		let viewPlcAchievementAllPopup = Ext.create('ext.view.serviceSetting.categoryManagement.popup.ViewPlcAchievementAllPopup');
		function apply() {
			try {
				let selected = mainGrid.getSelectionModel().getSelection();
	   		 	if(selected.length == 0) {
	   		 		throw new Error('Please select one row');
	   		 	}
	   		 	let studentList = _(selected)
	   		 		.map(s => s.data)
	   		 		.value();
	   		 	switch(fileInfo.measureStandard) {
					case 'EP':
					case 'UT':
					case 'LT':
						viewPlcAchievementPopup.reloadPopup(fileInfo, studentList);
						break;
					case 'AC':
						viewPlcAchievementAllPopup.reloadPopup(studentList);
						break;
					case 'US':
						break;
					case 'WH':
						break;
				}
			}catch(e) {
				handleException(e);
			}
		}
		
//		END
	}
});

