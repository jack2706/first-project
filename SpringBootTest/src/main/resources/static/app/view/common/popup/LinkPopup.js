Ext.define('ext.view.common.popup.LinkPopup', {
	extend : 'component.MeWindow',
	title : 'Link Popup',
	width : 700,
	layout: 'fit',
	height: 560,
	reloadPopup: function() {},
	initComponent : function() {
		
		var me = this;
		
		me.reloadPopup = function(data) {
			me.show();
		}
		
		var campusStore = Ext.widget('mestore');
		var campusStoreOpt = getStoreOpt(false, 'All', '', false, '', true);
		
		var campusCombo = Ext.widget('mecombo', {
			flex: .5, 
			labelWidth: 85, 
			fieldLabel: 'Campus',  
			allowBlank: false,
			store: campusStore, 
			valueField: 'clientCode', 
			displayField: 'clientEnName', 
			queryMode: 'local', 
			editable: false,
			listeners: {
				change: function (field, newValue, oldValue) {
					if(this.value != null) {
						 clientSelect();
					}
		        }
			}
		});
		
		var writingProgram = Ext.create('Ext.Button', {
			cls: 'btni-link', 
			height: 72, 
			widht: 160, 
			padding: 0, 
			margin: '40 15 0 0', 
			border: false, 
			text: '', 
    		html: '<img src=' + CONTEXT_PATH + '/resources/common/images/admin/icms.png alt="icms">',
    		info: {systemCode: 'LB', systemName: 'icms'},
    		handler: function() {
    			selectProgram(this.info);
    		}
        });
		var mainPanel = Ext.widget('form', {
			width: '100',
			layout: 'vbox',
			padding: 20,
			border: false,
			items: [
				{xtype: 'container', width: '100%', padding: '10 10 0 10', layout: 'hbox',
					style: 'border: 1px solid #b5b8c8; border-radius: 3px;',
					items: [
				        {xtype: 'medisplayfield', name: 'name', fieldLabel: 'NAME:', value: LOGIN_INFO.memberName, labelWidth: 40, flex: .5},
				        campusCombo
					]
				},
				writingProgram
	        ]
		});
		
		writingProgram.hide();
		
		this.items = [mainPanel];
		this.callParent(arguments);
		
		function getCampusListTestCenter(){
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
					campusCombo.setValue(json.currentClientCode);
					clientSelect();
				},
				autoLoad: true
			});
			
		}
		getCampusListTestCenter();
		
		function selectProgram(info) {
			mask();
		    if(info.systemCode == 'LB') {
		    	var campusRecord = campusCombo.findRecordByValue(campusCombo.getValue());
		    	if(campusRecord == null) {
		    		return;
		    	}
		    	var params = {
	    			programCode		: info.systemCode,
					clientCode		: campusRecord.data.clientCode,
					clientMemCode	: campusRecord.data.clientMemCode	
		    	}
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
		
		function clientSelect() { 
			writingProgram.hide();
			var campusRecord = campusStore.findRecord('clientCode', campusCombo.getValue());
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
						if(data.systemCode == "TLES_"+'LB'){
							writingProgram.show();
						}
		            });
				},
				autoLoad: true
			});
		}
		
		/*--End--*/
	}
});
