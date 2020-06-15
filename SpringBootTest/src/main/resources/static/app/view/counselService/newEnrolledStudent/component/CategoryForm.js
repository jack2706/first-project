Ext.define('ext.view.counselService.newEnrolledStudent.component.CategoryForm', {
	extend: 'Ext.form.Panel',
	width : '100%',
	layout: 'vbox',
	title: 'Title', 
	bodyPadding: '0 5 5 5',
	margin: '5 0 0 0',
	getInfo: function() {},
	reloadParent: function() {},
	initComponent : function() {
		
		let me = this;
		
		let info = me.info == undefined ? {} : me.info;
		
		me.getInfo = function() {
			let solutionGbn = getFormField(me, 'group').getValue().group;
			return {
				parentsQuestion	: getFormField(me, 'parentsQuestion').getValue(),
				counselAnswer	: getFormField(me, 'counselAnswer').getValue(),
				parentsRequest	: getFormField(me, 'parentsRequest').getValue(),
				issueComment	: getFormField(me, 'issueComment').getValue(),
				solutionGbn		: solutionGbn == undefined ? '' : solutionGbn.toString(),
				solutionComment	: getFormField(me, 'solutionComment').getValue(),
				categoryCode	: me.info.categoryCode
			}
		}
		
		this.items = [
			{xtype: 'mearea', width: '100%', labelWidth: 110, name: 'parentsQuestion', fieldLabel: 'Parent Question', margin: '5 0 0 0', allowBlank: false, value: info.parentsQuestion},
			{xtype: 'mearea', width: '100%', labelWidth: 110, name: 'counselAnswer', fieldLabel: 'Counselor Answer', margin: '5 0 0 0', allowBlank: false, value: info.counselAnswer},
			{xtype: 'mearea', width: '100%', labelWidth: 110, name: 'parentsRequest', fieldLabel: 'Parent Request', margin: '5 0 0 0', value: info.parentsRequest},
			{xtype: 'mearea', width: '100%', labelWidth: 110, name: 'issueComment', fieldLabel: 'Issue', margin: '5 0 0 0', value: info.issueComment},
			{xtype: 'container', width: '100%', layout: 'hbox', margin: '5 0 0 0',  
				items: [
			        {xtype: 'checkboxgroup', fieldLabel: `Solutions<span style="color: red">*</span>`, labelWidth: 110, flex: 1, columns: 4, name: 'group', labelSeparator: '',
//			        	cls: 'check-box col-xs-6 item form-check form-controls', bodyCls: 'group-check-inner', 
			        	allowBlank: false, invalidCls: Ext.baseCSSPrefix + 'form-invalid', margin: '0 0 2 0', value: {group: info.solutionGbn.split(',')},
			        	items: [
			    	        {boxLabel: 'PLP', inputValue: 'IE', name: 'group'},
			    	        {boxLabel: 'AR', inputValue: 'AR', name: 'group'},
			    	        {boxLabel: 'Interview', inputValue: 'IT', name: 'group'},
			    	        {boxLabel: 'Other', inputValue: 'OT', name: 'group'}
				        ]
			        }, 
			        {xtype: 'metext', name: 'solutionComment', width: 350, margin: '0 0 0 5', value: info.solutionComment}
		        ]
			},
		];
		this.tools = [
			{type: 'help',
				handler: function() {
		           console.log('a')  
		        }
			},
			{type: 'delete', hidden: info.planYn == 'Y' || info.counselStageGbn == 'CP',
				handler: function() {
					me.reloadParent();
		        }
			},
		]
		this.callParent(arguments);
		
//	END
	}
});

