/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.config.multisection=!0,scheduler.config.multisection_shift_all=!0,scheduler.config.section_delemiter=",",scheduler.attachEvent("onSchedulerReady",function(){var e=scheduler._update_unit_section;scheduler._update_unit_section=function(t){return scheduler._update_sections(t,e)};var t=scheduler._update_timeline_section;scheduler._update_timeline_section=function(e){return scheduler._update_sections(e,t)},scheduler.isMultisectionEvent=function(e){if(e&&this._get_multisection_view()){var t=this._get_event_sections(e);

return t.length>1}return!1},scheduler._get_event_sections=function(e){var t=this._get_section_property(),a=e[t]||"";return this._parse_event_sections(a)},scheduler._parse_event_sections=function(e){return e instanceof Array?e:e.toString().split(scheduler.config.section_delemiter)},scheduler._register_copies_array=function(e){for(var t=0;t<e.length;t++)this._register_copy(e[t])},scheduler._register_copy=function(e){this._multisection_copies[e.id]||(this._multisection_copies[e.id]={});var t=e[this._get_section_property()],a=this._multisection_copies[e.id];

a[t]||(a[t]=e)},scheduler._get_copied_event=function(e,t){if(!this._multisection_copies[e])return null;if(this._multisection_copies[e][t])return this._multisection_copies[e][t];var a=this._multisection_copies[e];if(scheduler._drag_event&&scheduler._drag_event._orig_section&&a[scheduler._drag_event._orig_section])return a[scheduler._drag_event._orig_section];var r=1/0,n=null;for(var i in a)a[i]._sorder<r&&(n=a[i],r=a[i]._sorder);return n},scheduler._clear_copied_events=function(){this._multisection_copies={};

},scheduler._clear_copied_events(),scheduler._split_events=function(e){var t=[],a=this._get_multisection_view(),r=this._get_section_property();if(a)for(var n=0;n<e.length;n++){var i=this._get_event_sections(e[n]);if(i.length>1){for(var d=0;d<i.length;d++)if("undefined"!=typeof a.order[i[d]]){var l=scheduler._copy_event(e[n]);l[r]=i[d],t.push(l)}}else t.push(e[n])}else t=e;return t},scheduler._get_multisection_view=function(){return this.config.multisection?scheduler._get_section_view():!1};var a=scheduler.get_visible_events;

scheduler.get_visible_events=function(e){this._clear_copied_events();var t=a.apply(this,arguments);if(this._get_multisection_view()){t=this._split_events(t);for(var r=0;r<t.length;r++)this.is_visible_events(t[r])||(t.splice(r,1),r--);this._register_copies_array(t)}return t},scheduler._rendered_events={};var r=scheduler.render_view_data;scheduler.render_view_data=function(e,t){return this._get_multisection_view()&&e&&(e=this._split_events(e),this._restore_render_flags(e)),r.apply(this,[e,t])},scheduler._restore_render_flags=function(e){
for(var t=this._get_section_property(),a=0;a<e.length;a++){var r=e[a],n=scheduler._get_copied_event(r.id,r[t]);if(n)for(var i in n)0===i.indexOf("_")&&(r[i]=n[i])}},scheduler._update_sections=function(e,t){var a=e.view,r=e.event,n=e.pos;if(scheduler.isMultisectionEvent(r)){if(scheduler._drag_event._orig_section||(scheduler._drag_event._orig_section=n.section),scheduler._drag_event._orig_section!=n.section){var i=a.order[n.section]-a.order[scheduler._drag_event._orig_section];if(i){var d=this._get_event_sections(r),l=[],s=!0;

if(scheduler.config.multisection_shift_all)for(var o=0;o<d.length;o++){var _=scheduler._shift_sections(a,d[o],i);if(null===_){l=d,s=!1;break}l[o]=_}else for(var o=0;o<d.length;o++){if(d[o]==n.section){l=d,s=!1;break}if(d[o]==scheduler._drag_event._orig_section){var _=scheduler._shift_sections(a,d[o],i);if(null===_){l=d,s=!1;break}l[o]=_}else l[o]=d[o]}s&&(scheduler._drag_event._orig_section=n.section),r[scheduler._get_section_property()]=l.join(",")}}}else t.apply(scheduler,[e])},scheduler._shift_sections=function(e,t,a){
for(var r=null,n=e.y_unit,i=0;i<n.length;i++)if(n[i].key==t){r=i;break}var d=n[r+a];return d?d.key:null};var n=scheduler._get_blocked_zones;scheduler._get_blocked_zones=function(e,t,a,r,i){if(t&&this.config.multisection){t=this._parse_event_sections(t);for(var d=[],l=0;l<t.length;l++)d=d.concat(n.apply(this,[e,t[l],a,r,i]));return d}return n.apply(this,arguments)};var i=scheduler._check_sections_collision;scheduler._check_sections_collision=function(e,t){if(this.config.multisection&&this._get_section_view()){
e=this._split_events([e]),t=this._split_events([t]);for(var a=!1,r=0,n=e.length;n>r&&!a;r++)for(var d=0,l=t.length;l>d;d++)if(i.apply(this,[e[r],t[d]])){a=!0;break}return a}return i.apply(this,arguments)}});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_multisection.js.map