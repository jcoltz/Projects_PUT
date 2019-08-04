var i18n = jQuery.extend({}, i18n || {}, { //edits from original by Jim Coltz 2011-12-09
    xgcalendar: {
        dateformat: {
            "fulldaykey": "MMddyyyy",
            "fulldayshow": "L d yyyy",
            "fulldayvalue": "M/d/yyyy", //Don't change this or above unless you edit the Xbasic as well.
            "Md": "W M/d",   //"W d/M" for non US dates. This can be set to your choice. "W" = short day name "L" = short month name "d" = day number "M" = month number
            "Md3": "L d",
            "separator": "/",
            "year_index": 2,
            "month_index": 0,
            "day_index": 1,
            "day": "d",
            "sun": "Sun",
            "mon": "Mon",
            "tue": "Tue",
            "wed": "Wed",
            "thu": "Thu",
            "fri": "Fri",
            "sat": "Sat",
            "jan": "Jan",
            "feb": "Feb",
            "mar": "Mar",
            "apr": "Apr",
            "may": "May",
            "jun": "Jun",
            "jul": "Jul",
            "aug": "Aug",
            "sep": "Sep",
            "oct": "Oct",
            "nov": "Nov",
            "dec": "Dec"
        },
        "no_implemented": "Not implemented yet",
        "to_date_view": "Click to view the current date",
        "i_undefined": "Not Defined",
        "allday_event": "All Day Event",
        "repeat_event": "Repeat Event",
        "time": "Time",
        "event": "Event",
        "location": "Location",
        "participant": "Participants",
        "get_data_exception": "Exception when getting data",
        "new_event": "New event",
        "confirm_delete_event": "Do you confirm you want to delete this event? ",
        "confrim_delete_event_or_all": "Do you want to delete all repeat events or only this event? \r\nClick [OK] to delete only this event, click [Cancel] delete all events",
        "data_format_error": "Data format error! ",
        "invalid_title": "Event title can not be blank or contain ($ or jQuery<>)",
        "view_no_ready": "View is not ready",
        "example": "e.g., Meeting in room 107",
        "content": "Subject/Event",
        "create_event": "Create Event",
        "update_detail": "Edit Details",
        "click_to_detail": "View Details",
        "i_delete": "Delete",
        "day_plural": "days",
        "others": "",
        "item": " More[View All]",
		
		 //added for language support
        "loadingpannel_loading": "Loading data...", //loading panel text
        "loadingpannel_success": "Success!", //loading panel text
        "loadingpannel_request":"The request is being processed ...", // loading panel text
        "errorpannel": "Sorry, could not load your data, please try again later", // error panel text
        "faddbtn": "New Event", //add new event button text
        "faddbtn_title":"Click to Create New Event", //add new event button title text.
        "showtodaybtn":"Today", //Today button text
        "showtodaybtn_title":"Click to go back to today", //Today button title text
        "showdaybtn":"Day", //Day View Button text
        "showdaybtn_title":"Day View", //Day View Button title text
        "showweekbtn": "Week", //Week View Button text
        "showweekbtn_title": "Week View", //Week View Button title text
        "showworkweekbtn":"Work-Week", //Work Week Button text
        "showworkweekbtn_title":"Work-Week View", //Work Week Button title text
        "showmonthbtn":"Month", //Month Button text
        "showmonthbtn_title":"Month View", //Month Button title text
        "showreflashbtn":"Refresh", // Refresh Button text
		"showreflashbtn_title":"Click to refresh calendar data.", // Refresh Button title text
        "sfprevbtn":"Prev", // Previous button title
        "sfnextbtn":"Next", // Next button title
        "txtdatetimeshow":"Select Date", // Datepicker button intial value
        "alert_okbutton":"OK", //alert OK button text
        "alert_cancelbutton":"Cancel", //alert Cancel button text
        "alert_confim":"Are You Sure you want to delete this event?", //alert delete confirmation text
		"caption_edit":"Modify Details", // caption for edit details window 
		"caption_new_event":"Add New Event", // caption for Add detailed event window
		"caption_popup":"Event Details", // caption for popup used instead of alert()
		//below used for alert pop ups for read only events and when the hyperlink is clicked in the pop up bubble.
		"alert_start":"Start",
		"alert_end":"End",
		"alert_location":"Location",
		"alert_attends":"Participants" 
	}
});
