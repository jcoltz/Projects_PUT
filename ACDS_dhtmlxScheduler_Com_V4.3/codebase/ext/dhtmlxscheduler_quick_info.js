/*
dhtmlxScheduler v.4.3.0 Professional

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.config.icons_select=["icon_details","icon_delete"],scheduler.config.details_on_create=!0,scheduler.config.show_quick_info=!0,scheduler.xy.menu_width=0,scheduler.attachEvent("onClick",function(e){return scheduler.showQuickInfo(e),!0}),function(){for(var e=["onEmptyClick","onViewChange","onLightbox","onBeforeEventDelete","onBeforeDrag"],t=function(){return scheduler._hideQuickInfo(),!0},r=0;r<e.length;r++)scheduler.attachEvent(e[r],t)}(),scheduler.templates.quick_info_title=function(e,t,r){return r.text.substr(0,50)
},scheduler.templates.quick_info_content=function(e,t,r){return r.details||r.text},scheduler.templates.quick_info_date=function(e,t,r){return scheduler.isOneDayEvent(r)?scheduler.templates.day_date(e,t,r)+" "+scheduler.templates.event_header(e,t,r):scheduler.templates.week_date(e,t,r)},scheduler.showQuickInfo=function(e){if(e!=this._quick_info_box_id&&this.config.show_quick_info){this.hideQuickInfo(!0);var t=this._get_event_counter_part(e);t&&(this._quick_info_box=this._init_quick_info(t),this._fill_quick_data(e),this._show_quick_info(t))
}},scheduler._hideQuickInfo=function(){scheduler.hideQuickInfo()},scheduler.hideQuickInfo=function(e){var t=this._quick_info_box;if(this._quick_info_box_id=0,t&&t.parentNode){var r=t._offsetWidth;if(scheduler.config.quick_info_detached)return t.parentNode.removeChild(t);"auto"==t.style.right?t.style.left=-r+"px":t.style.right=-r+"px",e&&t.parentNode.removeChild(t)}},dhtmlxEvent(window,"keydown",function(e){27==e.keyCode&&scheduler.hideQuickInfo()}),scheduler._show_quick_info=function(e){var t=scheduler._quick_info_box;
scheduler._obj.appendChild(t);var r=t.offsetWidth,s=t.offsetHeight;scheduler.config.quick_info_detached?(t.style.left=e.left-e.dx*(r-e.width)+"px",t.style.top=e.top-(e.dy?s:-e.height)+"px"):(t.style.top=this.xy.scale_height+this.xy.nav_height+20+"px",1==e.dx?(t.style.right="auto",t.style.left=-r+"px",setTimeout(function(){t.style.left="-10px"},1)):(t.style.left="auto",t.style.right=-r+"px",setTimeout(function(){t.style.right="-10px"},1)),t.className=t.className.replace("dhx_qi_left","").replace("dhx_qi_right","")+" dhx_qi_"+(1==e?"left":"right"))
},scheduler.attachEvent("onTemplatesReady",function(){if(scheduler.hideQuickInfo(),this._quick_info_box){var e=this._quick_info_box;e.parentNode&&e.parentNode.removeChild(e),this._quick_info_box=null}}),scheduler._quick_info_onscroll_handler=function(){scheduler.hideQuickInfo()},scheduler._init_quick_info=function(){if(!this._quick_info_box){var e=scheduler.xy,t=this._quick_info_box=document.createElement("div");t.className="dhx_cal_quick_info",scheduler.$testmode&&(t.className+=" dhx_no_animate");
var r='<div class="dhx_cal_qi_title" style="height:'+e.quick_info_title+'px"><div class="dhx_cal_qi_tcontent"></div><div  class="dhx_cal_qi_tdate"></div></div><div class="dhx_cal_qi_content"></div>';r+='<div class="dhx_cal_qi_controls" style="height:'+e.quick_info_buttons+'px">';for(var s=scheduler.config.icons_select,a=0;a<s.length;a++)r+='<div class="dhx_qi_big_icon '+s[a]+'" title="'+scheduler.locale.labels[s[a]]+"\"><div class='dhx_menu_icon "+s[a]+"'></div><div>"+scheduler.locale.labels[s[a]]+"</div></div>";
r+="</div>",t.innerHTML=r,dhtmlxEvent(t,"click",function(e){e=e||event,scheduler._qi_button_click(e.target||e.srcElement)}),scheduler.config.quick_info_detached&&(scheduler._detachDomEvent(scheduler._els.dhx_cal_data[0],"scroll",scheduler._quick_info_onscroll_handler),dhtmlxEvent(scheduler._els.dhx_cal_data[0],"scroll",scheduler._quick_info_onscroll_handler))}return this._quick_info_box},scheduler._qi_button_click=function(e){var t=scheduler._quick_info_box;if(e&&e!=t){var r=e.className;if(-1!=r.indexOf("_icon")){var s=scheduler._quick_info_box_id;
scheduler._click.buttons[r.split(" ")[1].replace("icon_","")](s)}else scheduler._qi_button_click(e.parentNode)}},scheduler._get_event_counter_part=function(e){for(var t=scheduler.getRenderedEvent(e),r=0,s=0,a=t;a&&a!=scheduler._obj;)r+=a.offsetLeft,s+=a.offsetTop-a.scrollTop,a=a.offsetParent;if(a){var n=r+t.offsetWidth/2>scheduler._x/2?1:0,d=s+t.offsetHeight/2>scheduler._y/2?1:0;return{left:r,top:s,dx:n,dy:d,width:t.offsetWidth,height:t.offsetHeight}}return 0},scheduler._fill_quick_data=function(e){var t=scheduler.getEvent(e),r=scheduler._quick_info_box;
scheduler._quick_info_box_id=e;var s=r.firstChild.firstChild;s.innerHTML=scheduler.templates.quick_info_title(t.start_date,t.end_date,t);var a=s.nextSibling;a.innerHTML=scheduler.templates.quick_info_date(t.start_date,t.end_date,t);var n=r.firstChild.nextSibling;n.innerHTML=scheduler.templates.quick_info_content(t.start_date,t.end_date,t)};
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_quick_info.js.map