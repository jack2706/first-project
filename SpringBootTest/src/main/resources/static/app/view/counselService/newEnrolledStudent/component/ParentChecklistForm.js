Ext.define('ext.view.counselService.newEnrolledStudent.component.ParentChecklistForm', {
	extend: 'Ext.container.Container',
	width : '100%',
	layout: 'vbox',
	padding: 5,
	autoScroll: true,
	reloadComponet: function(){},
	loadData: function(){},
	initComponent : function() {
		
		let me = this;
		
		let studentInfo;
		me.reloadTab = function(info) {
			studentInfo = _.cloneDeep(info);
			getParentCheckListData();
		}
		
		let sliderNumber = `
			<span style="position: absolute; left: 0px;"><span>1</span></span>
			<span class="number"><span>2</span></span>
			<span class="number"><span>3</span></span>
			<span class="number"><span>4</span></span>
			<span class="number"><span>5</span></span>
			<span class="number"><span>6</span></span>
			<span class="number"><span>7</span></span>
			<span class="number"><span>8</span></span>
			<span class="number"><span>9</span></span>
			<span style="position: absolute; right: 0px;">10</span>
		`
		
		let scaleForm = Ext.widget('form', {
			width: '100%',
			layout: 'vbox',
			title: 'Parent Information(Scale Type)',
			items: [
				{xtype: 'form', cls: 'parentChecklistScaleForm', bodyPadding: '10 10 0 10', layout: 'vbox', width: '100%', margin: 5,
					title: 'Counsel Operation',
					items: [
				        {xtype: 'component', cls: 'title', html: 'Number of Questions by Call (0)'},
				        {xtype: 'multislider', width: '100%', values: [2,3,4,5,6,7,8,9,10], readOnly: true, margin: 0,
				        	increment: 1, minValue: 1, maxValue: 10,
				        },
				        {xtype: 'component', cls: 'numberContainer', width: '100%', html: sliderNumber, padding: '0 8'},
			        ]
				},
				{xtype: 'form', cls: 'parentChecklistScaleForm', bodyPadding: '10 10 0 10', layout: 'vbox', width: '100%', margin: 5,
					title: 'Counsel Operation',
					items: [
				        {xtype: 'component', cls: 'title', html: 'Number of Questions by Call (0)'},
				        {xtype: 'multislider', width: '100%', values: [2,3,4,5,6,7,8,9,10], readOnly: true, margin: 0,
				        	increment: 1, minValue: 1, maxValue: 10,
				        },
				        {xtype: 'component', cls: 'numberContainer', width: '100%', html: sliderNumber, padding: '0 8'},
			        ]
				},
			]
		})
		let checkForm = Ext.widget('form', {
			width: '100%',
			margin: '5 0 0 0',
			title: 'Parent Information(Check Type)',
			layout: 'vbox',
			bodyPadding: 5,
			cls: 'parentChecklistForm',
			items: [
				{xtype: 'container', width: '100%', layout: 'vbox',
					items: [
						{xtype: 'component', html: 'Education', cls: 'group-title'},
						{xtype: 'medisplayfield', width: '100%', labelWidth: 240, name: '', fieldLabel: 'Education', cls: 'field', margin: 0, value: '111'},
						{xtype: 'medisplayfield', width: '100%', labelWidth: 240, name: '', fieldLabel: 'Education', cls: 'field', margin: 0, value: '-'},
						{xtype: 'medisplayfield', width: '100%', labelWidth: 240, name: '', fieldLabel: 'Education', cls: 'field', margin: 0, value: '-'},
					]
				},
				{xtype: 'container', width: '100%', layout: 'vbox',
					items: [
						{xtype: 'component', html: 'Level of living', cls: 'group-title'},
						{xtype: 'medisplayfield', width: '100%', labelWidth: 240, name: '', fieldLabel: 'Income level', cls: 'field', margin: 0, value: '111'},
						{xtype: 'medisplayfield', width: '100%', labelWidth: 240, name: '', fieldLabel: 'Income level', cls: 'field', margin: 0, value: '-'},
					]
				},
			]
		})
		
		this.items = [scaleForm, checkForm];
		this.callParent(arguments);
		
		init();
		let allChecklist = []
		async function init() {
			try {
        		let json = await getDataAjax('/counselServiceController/getAllChecklist.json', {});
        		allChecklist = _(json.data)
        			.filter(s => s.checklistGbn == 'PA' && s.evaluationType == 'C')
        			.value();
        		if(allChecklist.length == 0) {
        			throw new Error('All Checklist null');
        		}
        		allChecklist.forEach(s => {
    				s.parentCode = `${s.grandpaCode}-${s.parentCode}`;
    				s.grandpaCode = `${s.grandpaCode}`;
    			})
				unMask();
        	}catch(e) {
        		handleException(e);
        	}
		}
		async function getParentCheckListData() {
			try {
				let params = {
					memberCode	: studentInfo.memberCode,
					clientCode	: studentInfo.clientCode,
				}
        		let json = await getDataAjax('/counselServiceController/getParentCheckListData.json', params);
//				console.log(json.data)
        		let checkType = json.data.checkType;
        		let scaleType = json.data.scaleType;
        		buildScaleForm(scaleType);
        		buildCheckForm(checkType);
				unMask();
        	}catch(e) {
        		handleException(e);
        		checkForm.removeAll();
        		scaleForm.removeAll();
        	}
		}
		function buildCheckForm(checkTypeData) {
			let allCheck = _.cloneDeep(allChecklist);
			checkTypeData.forEach(s => {
    			let item = _(allCheck)
    				.find(a => a.itemCode == s.itemCode);
    			if(item != undefined) {
    				item.check = true;
    				item.itemValue = s.itemValue;
    			}
    		})
    		let grandpa = _(allCheck)
    			.uniqBy('grandpaCode')
    			.map(s => {
    				return {
    					code: s.grandpaCode,
    					text: s.grandpaText,
    				}
    			})
				.value();
			let grandList = [];
			grandpa.forEach(s => {
				let grandItem = {
					xtype: 'container', width: '100%', layout: 'vbox',
					title: s.text,
					items: [{xtype: 'component', html: s.text, cls: 'group-title'}]
				}
				let parent = _(allCheck)
					.filter(a => a.grandpaCode == s.code)
					.uniqBy('parentCode')
					.value();
				parent.forEach(a => {
					let childList = _(allCheck)
						.filter(b => b.parentCode == a.parentCode && b.check == true)
						.map('itemText')
						.join(', ');
					a.childList = childList;
				})
				parent.forEach(a => {
					grandItem.items.push({xtype: 'medisplayfield', width: '100%', labelWidth: 240, fieldLabel: a.parentText, cls: 'field', margin: 0, value: a.childList == '' ? '-' : a.childList});
				})
				grandList.push(grandItem);
			})
			checkForm.removeAll();
			checkForm.add(grandList);
		}
		function buildScaleForm(scaleTypeData) {
			let grandpa = _(scaleTypeData)
				.uniqBy('grandpaCode')
				.value();
			
			let grandList = [];
			grandpa.forEach(s => {
				let grandItem = {
					xtype: 'form', cls: 'parentChecklistScaleForm', bodyPadding: '10 10 0 10', layout: 'vbox', width: '100%', margin: 5,
					title: s.grandpaText,
					items: []
				}
				let parent = _(scaleTypeData)
					.filter(a => a.grandpaCode == s.grandpaCode)
					.value();
				parent.forEach(a => {
					grandItem.items = grandItem.items.concat([
						{xtype: 'component', cls: 'title', html: `${a.parentText} (${a.countNo})`},
						{xtype: 'multislider', width: '100%', values: [a.itemValue], readOnly: true, margin: 0,
							increment: 1, minValue: 1, maxValue: 10,
						},
						{xtype: 'component', cls: 'numberContainer', width: '100%', html: sliderNumber, padding: '0 8'},
					])
				})
				grandList.push(grandItem);
			})
			scaleForm.removeAll();
			scaleForm.add(grandList);
		}
		
//	END
	}
});

