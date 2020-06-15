Ext.define('ext.view.serviceSetting.categoryManagement.popup.UploadFileCounselPopup', {
	extend: 'component.MeWindow',
	title: 'Upload File',
	width: 320,
	defaultWidth: 320,
	layout: 'vbox',
	reloadPopup: function() {},
	reloadParent: function() {},
	initComponent: function() {
		
		let me = this;
		
		me.reloadPopup = function() {
			formInfo.reset();
			me.show();
		}
		
		let formInfo = Ext.create('Ext.form.Panel', {
			width: '100%', border : false, bodyPadding: 10,
			layout: 'vbox',
			items: [
				{xtype: 'metext', width: '100%', labelWidth: 50, name: 'title', fieldLabel: 'File Title'},
	             {xtype: 'mefile', fieldLabel: 'File', labelWidth: 50, width: '100%', name: 'fileUploadList', 
	            	 regex: (/.(pdf)$/i), regexText: 'Only doc files allowed for upload',
	            	 accept: `
	            		 application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, 
	            		 application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, 
	            		 application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-excel
	            	 `
	             }
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
           	 		{xtype: 'mebutton', text: 'Upload',
			            handler: function() {
			            	uploadFile();
			            }
           	 		}
       	 		]
            }
        ];
		this.callParent(arguments);
		
		function uploadFile() {
			try {
				if(!formInfo.getForm().isValid()) {
					throw new Error();
	    		}
				let file = getFormField(formInfo, 'fileUploadList');
            	let files = file.fileInputEl.dom.files;
				if(files[0].size > 10 * 1024 * 1024) {
					throw new Error('File size < 10Mb');
				}
	    		formInfo.getForm().submit({
	    			url: CONTEXT_PATH + '/general/uploadFileList',
					encType : 'multipart/form-data',
					waitMsg: 'Uploading your file...',
					success : function(fp, res) {
						let json = Ext.JSON.decode(res.response.responseText);
						if(json.actionStatus == 'error') {
							showMessageBoxWarning(json.message);
							return;
						}
						let fileInfo = json.data[0];
						let title = getFormField(formInfo, 'title').getValue().trim();
						fileInfo.alternateFileName = title;
						me.reloadParent(fileInfo);
						me.hide();
	                },
	                error: function(fp, response) {
						showMessageBoxWarning(response.statusText);
	                },
	                failure: function(fp, response) {
	                	showMessageBoxWarning(response.statusText);
	                }
				}); 
			}catch(e) {
				handleException(e);
			}
		}
		
		/*--End--*/
	}
});
