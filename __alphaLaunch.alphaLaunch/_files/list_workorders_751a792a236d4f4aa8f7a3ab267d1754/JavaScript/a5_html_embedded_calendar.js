function fill_embedded_calendar(cur_month,cur_year,settings){
	cur_month = parseInt(cur_month)
	cur_year = parseInt(cur_year)
	
	if(cur_month == settings.old_month && cur_year == settings.old_year){
		cur_day = settings.cur_day
	}
	else{
		cur_day = 0
	}

	delete date_obj
	date_obj = new Date();
	if(cur_month == date_obj.getMonth() && cur_year == date_obj.getFullYear()){
		cur_today = date_obj.getDate()
		if(cur_day == cur_today){
			cur_day = 0
		}
	}
	else{
		cur_today = 0
	}

	date_obj.setDate(1);
	date_obj.setFullYear(cur_year);
	date_obj.setMonth(cur_month);

	start_day = date_obj.getDay();

	end_month_check_1 = new Date(cur_year, cur_month+1,1);
	timeDifference = end_month_check_1 - 86400000;
	end_month_check_2 = new Date(timeDifference);
	var days_in_month = end_month_check_2.getDate();

	day_count = 1
	for(i=1; i <= 6; i++){
		for(j=1; j<=7;j++){
			tar = document.getElementById(settings.uniqueID+'_cal_w_'+i+'_d_'+j)
			if(i==1 && j <= start_day){
				tar.innerHTML = '&nbsp;'
				if(j==1 || j == 7){
					if(tar.className != "weekend"){
						tar.className = "weekend"
					}
				}
				else{
					if(tar.className != "workday"){
						tar.className = "workday"
					}
				}
			}
			else{
				if(day_count <= days_in_month){
					if(cur_day == day_count){
						if(settings.readOnly == 0)
							tar.innerHTML = '<a href="#" onclick="set_embedded_date(0,'+day_count+','+settings.uniqueVarname+'_date_set); return false" class="selectedDay">'+day_count+'</a>'
						else
							tar.innerHTML = '<a class="selectedDay">'+day_count+'</a>'
						tar.className = "selectedDay"
						day_count = day_count + 1
					}
					else if(cur_today == day_count){
						if(settings.readOnly == 0)
							tar.innerHTML = '<a href="#" onclick="set_embedded_date(0,'+day_count+','+settings.uniqueVarname+'_date_set); return false" class="today">'+day_count+'</a>'
						else
							tar.innerHTML = '<a class="today">'+day_count+'</a>'
						tar.className = "today"
						day_count = day_count + 1
					}
					else{
						if(settings.readOnly == 0)
							tar.innerHTML = '<a href="#" onclick="set_embedded_date(0,'+day_count+','+settings.uniqueVarname+'_date_set); return false" class="weekday">'+day_count+'</a>'
						else
							tar.innerHTML = '<a class="weekday">'+day_count+'</a>'
						if(j==1 || j == 7){
							if(tar.className != "weekend"){
								tar.className = "weekend"
							}
						}
						else{
							if(tar.className != "workday"){
								tar.className = "workday"
							}
						}
						day_count = day_count + 1
					}
				}
				else{
					tar.innerHTML = '&nbsp;'
					if(j==1 || j == 7){
						if(tar.className != "weekend"){
							tar.className = "weekend"
						}
					}
					else{
						if(tar.className != "workday"){
							tar.className = "workday"
						}
					}
				}
			}
		}
	}

	if(settings.use_select == 0){
		month_html=''
		if(cur_month == 0){
			month_html = 'January'
		}
		else if(cur_month == 1){
			month_html = 'February'
		}
		else if(cur_month == 2){
			month_html = 'March'
		}
		else if(cur_month == 3){
			month_html = 'April'
		}
		else if(cur_month == 4){
			month_html = 'May'
		}
		else if(cur_month == 5){
			month_html = 'June'
		}
		else if(cur_month == 6){
			month_html = 'July'
		}
		else if(cur_month == 7){
			month_html = 'August'
		}
		else if(cur_month == 8){
			month_html = 'September'
		}
		else if(cur_month == 9){
			month_html = 'October'
		}
		else if(cur_month == 10){
			month_html = 'November'
		}
		else if(cur_month == 11){
			month_html = 'December'
		}

		year_html = ''+cur_year;

		month_year_html = month_html+' '+year_html;
		document.getElementById(settings.uniqueID+'_date_display').value = month_year_html
	}
}

