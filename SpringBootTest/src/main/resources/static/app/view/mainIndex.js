Ext.define('ext.view.mainIndex', {
	alias : 'widget.mainIndex',
	extend : 'Ext.container.Container',
	border: false,
	cls: 'wrapper-page',
	width: "100%",
	height: "100%",
	minWidth: 1280,
	initComponent : function() {
		
		var me = this;
		var campusStore = Ext.widget('mestore');
		var campus = Ext.widget('mecombo', {
			cls: 'form-controls select-box pull-right', 
			margin: 0,
			store: campusStore,
			displayField: 'clientEnName',
		    valueField: 'clientCode',
			queryMode: 'local', 
			editable: false,
			listeners: {
				change: function() {
					if(this.value != null){
						clientSelect();
					}
				}
			}
		});
		
		var felixName = Ext.widget('medisplayfield', {
			cls: 'form-name', 
			fieldLabel: 'NAME', 
			labelSeparator: ' :', 
			padding:'0', 
			labelWidth: 55, 
		})
		var headerTop = Ext.widget('container', {
			width: 1036,
			height: 277,
			cls: 'page-header',
			padding: '50 0 0',
			items: [
		        {xtype: 'image', cls: "logo", border: false, width: 230, src: CONTEXT_PATH + '/resources/common/images/admin/admin_logo.png', },
				{xtype: 'label', cls: 'sologan', padding: '5 0 10', width: '100%', xtype: 'label', text: 'TEACHING LEARNING EVALUATION SYSTEM'},
				{xtype: 'form', border : false, header: false, cls: 'wrap-control', padding: '42 56 0 30', height: 111, bodyStyle: "background: none;",
					 layout : 'column' ,
					items : [
				         {xtype: 'container', cls:'text-left', width: null,columnWidth : 0.75,
				        	 items: [
								felixName,
								{xtype: 'button', cls: 'btn-logout', padding: 0, margin:'4 0 0', border: false, width: 80, height: 25, text: '', 
									html: '<img src=' + CONTEXT_PATH + '/resources/common/images/admin/btn_logout.jpg alt="Logout">',
									handler: function() {
										logout();
									}
								}
				        	 ]
				         },
				         {xtype: 'container', width: null, columnWidth : 0.25,
				        	 items: [
			        	         campus
				        	 ]
				         }
			        ]
				}
			]
		});
		var iesOperationProgramButton = Ext.create('Ext.Button',{
			 xtype: 'button', cls: 'btni-link', height: 72, widht: 160, padding: 0, margin: '15 15 0 0', border: false, text: '', 
			 html: '<img src=' + CONTEXT_PATH + '/resources/common/images/admin/icms.png alt="LIBMS">',
			 info: {systemCode: 'IC', systemName: 'ICMS'},
			 handler: function() {
				 selectProgram(this.info);
			 }
		});
		iesOperationProgramButton.hide();
		var mainPanel = Ext.widget('container', {
			width: 1036,
			autoHeight: true,
			cls: 'page-main',
			padding: '0 0 0 5',
			items: [
		        {xtype: 'container', width: 990, cls: 'title-lb', padding: '12 0 12 5', margin: '18 0 0',
		        	items: [
	        	        {xtype: 'label', cls: 'name', padding: "0 24 0 0", text: 'System'}
        	        ]
		        },
		        {xtype:'container', width: "100%", cls: 'page-mains', padding: '0 0 0 5',
		        	items: [
	        	        iesOperationProgramButton
        	        ]
		        },
		        {xtype:'container', width: 1000, cls: 'title-lb', padding: '12 0 12 5', margin: '18 0 0',
		        	items: [
	        	        {xtype: 'label', cls: 'name', padding: "0 24 0 0", text: 'System'}
        	        ]
		        },
		        {xtype:'container', width: 1000, cls: 'title-lb', padding: '12 0 12 5', margin: '18 0 0',
		        	items: [
	        	        {xtype: 'label', cls: 'name', padding: "0 24 0 0", text: 'System'}
        	        ]
		        },
	        ]
		});
		//PASM: Performance Analytics Management System (PLC)

		this.items = [headerTop, mainPanel];
		this.callParent(arguments);
		
		Ext.Ajax.request({
			url : CONTEXT_PATH + '/main/getPermissionClientList.json',
			params : {},
			success : function(response) {
				var json = Ext.decode(response.responseText);
				var list = json.clientList;
				
				list.sort(function(a, b) {
					if((a.clientEnName.toLowerCase().indexOf("★") >-1) &&( b.clientEnName.toLowerCase().indexOf("★")==-1)){
						return -1;
					}
					if((b.clientEnName.toLowerCase().indexOf("★") >-1) &&( a.clientEnName.toLowerCase().indexOf("★")==-1)){
						return  1;
					}
					if (a.clientEnName.toLowerCase() < b.clientEnName.toLowerCase())
						return -1;
					if (a.clientEnName.toLowerCase() > b.clientEnName.toLowerCase())
						return 1;
					return 0;
            	});
				
				campusStore.loadData(list);
				campus.setValue(campusStore.first());
				felixName.setValue(json.memberName);
			},
			autoLoad: true
		});
		
		function clientSelect() { 
			iesOperationProgramButton.hide();
		    var campusRecord = campusStore.findRecord('clientCode', campus.getValue());
		    if(campusRecord == null) {
		    	return;
		    }
		    Ext.Ajax.request({
				url : CONTEXT_PATH + '/main/getEmployeePermissionSystems.json',
				params : {
					clientCode 		: campusRecord.data.clientCode,
					clientMemCode	: campusRecord.data.clientMemCode
				},
				success : function(response) {
					var json = Ext.decode(response.responseText);
					Ext.each(json.systemList, function (data) {
//						if(data.systemCode == 'TLES_CA'){
						if(data.systemCode == "TLES_"+'IC'){
							iesOperationProgramButton.show();
						}
		            });
				},
				autoLoad: true
			});
		}
		
		function selectProgram(info) {
			mask();
		    if(info.systemCode == 'IC') {
		    	var params = {
	    			programCode		: info.systemCode,
					clientCode		: campus.getValue(),
					clientMemCode	: campus.findRecordByValue(campus.getValue()).data.clientMemCode	
		    	}
		    	console.log(params)
			    Ext.Ajax.request({
					url : CONTEXT_PATH + '/main/selectProgram.json',
					params : params,
					success : function(response) {
						unMask();
						document.location.href = CONTEXT_PATH + "/main/index.kps";
					},
					error : function(response) {				
						unMask();
						showMessageBoxWarning('Error');
					},
					failure : function(response) {				
						unMask();
						showMessageBoxWarning('Failure');
					}
				});
		    }else{
		    	goToExternalSystem(info.systemCode, info.systemName);
		    }
		}
		
		function goToExternalSystem(systemCode, systemName) {
		    Ext.Ajax.request({
				url : CONTEXT_PATH + '/main/encodeParams.json',
				params : {
					systemCode: systemCode,
					systemName: systemName,
					clientCode: campus.getValue()
				},
				success : function(response) {
					var json = Ext.decode(response.responseText);
					switch(systemCode) {
						case 'EM' : //KEMS
						case 'LC' : //LCMS
						case 'TP' :	//Teacher Page
						case 'EP' :	//e-POLY
						case 'PT' :	//POLY Test
							window.open("http://118.69.34.2:20015/NewIndex.aspx?Type=Java&WebID=" + json.data.webId + 
									"&PW=" + json.data.webPass + "&SystemCode=" + json.data.systemCode + 
									"&SystemName=" + json.data.systemName + "&ClientCode=" + json.data.clientCode);
							break;
						case 'HP' :	//Campus Homepage
							window.open("http://vnadminhp.koreapolyschool.com/index.do?token=Jy6H4PznLFTzEnsnCc%2b4CgdMo1Kvwwx9v5GqqaD9zuL1FIZo0lZCYal%2fFgQ1JosgknqTEhxGozPAkC%2f11SpwHQ%3d%3d");
							break;
						case 'KS' :	//KAS
							var result = "memberCode=" + json.data.memberCodeKas + "&clientCode=" + json.data.clientCodeKas;
				 	    	window.open("http://118.69.34.2:8081/kas/login/loginProc.kps?" + result, '_blank', '');
							break;
						case 'NP' :	//New e-POLY
							var result = json.data.memberCode;
		  	                window.open("http://118.69.34.2:8081/mgmt/main/LoginFrKIS.jsp?skey=" + result, '_blank', 'width=1280,height=760,scrollbars=yes,resizable=yes');
							break;
						case 'SE' :	//step up e-POLY
							var result = json.data.memberCode;
		  	                window.open("http://118.69.34.2:8081/stepUpBack/main/LoginFrKIS.jsp?skey=" + result, '_blank', 'width=1280,height=760,scrollbars=yes,resizable=yes');
							break;
					}
					Ext.get(document.body).unmask();
				},
				error : function(response) {				
					unMask();
					showMessageBoxWarning('Error');
				},
				failure : function(response) {				
					unMask();
					showMessageBoxWarning('Failure');
				}
			});
		}
		
		function logout() {
			document.location.href = CONTEXT_PATH + "/Logout.kps";
		}
		
//		End
	}
});
