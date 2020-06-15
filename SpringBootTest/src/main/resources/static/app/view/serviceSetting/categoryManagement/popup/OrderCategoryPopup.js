Ext.define('ext.view.serviceSetting.categoryManagement.popup.OrderCategoryPopup', {
	extend: 'component.MeWindow',
	title: 'Order Category',
	width: 500,
	defaultWidth: 500,
	layout: 'fit',
	bodyPadding: 5,
	reloadPopup: function() {},
	reloadParent: function() {},
	initComponent: function() {
		
		let me = this;
		
		me.reloadPopup = function(info) {
			init(info.parentCatCode);
			me.show();
		}
		
		let mainStore = Ext.widget('mestore');
		let mainGrid = Ext.create('Ext.grid.Panel', {
        	store: mainStore,
        	width: '100%',
        	height: 300,
        	autoScroll: true,
        	viewConfig: {
            	plugins: {
            		ptype: 'gridviewdragdrop',
            	}
            },
        	columns: [
        		{text: 'Category Name', flex: 1, dataIndex: 'categoryName', align: 'center', sortable: false, menuDisabled: true},
        	],
        	listeners: { 
			    cellclick: function(view, cell, cellIndex, record, row, rowIndex, e) {
			    	console.log(record.data)
			    }
		 	},
    	});
		
		let btnApply = Ext.widget('mebutton', {
	    	text: 'Apply', 
	    	handler: function() {
	    		orderCategory();
			}
	    });
		
		this.items = [mainGrid];
		this.bbar = [
            {xtype: 'mepanel', style: 'background: transparent;', bodyStyle: 'background: transparent;',
           	 	layout: {
           	 		type: 'hbox',
           	 		align: 'middle',
           	 		pack: 'center'
           	 	},
           	 	items: [btnApply]
            }
        ];
		this.callParent(arguments);
		
		async function init(parentCatCode) {
			try {
        		let json = await getDataAjax('/serviceSettingController/getCategoryListToOrder.json', {parentCatCode: parentCatCode});
        		let data = json.data;
        		if(data.length > 0) {
        			mainStore.loadData(data);
        		}else {
        			mainStore.removeAll();
        		}
        		btnApply.setDisabled(data.length == 0 || data.length == 1);
				unMask();
        	}catch(e) {
        		handleException(e);
        	}
		}
		async function orderCategory() {
			try {
				let categoryList = [];
				mainStore.each(function(record, index) {
					categoryList.push({
						categoryCode: record.data.categoryCode,
						categoryName: record.data.categoryName,
						orderNo: ++index
					});
				})
				let paramsAjaxJson = {
					counselFileList	: categoryList,
				}
				console.log(paramsAjaxJson);
				await saveDataAjaxJson('Do you want to apply ?', '/serviceSettingController/orderCategory.json', Ext.JSON.encode(paramsAjaxJson), 'Apply Successfully.', 'Category Management');
				me.reloadParent();
				me.hide();
        	}catch(e) {
        		handleException(e);
        	}
		}
		
		/*--End--*/
	}
});