function prev_embedded_month(settings){
	if(settings.use_select == 1){
		cur_month = Number(document.getElementById(settings.uniqueID+'_sel_month').value)
		cur_year = Number(document.getElementById(settings.uniqueID+'_sel_year').value)
		if(cur_month == 0){
			document.getElementById(settings.uniqueID+'_sel_month').value = 11
			settings.cur_month = 11
			document.getElementById(settings.uniqueID+'_sel_year').value = cur_year - 1
			settings.cur_year = cur_year - 1
		}
		else{
			document.getElementById(settings.uniqueID+'_sel_month').value = cur_month - 1
			settings.cur_month = cur_month - 1
		}

		fill_embedded_calendar(document.getElementById(settings.uniqueID+'_sel_month').value,document.getElementById(settings.uniqueID+'_sel_year').value,settings)
	}
	else{
		cur_month = settings.cur_month
		cur_year = settings.cur_year

		if(cur_month == 0){
			settings.cur_month = 11
			settings.cur_year = cur_year - 1
		}
		else{
			settings.cur_month = cur_month - 1
		}

		fill_embedded_calendar(settings.cur_month,settings.cur_year,settings)
	}
}

function prev_embedded_year(settings){
	if(settings.use_select == 1){
		cur_year = Number(document.getElementById(settings.uniqueID+'_sel_year').value)
		document.getElementById(settings.uniqueID+'_sel_year').value = cur_year - 1
		settings.cur_year = cur_year - 1
		fill_embedded_calendar(document.getElementById(settings.uniqueID+'_sel_month').value,document.getElementById(settings.uniqueID+'_sel_year').value,settings)
	}
	else{
		cur_year = settings.cur_year
		settings.cur_year = cur_year - 1
		fill_embedded_calendar(settings.cur_month,settings.cur_year,settings)
	}
}

function next_embedded_month(settings){
	if(settings.use_select == 1){
		cur_month = Number(document.getElementById(settings.uniqueID+'_sel_month').value)
		cur_year = Number(document.getElementById(settings.uniqueID+'_sel_year').value)
		if(cur_month == 11){
			document.getElementById(settings.uniqueID+'_sel_month').value = 0
			settings.cur_month = 0
			document.getElementById(settings.uniqueID+'_sel_year').value = cur_year + 1
			settings.cur_year = cur_year + 1
		}
		else{
			document.getElementById(settings.uniqueID+'_sel_month').value = cur_month + 1
			settings.cur_month = cur_month + 1
		}

		fill_embedded_calendar(document.getElementById(settings.uniqueID+'_sel_month').value,document.getElementById(settings.uniqueID+'_sel_year').value,settings)
	}
	else{
		cur_month = Number(settings.cur_month)
		cur_year = Number(settings.cur_year)

		if(cur_month == 11){
			settings.cur_month = 0
			settings.cur_year = cur_year + 1
		}
		else{
			settings.cur_month = cur_month + 1
		}
		fill_embedded_calendar(settings.cur_month,settings.cur_year,settings)
	}
}

function next_embedded_year(settings){
	if(settings.use_select == 1){
		cur_year = Number(document.getElementById(settings.uniqueID+'_sel_year').value)
		document.getElementById(settings.uniqueID+'_sel_year').value = cur_year + 1
		settings.cur_year = cur_year + 1
		fill_embedded_calendar(document.getElementById(settings.uniqueID+'_sel_month').value,document.getElementById(settings.uniqueID+'_sel_year').value,settings)
	}
	else{
		cur_year = settings.cur_year
		settings.cur_year = cur_year + 1
		fill_embedded_calendar(settings.cur_month,settings.cur_year,settings)
	}
}

