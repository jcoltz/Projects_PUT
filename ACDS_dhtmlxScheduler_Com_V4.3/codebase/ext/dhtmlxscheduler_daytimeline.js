/*
dhtmlxScheduler v.4.3.0 Professional

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){var e=scheduler.createTimelineView;scheduler.createTimelineView=function(t){function s(){var e=new Date(scheduler.getState().date),s=scheduler.date[_+"_start"](e);s=scheduler.date.date_part(s);var i=[],a=scheduler.matrix[_];a.y_unit=i,a.order={};for(var r=0;r<t.days;r++)i.push({key:+s,label:s}),a.order[a.y_unit[r].key]=r,s=scheduler.date.add(s,1,"day")}function i(e){var t={};for(var s in e)t[s]=e[s];return t}function a(e,t){t.setFullYear(e.getFullYear()),t.setMonth(e.getMonth()),t.setDate(e.getDate())
}function r(e){for(var t=[],s=0;s<e.length;s++){var i=d(e[s]);if(scheduler.isOneDayEvent(i))l(i),t.push(i);else{for(var a=new Date(Math.min(+i.end_date,+scheduler._max_date)),r=new Date(Math.max(+i.start_date,+scheduler._min_date)),o=[];+a>+r;){var _=d(i);_.start_date=r,_.end_date=new Date(Math.min(+h(_.start_date),+a)),r=h(r),l(_),t.push(_),o.push(_)}n(o,i)}}return t}function n(e,t){for(var s=!1,i=!1,a=0,r=e.length;r>a;a++){var n=e[a];s=+n._w_start_date==+t.start_date,i=+n._w_end_date==+t.end_date,n._no_resize_start=n._no_resize_end=!0,s&&(n._no_resize_start=!1),i&&(n._no_resize_end=!1)
}}function d(e){var t=scheduler.getEvent(e.event_pid);return t&&t.isPrototypeOf(e)?(e=scheduler._copy_event(e),delete e.event_length,delete e.event_pid,delete e.rec_pattern,delete e.rec_type):e=scheduler._lame_clone(e),e}function l(e){if(!e._w_start_date||!e._w_end_date){var t=scheduler.date,s=e._w_start_date=new Date(e.start_date),i=e._w_end_date=new Date(e.end_date);e[c]=+t.date_part(e.start_date),e._count||(e._count=1),e._sorder||(e._sorder=0);var a=i-s;e.start_date=new Date(scheduler._min_date),o(s,e.start_date),e.end_date=new Date(+e.start_date+a)
}}function o(e,t){t.setMinutes(e.getMinutes()),t.setHours(e.getHours())}function h(e){var t=scheduler.date.add(e,1,"day");return t=scheduler.date.date_part(t)}if("days"!=t.render)return void e.apply(this,arguments);var _=t.name,c=t.y_property="timeline-week"+_;t.y_unit=[],t.render="bar",t.days=t.days||7,e.call(this,t),scheduler.templates[_+"_scalex_class"]=function(){},scheduler.templates[_+"_scaley_class"]=function(){},scheduler.templates[_+"_scale_label"]=function(e,t){return scheduler.templates.day_date(t)
},scheduler.date[_+"_start"]=function(e){return e=scheduler.date.week_start(e),e=scheduler.date.add(e,t.x_step*t.x_start,t.x_unit)},scheduler.date["add_"+_]=function(e,s){return scheduler.date.add(e,s*t.days,"day")};var u=scheduler._renderMatrix;scheduler._renderMatrix=function(e){e&&s(),u.apply(this,arguments)};var v=scheduler.checkCollision;scheduler.checkCollision=function(e){if(e[c]){var e=i(e);delete e[c]}return v.apply(scheduler,[e])},scheduler.attachEvent("onBeforeDrag",function(e,t,s){var i=s.target||s.srcElement,a=i.className||"";
if("resize"==t)scheduler._w_line_drag_from_start=a.indexOf("dhx_event_resize_end")<0?!0:!1;else if("move"==t&&a.indexOf("no_drag_move")>=0)return!1;return!0});var f=scheduler["mouse_"+_];scheduler["mouse_"+_]=function(e){var t;if(this._drag_event&&(t=this._drag_event._move_delta),void 0===t&&"move"==scheduler._drag_mode){var s=scheduler.matrix[this._mode],i={y:e.y};scheduler._resolve_timeline_section(s,i);var a=e.x-s.dx,r=new Date(i.section);o(scheduler._timeline_drag_date(s,a),r);var n=scheduler._drag_event,d=this.getEvent(this._drag_id);
n._move_delta=(d.start_date-r)/6e4,this.config.preserve_length&&e._ignores&&(n._move_delta=this._get_real_event_length(d.start_date,r,s),n._event_length=this._get_real_event_length(d.start_date,d.end_date,s))}var e=f.apply(scheduler,arguments);if(scheduler._drag_mode&&"move"!=scheduler._drag_mode){var l=null;l=new Date(scheduler._drag_event&&scheduler._drag_event["timeline-week"+_]?scheduler._drag_event["timeline-week"+_]:e.section),e.y+=Math.round((l-scheduler.date.date_part(new Date(scheduler._min_date)))/(6e4*this.config.time_step)),"resize"==scheduler._drag_mode&&(e.resize_from_start=scheduler._w_line_drag_from_start)
}else if(scheduler._drag_event){var h=Math.floor(Math.abs(e.y/(1440/scheduler.config.time_step)));h*=e.y>0?1:-1,e.y=e.y%(1440/scheduler.config.time_step);var c=scheduler.date.date_part(new Date(scheduler._min_date));c.valueOf()!=new Date(e.section).valueOf()&&(e.x=Math.floor((e.section-c)/864e5),e.x+=h)}return e},scheduler.attachEvent("onEventCreated",function(e){return scheduler._events[e]&&delete scheduler._events[e][c],!0}),scheduler.attachEvent("onBeforeEventChanged",function(e){return scheduler._events[e.id]&&delete scheduler._events[e.id][c],!0
});var g=scheduler.render_view_data;scheduler.render_view_data=function(e,t){return this._mode==_&&e&&(e=r(e)),g.apply(scheduler,[e,t])};var m=scheduler.get_visible_events;scheduler.get_visible_events=function(){if(this._mode==_){scheduler._max_date=scheduler.date.date_part(scheduler.date.add(scheduler._min_date,t.days,"day"));var e=m.apply(scheduler,arguments);return r(e)}return m.apply(scheduler,arguments)};var p=scheduler.addEventNow;scheduler.addEventNow=function(e){if(scheduler.getState().mode==_)if(e[c]){var t=new Date(e[c]);
a(t,e.start_date),a(t,e.end_date)}else{var s=new Date(e.start_date);e[c]=+scheduler.date.date_part(s)}return p.apply(scheduler,arguments)};var x=scheduler._render_marked_timespan;scheduler._render_marked_timespan=function(){return scheduler._mode!=_?x.apply(this,arguments):void 0}}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_daytimeline.js.map