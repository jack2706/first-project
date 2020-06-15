
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

String.prototype.replaceAt = function(index, char) {
	return this.substr(0, index) + char + this.substr(index + 1, this.length - index);
}

function handleException(e) {
	if(e.message != '' && e.message != null) {
		showMessageBoxError(e.message);
	}
	console.log(e.stack)
	unMask();
}

function showMessageBoxError(message){
	Ext.MessageBox.show({
		cls : 'messageBoxTextCenter',
        title : 'KIS',
        msg : message,
        buttons : Ext.MessageBox.YES,
        icon : Ext.MessageBox.ERROR
	});
}

function showMessageBoxInfo(message,title){
	Ext.MessageBox.show({
		cls : 'messageBoxTextCenter',
        title : title,
        msg : message,
        buttons : Ext.MessageBox.OK,
        icon : Ext.MessageBox.INFO
	});
}

function showMessageBoxWarning(message){
	Ext.MessageBox.show({
		cls : 'messageBoxTextCenter',
        title : 'KIS',
        msg : message,
        buttons : Ext.MessageBox.YES,
        icon : Ext.MessageBox.WARNING
	});
}

function checkAjaxSessionTimeOut(response){
	if(response.getResponseHeader('session_timeout') == "true"){
		return true;
	}
	return false;
}

function saveDataAjax(msgConfirm, ajaxUrl, params, msgSaveSuccess, title) {
	return new Promise((resolve, reject) => {
		Ext.Msg.confirm(title, msgConfirm, function(msg) {
			if(msg == 'yes') {
				mask();
	        	Ext.Ajax.request({
	        		method: 'POST',
	        		url: CONTEXT_PATH + ajaxUrl,
	        		params: params,
	        		success: function(response) {
	        			var data = Ext.decode(response.responseText);
	        			if(checkAjaxSessionTimeOut(response)){
	        				redirectedWhenSessionTimeOut();
	        			}
	        			unMask();
	        			if(data.actionStatus == 'success') {
	        				showMessageBoxInfo(msgSaveSuccess, title);
	        				resolve(data);
	        			}else {
	        				reject({message: data.message});
	        			}
	        		},
	        		error: function(response) {
	        			if(checkAjaxSessionTimeOut(response)){
	        				redirectedWhenSessionTimeOut()
	        			}
	        			unMask();
	        			reject({message: response.statusText});
	        		},
	        		failure: function(response){
	        			if(checkAjaxSessionTimeOut(response)){
	        				redirectedWhenSessionTimeOut()
	        			}
	        			unMask();
	        			reject({message: response.statusText});
	        		}
	        	});
			}else {
				reject({message: ''});
			}
		});
	})
}
function saveDataAjaxNoConfirm(ajaxUrl, params) {
	return new Promise((resolve, reject) => {
		Ext.Ajax.request({
    		method: 'POST',
    		url: CONTEXT_PATH + ajaxUrl,
    		params: params,
    		success: function(response) {
    			var data = Ext.decode(response.responseText);
    			if(checkAjaxSessionTimeOut(response)){
    				redirectedWhenSessionTimeOut();
    			}
    			if(data.actionStatus == 'success') {
    				resolve(data);
    			}else {
    				reject({message: data.message});
    			}
    		},
    		error: function(response) {
    			if(checkAjaxSessionTimeOut(response)){
    				redirectedWhenSessionTimeOut()
    			}
    			reject({message: response.statusText});
    		},
    		failure: function(response){
    			if(checkAjaxSessionTimeOut(response)){
    				redirectedWhenSessionTimeOut()
    			}
    			reject({message: response.statusText});
    		}
    	});
	})
}
function saveDataAjaxJson(msgConfirm, ajaxUrl, params, msgSaveSuccess, title) {
	return new Promise((resolve, reject) => {
		Ext.Msg.confirm(title, msgConfirm, function(msg) {
			if(msg == 'yes') {
				mask();
	        	Ext.Ajax.request({
	        		headers: { 'Content-Type': 'application/json' },
	        		method: 'POST',
	        		url: CONTEXT_PATH + ajaxUrl,
	        		params: params,
	        		success: function(response) {
	        			var data = Ext.decode(response.responseText);
	        			if(checkAjaxSessionTimeOut(response)){
	        				redirectedWhenSessionTimeOut();
	        			}
	        			unMask();
	        			if(data.actionStatus == 'success') {
	        				showMessageBoxInfo(msgSaveSuccess, title);
	        				resolve(data);
	        			}else {
	        				reject({message: data.message});
	        			}
	        		},
	        		error: function(response) {
	        			if(checkAjaxSessionTimeOut(response)){
	        				redirectedWhenSessionTimeOut()
	        			}
	        			unMask();
	        			reject({message: response.statusText});
	        		},
	        		failure: function(response){
	        			if(checkAjaxSessionTimeOut(response)){
	        				redirectedWhenSessionTimeOut()
	        			}
	        			unMask();
	        			reject({message: response.statusText});
	        		}
	        	});
			}else {
				reject({message: ''});
			}
		});
	})
}

