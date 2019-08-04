var i18n = jQuery.extend({}, i18n || {}, {
    xgcalendar: {
        dateformat: {
            "fulldaykey": "MMddyyyy",
            "fulldayshow": "L d yyyy",
            "fulldayvalue": "M/d/yyyy",
            "Md": "M/d (W)",
            "Md3": "L d",
            "separator": "/",
            "year_index": 2,
            "month_index": 0,
            "day_index": 1,
            "day": "d日",
            "sun": "週日",
            "mon": "週一",
            "tue": "週二",
            "wed": "週三",
            "thu": "週四",
            "fri": "週五",
            "sat": "週六",
            "jan": "一月",
            "feb": "二月",
            "mar": "三月",
            "apr": "四月",
            "may": "五月",
            "jun": "六月",
            "jul": "七月",
            "aug": "八月",
            "sep": "九月",
            "oct": "十月",
            "nov": "十一月",
            "dec": "十二月"
        },
        "no_implemented": "沒有實現",
        "to_date_view": "點擊轉到該日期的日視圖",
        "i_undefined": "未設置",
        "allday_event": "全天日程",
        "repeat_event": "跨天日程",
        "time": "時 間",
        "event": "事 件",
        "location": "地 點",
        "participant": "參與人",
        "get_data_exception": "獲取數據發生異常",
        "new_event": "新日程",
        "confirm_delete_event": "確定刪除該日程嗎？",
        "confrim_delete_event_or_all": "刪除此序列還是單個事件？\r\n點擊[確定]刪除事件,點擊[取消]刪除序列",
        "data_format_error": "數據格式錯誤！",
        "invalid_title": "日程標題不能為空且不能包含符號($<>)",
        "view_no_ready": "視圖未準備就緒",
        "example": "例如：有個辦公會議",
        "content": "內 容",
        "create_event": "創建日程",
        "update_detail": "修改日程詳細信息",
        "click_to_detail": "點擊查看詳細",
        "i_delete": "刪除",
        "day_plural": "天",
        "others": "另外",
        "item": "個",
		 //added for language support
        "loadingpannel_loading": "载入数据", //loading panel text
        "loadingpannel_success": "成功了！", //loading panel text
        "loadingpannel_request":"正在处理的请求", // loading panel text
        "errorpannel": "很抱歉，无法加载数据，请稍后再试", // error panel text
        "faddbtn": "新事件", //add new event button text
        "faddbtn_title":"点击创建新的事件", //add new event button title text.
        "showtodaybtn":"今日", //Today button text
        "showtodaybtn_title":"点击回到今天", //Today button title text
        "showdaybtn":"天", //Day View Button text
        "showdaybtn_title":"日视图", //Day View Button title text
        "showweekbtn": "周", //Week View Button text
        "showweekbtn_title": "周视图", //Week View Button title text
        "showworkweekbtn":"工作周", //Work Week Button text
        "showworkweekbtn_title":"工作周视图", //Work Week Button title text
        "showmonthbtn":"月", //Month Button text
        "showmonthbtn_title":"月视图", //Month Button title text
        "showreflashbtn":"刷新", // Refresh Button text
		"showreflashbtn_title":"点击刷新日历数据", // Refresh Button title text
        "sfprevbtn":"前", // Previous button title
        "sfnextbtn":"未来", // Next button title
        "txtdatetimeshow":"选择日期", // Datepicker button intial value
        "alert_okbutton":"确定", //alert OK button text
        "alert_cancelbutton":"取消", //alert Cancel button text
        "alert_confim":"你确定要删除此事件吗？", //alert delete confirmation text
		"caption_edit":"修改详情", // caption for edit details window 
		"caption_new_event":"新增事件", // caption for Add detailed event window 
		"caption_popup":"????", // caption for popup used instead of alert()
		//below used for alert pop ups for read only events and when the hyperlink is clicked in the pop up bubble.
		"alert_start":"开始",
		"alert_end":"结束",
		"alert_location":"位置",
		"alert_attends":"与会者" 		
    }
}); 