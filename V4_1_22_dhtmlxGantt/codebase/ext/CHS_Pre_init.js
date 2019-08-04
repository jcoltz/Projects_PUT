//turn auto scheduling on
gantt.config.auto_scheduling = true;
//turn on automatically moving linked tasks at all times
gantt.config.auto_scheduling_strict = true;
//move whole project when on task is moved
gantt.config.auto_scheduling_move_projects = true;
//helps with performance
//gantt.config.static_background = true; //can't use with work time background css.

//turn off initial scheduling that tells gantt to schedule everything when loaded
//If set to true, it does not handle the weekend stuff etc well and undoes stuff user did
//this should be fixed in Gantt Version 4.1.22 so we don't need to set gantt.config.auto_scheduling_initial to false.
gantt.config.auto_scheduling_initial = false;
gantt.config.work_time = true; //removes non-working time from calculations
gantt.skip_off_time = true; //hides non-working time in the chart


var weekScaleTemplate = function (date) {
	var dateToStr = gantt.date.date_to_str("%d %M");
	var weekNum = gantt.date.date_to_str("(week %W)");
	var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
	return dateToStr(date) + " - " + dateToStr(endDate) + " " + weekNum(date);
};

gantt.config.subscales = [{
		unit: "month",
		step: 1,
		date: "%F, %Y"
	}, {
		unit: "week",
		step: 1,
		template: weekScaleTemplate
	}
];

gantt.templates.task_cell_class = function (task, date) {
	if (!gantt.isWorkTime(date))
		return "week_end";
	return "";
};
gantt.config.scale_unit = "day";
gantt.config.date_scale = "%D, %d";
gantt.config.min_column_width = 45;
gantt.config.duration_unit = "day";
gantt.config.scale_height = 20 * 3;

//make the height of the task bar less
gantt.config.task_height = 25;
gantt.config.row_height = 35;

//formats dates of the baseline area of lightbox so Gantt can process them
//PLANNED_START and PLANNED_END are the mapped fields, case sensitive
gantt.attachEvent("onTaskLoading", function (task) {
	task.PLANNED_START = gantt.date.parseDate(task.PLANNED_START, gantt.config.task_date);
task.PLANNED_END = gantt.date.parseDate(task.PLANNED_END, gantt.config.task_date);
	return true;
});


//sets the tool tips text
gantt.templates.tooltip_text = function (start, end, task) {
	var planned_start;
	if(task.PLANNED_START){
		planned_start = gantt.templates.tooltip_date_format(task.PLANNED_START);	
	}else{
		planned_start = "No planned date set";
	}
	return "<b>Title:</b> " + task.text +
	"<br/><b>Job:</b>" + task.JOB_CODE +
	"&nbsp;&nbsp;<b>Assignee:</b>" + task.ASSIGNED_TO +
	"<br/><b>Start:</b> " +
	gantt.templates.tooltip_date_format(start) +
	"&nbsp;&nbsp;<b>Work Days:</b> " + task.duration +
	"<br/><b>Planned Start:</b> " + planned_start ;
};

gantt.config.columns = [{
		name: "text",
		label: "Title",
		tree: true,
		resize: true,
		width: 175
		//width: 175
	}, {
		name: "ASSIGNED_TO",
		label: "Assignee",
		align: "left",
		resize: true,
		width: 60
	}, {
		name: "start_date",
		label: "Start",
		align: "center",
		resize: true,
		width: 80
	}, {
		name: "duration",
		label: "Days",
		align: "center",
		resize: true,
		width: 50
	}, {
		name: "JOB_CODE",
		label: "Job",
		align: "left",
		resize: true,
		width: 60
	}, {
		name: "add", //adds in the plus sign for adding in new items.
		label: ""
	}
];
gantt.config.grid_resize = true; //allows resizing of grid. 

//defines the style of task bars
/* Turn off slider for projects */
gantt.templates.task_class = function (start, end, task) {
 if(task.type == 'project'){
      return "no_drag_progress"; 
   }
   return "";
}

