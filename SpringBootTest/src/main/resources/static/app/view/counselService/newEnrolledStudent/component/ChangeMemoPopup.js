Ext.define('ext.view.counselService.newEnrolledStudent.component.ChangeMemoPopup', {
	extend: 'component.MeWindow',
	title: 'Memo',
	width: 300,
	defaultWidth: 300,
	layout: 'fit',
	bodyPadding: 5,
	reloadPopup: function() {},
	reloadParent: function() {},
	initComponent : function() {
		
		let me = this;
		
		let counselInfo;
		me.reloadPopup = function(info) {
			counselInfo = info;
			memo.setValue(info.memoContent);
			me.show();
		}
		
		let memo = Ext.widget('mearea', {
			width: '100%', 
		})
		
		let btnApply = Ext.widget('button', {
			text: 'Apply', 
			iconCls: 'fas fa-check btn-icon', 
			padding: '8 10',
       	 	handler: function() {
       	 		apply();
       	 	}
		})
		
		this.items = [memo];
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
		
		async function apply() {
			try {
	   		 	let params = {
					counselId	: counselInfo.counselId,
					memoContent	: memo.getValue().trim()
				}
				await saveDataAjaxNoConfirm('/counselServiceController/changeMemo.json', params);
	   		 	
				me.reloadParent(params);
				me.hide();
			}catch(e) {
				handleException(e);
			}
		}
		
//	END
	}
});