function set_embedded_date(style,cur_day,settings){

	if(style == 1){
		var old_date_obj = new Date()
		cur_month = old_date_obj.getMonth()
		cur_year = old_date_obj.getFullYear()
	}
	else{
		cur_month = settings.cur_month
		cur_year = settings.cur_year
	}

	format = settings.format

	// work out day
	cur_day = Number(cur_day)
	if(settings.day_type == 1){
		cur_day_str = ''
		if(cur_day<10){
			cur_day_str = '0'+cur_day
		}
		else{
			cur_day_str = ''+cur_day
		}
		format = format.replace('dd',cur_day_str)
	}
	else if(settings.day_type == 2){
		format = format.replace('d',cur_day)
	}
	else if(settings.day_type == 3){
		cur_day_str = ''
		if(cur_day==1 || cur_day==21 || cur_day==31){
			cur_day_str = cur_day+'st'
		}
		else if(cur_day==2 || cur_day==22){
			cur_day_str = cur_day+'nd'
		}
		else if(cur_day==3 || cur_day==23){
			cur_day_str = cur_day+'rd'
		}
		else{
			cur_day_str = cur_day+'th'
		}
		format = format.replace('x',cur_day_str)
	}


	// work out month
	cur_month = Number(cur_month)+1

	if(settings.month_type == 1){
		cur_month_str = ''
		if(cur_month<10){
			cur_month_str = '0'+cur_month
		}
		else{
			cur_month_str = ''+cur_month
		}
		format = format.replace('mm',cur_month_str)
	}
	else if(settings.month_type == 8){
		format = format.replace('m',cur_month)
	}
	else if(settings.month_type == 5){
		format = format.replace('month',get_chr_month(cur_month,month_type))
	}
	else if(settings.month_type == 6){
		format = format.replace('MONTH',get_chr_month(cur_month,month_type))
	}
	else if(settings.month_type == 7){
		format = format.replace('Month',get_chr_month(cur_month,month_type))
	}
	else if(settings.month_type == 2){
		format = format.replace('mon',get_chr_month(cur_month,month_type))
	}
	else if(settings.month_type == 3){
		format = format.replace('MON',get_chr_month(cur_month,month_type))
	}
	else if(settings.month_type == 4){
		format = format.replace('Mon',get_chr_month(cur_month,month_type))
	}

	format = format.replace('mm',cur_month)

	// work out year
	if(format.search('yyyy') >= 0){
		format = format.replace('yyyy',cur_year)
	}
	else{
		temp_year = String(cur_year)
		temp_year = temp_year.slice(2)
		format = format.replace('yy',temp_year)
	}
	
	if(settings.onchange) settings.onchange();
	document.getElementById(settings.uniqueID).value = format;

	settings.old_day = settings.cur_day;
	settings.old_month = settings.cur_month;
	settings.old_year = settings.cur_year;
	settings.cur_day = cur_day;

	fill_embedded_calendar(settings.cur_month,settings.cur_year,settings);
}

function  get_num_month(month_to_convert){
	month_to_convert = month_to_convert.toLowerCase()
	month_to_convert = month_to_convert.substr(0,3)
	cur_month_num = 1
	if(month_to_convert == 'jan'){
		cur_month_num = 1
	}
	else if(month_to_convert == 'feb'){
		cur_month_num = 2
	}
	else if(month_to_convert == 'mar'){
		cur_month_num = 3
	}
	else if(month_to_convert == 'apr'){
		cur_month_num = 4
	}
	else if(month_to_convert == 'may'){
		cur_month_num = 5
	}
	else if(month_to_convert == 'jun'){
		cur_month_num = 6
	}
	else if(month_to_convert == 'jul'){
		cur_month_num = 7
	}
	else if(month_to_convert == 'aug'){
		cur_month_num = 8
	}
	else if(month_to_convert == 'sep'){
		cur_month_num = 9
	}
	else if(month_to_convert == 'oct'){
		cur_month_num = 10
	}
	else if(month_to_convert == 'nov'){
		cur_month_num = 11
	}
	else if(month_to_convert == 'dec'){
		cur_month_num = 12
	}

	return cur_month_num
}