function saveDataNoConfirm(ajaxUrl, params) {
	return new Promise((resolve, reject) => {
		Ext.Ajax.request({
			url : CONTEXT_PATH + ajaxUrl,
			params : params,
			success : function(response) {
				var data = Ext.decode(response.responseText);
				if(checkAjaxSessionTimeOut(response)){
					redirectedWhenSessionTimeOut();
				}
				if(data.actionStatus == 'success') {
					resolve(data);
				}else {
					reject({message: data.message});
				}
			},
			error: function(response) {
				if(checkAjaxSessionTimeOut(response)){
					redirectedWhenSessionTimeOut()
				}
				reject({message: response.statusText});
			},
			failure: function(response) {
				if(checkAjaxSessionTimeOut(response)){
					redirectedWhenSessionTimeOut()
				}
				reject({message: response.statusText});
			}
		});
	})
}
function getDataAjax(ajaxUrl, params) {
	let deferred = new Ext.Deferred();
	mask();
	Ext.Ajax.request({
		url : CONTEXT_PATH + ajaxUrl,
		params : params,
		success : function(response) {
			var data = Ext.decode(response.responseText);
			if( checkAjaxSessionTimeOut(response)){
				redirectedWhenSessionTimeOut();
				return;
			}
			if(data.actionStatus == 'success') {
				deferred.resolve(data);
			}else {
				unMask();
				deferred.reject({message: data.message});
			}
		},
		error : function(response) {
			if( checkAjaxSessionTimeOut(response)){
				redirectedWhenSessionTimeOut();
				return;
			}
			unMask();
			deferred.reject({message: response.statusText});
		},
		failure: function(response){
			if( checkAjaxSessionTimeOut(response)){
				redirectedWhenSessionTimeOut();
				return;
			}
			unMask();
			deferred.reject({message: response.statusText});
		}
	});
	return deferred.promise;
}
function getDataAjaxNoMask(ajaxUrl, params) {
	let deferred = new Ext.Deferred();
	Ext.Ajax.request({
		url : CONTEXT_PATH + ajaxUrl,
		params : params,
		success : function(response) {
			var data = Ext.decode(response.responseText);
			if( checkAjaxSessionTimeOut(response)){
				redirectedWhenSessionTimeOut();
				return;
			}
			if(data.actionStatus == 'success') {
				deferred.resolve(data);
			}else {
				deferred.reject({message: data.message});
			}
		},
		error : function(response) {
			if( checkAjaxSessionTimeOut(response)){
				redirectedWhenSessionTimeOut();
				return;
			}
			deferred.reject({message: response.statusText});
		},
		failure: function(response){
			if( checkAjaxSessionTimeOut(response)){
				redirectedWhenSessionTimeOut();
				return;
			}
			deferred.reject({message: response.statusText});
		}
	});
	return deferred.promise;
}
function redirectedWhenSessionTimeOut(){
	location.href = CONTEXT_PATH +'/Logout.kps';
}

function handleCheckSessionLoadStore(store, record, success, opts){
	if(opts._response != null && opts._response != undefined && opts._response.getResponseHeader('session_timeout') == 'true'){
    	redirectedWhenSessionTimeOut();
    }
}

function mask() {
	Ext.getBody().addCls('parentMask'); 
	Ext.getBody().mask("Loading...", "x-mask-loading", false);
}
function unMask() {
	Ext.getBody().removeCls('parentMask');
	Ext.getBody().unmask();
}

function getFormField(form, field) {
	return form.getForm().findField(field);
}

function getStoreOpt(isAddNewOption, newDisplayField, newValueField, isSelectedValue, selectedValue, isSelectFirst, isSort) {
	return {
		isAddNewOption 	: isAddNewOption,
		newDisplayField : newDisplayField,
		newValueField 	: newValueField,
		isSelectedValue : isSelectedValue,
		selectedValue 	: selectedValue,
		isSelectFirst	: isSelectFirst,
		isSort			: isSort
	}
}

function formatSizeUnits(bytes){
	if      (bytes>=1073741824) {bytes=(bytes/1073741824).toFixed(2)+' GB';}
	else if (bytes>=1048576)    {bytes=(bytes/1048576).toFixed(2)+' MB';}
	else if (bytes>=1024)       {bytes=(bytes/1024).toFixed(2)+' KB';}
	else if (bytes>1)           {bytes=bytes+' bytes';}
	else if (bytes==1)          {bytes=bytes+' byte';}
	else                        {bytes='0 byte';}
	return bytes;
}

