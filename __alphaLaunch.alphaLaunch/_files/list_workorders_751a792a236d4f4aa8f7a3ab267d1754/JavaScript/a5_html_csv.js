function validate_set(form_name,form_fld){
	eval(form_name+'_validation.'+form_fld+'.validate = true')
}

function validate(form_name,form_fld){
	window.status = 'Validating form...'
	form_to_validate = document.forms[form_name]
	var form_children = new Array()
	counter = 0

	if(form_fld == ''){
		for(i=0;i<form_to_validate.elements.length;i++){
			if(form_to_validate.elements[i].name!=undefined && form_to_validate.elements[i].name!=''){
				form_children[counter] = form_to_validate.elements[i].name
				counter++
			}
		}
	}
	else{
		form_children[0] = form_fld
		counter = 1
	}



	form_errors				= '';

	if(counter>0){
		
		form_error_return_ctrls = ''
		form_no_error_return_ctrls = ''
		cur_ctrl_form_error_return = ''
	
		for(i=0;i<form_children.length;i++){
			cur_ctrl_form_error_return = ''
			
			if(eval(form_name+'_validation.'+form_children[i])){
				form_child_vo		 = eval(form_name+'_validation.'+form_children[i])
				form_cur_field_value = form_to_validate.elements[form_children[i]].value
				
				if(form_child_vo.validate == true){
					// check if must have value
					if(form_child_vo.rv){
						if(form_cur_field_value == ''){
							if(form_child_vo.rv_error == ''){
								form_errors = form_errors+'- \''+form_children[i]+'\' must have a value.\n'
							}
							else{
								form_errors = form_errors+'- '+form_child_vo.rv_error+'\n';
							}
							cur_ctrl_form_error_return = form_children[i]
						}
					}
					
					if(form_child_vo.rv == false && form_cur_field_value != ''){

						// check text format errors
						if(form_child_vo.type == 'c'){
							tf_errors = 0
							//check if can have letters
							if(!form_child_vo.tf_l){
								form_validation_regex = new RegExp('.*[A-z].*')
								if(form_validation_regex.test(form_cur_field_value)){
									if(form_child_vo.tf_error == ''){
										form_errors = form_errors+'- \''+form_children[i]+'\' cannot contain letters.\n';
										tf_errors--
									}
									else{
										tf_errors++
									}
								}
							}
							//check if can have whitespace
							if(!form_child_vo.tf_ws){
								form_validation_regex = new RegExp('.*[ \t\v\f\n\r].*')
								if(form_validation_regex.test(form_cur_field_value)){
									if(form_child_vo.tf_error == ''){
										form_errors = form_errors+'- \''+form_children[i]+'\' cannot contain whitespace.\n';
										tf_errors--
									}
									else{
										tf_errors++
									}
								}
							}
							//check if can have digits
							if(!form_child_vo.tf_d){
								form_validation_regex = new RegExp('.*[0-9].*')
								if(form_validation_regex.test(form_cur_field_value)){
									if(form_child_vo.tf_error == ''){
										form_errors = form_errors+'- \''+form_children[i]+'\' cannot contain digits.\n';
										tf_errors--
									}
									else{
										tf_errors++
									}
								}
							}
							//check if can have special char
							if(!form_child_vo.tf_sc){
								form_validation_regex = new RegExp('.*[^ \t\v\f\n\rA-z0-9].*')
								if(form_validation_regex.test(form_cur_field_value)){
									if(form_child_vo.tf_error == ''){
										form_errors = form_errors+'- \''+form_children[i]+'\' cannot contain special characters.\n';
										tf_errors--
									}
									else{
										tf_errors++
									}
								}
							}
							//simple mask
							if(form_child_vo.tf_sm != ''){
								form_validation_regex = new RegExp(form_child_vo.tf_sm)
								if(form_validation_regex.test(form_cur_field_value) == false){
									if(form_child_vo.tf_error == ''){
										form_errors = form_errors+'- \''+form_children[i]+'\' doesn\'t match simple mask.\n';
										tf_errors--
									}
									else{
										tf_errors++
									}
								}
							}
							//regexp
							if(form_child_vo.tf_re != ''){
								form_validation_regex = new RegExp(form_child_vo.tf_re)
								if(form_validation_regex.test(form_cur_field_value) == false){
									if(form_child_vo.tf_error == ''){
										form_errors = form_errors+'- \''+form_children[i]+'\' doesn\'t match regular expression.\n';
										tf_errors--
									}
									else{
										tf_errors++
									}
								}
							}

							if(tf_errors > 0){
								form_errors = form_errors+'- '+form_child_vo.tf_error+'\n';
							}
							else if(tf_errors < 0){
								cur_ctrl_form_error_return = form_children[i]
							}

							// check length
							if(form_child_vo.dl_vl){
								dl_error = 0
								if(form_cur_field_value.length < form_child_vo.dl_min){
									dl_error = 1
								}
								if(form_cur_field_value.length > form_child_vo.dl_max){
									dl_error = dl_error+2
								}

								if(dl_error > 0){
									if(form_child_vo.dl_error != ''){
										form_errors = '- '+form_child_vo.dl_error+'\n';
									}
									else{
										if(dl_error == 1){
											form_errors = form_errors+'- \''+form_children[i]+'\' must be longer then '+form_child_vo.dl_min+' characters.\n'
										}
										else{
											form_errors = form_errors+'- \''+form_children[i]+'\' must be shorter then '+form_child_vo.dl_max+' characters.\n'
										}
									}
									cur_ctrl_form_error_return = form_children[i]
								}
							}
						}

						// check numeric format errors
						if(form_child_vo.type == 'n'){
							if(form_child_vo.nf_type == 'i'){
								if(validate_num(form_cur_field_value,form_child_vo.nf_tph,form_child_vo.nf_dph,-1) == false){
									form_errors = form_errors+'- '+form_child_vo.nf_error+'\n';
									cur_ctrl_form_error_return = form_children[i]
								}
							}
							else if(form_child_vo.nf_type == 'f'){
								if(validate_num(form_cur_field_value,form_child_vo.nf_tph,form_child_vo.nf_dph,form_child_vo.nf_dp) == false){
									form_errors = form_errors+'- '+form_child_vo.nf_error+'\n';
									cur_ctrl_form_error_return = form_children[i]
								}
							}
							else if(form_child_vo.nf_type == 'v'){
								if(validate_num(form_cur_field_value,form_child_vo.nf_tph,form_child_vo.nf_dph,0) == false){
									form_errors = form_errors+'- '+form_child_vo.nf_error+'\n';
									cur_ctrl_form_error_return = form_children[i]
								}
							}
						}
					}
					
					if(cur_ctrl_form_error_return == ''){
						form_no_error_return_ctrls = form_no_error_return_ctrls+form_children[i]+'\n'
					}
					else{
						form_error_return_ctrls = form_error_return_ctrls+cur_ctrl_form_error_return+'\n'
					}
					
				}
			}
		}
		
		window.status = ''
		if(form_errors != ''){
			alert(form_errors)
		}
		if(form_fld != ''){
			if(form_errors != ''){
				return false
				form_error_ctrl_array = form_error_return_ctrls.split('\n')
			}
		}
		else{
			if(form_errors == ''){
				return true
			}
			else{
				return false
				form_error_ctrl_array = form_error_return_ctrls.split('\n')
				form_to_validate.elements[form_error_ctrl_array[0]].focus();
			}
		}
	}
}

