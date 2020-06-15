Ext.define('Common', {
	statics : {
		stringTodate : function(dateString) {
			dateString = Ext.String.trim(dateString);
			let date;
			if(dateString.length == 8) {
				let year = dateString.substr(0, 4);
				let month = dateString.substr(4, 2) - 1;
				let day = dateString.substr(6, 2);
				date = new Date(year, month, day)
			}
			return date;
		},
		dateToString : function(date) {
			var resultDate = new Date(date);
			  
	        year = resultDate.getFullYear();
	        month = resultDate.getMonth() + 1;
	        day = resultDate.getDate();
	        if(month < 10)
	        	month = "0"+month;
	        if(day < 10)
	        	day = "0"+day;
	        return year + "" + month + "" + day;
		},
		isString: function(value) {
			return typeof value === 'string' || value instanceof String;
		},
		isNumber: function(value) {
			return typeof value === 'number' && isFinite(value);
		},
		isArray: function(value) {
			return value && typeof value === 'object' && value.constructor === Array;
		},
		isObject: function(value) {
			return value && typeof value === 'object' && value.constructor === Object;
		},
		isFunction: function(value) {
			return typeof value === 'function';
		},
		isBoolean: function(value) {
			return typeof value === 'boolean';
		},
		isRegExp: function(value) {
			return value && typeof value === 'object' && value.constructor === RegExp;
		},
		isError: function(value) {
			return value instanceof Error && typeof value.message !== 'undefined';
		},
		isDate: function(value) {
			return value instanceof Date;
		},
		isSymbol: function(value) {
			return typeof value === 'symbol';
		},
		formatNumber: function(value, decimalPlaces) {
			return Number(Math.round(value + 'e' + decimalPlaces) + 'e-' + decimalPlaces)
		},
		isNull: function(value, replace) {
			return value == null ? replace : value;
		},
		getRawPhone: function(value) {
			return value.replaceAll('-', '');
		},
		getRawDate: function(date) {
			return Ext.Date.format(date, 'Ymd');
		},
		getRawTime: function(date) {
			return Ext.Date.format(date, 'H:m');
		},
		getGeneralCode: function(stores, systemCode, commonCode, system, opt, items) {
			let deferred = new Ext.Deferred();
			Ext.Ajax.request({
				url : CONTEXT_PATH + '/general/generalCodes.json',
				params : {
					systemCode 	: systemCode, 
					commonCode 	: commonCode,
					system		: system
				},
				success : function(response) {
					if(checkAjaxSessionTimeOut(response)){
						redirectedWhenSessionTimeOut()
						return;
					}
					var json = Ext.decode(response.responseText);
					var commonCodeArray = json.data;
					
					stores.loadData(commonCodeArray);
					
					if(opt.isAddNewOption == true){
						var commonCode = {
							codeName 	: opt.newDisplayField,
							detailCode  : opt.newValueField
						};
						stores.insert(0, commonCode);
					}
					
					if(opt.isSelectedValue == true){
						items.setValue(opt.selectedValue);
					}else if(opt.isSelectFirst == true) {
						items.setValue(stores.first());
					}
					deferred.resolve();
				},
				error : function(response) {
					if( checkAjaxSessionTimeOut(response)){
						redirectedWhenSessionTimeOut();
					}
					deferred.reject({message: response.responseText});
				},
				failure: function(response){
					if( checkAjaxSessionTimeOut(response)){
						redirectedWhenSessionTimeOut();
					}
					deferred.reject({message: response.responseText});
				}
			});
			return deferred.promise;
		},
		getTreeCode : function(stores, systemCode, commonCode, treeLevel, parentDetailCode, system, opt, items) {
			let deferred = new Ext.Deferred();
			Ext.Ajax.request({
				url: CONTEXT_PATH + '/general/treeCodes.json',
				params : {
					systemCode 			: systemCode, 
					commonCode 			: commonCode,
					parentDetailCode	: parentDetailCode,
					treeLevel			: treeLevel,
					system				: system
				},
				success : function(response) {
					if(checkAjaxSessionTimeOut(response)) {
						redirectedWhenSessionTimeOut()
						return;
					}
					var json = Ext.decode(response.responseText);
					stores.loadData(json.data);
					
					if(opt.isAddNewOption == true) {
						var commonCode = {
							codeName 	: opt.newDisplayField,
							detailCode  : opt.newValueField
						};
						stores.insert(0, commonCode);
					}
					if(opt.isSelectedValue == true) {
						items.setValue(opt.selectedValue);
					}else if(opt.isSelectFirst == true) {
						items.setValue(stores.first());
					}
					deferred.resolve();
				},
				error : function(response) {
					if( checkAjaxSessionTimeOut(response)){
						redirectedWhenSessionTimeOut();
					}
					deferred.reject({message: response.responseText});
				},
				failure: function(response){
					if( checkAjaxSessionTimeOut(response)){
						redirectedWhenSessionTimeOut();
					}
					deferred.reject({message: response.responseText});
				}
			});	
			return deferred.promise;
		},
		getAddressList : function(stores, parentDetailCode, opt, items) {
			let deferred = new Ext.Deferred();
			Ext.Ajax.request({
				url: CONTEXT_PATH + '/general/getAddressList.json',
				params : {
					parentDetailCode: parentDetailCode
				},
				success : function(response) {
					if(checkAjaxSessionTimeOut(response)) {
						redirectedWhenSessionTimeOut()
						return;
					}
					var json = Ext.decode(response.responseText);
					stores.loadData(json.data);
					
					if(opt.isAddNewOption == true) {
						var commonCode = {
							codeName 	: opt.newDisplayField,
							detailCode  : opt.newValueField
						};
						stores.insert(0, commonCode);
					}
					if(opt.isSelectedValue == true) {
						items.setValue(opt.selectedValue);
					}else if(opt.isSelectFirst == true) {
						items.setValue(stores.first());
					}
					deferred.resolve();
				},
				error : function(response) {
					if( checkAjaxSessionTimeOut(response)){
						redirectedWhenSessionTimeOut();
					}
					deferred.reject({message: response.responseText});
				},
				failure: function(response){
					if( checkAjaxSessionTimeOut(response)){
						redirectedWhenSessionTimeOut();
					}
					deferred.reject({message: response.responseText});
				}
			});	
			return deferred.promise;
		},
		getYearList: function(stores, opt, items) {
			var start = 2018;
			var end = new Date().getFullYear() + 10;
			var data = [];
			for(var i = start; i <= end; i++) {
				data.push({
					detailCode  : i,
					codeName 	: i
				});
			}
			
			stores.loadData(data);
			if(opt.isAddNewOption == true) {
				var commonCode = {
					detailCode  : opt.newValueField,
					codeName 	: opt.newDisplayField
				};
				stores.insert(0, commonCode);
			}
			if(opt.isSelectedValue == true) {
				items.setValue(opt.selectedValue);
			}else if(opt.isSelectFirst == true) {
				items.setValue(stores.first());
			}
		},
		
		getLearningYear: function(stores, opt, items) {
			let deferred = new Ext.Deferred();
			Ext.Ajax.request({
				url : CONTEXT_PATH + '/general/amaLearningYear.json',
				success : function(response) {
					if(checkAjaxSessionTimeOut(response)){
						redirectedWhenSessionTimeOut()
						return;
					}
					var json = Ext.decode(response.responseText);
					var data = json.data;
					
					stores.loadData(data);
					
					if(opt.isAddNewOption == true){
						var newOpt = Ext.create('ext.model.common.learningYearModel', {
							learningYearCode : opt.newValueField,
							learningYearName : opt.newDisplayField
						});
						stores.insert(0, newOpt);
					}
					
					if(opt.isSelectedValue == true){
						items.setValue(opt.selectedValue);
					}else if(opt.isSelectFirst == true) {
						items.setValue(stores.first());
					}
					deferred.resolve();
				},
				error : function(response) {
					if( checkAjaxSessionTimeOut(response)){
						redirectedWhenSessionTimeOut();
					}
					deferred.reject({message: response.responseText});
				},
				failure: function(response){
					if( checkAjaxSessionTimeOut(response)){
						redirectedWhenSessionTimeOut();
					}
					deferred.reject({message: response.responseText});
				}
			});
			return deferred.promise;
		},
		getTreeCode2 : function(stores, systemCode, commonCode, treeLevel, parentDetailCode, system, opt, items) {
			let deferred = new Ext.Deferred();
			Ext.Ajax.request({
				url: CONTEXT_PATH + '/general/treeCodes2.json',
				params : {
					systemCode 			: systemCode, 
					commonCode 			: commonCode,
					parentDetailCode	: parentDetailCode,
					treeLevel			: treeLevel,
					system				: system,
					useYn 			: 'Y'
				},
				success : function(response) {
					if(checkAjaxSessionTimeOut(response)) {
						redirectedWhenSessionTimeOut()
						return;
					}
					var json = Ext.decode(response.responseText);
					stores.loadData(json.data);
					
					if(opt.isAddNewOption == true) {
						var commonCode = {
							codeName 	: opt.newDisplayField,
							detailCode  : opt.newValueField
						};
						stores.insert(0, commonCode);
					}
					if(opt.isSelectedValue == true) {
						items.setValue(opt.selectedValue);
					}else if(opt.isSelectFirst == true) {
						items.setValue(stores.first());
					}
					deferred.resolve();
				},
				error : function(response) {
					if( checkAjaxSessionTimeOut(response)){
						redirectedWhenSessionTimeOut();
					}
					deferred.reject({message: response.responseText});
				},
				failure: function(response){
					if( checkAjaxSessionTimeOut(response)){
						redirectedWhenSessionTimeOut();
					}
					deferred.reject({message: response.responseText});
				}
			});	
			return deferred.promise;
		},
		downloadAttachmentFile:function(actualFileName,userFileName,filePath){
			var params = {
					actualFileName	: actualFileName,
					userFileName	: userFileName,
					filePath		: filePath
			}
			Ext.create('Ext.form.Panel', {
		        renderTo: Ext.getBody(),
		        standardSubmit: true,
		        url: CONTEXT_PATH + '/general/fileDownload'
		    }).submit({params: params});
		},
		getLevelList: async function(store, tree, params) {
			try {
        		let json = await getDataAjax('/general/getLevelList.json', params);
        		let data = json.data;
				if(data.length == 0) {
					store.setRoot({});
					tree.reset();
					return;
				}
				data.forEach(s => {
        			s.treeLevel = parseInt(s.treeLevel)
        		})
				let courseList = _.filter(data, {treeLevel: 1});
				courseList.forEach(s => {
					let levelList = _(data)
						.filter(c => c.parentCrsCode == s.courseCode)
						.map(c => {
							return {
								id			: c.courseCode,
								text		: c.courseName,
								leaf		: true
							}
						})
						.value();
					s.children = levelList;
					s.id = s.courseCode;
					s.text = s.courseName;
					s.leaf = false;
					s.checked = false;
				})
				let root = {
					text: 'Root',
					id: 'root',
					expanded: true,
					checked: false,
    		        children: courseList
    		    };
        		store.setRoot(root);
        		
				unMask();
        	}catch(e) {
        		handleException(e);
        	}
		},
		
//	END
	}
})
