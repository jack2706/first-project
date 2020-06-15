Ext.define('ext.view.common.component.campusInformationComponent', {
	extend : 'Ext.form.Panel',
	alias : 'widget.campusInformationComponent',
	layout : 'fit',
	width  : '100%',
	border : 0,
	requires : [
	    //'ext.model.common.sybGeneralCodeModel',
	    //'ext.model.common.campusCourseModel',
    ],
	reloadTab: function(){},
	resetTab: function(){},
	reloadParent : function(){},
	initComponent : function() {
		
		var me = this;
		
		me.reloadTab = function(){
			formInfoBottom.reset();
			newImage.setSrc(CONTEXT_PATH + '/resources/common/images/img/noimage_110.gif');
			getCampusInfo();
		}
		
		var newImage = Ext.create('Ext.Img', {
			src : CONTEXT_PATH + '/resources/common/images/img/noimage_110.gif',
			//style: 'left: 50%; top: 50%; max-height: 100%; max-width: 100%;',
		    border : 0,
		});
		
		var wrapImage = Ext.create('Ext.container.Container',{
			//width : '50%',
			layout : 'vbox',
			cls : 'campusInfoImg',
			width: 220,
			height: 290,
			border : false,
			items : [newImage]
		});
		
		var formInfoBottomTopRight = Ext.create('Ext.form.Panel',{
			flex: 1,
			border : false,
			//padding : '0 0 0 10',
			layout: 'vbox',
			items : [
		         {xtype: 'textfield', fieldLabel: 'Campus Name', name : 'campusName', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130, 
		        	 tooltip: {
	                    anchor: 'top',
	                    trackMouse: true,
	                    html: '',
	                    listeners : {
	                   	 	beforeshow: function updateTipBody(tip) {
	                            tip.update(formInfoBottomTopRight.getForm().findField('campusName').getValue());
	                        }
	                    }
	                 }
		         },
		         {xtype: 'textfield', fieldLabel: 'Country', name : 'country', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130, },
		         {xtype: 'textfield', fieldLabel: 'Area', name : 'area', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130, },
		         {xtype: 'textfield', fieldLabel: 'Representative Name', name : 'representativeName', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130, },
		         {xtype: 'textfield', fieldLabel: 'Corporate Number', name : 'corporateNumber', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130, },
		         {xtype: 'textfield', fieldLabel: 'Business Number', name : 'businessNumber', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130, },
		         {xtype: 'textfield', fieldLabel: 'Industry/industry', name : 'industry', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130, },
	        ],
	        listeners: {
	            afterrender: function() {
	                Ext.each(this.items.items, function (field) {
	                    Ext.create('Ext.tip.ToolTip', Ext.applyIf(field.tooltip, {target: field.getEl()}));
	                });
	            }
	        }
		});
		
		var formInfoBottomTop = Ext.create('Ext.form.Panel',{
			width : '100%',
			border : false,
			padding: '5 10 0',
			layout: 'hbox',
			items : [wrapImage, formInfoBottomTopRight]
		});
		var formInfoBottomBottom = Ext.create('Ext.form.Panel',{
			width : '100%',
			border : false,
			padding : '0 0 0 10',
			layout: {
	            type: 'table',
	            columns: 2,
	            tdAttrs: {style: 'padding: 0px 10px 0px 0px; vertical-align : top;'}
	        },
			items : [
		         {xtype: 'textfield', fieldLabel: 'Emergency Contact', name : 'emergencyContact', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Time Difference', name : 'timeDiffrence', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Main Phone', name : 'mainPhone', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Fax', name : 'fax', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Contract Start Date', name : 'contractStartDate', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Representative', name : 'representative', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Service Start Date', name : 'serviceStartDate', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Contract Expired Date', name : 'contractExpiredDate', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textareafield', fieldLabel: 'Address', name : 'address', labelSeparator : '', readOnly : true, width : '100%', colspan : 2,labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Category', name : 'category', labelSeparator : '', readOnly : true, width : '100%', colspan : 2,labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Capacity', name : 'capacity', labelSeparator : '', readOnly : true, width : '100%', colspan : 2,labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Homepage Address', name : 'homepageAddress', labelSeparator : '', readOnly : true, width : '100%', colspan : 2,labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Attendance', name : 'attendance', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'hiddenfield', fieldLabel: 'SMS', name : 'sms', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'CID', name : 'cid', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Virtual Account', name : 'virtualAccount', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'CMS', name : 'cms', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Daily Report', name : 'dailyReport', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Income', name : 'income', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'House', name : 'house', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Credit Card Terminal', name : 'creditCardTerminal', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
		         {xtype: 'textfield', fieldLabel: 'Online Payment', name : 'onlinePayment', labelSeparator : '', readOnly : true, width : '100%',labelWidth:130},
	        ]
		});
		
		var formInfoBottom = Ext.create('Ext.form.Panel',{
			width : '100%',
			border : false,
			//padding : '0 5 0 0',
			layout: 'vbox',
			items : [formInfoBottomTop, formInfoBottomBottom]
		});
		
		var btnTest = Ext.widget('mebutton',{
	    	text : 'test',
	    	iconCls : 'icon-nw-search',
	    	padding : '3 15',
	    	handler : function(){
	    		formInfoBottom.reset();
	    		newImage.setSrc(CONTEXT_PATH + '/resources/common/images/img/noimage_110.gif');
        	},
	    });
		var formMain = Ext.create('Ext.form.Panel',{
			width : '100%',
			//autoScroll : true,
			layout : 'vbox',
			border : false,
			cls : 'campusInfoForm',
			items : [
				{xtype : 'label', html: '<i class="fa fa-caret-right" style="font-size: 14px; color: #007CC3;"></i> School Information', width: '100%',
		        	style : 'background-color: #e2e2e2', padding: "10", margin: '0 0 5'
        		},
				formInfoBottom
			]
		});
		
		this.items = [formMain];
		this.callParent(arguments);
		
		
		function getCampusInfo(){
			var ajaxUrl = "/systemConfigMgmt/getCampusInfo.json";
			var params = {}
			apiCallAjaxGetData(ajaxUrl, params, successCampusCourseList);
		}
		
		function successCampusCourseList(response) {
			var json = Ext.decode(response.responseText);
			var campusInfo = json.campusInfo;
			var homepageTypeList = json.homepageTypeList;
			formInfoBottomTopRight.getForm().findField('campusName').setValue(campusInfo[0].campusName);
			formInfoBottomTopRight.getForm().findField('country').setValue(campusInfo[0].nationalGbnName);
//			formInfoBottom.getForm().findField('area').setValue(campusInfo[0].);
			formInfoBottomTopRight.getForm().findField('representativeName').setValue(campusInfo[0].representName);
			formInfoBottomTopRight.getForm().findField('corporateNumber').setValue(campusInfo[0].corporateNo);
			formInfoBottomTopRight.getForm().findField('businessNumber').setValue(campusInfo[0].businessNo);
			formInfoBottomTopRight.getForm().findField('industry').setValue(campusInfo[0].businessType);
			formInfoBottom.getForm().findField('emergencyContact').setValue(campusInfo[0].unusualnessTel);
			formInfoBottom.getForm().findField('timeDiffrence').setValue(campusInfo[0].timeDiff);
			formInfoBottom.getForm().findField('mainPhone').setValue(campusInfo[0].telNo);
			formInfoBottom.getForm().findField('fax').setValue(campusInfo[0].faxNo);
			formInfoBottom.getForm().findField('contractStartDate').setValue(stringToDate(campusInfo[0].contractSrtDate));
			formInfoBottom.getForm().findField('representative').setValue(campusInfo[0].chargeName);
			formInfoBottom.getForm().findField('serviceStartDate').setValue(stringToDate(campusInfo[0].serviceSrtDate));
			formInfoBottom.getForm().findField('contractExpiredDate').setValue(stringToDate(campusInfo[0].contractEndDate));
			formInfoBottom.getForm().findField('address').setValue(campusInfo[0].address);
			formInfoBottom.getForm().findField('capacity').setValue(campusInfo[0].homepageCapacity);
			formInfoBottom.getForm().findField('homepageAddress').setValue(campusInfo[0].homepageAdr);
			formInfoBottom.getForm().findField('attendance').setValue(campusInfo[0].attendUseYn);
			formInfoBottom.getForm().findField('sms').setValue(campusInfo[0].smsUseYn);
			formInfoBottom.getForm().findField('cid').setValue(campusInfo[0].cidUseYn);
			formInfoBottom.getForm().findField('virtualAccount').setValue(campusInfo[0].virtualAccUseYn);
			formInfoBottom.getForm().findField('cms').setValue(campusInfo[0].cmsUseYn);
			formInfoBottom.getForm().findField('dailyReport').setValue(campusInfo[0].dailyRptLnkYn);
			formInfoBottom.getForm().findField('income').setValue(campusInfo[0].incomeLnkYn);
			formInfoBottom.getForm().findField('house').setValue(campusInfo[0].companyHouseLnkYn);
			formInfoBottom.getForm().findField('creditCardTerminal').setValue(campusInfo[0].creditCardTrmlUseYn);
			formInfoBottom.getForm().findField('onlinePayment').setValue(campusInfo[0].onlineAccYn);
			
			var category = '';
			for(var i = 0; i < homepageTypeList.length; i++) {
				category += homepageTypeList[i].useYn == 'Y' ? homepageTypeList[i].homepageTypeName + ',' : '';
			}
			if(category != '') {
				category = category.substr(0, category.length - 1).replaceAll(',', " \/ ");
			}
			formInfoBottom.getForm().findField('category').setValue(category);
			
			var imageUrl = json.imageUrl;
			imageUrl += campusInfo[0].sFilePath + campusInfo[0].sActualFileName;
			console.log(imageUrl);
			newImage.setSrc(imageUrl);
//			newImage.setSrc('http://localhost:8080/ibis/resources/img/sunsets-04.jpg');
//			formInfoBottom.doLayout();
		}
		
		
		
		/*--End--*/
	}
});