
Ext.define('ext.view.serviceSetting.categoryManagement.popup.AchievementGrid', {
	extend : 'Ext.grid.Panel',
	width : '100%',
	cls : 'grid-total-item',
	features : [
		{ftype: 'groupingsummary', groupHeaderTpl: '{name}', hideGroupedHeader: true, enableGroupingMenu: false,
			groupHeaderTpl: '{name} ({rows.length} Criteria{[values.rows.length > 2 ? "s" : ""]})',
			startCollapsed: false, showSummaryRow: false, summaryRowPosition: 'outside'
		},
    ],
    viewConfig: {
        getRowClass: function (record) {
            return record.get('totalRow') == 'total' ? 'total-row-new' : '';
        }
	},
	columns: [
		{header: 'Year / Month', locked: true, sortable: false, menuDisabled: true,
			columns: [
				{text: 'Subject', dataIndex: 'subjectName', width: 200, align: 'center', sortable: false, menuDisabled: true}
			]
		}
	],
	initComponent : function() {
		this.callParent(arguments);
	}
});
