gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
//turn auto scheduling on
gantt.config.auto_scheduling = true;
//turn on automatically moving linked tasks at all times
gantt.config.auto_scheduling_strict = true;
//move whole project when on task is moved
gantt.config.auto_scheduling_move_projects = true;
//helps with performance
gantt.config.static_background = true; //can't use with work time background.
gantt.config.grid_resize = true;
//gantt.config.auto_scheduling_initial = false;
gantt.config.work_time = true; //removes non-working time from calculations
gantt.skip_off_time = true; //hides non-working time in the chart
gantt.config.scale_unit = "week";
gantt.config.types = {
	'task': 'task', //a lightbox for reqular tasks
	'milestone': 'milestone', //a lightbox for milestones
	'project': 'project' //a lightbox for project tasks
};
gantt.keys.edit_save = -1;
gantt.config.duration_unit = "week";//an hour
gantt.config.duration_step = 1; 
//make the height of the task bar less
gantt.config.task_height = 25;
gantt.config.row_height = 45;

gantt.locale.labels.section_on_hold = "Status";
gantt.locale.labels.section_notes = "Notes";
gantt.locale.labels.section_work_order = "Work Order";
gantt.locale.labels.section_baseline = "Planned Start & Finish";
gantt.locale.labels.section_project_description = "Description";
gantt.locale.labels.section_customer = "Customer Name";
gantt.locale.labels.section_milestone_description = "Milestone Decription";

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


//formats dates of the baseline area of lightbox so Gantt can process them
//PLANNED_START and PLANNED_END are the mapped fields, case sensitive
gantt.attachEvent("onTaskLoading", function (task) {
	task.baseline_start = gantt.date.parseDate(task.baseline_start, gantt.config.task_date);
	task.baseline_duration = gantt.date.parseDate(task.baseline_duration, gantt.config.task_date);
	return true;
});

//added below for baseline view
//add in the divs that will contain the baseline
gantt.addTaskLayer(function draw_planned(task) {
// debugger;
if (task.baseline_start && task.baseline_duration) {
var sizes = gantt.getTaskPosition(task, task.baseline_start, task.baseline_duration);
var el = document.createElement('div');
el.className = 'baseline';
el.style.left = sizes.left + 'px';
el.style.width = sizes.width + 'px';
el.style.top = sizes.top + gantt.config.task_height + 13 + 'px';
el.innerHTML = "Planned Duration";
return el;
}
return false;
});
gantt._acds = {};
gantt._acds.grid_width = 580;
gantt._acds.grid_width_collapsed = 150;
gantt.config.grid_width = gantt._acds.grid_width;
gantt._acds.grid_width
gantt.config.columns = [{
		name: "text",
		label: "Description",
		tree: true,
		resize: true,
		width: 270,
		hide: false
		//width: 175
	}, {
		name: "work_order",
		label: "Work Order",
		align: "left",
		resize: true,
		width: 90,
		template:function(obj){
			return obj.work_order + "/" + obj.lot_number;
		},
		hide: true
	}, {
		name: "start_date",
		label: "Start Date",
		align: "center",
		resize: true,
		width: 80,
		hide: true
	}, {
		name: "end_date",
		label: "End Date",
		align: "center",
		resize: true,
		hide: true,
		width: 80//,
		/* template: function(obj){
			return obj.end_date;
		} */
	},{
		name: "add", //adds in the plus sign for adding in new items.
		label: ""
	}
];

