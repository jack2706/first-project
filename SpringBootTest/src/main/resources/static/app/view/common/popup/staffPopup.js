Ext.define('ext.view.common.popup.staffPopup',{
	extend : 'Ext.window.Window',			
	alias: 'widget.staffPopup',
	layout : 'vbox',
	title:'Staff',
    width: 960,
    height: 480,
    modal : true,
	resizable : false,
	closable : true,
	closeAction: 'hide',
	overflowY : 'hidden',
	overflowX : 'hidden',
	requires:[
       //'ext.model.common.sybTreeCodeModel',
       //'ext.model.common.sybGeneralCodeModel'
    ],
    memberCode:0,
    reloadParent:function(){},
    resetPopup : function(){},
    reloadPopup : function(memberCodeList, titleHw){},
    memberCodeList:[],
	initComponent : function() {
		
		var me = this;
		
		
		me.reloadPopup = function(memberCodeList, titleHw){
			formInfo.reset();
			me.show();
		}
		
		me.resetPopup = function(){
			formInfo.reset();
			//getFormField(formInfo, 'exRateCode').setValue(0);
			//getFormField(formInfo, 'rate').setValue(0);
			//getFormField(formInfo, 'date').setValue(new Date());
			//me.show();
		}
		
		var btnSearch = Ext.widget('mebutton', {
	    	text: 'Search', 
	    	padding: '8 10', 
	    	iconCls: 'icon-nw-search', 
	    	//style: 'float : right;',
	    	handler: function(){
			}
	    });
		
		var formInfo = Ext.create('Ext.form.Panel', {
			border : false,
			width : '100%',
			bodyPadding : '10',
			margin : "5 5 0",
			style : 'border:1px solid #b5b8c8; border-radius:3px;',
			layout: 'hbox',
			items : [		      
				{xtype: 'combobox', labelSeparator : '', flex: 1, fieldLabel: 'Campus',labelWidth:85, 
					//store : yearStore, valueField : 'learningYearCode', displayField : 'learningYearCode', queryMode : 'local', editable : false,
				 },
				 {xtype: 'combobox', labelSeparator : '', flex: 1, fieldLabel: 'Position (role)',labelWidth:85, padding: "0 10",
						//store : yearStore, valueField : 'learningYearCode', displayField : 'learningYearCode', queryMode : 'local', editable : false,
				 },
				 {xtype: 'metext', labelSeparator : '', flex: 1, fieldLabel: 'Name',labelWidth:85, padding: "0 10"},
				 btnSearch 
	        ]
		});
		

		let mainGrid = Ext.create('Ext.grid.Panel', {
			width: '100%',
			flex: 1,
			padding: 5,
			//store: mainStore,
			selModel: Ext.create('Ext.selection.CheckboxModel', {}),
			columns:[
				{text : 'Campus', minWidth : 100, flex: 1, align : 'center', 
					//dataIndex : 'memberName',
				},{text : 'Staff Name', minWidth : 150, flex: 1.5, align : 'center', 
					//dataIndex : 'memberName',
				},{text : 'Role', minWidth : 100, flex: 1, align : 'center', 
					//dataIndex : 'memberName',
				},{text : 'Position', minWidth : 100, flex: 1, align : 'center', 
					//dataIndex : 'memberName',
				},{text : 'Status', minWidth : 100, flex: 1, align : 'center', 
					//dataIndex : 'memberName',
				},{text : 'Cell Phone', minWidth : 100, flex: 1, align : 'center', 
					//dataIndex : 'memberName',
				},{text : 'Employee Start Date', minWidth : 150, flex: 1.5, align : 'center', 
					//dataIndex : 'memberName',
				}
			],
			listeners: { 
		        rowclick : function(grid, record, columnIndex ){
		        	
		        }
		 	},
		 	//bbar: mainGridPagingToolbar,
		});
		
		var btnApply = Ext.widget('mebutton', {
			text : 'Apply', iconCls: 'icon-nw-apply', padding: '8 15', 
			handler : function(){
        		
			}
		});
		
		let btnPanel = Ext.create('Ext.container.Container', {
			border : false,
			width : '100%',
			padding: "0 5 5",
			layout: 'hbox',
			items : [{xtype: 'tbfill'}, btnApply]
		});
		
		this.items = [formInfo, mainGrid, btnPanel];
		this.callParent(arguments);
//		END
	}
});


