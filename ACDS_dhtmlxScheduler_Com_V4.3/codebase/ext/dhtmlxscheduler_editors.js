/*
dhtmlxScheduler v.4.3.0 Professional

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.form_blocks.combo={render:function(e){e.cached_options||(e.cached_options={});var t="";return t+="<div class='"+e.type+"' style='height:"+(e.height||20)+"px;' ></div>"},set_value:function(e,t,s,i){!function(){function t(){if(e._combo&&e._combo.DOMParent){var t=e._combo;t.unload?t.unload():t.destructor&&t.destructor(),t.DOMParent=t.DOMelem=null}}t();var s=scheduler.attachEvent("onAfterLightbox",function(){t(),scheduler.detachEvent(s)})}(),window.dhx_globalImgPath=i.image_path||"/",e._combo=new dhtmlXCombo(e,i.name,e.offsetWidth-8),i.onchange&&e._combo.attachEvent("onChange",i.onchange),i.options_height&&e._combo.setOptionHeight(i.options_height);
var a=e._combo;if(a.enableFilteringMode(i.filtering,i.script_path||null,!!i.cache),i.script_path){var r=s[i.map_to];r?i.cached_options[r]?(a.addOption(r,i.cached_options[r]),a.disable(1),a.selectOption(0),a.disable(0)):dhtmlxAjax.get(i.script_path+"?id="+r+"&uid="+scheduler.uid(),function(e){var t=e.doXPath("//option")[0],s=t.childNodes[0].nodeValue;i.cached_options[r]=s,a.addOption(r,s),a.disable(1),a.selectOption(0),a.disable(0)}):a.setComboValue("")}else{for(var n=[],d=0;d<i.options.length;d++){var l=i.options[d],o=[l.key,l.label,l.css];
n.push(o)}if(a.addOption(n),s[i.map_to]){var h=a.getIndexByValue(s[i.map_to]);a.selectOption(h)}}},get_value:function(e,t,s){var i=e._combo.getSelectedValue();return s.script_path&&(s.cached_options[i]=e._combo.getSelectedText()),i},focus:function(){}},scheduler.form_blocks.radio={render:function(e){var t="";t+="<div class='dhx_cal_ltext dhx_cal_radio' style='height:"+e.height+"px;' >";for(var s=0;s<e.options.length;s++){var i=scheduler.uid();t+="<input id='"+i+"' type='radio' name='"+e.name+"' value='"+e.options[s].key+"'><label for='"+i+"'> "+e.options[s].label+"</label>",e.vertical&&(t+="<br/>")
}return t+="</div>"},set_value:function(e,t,s,i){for(var a=e.getElementsByTagName("input"),r=0;r<a.length;r++){a[r].checked=!1;var n=s[i.map_to]||t;a[r].value==n&&(a[r].checked=!0)}},get_value:function(e){for(var t=e.getElementsByTagName("input"),s=0;s<t.length;s++)if(t[s].checked)return t[s].value},focus:function(){}},scheduler.form_blocks.checkbox={render:function(e){return scheduler.config.wide_form?'<div class="dhx_cal_wide_checkbox" '+(e.height?"style='height:"+e.height+"px;'":"")+"></div>":""
},set_value:function(e,t,s,i){e=document.getElementById(i.id);var a=scheduler.uid(),r="undefined"!=typeof i.checked_value?t==i.checked_value:!!t;e.className+=" dhx_cal_checkbox";var n="<input id='"+a+"' type='checkbox' value='true' name='"+i.name+"'"+(r?"checked='true'":"")+"'>",d="<label for='"+a+"'>"+(scheduler.locale.labels["section_"+i.name]||i.name)+"</label>";if(scheduler.config.wide_form?(e.innerHTML=d,e.nextSibling.innerHTML=n):e.innerHTML=n+d,i.handler){var l=e.getElementsByTagName("input")[0];
l.onclick=i.handler}},get_value:function(e,t,s){e=document.getElementById(s.id);var i=e.getElementsByTagName("input")[0];return i||(i=e.nextSibling.getElementsByTagName("input")[0]),i.checked?s.checked_value||!0:s.unchecked_value||!1},focus:function(){}};
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_editors.js.map