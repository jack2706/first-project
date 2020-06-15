Ext.define('ext.view.serviceSetting.categoryManagement.popup.PagingComponent', {
  	extend : 'Ext.container.Container',
	width: '100%',
	padding: '10 0',
	layout: {
		type: 'vbox',
		pack: 'center',
		align: 'middle'
	},
	loadData: function() {},
	reloadParent: function() {},
  	initComponent: function () {
	  
		let me =  this;
		
		me.loadData = function(listYearSem, yearTermLevel) {
			pagingStore.loadData(listYearSem);
			pagingCombo.setValue(yearTermLevel);
		}
		
		let pagingStore = Ext.widget('mestore');
		let pagingCombo = Ext.widget('mecombo', {
			store: pagingStore, 
			valueField: 'yearTermLevel', 
			displayField: 'yearTermLevel',
			listeners: {
				change: function() {
					let value = this.value;		
					if(value != null) {
						let record = this.findRecordByValue(value);
						let display = `${record.data.yearGbn} ${record.data.termName} ${record.data.levelName}`;
						displayField.setText(display);
					}else {
						displayField.setText();
					}
				}
			}
		})
		
		let displayField = Ext.widget('label', {
			margin: '5 10 0 10', 
			style: 'font-weight: bold; font-size: 20px; color: #737373;',
			text: '2020 1st Semester Rise Up 1'
		});
		let mainPanel = Ext.widget('container', {
			layout: 'hbox',
			cls: 'category-page-btn',
			items: [
				{xtype: 'button', iconCls: 'fa fa-angle-double-left',
					handler: function() {
						nextPreBtn('first');
					}
				},
				{xtype: 'button', iconCls: 'fa fa-angle-left', margin: '0 2',
					handler: function() {
						nextPreBtn('pre');
					}
				},
				displayField,
				{xtype: 'button', iconCls: 'fa fa-angle-right', margin: '0 2',
					handler: function() {
						nextPreBtn('next');
					}
				},
				{xtype: 'button', iconCls: 'fa fa-angle-double-right',
					handler: function() {
						nextPreBtn('last');
					}
				}
			]
		});

        this.items = [mainPanel];
        this.callParent(arguments);
		
		
		function nextPreBtn(flag) {
        	if(pagingStore.data.length == 0) {
        		return;
        	}
        	let combo = pagingCombo;
        	let store = combo.getStore();
        	let index = store.findBy(function (record) {
        		return record.data.yearTermLevel == combo.getValue();
        	});
        	if(index == -1) {
        		return;
        	}
        	let newIndex = -1;
        	switch(flag) {
	        	case 'first': 
	        		if(index > 0) {
	        			newIndex = 0;
	        		}
	        		break;
	        	case 'pre': 
	        		if(index > 0) {
	        			newIndex = index - 1;
	        		}
	        		break;
	        	case 'next': 
	        		if(index < store.data.length - 1) {
	        			newIndex = index + 1;
	        		}
	        		break;
	        	case 'last': 
	        		if(index < store.data.length - 1) {
	        			newIndex = store.data.length - 1;
	        		}
	        		break;
        	}
        	if(newIndex != -1) {
        		let record = store.getAt(newIndex);
				combo.setValue(record);
				me.reloadParent(combo.getValue());
        	}
        }
        
//  	END
    }
});