function get_chr_month(cur_month,month_type){
	if(cur_month == 1){
		cur_chr_month = 'January'
	}
	else if(cur_month == 2){
		cur_chr_month = 'February'
	}
	else if(cur_month == 3){
		cur_chr_month = 'March'
	}
	else if(cur_month == 4){
		cur_chr_month = 'April'
	}
	else if(cur_month == 5){
		cur_chr_month = 'May'
	}
	else if(cur_month == 6){
		cur_chr_month = 'June'
	}
	else if(cur_month == 7){
		cur_chr_month = 'July'
	}
	else if(cur_month == 8){
		cur_chr_month = 'August'
	}
	else if(cur_month == 9){
		cur_chr_month = 'September'
	}
	else if(cur_month == 10){
		cur_chr_month = 'October'
	}
	else if(cur_month == 11){
		cur_chr_month = 'November'
	}
	else if(cur_month == 12){
		cur_chr_month = 'December'
	}

	if(month_type == 2 || month_type == 3 || month_type == 4){
		cur_chr_month = cur_chr_month.substr(0,3)
	}

	if(month_type == 2 || month_type == 5){
		cur_chr_month = cur_chr_month.toLowerCase()
	}
	else if(month_type == 3 || month_type == 6){
		cur_chr_month = cur_chr_month.toUpperCase()
	}

	return cur_chr_month
}


