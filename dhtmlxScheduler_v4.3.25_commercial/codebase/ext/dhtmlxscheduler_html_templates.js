/*
@license
dhtmlxScheduler v.4.3.25 Professional

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.attachEvent("onTemplatesReady",function(){for(var e=document.body.getElementsByTagName("DIV"),t=0;t<e.length;t++){var a=e[t].className||"";if(a=a.split(":"),2==a.length&&"template"==a[0]){var i='return "'+(e[t].innerHTML||"").replace(/\"/g,'\\"').replace(/[\n\r]+/g,"")+'";';i=unescape(i).replace(/\{event\.([a-z]+)\}/g,function(e,t){return'"+ev.'+t+'+"'}),scheduler.templates[a[1]]=Function("start","end","ev",i),e[t].style.display="none"}}});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_html_templates.js.map