(function(b){b.fn.ajaxSubmit=function(p){if(!this.length){a("ajaxSubmit: skipping submit process - no element selected");return this}if(typeof p=="function"){p={success:p}}p=b.extend({url:this.attr("action")||window.location.toString(),type:this.attr("method")||"GET"},p||{});var s={};this.trigger("form-pre-serialize",[this,p,s]);if(s.veto){a("ajaxSubmit: submit vetoed via form-pre-serialize trigger");return this}if(p.beforeSerialize&&p.beforeSerialize(this,p)===false){a("ajaxSubmit: submit aborted via beforeSerialize callback");return this}var i=this.formToArray(p.semantic);if(p.data){p.extraData=p.data;for(var e in p.data){if(p.data[e] instanceof Array){for(var f in p.data[e]){i.push({name:e,value:p.data[e][f]})}}else{i.push({name:e,value:p.data[e]})}}}if(p.beforeSubmit&&p.beforeSubmit(i,this,p)===false){a("ajaxSubmit: submit aborted via beforeSubmit callback");return this}this.trigger("form-submit-validate",[i,this,p,s]);if(s.veto){a("ajaxSubmit: submit vetoed via form-submit-validate trigger");return this}var d=b.param(i);if(p.type.toUpperCase()=="GET"){p.url+=(p.url.indexOf("?")>=0?"&":"?")+d;p.data=null}else{p.data=d}var r=this,h=[];if(p.resetForm){h.push(function(){r.resetForm()})}if(p.clearForm){h.push(function(){r.clearForm()})}if(!p.dataType&&p.target){var m=p.success||function(){};h.push(function(j){b(p.target).html(j).each(m,arguments)})}else{if(p.success){h.push(p.success)}}p.success=function(q,k){for(var n=0,j=h.length;n<j;n++){h[n].apply(p,[q,k,r])}};var c=b("input:file",this).fieldValue();var o=false;for(var g=0;g<c.length;g++){if(c[g]){o=true}}if(p.iframe||o){if(b.browser.safari&&p.closeKeepAlive){b.get(p.closeKeepAlive,l)}else{l()}}else{b.ajax(p)}this.trigger("form-submit-notify",[this,p]);return this;function l(){var u=r[0];if(b(":input[@name=submit]",u).length){alert('Error: Form elements must not be named "submit".');return}var q=b.extend({},b.ajaxSettings,p);var D=b.extend(true,{},b.extend(true,{},b.ajaxSettings),q);var t="jqFormIO"+(new Date().getTime());var y=b('<iframe id="'+t+'" name="'+t+'" />');var B=y[0];if(b.browser.msie||b.browser.opera){B.src='javascript:false;document.write("");'}y.css({position:"absolute",top:"-1000px",left:"-1000px"});var C={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(){this.aborted=1;y.attr("src","about:blank")}};var A=q.global;if(A&&!b.active++){b.event.trigger("ajaxStart")}if(A){b.event.trigger("ajaxSend",[C,q])}if(D.beforeSend&&D.beforeSend(C,D)===false){D.global&&b.active--;return}if(C.aborted){return}var k=0;var w=0;var j=u.clk;if(j){var v=j.name;if(v&&!j.disabled){p.extraData=p.extraData||{};p.extraData[v]=j.value;if(j.type=="image"){p.extraData[name+".x"]=u.clk_x;p.extraData[name+".y"]=u.clk_y}}}setTimeout(function(){var G=r.attr("target"),E=r.attr("action");r.attr({target:t,method:"POST",action:q.url});if(!p.skipEncodingOverride){r.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"})}if(q.timeout){setTimeout(function(){w=true;x()},q.timeout)}var F=[];try{if(p.extraData){for(var H in p.extraData){F.push(b('<input type="hidden" name="'+H+'" value="'+p.extraData[H]+'" />').appendTo(u)[0])}}y.appendTo("body");B.attachEvent?B.attachEvent("onload",x):B.addEventListener("load",x,false);u.submit()}finally{r.attr("action",E);G?r.attr("target",G):r.removeAttr("target");b(F).remove()}},10);function x(){if(k++){return}B.detachEvent?B.detachEvent("onload",x):B.removeEventListener("load",x,false);var E=0;var F=true;try{if(w){throw"timeout"}var G,I;I=B.contentWindow?B.contentWindow.document:B.contentDocument?B.contentDocument:B.document;if(I.body==null&&!E&&b.browser.opera){E=1;k--;setTimeout(x,100);return}C.responseText=I.body?I.body.innerHTML:null;C.responseXML=I.XMLDocument?I.XMLDocument:I;C.getResponseHeader=function(K){var J={"content-type":q.dataType};return J[K]};if(q.dataType=="json"||q.dataType=="script"){var n=I.getElementsByTagName("textarea")[0];C.responseText=n?n.value:C.responseText}else{if(q.dataType=="xml"&&!C.responseXML&&C.responseText!=null){C.responseXML=z(C.responseText)}}G=b.httpData(C,q.dataType)}catch(H){F=false;b.handleError(q,C,"error",H)}if(F){q.success(G,"success");if(A){b.event.trigger("ajaxSuccess",[C,q])}}if(A){b.event.trigger("ajaxComplete",[C,q])}if(A&&!--b.active){b.event.trigger("ajaxStop")}if(q.complete){q.complete(C,F?"success":"error")}setTimeout(function(){y.remove();C.responseXML=null},100)}function z(n,E){if(window.ActiveXObject){E=new ActiveXObject("Microsoft.XMLDOM");E.async="false";E.loadXML(n)}else{E=(new DOMParser()).parseFromString(n,"text/xml")}return(E&&E.documentElement&&E.documentElement.tagName!="parsererror")?E:null}}};b.fn.ajaxForm=function(c){return this.ajaxFormUnbind().bind("submit.form-plugin",function(){b(this).ajaxSubmit(c);return false}).each(function(){b(":submit,input:image",this).bind("click.form-plugin",function(f){var d=this.form;d.clk=this;if(this.type=="image"){if(f.offsetX!=undefined){d.clk_x=f.offsetX;d.clk_y=f.offsetY}else{if(typeof b.fn.offset=="function"){var g=b(this).offset();d.clk_x=f.pageX-g.left;d.clk_y=f.pageY-g.top}else{d.clk_x=f.pageX-this.offsetLeft;d.clk_y=f.pageY-this.offsetTop}}}setTimeout(function(){d.clk=d.clk_x=d.clk_y=null},10)})})};b.fn.ajaxFormUnbind=function(){this.unbind("submit.form-plugin");return this.each(function(){b(":submit,input:image",this).unbind("click.form-plugin")})};b.fn.formToArray=function(q){var p=[];if(this.length==0){return p}var d=this[0];var h=q?d.getElementsByTagName("*"):d.elements;if(!h){return p}for(var k=0,m=h.length;k<m;k++){var e=h[k];var f=e.name;if(!f){continue}if(q&&d.clk&&e.type=="image"){if(!e.disabled&&d.clk==e){p.push({name:f+".x",value:d.clk_x},{name:f+".y",value:d.clk_y})}continue}var r=b.fieldValue(e,true);if(r&&r.constructor==Array){for(var g=0,c=r.length;g<c;g++){p.push({name:f,value:r[g]})}}else{if(r!==null&&typeof r!="undefined"){p.push({name:f,value:r})}}}if(!q&&d.clk){var l=d.getElementsByTagName("input");for(var k=0,m=l.length;k<m;k++){var o=l[k];var f=o.name;if(f&&!o.disabled&&o.type=="image"&&d.clk==o){p.push({name:f+".x",value:d.clk_x},{name:f+".y",value:d.clk_y})}}}return p};b.fn.formSerialize=function(c){return b.param(this.formToArray(c))};b.fn.fieldSerialize=function(d){var c=[];this.each(function(){var h=this.name;if(!h){return}var f=b.fieldValue(this,d);if(f&&f.constructor==Array){for(var g=0,e=f.length;g<e;g++){c.push({name:h,value:f[g]})}}else{if(f!==null&&typeof f!="undefined"){c.push({name:this.name,value:f})}}});return b.param(c)};b.fn.fieldValue=function(h){for(var g=[],e=0,c=this.length;e<c;e++){var f=this[e];var d=b.fieldValue(f,h);if(d===null||typeof d=="undefined"||(d.constructor==Array&&!d.length)){continue}d.constructor==Array?b.merge(g,d):g.push(d)}return g};b.fieldValue=function(c,j){var e=c.name,p=c.type,q=c.tagName.toLowerCase();if(typeof j=="undefined"){j=true}if(j&&(!e||c.disabled||p=="reset"||p=="button"||(p=="checkbox"||p=="radio")&&!c.checked||(p=="submit"||p=="image")&&c.form&&c.form.clk!=c||q=="select"&&c.selectedIndex==-1)){return null}if(q=="select"){var k=c.selectedIndex;if(k<0){return null}var m=[],d=c.options;var g=(p=="select-one");var l=(g?k+1:d.length);for(var f=(g?k:0);f<l;f++){var h=d[f];if(h.selected){var o=b.browser.msie&&!(h.attributes.value.specified)?h.text:h.value;if(g){return o}m.push(o)}}return m}return c.value};b.fn.clearForm=function(){return this.each(function(){b("input,select,textarea",this).clearFields()})};b.fn.clearFields=b.fn.clearInputs=function(){return this.each(function(){var d=this.type,c=this.tagName.toLowerCase();if(d=="text"||d=="password"||c=="textarea"){this.value=""}else{if(d=="checkbox"||d=="radio"){this.checked=false}else{if(c=="select"){this.selectedIndex=-1}}}})};b.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){this.reset()}})};b.fn.enable=function(c){if(c==undefined){c=true}return this.each(function(){this.disabled=!c})};b.fn.selected=function(c){if(c==undefined){c=true}return this.each(function(){var d=this.type;if(d=="checkbox"||d=="radio"){this.checked=c}else{if(this.tagName.toLowerCase()=="option"){var e=b(this).parent("select");if(c&&e[0]&&e[0].type=="select-one"){e.find("option").selected(false)}this.selected=c}}})};function a(){if(b.fn.ajaxSubmit.debug&&window.console&&window.console.log){window.console.log("[jquery.form] "+Array.prototype.join.call(arguments,""))}}})(jQuery);