Ext.define('ext.view.common.popup.UploadImagePopup', {
	extend: 'component.MeWindow',
	title: 'Upload Image',
	width: 320,
	defaultWidth: 320,
	layout: 'vbox',
	reloadPopup: function() {},
	reloadParent: function() {},
	initComponent: function() {
		
		let me = this;
		
		me.reloadPopup = function() {
			formUploadFile.reset();
			me.show();
		}
		
		let formUploadFile = Ext.create('Ext.form.Panel', {
			width: '100%', 
			border: false, 
			bodyPadding: 10,
			layout: 'vbox',
			items: [
				{xtype: 'mefile', fieldLabel: 'Image', labelWidth: 45, width: '100%', name: 'fileUploadList',
					regex: (/.(gif|jpg|jpeg|png)$/i), regexText: 'Only image files allowed for upload',
					accept: 'image/*',
					listeners: {
					  	afterrender: function(cmp) {
				            cmp.fileInputEl.set({
				                accept: 'image/*'
				            });
				        }
				  	}
				}
            ]
		});
		
		this.items = [formUploadFile];
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
				if(!formUploadFile.getForm().isValid()) {
					throw new Error();
	    		}
				let file = getFormField(formUploadFile, 'fileUploadList');
            	let files = file.fileInputEl.dom.files;
				if(files[0].size > 10 * 1024 * 1024) {
					throw new Error('File size < 10Mb');
				}
	    		formUploadFile.getForm().submit({
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
