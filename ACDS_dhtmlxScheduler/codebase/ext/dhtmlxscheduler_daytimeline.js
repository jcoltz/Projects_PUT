/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){var e=scheduler.createTimelineView;scheduler.createTimelineView=function(t){function a(){var e=new Date(scheduler.getState().date),a=scheduler.date[c+"_start"](e);a=scheduler.date.date_part(a);var i=[],n=scheduler.matrix[c];n.y_unit=i,n.order={};for(var r=0;r<t.days;r++)i.push({key:+a,label:a}),n.order[n.y_unit[r].key]=r,a=scheduler.date.add(a,1,"day")}function i(e){var t={};for(var a in e)t[a]=e[a];return t}function n(e,t){t.setFullYear(e.getFullYear()),t.setMonth(e.getMonth()),t.setDate(e.getDate());

}function r(e){for(var t=[],a=0;a<e.length;a++){var i=d(e[a]);if(scheduler.isOneDayEvent(i))o(i),t.push(i);else{for(var n=new Date(Math.min(+i.end_date,+scheduler._max_date)),r=new Date(Math.max(+i.start_date,+scheduler._min_date)),s=[];+n>+r;){var c=d(i);c.start_date=r,c.end_date=new Date(Math.min(+_(c.start_date),+n)),r=_(r),o(c),t.push(c),s.push(c)}l(s,i)}}return t}function l(e,t){for(var a=!1,i=!1,n=0,r=e.length;r>n;n++){var l=e[n];a=+l._w_start_date==+t.start_date,i=+l._w_end_date==+t.end_date,
l._no_resize_start=l._no_resize_end=!0,a&&(l._no_resize_start=!1),i&&(l._no_resize_end=!1)}}function d(e){var t=scheduler.getEvent(e.event_pid);return t&&t.isPrototypeOf(e)?(e=scheduler._copy_event(e),delete e.event_length,delete e.event_pid,delete e.rec_pattern,delete e.rec_type):e=scheduler._lame_clone(e),e}function o(e){if(!e._w_start_date||!e._w_end_date){var t=scheduler.date,a=e._w_start_date=new Date(e.start_date),i=e._w_end_date=new Date(e.end_date);e[u]=+t.date_part(e.start_date),e._count||(e._count=1),
e._sorder||(e._sorder=0);var n=i-a;e.start_date=new Date(scheduler._min_date),s(a,e.start_date),e.end_date=new Date(+e.start_date+n)}}function s(e,t){t.setMinutes(e.getMinutes()),t.setHours(e.getHours())}function _(e){var t=scheduler.date.add(e,1,"day");return t=scheduler.date.date_part(t)}if("days"!=t.render)return void e.apply(this,arguments);var c=t.name,u=t.y_property="timeline-week"+c;t.y_unit=[],t.render="bar",t.days=t.days||7,e.call(this,t),scheduler.templates[c+"_scalex_class"]=function(){},
scheduler.templates[c+"_scaley_class"]=function(){},scheduler.templates[c+"_scale_label"]=function(e,t,a){return scheduler.templates.day_date(t)},scheduler.date[c+"_start"]=function(e){return e=scheduler.date.week_start(e),e=scheduler.date.add(e,t.x_step*t.x_start,t.x_unit)},scheduler.date["add_"+c]=function(e,a){return scheduler.date.add(e,a*t.days,"day")};var h=scheduler._renderMatrix;scheduler._renderMatrix=function(e,t){e&&a(),h.apply(this,arguments)};var p=scheduler.checkCollision;scheduler.checkCollision=function(e){
if(e[u]){var e=i(e);delete e[u]}return p.apply(scheduler,[e])},scheduler.attachEvent("onBeforeDrag",function(e,t,a){var i=a.target||a.srcElement,n=i.className||"";if("resize"==t)n.indexOf("dhx_event_resize_end")<0?scheduler._w_line_drag_from_start=!0:scheduler._w_line_drag_from_start=!1;else if("move"==t&&n.indexOf("no_drag_move")>=0)return!1;return!0});var v=scheduler["mouse_"+c];scheduler["mouse_"+c]=function(e){var t;if(this._drag_event&&(t=this._drag_event._move_delta),void 0===t&&"move"==scheduler._drag_mode){
var a=scheduler.matrix[this._mode],i={y:e.y};scheduler._resolve_timeline_section(a,i);var n=e.x-a.dx,r=new Date(i.section);s(scheduler._timeline_drag_date(a,n),r);var l=scheduler._drag_event,d=this.getEvent(this._drag_id);l._move_delta=(d.start_date-r)/6e4,this.config.preserve_length&&e._ignores&&(l._move_delta=this._get_real_event_length(d.start_date,r,a),l._event_length=this._get_real_event_length(d.start_date,d.end_date,a))}var e=v.apply(scheduler,arguments);if(scheduler._drag_mode&&"move"!=scheduler._drag_mode){
var o=null;o=new Date(scheduler._drag_event&&scheduler._drag_event["timeline-week"+c]?scheduler._drag_event["timeline-week"+c]:e.section),e.y+=Math.round((o-scheduler.date.date_part(new Date(scheduler._min_date)))/(6e4*this.config.time_step)),"resize"==scheduler._drag_mode&&(e.resize_from_start=scheduler._w_line_drag_from_start)}else if(scheduler._drag_event){var _=Math.floor(Math.abs(e.y/(1440/scheduler.config.time_step)));_*=e.y>0?1:-1,e.y=e.y%(1440/scheduler.config.time_step);var u=scheduler.date.date_part(new Date(scheduler._min_date));

u.valueOf()!=new Date(e.section).valueOf()&&(e.x=Math.floor((e.section-u)/864e5),e.x+=_)}return e},scheduler.attachEvent("onEventCreated",function(e,t){return scheduler._events[e]&&delete scheduler._events[e][u],!0}),scheduler.attachEvent("onBeforeEventChanged",function(e,t,a,i){return scheduler._events[e.id]&&delete scheduler._events[e.id][u],!0});var m=scheduler.render_view_data;scheduler.render_view_data=function(e,t){return this._mode==c&&e&&(e=r(e)),m.apply(scheduler,[e,t])};var b=scheduler.get_visible_events;

scheduler.get_visible_events=function(){if(this._mode==c){scheduler._max_date=scheduler.date.date_part(scheduler.date.add(scheduler._min_date,t.days,"day"));var e=b.apply(scheduler,arguments);return r(e)}return b.apply(scheduler,arguments)};var g=scheduler.addEventNow;scheduler.addEventNow=function(e){if(scheduler.getState().mode==c)if(e[u]){var t=new Date(e[u]);n(t,e.start_date),n(t,e.end_date)}else{var a=new Date(e.start_date);e[u]=+scheduler.date.date_part(a)}return g.apply(scheduler,arguments);

};var y=scheduler._render_marked_timespan;scheduler._render_marked_timespan=function(){return scheduler._mode!=c?y.apply(this,arguments):void 0}}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_daytimeline.js.map