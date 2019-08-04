function hide_show_by_id(tar_id){
	if(document.all){
		if(document.all.item(tar_id).style.display == 'none'){
			document.all.item(tar_id).style.display = 'block';
			document.all.item(tar_id+'_atag').className = 'a_menu_on';
		}
		else{
			document.all.item(tar_id).style.display = 'none';
			document.all.item(tar_id+'_atag').className = 'a_menu_off';
		}
	}
	else if(document.getElementById){
		if(document.getElementById(tar_id).style.display == 'none'){
			document.getElementById(tar_id).style.display = 'block';
			document.getElementById(tar_id+'_atag').className = 'a_menu_on';
		}
		else{
			document.getElementById(tar_id).style.display = 'none';
			document.getElementById(tar_id+'_atag').className = 'a_menu_off';
		}
	}
}