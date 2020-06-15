Ext.define('ext.view.serviceSetting.categoryManagement.popup.AssignmentCounselFilePopup', {
	extend: 'component.MeWindow',
	title: 'Assignment Counsel File',
	width: 1000,
	defaultWidth: 1000,
	layout: 'vbox',
	bodyPadding: 5,
	reloadPopup: function() {},
	reloadParent: function() {},
	initComponent: function() {
		
		let me = this;
		
		me.reloadPopup = function() {
			mainTab.setActiveTab(0);
			allTab.forEach(s => {
				s.reloadTab();
			})
			mainStore.removeAll();
			me.show();
		}
		
		let mainTab = Ext.create('Ext.TabPanel', {
			width: '100%', 
			flex: 1,
			bodyPadding: 5,
			split: false, 
			collapsible: false, 
			tabBar: {
			    ui: 'tabMain'
			},
			defaults: {
				tabConfig: {
					ui: 'tabMain'
			    }
			},
			items: [],
		});
		
		let mainStore = Ext.widget('mestore');
		let mainGrid = Ext.create('Ext.grid.Panel', {
        	store: mainStore,
        	width: '100%',
        	height: 200,
        	margin: '5 0 0 0',
        	columns: [
        		{text: 'File Title', flex: 1, minWidth: 200, dataIndex: 'title', align: 'center', sortable: false, menuDisabled: true},
				{text: 'File Type', width: 120, dataIndex: 'fileTypeName', align: 'center', sortable: false, menuDisabled: true,
        			renderer: function (value, metaData, record, row, col, store, gridView) {
						return `<a href="#" action="preview">${value}</a>`;
	                }
				},
				{text: '', align: 'center', sortable: false, menuDisabled: true,
	                renderer: function(value, rootRecord, record) {
	                	return `<a href="#" action="delete" class="fa fa-trash grid-icon"> Delete</a>`;
	           		}
		        }
        	],
        	listeners: { 
			    cellclick: function(view, cell, cellIndex, record, row, rowIndex, e) {
			    	if($(e.target).attr('action') == 'delete') {
			    		counselFileStore.remove(record);
			    	}else if($(e.target).attr('action') == 'pewview') {
			    		
			    	}
			    }
		 	},
    	});
		
		this.items = [mainTab, mainGrid];
		this.bbar = [
            {xtype: 'mepanel', style: 'background: transparent;', bodyStyle: 'background: transparent;',
           	 	layout: {
           	 		type: 'hbox',
           	 		align: 'middle',
           	 		pack: 'center'
           	 	},
           	 	items: [
           	 		{xtype: 'mebutton', text: 'Apply', padding: '8 10', iconCls: 'fas fa-check btn-icon', 
			            handler: function() {
			            	apply();
			            }
           	 		}
       	 		]
            }
        ];
		this.callParent(arguments);
		
		let allTab = [];
		init();
		function init() {
			let categoryFile, tabTitle;
			for(let i = 0; i < 4; i++) {
				if(i == 0) {
					categoryFile = 'AC';
					tabTitle = 'Academy Counsel';
				}
				if(i == 1) {
					categoryFile = 'OC';
					tabTitle = 'Operation Counsel';
				}
				if(i == 2) {
					categoryFile = 'RC';
					tabTitle = 'Recruitment Counsel';
				}
				if(i == 3) {
					categoryFile = 'GF';
					tabTitle = 'General File';
				}
				let academyCounselTab = Ext.create('ext.view.serviceSetting.categoryManagement.popup.tab.AcademyCounselTab', {
					info: {
						categoryFile: categoryFile,
					},
					reloadParent: function(info, flag) {
						loadDataToGrid(info, flag);
					}
				});
				mainTab.add({
					title: tabTitle, xtype: 'container', layout: 'fit', items: [academyCounselTab]
				})
				allTab.push(academyCounselTab);
			}
		}
		
		function loadDataToGrid(info, flag) {
			try {
				let recordFound = mainStore.findRecord('fileCode', info.fileCode);
				if(flag == 'ADD' && recordFound == null) {
					mainStore.add(info);
					return;
				}
				if(flag == 'DEL' && recordFound != null) {
					mainStore.remove(recordFound);
					return;
				}
			}catch(e) {
				handleException(e);
			}
		}
		
		async function apply() {
			try {
				if(mainStore.data.length == 0) {
					throw new Error('No data to apply');
				}
				let dataApply = [];
				mainStore.each(function(record) {
					dataApply.push(record.data);
				})
//				console.log(dataApply)
       		 	me.reloadParent(dataApply);
       		 	me.hide();
        	}catch(e) {
        		handleException(e);
        	}
		}
		
		/*--End--*/
	}
});
