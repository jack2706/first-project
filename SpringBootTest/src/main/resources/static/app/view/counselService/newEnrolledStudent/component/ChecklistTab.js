Ext.define('ext.view.counselService.newEnrolledStudent.component.ChecklistTab', {
	extend: 'Ext.container.Container',
	width : '100%',
	layout: 'fit',
	reloadTab: function(){},
	reloadParent: function(){},
	initComponent : function() {
		
		let me = this;
		
		me.reloadTab = function(info) {
			checklistForm2.loadData(_.cloneDeep(info));
			checklistForm3.loadData(_.cloneDeep(info));
			checklistForm4.loadData(_.cloneDeep(info));
			checklistForm5.loadData(_.cloneDeep(info));
			mainTab.setActiveTab(0);
		}
		
		let checklistForm2 = Ext.create('ext.view.counselService.newEnrolledStudent.component.ChecklistForm', {
			orderSeq: 2,
			reloadParent: function() {
				me.reloadParent();
			}
		});
		let checklistForm3 = Ext.create('ext.view.counselService.newEnrolledStudent.component.ChecklistForm', {
			orderSeq: 3,
			reloadParent: function() {
				me.reloadParent();
			}
		});
		let checklistForm4 = Ext.create('ext.view.counselService.newEnrolledStudent.component.ChecklistForm', {
			orderSeq: 4,
			reloadParent: function() {
				me.reloadParent();
			}
		});
		let checklistForm5 = Ext.create('ext.view.counselService.newEnrolledStudent.component.ChecklistForm', {
			orderSeq: 5,
			reloadParent: function() {
				me.reloadParent();
			}
		});
		let mainTab = Ext.widget('tabpanel', {
			layout: 'fit',
			activeTab: 0,
			border: false,
			margin: '5 0 0 5',
			items: [
				{title: 'Admission Day', layout: 'fit', border: false, items: [checklistForm2]},
				{title: 'Admission 1 Week', layout: 'fit', border: false, items: [checklistForm3]},
				{title: 'Admission 2 Week', layout: 'fit', border: false, items: [checklistForm4]},
				{title: 'Admission 4 Week', layout: 'fit', border: false, items: [checklistForm5]},
			]
		});
		
		this.items = [mainTab];
		this.callParent(arguments);
		
		init();
		let allChecklist;
		async function init() {
			try {
        		let json = await getDataAjax('/counselServiceController/getAllChecklist.json', {});
        		allChecklist = json.data;
        		if(allChecklist.length == 0) {
        			throw new Error('All Checklist null');
        		}
        		checklistForm2.reloadComponet(_.cloneDeep(allChecklist));
    			checklistForm3.reloadComponet(_.cloneDeep(allChecklist));
    			checklistForm4.reloadComponet(_.cloneDeep(allChecklist));
    			checklistForm5.reloadComponet(_.cloneDeep(allChecklist));
				unMask();
        	}catch(e) {
        		handleException(e);
        	}
		}
		
//	END
	}
});