/* commented out 6/5/17
//added below for baseline view
//add in the divs that will contain the baseline
//gantt.addTaskLayer(function draw_planned(task) {
// debugger;
//if (task.PLANNED_START && task.PLANNED_END) {
//var sizes = gantt.getTaskPosition(task, task.PLANNED_START, task.PLANNED_END);
//var el = document.createElement('div');
//el.className = 'baseline';
//el.style.left = sizes.left + 'px';
//el.style.width = sizes.width + 'px';
//el.style.top = sizes.top + gantt.config.task_height + 13 + 'px';
//return el;
//}
//return false;
//});
 */

gantt.locale.labels.section_project_description = "This is for a PROJECT that contains Tasks! Think of Projects as Stages of the job. Start and end times of a project are controlled by the tasks added to the project.  After a Project is created, there will be a Plus button on the Project line to use for adding tasks to the project.  IMPORTANT!:  IF you delete this project, any tasks under it will also be deleted!  Project Title:";
gantt.locale.labels.new_task = "Enter Title";
gantt.locale.labels.section_description = "Task Title (Keep Short!  Best to use less than 25 characters.)";
gantt.locale.labels.section_milestone_description = "Milestone Title";
gantt.locale.labels.section_assignee = "Assigned To (If Project or Milestone, leave Z as the Assignee. Before changing, use Open More button to see if a PO is attached!)";
gantt.locale.labels.section_notes = "Notes. Back slashes will be replaced with forward slashes.";
//give a name for Baseline section in the lightbox.
gantt.locale.labels.section_baseline = "Planned Start & Duration";
//allow enter key in lightbox.
gantt.keys.edit_save = -1;
//types for typeselect control
gantt.config.types = {
	'task': 'task', //a lightbox for reqular tasks
	'milestone': 'milestone', //a lightbox for milestones
	'project': 'project' //a lightbox for project tasks
};
//setup the task lightbox.
gantt.config.lightbox.sections = [{
		// "type" is a special name used for setting the project, milestone or task types
		name: "type",
		type: "typeselect",
		map_to: "type",
		filter: function (typeName, typeId) {
			if (typeName == gantt.config.types.task || typeName == gantt.config.types.milestone) {
				return true;
			}
			return false;
		}
	},
	{
		name: "description",
		height: 20,
		map_to: "text",
		type: "textarea",
		focus: true
	}, {
		name: "assignee",
		height: 20,
		map_to: "ASSIGNED_TO",
		type: "select",
		//created with the Xbasic function get_lists_for_gantt() located in the control panel.
		options: gantt.serverList("vendors_list")
	}, {
		name: "notes",
		height: 50,
		map_to: "NOTES",
		type: "textarea"
	}, {
		name: "time",
		height: 20,
		map_to: "auto",
		type: "duration"
	}, {
		name: "baseline",
		height: 20,
		map_to: {
			start_date: "PLANNED_START",
			end_date: "PLANNED_END"
		},
		type: "duration"
	} 
];
//setup the project lightbox
gantt.config.lightbox.project_sections = [{
		name: "project_description",
		height: 20,
		map_to: "text",
		type: "textarea",
		focus: true
	}, {
		name: "notes",
		height: 50,
		map_to: "NOTES",
		type: "textarea"
	}, {
		name: "assignee",
		height: 20,
		map_to: "ASSIGNED_TO",
		type: "select",
		//created with the Xbasic function get_lists_for_gantt() located in the control panel.
		options: gantt.serverList("vendors_list")
	}
];

