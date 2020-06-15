// Creation of data model
//Ext.define('StudentDataModel', {
//   extend: 'Ext.data.Model',
//   fields: [
//     {name: 'synt', mapping : 'synt'},
//     {name: 'mt', mapping : 'mt'},
//     {name: 'lt', mapping : 'lt'},
//     {name: 'ePoly', mapping : 'ePoly'},
//     {name: 'sr', mapping : 'sr'},
//     {name: 'fa', mapping : 'fa'},
//     {name: 'wt', mapping : 'wt'},
//     {name: 'wh', mapping : 'wh'},
//     {name: 'cp', mapping : 'cp'},
//     {name: 'rankclass', mapping : 'classa'},
//     {name: 'rankCampus', mapping : 'campus'},
//     {name: 'rankPoly', mapping : 'poly'}
//   ]
//});
// Store data
var myData = [
   { synt : "R", mt: "R", lt : "R", ePoly : "R", sr : "R", fa : "R", wt : "R", wh : "R", cp : "R", classa : 15, campus : 50, poly : 500},
   { synt : "A", mt: "A", lt : "A", ePoly : "A", sr : "A", fa : "A", wt : "A", wh : "A", cp : "A", classa : 15, campus : 50, poly : 500},
   { synt : "P", mt: "P", lt : "P", ePoly : "P", sr : "P", fa : "P", wt : "P", wh : "P", cp : "P", classa : 15, campus : 50, poly : 500}

];
// Creation of first grid store
var mainStore = Ext.widget('mestore', {
//  model: 'StudentDataModel',
//  data: myData
});
function myTolltip(idTraget, titStr, bodyStr){
	   /*var toolTip = new Ext.ToolTip ({       
         //id : 'toolTip',
         cls: 'tooltop-wrap',
         html : bodyStr,
         title : titStr,
         trackMouse: false, // change to false
         anchor: 'right',
         //constrainPosition :false,
         showDelay: 0,
         hideDelay: 0,
         //closable : true,
         closeAction : 'hide',
         width: 300,
     });*/
	   var toolTip = new Ext.ToolTip({
	        target: idTraget,
	        title: titStr,
	        cls: 'tooltop-wrap',
	        anchor: 'right',
	        width:320,
	        html: bodyStr,
	        trackMouse:true
	    });
	   return toolTip;
}
function btnTipl (idbtn, nameToolTip){
	   Ext.create('Ext.Button', {
         renderTo: Ext.getElementById(idbtn),
         text: '',
         border: false,
         style: 'background: none;',
         iconCls: 'fa fa-question-circle',
         listeners: {
            mouseover: function() {
         	   nameToolTip.show();
            },
            mouseout: function() {
         	   nameToolTip.hide();
	           }
            
         }
      });
}

 var arrId = [];
var tooltip1, tooltip2;
var tooltipTitle1 = "title tooltip";
var tooltipContent1 = "this a basic tooltip";
var tooltipTitle2 = "title tooltip2";
var tooltipContent2 = "this a basic tooltip 2";
/*===============================================================*/
Ext.define('ext.view.myMenu.counselApproval.component.grid.grid1', {
  extend : 'Ext.grid.Panel',
  store             : mainStore,
  stripeRows        : true,
  width             : "100%",
  border: false,
  //border: false,
  cls: 'wrapper-table grid-border  group-border',
  bodyCls: 'wrapper-table-body tb-cell tb-cell-center',
  style: 'background: #fff;',
  bodyStyle: 'background: #fff;',
  autoScroll: true,
  autoHeight : true,
  //padding: 15,
  //width: '100%',
  //margin: "20 0 0",
  minHeight: 100,
  header: false,
  preserveScrollOnRefresh : true,
  collapsible       : true,
  enableColumnMove  :true,
  enableColumnResize:true,
  viewConfig : {
	   forceFit : true
  },

  listeners: {
	  afterrender: function(){
		  var idg = this.getId();
		  $("#" + idg + " .button-tip").each(function(e){
			  $(this).attr("id", idg + (e+1));
			  arrId[e] = idg + (e+1);
		  });
		      tooltip1 = myTolltip(arrId[0], tooltipTitle1, tooltipContent1);
	      tooltip2 = myTolltip(arrId[1], tooltipTitle2, tooltipContent2);
		  //btnTipl(arrId[0], tooltip1);
		  //btnTipl(arrId[1], tooltip2);
		    
	  }
  },
	initComponent: function () {
	    var myThis =  this;
	    //this.columns = this.buildItems();
	    this.columns = [
						{
						    text: 'Counsel Monitoring Condition  <span class="button-tip fa fa-question-circle"></span>',
						    align: 'center', minWidth: 720, flex:  9, 
						    cls: 'th-row-groupa',
						    columns:[
						            {text: "Synthesis",minWidth: 80, flex:  1, align: 'center',  dataIndex: 'synt', sortable: true, hideable: true,
					                      renderer: function (val, meta, record) {
					                    	  
					                          return myChar(val);
					                      }},
							        {text: "MT", dataIndex: 'mt', align: 'center', minWidth: 80, flex:  1, sortable: true, hideable: false,
						                      renderer: function (val, meta, record) {
						                    	  
						                          return myChar(val);
						                      }},
							        {text: "LT", dataIndex: 'lt', align: 'center', flex: 1, minWidth: 80, sortable: true,
							                      renderer: function (val, meta, record) {
							                    	  
							                          return myChar(val);
							                      }},
							        {text: "e-POLY", dataIndex: 'ePoly', align: 'center', flex: 1, minWidth: 80,sortable: true, hideable: false,
								                      renderer: function (val, meta, record) {
								                    	  
								                          return myChar(val);
								                      }},
							        {text: "SR", dataIndex: 'sr', align: 'center', flex: 1, minWidth: 80, sortable: true,
									                      renderer: function (val, meta, record) {
									                    	  
									                          return myChar(val);
									                      }},
							        {text: "FA", dataIndex: 'fa', align: 'center', flex: 1, minWidth: 80, sortable: true,
										                      renderer: function (val, meta, record) {
										                    	  
										                          return myChar(val);
										                      }},
							        {text: "WT", dataIndex: 'wt', align: 'center', flex: 1, minWidth: 80, sortable: true,
											                      renderer: function (val, meta, record) {
											                    	  
											                          return myChar(val);
											                      }},
							        {text: "WH", dataIndex: 'wh', align: 'center', flex: 1, minWidth: 80, sortable: true,
												                      renderer: function (val, meta, record) {
												                    	  
												                          return myChar(val);
												                      }},
							        {text: "CP", dataIndex: 'cp', align: 'center', flex: 1, minWidth: 80, sortable: true,
													                      renderer: function (val, meta, record) {
													                    	  
													                          return myChar(val);
													                      }}
						    ]
						},
						{
						    text: 'Rank  <span class="button-tip fa fa-question-circle"></span>',
						    align: 'center', minWidth: 210, flex:  3, 
						    cls: 'th-row-groupa',
						    columns:[
						        {text: "Class", dataIndex: 'classa', align: 'center', minWidth: 70, flex:  1, sortable: true, hideable: false},
						        {text: "Campus", dataIndex: 'campus', align: 'center', flex: 1, minWidth: 70, sortable: true},
						        {text: "POLY", dataIndex: 'poly', align: 'center', flex: 1, minWidth: 70,sortable: true, hideable: false}
						    ]
						}
	     /*================================================*/];
	    this.callParent(arguments);
	    
	}
});
