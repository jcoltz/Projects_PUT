
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

gantt.attachEvent("onLoadEnd", function () {
	//setTimeout(gantt.sort('sortorder'), 5);
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


var show_details = false;
function toggleView(){
    show_details = !show_details;
    gantt.getGridColumn("duration").hide = !show_details;
    gantt.getGridColumn("start_date").hide = !show_details;
    gantt.getGridColumn("work_order").hide = !show_details;
 
    if(show_details){
        gantt.config.grid_width = gantt._acds.grid_width;
    }else{
        gantt.config.grid_width = gantt._acds.grid_width_collapsed;
    }
        gantt.render();
};

toggleView(); //inital open
toggleView(); // hide columns


gantt.templates.rightside_text = function (start, end, task) {
		if (task.baseline_duration) {
			if (end.getTime() > task.baseline_duration.getTime()) {
				var overdue = Math.ceil(Math.abs((end.getTime() - task.baseline_duration.getTime()) / (24 * 60 * 60 * 1000)));
				var text = "<b>Overdue: " + overdue + " days</b>";
				return text;
			}
		}
	};