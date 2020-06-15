Ext.define('ext.view.counselService.newEnrolledStudent.component.CounselHistory', {
	extend: 'Ext.container.Container',
	width : '100%',
	layout: 'fit',
	padding: 5,
	initComponent : function() {
		
		let me = this;
		
//		memberCode, clientCode
		me.reloadTab = function(info) {
			getNCCounselHistoryList(info);
		}
		
		let mainStore = Ext.widget('mestore', {
			pageSize: 5,
            proxy: {
				type: 'ajax',
				url: CONTEXT_PATH + '/counselServiceController/getNCCounselHistoryList.json',
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
        	columns: [
        		{text: 'No', width: 40, dataIndex: 'rowNo', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Counsel Classification', width: 200, dataIndex: 'counselGbnName', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Counselor', flex: 1, minWidth: 200, dataIndex: 'counselMemName', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Counsel Status', width: 120, dataIndex: 'counselStageName', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Approval Status', width: 120, dataIndex: '', align: 'center', sortable: false, menuDisabled: true},
        		{text: 'Counsel Cattegory', width: 150, dataIndex: 'categoryName', align: 'center', sortable: false, menuDisabled: true, cellWrap: true},
        		{text: 'Solutions', width: 120, dataIndex: 'solutionGbn', align: 'center', sortable: false, menuDisabled: true},
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
        	listeners: { 
				cellclick: function (view, cell, cellIndex, record, row, rowIndex, e) {
					console.log(record.data)
		        }
		 	}
    	});
		
		this.items = [mainGrid];
		this.callParent(arguments);
		
		let paramsToSearch = {};
		async function getNCCounselHistoryList(info) {
			try {
				paramsToSearch = _.cloneDeep(info);
				mainStore.loadPage(1, {
					params: paramsToSearch
				})
        	}catch(e) {
        		handleException(e);
        	}
		}
		
//	END
	}
});

