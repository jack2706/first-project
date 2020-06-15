Ext.define('ext.view.serviceSetting.checkListMgmt.popup.checkListOrderPopup', {
	extend: 'component.MeWindow',
	title: 'Checklist ordering',
	width: 900,
	//height: 400,
	layout: 'vbox',
	reloadPopup: function() {},
	reloadParent: function() {},
	initComponent : function() {
		var clientCode = '';
		var me = this;
		var event = {};		
		var classificationStore = Ext.widget('mestore',{
		});
		var mainStore = Ext.widget('mestore', {
			proxy : {
				type : 'ajax',
				url : CONTEXT_PATH
						+ '/checkListMgmt/getListChecklist.json',
				reader : {
					type : 'json',
					enablePaging : true,
					rootProperty : 'listCheckList',
					totalProperty : 'numberOfRows',
				}
			},
			queryMode : 'local'
		});
		me.reloadPopup = function(paramsSearch) {
//			event = eventTemp;
//			showBannerInfo(event);
			clientCode = paramsSearch.clientCode;
			getListChecklist(paramsSearch);
			me.show();
		}
		
		var btnSave = Ext.create('Ext.Button', {
			cls: 'btn-button',
        	text: 'Save',
			iconCls: 'icon-nw-save', 
          	minWidth: 100,
          	//margin: '0 10 10 0',
          	border: false,
          	handler: function() {
          		changeOrder();
          	}
		});
		var btnCancel = Ext.create('Ext.Button', {
			cls: 'btn-button',
			iconCls: 'icon-nw-cancel', 
        	text: 'Cancel',
          	minWidth: 100,
          	margin: '0 0 0 10',
          	border: false,
          	handler: function() {
//          		mainStore.removeAll(true);
          		me.close();
          	}
		});
		var gridSearch = Ext
		.create(
				'Ext.grid.Panel',
				{
					stripeRows : true,
					width : "100%",
					cls : 'wrapper-table grid-border',
					bodyCls : 'wrapper-table-body tb-cell tb-cell-center',
					autoScroll : true,
					//autoHeight : true,
					minHeight : 100,
					height: 254,
					flex: 1,
					//maxHeight: 700,
					header : false,
					preserveScrollOnRefresh : true,
					collapsible : true,
					enableColumnMove : true,
					enableColumnResize : true,
					store:mainStore,
					columns : [
							{header : "No",align : 'center',minWidth : 60,maxWidth : 80,flex : 1,sortable : false,hideable : true,dataIndex:'rowNo'
							},
							{header : "Classification",flex : 1,align : 'center',minWidth : 150,sortable : true,hideable : true,dataIndex:'classificationName',
							},
							{header : "Detail Area",flex : 1.5,minWidth : 300,sortable : true,hideable : true,dataIndex:'checkListArea',
							},
							{header : "Assessment Type",align : 'center',minWidth : 100,flex : 1,sortable : true,hideable : false,dataIndex:'assessmentTypeName',
							},
							{header : "Number of Items",minWidth : 120,align : 'center',flex : 1,sortable : true,dataIndex:'numberOfItems',
							}
							],
					viewConfig: {
		                plugins: {
		                    ptype: 'gridviewdragdrop'
		                },
		                listeners: {
		                    drop: function(node, data, overModel, dropPosition, dropFunction) {
		                    	refreshFormOrder();
		                    }
		                }
		            },
					
					listeners : {
						cellclick : function(view,cell, cellIndex,record, row, rowIndex,e) {
							
						}
					}
				});
		var btnContainer = Ext.create('Ext.container.Container', {
        	width: "100%",
        	layout: 'hbox',
        	padding: '5 0',
        	items: [{xtype: 'tbfill'}, btnSave, btnCancel]
        });  
		this.items = [gridSearch];
		this.bbar = [btnContainer];
		this.callParent(arguments);
		var lisrOrderedChecklist = [];
		function getListChecklist(paramsSearch){
			paramsSearch.classificationCd = '';
			paramsSearch.assessmentTypeCd = '';
			mainStore.load({params:paramsSearch,
				callback:function(records,options,success){
					
			}});
		}
		async function changeOrder(){
			var params = {listChecklistParams:Ext.encode(lisrOrderedChecklist)}
			var url = '/checkListMgmt/changeOrder.json';
			try {
				var data = await saveDataAjax('Do you want to order ?',url,params,"Order successfully","Order Checklist");
				me.reloadParent();
				me.close();
			} catch (e) {
				// TODO: handle exception
			}
		}
		function refreshFormOrder(){
			resetOrder();
			mainStore.removeAll(true);
			mainStore.loadData(lisrOrderedChecklist)
			gridSearch.getView().refresh();
		}
		function resetOrder(){
			lisrOrderedChecklist = [];
			var order = 1;
			var rowNo = 1;
			Ext.each(mainStore.data.items,function(item){
				item.data.orderNo = order;
				item.data.rowNo = rowNo;
				lisrOrderedChecklist.push(item.data);
				order++;
				rowNo++;
			});
		}
		/*--End--*/
	}
});
