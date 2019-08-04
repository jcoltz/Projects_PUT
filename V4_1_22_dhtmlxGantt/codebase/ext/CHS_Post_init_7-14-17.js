
						  
																											   
									   
																  
									  
						  
				
				
								 
	

 

				 

						 
							   
								 
														 
														   
															
 
					 
									  
		  
									  
	 
					   
  

				   

  
													 
							  
		  
			 
   
  

														 
											   
								 
			   
																									   
					 
								  
		  
								   
	 
				
   

																	
																   
																	  
														
				
							
		 
							 
  
   

gantt.attachEvent("onLoadEnd", function () {
	setTimeout(gantt.sort('sortorder'), 5);
	//added to scroll to edited task if UX is opened.
	if (typeof(gantt.acds_scroll) != 'undefined') {
		gantt.scrollTo(gantt.acds_scroll.x, gantt.acds_scroll.y);
		if (gantt.acds_scroll.id) {
			gantt.selectTask(gantt.acds_scroll.id);
		}
		delete gantt.acds_scroll;
		   
							 
					   
   
	}
});



																									  
												  
			   
											
				
   

														 
			 
			 
   

//set the + buttons to hidden if not at top level and also for milestonses and tasks. 
gantt.templates.grid_row_class = function (start, end, task) {
	//debugger;
	if (task.$level > 0 || task.type == 'task' || task.type == 'milestone') {
		return "nested_task"; //defined in css classes
	}
	return "";
};

/* add button to lightbox to open UX component */
gantt.config.buttons_left = ["gantt_delete_btn","gantt_save_btn","Open_Edit_Form"];
gantt.config.buttons_right = ["gantt_cancel_btn"]; 
gantt.locale.labels["Open_Edit_Form"] = "If Saved! Open more..";
																									   
gantt.attachEvent("onLightboxButton", function (button_id, node, e) {
	if (button_id == "Open_Edit_Form") {
		//debugger;
		var id = gantt.getState().lightbox;
		var req_task = gantt.getTask(id);
		var text = req_task.text;
																										   
																										
										   
											  
			 
							 
																							 
							
	  
			if (!gantt.getState().new_event) {
				jQuery(".gantt_cancel_btn").click();
				window['myEditsWindow'] = A5.PageWindows.createWindow('mywindow', 'modal-url', {
						height: '4in',
						width: '7in',
						title: {
							html: 'Additional Data Related To Task',
							location: 'top',
							direction: 'ltr'
						},
						disableMove: false,
						theme: '{grid.style}',
						body: {
							content: {
								type: 'url',
								url: '__workingMessage.a5w'
							}
						},
						animation: {
							show: {
								type: 'fade',
								duration: 'slow'
							},
							hide: {
								type: 'fade',
								duration: 'slow'
							}
						},
						buttons: {
							items: [{
									html: 'CLOSE',
									name: 'close',
									action: 'Close',
									disabled: false,
									show: true
								}
							],
							style: ''
						},
						onHide: function () {
							$(this.getWindowId('body')).src = '__workingMessage.a5w';
							//refresh the gantt
							gantt.acds_scroll = gantt.getScrollState(); //used in onLoadEnd event.
							gantt.acds_scroll.id = id;
							acdsGanttRefresh();  //reload the new data.
						}
					});

				window['myEditsWindow'].show('dock', 'top');
				$(window['myEditsWindow'].getWindowId('body')).src = 'ScheduleStagesGanttAuto_UXEdit.a5w?id=' + id;

			}
	}

});
		 

//add in date marker that updates each minute. 
//needs codebase/ext/dhtmlxgantt_marker.js loaded in Above Gantt HTML section  

function acds_setMarker(){
	//add in date marker that updates each minute. 
	//needs codebase/ext/dhtmlxgantt_marker.js loaded in html section
	gantt.deleteMarker(gantt.todayMarker);
	var date_to_str = gantt.date.date_to_str(gantt.config.task_date); 
	gantt.todayMarker = gantt.addMarker({
		start_date: new Date(),  //date the marker is set at
		css: "today",  //sets the style, defined in the gantt css file
		text: "Today",  //adds test to the marker
		title:date_to_str( new Date())  //what gets shown on mouse hover
});
setInterval(function(){
	if(gantt.todayMarker){
		 var today = gantt.getMarker(gantt.todayMarker);
		 today.start_date = new Date();
		 today.title = date_to_str(today.start_date);
		 gantt.updateMarker(gantt.todayMarker);
	}
}, 1000*600);
}
acds_setMarker();
