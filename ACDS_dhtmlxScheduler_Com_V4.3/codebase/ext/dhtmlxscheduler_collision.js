/*
dhtmlxScheduler v.4.3.0 Professional

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e){var s=scheduler._get_section_view();s&&e&&(t=scheduler.getEvent(e)[scheduler._get_section_property()])}var t,s;scheduler.config.collision_limit=1,scheduler.attachEvent("onBeforeDrag",function(t){return e(t),!0}),scheduler.attachEvent("onBeforeLightbox",function(t){var i=scheduler.getEvent(t);return s=[i.start_date,i.end_date],e(t),!0}),scheduler.attachEvent("onEventChanged",function(e){if(!e||!scheduler.getEvent(e))return!0;var t=scheduler.getEvent(e);if(!scheduler.checkCollision(t)){if(!s)return!1;
t.start_date=s[0],t.end_date=s[1],t._timed=this.isOneDayEvent(t)}return!0}),scheduler.attachEvent("onBeforeEventChanged",function(e){return scheduler.checkCollision(e)}),scheduler.attachEvent("onEventAdded",function(e,t){var s=scheduler.checkCollision(t);s||scheduler.deleteEvent(e)}),scheduler.attachEvent("onEventSave",function(e,t){if(t=scheduler._lame_clone(t),t.id=e,!t.start_date||!t.end_date){var s=scheduler.getEvent(e);t.start_date=new Date(s.start_date),t.end_date=new Date(s.end_date)}return t.rec_type&&scheduler._roll_back_dates(t),scheduler.checkCollision(t)
}),scheduler._check_sections_collision=function(e,t){var s=scheduler._get_section_property();return e[s]==t[s]&&e.id!=t.id?!0:!1},scheduler.checkCollision=function(e){var s=[],i=scheduler.config.collision_limit;if(e.rec_type)for(var a=scheduler.getRecDates(e),n=0;n<a.length;n++)for(var r=scheduler.getEvents(a[n].start_date,a[n].end_date),d=0;d<r.length;d++)(r[d].event_pid||r[d].id)!=e.id&&s.push(r[d]);else{s=scheduler.getEvents(e.start_date,e.end_date);for(var o=0;o<s.length;o++)if(s[o].id==e.id){s.splice(o,1);
break}}var l=scheduler._get_section_view(),h=scheduler._get_section_property(),_=!0;if(l){for(var c=0,o=0;o<s.length;o++)s[o].id!=e.id&&this._check_sections_collision(s[o],e)&&c++;c>=i&&(_=!1)}else s.length>=i&&(_=!1);if(!_){var u=!scheduler.callEvent("onEventCollision",[e,s]);return u||(e[h]=t||e[h]),u}return _}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_collision.js.map