function a5_embedded_calendar_setup(settings){
	month_type = 1
	use_select = settings.use_select
	format = settings.format
	low_year = settings.low_year
	high_year = settings.high_year
	switch_year = settings.switch_year
	old_date  = settings.date

	if(format.search('mm')!=-1){
		month_type = 1
	}
	else if(format.search('m')!=-1){
		month_type = 8
	}
	else if(format.search('month')!=-1){
		month_type = 5
	}
	else if(format.search('MONTH')!=-1){
		month_type = 6
	}
	else if(format.search('Month')!=-1){
		month_type = 7
	}
	else if(format.search('mon')!=-1){
		month_type = 2
	}
	else if(format.search('MON')!=-1){
		month_type = 3
	}
	else if(format.search('Mon')!=-1){
		month_type = 4
	}


	day_type = 1
	if(format.search('dd')!=-1){
		day_type = 1
	}
	else if(format.search('d')!=-1){
		day_type = 2
	}
	else if(format.search('x')!=-1){
		day_type = 3
	}

	var old_date_obj = new Date()

	if(old_date == ''){
		old_day = old_date_obj.getDate()
		old_month = old_date_obj.getMonth()
		old_year = old_date_obj.getFullYear()
		second_date = 0
	}
	else{
		if(old_date.slice(old_date.length-2) == '..'){
			second_date = 1
		}
		else{
			second_date = 0
		}

		var tDate_arr =  old_date.split(/[^0-9A-z]/);
		var date_arr = new Array();
		for(var i=0;i<tDate_arr.length;i++){
			if(tDate_arr[i] != ''){
				date_arr.push(tDate_arr[i]); 
			}
		}

		if(day_type == 1){
			day_loc = format.search('dd')
		}
		else if(day_type == 2){
			day_loc = format.search('d')
		}
		else if(day_type == 3){
			day_loc = format.search('x')
		}

		if(month_type == 1){
			month_loc = format.search('mm')
		}
		else if(month_type == 8){
			month_loc = format.search('m')
		}
		else if(month_type == 5){
			month_loc = format.search('mon')
		}
		else if(month_type == 6){
			month_loc = format.search('MON')
		}
		else if(month_type == 7){
			month_loc = format.search('Mon')
		}
		else if(month_type == 2){
			month_loc = format.search('mon')
		}
		else if(month_type == 3){
			month_loc = format.search('MON')
		}
		else if(month_type == 4){
			month_loc = format.search('Mon')
		}


		year_loc = format.search('yy')

		if(day_type == 3){
			if(day_loc > month_loc){
				if(day_loc > year_loc){
					day_val = parseInt(date_arr[2])
				}
				else{
					day_val = parseInt(date_arr[1])
				}
			}
			else{
				if(day_loc > year_loc){
					day_val = parseInt(date_arr[1])
				}
				else{
					day_val = parseInt(date_arr[0])
				}
			}
		}
		else{
			if(day_loc > month_loc){
				if(day_loc > year_loc){
					day_val = Number(date_arr[2])
				}
				else{
					day_val = Number(date_arr[1])
				}
			}
			else{
				if(day_loc > year_loc){
					day_val = Number(date_arr[1])
				}
				else{
					day_val = Number(date_arr[0])
				}
			}
		}

		if(month_type == 1 || month_type == 8){
			if(month_loc > day_loc){
				if(month_loc > year_loc){
					month_val = Number(date_arr[2])
				}
				else{
					month_val = Number(date_arr[1])
				}
			}
			else{
				if(month_loc > year_loc){
					month_val = Number(date_arr[1])
				}
				else{
					month_val = Number(date_arr[0])
				}
			}
		}
		else if(month_type == 2 || month_type == 3 || month_type == 4){
			if(month_loc > day_loc){
				if(month_loc > year_loc){
					month_val = get_num_month(date_arr[2])
				}
				else{
					month_val = get_num_month(date_arr[1])
				}
			}
			else{
				if(month_loc > year_loc){
					month_val = get_num_month(date_arr[1])
				}
				else{
					month_val = get_num_month(date_arr[0])
				}
			}
		}
		else{
			if(month_loc > day_loc){
				if(month_loc > year_loc){
					month_val = get_num_month(date_arr[2])
				}
				else{
					month_val = get_num_month(date_arr[1])
				}
			}
			else{
				if(month_loc > year_loc){
					month_val = get_num_month(date_arr[1])
				}
				else{
					month_val = get_num_month(date_arr[0])
				}
			}
		}

		if(year_loc > month_loc){
			if(year_loc > day_loc){
				year_val = Number(date_arr[2])
			}
			else{
				year_val = Number(date_arr[1])
			}
		}
		else{
			if(month_loc > day_loc){
				year_val = Number(date_arr[1])
			}
			else{
				year_val = Number(date_arr[0])
			}
		}

		// work out day
		if(day_val == NaN){
			old_day = old_date_obj.getDate()
		}
		else{
			old_day = day_val
		}

		// work out month
		if(month_val == NaN){
			old_month = old_date_obj.getMonth()
		}
		else{
			old_month = (month_val-1)
		}

		// work out year
		if(format.search('yyyy') >= 0){
			if(year_val == NaN){
				old_year = old_date_obj.getFullYear()
			}
			else{
				if(year_val < 10){
					year_val = '0'+year_val
				}
				old_year = year_val
			}
		}
		else if(year_val>999){
			if(year_val == NaN){
				old_year = old_date_obj.getFullYear()
			}
			else{
				if(year_val < 10){
					year_val = '0'+year_val
				}
				old_year = year_val
			}
		}
		else{
			test_val = Number(year_val)
			if(year_val < 10){
				year_val = '0'+year_val
			}
			if(test_val == NaN){
				old_year = old_date_obj.getFullYear()
			}
			else{
				if(test_val >= switch_year){
					new_val = '19'+year_val
					old_year = Number(new_val)
				}
				else{
					new_val = '20'+year_val
					old_year = Number(new_val)
				}
			}
		}
	}
	
	if(settings.use_select == 1){
		a5_year_sel_obj = document.getElementById(settings.uniqueID+'_sel_year');
		for(i=low_year; i <= high_year;i++){
			a5_year_sel_obj.options[a5_year_sel_obj.options.length] = new Option();
			a5_year_sel_obj.options[a5_year_sel_obj.options.length-1].text = ''+i;
			a5_year_sel_obj.options[a5_year_sel_obj.options.length-1].value = i;
		}
		a5_year_sel_obj.value =  ''+old_year;
		a5_month_sel_obj = document.getElementById(settings.uniqueID+'_sel_month');
		a5_month_sel_obj.value = ''+old_month
	}

	settings.month_type = month_type;
	settings.day_type = day_type;
	settings.cur_day = old_day;
	settings.cur_month = old_month;
	settings.cur_year = old_year;
	settings.old_day = old_day;
	settings.old_month = old_month;
	settings.old_year = old_year;
	
	fill_embedded_calendar(old_month,old_year,settings);
}