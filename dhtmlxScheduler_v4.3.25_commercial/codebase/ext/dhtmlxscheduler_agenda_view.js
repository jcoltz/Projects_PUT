/*
@license
dhtmlxScheduler v.4.3.25 Professional

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.date.add_agenda=function(e){return scheduler.date.add(e,1,"year")},scheduler.templates.agenda_time=function(e,t,a){return a._timed?this.day_date(a.start_date,a.end_date,a)+" "+this.event_date(e):scheduler.templates.day_date(e)+" &ndash; "+scheduler.templates.day_date(t)},scheduler.templates.agenda_text=function(e,t,a){return a.text},scheduler.templates.agenda_date=function(){return""},scheduler.date.agenda_start=function(){return scheduler.date.date_part(scheduler._currentDate())},scheduler.attachEvent("onTemplatesReady",function(){
function e(e){if(e){var t=scheduler.locale.labels;scheduler._els.dhx_cal_header[0].innerHTML="<div class='dhx_agenda_line'><div>"+t.date+"</div><span style='padding-left:25px'>"+t.description+"</span></div>",scheduler._table_view=!0,scheduler.set_sizes()}}function t(){var e=(scheduler._date,scheduler.get_visible_events());e.sort(function(e,t){return e.start_date>t.start_date?1:-1});for(var t="<div class='dhx_agenda_area'>",a=0;a<e.length;a++){var i=e[a],n=i.color?"background:"+i.color+";":"",l=i.textColor?"color:"+i.textColor+";":"",r=scheduler.templates.event_class(i.start_date,i.end_date,i);
t+="<div class='dhx_agenda_line"+(r?" "+r:"")+"' event_id='"+i.id+"' style='"+l+n+(i._text_style||"")+"'><div class='dhx_agenda_event_time'>"+scheduler.templates.agenda_time(i.start_date,i.end_date,i)+"</div>",t+="<div class='dhx_event_icon icon_details'>&nbsp</div>",t+="<span>"+scheduler.templates.agenda_text(i.start_date,i.end_date,i)+"</span></div>"}t+="<div class='dhx_v_border'></div></div>",scheduler._els.dhx_cal_data[0].innerHTML=t,scheduler._els.dhx_cal_data[0].childNodes[0].scrollTop=scheduler._agendaScrollTop||0;
var d=scheduler._els.dhx_cal_data[0].childNodes[0],o=d.childNodes[d.childNodes.length-1];o.style.height=d.offsetHeight<scheduler._els.dhx_cal_data[0].offsetHeight?"100%":d.offsetHeight+"px";var s=scheduler._els.dhx_cal_data[0].firstChild.childNodes;scheduler._els.dhx_cal_date[0].innerHTML=scheduler.templates.agenda_date(scheduler._min_date,scheduler._max_date,scheduler._mode),scheduler._rendered=[];for(var a=0;a<s.length-1;a++)scheduler._rendered[a]=s[a]}var a=scheduler.dblclick_dhx_cal_data;scheduler.dblclick_dhx_cal_data=function(){
if("agenda"==this._mode)!this.config.readonly&&this.config.dblclick_create&&this.addEventNow();else if(a)return a.apply(this,arguments)},scheduler.attachEvent("onSchedulerResize",function(){return"agenda"==this._mode?(this.agenda_view(!0),!1):!0});var i=scheduler.render_data;scheduler.render_data=function(e){return"agenda"!=this._mode?i.apply(this,arguments):void t()};var n=scheduler.render_view_data;scheduler.render_view_data=function(){return"agenda"==this._mode&&(scheduler._agendaScrollTop=scheduler._els.dhx_cal_data[0].childNodes[0].scrollTop,
scheduler._els.dhx_cal_data[0].childNodes[0].scrollTop=0),n.apply(this,arguments)},scheduler.agenda_view=function(a){scheduler._min_date=scheduler.config.agenda_start||scheduler.date.agenda_start(scheduler._date),scheduler._max_date=scheduler.config.agenda_end||scheduler.date.add_agenda(scheduler._min_date,1),scheduler._table_view=!0,e(a),a&&t()}});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_agenda_view.js.map