Ext.define('ext.view.counselService.newEnrolledStudent.component.AddCategoryPopup', {
	extend: 'component.MeWindow',
	title: 'Counsel Category Add',
	width: 900,
	defaultWidth: 900,
	layout: 'fit',
	bodyPadding: 5,
	reloadPopup: function() {},
	reloadParent: function() {},
	initComponent : function() {
		
		let me = this;
		
		me.reloadPopup = function() {
			mainForm.reset();
			mainTab.setActiveTab(0);
			me.show();
		}
		
		let checkboxSelect = {
			mouseup: {
	            element: 'el',
	            fn: function (e, el) {
	            	let self = this.component;
	            	setTimeout(function() {
	            		self.nextSibling().items.items.forEach(s => {
			        		s.setValue(self.value);
			        	})
	            	}, 100)
	            }
	        }
		}
		let checkboxGroupSelect = {
			mouseup: {
	            element: 'el',
	            fn: function (e, el) {
	            	let self = this.component;
	            	setTimeout(function() {
	            		let childUncheck = _(self.items.items)
	            			.find(s => s.value == false);
	            		self.previousSibling().setValue(childUncheck == undefined);
	            	}, 100)
	            }
	        }
		}
		let mainTab = Ext.widget('tabpanel', {
			layout: 'fit',
			activeTab: 0,
			cls: 'category-popup',
			items: [
				{xtype: 'tabpanel', title: 'Academy Counsel', layout: 'fit', border: false, padding: 5,
					items: [
						{xtype: 'container', title: 'Achievement', padding: 5,
							layout: {
								type: 'table',
								columns: 4,
								tdAttrs: {style: 'vertical-align: top;'}
							},
							items: [
								{xtype: 'displayfield', width: '100%', margin: '-40 0 0 0'},
								{xtype: 'displayfield', width: '100%', margin: '-40 0 0 0'},
								{xtype: 'displayfield', width: '100%', margin: '-40 0 0 0'},
								{xtype: 'displayfield', width: '100%', margin: '-40 0 0 0'},
								{xtype: 'container', width: '100%', layout: 'vbox',
									items: [
										{xtype: 'checkbox', width: '100%', boxLabel: 'Formative Assessment', margin: 0, cls: 'checkbox-label-bold', listeners: checkboxSelect},
										{xtype: 'checkboxgroup', width: '100%', columns: 1, vertical: true, name: 'group', cls: 'checkboxgroup-nopadding', listeners: checkboxGroupSelect,
											items: [
												{boxLabel: 'Item 1', name: 'group', inputValue: '1'},
												{boxLabel: 'Item 1', name: 'group', inputValue: '2'},
											]
										}
									]
								},
							]
						},
					]
				},
			]
		});
		
		let mainForm = Ext.widget('form', {
			border: false,
			layout: 'fit',
			items: [mainTab]
		})
		let btnApply = Ext.widget('button', {
			text: 'Apply', 
			iconCls: 'fas fa-check btn-icon', 
			padding: '8 10',
       	 	handler: function() {
       	 		apply();
       	 	}
		})
		
		this.items = [mainForm];
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
		
		init();
		let initData;
		async function init() {
			try {
        		let json = await getDataAjax('/serviceSettingController/getCategoryListToBuild.json', {});
        		let data = json.data;
        		initData = data;
        		setFullTitle();
        		let root = {
    				items: []
    		    };
        		buildTabs(data, root.items, 0);
        		root.items.forEach(s => {
        			s.items.forEach(a => {
            			a.items.unshift({xtype: 'displayfield', width: '100%', margin: '-40 0 0 0'});
            			a.items.unshift({xtype: 'displayfield', width: '100%', margin: '-40 0 0 0'});
            			a.items.unshift({xtype: 'displayfield', width: '100%', margin: '-40 0 0 0'});
            			a.items.unshift({xtype: 'displayfield', width: '100%', margin: '-40 0 0 0'});
            		})
        		})
        		mainTab.removeAll();
        		mainTab.add(root.items);
				unMask();
        	}catch(e) {
        		handleException(e);
        	}
		}
		function buildTabs(data, items, parentCode) {
			data.forEach(s => {
				if(s.parentCatCode == parentCode) {
					let self = getItemByLevel(s);
					items.push(self);
					buildTabs(data, s.treeLevel != 3 ? self.items : self.items[1].items, s.categoryCode);
				}
				if(s.treeLevel == 4) {
					return;
				}
			})
		}
		function getItemByLevel(info) {
			switch(info.treeLevel) {
				case 1: 
					return {
						xtype: 'tabpanel', title: info.categoryName, layout: 'fit', border: false, padding: 5, activeTab: 0,
						items: []
					}
					break;
				case 2: 
					return {
						xtype: 'container', title: info.categoryName, padding: 5,
						layout: {
							type: 'table',
							columns: 4,
							tdAttrs: {style: 'vertical-align: top;'}
						},
						items: []
					}
					break;
				case 3: 
					return {
						xtype: 'container', width: '100%', layout: 'vbox',
						items: [
							{xtype: 'checkbox', width: '100%', boxLabel: info.categoryName, margin: 0, cls: 'checkbox-label-bold', listeners: checkboxSelect},
							{xtype: 'checkboxgroup', width: '100%', columns: 1, vertical: true, name: 'group', cls: 'checkboxgroup-nopadding', listeners: checkboxGroupSelect,
								items: []
							}
						]
					}
					break;
				case 4: 
					return {boxLabel: info.categoryName, name: 'group', inputValue: info.categoryCode, title: info.title, items: []};
					break;
			}
		}
		function setFullTitle() {
			let categoryLv4 = _(initData)
				.filter(s => s.treeLevel == 4)
				.map(s => {
					s.title = [];
					return s;
				})
				.value();
			
			categoryLv4.forEach(s => {
				let higherInfo;
				let parentCode = s.parentCatCode;
				for(let i = 0; i < 3; i++) {
					higherInfo = _(initData)
						.find(a => a.categoryCode == parentCode);
					if(higherInfo == undefined) {
						continue;
					}
					s.title.push(higherInfo.categoryName);
					parentCode = higherInfo.parentCatCode;
				}
				s.title = _(s.title)
					.reverse()
					.join(' > ');
			})
			
			let parentData = _(categoryLv4)
				.map(s => {
					return {
						categoryCode	: s.categoryCode,
						title			: s.title
					}
				})
				.value();
			me.giveDataToParent(_.cloneDeep(parentData));
		}
		
		function apply() {
			try {
				let result = [];
				mainForm.getForm().getFields().each(function(s) {
					if(s.getXType() == 'checkboxgroup') {
						s.items.items.forEach(a => {
							if(a.value == true) {
								result.push({
									categoryCode	: a.inputValue,
									title			: a.title,
									parentsQuestion	: '',
									counselAnswer	: '',
									parentsRequest	: '',
									issueComment	: '',
									solutionGbn		: '',
									solutionComment	: '',
									planYn			: 'N',
								});
							}
						})
					}
				});
				me.reloadParent(result);
				me.hide();
			}catch(e) {
				handleException(e);
			}
		}
		
//	END
	}
});

