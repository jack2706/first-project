Ext.define('ext.view.serviceSetting.categoryManagement.CategoryManagement', {
	extend: 'Ext.form.Panel',
	header: false,
	width : '100%',
	border: false,
	layout: 'border',
	writeAuth: true,
	initComponent : function() {
		
		let me = this;
		
		let categoryRegisterPopup = Ext.create('ext.view.serviceSetting.categoryManagement.popup.CategoryRegisterPopup', {
			reloadParent: function() {
				init();
			}
		});
		let orderCategoryPopup = Ext.create('ext.view.serviceSetting.categoryManagement.popup.OrderCategoryPopup', {
			reloadParent: function() {
				init();
			}
		});
		let searchStudentPopup = Ext.create('ext.view.serviceSetting.categoryManagement.popup.SearchStudentPopup');
		let categoryToolbar = Ext.create('Ext.toolbar.Toolbar', {
            dock: 'top',
            width: 'auto',
            items: [
            	{xtype: 'button', iconCls: 'fas fa-retweet btn-icon', itemId: 'order', margin: 0, disabled: true,
            		handler: function() {
            			let nodeSelected = categoryTree.getSelectionModel().getSelection();
            			orderCategoryPopup.reloadPopup(nodeSelected[0].data.info);
		    		}
            	},
            	{xtype: 'tbfill'},
            	{xtype: 'button', iconCls: 'fas fa-user-plus btn-icon', margin: 0, itemId: 'add', disabled: true,
            		handler: function() {
            			let nodeSelected = categoryTree.getSelectionModel().getSelection();
            			categoryRegisterPopup.reloadPopup(nodeSelected[0].data.info);
		    		}
            	},
            	{xtype: 'button', iconCls: 'fa fa-trash btn-icon', width: 31, height: 31, margin: '0 5 0 1', itemId: 'delete', disabled: true,
            		handler: function() {
            			
		    		}
            	}
            ]
        });
		let categoryStore = Ext.create('Ext.data.TreeStore', {
		    root: {
		        expanded: true,
		        children: [
		            {text: 'detention'},
		            {text: 'homework', expanded: false, 
		            	children: [
			                {text: 'book report', leaf: true},
			                {text: 'algebra', leaf: true}
		                ]
		            },
		            {text: 'buy lottery tickets'}
		        ]
		    }
		});
		let categoryTree = Ext.create('Ext.tree.Panel', {
		    width: '100%',
		    flex: 1,
		    autoScroll: true,
		    store: categoryStore,
		    rootVisible: false,
		    tbar: categoryToolbar,
		    listeners: {
		    	itemclick: function(item, node) { 
	            	let info = node.data.info;
	            	info.leaf = node.data.leaf;
	            	getCategoryCampusInfo(info);
            	}
	        }
		});
		
		let uploadFileCounselPopup = Ext.create('ext.view.serviceSetting.categoryManagement.popup.UploadFileCounselPopup', {
			reloadParent: function(info) {
				attachFileStore.add(info);
			}
		});
		let attachFileStore = Ext.widget('mestore');
		let attachFileGrid = Ext.create('Ext.grid.Panel',{
			columnWidth: 1,
			height: 200,
			store: attachFileStore,
			viewConfig: {
                getRowClass: function (record) {
                    return record.get('deleteFlag') == true ? 'hide-row-grid' : '';
                }
            },
			tbar: [
				{xtype: 'tbfill'},
				{xtype: 'button', text: 'Attachment File', iconCls: 'fa fa-upload',
                	handler: function() {
                		uploadFileCounselPopup.reloadPopup();
                	}
                }
			],
			listeners: { 
			    cellclick: function(view, cell, cellIndex, record, row, rowIndex, e) {
			    	console.log(record.data)
			    	let action = $(e.target).attr('action');
			    	if(action == 'delete') {
			    		if(record.data.uploaded == false) {
			    			attachFileStore.remove(record);
			    			return;
			    		}
			    		record.data.deleteFlag = true;
			    		attachFileGrid.getView().refresh();
			    	}
			    	if(action == 'download') {
			    		downloadFile(record.data);
			    	}
			    }
		 	},
			columns: [
				{text: 'File Title', flex: 1, dataIndex: 'alternateFileName', sortable: false, menuDisabled: true},
				{text: 'File Name', flex: 1, dataIndex: 'userFileName', sortable: false, menuDisabled: true},
				{text: 'File Size', width : 100, dataIndex: 'fileSize', align : 'center', sortable: false, menuDisabled: true,
					renderer: function(value, demo, record) {
						return value != '' ? formatSizeUnits(value) : '';
					}
				},
				{text: '', align: 'center', sortable: false, menuDisabled: true,
					renderer: function (value, metaData, record, row, col, store, gridView) {
						return `<a href="#" action="download" class="fas fa-download grid-icon"> Download</a>`;
	                }
		        },
		        {text: '', align: 'center', sortable: false, menuDisabled: true,
	                renderer: function(value, rootRecord, record) {
	                	return `<a href="#" action="delete" class="fa fa-trash grid-icon"> Delete</a>`;
	           		}
		        }
			]
		});
		
		let assignmentCounselFilePopup = Ext.create('ext.view.serviceSetting.categoryManagement.popup.AssignmentCounselFilePopup', {
			reloadParent: function(data) {
				data.forEach(s => {
					if(counselFileStore.findRecord('fileCode', s.fileCode) == null) {
						counselFileStore.add(s);
					}
				})
			}
		});
		let counselFileStore = Ext.widget('mestore');
		let counselFileGrid = Ext.create('Ext.grid.Panel',{
			columnWidth: 1,
			height: 200,
			store: counselFileStore,
			tbar: [
				{xtype: 'tbfill'},
				{xtype: 'button', text: 'Assignment Counsel File',
                	handler: function() {
                		assignmentCounselFilePopup.reloadPopup();
                	}
                }
			],
			listeners: { 
			    cellclick: function(view, cell, cellIndex, record, row, rowIndex, e) {
			    	let action = $(e.target).attr('action');
			    	if(action == 'delete') {
			    		counselFileStore.remove(record);
			    	}
			    	if(action == 'preview') {
			    		previewCounselFile(record.data);
			    	}
			    	if(action == 'download') {
			    		downloadCounselAttachFile(record.data.attachFileCode);
			    	}
			    }
		 	},
			columns: [
        		{text: 'File Title', flex: 1, minWidth: 200, dataIndex: 'title', align: 'center', sortable: false, menuDisabled: true},
				{text: 'File Type', width: 120, dataIndex: 'fileTypeName', align: 'center', sortable: false, menuDisabled: true},
				{text: '', align: 'center', sortable: false, menuDisabled: true,
	                renderer: function(value, metaData, record, row, col, store, gridView) {
	                	if(record.data.fileType == 'U') {
	                		return `<a href="#" action="preview" class="grid-icon">Preview</a>`;
	                	}
	                	if(record.data.attachFileCode != 0) {
	                		return `<a href="#" action="download" class="grid-icon">Download</a>`;
	                	}
	           		}
		        },
				{text: '', align: 'center', sortable: false, menuDisabled: true,
	                renderer: function(value, metaData, record, row, col, store, gridView) {
	                	return `<a href="#" action="delete" class="fa fa-trash grid-icon"> Delete</a>`;
	           		}
		        }
        	]
		});
		
		let formInfo = Ext.create('Ext.form.Panel', {
			width: '100%',
			flex: 1,
			border: false,
			autoScroll: true,
			bodyPadding: 5,
			layout: 'vbox',
			items: [
				{xtype: 'mearea', width: '100%', labelWidth: 105, fieldLabel: 'Counsel Tip', name: 'tip'},
				{xtype: 'container', width: '100%', layout: 'column', margin: '0 0 10 0',
		        	items: [
		        		{xtype: 'melabel', text: 'Attachment File', width: 110},
		        		attachFileGrid
	        		]
		        },
		        {xtype: 'container', width: '100%', layout: 'column', margin: '0 0 10 0',
		        	items: [
		        		{xtype: 'melabel', html: 'Counsel File', width: 110}, //Counsel File <span style="color: red;">*</span>
		        		counselFileGrid
	        		]
		        },
		        
	        ]
		});
		let btnSave = Ext.widget('mebutton', {
	    	text: 'Save', 
	    	iconCls: 'far fa-save btn-icon', 
	    	padding: '8 10',
	    	handler: function() {
	    		saveCampusCategory();
			}
	    });
	    let btnResetHq = Ext.widget('mebutton', {
	    	text: 'Reset Headquaters Content', 
	    	iconCls: 'fas fa-sync-alt btn-icon', 
	    	padding: '8 10',
	    	margin: '0 0 0 5',
	    	handler: function() {
	    		resetHqContent();
			}
	    });
		
		let leftPanel = Ext.widget('panel', {
			width: '20%',
			layout: 'vbox',
			border: false,
			region: 'center',
			split: true,
			bodyPadding: 5,
			items: [categoryTree]
		});
		let rightPanel = Ext.widget('form', {
			region: 'east',
			collapsible: true,
			border: false,
			header: false,
			layout: 'vbox',
			width: '80%',
			split: true,
	        items: [
	        	{xtype: 'metext', width: '100%', labelWidth: 105, fieldLabel: 'Category', name: 'categoryName', allowBlank: false, margin: 5},
	        	{xtype: 'mecheckboxfield', width: '100%', labelWidth: 105, fieldLabel: 'Use Y/N', name: 'useYn', margin: '0 0 0 5'},
	        	formInfo,
	        	{xtype: 'container', width: '100%', layout: 'hbox', style: 'border-top: 1px solid #ccc;', padding: 5, hidden: !me.writeAuth, 
	        		items: [
	        			{xtype: 'tbfill'}, btnSave, btnResetHq
	        		]
	        	}
        	]
		});
		
		this.items = [leftPanel, rightPanel];
		this.callParent(arguments);
		
		init();
		
		let headYn;
		async function init() {
			try {
        		let json = await getDataAjax('/serviceSettingController/getCategoryList.json', {});
        		let data = json.data;
        		headYn = json.headYn;
        		
        		let root = {
    		        expanded: true,
    		        children: []
    		    };
        		buildCategoryRoot(data, root.children, 0);
        		categoryStore.setRoot(root);
        		
        		categoryToolbar.getComponent('order').setDisabled(true);
        		categoryToolbar.getComponent('add').setDisabled(true);
        		categoryToolbar.getComponent('delete').setDisabled(true);
        		categoryToolbar.setHidden(headYn == 'N');
        		getFormField(rightPanel, 'useYn').setHidden(headYn == 'N');
        		btnResetHq.setHidden(headYn == 'Y');
        		rightPanel.setDisabled(true);
				unMask();
        	}catch(e) {
        		handleException(e);
        	}
		}
		function buildCategoryRoot(data, children, parentCode) {
			data.forEach(s => {
				if(s.parentCatCode == parentCode) {
					let item = {
						id			: s.categoryCode,
						text		: s.categoryName,
						leaf		: s.treeLevel == 4 ? true : false,
						children	: [],
						info		: s
					};
					children.push(item);
					buildCategoryRoot(data, item.children, s.categoryCode);
				}
				if (s.treeLevel == 4) {
					return;
				}
			})
		}
		
		async function getCategoryCampusInfo(category) {
			try {
				getFormField(rightPanel, 'categoryName').setValue(category.categoryName);
				getFormField(rightPanel, 'useYn').setValue(category.useYn == 'Y');
				rightPanel.categoryInfo = category;
				categoryToolbar.getComponent('order').setDisabled(false);
				categoryToolbar.getComponent('add').setDisabled(category.leaf == true);
				btnResetHq.setDisabled(category.leaf == false);
				rightPanel.setDisabled(false);
				if(category.leaf == false) {
					formInfo.setDisabled(true);
					formInfo.reset();
					attachFileStore.removeAll();
					counselFileStore.removeAll();
					return;
				}else {
					formInfo.setDisabled(false);
				}
				
        		let json = await getDataAjax('/serviceSettingController/getCategoryCampusInfo.json', category);
        		let data = json.data;
        		loadFormInfo(data);
				unMask();
        	}catch(e) {
        		handleException(e);
        	}
		}
		function loadFormInfo(data) {
			let info = data.info;
			if(info == null) {
    			formInfo.reset();
    			formInfo.attachFileCode = 0;
    			attachFileStore.removeAll();
    			counselFileStore.removeAll();
    			return;
    		}
			getFormField(formInfo, 'tip').setValue(info.counselTip);
			let counselFile = data.counselFile,
				attachFile = data.attachFile;
			formInfo.attachFileCode = info.attachFileCode;
			if(counselFile.length > 0) {
				counselFileStore.loadData(counselFile);
			}else {
				counselFileStore.removeAll();
			}
			if(attachFile.length > 0) {
				attachFileStore.loadData(attachFile);
			}else {
				attachFileStore.removeAll();
			}
		}
		
		async function saveCampusCategory() {
			try {
				if(!formInfo.isValid()) {
					throw new Error();
				}
				let categoryInfo = rightPanel.categoryInfo;
				let leafYn = categoryInfo.leaf == true ? 'Y' : 'N';
				let params = {
					categoryCode	: categoryInfo.categoryCode,
					categoryName	: getFormField(rightPanel, 'categoryName').getValue().trim(),
					useYn			: getFormField(rightPanel, 'useYn').getValue() == true ? 'Y' : 'N',
					deleteYn		: 'N',
					leafYn			: categoryInfo.leaf == true ? 'Y' : 'N',
					counselTip		: getFormField(formInfo, 'tip').getValue().trim()
				};
				let attachFileList = [];
				let counselFileList = [];
				if(leafYn == 'Y') {
					params.attachFileCode = formInfo.attachFileCode;
					attachFileStore.each(function(record) {
						attachFileList.push(record.data);
		 			});
					counselFileStore.each(function(record) {
						counselFileList.push(record.data);
		 			});
				}
				let paramsAjaxJson = {
					params			: params,
					counselFileList	: counselFileList,
					attachFileList	: attachFileList,
				}
//				console.log(paramsAjaxJson);
				await saveDataAjaxJson('Do you want to save ?', '/serviceSettingController/saveCampusCategory.json', Ext.JSON.encode(paramsAjaxJson), 'Save Successfully.', 'Category Management');
				getCategoryCampusInfo(rightPanel.categoryInfo);
        	}catch(e) {
        		handleException(e);
        	}
		}
		function previewCounselFile(info) {
			if(info.systemCode == 'LC') {
//				PLC
				searchStudentPopup.reloadPopup(info);
			}
			if(info.systemCode == '') {
				let urlLink = info.url;
				window.open(urlLink, '_blank');
			}
		}
		async function resetHqContent() {
			try {
				let categoryInfo = rightPanel.categoryInfo;
				let params = {
					categoryCode: categoryInfo.categoryCode,
				};
				await saveDataAjax('Do you want to reset ?', '/serviceSettingController/resetHqContent.json', params, 'Reset Successfully.', 'Category Management');
				getCategoryCampusInfo(rightPanel.categoryInfo);
        	}catch(e) {
        		handleException(e);
        	}
		}
		
//	END
	}
});