function stringToDate(value) {
	if(!Common.isString(value)) {
		return '';
	}
	let dateStr = value.trim();
	if(dateStr.length != 8) {
		return '';
	}
	return dateStr.substr(0, 4) + "/" + dateStr.substr(4, 2) + "/" + dateStr.substr(6, 2);
}

function stringToDateTime(value) {
	if(value == null){
		return '';
	}
	var res = '';
	var temp = value.trim();
	try {
		if(temp.length == 19){
			res = temp.replaceAll('-', '/');
		}
	}catch(err) {}
	return res;
}

function stringToYearMonth(value) {
	if(value == null){
		return '';
	}else{
		var res = '';
		var temp = value.trim();
		try{
			if(temp.length == 6){
				res = temp.substr(0, 4) + "/" + temp.substr(4, 2);
			}
		}catch(err){}
		return res;
	}
}


function getTlesToken(me){
	if(!($('#hiddenTlesToken') == undefined ||$('#hiddenTlesToken') == '' ||$('#hiddenTlesToken') == null)){
		return $('#hiddenTlesToken').val();
	}
	return null;
}

function downloadFile(info) {
	var params = {
		actualFileName	: info.actualFileName,
		userFileName	: info.userFileName,
		filePath		: info.filePath
	}
	let formDowload = Ext.create('Ext.form.Panel', {
	    standardSubmit: true,
	    url: CONTEXT_PATH + '/general/fileDownload'
	})
	formDowload.submit({params: params});
}

function setParamsToProxy(params, proxy) {
	for (const key of Object.keys(params)) {
	    const value = params[key];
	    proxy.setExtraParam(key, value);
	}
}
function formatNumberToDisplayValue(newVal){
	var numberValue =  Ext.util.Format.number(newVal, '0,000,000,000');
	/*
	if(newVal != ''){
		if(numberValue ==''){
			numberValue =  Ext.util.Format.number(0, '0,000,000,000.000');
		}
	}*/
	return numberValue;
}
function formatDateTime(dateTime,tokenTemp){
	var result = [];
 	var dateString  = '';
 	var time = '';
    var token = '';
	if(dateTime!= ''){
		if(dateTime.lastIndexOf('-') != -1){
			token = '-';
        }else if( dateTime.lastIndexOf('/') != -1){
           token = '/';
        }
		if(token != ''){
			/** for format 01-01-1999 or 1-1-1999*/
          if(dateTime.lastIndexOf(token) != -1){
                var lengthTemp = 0;
                /* cut 2 or 4 charactor before - or  / to determine length to cut inittial date string*/
                if(dateTime.substring(0,dateTime.indexOf(token)).length == 2 || dateTime.substring(0,dateTime.indexOf(token)).length == 1){
                  lengthTemp = 4;
                }else if(dateTime.substring(0,dateTime.indexOf(token)).length == 4){
                  lengthTemp = 2;
                }
                dateString  = dateTime.substring(0,dateTime.lastIndexOf(token)+lengthTemp+1)
                
                /** get time*/
                time = dateTime.substr(dateTime.lastIndexOf((token))+lengthTemp+1,6);
                

                /** get date result*/
                var temp = dateString.trim();
				try{
					dateString = dateString.substr(0, 4) +tokenTemp + dateString.substr(5, 2) + tokenTemp+ dateString.substr(8);
				}catch(err){}
          }
     }else{
       /** for format 01011999 or 19910101 */
       dateString = dateTime.substr(0, 4) +tokenTemp + dateTime.substr(4, 2) + tokenTemp+ dateTime.substr(6, 2);
     }
	}
	result.push(dateString);
	result.push(time);
	return result;
}
async function downloadCounselAttachFile(attachFileCode) {
	try {
		let json = await getDataAjax('/general/getAttachFileInfo.json', {attachFileCode});
		let data = json.data;
		if(data == null) {
			throw new Error('File not found in database');
		}
		downloadFile(data);
		unMask();
	}catch(e) {
		handleException(e);
	}
}
function getYearBeforeSixSemester(listYear, yearSem) {
	let toYear = _(listYear)
		.filter(s => s.detailCode == yearSem.year)
		.map(s => s.detailCode)
		.head();
	toYear = toYear == undefined ? new Date().getFullYear() : parseInt(toYear);
	let fromYear = _(listYear)
		.filter(s => s.detailCode == (toYear - 2) + '')
		.map(s => s.detailCode)
		.head();
	if(fromYear == undefined) {
		return {
			fromYear	: listYear[0].detailCode,
			fromSem		: '01',
			toYear		: toYear + '',
			toSem		: yearSem.semester
		}
	}
	return {
		fromYear	: fromYear,
		fromSem		: yearSem.semester,
		toYear		: toYear + '',
		toSem		: yearSem.semester
	}
}