gantt.config.lightbox.sections = [{
		// "type" is a special name used for setting the project, milestone or task types
		name: "type",
		type: "typeselect",
		map_to: "type",
	},{
		name: "description",
		height: 20,
		map_to: "text",
		type: "textarea",
		focus: true
	}, {
		name: "work_order",
		height: 20,
		map_to: "work_order",
		type: "textarea"
	}, {name:"lot_number",
		height: 20,
		map_to: "lot_number",
		type: "textarea"
	},	{
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
			start_date: "baseline_start",
			end_date: "baseline_duration"
		},
		type: "duration"
	},{
		name:"on_hold",
		height: 20,
		map_to: "on_hold",
		type:"select",
		options:[
			{key:0, label:"OK"},
			{key:1, label:"On Hold"}
		]
	} 
];
//setup the project lightbox
gantt.config.lightbox.project_sections = [{
		name: "type",
		type: "typeselect",
		map_to: "type",
	},{
		name: "project_description",
		height: 20,
		map_to: "text",
		type: "textarea",
		focus: true
	},{
		name:"customer",
		height: 20,
		map_to:"customer",
		type:"textarea"
	},{
		name: "work_order",
		height: 20,
		map_to: "work_order",
		type: "textarea"
	},{
		name: "notes",
		height: 50,
		map_to: "NOTES",
		type: "textarea"
	},{
		name:"on_hold",
		height: 20,
		map_to: "on_hold",
		type:"select",
		options:[
			{key:0, label:"OK"},
			{key:1, label:"On Hold"}
		]
	} 
];

//setup the milestone lightbox
gantt.config.lightbox.milestone_sections = [{
		// "type" is a special name used for setting the project, milestone or task types
		name: "type",
		type: "typeselect",
		map_to: "type",
	},{
		name: "milestone_description",
		height: 20,
		map_to: "text",
		type: "textarea",
		focus: true
	},{
		name: "work_order",
		height: 20,
		map_to: "work_order",
		type: "textarea"
	},{
		name: "notes",
		height: 50,
		map_to: "NOTES",
		type: "textarea"
	},{
		name: "time",
		height: 20,
		map_to: "auto",
		type: "duration"
	}
];

gantt.attachEvent("onAfterTaskAdd", function (id, item) {
	//debugger;

	if (item.$level > 0) {
		//Add in automatic parent progress update when child task progress is updated, excluding milestones
		var parentTask = gantt.getTask(item.parent);
		var childs = gantt.getChildren(parentTask.id);
		var totProgress = 0;
		var tempTask;
		var childcount = childs.length //use to decrement count for milestones
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

	return true;
});

gantt.attachEvent("onAfterTaskUpdate", function (id, item) {
	
	if (item.$level > 0) {
		//Add in automatic parent progress update when child task progress is updated, excluding milestones
		var parentTask = gantt.getTask(item.parent);
		var childs = gantt.getChildren(parentTask.id);
		var totProgress = 0;
		var tempTask;
		var childcount = childs.length //use to decrement count for milestones
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

	return true;
});


gantt.attachEvent("onBeforeTaskDelete", function (id, item) {
	//Add in automatic parent progress update when child task is deleted
	if (item.$level > 0) {
		//Add in automatic parent progress update when child task progress is deleted, excluding milestones
		var parentTask = gantt.getTask(item.parent);
		var childs = gantt.getChildren(parentTask.id);
		var totProgress = 0;
		var tempTask;
		var childcount = childs.length //use to decrement count for milestones
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
	}
	return true;
});

/*
//fix end date in lightboxes duration area
 gantt.templates.task_date= function(date){
    var newend = new Date(date);    
    var dayOfMonth = newend.getDate();  
    newend.setDate(dayOfMonth - 1);  
    return gantt.date.date_to_str(gantt.config.task_date)(newend);
};

//fix end date in lightbox header to show one day more to counteract the changes in gantt.templates.task_date.

gantt.templates.task_time = function(start,end,task){
	//debugger;
		var newstart = new Date(start);
		var dayOfMonth = newstart.getDate();
		newstart.setDate(dayOfMonth + 1);
	if(task.type != 'milestone') {
		return gantt.templates.task_date(newstart)+" - "+gantt.templates.task_date(end);
	} else {
		return gantt.templates.task_date(newstart)+" - "+gantt.templates.task_date(newstart);
	}
};
*/

/* Turn off slider for projects */
gantt.templates.task_class = function (start, end, task) {
 if(task.type == 'project'){
      return "no_drag_progress"; 
   }
   return "";
}