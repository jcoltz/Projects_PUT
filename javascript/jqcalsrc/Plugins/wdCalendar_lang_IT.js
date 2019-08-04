var i18n = jQuery.extend({}, i18n || {}, { //edits from original by Jim Coltz 2011-12-09
    xgcalendar: {
        dateformat: {
            "fulldaykey": "MMddyyyy",
            "fulldayshow": "L d yyyy",
            "fulldayvalue": "M/d/yyyy", //Don't change this or above unless you edit the Xbasic as well.
            "Md": "W d/M",   //"W d/M" for non US dates. This can be set to your choice. "W" = short day name "L" = short month name "d" = day number "M" = month number
            "Md3": "L d",
            "separator": "/",
            "year_index": 2,
            "month_index": 0,
            "day_index": 1,
            "day": "d",
            "sun": "Dom",
            "mon": "&#76;un", //need to use html code for uppercase "L" 
            "tue": "Mar",
            "wed": "Mer",
            "thu": "Gio",
            "fri": "Ven",
            "sat": "Sab",
            "jan": "Gen",
            "feb": "Feb",
            "mar": "Mar",
            "apr": "Apr",
            "may": "Mag",
            "jun": "Gui",
            "jul": "Lug",
            "aug": "Ago",
            "sep": "Set",
            "oct": "Ott",
            "nov": "Nov",
            "dec": "Dic"
        },
        "no_implemented": "Not implemented yet",
        "to_date_view": "Clicca per visualizzare la data corrente",
        "i_undefined": "Not Defined",
        "allday_event": "Tutto il giorno evento",
        "repeat_event": "Ripetere evento",
        "time": "Tempo",
        "event": "Evento",
        "location": "Posizione",
        "participant": "Partecipante",
        "get_data_exception": "Exception when getting data",
        "new_event": "Nuovo evento",
        "confirm_delete_event": "Lei conferma che volete cancellare questo evento? ",
        "confrim_delete_event_or_all": "Do you want to delete all repeat events or only this event? \r\nClick [OK] to delete only this event, click [Cancel] delete all events",
        "data_format_error": "Data format error! ",
        "invalid_title": "Titolo dell'evento non pu\u00F2 essere vuota o contenere ($ or jQuery<>)",
        "view_no_ready": "View is not ready",
        "example": "Esempio - Riunione in room 107",
        "content": "Oggetto/Evento",
        "create_event": "Creare evento",
        "update_detail": "Modifica dettagli",
        "click_to_detail": "Visualizza dettagli",
        "i_delete": "Cancellare",
        "day_plural": "Periodo",
        "others": "",
        "item": " Pi\u00F9 [Visualizza tutti]",
		//additional items added JJC April 5, 2012
		//added for language support
        // below is for javascript on page
        "loadingpannel_loading": "Caricamento dei dati ...", //loading panel text
        "loadingpannel_success": "Successo!", //loading panel text
        "loadingpannel_request":"La richiesta \u00E8in fase di elaborazione ...", // loading panel text
        "errorpannel": "Siamo spiacenti, non \u00E8 riuscito a caricare i vostri dati, riprova pi\u00F9 tardi", // error panel text
        // below is for buttons on calendar
        "faddbtn": "Un Nuovo Evento", //add new event button text
        "faddbtn_title":"Clicca per creare un nuovo evento", //add new event button title text.
        "showtodaybtn":"Oggi", //Today button text
        "showtodaybtn_title":"Clicca per tornare ad oggi", //Today button title text
        "showdaybtn":"Giorno", //Day View Button text
        "showdaybtn_title":"Vedi Giorno", //Day View Button title text
        "showweekbtn": "Settimana", //Week View Button text
        "showweekbtn_title": "Vista Settimana", //Week View Button title text
        "showworkweekbtn":"Settimana di lavoro", //Work Week Button text
        "showworkweekbtn_title":"Settimana lavorativa vista", //Work Week Button title text
        "showmonthbtn":"Mese", //Month Button text
        "showmonthbtn_title":"Mese vista", //Month Button title text
        "showreflashbtn":"Rinfrescare", // Refresh Button text
		"showreflashbtn_title":"Fare clic per aggiornare i dati del calendario.", // Refresh Button title text
        "sfprevbtn":"Precedente", // Previous button title
        "sfnextbtn":"Prossimo", // Next button title
        "txtdatetimeshow":"Selezionare Data", // Datepicker button intial value
        "alert_okbutton":"OK", //alert OK button text
        "alert_cancelbutton":"Annullare", //alert Cancel button text
        "alert_confim":"Sei sicuro di voler cancellare questo evento?", //alert delete confirmation text
		"caption_edit":"Modificare i dettagli", // caption for edit details window 
		"caption_new_event":"Aggiungi un nuovo evento", // caption for Add detailed event window
		"caption_popup":"Dettagli evento", // caption for popup used instead of alert() 
		//below used for alert pop ups for read only events and when the hyperlink is clicked in the pop up bubble.
		"alert_start":"Inizio",
		"alert_end":"Fine",
		"alert_location":"Posizione",
		"alert_attends":"I partecipanti" 

    }
});
