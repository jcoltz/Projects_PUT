	
/*
Copyright (c) 2001, 2016 Alpha Software Corporation
All Rights Reserved.

This JavaScript library is licensed exclusively for use with Alpha Anywhere, Alpha Five,
Alpha Five Application Server, Alpha Anywhere Application Server,
Alpha Five Run Engine, and Alpha Anywhere Run Engine. It is specifically
not licensed for use on a server that does not have installed on it a
licensed copy of the Alpha Five Application Server or the Alpha Anywhere Application Server.
*/



function load_date_picker(target,old_date,settings){settings.contID=target+'_CalendarCont';if(old_date==$ga(target,'A5WatermarkText'))old_date='';style=settings.style
path=settings.path
use_select=settings.use_select
format=settings.format
low_year=settings.low_year
high_year=settings.high_year
switch_year=settings.switch_year
if(!settings.months)settings.months=['January','February','March','April','May','June','July','August','September','October','November','December'];if(!settings.days)settings.days=['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];if(!settings.start_day)settings.start_day=1;if(!settings.todayText)settings.todayText='Today';if(!settings.closeText)settings.closeText='Close';object_name=$if(settings.object_name,settings.object_name,target+'_DateSet');if(settings.cellpadding!=undefined){cur_cellpadding=settings.cellpadding}
else{cur_cellpadding=2}
if(settings.cellspacing!=undefined){cur_cellspacing=settings.cellspacing}
else{cur_cellspacing=0}
month_type=1
if(format.search('mm')!=-1){month_type=1}
else if(format.search('m')!=-1){month_type=8}
else if(format.search('month')!=-1){month_type=5}
else if(format.search('MONTH')!=-1){month_type=6}
else if(format.search('Month')!=-1){month_type=7}
else if(format.search('mon')!=-1){month_type=2}
else if(format.search('MON')!=-1){month_type=3}
else if(format.search('Mon')!=-1){month_type=4}
day_type=1
if(format.search('dd')!=-1){day_type=1}
else if(format.search('d')!=-1){day_type=2}
else if(format.search('x')!=-1){day_type=3}
var old_date_obj=new Date()
if(old_date==''){old_day=old_date_obj.getDate()
old_month=old_date_obj.getMonth()
old_year=old_date_obj.getFullYear()
second_date=0}
else{if(old_date.slice(old_date.length-2)=='..'){second_date=1}
else{second_date=0}
var tDate_arr=old_date.split(/[^0-9A-z]/);var date_arr=new Array();for(var i=0;i<tDate_arr.length;i++){if(tDate_arr[i]!=''){date_arr.push(tDate_arr[i]);}}
if(day_type==1){day_loc=format.search('dd')}
else if(day_type==2){day_loc=format.search('d')}
else if(day_type==3){day_loc=format.search('x')}
if(month_type==1){month_loc=format.search('mm')}
else if(month_type==8){month_loc=format.search('m')}
else if(month_type==5){month_loc=format.search('mon')}
else if(month_type==6){month_loc=format.search('MON')}
else if(month_type==7){month_loc=format.search('Mon')}
else if(month_type==2){month_loc=format.search('mon')}
else if(month_type==3){month_loc=format.search('MON')}
else if(month_type==4){month_loc=format.search('Mon')}
year_loc=format.search('yy')
if(day_type==3){if(day_loc>month_loc){if(day_loc>year_loc){day_val=parseInt(date_arr[2])}
else{day_val=parseInt(date_arr[1])}}
else{if(day_loc>year_loc){day_val=parseInt(date_arr[1])}
else{day_val=parseInt(date_arr[0])}}}
else{if(day_loc>month_loc){if(day_loc>year_loc){day_val=Number(date_arr[2])}
else{day_val=Number(date_arr[1])}}
else{if(day_loc>year_loc){day_val=Number(date_arr[1])}
else{day_val=Number(date_arr[0])}}}
if(month_type==1||month_type==8){if(month_loc>day_loc){if(month_loc>year_loc){month_val=Number(date_arr[2])}
else{month_val=Number(date_arr[1])}}
else{if(month_loc>year_loc){month_val=Number(date_arr[1])}
else{month_val=Number(date_arr[0])}}}
else if(month_type==2||month_type==3||month_type==4){if(month_loc>day_loc){if(month_loc>year_loc){month_val=get_num_month(settings,date_arr[2])}
else{month_val=get_num_month(settings,date_arr[1])}}
else{if(month_loc>year_loc){month_val=get_num_month(settings,date_arr[1])}
else{month_val=get_num_month(settings,date_arr[0])}}}
else{if(month_loc>day_loc){if(month_loc>year_loc){month_val=get_num_month(settings,date_arr[2])}
else{month_val=get_num_month(settings,date_arr[1])}}
else{if(month_loc>year_loc){month_val=get_num_month(settings,date_arr[1])}
else{month_val=get_num_month(settings,date_arr[0])}}}
if(year_loc>month_loc){if(year_loc>day_loc){year_val=Number(date_arr[2])}
else{year_val=Number(date_arr[1])}}
else{if(month_loc>day_loc){year_val=Number(date_arr[1])}
else{year_val=Number(date_arr[0])}}
if(day_val>0&&day_val<32){old_day=day_val}
else{old_day=old_date_obj.getDate()}
if(month_val>0&&month_val<13){old_month=(month_val-1)}
else{old_month=old_date_obj.getMonth()}
if(isNaN(year_val)){year_val=old_date_obj.getFullYear()}
if(format.search('yyyy')>=0){if(year_val<10){year_val='0'+year_val}
old_year=year_val}
else if(year_val>999){if(year_val<10){year_val='0'+year_val}
old_year=year_val}
else{test_val=Number(year_val)
if(year_val<10){year_val='0'+year_val}
if(test_val>=switch_year){new_val='19'+year_val
old_year=Number(new_val)}
else{new_val='20'+year_val
old_year=Number(new_val)}}}
if(use_select==1){month_html='&nbsp;<select id="'+settings.contID+'.sel_month" class="'+style+'Select" onchange="fill_calendar(document.getElementById(\''+settings.contID+'.sel_month\').value,document.getElementById(\''+settings.contID+'.sel_year\').value,'+object_name+','+month_type+','+day_type+')" value="'+old_month+'">\n'
for(var i=0;i<12;i++){if(old_month==i)month_html=month_html+'<option value="'+i+'" selected>'+settings.months[i]+'</option>\n'
else month_html=month_html+'<option value="'+i+'">'+settings.months[i]+'</option>\n'}
month_html=month_html+'</select>'
year_html='<select id="'+settings.contID+'.sel_year" class="'+style+'Select" onchange="fill_calendar(document.getElementById(\''+settings.contID+'.sel_month\').value,document.getElementById(\''+settings.contID+'.sel_year\').value,'+object_name+','+month_type+','+day_type+')" value="'+old_year+'">\n'
for(i=low_year;i<=high_year;i++){if(i==old_year){year_html=year_html+'<option value="'+i+'" selected>'+i+'</option>\n'}
else{year_html=year_html+'<option value="'+i+'">'+i+'</option>\n'}}
year_html=year_html+'</select>';month_year_html=month_html+' '+year_html+'&nbsp;'}
else{month_html=settings.months[old_month];year_html=''+old_year;month_year_html='<div id="'+settings.contID+'_date_display" style="width:125px">'+month_html+' '+year_html+'</div>';}
calendar_html='<table cellspacing="'+cur_cellspacing+'" cellpadding="'+cur_cellpadding+'" class="table" style="width: 100%">\n<tr>\n';var day_of_the_week=settings.start_day;for(i=0;i<=6;i++){calendar_html=calendar_html+'<th class="calendar" align="center" style="width:14.3%">'+settings.days[day_of_the_week-1]+'</th>\n';day_of_the_week++;if(day_of_the_week>7)day_of_the_week=day_of_the_week-7}
calendar_html=calendar_html+'</tr>\n';for(i=1;i<=6;i++){calendar_html=calendar_html+'<tr>\n'
for(j=1;j<=7;j++){if(j==1||j==7){calendar_html=calendar_html+'<td id="'+settings.contID+'_1_w_'+i+'_d_'+j+'" class="weekend" align="center">&nbsp;</td>\n'}
else{calendar_html=calendar_html+'<td id="'+settings.contID+'_1_w_'+i+'_d_'+j+'" class="workday" align="center">&nbsp;</td>\n'}}
calendar_html=calendar_html+'</tr>\n'}
calendar_html=calendar_html+'</table>\n'
var old_date_obj=new Date()
new_html='<table id="cal_layout_table" cellpadding="0" cellspacing="0" border="0">\n'+'<tr>\n'+'<td align="center">\n'+'<table cellpadding="0" cellspacing="0" border="0">\n'+'<tr>\n'+'<td align="center" nowrap>'+'<a href="#" onclick="prev_year('+object_name+','+month_type+','+day_type+'); return false"><img src="'+path+style+'/PrevYear.png" alt="Previous Year" border="0"></a>'+'<a href="#" onclick="prev_month('+object_name+','+month_type+','+day_type+'); return false"><img src="'+path+style+'/PrevMonth.png" alt="Previous Month" border="0"></a>'+'</td>\n'+'<td align="center" nowrap>'+month_year_html+'</td>\n'+'<td align="center" nowrap>'+'<a href="#" onclick="next_month('+object_name+','+month_type+','+day_type+'); return false"><img src="'+path+style+'/NextMonth.png" alt="Next Month" border="0"></a>'+'<a href="#" onclick="next_year('+object_name+','+month_type+','+day_type+'); return false"><img src="'+path+style+'/NextYear.png" alt="Next Year" border="0"></a>'+'</td>\n'+'</tr>\n'+'<tr>\n'+'<td style="height:5px" colspan="3"></td>\n'+'</tr>\n'+'<tr>\n'+'<td colspan="3">'+calendar_html+'</td>\n'+'</tr>\n'+'<tr>\n'+'<td style="height:5px" colspan="3"></td>\n'+'</tr>\n'+'<tr>\n'+'<td align="center" colspan="3">'+'<button class="CalendarButtons" onclick="set_date(1,'+old_date_obj.getDate()+','+object_name+','+month_type+','+day_type+')">'+settings.todayText+'</button> '+'<button class="CalendarButtons" onclick="hide_calendar('+object_name+')">'+settings.closeText+'</button>'+'</td>\n'+'</tr>\n'+'</table>\n'+'</td>\n'+'</tr>\n'+'</table>';if(!settings.object_name){settings.object_name=object_name;}
settings.target_input=target;settings.second_date=second_date;settings.old_year=old_year;settings.old_month=old_month;settings.old_day=old_day;settings.cur_year=old_year;settings.cur_month=old_month;settings.cur_day=old_day;if(!document.getElementById(settings.contID)){obj=document.createElement('div');obj.id=settings.contID;obj.className=style+'AltDataTD '+
style+'DataTD '+
style+'FormTABLE '+
style+'PageBODY';obj.style.borderStyle='solid';obj.style.borderColor='ThreeDShadow';obj.style.borderWidth='1px';obj.style.position='absolute';obj.style.top='0px';obj.style.left='0px';obj.style.padding='3px';obj.style.zIndex='1000';document.body.insertBefore(obj,document.body.firstChild);$e.add(settings.contID,'mousedown',$e.stopPropagation);}
if(document.all&&!window['XMLHttpRequest']){eles=document.body.getElementsByTagName('select');for(var i=0;i<eles.length;i++){if(eles[i].id!=settings.contID+'.sel_year'&&eles[i].id!=settings.contID+'.sel_month')eles[i].style.visibility='hidden';}}
settings._iframes=new Array();eles=document.body.getElementsByTagName('iframe');for(var i=0;i<eles.length;i++){if(eles[i].style.visibility!='hidden'&&eles[i].id!=''&&eles[i].src.toString().split('.').pop().substr(0,3).toLowerCase()=='pdf'){settings._iframes.push(eles[i].id);eles[i].style.visibility='hidden';}}
document.getElementById(settings.contID).style.display='block';document.getElementById(settings.contID).innerHTML=new_html;fill_calendar(old_month,old_year,settings,month_type,day_type);$po(document.getElementById(settings.contID),document.getElementById(target),'dropdown',-1)
$e.add(document.documentElement,'mousedown',hide_calendar_evnt,settings);}
function fill_calendar(cur_month,cur_year,settings,month_type,day_type){cur_month=Number(cur_month)
cur_year=Number(cur_year)
if(cur_month==settings.old_month&&cur_year==settings.old_year){cur_day=settings.old_day}else{cur_day=0}
delete date_obj
date_obj=new Date();if(cur_month==date_obj.getMonth()&&cur_year==date_obj.getFullYear()){cur_today=date_obj.getDate()
if(cur_day==cur_today){cur_day=0}}
else{cur_today=0}
date_obj.setDate(1);date_obj.setFullYear(cur_year);date_obj.setMonth(cur_month);start_day=date_obj.getDay();end_month_check_1=new Date(cur_year,cur_month+1,1);timeDifference=end_month_check_1-86400000;end_month_check_2=new Date(timeDifference);var days_in_month=end_month_check_2.getDate();var day_count=1;var day_of_the_week=settings.start_day;start_day=start_day-day_of_the_week+1;if(start_day<1)start_day=start_day+7
for(i=1;i<=6;i++){for(j=1;j<=7;j++){tar=document.getElementById(settings.contID+'_1_w_'+i+'_d_'+j)
if(i==1&&j<=start_day){tar.innerHTML='&nbsp;'
if(j==1||j==7){if(tar.className!="weekend"){tar.className="weekend"}}
else{if(tar.className!="workday"){tar.className="workday"}}}else{if(day_count<=days_in_month){if(cur_day==day_count){tar.innerHTML='<a href="#" onclick="set_date(0,'+day_count+','+settings.object_name+','+month_type+','+day_type+'); return false" class="selectedDay">'+day_count+'</a>'
tar.className="selectedDay"}else if(cur_today==day_count){tar.innerHTML='<a href="#" onclick="set_date(0,'+day_count+','+settings.object_name+','+month_type+','+day_type+'); return false" class="today">'+day_count+'</a>'
tar.className="today"}else{tar.innerHTML='<a href="#" onclick="set_date(0,'+day_count+','+settings.object_name+','+month_type+','+day_type+'); return false" class="weekday weekDay">'+day_count+'</a>'
if(day_of_the_week==1||day_of_the_week==7){if(tar.className!="weekend"){tar.className="weekend"}}
else{if(tar.className!="workday"){tar.className="workday"}}}
day_count++;}
else{tar.innerHTML='&nbsp;'
if(day_of_the_week==1||day_of_the_week==7){if(tar.className!="weekend"){tar.className="weekend"}}
else{if(tar.className!="workday"){tar.className="workday"}}}}
day_of_the_week++;if(day_of_the_week>7)day_of_the_week=day_of_the_week-7}}
if(settings.use_select==0){month_html=settings.months[cur_month];year_html=''+cur_year;month_year_html=month_html+' '+year_html;document.getElementById(settings.contID+'_date_display').innerHTML=month_year_html
settings.cur_month=cur_month;settings.cur_year=cur_year;}}
function prev_month(settings,month_type,day_type){if(settings.use_select==1){cur_month=Number(document.getElementById(settings.contID+'.sel_month').value)
cur_year=Number(document.getElementById(settings.contID+'.sel_year').value)
if(cur_month==0){document.getElementById(settings.contID+'.sel_month').value=11
document.getElementById(settings.contID+'.sel_year').value=cur_year-1}
else{document.getElementById(settings.contID+'.sel_month').value=cur_month-1}
fill_calendar(document.getElementById(settings.contID+'.sel_month').value,document.getElementById(settings.contID+'.sel_year').value,settings,month_type,day_type)}
else{cur_month=settings.cur_month
cur_year=settings.cur_year
if(cur_month==0){settings.cur_month=11
settings.cur_year=cur_year-1}
else{settings.cur_month=cur_month-1}
fill_calendar(settings.cur_month,settings.cur_year,settings,month_type,day_type)}}
function prev_year(settings,month_type,day_type){if(settings.use_select==1){cur_year=Number(document.getElementById(settings.contID+'.sel_year').value)
document.getElementById(settings.contID+'.sel_year').value=cur_year-1
fill_calendar(document.getElementById(settings.contID+'.sel_month').value,document.getElementById(settings.contID+'.sel_year').value,settings,month_type,day_type)}
else{cur_year=settings.cur_year
settings.cur_year=cur_year-1
fill_calendar(settings.cur_month,settings.cur_year,settings,month_type,day_type)}}
function next_month(settings,month_type,day_type){if(settings.use_select==1){cur_month=Number(document.getElementById(settings.contID+'.sel_month').value)
cur_year=Number(document.getElementById(settings.contID+'.sel_year').value)
if(cur_month==11){document.getElementById(settings.contID+'.sel_month').value=0
document.getElementById(settings.contID+'.sel_year').value=cur_year+1}
else{document.getElementById(settings.contID+'.sel_month').value=cur_month+1}
fill_calendar(document.getElementById(settings.contID+'.sel_month').value,document.getElementById(settings.contID+'.sel_year').value,settings,month_type,day_type)}
else{cur_month=Number(settings.cur_month)
cur_year=Number(settings.cur_year)
if(cur_month==11){settings.cur_month=0
settings.cur_year=cur_year+1}
else{settings.cur_month=cur_month+1}
fill_calendar(settings.cur_month,settings.cur_year,settings,month_type,day_type)}}
function next_year(settings,month_type,day_type){if(settings.use_select==1){cur_year=Number(document.getElementById(settings.contID+'.sel_year').value)
document.getElementById(settings.contID+'.sel_year').value=cur_year+1
fill_calendar(document.getElementById(settings.contID+'.sel_month').value,document.getElementById(settings.contID+'.sel_year').value,settings,month_type,day_type)}
else{cur_year=settings.cur_year
settings.cur_year=cur_year+1
fill_calendar(settings.cur_month,settings.cur_year,settings,month_type,day_type)}}
function set_date(style,cur_day,settings,month_type,day_type){if(style==1){var old_date_obj=new Date()
cur_month=old_date_obj.getMonth()
cur_year=old_date_obj.getFullYear()}
else{if(settings.use_select==1){cur_month=Number(document.getElementById(settings.contID+'.sel_month').value)
cur_year=Number(document.getElementById(settings.contID+'.sel_year').value)}
else{cur_month=settings.cur_month
cur_year=settings.cur_year}}
format=settings.format
cur_day=Number(cur_day)
if(day_type==1){cur_day_str=''
if(cur_day<10){cur_day_str='0'+cur_day}
else{cur_day_str=''+cur_day}
format=format.replace('dd',cur_day_str)}
else if(day_type==2){format=format.replace('d',cur_day)}
else if(day_type==3){cur_day_str=''
if(cur_day==1||cur_day==21||cur_day==31){cur_day_str=cur_day+'st'}
else if(cur_day==2||cur_day==22){cur_day_str=cur_day+'nd'}
else if(cur_day==3||cur_day==23){cur_day_str=cur_day+'rd'}
else{cur_day_str=cur_day+'th'}
format=format.replace('x',cur_day_str)}
cur_month=Number(cur_month)+1
if(month_type==1){cur_month_str=''
if(cur_month<10){cur_month_str='0'+cur_month}
else{cur_month_str=''+cur_month}
format=format.replace('mm',cur_month_str)}
else if(month_type==8){format=format.replace('m',cur_month)}
else if(month_type==5){format=format.replace('month',get_chr_month(settings,cur_month,month_type))}
else if(month_type==6){format=format.replace('MONTH',get_chr_month(settings,cur_month,month_type))}
else if(month_type==7){format=format.replace('Month',get_chr_month(settings,cur_month,month_type))}
else if(month_type==2){format=format.replace('mon',get_chr_month(settings,cur_month,month_type))}
else if(month_type==3){format=format.replace('MON',get_chr_month(settings,cur_month,month_type))}
else if(month_type==4){format=format.replace('Mon',get_chr_month(settings,cur_month,month_type))}
format=format.replace('mm',cur_month)
if(format.search('yyyy')>=0){format=format.replace('yyyy',cur_year)}
else{temp_year=String(cur_year)
temp_year=temp_year.slice(2)
format=format.replace('yy',temp_year)}
hide_calendar(settings);if(settings.second_date==0){document.getElementById(settings.target_input).value=format}
else{document.getElementById(settings.target_input).value=document.getElementById(settings.target_input).value+format}
if($e){if($e.execute){$e.execute(settings.target_input,'change');}}}
function hide_calendar_evnt(e,settings){hide_calendar(settings)}
function hide_calendar(settings){document.getElementById(settings.contID).style.display='none';if(document.all&&!window['XMLHttpRequest']){eles=document.body.getElementsByTagName('select');for(var i=0;i<eles.length;i++){eles[i].style.visibility='';}}
for(var i=0;i<settings._iframes.length;i++){document.getElementById(settings._iframes[i]).style.visibility='';}
$e.remove(document.documentElement,'mousedown',hide_calendar_evnt);}
function get_num_month(settings,month_to_convert){month_to_convert=month_to_convert.toLowerCase();month_to_convert=month_to_convert.substr(0,3);cur_month_num=1;for(var i=0;i<settings.months.length;i++){if(settings.months[i].substr(0,3).toLowerCase()==month_to_convert){cur_month_num=i+1;break;}}
return cur_month_num}
function get_chr_month(settings,cur_month,month_type){cur_chr_month=settings.months[cur_month-1];if(month_type==2||month_type==3||month_type==4){cur_chr_month=cur_chr_month.substr(0,3)}
if(month_type==2||month_type==5){cur_chr_month=cur_chr_month.toLowerCase()}
else if(month_type==3||month_type==6){cur_chr_month=cur_chr_month.toUpperCase()}
return cur_chr_month}