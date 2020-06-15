Ext.define('ext.view.serviceSetting.checkListMgmt.tab.parentOrientationTab', {
  extend : 'Ext.Container',
  header: false,
  width : "100%",
  autoHeight : true,
  border: false,
  style: "background: none !important; border: none; height: auto !important;",
  bodyStyle: 'background: none !important; border: none; height: auto !important;',
  cls: 'wrap-auto-full',
  bodyCls: 'wrap-auto-full',
  requires: [
    
  ],
  memberCode: 0,
  info: {},
  reloadTab: function(){},
  initComponent: function () {
	  
        var me =  this;
		var gridSearch = Ext
		.create(
				'Ext.grid.Panel',
				{
					stripeRows : true,
					width : "100%",
					cls : 'wrapper-table wrap-grid-border grid-border',
					bodyCls : 'wrapper-table-body tb-cell tb-cell-center',
					autoScroll : true,
					autoHeight : true,
					minHeight : 100,
					header : false,
					preserveScrollOnRefresh : true,
					collapsible : true,
					enableColumnMove : true,
					enableColumnResize : true,
					columns : [
							{
								header : "No",
								align : 'center',
								minWidth : 60,
								maxWidth : 80,
								flex : 1,
								sortable : false,
								hideable : true,
							},
							{
								header : "Classification",
								flex : 1,
								align : 'center',
								minWidth : 150,
								sortable : true,
								hideable : true,
							},
							{
								header : "Detail Area",
								flex : 1.5,
								minWidth : 300,
								sortable : true,
								hideable : true,
							},
							{
								header : "Assessment Type",
								align : 'center',
								minWidth : 80,
								flex : 1,
								sortable : true,
								hideable : false
							},
							{
								header : "Number of Items",
								minWidth : 120,
								align : 'center',
								flex : 1,
								sortable : true
							},
							{
								header : "Instant Counsel",
								minWidth : 120,
								align : 'center',
								flex : 1,
								sortable : true
							},
							{
								header : "Plan Counsel",
								minWidth : 120,
								align : 'center',
								flex : 1.2,
								sortable : true
							},
							{
								header : "New enrolled student Counsel",
								minWidth : 120,
								align : 'center',
								flex : 1.3,
								sortable : true
							},
							{
								header : "Recruit Counsel",
								minWidth : 120,
								align : 'center',
								flex : 1.5,
								sortable : true
							},
							{
								header : "Widthaw Student management",
								minWidth : 120,
								align : 'center',
								flex : 1.5,
								sortable : true
							} ],
					viewConfig : {
						forceFit : true
					},
					bbar : {
						xtype : 'pagingtoolbar',
						pageSize : 10,
						displayInfo : true,
						listeners : {
	          				beforechange : function(pagingtoolbar, page, eOpts) {
	          					
	          				}
	          			}
					},
					listeners : {
						cellclick : function(view,cell, cellIndex,record, row, rowIndex,e) {
							
						}
					}
				});
        this.items = [gridSearch];
        this.callParent(arguments);
       
//  	END
    }
});
