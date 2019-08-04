var i18n = jQuery.extend({}, i18n || {}, { //edits from original by Jim Coltz 2011-12-09
    xgcalendar: {
        dateformat: {
            "fulldaykey": "MMddyyyy",
            "fulldayshow": "L d yyyy",
            "fulldayvalue": "M/d/yyyy",
            "Md": "W d/M",
            "Md3": "L d",
            "separator": "/",
            "year_index": 2,
            "month_index": 0,
            "day_index": 1,
            "day": "d",
            "sun": "Dim",
            "mon": "&#76;un", //need to use html code for uppercase "L" 
            "tue": "Mar",
            "wed": "Mer",
            "thu": "Jeu",
            "fri": "Ven",
            "sat": "Sam",
            "jan": "Jan",
            "feb": "Fev",
            "mar": "Mar",
            "apr": "Avr",
            "may": "Mai", 
            "jun": "Juin",
            "jul": "Juil",
            "aug": "Aou",
            "sep": "Sep",
            "oct": "Oct",
            "nov": "Nov",
            "dec": "Dec"
        },
		//need to fix up for accent characters. must use UTF-8 codes. See www.utf8-chartable.de
        "no_implemented": "Pas encore implemente",
        "to_date_view": "Cliquez pour visualiser la date actuelle",
        "i_undefined": "Indefini",
        "allday_event": "Toute la journ\ee",
        "repeat_event": "Repeter l'\u00C9v\u00E9nement",
        "time": "Temps",
        "event": "\u00C9v\u00E9nement", //need utf8 codes for acute, cicumflex, grave, etc. See www.utf8-chartable.de
        "location": "Emplacement",
        "participant": "Participant",
        "get_data_exception": "Exception lors de l'obtention de donnees",
        "new_event": "Nouvel \u00C9v\u00E9nement",
        "confirm_delete_event": "Confirmez-vous que vous voulez supprimer cet \u00C9v\u00E9nement? ",
        "confrim_delete_event_or_all": "Voulez-vous tous les \u00C9v\u00E9nements repetes ou seulement cet \u00C9v\u00E9nement? \ r \ nCliquez [OK] pour supprimer uniquement cet \u00C9v\u00E9nement, cliquez sur [Annuler] supprimer tous les \u00C9v\u00E9nements",
        "data_format_error": "Erreur de format de donnees! ",
        "invalid_title": "Titre de l'\u00C9v\u00E9nement ne peut pas etre vierge ou contenir ($ or jQuery<>)",
        "view_no_ready": "Voir n'est pas pret",
        "example": "Ex.: Reunion dans la chambre 107",
        "content": "Objet / \u00C9v\u00E9nement",
        "create_event": "Creer un \u00C9v\u00E9nement",
        "update_detail": "Modifier les d\u00E9tails",
        "click_to_detail": "Voir les details",
        "i_delete": "Effacer",
        "day_plural": "journees",
        "others": "D'autres",
        "item": "point",
		
		//additional items added JJC April 5, 2012
		//added for language support
        // below is for javascript on page
		"loadingpannel_loading": "Chargement des donnees ...", //loading panel text
        "loadingpannel_success": "Succ\u00E9s!", //loading panel text
        "loadingpannel_request":"La demande est en cours ...", // loading panel text
        "errorpannel": "Desole, n'a pas pu charger vos donnees, s'il vous plaît essayer à nouveau plus tard", // error panel text
        // below is for buttons on calendar
		"faddbtn": "Un Nouvel \u00C9v\u00E9nement", //add new event button text
        "faddbtn_title":"Cliquez ici pour creer un nouvel \u00C9v\u00E9nement", //add new event button title text.
        "showtodaybtn":"Aujourd'hui", //Today button text
        "showtodaybtn_title":"Cliquez ici pour revenir a aujourd'hui", //Today button title text
        "showdaybtn":"Jour", //Day View Button text
        "showdaybtn_title":"Vue quotidienne", //Day View Button title text
        "showweekbtn": "Semaine", //Week View Button text
        "showweekbtn_title": "Vue de la semaine", //Week View Button title text
        "showworkweekbtn":"Semaine de travail", //Work Week Button text
        "showworkweekbtn_title":"Semaine de travail de", //Work Week Button title text
        "showmonthbtn":"Mois", //Month Button text
        "showmonthbtn_title":"Voir le mois", //Month Button title text
        "showreflashbtn":"Rafra\u00EEchir", // Refresh Button text
		"showreflashbtn_title":"Cliquez ici pour rafra\u00EEchir les donn\u00E9es de calendrier.", // Refresh Button title text
        "sfprevbtn":"Precedent", // Previous button title
        "sfnextbtn":"Prochain", // Next button title
        "txtdatetimeshow":"Selectionnez Date", // Datepicker button intial value
        //below for other pop ups
		"alert_okbutton":"OK", //alert OK button text
        "alert_cancelbutton":"Annuler", //alert Cancel button text
        "alert_confim":"Etes-vous s\U00FBr de vouloir supprimer cet \u00C9v\u00E9nement?", //alert delete confirmation text
		"caption_edit":"Modifier les details", // caption for edit details window 
		"caption_new_event":"Ajouter un nouvel \u00C9v\u00E9nement", // caption for Add detailed event window 
		"caption_popup":"D\u00E9tails de l'\u00C9v\u00E9nement", // caption for popup used instead of alert()
		//below used for alert pop ups for read only events and when the hyperlink is clicked in the pop up bubble.
		"alert_start":"Commencer: ",
		"alert_end":"Fin: ",
		"alert_location":"Emplacement: ",
		"alert_attends":"Les participants ont: "
		
    }
});
