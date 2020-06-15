Ext.define('ext.view.serviceSetting.categoryManagement.popup.tab.AcademyCounselTab', {
	extend: 'Ext.form.Panel',
	border: false,
	layout: 'vbox',
	reloadTab: function() {},
	reloadParent: function() {},
	initComponent: function() {
		
		let me = this;
		
		me.reloadTab = function() {
			me.reset();
			getFormField(me, 'classify').setValue('');
			mainStore.loadPage(1, {
				params: {
					classify: 'xyz'
				}
			})
			me.show();
		}
		
		let classifyStore = Ext.widget('mestore');
		let classifyStoreOpt = getStoreOpt(true, 'All', '', true, '');
		
		let formSearch = Ext.widget('container', {
			width: '100%',
			layout: 'hbox',
			border: false,
			padding: '0 0 5 5',
			items: [
				{xtype: 'mecombo', flex: .5, labelWidth: 80, name: 'classify', fieldLabel: 'Classification',
		        	store: classifyStore, valueField: 'detailCode', displayField: 'codeName', queryMode: 'local', editable: false,
		        },
		        {xtype: 'metext', flex: .5, labelWidth: 30, name: 'title', fieldLabel: 'Title', margin: '0 5 0 5',
					listeners: {
		                specialkey: function(f, e) {    
		                	getFileList();
		                }
		            }
				},
				{xtype: 'mebutton', text: 'Search', padding: '8 10', style: 'float: right;', iconCls: 'fa fa-search btn-icon', 
			    	handler: function() {
			    		getFileList();
					}
				}
			]
		});
		
		let mainStore = Ext.widget('mestore', {
			pageSize: 5,
            proxy: {
				type : 'ajax',
				url: CONTEXT_PATH + '/serviceSettingController/getFileList.json',
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
        	store: mainStore,
        	width: '100%',
        	height: 200,
        	columns: [
        		{text: 'No', width: 50, dataIndex: 'rowNo', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'File Title', flex: 1, minWidth: 200, dataIndex: 'title', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Classification', width: 150, dataIndex: 'classifyName', align: 'center', sortable: false, menuDisabled: true},
				{text: 'File Type', width: 120, dataIndex: 'fileTypeName', align: 'center', sortable: false, menuDisabled: true,
        			renderer: function (value, metaData, record, row, col, store, gridView) {
						return `<a href="#" action="preview">${value}</a>`;
	                }
				},
				
        	],
        	bbar: new Ext.PagingToolbar({
    			store: mainStore,
    			pageSize: 5,
    			displayInfo: true,
    			listeners: {
    				beforechange : function(pagingtoolbar, page, eOpts) {
    					setParamsToProxy(paramsToSearch, this.store.getProxy());
    				}
    			}
    		}),
    		selModel: {
                selType: 'checkboxmodel',
                headerWidth: 34,
                showHeaderCheckbox: true,
                listeners: {
                    select: function (model, record, index, eOpts) {
                    	me.reloadParent(record.data, 'ADD');
                    },
					deselect: function(model, record, index) {
						me.reloadParent(record.data, 'DEL');
					}
                }
            },
        	listeners: { 
				cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
//					console.log(record.data)
		        }
		 	}
    	});
		
		this.items = [formSearch, mainGrid];
		this.callParent(arguments);
		
		init();
		function init() {
			Common.getGeneralCode(classifyStore, 'CS', 'SY0008', 'TI', classifyStoreOpt, getFormField(me, 'classify'));
		}
		
		let paramsToSearch = {};
		async function getFileList() {
			try {
				if(!me.isValid()) {
					throw new Error();
				}
				paramsToSearch = {
					categoryFile 	: me.info.categoryFile,
					classify		: getFormField(me, 'classify').getValue(),
					title			: getFormField(me, 'title').getValue().trim(),
				};
				mainStore.loadPage(1, {
					params: paramsToSearch
				})
        	}catch(e) {
        		handleException(e);
        	}
		}
		
		/*--End--*/
	}
});
