// JavaScript Document
function hide_show_div_by_id(tar_id) {
   if(document.all) {
      if(document.all.item(tar_id).style.display == 'none') {
         document.all.item(tar_id).style.display = 'block'; 
         }
      else {
         document.all.item(tar_id).style.display = 'none'; 
         }
      }
   else if(document.getElementById) {
      if(document.getElementById(tar_id).style.display == 'none') {
         document.getElementById(tar_id).style.display = 'block'; 
         }
      else {
         document.getElementById(tar_id).style.display = 'none'; 
         }
      }
   }

var http_request = false;
function runMaintOptions(parameters) {
	http_request = false;
     if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
        	// set type accordingly to anticipated content type
           //http_request.overrideMimeType('text/xml');
           http_request.overrideMimeType('text/html');
        }
     } else if (window.ActiveXObject) { // IE
        try {
           http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
           try {
              http_request = new ActiveXObject("Microsoft.XMLHTTP");
           } catch (e) {}
        }
     }
     if (!http_request) {
        alert('Cannot create XMLHTTP instance');
        return false;
     }
     
     http_request.onreadystatechange = showResults;
     http_request.open('POST', guid +'_maint_lookup_runoptions.a5w', true);
	 
     http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     //http_request.setRequestHeader("Content-length", parameters.length);
     //http_request.setRequestHeader("Connection", "close");
     http_request.send(parameters);
  }


function showResults() {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
           //alert(http_request.responseText);
   		//results = http_request.responseText.split(",");
   		//document.getElementById('upd').value = results[0];
   		document.getElementById('returnval').innerHTML = http_request.responseText;

        	} else {
           alert('There was a problem with the request. ERROR: '+http_request.status);
        }
     }
  }

  
function runMaint() {
	var get = ''
	for (i=0;i<options.length;i++){
	var temparray = new Array();
	if (document.getElementById(options[i]+'list') !== null) {
	 	var selObjp = document.getElementById(options[i]+'list');
 		var i;
 		var count = 0;
 	 	for (x=0; x<selObjp.options.length; x++) {
	   		if (selObjp.options[x].selected) {
     		temparray[count] = selObjp.options[x].value;
     		count++;
 	  		}
 		}
		get = get +'&'+options[i]+'='+temparray.join();
	}
	}
	try {
	runMaintOptions(get+'&call='+callurl+'&lang='+activelanguage);
	}
	catch(e) {
	runMaintOptions(get+'&call='+callurl);
	}
}


function DeselectAll(){
	for (i=0;i<options.length;i++){
	if (document.getElementById(options[i]+'list') !== null) {
	 	var selObjp = document.getElementById(options[i]+'list');
		selObjp.selectedIndex=0
 	 	for (x=0; x<selObjp.options.length; x++) {
	   		selObjp.options[x].selected = false;
 	  		}
 		}
	}
}
		

