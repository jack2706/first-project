Ext.define('ext.view.serviceSetting.categoryManagement.popup.CategoryRegisterPopup', {
	extend: 'component.MeWindow',
	title: 'Category Register Popup',
	width: 320,
	defaultWidth: 320,
	layout: 'vbox',
	reloadPopup: function() {},
	reloadParent: function() {},
	initComponent: function() {
		
		let me = this;
		
		let parentInfo;
		me.reloadPopup = function(parent) {
			parentInfo = _.cloneDeep(parent);
			console.log(parentInfo)
			formInfo.reset();
			me.show();
		}
		
		let formInfo = Ext.create('Ext.form.Panel', {
			width: '100%', border : false, bodyPadding: 10,
			layout: 'vbox',
			items: [
				{xtype: 'metext', width: '100%', labelWidth: 55, name: 'name', fieldLabel: 'Category', allowBlank: false},
            ]
		});
		
		this.items = [formInfo];
		this.bbar = [
            {xtype: 'mepanel', style: 'background: transparent;', bodyStyle: 'background: transparent;',
           	 	layout: {
           	 		type: 'hbox',
           	 		align: 'middle',
           	 		pack: 'center'
           	 	},
           	 	items: [
           	 		{xtype: 'mebutton', text: 'Apply',
			            handler: function() {
			            	saveCategory();
			            }
           	 		}
       	 		]
            }
        ];
		this.callParent(arguments);
		
		async function saveCategory() {
			try {
				let params = {
					parentCatCode	: parentInfo.categoryCode,
					treeLevel		: parentInfo.treeLevel + 1,
					categoryName	: getFormField(formInfo, 'name').getValue().trim(),
				}
				console.log(params)
				await saveDataAjax('Do you want to apply ?', '/serviceSettingController/saveCategory.json', params, 'Apply Successfully.', 'Category Register');
				me.reloadParent();
				me.hide();
        	}catch(e) {
        		handleException(e);
        	}
		}
		
		/*--End--*/
	}
});
