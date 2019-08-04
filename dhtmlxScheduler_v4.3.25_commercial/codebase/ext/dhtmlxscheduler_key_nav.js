/*
@license
dhtmlxScheduler v.4.3.25 Professional

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler._temp_key_scope=function(){function e(e){e=e||window.event,l.x=e.clientX,l.y=e.clientY}function t(){for(var e=document.elementFromPoint(l.x,l.y);e&&e!=scheduler._obj;)e=e.parentNode;return!(e!=scheduler._obj)}function a(e){delete e.rec_type,delete e.rec_pattern,delete e.event_pid,delete e.event_length}scheduler.config.key_nav=!0;var i,n,r=null,l={};document.body?dhtmlxEvent(document.body,"mousemove",e):dhtmlxEvent(window,"load",function(){dhtmlxEvent(document.body,"mousemove",e)}),scheduler.attachEvent("onMouseMove",function(e,t){
i=scheduler.getActionData(t).date,n=scheduler.getActionData(t).section}),scheduler._make_pasted_event=function(e){var t=e.end_date-e.start_date,r=scheduler._lame_copy({},e);if(a(r),r.start_date=new Date(i),r.end_date=new Date(r.start_date.valueOf()+t),n){var l=scheduler._get_section_property();scheduler.config.multisection?r[l]=e[l]:r[l]=n}return r},scheduler._do_paste=function(e,t,a){scheduler.addEvent(t),scheduler.callEvent("onEventPasted",[e,t,a])},scheduler._is_key_nav_active=function(){return this._is_initialized()&&!this._is_lightbox_open()&&this.config.key_nav?!0:!1;
},dhtmlxEvent(document,_isOpera?"keypress":"keydown",function(e){if(!scheduler._is_key_nav_active())return!0;if(e=e||event,37==e.keyCode||39==e.keyCode){e.cancelBubble=!0;var a=scheduler.date.add(scheduler._date,37==e.keyCode?-1:1,scheduler._mode);return scheduler.setCurrentView(a),!0}var i=scheduler._select_id;if(e.ctrlKey&&67==e.keyCode)return i&&(scheduler._buffer_id=i,r=!0,scheduler.callEvent("onEventCopied",[scheduler.getEvent(i)])),!0;if(e.ctrlKey&&88==e.keyCode&&i){r=!1,scheduler._buffer_id=i;
var n=scheduler.getEvent(i);scheduler.updateEvent(n.id),scheduler.callEvent("onEventCut",[n])}if(e.ctrlKey&&86==e.keyCode&&t(e)){var n=scheduler.getEvent(scheduler._buffer_id);if(n){var l=scheduler._make_pasted_event(n);if(r)l.id=scheduler.uid(),scheduler._do_paste(r,l,n);else{var d=scheduler.callEvent("onBeforeEventChanged",[l,e,!1,n]);d&&(scheduler._do_paste(r,l,n),r=!0)}}return!0}})},scheduler._temp_key_scope();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_key_nav.js.map