function validate_num(current_number,thousands_separator,decimal_separator,decimal_length){
	var validate_num_arr = new Array()
	var validate_num_dec_arr = new Array()
	if(thousands_separator != ''){
		validate_num_arr = current_number.split(thousands_separator)
	}
	else{
		validate_num_arr[0] = current_number
	}
	validate_num_dec_arr = validate_num_arr[validate_num_arr.length-1].split(decimal_separator)

	numeric_regex = new RegExp('.*[^0-9].*')

	num_val_errors = 0;

	if(validate_num_arr.length > 1 && validate_num_arr[0].length > 3){
		num_val_errors++
	}
	else if(validate_num_dec_arr.length > 2){
		num_val_errors++
	}
	else if(validate_num_dec_arr.length == 2 && decimal_length == -1){
		num_val_errors++
	}
	else if(validate_num_dec_arr.length == 1 && decimal_length > 0){
		num_val_errors++
	}
	else{
		if(validate_num_arr.length == 1){
			if(numeric_regex.test(validate_num_dec_arr[0])){
				num_val_errors++
			}
			if(numeric_regex.test(validate_num_dec_arr[1]) && decimal_length > 0){
				num_val_errors++
			}
			if(decimal_length == -1){
				if(validate_num_dec_arr.length != 1){
					num_val_errors++
				}
			}
			else if(decimal_length != 0){
				if(validate_num_dec_arr[1].length != decimal_length){
					num_val_errors++
				}
			}

			if(validate_num_arr[0].length > 3){
				num_val_errors++
			}
		}
		else{
			if(validate_num_dec_arr[0].length != 3){
				num_val_errors++
			}

			if(numeric_regex.test(validate_num_dec_arr[0])){
				num_val_errors++
			}

			if(numeric_regex.test(validate_num_dec_arr[1]) && decimal_length > 0){
				num_val_errors++
			}


			if(decimal_length == -1){
				if(validate_num_dec_arr.length != 1){
					num_val_errors++
				}
			}
			else if(decimal_length != 0){
				if(validate_num_dec_arr[1].length != decimal_length){
					num_val_errors++
				}
			}

			if(validate_num_arr[0].length > 3){
				num_val_errors++
			}

			if(validate_num_arr.length > 2){
				for(i=1;i<validate_num_arr.length-1;i++){
					if(validate_num_arr[i].length != 3 || numeric_regex.test(validate_num_arr[i])){
						num_val_errors++
					}
				}
			}
		}
	}

	if(num_val_errors == 0){
		return true;
	}
	else{
		return false;
	}
}