//setup the milestone lightbox
gantt.config.lightbox.milestone_sections = [{
		// "type" is a special name used for setting the project, milestone or task types
		name: "type",
		type: "typeselect",
		map_to: "type",
		filter: function (typeName, typeId) {
			if (typeName == gantt.config.types.task || typeName == gantt.config.types.milestone) {
				return true;
			}
			return false;
		}
	},
	{
		name: "milestone_description",
		height: 20,
		map_to: "text",
		type: "textarea",
		focus: true
	}, {
		name: "notes",
		height: 50,
		map_to: "NOTES",
		type: "textarea"
	}, {
		name: "time",
		height: 20,
		map_to: "auto",
		type: "duration"
	}, {
		name: "assignee",
		height: 20,
		map_to: "ASSIGNED_TO",
		type: "select",
		//created with the Xbasic function get_lists_for_gantt() located in the control panel.
		options: gantt.serverList("vendors_list")
	}
];
//Custom function for getting OLE date from javascript date object to use for sortorder.
function getOleDate(item) {
	var date = new Date(item.start_date);
	var oaDate = (date - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
	return Math.round(oaDate);
}

/*allows only projects to be created from top plus button and does not allow projects from projects */
gantt.attachEvent("onTaskCreated", function(task){
	if (!task.parent){task.type = 'project'; }
    return true;
});

//add in the JOB_CODE to new events & set the GANTT_ORDER (sortorder) field.
//make sure assignee is Z when new task is added
//make sure PO_NUM and attached files are NONE when new task is added
gantt.attachEvent("onBeforeTaskAdd", function (id, item) {
	//any custom logic here
	//debugger;
	//>>>>>>> NEEDS to have the following code in the onrendercomplete section of Client side events of the gantt compnent>>>>>  window.parent._ACDSGANTT = {dialog.object}; <<<<<<<<
	if (typeof(window.parent._ACDSGANTT) != 'undefined') {
		item.JOB_CODE = window.parent._ACDSGANTT.stateInfo.__args_c_JOBCODE;
		var assignee = item.ASSIGNED_TO;
 		 if (assignee == '0') {
  			 item.ASSIGNED_TO = 'Z';
  		} else {
  			 if (assignee == '') { 
   				 item.ASSIGNED_TO = 'Z';
   			} else {
   				 item.ASSIGNED_TO = assignee;
   			}
  		}

		item.PO_NUM = 'NONE';
		item.LAST_CHANGE_BY = 'OnGantt';
		item.LAST_CHANGE_DATE = new Date();
   		item.ATTACHED_FILE_1 = 'NONE';
		item.ATTACHED_FILE_2 = 'NONE';
		item.ATTACHED_FILE_3 = 'NONE';

	}

	item.sortorder = getOleDate(item); //custom function defined above.
	return true;
});


//for tasks under projects to set sort order of parent project
gantt.attachEvent("onAfterTaskAdd", function (id, item) {
	item.sortorder = getOleDate(item); //custom function defined above
	if (item.$level > 0) {
		gantt.getTask(item.parent).sortorder = item.sortorder;
		gantt.getTask(item.parent).start_date = item.start_date;
		gantt.updateTask(item.parent);
		//set projected end date
		//get gantt end date and set PROJECTED_END_DATE by subtracting 1 from it.
		//This is because gantt end date is always 1 day after actual end day
		var projEnd = new Date(item.end_date);
		if (item.type != 'milestone') {
			var dom = projEnd.getDate(); //get end date to use for subtracting 1
			projEnd.setDate(dom - 1);

		}
		item.PROJECTED_END = projEnd;
		//Add in automatic parent progress update when child task progress is updated, excluding milestones
		var parentTask = gantt.getTask(item.parent);
		var childs = gantt.getChildren(parentTask.id);
		var totProgress = 0;
		var tempTask;
		var childcount = childs.length; //use to decrement count for milestones
		for (i = 0; i < childs.length; i++) {
			tempTask = gantt.getTask(childs[i]);
			if(tempTask.type != "milestone"){
				if (tempTask.progress) {
					totProgress += parseFloat(tempTask.progress);
				}
			}else{
					childcount -= 1; //if milestone reduce count by one
			}
		}
		parentTask.progress = (totProgress / childcount).toFixed(2);
		gantt.updateTask(parentTask.id);	
	}
	
	//make sure any back slashes user enter in text fields are replaced with forward ones
	//if gantt finds back slashes in text, it will fail
	if (item.text) {
		item.text = item.text.replace(/\\/g, '/');
	}
	if (item.NOTES) {
		item.NOTES = item.NOTES.replace(/\\/g, '/');
	}

	item.LAST_CHANGE_BY = 'OnGantt';
	item.LAST_CHANGE_DATE = new Date();
	//sort the tasks
	gantt.sort('sortorder');

	return true;
});

//update the GANTT_ORDER (sortorder) field when a task changes.
gantt.attachEvent("onBeforeTaskUpdate", function (id, item) {
	if(item.ASSIGNED_TO && gantt._acds_task && gantt._acds_task.id === id){
		if(item.PO_NUM != "NONE" && item.ASSIGNED_TO != gantt._acds_task.ASSIGNED_TO){ //test for existing PO and change of ASSIGNED_TO.
			item.ASSIGNED_TO = gantt._acds_task.ASSIGNED_TO; //PO exists, so set the edited ASSIGNED_TO value back to the original.
			//redisplay the lightbox for the user and let them know of the conflict.
			setTimeout(function(){gantt.showLightbox(item.id);},5); 
			gantt.alert("The 'Assigned to' field cannot be changed because PO number <b>"+item.PO_NUM+" </b> is attached to this task.  Use the Open More button OR the List View to clear the PO first.");
			return false; //prevent the change.
		}
	}
	return true;
});

  // for tasks under projects to set sort order of parent project
gantt.attachEvent("onAfterTaskUpdate", function (id, item) {
	item.sortorder = getOleDate(item); //custom function defined above
	if (item.$level > 0) {
		gantt.getTask(item.parent).sortorder = item.sortorder;
		gantt.getTask(item.parent).start_date = item.start_date;
		gantt.updateTask(item.parent);
		//get gantt end date and set PROJECTED_END_DATE by subtracting 1 from it.
		//This is because gantt end date is always 1 day after actual end day
		var projEnd = new Date(item.end_date);
		if (item.type != 'milestone') {
			var dom = projEnd.getDate(); //get end date to use for subtracting 1
			projEnd.setDate(dom - 1);
		}
		item.PROJECTED_END = projEnd;
		//Add in automatic parent progress update when child task progress is updated, excluding milestones
		var parentTask = gantt.getTask(item.parent);
		var childs = gantt.getChildren(parentTask.id);
		var totProgress = 0;
		var tempTask;
		var childcount = childs.length; //use to decrement count for milestones
		for (i = 0; i < childs.length; i++) {
			tempTask = gantt.getTask(childs[i]);
			if(tempTask.type != "milestone"){
				if (tempTask.progress) {
					totProgress += parseFloat(tempTask.progress);
				}
			}else{
					childcount -= 1; //if milestone reduce count by one
			}
		}
		parentTask.progress = (totProgress / childcount).toFixed(2);
		gantt.updateTask(parentTask.id);	
	
	}

	//make sure any back slashes user enter in text fields are replaced with forward ones
	//if gantt finds back slashes in text, it will fail
	if (item.text) {
		item.text = item.text.replace(/\\/g, '/');
	}
	if (item.NOTES) {
		item.NOTES = item.NOTES.replace(/\\/g, '/');
	}

	item.LAST_CHANGE_BY = 'OnGantt';
	item.LAST_CHANGE_DATE = new Date();

	gantt.sort('sortorder');
	return true;
});

/*custom function for checking for data in columns and preventing deletes.*/
gantt.acds_CheckForAttachedFiles = function(item){
	var attachedfiles = {};
	attachedfiles.nodelete = false;
	attachedfiles.fileswithdata ="";
	
	if( item.PO_NUM != "" && item.PO_NUM != "NONE"){
		attachedfiles.fileswithdata += "PO Num, ";
		attachedfiles.nodelete = true;
	}	
	if( item.ATTACHED_FILE_1 != "" && item.ATTACHED_FILE_1 != "NONE"){
		attachedfiles.fileswithdata += "Attached File 1, ";
		attachedfiles.nodelete = true;
	}	
	if( item.ATTACHED_FILE_2 != "" && item.ATTACHED_FILE_2 != "NONE" ){
		attachedfiles.fileswithdata +=  "Attached File 2, ";
		attachedfiles.nodelete = true;
	}
	if( item.ATTACHED_FILE_3 != "" && item.ATTACHED_FILE_3 != "NONE" ){
		attachedfiles.fileswithdata +=  "Attached File 3, ";
		attachedfiles.nodelete = true;
	}

	return attachedfiles;
};



gantt.attachEvent("onBeforeTaskDelete", function (id, item) {
	//control deletes
	/*gantt ajax*/
/*
	var xhr = gantt.ajax;
	var ajaxResponse = xhr.postSync("checkdelete.a5w", "taskdata=" + JSON.stringify(item), function (r) {});
	var responseText = JSON.parse(ajaxResponse.xmlDoc.responseText);
*/	
	/*check for good result from AJAX callback, if not, cancel the delete with error message*/
/*
	if (responseText.result != 'ok') {
		gantt.alert(responseText.result);
		return false;
	}
*/
	var childs, emptytest, totProgress, tempTask, parentTask, childcount;
	var projecttest = [];
	var projectchilds = {};
	
	//Add in automatic parent progress update when child task is deleted
	if (item.$level > 0) {
		/*test tasks for mapped fileds having data in them and prevent deletes if they do*/
		emptytest = gantt.acds_CheckForAttachedFiles(item); //custom function defined above.
		if (emptytest && emptytest.nodelete ){
			setTimeout(function(){gantt.showLightbox(item.id);},5); //redisplay the lightbox for the user.
			//alert that includes list of file names
			/*gantt.alert("The <b> "+item.text+" </b> task/milestone cannot be deleted because it has a PO or attached files in the following fields: "+emptytest.fileswithdata+"please use the Open More button or the List View to clear any PO or remove any uploaded attachments first." );*/

			gantt.alert("The <b> "+item.text+" </b> task cannot be deleted because it has a PO or Uploaded Files attached. Please use the Open More button OR the List View to clear any PO or remove any uploaded attachments first." );
			return false; //stop delete
		}
		/*Add in automatic parent progress update when child task progress is deleted, excluding milestones */
		parentTask = gantt.getTask(item.parent);
		childs = gantt.getChildren(parentTask.id);
		totProgress = 0;
		tempTask;
		childcount = childs.length; //use to decrement count for milestones
			for (i = 0; i < childs.length; i++) {
				tempTask = gantt.getTask(childs[i]);
				if (tempTask.type != "milestone") {
					if (!tempTask.progress) {
						tempTask.progress = 0;
					}
					if (tempTask.id != id) { //if not the task being deleted update the progress
						totProgress += parseFloat(tempTask.progress);
					} else {
						childcount -= 1;
					}
				} else {
					childcount -= 1; //if milestone reduce count by one
				}
				parentTask.progress = (totProgress / childcount).toFixed(2);
				gantt.updateTask(parentTask.id);
			}
	}else{
		/* check for filled PO fields in projects' children and prevent deletion if found. */
		if(item.type = "project"){
			projectchilds.nodelete = false;
			projectchilds.childtasks = "";
			childs = gantt.getChildren(id);
			for (i = 0; i < childs.length; i++) {
				tempTask = gantt.getTask(childs[i]);
				projecttest.push(gantt.acds_CheckForAttachedFiles(tempTask));
			}
			for (i = 0; i < projecttest.length; i++){
				if(projecttest[i].nodelete){
					projectchilds.childtasks += gantt.getTask(childs[i]).text + ", "
					projectchilds.nodelete = true;
				}
			}	
				if(projectchilds.nodelete){
					setTimeout(function(){gantt.showLightbox(item.id);},5); //redisplay the lightbox for the user.
					//commented out - gives list of tasks with attached PO or file uploads
					/*gantt.alert("The <b> "+item.text+" </b> project cannot be deleted because it has attached files in the following tasks: <b>"+projectchilds.childtasks+"</b>please use the List View and delete the attachments first." );*/

					gantt.alert("The <b> "+item.text+" </b> PROJECT cannot be deleted because it has child tasks with attached POs OR uploaded file attachments.  Please use the List View and clear POs or remove uploaded attachments first.  OR double click on each task and then use the Open More button on the window that pops up." );
					return false; //stop delete
				}
		}
	}
	return true;
});

/* Ajax callback for audit trail on delete of tasks. */
gantt.attachEvent("onAfterTaskDelete", function(id,item){
    /* A5 ajax not working, gives error message "Script Error: Error:Script:a5_ajax_CustomComponent() line:1729  - Not found 
  - eventResult not found."
	if (typeof(window.parent._ACDSGANTT) != 'undefined') {
		var callbackResult;
		callbackResult = window.parent._ACDSGANTT.ajaxCallback('','','CHS_record_deletes','','taskdata='+encodeURIComponent(JSON.stringify(item)),); //"taskdata=" + encodeURIComponent(JSON.stringify(item))
		//"&taskdata =" + encodeURIComponent(JSON.stringify(gantt._acds_task));
		if(callbackResult && callbackResult != "success"){
			gantt.alert('Deleted Task '+item.text+' was not recorded in audit table. Error ='+callbackResult);
		}else{
			gantt.alert('Deleted task '+item.text+' has been entered in audit table.');
		}
	}
	*/
	//debugger;
	var xhr = gantt.ajax;
	var ajaxResponse = xhr.postSync("checkdelete.a5w", "taskdata=" + JSON.stringify(item), function (r) {}); //synchronous ajax callback.
	var responseText = JSON.parse(ajaxResponse.xmlDoc.responseText); //put response into javascript object from json sting.
	/*check for good result from AJAX callback, if not, cancel the delete with error message*/
	if (responseText.result != 'success') {
		gantt.alert('Deleted Task '+item.text+' was not recorded in audit table. Error ='+responseText.result);
		return false;
	//}else{
	//		gantt.alert('Deleted task '+item.text+' has been entered in audit table.');
	}
	
});

/*Get the initial value of the task into a global variable to use in the onBeforeTaskUpdate() event for validation of data (existing PO)*/
gantt.attachEvent("onBeforeLightbox", function(id) {
    gantt._acds_task = JSON.parse(JSON.stringify(gantt.getTask(id))); //get clone of task object.
    return true;
});

/* Only show UX button in lightbox if not a new event. */
gantt.attachEvent("onLightbox", function (id) {
    var task = gantt.getTask(id);
    //debugger;
    var uxbutton = document.getElementsByClassName('Open_Edit_Form_set'); //using plain old javascript.
    if (task.$new){  
        uxbutton[0].hidden = true;
    }else{
        uxbutton[0].hidden = false;
    }
    return true;
});

//hide UX button for new events when changing from task to milestone
gantt.attachEvent("onLightboxChange", function(old_type,new_type) {
	var uxbutton = document.getElementsByClassName('Open_Edit_Form_set');
	var task = gantt.getTask(gantt.getLightboxValues().id);
	if(task.$new) {
		uxbutton[0].hidden = true;
	} else {
		uxbutton[0].hidden = false;
	}
});

//fix end date in lightboxes duration area
 gantt.templates.task_date= function(date){
    var newend = new Date(date);    
    var dayOfMonth = newend.getDate();  
    newend.setDate(dayOfMonth - 1);  
    return gantt.date.date_to_str(gantt.config.task_date)(newend);
};

//fix end date in lightbox header to show one day more to counteract the changes in gantt.templates.task_date.
gantt.templates.task_time = function(start,end,task){
	var newstart = new Date(start);
	var dayOfMonth = newstart.getDate();
	newstart.setDate(dayOfMonth + 1);
	if(task.type != 'milestone') {
		return gantt.templates.task_date(newstart)+" - "+gantt.templates.task_date(end);
	} else {
		return gantt.templates.task_date(newstart)+" - "+gantt.templates.task_date(newstart);
	}
};

