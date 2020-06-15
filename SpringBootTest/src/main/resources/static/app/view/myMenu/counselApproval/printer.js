Ext.define('ext.view.myMenu.counselApproval.printer', {
    extend: 'Ext.panel.Panel',
    
    print: function(pnl) {
        if (!pnl) {
            pnl = this;
        }
 
        // instantiate hidden iframe
 
        var iFrameId = "printerFrame";
        var printFrame = Ext.get(iFrameId);
 
        if (printFrame == null) {
            printFrame = Ext.getBody().appendChild({
                id: iFrameId,
                tag: 'iframe',
                cls: 'x-hidden',
                style: {
                    'display': "none",
                }
            });
        }
 
        var cw = printFrame.dom.contentWindow;
 
        // instantiate application stylesheets in the hidden iframe
 
        var stylesheets = "";
        for (var i = 0; i < document.styleSheets.length; i++) {
            stylesheets += Ext.String.format('<link rel="stylesheet" href="{0}" />', document.styleSheets[i].href);
        }

        
        // various style overrides
        /*stylesheets += ''.concat(
          "<style>", 
          "@media print{",
          ".no-print { display: none; }",
          ".print { display: block; }}",
            ".x-panel-body {overflow: visible !important;}",
            // experimental - page break after embedded panels
            // .x-panel {page-break-after: always; margin-top: 10px}",
          "</style>"
         );
 
        // get the contents of the panel and remove hardcoded overflow properties
        var markup = pnl.getEl().dom.innerHTML;
        while (markup.indexOf('overflow: auto;') >= 0) {
            markup = markup.replace('overflow: auto;', '');
        }
 
        var str = Ext.String.format('<html><head>{0}</head><body>{1}</body></html>',stylesheets,markup);*/
        stylesheets += ''.concat(
                "<style>",
                ".x-panel-body {overflow: visible !important;}",
                // experimental - page break after embedded panels
                // .x-panel {page-break-after: always; margin-top: 10px}",
                "</style>"
            );
     // get the contents of the panel and remove hardcoded overflow properties
        var markup = pnl.getEl().down('.x-autocontainer-innerCt').dom.innerHTML;
        
        while (markup.indexOf('overflow: auto;') >= 0) {
            markup = markup.replace('overflow: auto;', '');
        }
 
        var str = Ext.String.format('<html><head>{0}</head><body>{1}</body></html>', stylesheets, markup);
 
        // output to the iframe
        cw.document.open();
        cw.document.write(str);
        cw.document.close();
        var myVar;
        clearTimeout(myVar);
        myVar = setTimeout(function(){ 
//        	 var domHTml = new String(str);
//       	 	 var printHtml = document.createElement('html');
//        	 printHtml.innerHTML = '<head>';
//        	 printHtml.innerHTML = '</head>';
//        	 printHtml.innerHTML = '<body><div>'+domHTml+'</div></body>';
//        	 console.log('test printer html');
// 	         console.log(printHtml);
// 	         var doc = printHtml.ownerDocument;
// 	         var win = doc.defaultView;
//		
        
//		     doc.body.innerHTML = originalContents;


//	         cw.document.close();
//             cw.print();
             // remove style attrib that has hardcoded height property
             //   cw.document.getElementsByTagName('DIV')[0].removeAttribute('style');
      
             // print the iframe
             // destroy the iframe
//        	var printerCnt = require('/resources/app/view/myMenu/counselApproval/printContent.html')
//        	printerCnt.printDiv();
//        	Ext.Loader.loadScript({
//        	     url: CONTEXT_PATH+'/resources/app/view/myMenu/counselApproval/printContent.js?'
//        	    ,onLoad: function(response){
//        	    	var data = Ext.decode(response.responseText)
//        	        console.log('ok load javascript file');
//        	    }
//        	    ,onError: function(){
//        	        console.log('error');
//        	    }
//        	});
//        	pnl.on('afterrender',function(){
//        		Ext.Ajax.request({
//            		url: CONTEXT_PATH+'/resources/app/view/myMenu/counselApproval/printer123.html',
//            		success: function(response, opts) {
//            			console.log('CONTEXT_PATH : '+CONTEXT_PATH)
//            			console.log(response.responseText)
////            			pnl.update(response.responseText);
//            		}
//            	})
//        	})

       	 	 /*var printContents = cw.document.getElementsByTagName('div')[0].innerHTML;
		     var originalContents = cw.document.body.innerHTML;
		 	 cw.focus();
       	     cw.print();
		     cw.document.body.innerHTML = printContents;
           Ext.fly(iFrameId).destroy();*/
        	
        	cw.print();
        	 
            // destroy the iframe
            Ext.fly(iFrameId).destroy();
        }, 1000);
    }
  
});