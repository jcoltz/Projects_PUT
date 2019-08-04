//Below moved here from "Above HTML: area of component.
function refreshGantt(){
    gantt.acds_scroll = gantt.getScrollState(); //gets current scroll state of chart
    gantt.acds_scroll.id = gantt.getSelectedId() //gets selected task/project if any
    acdsGanttRefresh(); //custom function defined in AEX file.
	 acds_setMarker(); //custom function defined below.
}

//custom function
gantt.collapseAll = function(){
	gantt.acds_expanded = false;	
	gantt.acds_scroll = gantt.getScrollState(); 	
	gantt.acds_scroll.id = gantt.getSelectedId();
	if(gantt.acds_scroll.id){
		task = gantt.getTask(gantt.acds_scroll.id);
	}
	gantt.eachTask(function(task){
    	task.$open = false;
  	});
  	gantt.render();
	if(gantt.acds_scroll.id){
		if(task.type == 'project'){
			gantt.showTask(gantt.acds_scroll.id);
		}else{
			gantt.showTask(task.parent);
			gantt.selectTask(task.parent);
		}
	}
}
//custom function
gantt.expandAll = function(){
 	gantt.acds_expanded = true;	
	gantt.acds_scroll = gantt.getScrollState();	
	gantt.acds_scroll.id = gantt.getSelectedId();
	gantt.eachTask(function(task){
    task.$open = true;
  	});
 	gantt.render();
	if(gantt.acds_scroll.id){
		gantt.showTask(gantt.acds_scroll.id);
	}
}
//custom function
gantt.acds_toggleAll = function(){
	if(gantt.acds_expandtest){
		gantt.collapseAll();
		gantt.acds_expandtest = false;
	}else{
		gantt.expandAll();
		gantt.acds_expandtest = "true";
	}
}

gantt.acds_expanded = false; //set false if on initial load the tasks are collapsed, otherwise set to true.
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// above moved here from "Above HTML: area of component

gantt.attachEvent("onLoadEnd", function () {
	setTimeout(gantt.sort('sortorder'), 5);
	//added to scroll to edited task if UX is opened.
	// more code added to get current expanded state of gantt and restore after closing UX component's window.
	//debugger;
	
	if(gantt._acds_task && gantt._acds_task.parent > 0 && !gantt.acds_expanded){ //for tasks under projects (those with parents)
		gantt.getTask(gantt._acds_task.parent).$open = true;
		gantt.updateTask(gantt._acds_task.parent);
	}else{
		if(gantt._acds_task && gantt._acds_task.parent == 0 && !gantt.acds_expanded){ //for projects (top level tasks)
			if(gantt._acds_task.$open){ //if only this project was expanded when the UX was opened, reopen it after reload.
				gantt.getTask(gantt._acds_task.id).$open = true;
				gantt.updateTask(gantt._acds_task.id);
			}	
		}
	}	
	if (typeof(gantt.acds_scroll) != 'undefined') {
		gantt.scrollTo(gantt.acds_scroll.x, gantt.acds_scroll.y);
		if (gantt.acds_scroll.id) {
			gantt.selectTask(gantt.acds_scroll.id);
		}
		delete gantt.acds_scroll;
		if(gantt.acds_expanded){
			gantt.expandAll(); //change to gantt.collapseAll() if gantt is set to have the initial state of expanded.
		}   
	}
	if(gantt._acds_task){
		gantt.showTask(gantt._acds_task.id);
		gantt.selectTask(gantt._acds_task.id);
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
