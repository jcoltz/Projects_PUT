function makeRequest(url, parameters){
	http_request = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/xml');
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
	http_request.onreadystatechange = alertContents;
	//prompt('String',url+'?'+parameters)
	http_request.open('POST',url,true);
	http_request.send(parameters);
}
	
function alertContents(){
	if (http_request.readyState == 4){
		if (http_request.status == 200) {
			//var xmldoc = http_request.responseXML;
			//var root = xmldoc.childNodes.item(0);
			eval(http_request.responseText);
			//alert(root.textContent);
			//alert(xmldoc.nodeName);
		} else {
			alert('There was a problem with the request.');
		}
	}
}