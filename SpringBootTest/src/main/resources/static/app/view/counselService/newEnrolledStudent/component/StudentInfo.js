Ext.define('ext.view.counselService.newEnrolledStudent.component.StudentInfo', {
	extend: 'Ext.container.Container',
	width : '100%',
	layout: 'hbox',
	autoScroll: true,
	padding: 5,
	initComponent : function() {
		
		let me = this;
		
//		memberCode, clientCode
		let studentInfo;
		me.reloadTab = function(info) {
			studentInfo = _.cloneDeep(info);
			getStudentInfo();
		}
		
		let btnSearch = Ext.widget('mebutton', {
	    	text: 'Search', 
	    	padding: '8 10', 
	    	style: 'float: right;',
	    	iconCls: 'fa fa-search btn-icon', 
	    	handler: function() {
//	    		getStudentList();
			}
	    });
		let btnStatus = Ext.widget('mebutton', {
	    	text: 'Status Search', 
	    	padding: '8 10', 
	    	handler: function() {
//	    		getStudentList();
			}
	    });
		let btnModify = Ext.widget('mebutton', {
	    	text: 'Modify', 
	    	padding: '8 10', 
	    	margin: '0 0 0 5',
	    	handler: function() {
//	    		getStudentList();
			}
	    });
		let btnShutteBus = Ext.widget('mebutton', {
	    	text: 'Shutte Bus', 
	    	padding: '8 10', 
	    	margin: '0 0 0 5',
	    	handler: function() {
//	    		getStudentList();
			}
	    });
		let btnReceipt = Ext.widget('mebutton', {
	    	text: 'Receipt', 
	    	padding: '8 10', 
	    	margin: '0 0 0 5',
	    	handler: function() {
//	    		getStudentList();
			}
	    });
		
		let formInfo = Ext.create('Ext.form.Panel', {
			width: '100%',
			flex : 1,
			border : false,
			layout: {
				type: 'table',
				columns: 2,
				tdAttrs: {style: 'padding: 7px 10px 0px 0px; vertical-align: bottom; border-bottom: 1px solid #e7ecf6;'}
			},
			items: [
				{xtype: 'medisplayfield', width: '100%', labelWidth: 120, name: 'name', fieldLabel: 'Name/Birth', margin: 0, 
					labelStyle: 'font-weight: bold;', fieldStyle: 'color: #747785;', labelSeparator: ''
				},
				{xtype: 'medisplayfield', width: '100%', labelWidth: 140, name: 'id', fieldLabel: 'Student ID', margin: 0, 
					labelStyle: 'font-weight: bold;', fieldStyle: 'color: #747785;', labelSeparator: ''
				},
				{xtype: 'medisplayfield', width: '100%', labelWidth: 120, name: 'school', fieldLabel: 'School/Grade', margin: 0, 
					labelStyle: 'font-weight: bold;', fieldStyle: 'color: #747785;', labelSeparator: ''
				},
				{xtype: 'medisplayfield', width: '100%', labelWidth: 140, name: 'classification', fieldLabel: 'Student Classification', margin: 0,
					labelStyle: 'font-weight: bold;', fieldStyle: 'color: #747785;', labelSeparator: ''
				},
				{xtype: 'medisplayfield', width: '100%', labelWidth: 120, name: 'motherPhone', fieldLabel: 'Parent Handphone', margin: 0,
					labelStyle: 'font-weight: bold;', fieldStyle: 'color: #747785;', labelSeparator: ''
				},
				{xtype: 'medisplayfield', width: '100%', labelWidth: 140, name: 'homePhone', fieldLabel: 'Home Phone', margin: 0, 
					labelStyle: 'font-weight: bold;', fieldStyle: 'color: #747785;', labelSeparator: ''
				},
				{xtype: 'medisplayfield', width: '100%', labelWidth: 120, name: 'address', fieldLabel: 'Address', margin: 0, colspan: 2,
					labelStyle: 'font-weight: bold;', fieldStyle: 'color: #747785;', labelSeparator: ''
				},
				{xtype: 'medisplayfield', width: '100%', labelWidth: 120, name: 'note', fieldLabel: 'Notices', margin: 0, colspan: 2,
					labelStyle: 'font-weight: bold;', fieldStyle: 'color: #747785;', labelSeparator: ''
				},
			]
		});
		
		let newImage = Ext.widget('meimage', {
			src: CONTEXT_PATH + '/resources/common/images/img/noimage_110.gif',
		    border: 0,
		    style: 'width: 100%; height: auto;',
		});
		
		this.items = [
			{xtype: 'container', layout: 'vbox', margin: '0 10 0 0',
				items: [
					{xtype: 'mepanel', layout: 'vbox', width: 114, height: 149, margin: '0 10 0 0', cls: 'uploadImg', 
						bodyStyle: 'position: relative !important; padding: 2px;', items: [newImage]
					},
					{xtype: 'mebutton', text: 'My POLY Life', padding: '8 10', margin: '5 0 0 0',
				    	handler: function() {
						}
					}
				]
			},
			{xtype: 'container', flex: 1, layout: 'vbox',
				items: [
					formInfo,
					{xtype: 'container', width: '100%', layout: 'hbox', margin: '5 0 0 0',
						items: [{xtype: 'tbfill'}, btnStatus, btnModify, btnShutteBus, btnReceipt]
					}
				]
			}
		];
		this.callParent(arguments);
		
		async function getStudentInfo(info) {
			try {
        		let json = await getDataAjax('/counselServiceController/getStudentInfo.json', studentInfo);
        		let data = json.data;
        		getFormField(formInfo, 'name').setValue(`${data.memberName} / ${stringToDate(data.birthdayYmd)}`);
        		getFormField(formInfo, 'id').setValue(data.memberCode);
        		getFormField(formInfo, 'school').setValue(`${data.schoolName} / ${data.gradeGbnName}`);
        		getFormField(formInfo, 'classification').setValue(`${data.studentSttName} ${stringToDate(data.statusAppDate)}`);
        		getFormField(formInfo, 'motherPhone').setValue(data.motherPhone);
        		getFormField(formInfo, 'homePhone').setValue(data.handphoneNo);
        		getFormField(formInfo, 'address').setValue(data.address);
        		getFormField(formInfo, 'note').setValue(data.note);
        		
        		newImage.setSrc(data.imgUrl == '' ? NO_IMAGE : data.imgUrl);
				unMask();
        	}catch(e) {
        		handleException(e);
        	}
		}
		
//	END
	}
});

