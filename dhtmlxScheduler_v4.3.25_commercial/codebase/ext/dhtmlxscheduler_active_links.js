/*
@license
dhtmlxScheduler v.4.3.25 Professional

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.config.active_link_view="day",scheduler._active_link_click=function(e){var t=e.target||event.srcElement,a=t.getAttribute("jump_to"),i=scheduler.date.str_to_date(scheduler.config.api_date);return a?(scheduler.setCurrentView(i(a),scheduler.config.active_link_view),e&&e.preventDefault&&e.preventDefault(),!1):void 0},scheduler.attachEvent("onTemplatesReady",function(){var e=function(e,t){t=t||e+"_scale_date",scheduler.templates["_active_links_old_"+t]||(scheduler.templates["_active_links_old_"+t]=scheduler.templates[t]);
var a=scheduler.templates["_active_links_old_"+t],i=scheduler.date.date_to_str(scheduler.config.api_date);scheduler.templates[t]=function(e){return"<a jump_to='"+i(e)+"' href='#'>"+a(e)+"</a>"}};if(e("week"),e("","month_day"),this.matrix)for(var t in this.matrix)e(t);this._detachDomEvent(this._obj,"click",scheduler._active_link_click),dhtmlxEvent(this._obj,"click",scheduler._active_link_click)});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_active_links.js.map