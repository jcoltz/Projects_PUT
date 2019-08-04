/*
 
 * Modified version for Touchdry - removing Title from event hover and adding in attendees and location to event dispaly. Jim Coltz, Alpha Custom Database Solutions, LLC May 31, 2019
 
 * @description {Class} A5 JQCalendar
 * @version  4.53
 * This is the main minified js file of all the libraries used in the calendar .
 * Copyright 2013 Jim Coltz
 * includes jquery.calenadar.js, jquery.datepicker.js,jquery.ifrmdailog.js,common.js
 * Includes
 * // moment.js
 * // version : 2.0.0
 * // author : Tim Wood
 * // license : MIT
 * // momentjs.com
 * Includes
 * // name jsTimezoneDetect
 * // version 1.0.4
 * //@author Jon Nylander
 * // This script gives you the zone info key representing your device's time zone setting.
 * //@license MIT License - http://www.opensource.org/licenses/mit-license.php
 * //For usage and examples, visit:
 * //http://pellepim.bitbucket.org/jstz/
 * //Copyright (c) Jon Nylander

 */
;
(function (jQuery) {
	var __WDAY = [i18n.xgcalendar.dateformat.sun, i18n.xgcalendar.dateformat.mon, i18n.xgcalendar.dateformat.tue, i18n.xgcalendar.dateformat.wed, i18n.xgcalendar.dateformat.thu, i18n.xgcalendar.dateformat.fri, i18n.xgcalendar.dateformat.sat];
	var __MonthName = [i18n.xgcalendar.dateformat.jan, i18n.xgcalendar.dateformat.feb, i18n.xgcalendar.dateformat.mar, i18n.xgcalendar.dateformat.apr, i18n.xgcalendar.dateformat.may, i18n.xgcalendar.dateformat.jun, i18n.xgcalendar.dateformat.jul, i18n.xgcalendar.dateformat.aug, i18n.xgcalendar.dateformat.sep, i18n.xgcalendar.dateformat.oct, i18n.xgcalendar.dateformat.nov, i18n.xgcalendar.dateformat.dec];
	if (!Clone || typeof(Clone) != "function") {
		var Clone = function (obj) {
			var objClone = {};
			if (obj.constructor == Object) {
				objClone = new obj.constructor();
			} else {
				objClone = new obj.constructor(obj.valueOf());
			}
			for (var key in obj) {
				if (objClone[key] != obj[key]) {
					if (typeof(obj[key]) == 'object') {
						objClone[key] = Clone(obj[key]);
					} else {
						objClone[key] = obj[key];
					}
				}
			}
			objClone.toString = obj.toString;
			objClone.valueOf = obj.valueOf;
			return objClone;
		};
	}
	if (!dateFormat || typeof(dateFormat) != "function") {
		var dateFormat = function (format) {
			var o = {
				"M+": this.getMonth() + 1,
				"d+": this.getDate(),
				"h+": this.getHours(),
				"H+": this.getHours(),
				"m+": this.getMinutes(),
				"s+": this.getSeconds(),
				"q+": Math.floor((this.getMonth() + 3) / 3),
				"w": "0123456".indexOf(this.getDay()),
				"W": __WDAY[this.getDay()],
				"L": __MonthName[this.getMonth()]
			};
			if (/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
			for (var k in o) {
				if (new RegExp("(" + k + ")").test(format))
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
			return format;
		};
	}
	if (!DateAdd || typeof(DateDiff) != "function") {
		var DateAdd = function (interval, number, idate) {
			number = parseInt(number, 10);
			var date;
			if (typeof(idate) == "string") {
				date = idate.split(/\D/);
				eval("var date = new Date(" + date.join(",") + ")");
			}
			if (typeof(idate) == "object") {
				date = new Date(idate.toString());
			}
			switch (interval) {
			case "y":
				date.setFullYear(date.getFullYear() + number);
				break;
			case "m":
				date.setMonth(date.getMonth() + number);
				break;
			case "d":
				date.setDate(date.getDate() + number);
				break;
			case "w":
				date.setDate(date.getDate() + 7 * number);
				break;
			case "h":
				date.setHours(date.getHours() + number);
				break;
			case "n":
				date.setMinutes(date.getMinutes() + number);
				break;
			case "s":
				date.setSeconds(date.getSeconds() + number);
				break;
			case "l":
				date.setMilliseconds(date.getMilliseconds() + number);
				break;
			}
			return date;
		};
	}
	if (!DateDiff || typeof(DateDiff) != "function") {
		var DateDiff = function (interval, d1, d2) {
			switch (interval) {
			case "d":
			case "w":
				d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
				d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
				break;
			case "h":
				d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours());
				d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours());
				break;
			case "n":
				d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes());
				d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes());
				break;
			case "s":
				d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes(), d1.getSeconds());
				d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes(), d2.getSeconds());
				break;
			}
			var t1 = d1.getTime(),
			t2 = d2.getTime();
			var diff = NaN;
			switch (interval) {
			case "y":
				diff = d2.getFullYear() - d1.getFullYear();
				break;
			case "m":
				diff = (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth();
				break;
			case "d":
				diff = Math.floor(t2 / 86400000) - Math.floor(t1 / 86400000);
				break;
			case "w":
				diff = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t1 + 345600000) / (604800000));
				break;
			case "h":
				diff = Math.floor(t2 / 3600000) - Math.floor(t1 / 3600000);
				break;
			case "n":
				diff = Math.floor(t2 / 60000) - Math.floor(t1 / 60000);
				break;
			case "s":
				diff = Math.floor(t2 / 1000) - Math.floor(t1 / 1000);
				break;
			case "l":
				diff = t2 - t1;
				break;
			}
			return diff;
		};
	}
	if (jQuery.fn.noSelect === undefined) {
		jQuery.fn.noSelect = function (p) {
			if (p === null)
				prevent = true;
			else
				prevent = p;
			if (prevent) {
				return this.each(function () {
					if (jQuery.browser.msie || jQuery.browser.safari)
						jQuery(this).bind('selectstart', function () {
							return false;
						});
					else if (jQuery.browser.mozilla) {
						jQuery(this).css('MozUserSelect', 'none');
						jQuery('body').trigger('focus');
					} else if (jQuery.browser.opera)
						jQuery(this).bind('mousedown', function () {
							return false;
						});
					else
						jQuery(this).attr('unselectable', 'on');
				});
			} else {
				return this.each(function () {
					if (jQuery.browser.msie || jQuery.browser.safari)
						jQuery(this).unbind('selectstart');
					else if (jQuery.browser.mozilla)
						jQuery(this).css('MozUserSelect', 'inherit');
					else if (jQuery.browser.opera)
						jQuery(this).unbind('mousedown');
					else
						jQuery(this).removeAttr('unselectable', 'on');
				});
			}
		};
	}
	jQuery.fn.bcalendar = function (option) {
		var def = {
			view: "Month",
			weekstartday: 1,
			theme: 0,
			height: false,
			url: "",
			eventItems: [],
			method: "POST",
			showday: new Date(),
			onBeforeRequestData: false,
			onAfterRequestData: false,
			onRequestDataError: false,
			onWeekOrMonthToDay: false,
			quickAddHandler: false,
			quickAddUrl: "",
			quickUpdateUrl: "",
			quickDeleteUrl: "",
			autoload: false,
			readonly: false,
			extParam: [],
			enableDrag: true,
			slotHeight: 42,
			StartHour: 0,
			EndHour: 24,
			PopUpBubble: true,
			PopUpEditBubble: true,
			TimeSlotMinutes: 15,
			OneClickFactor: 1,
			TwelveHourFormat: true,
			Drag_Recurring: true,
			GroupName: [],
			showallday: true,
			showDescription: true,
			scrollDescription: false,
			ResouceNameTitle: "",
			DaysToshow: 7,
			LocalTimeZone: "",
			loadDateR: []
		};
		var eventDiv = jQuery("#gridEvent");
		if (eventDiv.length === 0) {
			eventDiv = jQuery("<div id='gridEvent' style='display:none;'></div>").appendTo(document.body);
		}
		var gridcontainer = jQuery(this);
		option = jQuery.extend(def, option);
		var cal_day_week_cell_spacing = option.slotHeight < 24 ? 24 : option.slotHeight;
		var cal_main_grid_height = (cal_day_week_cell_spacing * 24);
		if (option.StartHour === null || option.EndHour === null) {
			option.StartHour = 0;
			option.EndHour = 24;
		}
		if (option.quickUpdateUrl === null || option.quickUpdateUrl === "") {
			option.enableDrag = false;
		}
		var __SCOLLEVENTTEMP = "<DIV style=\"WIDTH:jQuery{width};top:jQuery{top};left:jQuery{left};\" title=\"jQuery{title}\" class=\"chip chipjQuery{i} jQuery{drag}\"><div class=\"dhdV\" style=\"display:none\">jQuery{data}</div><DIV style=\"BORDER-BOTTOM-COLOR:jQuery{bdcolor}\" class=ct>&nbsp;</DIV><DL style=\"BORDER-BOTTOM-COLOR:jQuery{bdcolor}; BACKGROUND-COLOR:jQuery{bgcolor1}; BORDER-TOP-COLOR: jQuery{bdcolor}; HEIGHT: jQuery{height}px; BORDER-RIGHT-COLOR:jQuery{bdcolor}; BORDER-LEFT-COLOR:jQuery{bdcolor}\"><DT style=\"BACKGROUND-COLOR:jQuery{bgcolor2}\">jQuery{starttime} - jQuery{endtime} jQuery{icon}</DT><DD><SPAN>jQuery{content}</SPAN></DD><DIV class='resizer' style='display:jQuery{redisplay}'><DIV class=rszr_icon>&nbsp;</DIV></DIV></DL><DIV style=\"BORDER-BOTTOM-COLOR:jQuery{bdcolor}; BACKGROUND-COLOR:jQuery{bgcolor1}; BORDER-TOP-COLOR: jQuery{bdcolor}; BORDER-RIGHT-COLOR: jQuery{bdcolor}; BORDER-LEFT-COLOR:jQuery{bdcolor}\" class=cb1>&nbsp;</DIV><DIV style=\"BORDER-BOTTOM-COLOR:jQuery{bdcolor}; BORDER-TOP-COLOR:jQuery{bdcolor}; BORDER-RIGHT-COLOR:jQuery{bdcolor}; BORDER-LEFT-COLOR:jQuery{bdcolor}\" class=cb2>&nbsp;</DIV></DIV>";
		var __ALLDAYEVENTTEMP = '<div class="rb-o jQuery{eclass}" id="jQuery{id}" title="jQuery{title}" style="color:jQuery{color};"><div class="dhdV" style="display:none">jQuery{data}</div><div class="jQuery{extendClass} rb-m" style="background-color:jQuery{color}">jQuery{extendHTML}<div class="rb-i">jQuery{content}</div></div></div>';
		var __MonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var __LASSOTEMP = "<div class='drag-lasso' style='left:jQuery{left}px;top:jQuery{top}px;width:jQuery{width}px;height:jQuery{height}px;'>&nbsp;</div>";
		var _dragdata;
		var _dragevent;
		clearcontainer();
		if (!option.height) {
			option.height = document.documentElement.clientHeight;
		}
		gridcontainer.css("overflow-y", "visible").height(option.height - 8);
		if (option.url && option.autoload) {
			populate();
		} else {
			render();
			var d = getRdate();
			pushER(d.start, d.end);
		}
		function clearcontainer() {
			gridcontainer.empty();
		}
		function getRdate() {
			return {
				start: option.vstart,
				end: option.vend
			};
		}
		function pushER(start, end) {
			var ll = option.loadDateR.length;
			if (!end) {
				end = start;
			}
			if (ll === 0) {
				option.loadDateR.push({
					startdate: start,
					enddate: end
				});
			} else {
				for (var i = 0; i < ll; i++) {
					var dr = option.loadDateR[i];
					var diff = DateDiff("d", start, dr.startdate);
					if (diff === 0 || diff === 1) {
						if (dr.enddate < end) {
							dr.enddate = end;
						}
						break;
					} else if (diff > 1) {
						var d2 = DateDiff("d", end, dr.startdate);
						if (d2 > 1) {
							option.loadDateR.splice(0, 0, {
								startdate: start,
								enddate: end
							});
						} else {
							dr.startdate = start;
							if (dr.enddate < end) {
								dr.enddate = end;
							}
						}
						break;
					} else {
						var d3 = DateDiff("d", end, dr.startdate);
						if (dr.enddate < end) {
							if (d3 < 1) {
								dr.enddate = end;
								break;
							} else {
								if (i == ll - 1) {
									option.loadDateR.push({
										startdate: start,
										enddate: end
									});
								}
							}
						}
					}
				}
				ll = option.loadDateR.length;
				if (ll > 1) {
					for (var i = 0; i < ll - 1; ) {
						var d1 = option.loadDateR[i];
						var d2 = option.loadDateR[i + 1];
						var diff1 = DateDiff("d", d2.startdate, d1.enddate);
						if (diff1 <= 1) {
							d1.startdate = d2.startdate > d1.startdate ? d1.startdate : d2.startdate;
							d1.enddate = d2.enddate > d1.enddate ? d2.enddate : d1.enddate;
							option.loadDateR.splice(i + 1, 1);
							ll--;
							continue;
						}
						i++;
					}
				}
			}
		}
		function render() {
			var showday = new Date(option.showday.getFullYear(), option.showday.getMonth(), option.showday.getDate());
			var events = option.eventItems;
			var config = {
				view: option.view,
				weekstartday: option.weekstartday,
				theme: option.theme
			};
			if (option.view == "day" || option.view == "week" || option.view == "workweek" || option.view == "schedule" || option.view == "custom") {
				var jQuerydvtec = jQuery("#dvtec");
				if (jQuerydvtec.length > 0) {
					option.scoll = jQuerydvtec.attr("scrollTop");
				}
			}
			switch (option.view) {
			case "day":
				BuildDaysAndWeekView(showday, 1, events, config);
				break;
			case "week":
				BuildDaysAndWeekView(showday, 7, events, config);
				break;
			case "workweek":
				config.weekstartday = 1;
				config.view = "workweek";
				option.view = "workweek";
				BuildDaysAndWeekView(showday, 5, events, config);
				break;
			case "month":
				BuildMonthView(showday, events, config);
				break;
			case "schedule":
				BuildScheduleView(showday, option.GroupName.length, events, config);
				break;
			case "custom":
				BuildDaysAndWeekView(showday, option.DaysToShow, events, config);
				break;
			default:
				alert(i18n.xgcalendar.no_implement);
				break;
			}
			initevents(option.view);
			ResizeView();
		}
		function BuildDaysAndWeekView(startday, l, events, config) {
			var days = [];
			if (l == 1) {
				var show = dateFormat.call(startday, i18n.xgcalendar.dateformat.Md);
				days.push({
					display: show,
					date: startday,
					day: startday.getDate(),
					year: startday.getFullYear(),
					month: startday.getMonth() + 1
				});
				option.datestrshow = CalDateShow(days[0].date);
				option.vstart = days[0].date;
				option.vend = days[0].date;
			} else {
				var w = 0;
				if (option.view != "custom") {
					if (l > 1 && l <= 7) {
						w = config.weekstartday - startday.getDay();
						if (w > 0)
							w = w - 7;
					}
				}
				var ndate;
				for (var i = w, j = 0; j < l; i = i + 1, j++) {
					ndate = DateAdd("d", i, startday);
					var show = dateFormat.call(ndate, i18n.xgcalendar.dateformat.Md);
					days.push({
						display: show,
						date: ndate,
						day: ndate.getDate(),
						year: ndate.getFullYear(),
						month: ndate.getMonth() + 1
					});
				}
				option.vstart = days[0].date;
				option.vend = days[l - 1].date;
				option.datestrshow = CalDateShow(days[0].date, days[l - 1].date);
			}
			var allDayEvents = [];
			var scollDayEvents = [];
			var dM = PropareEvents(days, events, allDayEvents, scollDayEvents);
			var html = [];
			html.push("<div id=\"dvwkcontaienr\" class=\"wktopcontainer\">");
			html.push("<table class=\"wk-top\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">");
			BuildWT(html, days, allDayEvents, dM);
			html.push("</table>");
			html.push("</div>");
			html.push("<div id=\"dvtec\"  class=\"scolltimeevent\"><table style=\"table-layout: fixed;", jQuery.browser.msie ? "" : "width:100%", "\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td>");
			html.push("<table style=\"height:" + cal_day_week_cell_spacing + "px\" id=\"tgTable\" class=\"tg-timedevents\" cellspacing=\"0\" cellpadding=\"0\"><tbody>");
			BuildDayScollEventContainer(html, days, scollDayEvents);
			html.push("</tbody></table></td></tr></tbody></table></div>");
			gridcontainer.html(html.join(""));
			html = null;
		}
		function BuildScheduleView(startday, l, events, config) {
			l = option.GroupName.length;
			var days = [];
			if (l == 1) {
				var show = option.GroupName[0];
				days.push({
					display: show,
					date: startday,
					day: startday.getDate(),
					year: startday.getFullYear(),
					month: startday.getMonth() + 1
				});
				option.datestrshow = CalDateShow(days[0].date);
				option.vstart = days[0].date;
				option.vend = days[0].date;
			} else {
				var w = 0;
				var ndate;
				for (var i = w, j = 0; j < l; i = i + 1, j++) {
					ndate = startday;
					var show = option.GroupName[j];
					days.push({
						display: show,
						date: ndate,
						day: ndate.getDate(),
						year: ndate.getFullYear(),
						month: ndate.getMonth() + 1
					});
				}
				option.vstart = days[0].date;
				option.vend = days[0].date;
				option.datestrshow = CalDateShow(days[0].date);
			}
			var allDayEvents = [];
			var scollDayEvents = [];
			var dM = PropareEvents(days, events, allDayEvents, scollDayEvents);
			var html = [];
			html.push("<div id=\"dvwkcontaienr\" class=\"wktopcontainer\">");
			html.push("<table class=\"wk-top\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">");
			BuildWT(html, days, allDayEvents, dM);
			html.push("</table>");
			html.push("</div>");
			html.push("<div id=\"dvtec\"  class=\"scolltimeevent\"><table style=\"table-layout: fixed;", jQuery.browser.msie ? "" : "width:100%", "\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td>");
			html.push("<table style=\"height:" + cal_day_week_cell_spacing + "px\" id=\"tgTable\" class=\"tg-timedevents\" cellspacing=\"0\" cellpadding=\"0\"><tbody>");
			BuildDayScollEventContainer(html, days, scollDayEvents);
			html.push("</tbody></table></td></tr></tbody></table></div>");
			gridcontainer.html(html.join(""));
			html = null;
		}
		function BuildMonthView(showday, events, config) {
			var cc = "<div id='cal-month-cc' class='cc'><div id='cal-month-cc-header'><div class='cc-close' id='cal-month-closebtn'></div><div id='cal-month-cc-title' class='cc-title'></div></div><div id='cal-month-cc-body' class='cc-body'><div id='cal-month-cc-content' class='st-contents'><table class='st-grid' cellSpacing='0' cellPadding='0'><tbody></tbody></table></div></div></div>";
			var html = [];
			html.push(cc);
			html.push("<div id=\"mvcontainer\" class=\"mv-container\">");
			html.push("<table id=\"mvweek\" class=\"mv-daynames-table\" cellSpacing=\"0\" cellPadding=\"0\"><tbody><tr>");
			for (var i = config.weekstartday, j = 0; j < 7; i++, j++) {
				if (i > 6)
					i = 0;
				var p = {
					dayname: __WDAY[i]
				};
				html.push("<th class=\"mv-dayname\" title=\"", __WDAY[i], "\">", __WDAY[i], "");
			}
			html.push("</tr></tbody></table>");
			html.push("</div>");
			var bH = GetMonthViewBodyHeight() - GetMonthViewHeaderHeight();
			html.push("<div id=\"mvEventContainer\" class=\"mv-event-container\" style=\"height:", bH, "px;", "\">");
			BuilderMonthBody(html, showday, config.weekstartday, events, bH);
			html.push("</div>");
			gridcontainer.html(html.join(""));
			html = null;
			jQuery("#cal-month-closebtn").click(closeCc);
		}
		function closeCc() {
			jQuery("#cal-month-cc").css("visibility", "hidden");
		}
		function PropareEvents(dayarrs, events, aDE, sDE) {
			var l = dayarrs.length;
			var el = events.length;
			var fE = [];
			var deB = aDE;
			var deA = sDE;
			for (var j = 0; j < el; j++) {
				var sD = events[j][2];
				var eD = events[j][3];
				var s = {};
				s.event = events[j];
				s.day = sD.getDate();
				s.year = sD.getFullYear();
				s.month = sD.getMonth() + 1;
				s.allday = events[j][4] == 1;
				s.crossday = events[j][5] == 1;
				s.reevent = events[j][6] == 1;
				s.daystr = [s.year, s.month, s.day].join("/");
				s.st = {};
				s.st.hour = sD.getHours();
				s.st.minute = sD.getMinutes();
				s.st.p = s.st.hour * 60 + s.st.minute;
				s.et = {};
				s.et.hour = eD.getHours();
				s.et.minute = eD.getMinutes();
				s.et.p = s.et.hour * 60 + s.et.minute;
				fE.push(s);
			}
			var dMax = 0;
			for (var i = 0; i < l; i++) {
				var da = dayarrs[i];
				deA[i] = [];
				deB[i] = [];
				da.daystr = da.year + "/" + da.month + "/" + da.day;
				for (var j = 0; j < fE.length; j++) {
					if (!fE[j].crossday && !fE[j].allday) {
						if (option.view != "schedule") {
							if (da.daystr == fE[j].daystr) {
								deA[i].push(fE[j]);
							}
						} else {
							if (typeof fE[j].event[13] != "undefined") {
								if (da.daystr == fE[j].daystr && removeHTMLTags(fE[j].event[13].toLowerCase()) == removeHTMLTags(dayarrs[i].display.toLowerCase())) {
									deA[i].push(fE[j]);
								}
							}
						}
					} else {
						if (option.view != "schedule") {
							if (da.daystr == fE[j].daystr) {
								deB[i].push(fE[j]);
								dMax++;
							} else {
								if (i === 0 && da.date >= fE[j].event[2] && da.date <= fE[j].event[3]) {
									deB[i].push(fE[j]);
									dMax++;
								}
							}
						} else {
							if (typeof fE[j].event[13] != "undefined") {
								if (da.daystr == fE[j].daystr && removeHTMLTags(fE[j].event[13].toLowerCase()) == removeHTMLTags(dayarrs[i].display.toLowerCase())) {
									deB[i].push(fE[j]);
									dMax++;
								} else {
									if (da.date >= fE[j].event[2] && da.date <= fE[j].event[3] && removeHTMLTags(fE[j].event[13].toLowerCase()) == removeHTMLTags(dayarrs[i].display.toLowerCase())) {
										deB[i].push(fE[j]);
										dMax++;
									}
								}
							}
						}
					}
				}
			}
			var lrdate = dayarrs[l - 1].date;
			for (var i = 0; i < l; i++) {
				var de = deB[i];
				if (de.length > 0) {
					for (var j = 0; j < de.length; j++) {
						var end = DateDiff("d", lrdate, de[j].event[3]) > 0 ? lrdate : de[j].event[3];
						de[j].colSpan = DateDiff("d", dayarrs[i].date, end) + 1;
					}
				}
				de = null;
			}
			for (var i = 0; i < l; i++) {
				var de = deA[i];
				if (de.length > 0) {
					var x = [];
					var y = [];
					var D = [];
					var dl = de.length;
					var Ia;
					for (var j = 0; j < dl; ++j) {
						var ge = de[j];
						for (var La = ge.st.p, Ia = 0; y[Ia] > La; )
							Ia++;
						ge.PO = Ia;
						ge.ne = [];
						y[Ia] = ge.et.p || 1440;
						x[Ia] = ge;
						if (!D[Ia]) {
							D[Ia] = [];
						}
						D[Ia].push(ge);
						if (Ia !== 0) {
							ge.pe = [x[Ia - 1]];
							x[Ia - 1].ne.push(ge);
						}
						for (Ia = Ia + 1; y[Ia] <= La; )
							Ia++;
						if (x[Ia]) {
							var k = x[Ia];
							ge.ne.push(k);
							k.pe.push(ge);
						}
						ge.width = 1 / (ge.PO + 1);
						ge.left = 1 - ge.width;
					}
					var k = Array.prototype.concat.apply([], D);
					x = y = D = null;
					var t = k.length;
					for (var y = t; y--; ) {
						var H = 1;
						var La = 0;
						var x = k[y];
						for (var D = x.ne.length; D--; ) {
							var Ia = x.ne[D];
							La = Math.max(La, Ia.VL);
							H = Math.min(H, Ia.left);
						}
						x.VL = La + 1;
						x.width = H / (x.PO + 1);
						x.left = H - x.width;
					}
					for (var y = 0; y < t; y++) {
						var x = k[y];
						x.left = 0;
						if (x.pe)
							for (var D = x.pe.length; D--; ) {
								var H = x.pe[D];
								x.left = Math.max(x.left, H.left + H.width);
							}
						var p = (1 - x.left) / x.VL;
						x.width = Math.max(x.width, p);
						x.aQ = Math.min(1 - x.left, x.width + 0.7 * p);
					}
					de = null;
					deA[i] = k;
				}
			}
			return dMax;
		}
		function BuildWT(ht, dayarrs, events, dMax) {
			ht.push("<tr>", "<th width=\"60\" rowspan=\"3\">&nbsp;</th>");
			for (var i = 0; i < dayarrs.length; i++) {
				var ev,
				title,
				cl;
				if (option.view == "schedule") {
					ev = "";
					title = removeHTMLTags(dayarrs[i].display);
					cl = "";
				} else if (dayarrs.length == 1) {
					ev = "";
					title = "";
					cl = "";
				} else {
					ev = "";
					title = i18n.xgcalendar.to_date_view;
					cl = "wk-daylink";
				}
				if (option.view == "schedule") {
					ht.push("<th abbr='", dateFormat.call(dayarrs[0].date, i18n.xgcalendar.dateformat.fulldayvalue), "' class='gcweekname' scope=\"col\"><div title='", title, "' ", ev, " class='wk-resourcename'><span >", dateFormat.call(dayarrs[0].date, i18n.xgcalendar.dateformat.Md), "</span><br><span id ='sch_tgCol", i, "' class='", cl, "'>", dayarrs[i].display, "</span></div></th>");
				} else {
					ht.push("<th abbr='", dateFormat.call(dayarrs[i].date, i18n.xgcalendar.dateformat.fulldayvalue), "' class='gcweekname' scope=\"col\"><div title='", title, "' ", ev, " class='wk-dayname'><span class='", cl, "'>", dayarrs[i].display, "</span></div></th>");
				}
			}
			ht.push("<th width=\"16\" rowspan=\"3\">&nbsp;</th>");
			ht.push("</tr>");
			if (option.showallday !== false) {
				ht.push("<tr>");
				ht.push("<td class=\"wk-allday\"");
				if (dayarrs.length > 1) {
					ht.push(" colSpan='", dayarrs.length, "'");
				}
				ht.push("><div id=\"weekViewAllDaywk\" ><table class=\"st-grid\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
				if (dMax === 0) {
					ht.push("<tr>");
					for (var i = 0; i < dayarrs.length; i++) {
						ht.push("<td class=\"st-c st-s\"", " ch='qkadd' abbr='", dateFormat.call(dayarrs[i].date, "yyyy-M-d"), "' axis='00:00'>&nbsp;</td>");
					}
					ht.push("</tr>");
				} else {
					var l = events.length;
					var el = 0;
					var x = [];
					for (var j = 0; j < l; j++) {
						x.push(0);
					}
					for (var j = 0; el < dMax; j++) {
						ht.push("<tr>");
						for (var h = 0; h < l; ) {
							var e = events[h][x[h]];
							ht.push("<td class='st-c");
							if (e) {
								x[h] = x[h] + 1;
								ht.push("'");
								var t = "";
								var t = BuildMonthDayEvent(e, dayarrs[h].date, l - h);
								if (e.colSpan > 1) {
									ht.push(" colSpan='", e.colSpan, "'");
									h += e.colSpan;
								} else {
									h++;
								}
								ht.push(" ch='show'>", t);
								t = null;
								el++;
							} else {
								ht.push(" st-s' ch='qkadd' abbr='", dateFormat.call(dayarrs[h].date, i18n.xgcalendar.dateformat.fulldayvalue), "' axis='00:00'>&nbsp;");
								h++;
							}
							ht.push("</td>");
						}
						ht.push("</tr>");
					}
					ht.push("<tr>");
					for (var h = 0; h < l; h++) {
						ht.push("<td class='st-c st-s' ch='qkadd' abbr='", dateFormat.call(dayarrs[h].date, i18n.xgcalendar.dateformat.fulldayvalue), "' axis='00:00'>&nbsp;</td>");
					}
					ht.push("</tr>");
				}
			}
			ht.push("</tbody></table></div></td></tr>");
			ht.push("<tr>");
			ht.push("<td style=\"height: 5px;\"");
			if (dayarrs.length > 1) {
				ht.push(" colSpan='", dayarrs.length, "'");
			}
			ht.push("></td>");
			ht.push("</tr>");
		}
		function BuildDayScollEventContainer(ht, dayarrs, events) {
			ht.push("<tr>");
			ht.push("<td style='width:60px;'></td>");
			ht.push("<td");
			if (dayarrs.length > 1) {
				ht.push(" colSpan='", dayarrs.length, "'");
			}
			ht.push("><div id=\"tgspanningwrapper\" class=\"tg-spanningwrapper\"><div style=\"font-size: 20px\" class=\"tg-hourmarkers\">");
			for (var i = option.StartHour; i < option.EndHour; i++) {
				ht.push("<div style =\"size:" + cal_day_week_cell_spacing + "px;border-top:1px solid #ddd;height:" + (cal_day_week_cell_spacing - 2) / 2 + "px;font-size:1px;border-bottom:1px dotted #ddd;margin-bottom:" + (cal_day_week_cell_spacing - 2) / 2 + "px;\" ></div>");
			}
			ht.push("</div></div></td></tr>");
			ht.push("<tr>");
			ht.push("<td style=\"width: 60px\" class=\"tg-times\">");
			var now = new Date();
			var h = now.getHours();
			var m = now.getMinutes();
			if (h >= option.EndHour) {
				h = 0;
				m = 0;
			}
			var mHg = gP(h, m) - 4;
			ht.push("<div id=\"tgnowptr\" class=\"tg-nowptr\" style=\"left:0px;top:", mHg, "px\"></div>");
			var tmt = "";
			for (var i = option.StartHour; i < option.EndHour; i++) {
				if (option.TwelveHourFormat === true) {
					tmt = fomartTimeShowx(i);
				} else {
					tmt = fomartTimeShow(i);
				}
				ht.push("<div style=\"height:" + (cal_day_week_cell_spacing - 1) + "px\" class=\"tg-time\">", tmt, "</div>");
			}
			ht.push("</td>");
			var l = dayarrs.length;
			for (var i = 0; i < l; i++) {
				ht.push("<td class=\"tg-col\" ch='qkadd' abbr='", dateFormat.call(dayarrs[i].date, i18n.xgcalendar.dateformat.fulldayvalue), "'>");
				var istoday = dateFormat.call(dayarrs[i].date, "yyyyMMdd") == dateFormat.call(new Date(), "yyyyMMdd");
				if (istoday) {
					ht.push("<div style=\"margin-bottom:-" + cal_main_grid_height + "px; height:" + cal_main_grid_height + "px\" class=\"tg-today\">&nbsp;</div>");
				}
				ht.push("<div  style=\"margin-bottom:-" + cal_main_grid_height + "px; height:" + cal_main_grid_height + "px\" id='tgCol", i, "' class=\"tg-col-eventwrapper\">");
				BuildEvents(ht, events[i], dayarrs[i]);
				ht.push("</div>");
				ht.push("<div class=\"tg-col-overlaywrapper\" id='tgOver", i, "'>");
				if (istoday) {
					var mhh = mHg + 4;
					ht.push("<div id=\"tgnowmarker\" class=\"tg-hourmarker tg-nowmarker\" style=\"left:0px;top:", mhh, "px\"></div>");
				}
				ht.push("</div>");
				ht.push("</td>");
			}
			ht.push("</tr>");
		}
		function BuildEvents(hv, events, sday) {
			for (var i = 0; i < events.length; i++) {
				var c;
				if (events[i].event[7] && events[i].event[7] >= 0) {
					c = tc(events[i].event[7]);
				} else {
					c = tc();
				}
				var tt = BuildDayEvent(c, events[i], i);
				hv.push(tt);
			}
		}
		function getTitle(event) {
			var timeshow,
			locationshow,
			attendsshow,
			eventshow,
			groupname;
			var showtime = event[4] != 1;
			eventshow = event[1].replace(/(<br>|<\/br>|<br \/>)/gi, "\r");
			var description = "";
			if (event[11] !== undefined) {
				description = event[11].replace(/(<br>|<\/br>|<br \/>)/gi, "\r");
			}
			var startformat = getymformat(event[2], null, showtime, true);
			var endformat = getymformat(event[3], event[2], showtime, true);
			if (option.TwelveHourFormat === true) {
				timeshow = dateFormat.call(event[2], startformat) + " " + timeFormat(event[2].getHours() + ":" + event[2].getMinutes()) + " - " + dateFormat.call(event[3], endformat) + " " + timeFormat(event[3].getHours() + ":" + event[3].getMinutes());
			} else {
				timeshow = dateFormat.call(event[2], startformat) + " - " + dateFormat.call(event[3], endformat);
			}
			locationshow = (event[9] !== undefined && event[9] !== "") ? event[9] : "";
			attendsshow = (event[10] !== undefined && event[10] !== "") ? event[10] : "";
			groupname = (event[13] !== undefined && event[13] !== "" && event[13] !== "undefined") ? removeHTMLTags(event[13]) : "";
			var ret = [];
			if (event[4] == 1) {
				ret.push("[" + i18n.xgcalendar.allday_event + "]", jQuery.browser.mozilla ? "\r\n" : "\r\n");
				if (event[6] == 1) {
					ret.push("[" + i18n.xgcalendar.repeat_event + "]", jQuery.browser.mozilla ? "\r\n" : "\r\n");
				}
			} else {
				if (event[6] == 1) {
					ret.push("[" + i18n.xgcalendar.repeat_event + "]", jQuery.browser.mozilla ? "\r\n" : "\r\n");
				}
			}
			ret.push(i18n.xgcalendar.time + ": ", timeshow, jQuery.browser.mozilla ? "\r\n" : "\r\n", i18n.xgcalendar.event + ": ", eventshow);
			if (description !== "") {
				ret.push("\r\n", i18n.xgcalendar.description + ": ", description);
			}
			if (locationshow !== "") {
				ret.push(jQuery.browser.mozilla ? "\r\n" : "\r\n", i18n.xgcalendar.location + ": ", locationshow);
			}
			if (attendsshow !== "") {
				ret.push(jQuery.browser.mozilla ? "\r\n" : "\r\n", i18n.xgcalendar.participant + ": ", attendsshow);
			}
			if (groupname !== "") {
				ret.push(jQuery.browser.mozilla ? "\r\n" : "\r\n", option.ResouceNameTitle + ": ", groupname);
			}
//#Touchdry# - edits to remove Title from event mouse hover.
			//return ret.join("");
			return "";
		}
		function BuildDayEvent(theme, e, index) {
			var p = {
				bdcolor: theme[0],
				bgcolor2: theme[0],
				bgcolor1: theme[2],
				width: "70%",
				icon: "",
				title: "",
				data: ""
			};
			if (option.TwelveHourFormat === false) {
				p.starttime = pZero(e.st.hour) + ":" + pZero(e.st.minute);
				p.endtime = pZero(e.et.hour) + ":" + pZero(e.et.minute);
			} else {
				p.starttime = timeFormat(pZero(e.st.hour) + ":" + pZero(e.st.minute));
				p.endtime = timeFormat(pZero(e.et.hour) + ":" + pZero(e.et.minute));
			}
			var sP = gP(e.st.hour, e.st.minute);
			var eP = gP(e.et.hour, e.et.minute);
			var th_h = eP - sP - 20;
/* #Touchdry# Edits to add in the attendees and location to the event tiles in day views. Alpha Custom Database Solutions, LLC Jim Coltz May 31, 2019
 			if (option.showDescription) {
				if (option.scrollDescription) {
					p.content = e.event[11] !== undefined ? "<DIV STYLE=\"overflow-y:auto;height:" + th_h + "px; \">" + e.event[1] + "<br>" + e.event[11] + "</DIV>" : e.event[1];
				} else {
					p.content = e.event[11] !== undefined ? "<DIV STYLE=\"overflow:hidden;\">" + e.event[1] + "<br>" + e.event[11] + "</DIV>" : e.event[1];
				}
			} else {
				p.content = e.event[1];
			} 
*/

			if (option.showDescription) {
				if (option.scrollDescription) {
					p.content = e.event[11] !== undefined ? "<DIV STYLE=\"overflow-y:auto;height:" + th_h + "px; \">" + e.event[1] + "<br>" + e.event[11] + "</DIV>" : e.event[1];
				} else {
					// this is where the extra items are added to the display. 
					p.content = e.event[11] !== undefined ? "<DIV STYLE=\"overflow:hidden;\">" + e.event[1] + "<br>" + e.event[11] +
					"<br>" + e.event[9] + "<br>" + e.event[10] +
					"</DIV>" : e.event[1];
				}
			} else {
				p.content = e.event[1];
			}
			
			p.title = getTitle(e.event);
			p.data = e.event.join("__qzypzx__");
			var icons = [];
			icons.push("<I class=\"cic cic-tmr\">&nbsp;</I>");
			if (e.reevent) {
				icons.push("<I class=\"cic cic-rcr\">&nbsp;</I>");
			}
			p.icon = icons.join("");
			p.top = sP + "px";
			p.left = (e.left * 100) + "%";
			p.width = (e.aQ * 100) + "%";
			p.height = (eP - sP - 4);
			p.i = index;
			if (option.enableDrag && e.event[8] == 1) {
				p.drag = "drag";
				p.redisplay = "block";
			} else {
				p.drag = "";
				p.redisplay = "none";
			}
			var newtemp = Tp(__SCOLLEVENTTEMP, p);
			p = null;
			return newtemp;
		}
		function GetMonthViewBodyHeight() {
			return option.height;
		}
		function GetMonthViewHeaderHeight() {
			return 21;
		}
		function BuilderMonthBody(htb, showday, startday, events, bodyHeight) {
			var firstdate = new Date(showday.getFullYear(), showday.getMonth(), 1);
			var diffday = startday - firstdate.getDay();
			var showmonth = showday.getMonth();
			if (diffday > 0) {
				diffday -= 7;
			}
			var startdate = DateAdd("d", diffday, firstdate);
			var enddate = DateAdd("d", 34, startdate);
			var rc = 5;
			if (enddate.getFullYear() == showday.getFullYear() && enddate.getMonth() == showday.getMonth() && enddate.getDate() < __MonthDays[showmonth]) {
				enddate = DateAdd("d", 7, enddate);
				rc = 6;
			}
			option.vstart = startdate;
			option.vend = enddate;
			option.datestrshow = CalDateShow(startdate, enddate);
			bodyHeight = bodyHeight - 18 * rc;
			var rowheight = bodyHeight / rc;
			var roweventcount = parseInt(rowheight / 21, 10);
			if (rowheight % 21 > 15) {
				roweventcount++;
			}
			var p = 100 / rc;
			var formatevents = [];
			var hastdata = formartEventsInHashtable(events, startday, 7, startdate, enddate);
			var B = [];
			var C = [];
			var b;
			for (var j = 0; j < rc; j++) {
				var k = 0;
				formatevents[j] = b = [];
				for (var i = 0; i < 7; i++) {
					var newkeyDate = DateAdd("d", j * 7 + i, startdate);
					C[j * 7 + i] = newkeyDate;
					var newkey = dateFormat.call(newkeyDate, i18n.xgcalendar.dateformat.fulldaykey);
					b[i] = hastdata[newkey];
					if (b[i] && b[i].length > 0) {
						k += b[i].length;
					}
				}
				B[j] = k;
			}
			eventDiv.data("mvdata", formatevents);
			for (var j = 0; j < rc; j++) {
				htb.push("<div id='mvrow_", j, "' style=\"HEIGHT:", p, "%; TOP:", p * j, "%\"  class=\"month-row\">");
				htb.push("<table class=\"st-bg-table\" cellSpacing=\"0\" cellPadding=\"0\"><tbody><tr>");
				var dMax = B[j];
				for (var i = 0; i < 7; i++) {
					var day = C[j * 7 + i];
					htb.push("<td abbr='", dateFormat.call(day, i18n.xgcalendar.dateformat.fulldayvalue), "' ch='qkadd' axis='00:00' title=''");
					if (dateFormat.call(day, "yyyyMMdd") == dateFormat.call(new Date(), "yyyyMMdd")) {
						htb.push(" class=\"st-bg st-bg-today\">");
					} else if (day.getMonth() != showmonth) {
						htb.push(" class=\"st-bg st-bg-nonmonth\">");
					} else {
						htb.push(" class=\"st-bg\">");
					}
					htb.push("&nbsp;</td>");
				}
				htb.push("</tr></tbody></table>");
				htb.push("<table class=\"st-grid\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
				htb.push("<tr>");
				var titletemp = "<td class=\"st-dtitlejQuery{titleClass}\" ch='qkadd' abbr='jQuery{abbr}' axis='00:00' title=\"jQuery{title}\"><span class='monthdayshow'>jQuery{dayshow}</span></a></td>";
				for (var i = 0; i < 7; i++) {
					var o = {
						titleClass: "",
						dayshow: ""
					};
					var day = C[j * 7 + i];
					if (dateFormat.call(day, "yyyyMMdd") == dateFormat.call(new Date(), "yyyyMMdd")) {
						o.titleClass = " st-dtitle-today";
					}
					if (day.getMonth() != showmonth) {
						o.titleClass = " st-dtitle-nonmonth";
					}
					o.title = dateFormat.call(day, i18n.xgcalendar.dateformat.fulldayshow);
					if (day.getDate() == 1) {
						if (day.getMonth === 0) {
							o.dayshow = dateFormat.call(day, i18n.xgcalendar.dateformat.fulldayshow);
						} else {
							o.dayshow = dateFormat.call(day, i18n.xgcalendar.dateformat.Md3);
						}
					} else {
						o.dayshow = day.getDate();
					}
					o.abbr = dateFormat.call(day, i18n.xgcalendar.dateformat.fulldayvalue);
					htb.push(Tp(titletemp, o));
				}
				htb.push("</tr>");
				var sfirstday = C[j * 7];
				BuildMonthRow(htb, formatevents[j], dMax, roweventcount, sfirstday);
				htb.push("</tbody></table>");
				htb.push("</div>");
			}
			formatevents = B = C = hastdata = null;
		}
		function formartEventsInHashtable(events, startday, daylength, rbdate, redate) {
			var hast = {};
			var l = events.length;
			for (var i = 0; i < l; i++) {
				var sD = events[i][2];
				var eD = events[i][3];
				var diff = DateDiff("d", sD, eD);
				var s = {};
				s.event = events[i];
				s.day = sD.getDate();
				s.year = sD.getFullYear();
				s.month = sD.getMonth() + 1;
				s.allday = events[i][4] == 1;
				s.crossday = events[i][5] == 1;
				s.reevent = events[i][6] == 1;
				s.daystr = s.year + "/" + s.month + "/" + s.day;
				s.st = {};
				s.st.hour = sD.getHours();
				s.st.minute = sD.getMinutes();
				s.st.p = s.st.hour * 60 + s.st.minute;
				s.et = {};
				s.et.hour = eD.getHours();
				s.et.minute = eD.getMinutes();
				s.et.p = s.et.hour * 60 + s.et.minute;
				if (diff > 0) {
					if (sD < rbdate) {
						sD = rbdate;
					}
					if (eD > redate) {
						eD = redate;
					}
					var f = startday - sD.getDay();
					if (f > 0) {
						f -= daylength;
					}
					var sdtemp = DateAdd("d", f, sD);
					for (; sdtemp <= eD; sD = sdtemp = DateAdd("d", daylength, sdtemp)) {
						var d = Clone(s);
						var key = dateFormat.call(sD, i18n.xgcalendar.dateformat.fulldaykey);
						var x = DateDiff("d", sdtemp, eD);
						if (hast[key] == null) {
							hast[key] = [];
						}
						d.colSpan = (x >= daylength) ? daylength - DateDiff("d", sdtemp, sD) : DateDiff("d", sD, eD) + 1;
						hast[key].push(d);
						d = null;
					}
				} else {
					var key = dateFormat.call(events[i][2], i18n.xgcalendar.dateformat.fulldaykey);
					if (hast[key] == null) {
						hast[key] = [];
					}
					s.colSpan = 1;
					hast[key].push(s);
				}
				s = null;
			}
			return hast;
		}
		function BuildMonthRow(htr, events, dMax, sc, day) {
			var x = [];
			var y = [];
			var z = [];
			var cday = [];
			var l = events.length;
			var el = 0;
			for (var j = 0; j < l; j++) {
				x.push(0);
				y.push(0);
				z.push(0);
				cday.push(DateAdd("d", j, day));
			}
			for (var j = 0; j < l; j++) {
				var ec = events[j] ? events[j].length : 0;
				y[j] += ec;
				for (var k = 0; k < ec; k++) {
					var e = events[j][k];
					if (e && e.colSpan > 1) {
						for (var m = 1; m < e.colSpan; m++) {
							y[j + m]++;
						}
					}
				}
			}
			var tdtemp = "<td class='jQuery{cssclass}' axis='jQuery{axis}' ch='jQuery{ch}' abbr='jQuery{abbr}' title='jQuery{title}' jQuery{otherAttr}>jQuery{html}</td>";
			for (var j = 0; j < sc && el < dMax; j++) {
				htr.push("<tr>");
				for (var h = 0; h < l; ) {
					var e = events[h] ? events[h][x[h]] : undefined;
					var tempdata = {
						"class": "",
						axis: "",
						ch: "",
						title: "",
						abbr: "",
						html: "",
						otherAttr: "",
						click: "javascript:void(0);"
					};
					var tempCss = ["st-c"];
					if (e) {
						x[h] = x[h] + 1;
						var bs = false;
						if (z[h] + 1 == y[h] && e.colSpan == 1) {
							bs = true;
						}
						if (!bs && j == (sc - 1) && z[h] < y[h]) {
							el++;
							jQuery.extend(tempdata, {
								"axis": h,
								ch: "more",
								"abbr": dateFormat.call(cday[h], i18n.xgcalendar.dateformat.fulldayvalue),
								html: i18n.xgcalendar.others + (y[h] - z[h]) + i18n.xgcalendar.item,
								click: "javascript:alert('more event');"
							});
							tempCss.push("st-more st-moreul");
							h++;
						} else {
							tempdata.html = BuildMonthDayEvent(e, cday[h], l - h);
							tempdata.ch = "show";
							if (e.colSpan > 1) {
								tempdata.otherAttr = " colSpan='" + e.colSpan + "'";
								for (var m = 0; m < e.colSpan; m++) {
									z[h + m] = z[h + m] + 1;
								}
								h += e.colSpan;
							} else {
								z[h] = z[h] + 1;
								h++;
							}
							el++;
						}
					} else {
						if (j == (sc - 1) && z[h] < y[h] && y[h] > 0) {
							jQuery.extend(tempdata, {
								"axis": h,
								ch: "more",
								"abbr": dateFormat.call(cday[h], i18n.xgcalendar.dateformat.fulldayvalue),
								html: i18n.xgcalendar.others + (y[h] - z[h]) + i18n.xgcalendar.item,
								click: "javascript:alert('more event');"
							});
							tempCss.push("st-more st-moreul");
							h++;
						} else {
							jQuery.extend(tempdata, {
								html: "&nbsp;",
								ch: "qkadd",
								"axis": "00:00",
								"abbr": dateFormat.call(cday[h], i18n.xgcalendar.dateformat.fulldayvalue),
								title: ""
							});
							tempCss.push("st-s");
							h++;
						}
					}
					tempdata.cssclass = tempCss.join(" ");
					tempCss = null;
					htr.push(Tp(tdtemp, tempdata));
					tempdata = null;
				}
				htr.push("</tr>");
			}
			x = y = z = cday = null;
		}
		function BuildMonthDayEvent(e, cday, length) {
			var theme;
			if (e.event[7] && e.event[7] >= 0) {
				theme = tc(e.event[7]);
			} else {
				theme = tc();
			}
			var p = {
				color: theme[2],
				title: "",
				extendClass: "",
				extendHTML: "",
				data: ""
			};
			p.title = getTitle(e.event);
			p.id = "bbit_cal_event_" + e.event[0];
			if (option.enableDrag && e.event[8] == 1) {
				p.eclass = "drag";
			} else {
				p.eclass = "cal_" + e.event[0];
			}
			p.data = e.event.join("__qzypzx__");
			var sp = "<span style=\"cursor: pointer\">jQuery{content}</span>";
			var i = "<I class=\"cic cic-tmr\">&nbsp;</I>";
			var i2 = "<I class=\"cic cic-rcr\">&nbsp;</I>";
			var ml = "<div class=\"st-ad-ml\"></div>";
			var mr = "<div class=\"st-ad-mr\"></div>";
			var arrm = [];
			if (option.view != "schedule") {
				var sf = e.event[2] < cday;
				var ef = DateDiff("d", cday, e.event[3]) >= length;
			} else {
				var sf = e.event[2].toDateString() != cday.toDateString();
				var ef = e.event[3].toDateString() != cday.toDateString();
			}
			if (sf || ef) {
				if (sf) {
					arrm.push(ml);
					p.extendClass = "st-ad-mpad ";
				}
				if (ef) {
					arrm.push(mr);
				}
				p.extendHTML = arrm.join("");
			}
			var cen;
			if (!e.allday && !sf) {
				if (option.TwelveHourFormat === true) {
					cen = timeFormat(pZero(e.st.hour) + ":" + pZero(e.st.minute)) + " " + e.event[1];
				} else {
					cen = pZero(e.st.hour) + ":" + pZero(e.st.minute) + " " + e.event[1];
				}
			} else {
				cen = e.event[1];
			}
			var content = [];
			content.push(Tp(sp, {
					content: cen
				}));
			content.push(i);
			if (e.reevent) {
				content.push(i2);
			}
			p.content = content.join("");
			return Tp(__ALLDAYEVENTTEMP, p);
		}
		function populate() {
			if (option.isloading) {
				return true;
			}
			if (option.url && option.url !== "") {
				option.isloading = true;
				if (option.onBeforeRequestData && jQuery.isFunction(option.onBeforeRequestData)) {
					option.onBeforeRequestData(1);
				}
				var _timestamp = new Date().getTime();
				var t_workweek = new Date(option.showday);
				var zone = new Date().getTimezoneOffset() / 60 * -1;
				if (t_workweek.getDay() === 0 && option.view == "workweek") {
					var x_showday = new Date(t_workweek.setDate(t_workweek.getDate() - 7));
					var param = [{
							name: "showdate",
							value: dateFormat.call(x_showday, i18n.xgcalendar.dateformat.fulldayvalue)
						}, {
							name: "viewtype",
							value: option.view == "workweek" ? "week" : option.view
						}, {
							name: "timezone",
							value: zone
						}, {
							name: "time_stamp",
							value: _timestamp
						}, {
							name: "dot_net_tzname",
							value: i18n.xgcalendar.dot_net_tzname
						}
					];
				} else {
					var param = [{
							name: "showdate",
							value: dateFormat.call(option.showday, i18n.xgcalendar.dateformat.fulldayvalue)
						}, {
							name: "viewtype",
							value: option.view == "workweek" ? "week" : option.view
						}, {
							name: "timezone",
							value: zone
						}, {
							name: "time_stamp",
							value: _timestamp
						}, {
							name: "dot_net_tzname",
							value: i18n.xgcalendar.dot_net_tzname
						}
					];
				}
				if (option.extParam) {
					for (var pi = 0; pi < option.extParam.length; pi++) {
						param[param.length] = option.extParam[pi];
					}
				}
				jQuery.ajax({
					type: option.method,
					url: option.url,
					data: param,
					dataType: "json",
					dataFilter: function (data, type) {
						return data;
					},
					success: function (data) {
						if (data !== null && data.error !== null) {
							if (option.onRequestDataError) {
								option.onRequestDataError(1, data);
							}
						} else {
							data.start = parseDate(data.start);
							data.end = parseDate(data.end);
							jQuery.each(data.events, function (index, value) {
								value[2] = parseDate(value[2]);
								value[3] = parseDate(value[3]);
							});
							responseData(data, data.start, data.end);
							pushER(data.start, data.end);
						}
						if (option.onAfterRequestData && jQuery.isFunction(option.onAfterRequestData)) {
							option.onAfterRequestData(1);
						}
						option.isloading = false;
					},
					error: function (jqXHR, textStatus, errorThrown) {
						var type = 1;
						var s_response = jqXHR.responseText;
						try {
							if (option.onRequestDataError) {
								option.onRequestDataError(type, s_response, textStatus, errorThrown);
							} else {
								alert(i18n.xgcalendar.get_data_exception);
							}
							if (option.onAfterRequestData && jQuery.isFunction(option.onAfterRequestData)) {
								option.onAfterRequestData(1);
							}
							option.isloading = false;
						} catch (e) {}
					}
				});
			} else {
				alert("url" + i18n.xgcalendar.i_undefined);
			}
		}
		function responseData(data, start, end) {
			var events;
			if (data.issort === false) {
				if (data.events && data.events.length > 0) {
					events = data.sort(function (l, r) {
							return l[2] > r[2] ? -1 : 1;
						});
				} else {
					events = [];
				}
			} else {
				events = data.events;
			}
			ConcatEvents(events, start, end);
			render();
		}
		function clearrepeat(events, start, end) {
			var jl = events.length;
			if (jl > 0) {
				var es = events[0][2];
				var el = events[jl - 1][2];
				for (var i = 0, l = option.eventItems.length; i < l; i++) {
					if (option.eventItems[i][2] > el || jl === 0) {
						break;
					}
					if (option.eventItems[i][2] >= es) {
						for (var j = 0; j < jl; j++) {
							if (option.eventItems[i][0] == events[j][0] && option.eventItems[i][2] < start) {
								events.splice(j, 1);
								jl--;
								break;
							}
						}
					}
				}
			}
		}
		function ConcatEvents(events, start, end) {
			if (!events) {
				events = [];
			}
			if (events) {
				if (option.eventItems.length === 0) {
					option.eventItems = events;
				} else {
					clearrepeat(events, start, end);
					var l = events.length;
					var sl = option.eventItems.length;
					var sI = -1;
					var eI = sl;
					var s = start;
					var e = end;
					if (option.eventItems[0][2] > e) {
						option.eventItems = events.concat(option.eventItems);
						return;
					}
					if (option.eventItems[sl - 1][2] < s) {
						option.eventItems = option.eventItems.concat(events);
						return;
					}
					for (var i = 0; i < sl; i++) {
						if (option.eventItems[i][2] >= s && sI < 0) {
							sI = i;
							continue;
						}
						if (option.eventItems[i][2] > e) {
							eI = i;
							break;
						}
					}
					var e1 = sI <= 0 ? [] : option.eventItems.slice(0, sI);
					var e2 = eI == sl ? [] : option.eventItems.slice(eI);
					option.eventItems = [].concat(e1, events, e2);
					events = e1 = e2 = null;
				}
			}
		}
		function weekormonthtoday(e) {
			var th = jQuery(this);
			var daystr = th.attr("abbr");
			option.showday = strtodate(daystr + " 00:00");
			option.view = "day";
			render();
			if (option.onweekormonthtoday) {
				option.onweekormonthtoday(option);
			}
			return false;
		}
		function parseDate(str) {
			return new Date(Date.parse(str));
		}
		function gP(h, m) {
			h = h - option.StartHour;
			return h * cal_day_week_cell_spacing + parseInt(m / 60 * cal_day_week_cell_spacing, 10);
		}
		function gW(ts1, ts2) {
			ts1 = ts1 + option.StartHour * cal_day_week_cell_spacing;
			ts2 = ts2 + option.StartHour * cal_day_week_cell_spacing;
			var t1 = ts1 / cal_day_week_cell_spacing;
			var t2 = parseInt(t1, 10);
			var t3 = 0;
			var t3test = t1 - t2;
			var t4 = ts2 / cal_day_week_cell_spacing;
			var t5 = parseInt(t4, 10);
			var t6 = 0;
			var t6test = t4 - t5;
			var slotminutes = isNaN(option.TimeSlotMinutes) ? 15 : option.TimeSlotMinutes;
			switch (slotminutes) {
			case 5:
				if (t3test < 0.041667) {
					t3 = 0;
				} else if (t3test >= 0.041667 && t3test < 0.125) {
					t3 = 5;
				} else if (t3test >= 0.125 && t3test < 0.20833) {
					t3 = 10;
				} else if (t3test >= 0.20833 && t3test < 0.29166) {
					t3 = 15;
				} else if (t3test >= 0.29166 && t3test < 0.375) {
					t3 = 20;
				} else if (t3test >= 0.375 && t3test < 0.45833) {
					t3 = 25;
				} else if (t3test >= 0.45833 && t3test < 0.54166) {
					t3 = 30;
				} else if (t3test >= 0.54166 && t3test < 0.625) {
					t3 = 35;
				} else if (t3test >= 0.625 && t3test < 0.70833) {
					t3 = 40;
				} else if (t3test >= 0.70833 && t3test < 0.79166) {
					t3 = 45;
				} else if (t3test >= 0.79166 && t3test < 0.875) {
					t3 = 50;
				} else if (t3test >= 0.875 && t3test < 1) {
					t3 = 55;
				} else if (t3test > 0.9583 && t3test < 1) {
					t2 = t2 + 1;
				}
				if (t6test < 0.041667) {
					t6 = 0;
				} else if (t6test >= 0.041667 && t6test < 0.125) {
					t6 = 5;
				} else if (t6test >= 0.125 && t6test < 0.20833) {
					t6 = 10;
				} else if (t6test >= 0.20833 && t6test < 0.29166) {
					t6 = 15;
				} else if (t6test >= 0.29166 && t6test < 0.375) {
					t6 = 20;
				} else if (t6test >= 0.375 && t6test < 0.45833) {
					t6 = 25;
				} else if (t6test >= 0.45833 && t6test < 0.54166) {
					t6 = 30;
				} else if (t6test >= 0.54166 && t6test < 0.625) {
					t6 = 35;
				} else if (t6test >= 0.625 && t6test < 0.70833) {
					t6 = 40;
				} else if (t6test >= 0.70833 && t6test < 0.79166) {
					t6 = 45;
				} else if (t6test >= 0.79166 && t6test < 0.875) {
					t6 = 50;
				} else if (t6test >= 0.875 && t6test < 0.9583) {
					t6 = 55;
				} else if (t6test >= 0.9583 && t6test < 1) {
					t5 = t5 + 1;
				}
				return {
					sh: t2,
					sm: t3,
					eh: t5,
					em: t6,
					h: ts2 - ts1
				};
			case 10:
				if (t3test < 0.083) {
					t3 = 0;
				} else if (t3test >= 0.083 && t3test < 0.249) {
					t3 = 10;
				} else if (t3test >= 0.249 && t3test < 0.415) {
					t3 = 20;
				} else if (t3test >= 0.415 && t3test < 0.581) {
					t3 = 30;
				} else if (t3test >= 0.581 && t3test < 0.747) {
					t3 = 40;
				} else if (t3test >= 0.747 && t3test < 0.913) {
					t3 = 50;
				} else if (t3test >= 0.913 && t3test < 1) {
					t2 = t2 + 1;
				}
				if (t6test < 0.083) {
					t6 = 0;
				} else if (t6test >= 0.083 && t6test < 0.249) {
					t6 = 10;
				} else if (t6test >= 0.249 && t6test < 0.415) {
					t6 = 20;
				} else if (t6test >= 0.415 && t6test < 0.581) {
					t6 = 30;
				} else if (t6test >= 0.581 && t6test < 0.747) {
					t6 = 40;
				} else if (t6test >= 0.747 && t6test < 0.913) {
					t6 = 50;
				} else if (t6test >= 0.913 && t6test < 1) {
					t5 = t5 + 1;
				}
				return {
					sh: t2,
					sm: t3,
					eh: t5,
					em: t6,
					h: ts2 - ts1
				};
			case 15:
				if (t3test < 0.125) {
					t3 = 0;
				} else if (t3test >= 0.125 && t3test < 0.375) {
					t3 = 15;
				} else if (t3test >= 0.375 && t3test < 0.625) {
					t3 = 30;
				} else if (t3test >= 0.625 && t3test <= 0.875) {
					t3 = 45;
				} else {
					t2 = t2 + 1;
				}
				if (t6test < 0.125) {
					t6 = 0;
				} else if (t6test >= 0.125 && t6test < 0.375) {
					t6 = 15;
				} else if (t6test >= 0.375 && t6test < 0.625) {
					t6 = 30;
				} else if (t6test >= 0.625 && t6test < 0.875) {
					t6 = 45;
				} else if (t6test >= 0.875 && t6test < 1) {
					t5 = t5 + 1;
				}
				return {
					sh: t2,
					sm: t3,
					eh: t5,
					em: t6,
					h: ts2 - ts1
				};
			case 30:
				t3 = t1 - t2 >= 0.5 ? 30 : 0;
				t6 = t4 - t5;
				if (t6 < 0.375) {
					t6 = 0;
				} else if (t6 > 0.375 && t6 <= 0.75) {
					t6 = 30;
				} else {
					t5 = t5 + 1;
					t6 = 0;
				}
				return {
					sh: t2,
					sm: t3,
					eh: t5,
					em: t6,
					h: ts2 - ts1
				};
			default:
				if (t3test < 0.125) {
					t3 = 0;
				} else if (t3test >= 0.125 && t3test < 0.375) {
					t3 = 15;
				} else if (t3test >= 0.375 && t3test < 0.625) {
					t3 = 30;
				} else if (t3test >= 0.625 && t3test <= 0.75) {
					t3 = 45;
				} else {
					t2 = t2 + 1;
				}
				if (t6test < 0.125) {
					t6 = 0;
				} else if (t6test >= 0.125 && t6test < 0.375) {
					t6 = 15;
				} else if (t6test >= 0.375 && t6test < 0.625) {
					t6 = 30;
				} else if (t6test >= 0.625 && t6test <= 0.75) {
					t6 = 45;
				} else {
					t5 = t5 + 1;
				}
				return {
					sh: t2,
					sm: t3,
					eh: t5,
					em: t6,
					h: ts2 - ts1
				};
			}
		}
		function gH(y1, y2, pt) {
			y1 = y1 + option.StartHour * cal_day_week_cell_spacing;
			y2 = y2 + option.StartHour * cal_day_week_cell_spacing;
			var sy1 = Math.min(y1, y2);
			var sy2 = Math.max(y1, y2);
			var t1 = (sy1 - pt) / cal_day_week_cell_spacing;
			var t2 = parseInt(t1, 10);
			var t3 = 0;
			var t3test = t1 - t2;
			var t4 = (sy2 - pt) / cal_day_week_cell_spacing;
			var t5 = parseInt(t4, 10);
			var t6 = 0;
			var t6test = t4 - t5;
			var slotminutes = isNaN(option.TimeSlotMinutes) ? 15 : option.TimeSlotMinutes;
			switch (slotminutes) {
			case 5:
				if (t3test < 0.041667) {
					t3 = 0;
				} else if (t3test >= 0.041667 && t3test < 0.125) {
					t3 = 5;
				} else if (t3test >= 0.125 && t3test < 0.20833) {
					t3 = 10;
				} else if (t3test >= 0.20833 && t3test < 0.29166) {
					t3 = 15;
				} else if (t3test >= 0.29166 && t3test < 0.375) {
					t3 = 20;
				} else if (t3test >= 0.375 && t3test < 0.45833) {
					t3 = 25;
				} else if (t3test >= 0.45833 && t3test < 0.54166) {
					t3 = 30;
				} else if (t3test >= 0.54166 && t3test < 0.625) {
					t3 = 35;
				} else if (t3test >= 0.625 && t3test < 0.70833) {
					t3 = 40;
				} else if (t3test >= 0.70833 && t3test < 0.79166) {
					t3 = 45;
				} else if (t3test >= 0.79166 && t3test < 0.875) {
					t3 = 50;
				} else if (t3test >= 0.875 && t3test < 0.9583) {
					t3 = 55;
				} else if (t3test >= 0.9583 && t3test < 1) {
					t2 = t2 + 1;
				}
				if (t6test < 0.041667) {
					t6 = 0;
				} else if (t6test >= 0.041667 && t6test < 0.125) {
					t6 = 5;
				} else if (t6test >= 0.125 && t6test < 0.20833) {
					t6 = 10;
				} else if (t6test >= 0.20833 && t6test < 0.29166) {
					t6 = 15;
				} else if (t6test >= 0.29166 && t6test < 0.375) {
					t6 = 20;
				} else if (t6test >= 0.375 && t6test < 0.45833) {
					t6 = 25;
				} else if (t6test >= 0.45833 && t6test < 0.54166) {
					t6 = 30;
				} else if (t6test >= 0.54166 && t6test < 0.625) {
					t6 = 35;
				} else if (t6test >= 0.625 && t6test < 0.70833) {
					t6 = 40;
				} else if (t6test >= 0.70833 && t6test < 0.79166) {
					t6 = 45;
				} else if (t6test >= 0.79166 && t6test < 0.875) {
					t6 = 50;
				} else if (t6test >= 0.875 && t6test < 0.9583) {
					t6 = 55;
				} else if (t6test >= 0.9583 && t6test < 1) {
					t5 = t5 + 1;
				}
				return {
					sh: t2,
					sm: t3,
					eh: t5,
					em: t6,
					h: sy2 - sy1
				};
			case 10:
				if (t3test < 0.083) {
					t3 = 0;
				} else if (t3test >= 0.083 && t3test < 0.249) {
					t3 = 10;
				} else if (t3test >= 0.249 && t3test < 0.415) {
					t3 = 20;
				} else if (t3test >= 0.415 && t3test < 0.581) {
					t3 = 30;
				} else if (t3test >= 0.581 && t3test < 0.747) {
					t3 = 40;
				} else if (t3test >= 0.747 && t3test < 0.913) {
					t3 = 50;
				} else if (t3test >= 0.913 && t3test < 1) {
					t2 = t2 + 1;
				}
				if (t6test < 0.083) {
					t6 = 0;
				} else if (t6test >= 0.083 && t6test < 0.249) {
					t6 = 10;
				} else if (t6test >= 0.249 && t6test < 0.415) {
					t6 = 20;
				} else if (t6test >= 0.415 && t6test < 0.581) {
					t6 = 30;
				} else if (t6test >= 0.581 && t6test < 0.747) {
					t6 = 40;
				} else if (t6test >= 0.747 && t6test < 0.913) {
					t6 = 50;
				} else if (t6test >= 0.913 && t6test < 1) {
					t5 = t5 + 1;
				}
				return {
					sh: t2,
					sm: t3,
					eh: t5,
					em: t6,
					h: sy2 - sy1
				};
			case 15:
				if (t3test < 0.125) {
					t3 = 0;
				} else if (t3test >= 0.125 && t3test < 0.375) {
					t3 = 15;
				} else if (t3test >= 0.375 && t3test < 0.625) {
					t3 = 30;
				} else if (t3test >= 0.625 && t3test <= 0.75) {
					t3 = 45;
				} else {
					t2 = t2 + 1;
				}
				if (t6test < 0.125) {
					t6 = 0;
				} else if (t6test >= 0.125 && t6test < 0.375) {
					t6 = 15;
				} else if (t6test >= 0.0375 && t6test < 0.625) {
					t6 = 30;
				} else if (t6test >= 0.625 && t6test <= 0.75) {
					t6 = 45;
				} else {
					t5 = t5 + 1;
				}
				return {
					sh: t2,
					sm: t3,
					eh: t5,
					em: t6,
					h: sy2 - sy1
				};
			case 30:
				t3 = t1 - t2;
				if (t3 < 0.375) {
					t3 = 0;
				} else if (t3 > 0.375 && t3 <= 0.75) {
					t3 = 30;
				} else {
					t2 = t2 + 1;
					t3 = 0;
				}
				t6 = t4 - t5;
				if (t6 < 0.375) {
					t6 = 0;
				} else if (t6 > 0.375 && t6 <= 0.75) {
					t6 = 30;
				} else {
					t5 = t5 + 1;
					t6 = 0;
				}
				return {
					sh: t2,
					sm: t3,
					eh: t5,
					em: t6,
					h: sy2 - sy1
				};
			default:
				if (t3test < 0.125) {
					t3 = 0;
				} else if (t3test >= 0.125 && t3test < 0.375) {
					t3 = 15;
				} else if (t3test >= 0.375 && t3test < 0.625) {
					t3 = 30;
				} else if (t3test >= 0.625 && t3test <= 0.75) {
					t3 = 45;
				} else {
					t2 = t2 + 1;
				}
				if (t6test < 0.125) {
					t6 = 0;
				} else if (t6test >= 0.125 && t6test < 0.375) {
					t6 = 15;
				} else if (t6test >= 0.375 && t6test < 0.625) {
					t6 = 30;
				} else if (t6test >= 0.625 && t6test < 0.75) {
					t6 = 45;
				} else {
					t5 = t5 + 1;
				}
				return {
					sh: t2,
					sm: t3,
					eh: t5,
					em: t6,
					h: sy2 - sy1
				};
			}
		}
		function pZero(n) {
			return n < 10 ? "0" + n : "" + n;
		}
		function tc(d) {
			function zc(c, i) {
				var d = "666666888888aaaaaabbbbbbdddddda32929cc3333d96666e69999f0c2c2b1365fdd4477e67399eea2bbf5c7d67a367a994499b373b3cca2cce1c7e15229a36633cc8c66d9b399e6d1c2f029527a336699668cb399b3ccc2d1e12952a33366cc668cd999b3e6c2d1f01b887a22aa9959bfb391d5ccbde6e128754e32926265ad8999c9b1c2dfd00d78131096184cb05288cb8cb8e0ba52880066aa008cbf40b3d580d1e6b388880eaaaa11bfbf4dd5d588e6e6b8ab8b00d6ae00e0c240ebd780f3e7b3be6d00ee8800f2a640f7c480fadcb3b1440edd5511e6804deeaa88f5ccb8865a5aa87070be9494d4b8b8e5d4d47057708c6d8ca992a9c6b6c6ddd3dd4e5d6c6274878997a5b1bac3d0d6db5a69867083a894a2beb8c1d4d4dae54a716c5c8d8785aaa5aec6c3cedddb6e6e41898951a7a77dc4c4a8dcdccb8d6f47b08b59c4a883d8c5ace7dcce";
				return "#" + d.substring(c * 30 + i * 6, c * 30 + (i + 1) * 6);
			}
			var c = d !== null && d !== undefined ? d : option.theme;
			return [zc(c, 0), zc(c, 1), zc(c, 2), zc(c, 3)];
		}
		function Tp(temp, dataarry) {
			return temp.replace(/\jQuery\{([\w]+)\}/g, function (s1, s2) {
				var s = dataarry[s2];
				if (typeof(s) != "undefined") {
					return s;
				} else {
					return s1;
				}
			});
		}
		function Ta(temp, dataarry) {
			return temp.replace(/\{([\d])\}/g, function (s1, s2) {
				var s = dataarry[s2];
				if (typeof(s) != "undefined") {
					return encodeURIComponent(s);
				} else {
					return "";
				}
			});
		}
		function fomartTimeShowx(h) {
			if (h > 12) {
				h = h - 12;
				return h + ":00 PM";
			} else if (h === 0) {
				return "12:00 AM";
			} else if (h == 12) {
				return "12:00 PM";
			} else {
				return h + ":00 AM";
			}
		}
		function fomartTimeShow(h) {
			return h < 10 ? "0" + h + ":00" : h + ":00";
		}
		function getymformat(date, comparedate, isshowtime, isshowweek, showcompare) {
			var showyear = isshowtime !== undefined ? (date.getFullYear() != new Date().getFullYear()) : true;
			var showmonth = true;
			var showday = true;
			var showtime = isshowtime || false;
			var showweek = isshowweek || false;
			if (comparedate) {
				showyear = comparedate.getFullYear() != date.getFullYear();
				if (comparedate.getFullYear() == date.getFullYear() && date.getMonth() == comparedate.getMonth() && date.getDate() == comparedate.getDate()) {
					showyear = showmonth = showday = showweek = false;
				}
			}
			var a = [];
			if (showyear) {
				a.push(i18n.xgcalendar.dateformat.fulldayshow);
			} else if (showmonth) {
				a.push(i18n.xgcalendar.dateformat.Md3);
			} else if (showday) {
				a.push(i18n.xgcalendar.dateformat.day);
			}
			if (option.TwelveHourFormat === true) {
				a.push(showweek ? " (W)" : "", showtime ? "" : "");
			} else {
				a.push(showweek ? " (W)" : "", showtime ? " HH:mm " : "");
			}
			return a.join("");
		}
		function CalDateShow(startday, endday, isshowtime, isshowweek) {
			if (!endday) {
				return dateFormat.call(startday, getymformat(startday, null, isshowtime));
			} else {
				var strstart = dateFormat.call(startday, getymformat(startday, null, isshowtime, isshowweek));
				var strend = dateFormat.call(endday, getymformat(endday, startday, isshowtime, isshowweek));
				var join = (strend !== "" ? " - " : "");
				return [strstart, strend].join(join);
			}
		}
		function dochange() {
			var d = getRdate();
			var loaded = checkInEr(d.start, d.end);
			if (!loaded) {
				populate();
			}
		}
		function checkInEr(start, end) {
			var ll = option.loadDateR.length;
			if (ll === 0) {
				return false;
			}
			var r = false;
			var r2 = false;
			for (var i = 0; i < ll; i++) {
				r = false,
				r2 = false;
				var dr = option.loadDateR[i];
				if (start >= dr.startdate && start <= dr.enddate) {
					r = true;
				}
				if (dateFormat.call(start, "yyyyMMdd") == dateFormat.call(dr.startdate, "yyyyMMdd") || dateFormat.call(start, "yyyyMMdd") == dateFormat.call(dr.enddate, "yyyyMMdd")) {
					r = true;
				}
				if (!end) {
					r2 = true;
				} else {
					if (end >= dr.startdate && end <= dr.enddate) {
						r2 = true;
					}
					if (dateFormat.call(end, "yyyyMMdd") == dateFormat.call(dr.startdate, "yyyyMMdd") || dateFormat.call(end, "yyyyMMdd") == dateFormat.call(dr.enddate, "yyyyMMdd")) {
						r2 = true;
					}
				}
				if (r && r2) {
					break;
				}
			}
			return r && r2;
		}
		function buildtempdayevent(sh, sm, eh, em, h, title, w, resize, thindex) {
			if (option.TwelveHourFormat === true) {
				var format_st = timeFormat(pZero(sh) + ":" + pZero(sm));
				var format_et = timeFormat(pZero(eh) + ":" + pZero(em));
			} else {
				var format_st = [pZero(sh), pZero(sm)].join(":");
				var format_et = [pZero(eh), pZero(em)].join(":");
			}
			var theme = thindex !== undefined && thindex >= 0 ? tc(thindex) : tc();
			var newtemp = Tp(__SCOLLEVENTTEMP, {
					bdcolor: theme[0],
					bgcolor2: theme[0],
					bgcolor1: theme[2],
					data: "",
					starttime: format_st,
					endtime: format_et,
					content: title ? title : i18n.xgcalendar.new_event,
					title: title ? title : i18n.xgcalendar.new_event,
					icon: "<I class=\"cic cic-tmr\">&nbsp;</I>",
					top: "0px",
					left: "",
					width: w ? w : "100%",
					height: h - 4,
					i: "-1",
					drag: "drag-chip",
					redisplay: resize ? "block" : "none"
				});
			return newtemp;
		}
		function getdata(chip) {
			var hddata = chip.find("div.dhdV");
			if (hddata.length == 1) {
				var str = hddata.html();
				return parseED(str.split("__qzypzx__"));
			}
			return null;
		}
		function parseED(data) {
			if (data.length > 6) {
				var e = [];
				e.push(data[0], data[1], new Date(data[2]), new Date(data[3]), parseInt(data[4], 10), parseInt(data[5], 10), parseInt(data[6], 10), data[7] !== undefined ? parseInt(data[7], 10) : -1, data[8] !== undefined ? parseInt(data[8], 10) : 0, data[9], data[10], data[11] !== undefined ? data[11] : "", data[12] !== undefined ? parseInt(data[12], 10) : 0, data[13] !== undefined ? data[13] : "");
				var rr = "";
				if (data[14] !== undefined && data[14].charAt(0) == "{") {
					rr = data[14].replace(/'/g, "\"");
					rr = jQuery.parseJSON(rr);
				}
				e.push(rr);
				e.push(data[15] !== undefined ? data[15] : "");
				return e;
			}
			return null;
		}
		function quickd(type) {
			jQuery("#bbit-cs-buddle").css("visibility", "hidden");
			var calid = jQuery("#bbit-cs-id").val();
			var _timestamp = new Date().getTime();
			var param = [{
					"name": "calendarId",
					value: calid
				}, {
					"name": "type",
					value: type
				}, {
					name: "time_stamp",
					value: _timestamp
				}
			];
			if (option.extParam) {
				for (var pi = 0; pi < option.extParam.length; pi++) {
					param[param.length] = option.extParam[pi];
				}
			}
			var de = rebyKey(calid, true);
			option.onBeforeRequestData && option.onBeforeRequestData(3);
			var jqxhr = jQuery.post(option.quickDeleteUrl, param, function (data) {
					if (data) {
						if (data.IsSuccess) {
							de = null;
							option.onAfterRequestData && option.onAfterRequestData(3);
						} else {
							option.onRequestDataError && option.onRequestDataError(3, data);
							Ind(de);
							render();
							option.onAfterRequestData && option.onAfterRequestData(3);
						}
					}
				}, "json");
			jqxhr.fail(function (jqxhr) {
				var type = 3;
				var err_resp = jqxhr.responseText;
				var err_code = jqxhr.status;
				var err_status = jqxhr.statusText;
				option.onRequestDataError && option.onRequestDataError(type, err_resp, err_code, err_status);
				Ind(de);
				render();
				option.onAfterRequestData && option.onAfterRequestData(3);
			});
			render();
		}
		function getbuddlepos(x, y) {
			var tleft = x - 110;
			var ttop = y - 217;
			var maxLeft = document.documentElement.clientWidth;
			var maxTop = document.documentElement.clientHeight;
			var ishide = false;
			if (tleft <= 0 || ttop <= 0 || tleft + 400 > maxLeft) {
				tleft = x - 200 <= 0 ? 10 : x - 200;
				ttop = y - 159 <= 0 ? 10 : y - 159;
				if (tleft + 400 >= maxLeft) {
					tleft = maxLeft - 410;
				}
				if (ttop + 164 >= maxTop) {
					ttop = maxTop - 165;
				}
				ishide = true;
			}
			return {
				left: tleft,
				top: ttop,
				hide: ishide
			};
		}
		function dayshow(e, data) {
			if (data === undefined) {
				data = getdata(jQuery(this));
			}
			if (data !== null) {
				if (option.quickDeleteUrl !== "" && data[8] == 1 && option.readonly !== true) {
					if (option.PopUpBubble) {
						var csbuddle = '<div id="bbit-cs-buddle" style="z-index: 180; width: 400px;visibility:hidden;" class="bubble"><table class="bubble-table" cellSpacing="0" cellPadding="0"><tbody><tr><td class="bubble-cell-side"><div id="tl1" class="bubble-corner"><div class="bubble-sprite bubble-tl"></div></div><td class="bubble-cell-main"><div class="bubble-top"></div><td class="bubble-cell-side"><div id="tr1" class="bubble-corner"><div class="bubble-sprite bubble-tr"></div></div>  <tr><td class="bubble-mid" colSpan="3"><div style="overflow: hidden" id="bubbleContent1"><div><div></div><div class="cb-root"><table class="cb-table" cellSpacing="0" cellPadding="0"><tbody><tr><td class="cb-value"><div class="textbox-fill-wrapper"><div class="textbox-fill-mid"><div id="bbit-cs-what" title="' + i18n.xgcalendar.click_to_detail + '" class="textbox-fill-div lk" style="cursor:pointer;"></div></div></div></td></tr><tr><td class=cb-value><div id="bbit-cs-buddle-timeshow"></div></td></tr></tbody></table><div class="bbit-cs-split"><input id="bbit-cs-id" type="hidden" value=""/> <span id="bbit-cs-delete" class="lk">' + i18n.xgcalendar.i_delete + '</span> &nbsp; <SPAN id="bbit-cs-editLink" class="lk">' + i18n.xgcalendar.update_detail + ' <StrONG>&gt;&gt;</StrONG></SPAN></div></div></div></div><tr><td><div id="bl1" class="bubble-corner"><div class="bubble-sprite bubble-bl"></div></div><td><div class="bubble-bottom"></div><td><div id="br1" class="bubble-corner"><div class="bubble-sprite bubble-br"></div></div></tr></tbody></table><div id="bubbleClose2" class="bubble-closebutton"></div><div id="prong1" class="prong"><div class=bubble-sprite></div></div></div>';
						var bud = jQuery("#bbit-cs-buddle");
						if (bud.length === 0) {
							bud = jQuery(csbuddle).appendTo(document.body);
							var calbutton = jQuery("#bbit-cs-delete");
							var lbtn = jQuery("#bbit-cs-editLink");
							var closebtn = jQuery("#bubbleClose2").click(function () {
									jQuery("#bbit-cs-buddle").css("visibility", "hidden");
								});
							calbutton.click(function () {
								var data = jQuery("#bbit-cs-buddle").data("cdata");
								if (option.DeleteCmdhandler && jQuery.isFunction(option.DeleteCmdhandler)) {
									option.DeleteCmdhandler.call(this, data, quickd);
								} else {
									if (confirm(i18n.xgcalendar.confirm_delete_event + "?")) {
										var s = 0;
										if (data[6] == 1) {
											if (confirm(i18n.xgcalendar.confrim_delete_event_or_all)) {
												s = 0;
											} else {
												s = 1;
											}
										} else {
											s = 0;
										}
										quickd(s);
									}
								}
							});
							jQuery("#bbit-cs-what").click(function (e) {
								if (!option.ViewCmdhandler) {
									alert("ViewCmdhandler" + i18n.xgcalendar.i_undefined);
								} else {
									if (option.ViewCmdhandler && jQuery.isFunction(option.ViewCmdhandler)) {
										option.ViewCmdhandler.call(this, jQuery("#bbit-cs-buddle").data("cdata"));
									}
								}
								jQuery("#bbit-cs-buddle").css("visibility", "hidden");
								return false;
							});
							lbtn.click(function (e) {
								if (!option.EditCmdhandler) {
									alert("EditCmdhandler" + i18n.xgcalendar.i_undefined);
								} else {
									if (option.EditCmdhandler && jQuery.isFunction(option.EditCmdhandler)) {
										option.EditCmdhandler.call(this, jQuery("#bbit-cs-buddle").data("cdata"));
									}
								}
								jQuery("#bbit-cs-buddle").css("visibility", "hidden");
								return false;
							});
							bud.click(function () {
								return false;
							});
						}
						var pos = getbuddlepos(e.pageX, e.pageY);
						if (pos.hide) {
							jQuery("#prong1").hide();
						} else {
							jQuery("#prong1").show();
						}
						var ss = [];
						var iscos = DateDiff("d", data[2], data[3]) !== 0;
						ss.push(dateFormat.call(data[2], i18n.xgcalendar.dateformat.Md3), " (", __WDAY[data[2].getDay()], ")");
						if (data[4] != 1) {
							if (option.TwelveHourFormat === true) {
								ss.push(" ", timeFormat(data[2].getHours() + ":" + data[2].getMinutes()));
							} else {
								ss.push(",", dateFormat.call(data[2], "HH:mm"));
							}
						}
						if (iscos) {
							ss.push(" - ", dateFormat.call(data[3], i18n.xgcalendar.dateformat.Md3), " (", __WDAY[data[3].getDay()], ")");
							if (data[4] != 1) {
								if (option.TwelveHourFormat === true) {
									ss.push(" ", timeFormat(data[3].getHours() + ":" + data[3].getMinutes()));
								} else {
									ss.push(",", dateFormat.call(data[3], "HH:mm"));
								}
							} else if (data[4] = 1) {
								ss.push(" [" + i18n.xgcalendar.allday_event + "]");
							}
						} else {
							if (option.TwelveHourFormat === true) {
								data[4] != 1 ? ss.push(" - ", timeFormat(data[3].getHours() + ":" + data[3].getMinutes())) : ss.push(" [" + i18n.xgcalendar.allday_event + "]");
							} else {
								data[4] != 1 ? ss.push(" - ", dateFormat.call(data[3], "HH:mm")) : ss.push(" [" + i18n.xgcalendar.allday_event + "]");
							}
						}
						var ts = jQuery("#bbit-cs-buddle-timeshow").html(ss.join(""));
						jQuery("#bbit-cs-what").html(data[1]);
						jQuery("#bbit-cs-id").val(data[0]);
						bud.data("cdata", data);
						bud.css({
							"visibility": "visible",
							left: pos.left,
							top: pos.top
						});
						jQuery(document).one("click", function () {
							jQuery("#bbit-cs-buddle").css("visibility", "hidden");
						});
					} else if (option.PopUpBubble === false) {
						option.EditCmdhandler.call(this, data);
					}
				} else {
					if (!option.ViewCmdhandler) {
						alert("ViewCmdhandler" + i18n.xgcalendar.i_undefined);
					} else {
						if (option.ViewCmdhandler && jQuery.isFunction(option.ViewCmdhandler)) {
							option.ViewCmdhandler.call(this, data);
						}
					}
				}
			} else {
				alert(i18n.xgcalendar.data_format_error);
			}
			return false;
		}
		function moreshow(mv) {
			var me = jQuery(this);
			var divIndex = mv.id.split('_')[1];
			var pdiv = jQuery(mv);
			var offsetMe = me.position();
			var offsetP = pdiv.position();
			var width = (me.width() + 2) * 1.5;
			var top = offsetP.top + 15;
			var left = offsetMe.left;
			var daystr = this.abbr;
			var arrdays = daystr.split('/');
			var day = new Date(daystr);
			var cc = jQuery("#cal-month-cc");
			var ccontent = jQuery("#cal-month-cc-content table tbody");
			var ctitle = jQuery("#cal-month-cc-title");
			ctitle.html(dateFormat.call(day, i18n.xgcalendar.dateformat.Md3) + " " + __WDAY[day.getDay()]);
			ccontent.empty();
			var edata = jQuery("#gridEvent").data("mvdata");
			var events = edata[divIndex];
			var index = parseInt(this.axis, 10);
			var htm = [];
			for (var i = 0; i <= index; i++) {
				var ec = events[i] ? events[i].length : 0;
				for (var j = 0; j < ec; j++) {
					var e = events[i][j];
					if (e) {
						if ((e.colSpan + i - 1) >= index) {
							htm.push("<tr><td class='st-c'>");
							htm.push(BuildMonthDayEvent(e, day, 1));
							htm.push("</td></tr>");
						}
					}
				}
			}
			ccontent.html(htm.join(""));
			ccontent.find("div.rb-o").each(function (i) {
				jQuery(this).click(dayshow);
			});
			edata = events = null;
			var height = cc.height();
			var maxleft = document.documentElement.clientWidth;
			var maxtop = document.documentElement.clientHeight;
			if (left + width >= maxleft) {
				left = offsetMe.left - (me.width() + 2) * 0.5;
			}
			if (top + height >= maxtop) {
				top = maxtop - height - 2;
			}
			var newOff = {
				left: left,
				top: top,
				"z-index": 180,
				width: width,
				"visibility": "visible"
			};
			cc.css(newOff);
			jQuery(document).one("click", closeCc);
			return false;
		}
		function dayupdate(data, start, end) {
			if (option.quickUpdateUrl !== "" && data[8] == 1 && option.readonly !== true) {
				if (option.isloading) {
					return false;
				}
				option.isloading = true;
				var id = data[0];
				var os = data[2];
				var od = data[3];
				var ad = data[4];
				var groupname = data[13];
				var _timestamp = new Date().getTime();
				var zone = new Date().getTimezoneOffset() / 60 * -1;
				var param = [{
						"name": "calendarId",
						value: id
					}, {
						"name": "Calendarstarttime",
						value: dateFormat.call(start, i18n.xgcalendar.dateformat.fulldayvalue + " HH:mm")
					}, {
						"name": "Calendarendtime",
						value: dateFormat.call(end, i18n.xgcalendar.dateformat.fulldayvalue + " HH:mm")
					}, {
						"name": "timezone",
						value: zone
					}, {
						"name": "groupname",
						value: removeHTMLTags(groupname)
					}, {
						name: "time_stamp",
						value: _timestamp
					}, {
						name: "IsAllDayEvent",
						value: ad
					}, {
						name: "dot_net_tzname",
						value: i18n.xgcalendar.dot_net_tzname
					}
				];
				if (option.extParam) {
					for (var pi = 0; pi < option.extParam.length; pi++) {
						param[param.length] = option.extParam[pi];
					}
				}
				var d;
				if (option.quickUpdateHandler && jQuery.isFunction(option.quickUpdateHandler)) {
					option.quickUpdateHandler.call(this, param);
				} else {
					option.onBeforeRequestData && option.onBeforeRequestData(4);
					var jqxhr = jQuery.post(option.quickUpdateUrl, param, function (data) {
							if (data) {
								if (data.IsSuccess === true) {
									option.isloading = false;
									option.onAfterRequestData && option.onAfterRequestData(4);
								} else {
									option.onRequestDataError && option.onRequestDataError(4, data);
									option.isloading = false;
									d = rebyKey(id, true);
									d[2] = os;
									d[3] = od;
									Ind(d);
									render();
									d = null;
									option.onAfterRequestData && option.onAfterRequestData(4);
								}
							}
						}, "json");
					jqxhr.fail(function (jqxhr) {
						var type = 4;
						var err_resp = jqxhr.responseText;
						var err_code = jqxhr.status;
						var err_status = jqxhr.statusText;
						option.onRequestDataError && option.onRequestDataError(type, err_resp, err_code, err_status);
						option.isloading = false;
						d = rebyKey(id, true);
						d[2] = os;
						d[3] = od;
						Ind(d);
						render();
						d = null;
						option.onAfterRequestData && option.onAfterRequestData(4);
					});
					d = rebyKey(id, true);
					if (d) {
						d[2] = start;
						d[3] = end;
						if (option.view == "schedule") {
							d[13] = groupname;
						}
					}
					Ind(d);
					render();
				}
			}
		}
		function quickadd(start, end, isallday, pos, resourceName) {
			if ((!option.quickAddHandler && option.quickAddUrl === "") || option.readonly) {
				return;
			}
			var buddle = jQuery("#bbit-cal-buddle");
			if (buddle.length === 0) {
				var temparr = [];
				temparr.push('<div id="bbit-cal-buddle" style="z-index: 180; width: 400px;visibility:hidden;" class="bubble">');
				temparr.push('<table class="bubble-table" cellSpacing="0" cellPadding="0"><tbody><tr><td class="bubble-cell-side"><div id="tl1" class="bubble-corner"><div class="bubble-sprite bubble-tl"></div></div>');
				temparr.push('<td class="bubble-cell-main"><div class="bubble-top"></div><td class="bubble-cell-side"><div id="tr1" class="bubble-corner"><div class="bubble-sprite bubble-tr"></div></div>  <tr><td class="bubble-mid" colSpan="3"><div style="overflow: hidden" id="bubbleContent1"><div><div></div><div class="cb-root">');
				temparr.push('<table class="cb-table" cellSpacing="0" cellPadding="0"><tbody><tr><th class="cb-key">');
				temparr.push(i18n.xgcalendar.time, ':</th><td class=cb-value><div id="bbit-cal-buddle-timeshow"></div></td></tr><tr><th class="cb-key">');
				temparr.push(i18n.xgcalendar.content, ':</th><td class="cb-value"><div class="textbox-fill-wrapper"><div class="textbox-fill-mid"><input id="bbit-cal-what" class="textbox-fill-input"/></div></div><div class="cb-example">');
				temparr.push(i18n.xgcalendar.example, '</div></td></tr></tbody></table><input id="bbit-cal-start" type="hidden"/><input id="bbit-cal-end" type="hidden"/><input id="bbit-cal-allday" type="hidden"/><input id="bbit-cal-resource" type="hidden"/><input id="bbit-cal-quickAddBTN" value="');
				temparr.push(i18n.xgcalendar.create_event, '" type="button"/>&nbsp; <SPAN id="bbit-cal-editLink" class="lk">');
				temparr.push(i18n.xgcalendar.update_detail, ' <StrONG>&gt;&gt;</StrONG></SPAN></div></div></div><tr><td><div id="bl1" class="bubble-corner"><div class="bubble-sprite bubble-bl"></div></div><td><div class="bubble-bottom"></div><td><div id="br1" class="bubble-corner"><div class="bubble-sprite bubble-br"></div></div></tr></tbody></table><div id="bubbleClose1" class="bubble-closebutton"></div><div id="prong2" class="prong"><div class=bubble-sprite></div></div></div>');
				var tempquickAddHanler = temparr.join("");
				temparr = null;
				jQuery(document.body).append(tempquickAddHanler);
				buddle = jQuery("#bbit-cal-buddle");
				var calbutton = jQuery("#bbit-cal-quickAddBTN");
				var lbtn = jQuery("#bbit-cal-editLink");
				var closebtn = jQuery("#bubbleClose1").click(function () {
						jQuery("#bbit-cal-buddle").css("visibility", "hidden");
						realsedragevent();
					});
				calbutton.click(function (e) {
					if (option.isloading) {
						return false;
					}
					option.isloading = true;
					var what = jQuery("#bbit-cal-what").val();
					var datestart = jQuery("#bbit-cal-start").val();
					var dateend = jQuery("#bbit-cal-end").val();
					var allday = jQuery("#bbit-cal-allday").val();
					if (option.view == 'schedule') {
						var groupname = jQuery("#bbit-cal-resource").val();
						groupname = removeHTMLTags(groupname);
					} else {
						var groupname = "";
					}
					var f = /^[^\$\<\>]+$/.test(what);
					if (!f) {
						alert(i18n.xgcalendar.invalid_title);
						jQuery("#bbit-cal-what").focus();
						option.isloading = false;
						return false;
					}
					var zone = new Date().getTimezoneOffset() / 60 * -1;
					var _timestamp = new Date().getTime();
					start = new Date(datestart);
					end = new Date(dateend);
					var param = [{
							"name": "CalendarTitle",
							value: what
						}, {
							"name": "Calendarstarttime",
							value: dateFormat.call(start, i18n.xgcalendar.dateformat.fulldayvalue + " HH:mm")
						}, {
							"name": "Calendarendtime",
							value: dateFormat.call(end, i18n.xgcalendar.dateformat.fulldayvalue + " HH:mm")
						}, {
							"name": "IsAllDayEvent",
							value: allday
						}, {
							"name": "timezone",
							value: zone
						}, {
							"name": "groupname",
							value: removeHTMLTags(groupname)
						}, {
							name: "time_stamp",
							value: _timestamp
						}, {
							name: "dot_net_tzname",
							value: i18n.xgcalendar.dot_net_tzname
						}
					];
					if (option.extParam) {
						for (var pi = 0; pi < option.extParam.length; pi++) {
							param[param.length] = option.extParam[pi];
						}
					}
					if (option.quickAddHandler && jQuery.isFunction(option.quickAddHandler)) {
						option.quickAddHandler.call(this, param);
						jQuery("#bbit-cal-buddle").css("visibility", "hidden");
						realsedragevent();
					} else {
						jQuery("#bbit-cal-buddle").css("visibility", "hidden");
						var newdata = [];
						var tId = -1;
						option.onBeforeRequestData && option.onBeforeRequestData(2);
						var jqxhr = jQuery.post(option.quickAddUrl, param, function (data) {
								if (data) {
									if (data.IsSuccess === true) {
										option.isloading = false;
										option.eventItems[tId][0] = data.Data;
										option.eventItems[tId][8] = 1;
										render();
										option.onAfterRequestData && option.onAfterRequestData(2);
									} else {
										option.onRequestDataError && option.onRequestDataError(2, data);
										option.isloading = false;
										option.onAfterRequestData && option.onAfterRequestData(2);
									}
								}
							}, "json");
						jqxhr.fail(function (jqxhr) {
							var type = 2;
							var err_resp = jqxhr.responseText;
							var err_code = jqxhr.status;
							var err_status = jqxhr.statusText;
							option.onRequestDataError && option.onRequestDataError(type, err_resp, err_code, err_status);
							option.isloading = false;
							option.onAfterRequestData && option.onAfterRequestData(2);
						});
						newdata.push(-1, what);
						var sd = strtodate(datestart);
						var ed = strtodate(dateend);
						var diff = DateDiff("d", sd, ed);
						newdata.push(sd, ed, allday == "1" ? 1 : 0, diff > 0 ? 1 : 0, 0);
						newdata.push(-1, 0, "", "");
						if (option.view == "schedule") {
							newdata.push("", 0, groupname, "");
						}
						tId = Ind(newdata);
						realsedragevent();
						render();
					}
				});
				lbtn.click(function (e) {
					if (!option.EditCmdhandler) {
						alert("EditCmdhandler" + i18n.xgcalendar.i_undefined);
					} else {
						if (option.EditCmdhandler && jQuery.isFunction(option.EditCmdhandler)) {
							var resource_name = "";
							if (option.view == "schedule") {
								resource_name = removeHTMLTags(jQuery("#bbit-cal-resource").val());
							}
							option.EditCmdhandler.call(this, ['0', jQuery("#bbit-cal-what").val(), jQuery("#bbit-cal-start").val(), jQuery("#bbit-cal-end").val(), jQuery("#bbit-cal-allday").val(), '0', '0', '0', '0', '0', '0', '0', '0', resource_name]);
						}
						jQuery("#bbit-cal-buddle").css("visibility", "hidden");
						realsedragevent();
					}
					return false;
				});
				buddle.mousedown(function (e) {
					return false;
				});
			}
			if (isallday) {
				var dateshow = CalDateShow(start, end, !isallday, true) + " [" + i18n.xgcalendar.allday_event + "]";
			} else {
				if (option.TwelveHourFormat === true) {
					var dateshow = CalDateShow(start, end, !isallday, true) + " " + timeFormat(start.getHours() + ":" + start.getMinutes()) + " - " + timeFormat(end.getHours() + ":" + end.getMinutes());
				} else {
					var dateshow = CalDateShow(start, end, !isallday, true);
				}
			}
			var off = getbuddlepos(pos.left, pos.top);
			if (off.hide) {
				jQuery("#prong2").hide();
			} else {
				jQuery("#prong2").show();
			}
			jQuery("#bbit-cal-buddle-timeshow").html(dateshow);
			var calwhat = jQuery("#bbit-cal-what").val("");
			jQuery("#bbit-cal-allday").val(isallday ? "1" : "0");
			jQuery("#bbit-cal-start").val(dateFormat.call(start, i18n.xgcalendar.dateformat.fulldayvalue + " HH:mm"));
			jQuery("#bbit-cal-end").val(dateFormat.call(end, i18n.xgcalendar.dateformat.fulldayvalue + " HH:mm"));
			if (option.view == 'schedule') {
				jQuery("#bbit-cal-resource").val(resourceName);
			} else {
				jQuery("#bbit-cal-resource").val("");
			}
			if (option.PopUpEditBubble === false) {
				option.EditCmdhandler.call(this, ['0', jQuery("#bbit-cal-what").val(), jQuery("#bbit-cal-start").val(), jQuery("#bbit-cal-end").val(), jQuery("#bbit-cal-allday").val(), jQuery("#bbit-cal-resource").val()]);
			} else {
				buddle.css({
					"visibility": "visible",
					left: off.left,
					top: off.top
				});
				calwhat.blur().focus();
			}
			jQuery(document).one("mousedown", function () {
				jQuery("#bbit-cal-buddle").css("visibility", "hidden");
				realsedragevent();
			});
			return false;
		}
		function strtodate(str) {
			var arr = str.split(" ");
			var arr2 = arr[0].split(i18n.xgcalendar.dateformat.separator);
			var arr3 = arr[1].split(":");
			var y = arr2[i18n.xgcalendar.dateformat.year_index];
			var m = arr2[i18n.xgcalendar.dateformat.month_index].indexOf("0") === 0 ? arr2[i18n.xgcalendar.dateformat.month_index].substr(1, 1) : arr2[i18n.xgcalendar.dateformat.month_index];
			var d = arr2[i18n.xgcalendar.dateformat.day_index].indexOf("0") === 0 ? arr2[i18n.xgcalendar.dateformat.day_index].substr(1, 1) : arr2[i18n.xgcalendar.dateformat.day_index];
			var h = arr3[0].indexOf("0") === 0 ? arr3[0].substr(1, 1) : arr3[0];
			var n = arr3[1].indexOf("0") === 0 ? arr3[1].substr(1, 1) : arr3[1];
			return new Date(y, parseInt(m, 10) - 1, d, h, n);
		}
		function rebyKey(key, remove) {
			if (option.eventItems && option.eventItems.length > 0) {
				var sl = option.eventItems.length;
				var i = -1;
				for (var j = 0; j < sl; j++) {
					if (option.eventItems[j][0] == key) {
						i = j;
						break;
					}
				}
				if (i >= 0) {
					var t = option.eventItems[i];
					if (remove) {
						option.eventItems.splice(i, 1);
					}
					return t;
				}
			}
			return null;
		}
		function Ind(event, i) {
			var d = 0;
			if (!i) {
				if (option.eventItems && option.eventItems.length > 0) {
					var sl = option.eventItems.length;
					var s = event[2];
					var d1 = s.getTime() - option.eventItems[0][2].getTime();
					var d2 = option.eventItems[sl - 1][2].getTime() - s.getTime();
					var diff = d1 - d2;
					if (d1 < 0 || diff < 0) {
						for (var j = 0; j < sl; j++) {
							if (option.eventItems[j][2] >= s) {
								i = j;
								break;
							}
						}
					} else if (d2 < 0) {
						i = sl;
					} else {
						for (var j = sl - 1; j >= 0; j--) {
							if (option.eventItems[j][2] < s) {
								i = j + 1;
								break;
							}
						}
					}
				} else {
					i = 0;
				}
			} else {
				d = 1;
			}
			if (option.eventItems && option.eventItems.length > 0) {
				if (i == option.eventItems.length) {
					option.eventItems.push(event);
				} else {
					option.eventItems.splice(i, d, event);
				}
			} else {
				option.eventItems = [event];
			}
			return i;
		}
		function ResizeView() {
			var _MH = document.documentElement.clientHeight;
			var _viewType = option.view;
			if (_viewType == "day" || _viewType == "week" || _viewType == "workweek" || _viewType == "schedule" || _viewType == "custom") {
				var jQuerydvwkcontaienr = jQuery("#dvwkcontaienr");
				var jQuerydvtec = jQuery("#dvtec");
				if (jQuerydvwkcontaienr.length === 0 || jQuerydvtec.length === 0) {
					alert(i18n.xgcalendar.view_no_ready);
					return;
				}
				var dvwkH = jQuerydvwkcontaienr.height() + 2;
				var calH = option.height - 8 - dvwkH;
				jQuerydvtec.height(calH);
				if (typeof(option.scoll) == "undefined") {
					var currentday = new Date();
					var h = currentday.getHours();
					var m = currentday.getMinutes();
					var th = gP(h, m);
					var ch = jQuerydvtec.attr("clientHeight");
					var sh = th - 0.5 * ch;
					var ph = jQuerydvtec.attr("scrollHeight");
					if (sh < 0)
						sh = 0;
					if (sh > ph - ch)
						sh = ph - ch - 10 * (23 - h);
					jQuerydvtec.attr("scrollTop", sh);
				} else {
					jQuerydvtec.attr("scrollTop", option.scoll);
				}
			} else if (_viewType == "month") {}
		}
		function returnfalse() {
			return false;
		}
		function initevents(viewtype) {
			if (viewtype == "week" || viewtype == "day" || viewtype == "workweek" || viewtype == "schedule" || viewtype == "custom") {
				jQuery("div.chip", gridcontainer).each(function (i) {
					var chip = jQuery(this);
					chip.click(dayshow);
					if (chip.hasClass("drag")) {
						chip.mousedown(function (e) {
							dragStart.call(this, "dw3", e);
							return false;
						});
						chip.find("div.resizer").mousedown(function (e) {
							dragStart.call(jQuery(this).parent().parent(), "dw4", e);
							return false;
						});
					} else {
						chip.mousedown(returnfalse);
					}
				});
				jQuery("div.rb-o", gridcontainer).each(function (i) {
					var chip = jQuery(this);
					chip.click(dayshow);
					if (chip.hasClass("drag") && (viewtype == "week" || viewtype == "workweek" || viewtype == "schedule" || viewtype == "custom")) {
						chip.mousedown(function (e) {
							dragStart.call(this, "dw5", e);
							return false;
						});
					} else {
						chip.mousedown(returnfalse);
					}
				});
				if (option.readonly === false) {
					jQuery("td.tg-col", gridcontainer).each(function (i) {
						jQuery(this).mousedown(function (e) {
							dragStart.call(this, "dw1", e);
							return false;
						});
					});
					if (option.view == "schedule") {
						jQuery("#weekViewAllDaywk").mousedown(function (e) {
							dragStart.call(this, "dw2", e);
							return false;
						});
					} else {
						jQuery("#weekViewAllDaywk").mousedown(function (e) {
							dragStart.call(this, "dw2", e);
							return false;
						});
					}
				}
				if (viewtype == "week" || viewtype == "workweek" || viewtype == "schedule" || viewtype == "custom") {
					jQuery("#dvwkcontaienr th.gcweekname").each(function (i) {
						if (viewtype != "schedule") {
							jQuery(this).click(weekormonthtoday);
						}
					});
				}
			} else if (viewtype == "month") {
				jQuery("div.rb-o", gridcontainer).each(function (i) {
					var chip = jQuery(this);
					chip.click(dayshow);
					if (chip.hasClass("drag")) {
						chip.mousedown(function (e) {
							dragStart.call(this, "m2", e);
							return false;
						});
					} else {
						chip.mousedown(returnfalse);
					}
				});
				jQuery("td.st-more", gridcontainer).each(function (i) {
					jQuery(this).click(function (e) {
						moreshow.call(this, jQuery(this).parent().parent().parent().parent()[0]);
						return false;
					}).mousedown(function () {
						return false;
					});
				});
				if (option.readonly === false) {
					jQuery("#mvEventContainer").mousedown(function (e) {
						dragStart.call(this, "m1", e);
						return false;
					});
				}
			}
		}
		function realsedragevent() {
			if (_dragevent) {
				_dragevent();
				_dragevent = null;
			}
		}
		function dragStart(type, e) {
			var obj = jQuery(this);
			var source = e.srcElement || e.target;
			var col_index = e.target.cellIndex;
			realsedragevent();
			switch (type) {
			case "dw1":
				var evid = source.id.replace("tgCol", "");
				_dragdata = {
					type: 1,
					target: obj,
					sx: e.pageX,
					sy: e.pageY,
					cdi: parseInt(evid, 10)
				};
				break;
			case "dw2":
				var w = obj.width();
				var h = obj.height();
				var offset = obj.offset();
				var left = offset.left;
				var top = offset.top;
				var l = option.view === "day" ? 1 : 7;
				option.view === "workweek" && l === 7 ? l = 5 : l = l;
				option.view === "schedule" ? l = 1 : l = l;
				option.view === "custom" ? l = option.DaysToShow : l = l;
				var py = w % l;
				var pw = parseInt(w / l, 10);
				if (py > l / 2 + 1) {
					pw++;
				}
				var xa = [];
				var ya = [];
				for (var i = 0; i < l; i++) {
					xa.push({
						s: i * pw + left,
						e: (i + 1) * pw + left
					});
				}
				ya.push({
					s: top,
					e: top + h
				});
				_dragdata = {
					type: 2,
					target: obj,
					sx: e.pageX,
					sy: e.pageY,
					pw: pw,
					xa: xa,
					ya: ya,
					h: h,
					cdi: col_index
				};
				w = left = l = py = pw = xa = null;
				break;
			case "dw3":
				var evid = obj.parent().attr("id").replace("tgCol", "");
				var p = obj.parent();
				var pos = p.offset();
				var w = p.width() + 10;
				var h = obj.height();
				var data = getdata(obj);
				_dragdata = {
					type: 4,
					target: obj,
					sx: e.pageX,
					sy: e.pageY,
					pXMin: pos.left,
					pXMax: pos.left + w,
					pw: w,
					h: h,
					cdi: parseInt(evid, 10),
					fdi: parseInt(evid, 10),
					data: data
				};
				break;
			case "dw4":
				var h = obj.height();
				var data = getdata(obj);
				_dragdata = {
					type: 5,
					target: obj,
					sx: e.pageX,
					sy: e.pageY,
					h: h,
					data: data
				};
				break;
			case "dw5":
				var con = jQuery("#weekViewAllDaywk");
				var w = con.width();
				var h = con.height();
				var offset = con.offset();
				var moffset = obj.offset();
				var left = offset.left;
				var top = offset.top;
				var l;
				option.view === "workweek" ? l = 5 : l = 7;
				option.view === "schedule" ? l = option.GroupName.length : l = l;
				option.view === "custom" ? l = option.DaysToShow : l = l;
				var py = w % l;
				var pw = parseInt(w / l, 10);
				if (py > l / 2 + 1) {
					pw++;
				}
				var xa = [];
				var ya = [];
				var di = 0;
				for (var i = 0; i < l; i++) {
					xa.push({
						s: i * pw + left,
						e: (i + 1) * pw + left
					});
					if (moffset.left >= xa[i].s && moffset.left < xa[i].e) {
						di = i;
					}
				}
				var fdi = {
					x: di,
					y: 0,
					di: di
				};
				ya.push({
					s: top,
					e: top + h
				});
				var data = getdata(obj);
				var dp = DateDiff("d", data[2], data[3]) + 1;
				var evid;
				_dragdata = {
					type: 6,
					target: obj,
					sx: e.pageX,
					sy: e.pageY,
					data: data,
					xa: xa,
					ya: ya,
					fdi: fdi,
					h: h,
					dp: dp,
					pw: pw,
					cdi: parseInt(evid, 10)
				};
				break;
			case "m1":
				var w = obj.width();
				var offset = obj.offset();
				var left = offset.left;
				var top = offset.top;
				var l = 7;
				var yl = obj.children().length;
				var py = w % l;
				var pw = parseInt(w / l, 10);
				if (py > l / 2 + 1) {
					pw++;
				}
				var h = jQuery("#mvrow_0").height();
				var xa = [];
				var ya = [];
				for (var i = 0; i < l; i++) {
					xa.push({
						s: i * pw + left,
						e: (i + 1) * pw + left
					});
				}
				var xa = [];
				var ya = [];
				for (var i = 0; i < l; i++) {
					xa.push({
						s: i * pw + left,
						e: (i + 1) * pw + left
					});
				}
				for (var i = 0; i < yl; i++) {
					ya.push({
						s: i * h + top,
						e: (i + 1) * h + top
					});
				}
				_dragdata = {
					type: 3,
					target: obj,
					sx: e.pageX,
					sy: e.pageY,
					pw: pw,
					xa: xa,
					ya: ya,
					h: h
				};
				break;
			case "m2":
				var row0 = jQuery("#mvrow_0");
				var row1 = jQuery("#mvrow_1");
				var w = row0.width();
				var offset = row0.offset();
				var diffset = row1.offset();
				var moffset = obj.offset();
				var h = diffset.top - offset.top;
				var left = offset.left;
				var top = offset.top;
				var l = 7;
				var yl = row0.parent().children().length;
				var py = w % l;
				var pw = parseInt(w / l, 10);
				if (py > l / 2 + 1) {
					pw++;
				}
				var xa = [];
				var ya = [];
				var xi = 0;
				var yi = 0;
				for (var i = 0; i < l; i++) {
					xa.push({
						s: i * pw + left,
						e: (i + 1) * pw + left
					});
					if (moffset.left >= xa[i].s && moffset.left < xa[i].e) {
						xi = i;
					}
				}
				for (var i = 0; i < yl; i++) {
					ya.push({
						s: i * h + top,
						e: (i + 1) * h + top
					});
					if (moffset.top >= ya[i].s && moffset.top < ya[i].e) {
						yi = i;
					}
				}
				var fdi = {
					x: xi,
					y: yi,
					di: yi * 7 + xi
				};
				var data = getdata(obj);
				var dp = DateDiff("d", data[2], data[3]) + 1;
				_dragdata = {
					type: 7,
					target: obj,
					sx: e.pageX,
					sy: e.pageY,
					data: data,
					xa: xa,
					ya: ya,
					fdi: fdi,
					h: h,
					dp: dp,
					pw: pw
				};
				break;
			}
			jQuery('body').noSelect();
		}
		function dragMove(e) {
			if (_dragdata) {
				if (e.pageX < 0 || e.pageY < 0 || e.pageX > document.documentElement.clientWidth || e.pageY >= document.documentElement.clientHeight) {
					dragEnd(e);
					return false;
				}
				var d = _dragdata;
				switch (d.type) {
				case 1:
					var sy = d.sy;
					var y = e.pageY;
					var diffy = y - sy;
					if (diffy > 11 || diffy < -11 || d.cpwrap) {
						if (diffy === 0) {
							diffy = 21;
						}
						var dy = diffy % 21;
						if (dy !== 0) {
							diffy = dy > 0 ? diffy + 21 - dy : diffy - 21 - dy;
							y = d.sy + diffy;
							if (diffy < 0) {
								sy = sy + 21;
							}
						}
						if (!d.tp) {
							d.tp = jQuery(d.target).offset().top;
						}
						var gh = gH(sy, y, d.tp);
						var ny = gP(gh.sh, gh.sm);
						var tempdata;
						if (!d.cpwrap) {
							tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h);
							var cpwrap = jQuery("<div class='ca-evpi drag-chip-wrapper' style='top:" + ny + "px'/>").html(tempdata);
							jQuery(d.target).find("div.tg-col-overlaywrapper").append(cpwrap);
							d.cpwrap = cpwrap;
						} else {
							if (d.cgh.sh != gh.sh || d.cgh.eh != gh.eh || d.cgh.sm != gh.sm || d.cgh.em != gh.em) {
								tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h);
								d.cpwrap.css("top", ny + "px").html(tempdata);
							}
						}
						d.cgh = gh;
					}
					break;
				case 2:
					var sx = d.sx;
					var x = e.pageX;
					var diffx = x - sx;
					if (diffx > 5 || diffx < -5 || d.lasso) {
						if (!d.lasso) {
							d.lasso = jQuery("<div style='z-index: 10; display: block' class='drag-lasso-container'/>");
							jQuery(document.body).append(d.lasso);
						}
						if (!d.sdi) {
							d.sdi = getdi(d.xa, d.ya, sx, d.sy);
						}
						var ndi = getdi(d.xa, d.ya, x, e.pageY);
						if (!d.fdi || d.fdi.di != ndi.di) {
							addlasso(d.lasso, d.sdi, ndi, d.xa, d.ya, d.h);
						}
						d.fdi = ndi;
					}
					break;
				case 3:
					var sx = d.sx;
					var x = e.pageX;
					var sy = d.sy;
					var y = e.pageY;
					var diffx = x - sx;
					var diffy = y - sy;
					if (diffx > 5 || diffx < -5 || diffy < -5 || diffy > 5 || d.lasso) {
						if (!d.lasso) {
							d.lasso = jQuery("<div style='z-index: 10; display: block' class='drag-lasso-container'/>");
							jQuery(document.body).append(d.lasso);
						}
						if (!d.sdi) {
							d.sdi = getdi(d.xa, d.ya, sx, sy);
						}
						var ndi = getdi(d.xa, d.ya, x, y);
						if (!d.fdi || d.fdi.di != ndi.di) {
							addlasso(d.lasso, d.sdi, ndi, d.xa, d.ya, d.h);
						}
						d.fdi = ndi;
					}
					break;
				case 4:
					var data = d.data;
					var recurr_test = data !== null ? data[6] : 0;
					if (recurr_test === 1 && option.Drag_Recurring === false) {
						break;
					}
					if (data !== null && data[8] === 1) {
						var sx = d.sx;
						var x = e.pageX;
						var sy = d.sy;
						var y = e.pageY;
						var diffx = x - sx;
						var diffy = y - sy;
						if (diffx > 5 || diffx < -5 || diffy > 5 || diffy < -5 || d.cpwrap) {
							var gh,
							ny,
							tempdata;
							if (!d.cpwrap) {
								gh = {
									sh: data[2].getHours(),
									sm: data[2].getMinutes(),
									eh: data[3].getHours(),
									em: data[3].getMinutes(),
									h: d.h
								};
								d.target.hide();
								ny = gP(gh.sh, gh.sm);
								d.top = ny;
								tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h, data[1], false, false, data[7]);
								var cpwrap = jQuery("<div class='ca-evpi drag-chip-wrapper' style='top:" + ny + "px'/>").html(tempdata);
								var evid = d.target.parent().attr("id").replace("tgCol", "#tgOver");
								jQuery(evid).append(cpwrap);
								d.cpwrap = cpwrap;
								d.ny = ny;
							} else {
								var pd = 0;
								if (x < d.pXMin) {
									pd = -1;
								} else if (x > d.pXMax) {
									pd = 1;
								}
								if (pd !== 0) {
									d.cdi = d.cdi + pd;
									var ov = jQuery("#tgOver" + d.cdi);
									if (ov.length == 1) {
										d.pXMin = d.pXMin + d.pw * pd;
										d.pXMax = d.pXMax + d.pw * pd;
										ov.append(d.cpwrap);
									} else {
										d.cdi = d.cdi - pd;
									}
								}
								ny = d.top + diffy;
								var pny = ny % 21;
								if (pny !== 0) {
									ny = ny - pny;
								}
								if (d.ny != ny) {
									gh = gW(ny, ny + d.h);
									tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h, data[1], false, false, data[7]);
									d.cpwrap.css("top", ny + "px").html(tempdata);
								}
								d.ny = ny;
							}
						}
					}
					break;
				case 5:
					var data = d.data;
					var recurr_test = data !== null ? data[6] : 0;
					if (recurr_test === 1 && option.Drag_Recurring === false) {
						break;
					}
					if (data !== null && data[8] === 1) {
						var sy = d.sy;
						var y = e.pageY;
						var diffy = y - sy;
						if (diffy !== 0 || d.cpwrap) {
							var gh,
							ny,
							tempdata;
							if (!d.cpwrap) {
								gh = {
									sh: data[2].getHours(),
									sm: data[2].getMinutes(),
									eh: data[3].getHours(),
									em: data[3].getMinutes(),
									h: d.h
								};
								d.target.hide();
								ny = gP(gh.sh, gh.sm);
								d.top = ny;
								tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h, data[1], "100%", true, data[7]);
								var cpwrap = jQuery("<div class='ca-evpi drag-chip-wrapper' style='top:" + ny + "px'/>").html(tempdata);
								var evid = d.target.parent().attr("id").replace("tgCol", "#tgOver");
								jQuery(evid).append(cpwrap);
								d.cpwrap = cpwrap;
							} else {
								nh = d.h + diffy;
								var pnh = nh % 21;
								nh = pnh > 1 ? nh - pnh + 21 : nh - pnh;
								if (d.nh != nh) {
									var sp = gP(data[2].getHours(), data[2].getMinutes());
									var ep = sp + nh;
									gh = gW(d.top, d.top + nh);
									tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h, data[1], "100%", true, data[7]);
									d.cpwrap.html(tempdata);
								}
								d.nh = nh;
							}
						}
					}
					break;
				case 6:
					var data = d.data;
					var recurr_test = data !== null ? data[6] : 0;
					if (recurr_test === 1 && option.Drag_Recurring === false) {
						break;
					}
					var sx = d.sx;
					var x = e.pageX;
					var y = e.pageY;
					var diffx = x - sx;
					if (diffx > 5 || diffx < -5 || d.lasso) {
						if (!d.lasso) {
							var w1 = d.dp > 1 ? (d.pw - 4) * 1.5 : (d.pw - 4);
							var cp = d.target.clone();
							if (d.dp > 1) {
								cp.find("div.rb-i>span").prepend("(" + d.dp + " " + i18n.xgcalendar.day_plural + ")&nbsp;");
							}
							var cpwrap = jQuery("<div class='drag-event st-contents' style='width:" + w1 + "px'/>").append(cp).appendTo(document.body);
							d.cpwrap = cpwrap;
							d.lasso = jQuery("<div style='z-index: 10; display: block' class='drag-lasso-container'/>");
							jQuery(document.body).append(d.lasso);
							cp = cpwrap = null;
						}
						fixcppostion(d.cpwrap, e, d.xa, d.ya);
						var ndi = getdi(d.xa, d.ya, x, e.pageY);
						if (!d.cdi || d.cdi.di != ndi.di) {
							addlasso(d.lasso, ndi, {
								x: ndi.x,
								y: ndi.y,
								di: ndi.di + d.dp - 1
							}, d.xa, d.ya, d.h);
						}
						d.cdi = ndi;
					}
					break;
				case 7:
					var data = d.data;
					var recurr_test = data !== null ? data[6] : 0;
					if (recurr_test === 1 && option.Drag_Recurring === false) {
						break;
					}
					var sx = d.sx;
					var sy = d.sy;
					var x = e.pageX;
					var y = e.pageY;
					var diffx = x - sx;
					var diffy = y - sy;
					if (diffx > 5 || diffx < -5 || diffy > 5 || diffy < -5 || d.lasso) {
						if (!d.lasso) {
							var w1 = d.dp > 1 ? (d.pw - 4) * 1.5 : (d.pw - 4);
							var cp = d.target.clone();
							if (d.dp > 1) {
								cp.find("div.rb-i>span").prepend("(" + d.dp + " " + i18n.xgcalendar.day_plural + ")&nbsp;");
							}
							var cpwrap = jQuery("<div class='drag-event st-contents' style='width:" + w1 + "px'/>").append(cp).appendTo(document.body);
							d.cpwrap = cpwrap;
							d.lasso = jQuery("<div style='z-index: 10; display: block' class='drag-lasso-container'/>");
							jQuery(document.body).append(d.lasso);
							cp = cpwrap = null;
						}
						fixcppostion(d.cpwrap, e, d.xa, d.ya);
						var ndi = getdi(d.xa, d.ya, x, e.pageY);
						if (!d.cdi || d.cdi.di != ndi.di) {
							addlasso(d.lasso, ndi, {
								x: ndi.x,
								y: ndi.y,
								di: ndi.di + d.dp - 1
							}, d.xa, d.ya, d.h);
						}
						d.cdi = ndi;
					}
					break;
				}
			}
			return false;
		}
		function dragEnd(e) {
			if (_dragdata) {
				var d = _dragdata;
				if (option.view == 'schedule') {
					if (typeof d.cdi == "object") {
						var resourceName = jQuery("#sch_tgCol" + d.cdi.x).html();
					} else {
						var resourceName = jQuery("#sch_tgCol" + d.cdi).html();
					}
				}
				switch (d.type) {
				case 1:
					var wrapid = new Date().getTime();
					tp = d.target.offset().top;
					if (!d.cpwrap) {
						var ClickFactor = isNaN(option.OneClickFactor) ? 1 : option.OneClickFactor;
						var gh = gH(d.sy, d.sy + cal_day_week_cell_spacing * ClickFactor, tp);
						var ny = gP(gh.sh, gh.sm);
						var tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h);
						d.cpwrap = jQuery("<div class='ca-evpi drag-chip-wrapper' style='top:" + ny + "px'/>").html(tempdata);
						jQuery(d.target).find("div.tg-col-overlaywrapper").append(d.cpwrap);
						d.cgh = gh;
					}
					var pos = d.cpwrap.offset();
					pos.left = pos.left + 30;
					d.cpwrap.attr("id", wrapid);
					var start = strtodate(d.target.attr("abbr") + " " + d.cgh.sh + ":" + d.cgh.sm);
					var end = strtodate(d.target.attr("abbr") + " " + d.cgh.eh + ":" + d.cgh.em);
					_dragevent = function () {
						jQuery("#" + wrapid).remove();
						jQuery("#bbit-cal-buddle").css("visibility", "hidden");
					};
					if (option.view == 'schedule') {
						quickadd(start, end, false, pos, resourceName);
					} else {
						quickadd(start, end, false, pos);
					}
					break;
				case 2:
				case 3:
					var source = e.srcElement || e.target;
					var lassoid = new Date().getTime();
					if (!d.lasso) {
						if (jQuery(source).hasClass("monthdayshow")) {
							weekormonthtoday.call(jQuery(source).parent()[0], e);
							break;
						}
						d.fdi = d.sdi = getdi(d.xa, d.ya, d.sx, d.sy);
						d.lasso = jQuery("<div style='z-index: 10; display: block' class='drag-lasso-container'/>");
						jQuery(document.body).append(d.lasso);
						addlasso(d.lasso, d.sdi, d.fdi, d.xa, d.ya, d.h);
					}
					d.lasso.attr("id", lassoid);
					var si = Math.min(d.fdi.di, d.sdi.di);
					var ei = Math.max(d.fdi.di, d.sdi.di);
					var firstday = option.vstart;
					var start = DateAdd("d", si, firstday);
					var end = DateAdd("d", ei, firstday);
					_dragevent = function () {
						jQuery("#" + lassoid).remove();
					};
					if (option.view == 'schedule') {
						quickadd(start, end, true, {
							left: e.pageX,
							top: e.pageY
						}, resourceName);
					} else {
						quickadd(start, end, true, {
							left: e.pageX,
							top: e.pageY
						});
					}
					break;
				case 4:
					if (d.cpwrap) {
						if (option.view != "schedule") {
							var start = DateAdd("d", d.cdi, option.vstart);
							var end = DateAdd("d", d.cdi, option.vstart);
						} else {
							var start = DateAdd("d", 0, option.vstart);
							var end = DateAdd("d", 0, option.vstart);
							d.data[13] = resourceName;
						}
						var gh = gW(d.ny, d.ny + d.h);
						start.setHours(gh.sh, gh.sm);
						end.setHours(gh.eh, gh.em);
						if (option.view != 'schedule') {
							if (start.getTime() == d.data[2].getTime() && end.getTime() == d.data[3].getTime()) {
								d.cpwrap.remove();
								d.target.show();
							} else {
								dayupdate(d.data, start, end);
							}
						} else {
							dayupdate(d.data, start, end);
						}
					}
					break;
				case 5:
					if (d.cpwrap) {
						var start = new Date(d.data[2].toString());
						var end = new Date(d.data[3].toString());
						var gh = gW(d.top, d.top + nh);
						start.setHours(gh.sh, gh.sm);
						end.setHours(gh.eh, gh.em);
						if (start.getTime() == d.data[2].getTime() && end.getTime() == d.data[3].getTime()) {
							d.cpwrap.remove();
							d.target.show();
						} else {
							dayupdate(d.data, start, end);
						}
					}
					break;
				case 6:
				case 7:
					if (d.lasso) {
						d.cpwrap.remove();
						d.lasso.remove();
						var start = new Date(d.data[2].toString());
						var end = new Date(d.data[3].toString());
						var currrentdate = DateAdd("d", d.cdi.di, option.vstart);
						var diff = DateDiff("d", start, currrentdate);
						if (option.view != "schedule") {
							start = DateAdd("d", diff, start);
							end = DateAdd("d", diff, end);
						} else {
							start = DateAdd("d", 0, start);
							end = DateAdd("d", 0, end);
							d.data[13] = resourceName;
						}
						if (start.getTime() != d.data[2].getTime() || end.getTime() != d.data[3].getTime()) {
							dayupdate(d.data, start, end);
						} else if (option.view == "schedule") {
							dayupdate(d.data, start, end);
						}
					}
					break;
				}
				d = _dragdata = null;
				jQuery('body').noSelect(false);
				return false;
			}
		}
		function getdi(xa, ya, x, y) {
			var ty = 0;
			var tx = 0;
			var lx = 0;
			var ly = 0;
			if (xa && xa.length !== 0) {
				lx = xa.length;
				if (x >= xa[lx - 1].e) {
					tx = lx - 1;
				} else {
					for (var i = 0; i < lx; i++) {
						if (x > xa[i].s && x <= xa[i].e) {
							tx = i;
							break;
						}
					}
				}
			}
			if (ya && ya.length !== 0) {
				ly = ya.length;
				if (y >= ya[ly - 1].e) {
					ty = ly - 1;
				} else {
					for (var j = 0; j < ly; j++) {
						if (y > ya[j].s && y <= ya[j].e) {
							ty = j;
							break;
						}
					}
				}
			}
			return {
				x: tx,
				y: ty,
				di: ty * lx + tx
			};
		}
		function addlasso(lasso, sdi, edi, xa, ya, height) {
			var diff = sdi.di > edi.di ? sdi.di - edi.di : edi.di - sdi.di;
			diff++;
			var sp = sdi.di > edi.di ? edi : sdi;
			var ep = sdi.di > edi.di ? sdi : edi;
			var l = xa.length > 0 ? xa.length : 1;
			var h = ya.length > 0 ? ya.length : 1;
			var play = [];
			var width = xa[0].e - xa[0].s;
			var i = sp.x;
			var j = sp.y;
			var max = Math.min(document.documentElement.clientWidth, xa[l - 1].e) - 2;
			while (j < h && diff > 0) {
				var left = xa[i].s;
				var d = i + diff > l ? l - i : diff;
				var wid = width * d;
				while (left + wid >= max) {
					wid--;
				}
				play.push(Tp(__LASSOTEMP, {
						left: left,
						top: ya[j].s,
						height: height,
						width: wid
					}));
				i = 0;
				diff = diff - d;
				j++;
			}
			lasso.html(play.join(""));
		}
		function fixcppostion(cpwrap, e, xa, ya) {
			var x = e.pageX - 6;
			var y = e.pageY - 4;
			var w = cpwrap.width();
			var h = 21;
			var lmin = xa[0].s + 6;
			var tmin = ya[0].s + 4;
			var lmax = xa[xa.length - 1].e - w - 2;
			var tmax = ya[ya.length - 1].e - h - 2;
			if (x > lmax) {
				x = lmax;
			}
			if (x <= lmin) {
				x = lmin + 1;
			}
			if (y <= tmin) {
				y = tmin + 1;
			}
			if (y > tmax) {
				y = tmax;
			}
			cpwrap.css({
				left: x,
				top: y
			});
		}
		jQuery(document).mousemove(dragMove).mouseup(dragEnd);
		var c = {
			sv: function (view) {
				if (view == option.view) {
					return;
				}
				clearcontainer();
				option.view = view;
				render();
				dochange();
			},
			rf: function () {
				populate();
			},
			gt: function (d) {
				if (!d) {
					d = new Date();
				}
				option.showday = d;
				render();
				dochange();
			},
			pv: function () {
				switch (option.view) {
				case "day":
					option.showday = DateAdd("d", -1, option.showday);
					break;
				case "week":
					option.showday = DateAdd("w", -1, option.showday);
					break;
				case "workweek":
					option.showday = DateAdd("w", -1, option.showday);
					break;
				case "month":
					option.showday = DateAdd("m", -1, option.showday);
					break;
				case "schedule":
					option.showday = DateAdd("d", -1, option.showday);
					break;
				case "custom":
					option.showday = DateAdd("d", -option.DaysToShow, option.showday);
					break;
				}
				render();
				dochange();
			},
			nt: function () {
				switch (option.view) {
				case "day":
					option.showday = DateAdd("d", 1, option.showday);
					break;
				case "week":
					option.showday = DateAdd("w", 1, option.showday);
					break;
				case "workweek":
					option.showday = DateAdd("w", 1, option.showday);
					break;
				case "month":
					var od = option.showday.getDate();
					option.showday = DateAdd("m", 1, option.showday);
					var nd = option.showday.getDate();
					if (od != nd) {
						option.showday = DateAdd("d", 0 - nd, option.showday);
					}
					break;
				case "schedule":
					option.showday = DateAdd("d", 1, option.showday);
					break;
				case "custom":
					option.showday = DateAdd("d", option.DaysToShow, option.showday);
					break;
				}
				render();
				dochange();
			},
			go: function () {
				return option;
			},
			so: function (p) {
				option = jQuery.extend(option, p);
			}
		};
		this[0].bcal = c;
		return this;
	};
	jQuery.fn.swtichView = function (view) {
		return this.each(function () {
			if (this.bcal) {
				this.bcal.sv(view);
			}
		});
	};
	jQuery.fn.reload = function () {
		return this.each(function () {
			if (this.bcal) {
				this.bcal.rf();
			}
		});
	};
	jQuery.fn.gotoDate = function (d) {
		return this.each(function () {
			if (this.bcal) {
				this.bcal.gt(d);
			}
		});
	};
	jQuery.fn.previousRange = function () {
		return this.each(function () {
			if (this.bcal) {
				this.bcal.pv();
			}
		});
	};
	jQuery.fn.nextRange = function () {
		return this.each(function () {
			if (this.bcal) {
				this.bcal.nt();
			}
		});
	};
	jQuery.fn.BcalGetOp = function () {
		if (this[0].bcal) {
			return this[0].bcal.go();
		}
		return null;
	};
	jQuery.fn.BcalSetOp = function (p) {
		if (this[0].bcal) {
			return this[0].bcal.so(p);
		}
	};
	function timeFormat(timetoformat) {
		var currentTime = new Date('11/28/2008 ' + timetoformat);
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var suffix = "AM";
		if (hours >= 12) {
			suffix = "PM";
			hours = hours - 12;
		}
		if (hours === 0) {
			hours = 12;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		return hours + ":" + minutes + " " + suffix;
	}
	function removeHTMLTags(html) {
		var strInputCode = html.replace(/&(lt|gt);/g, function (strMatch, p1) {
				return (p1 == "lt") ? "<" : ">";
			});
		var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
		return strTagStrippedText;
	}
})(jQuery);
(function (undefined) {
	var moment,
	VERSION = "2.0.0",
	round = Math.round,
	i,
	languages = {},
	hasModule = (typeof module !== 'undefined' && module.exports),
	aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
	formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,
	localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,
	parseMultipleFormatChunker = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,
	parseTokenOneOrTwoDigits = /\d\d?/,
	parseTokenOneToThreeDigits = /\d{1,3}/,
	parseTokenThreeDigits = /\d{3}/,
	parseTokenFourDigits = /\d{1,4}/,
	parseTokenSixDigits = /[+\-]?\d{1,6}/,
	parseTokenWord = /[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i,
	parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i,
	parseTokenT = /T/i,
	parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/,
	isoRegex = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,
	isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',
	isoTimes = [['HH:mm:ss.S', /(T| )\d\d:\d\d:\d\d\.\d{1,3}/], ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/], ['HH:mm', /(T| )\d\d:\d\d/], ['HH', /(T| )\d\d/]],
	parseTimezoneChunker = /([\+\-]|\d\d)/gi,
	proxyGettersAndSetters = 'Month|Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
	unitMillisecondFactors = {
		'Milliseconds': 1,
		'Seconds': 1e3,
		'Minutes': 6e4,
		'Hours': 36e5,
		'Days': 864e5,
		'Months': 2592e6,
		'Years': 31536e6
	},
	formatFunctions = {},
	ordinalizeTokens = 'DDD w W M D d'.split(' '),
	paddedTokens = 'M D H h m s w W'.split(' '),
	formatTokenFunctions = {
		M: function () {
			return this.month() + 1;
		},
		MMM: function (format) {
			return this.lang().monthsShort(this, format);
		},
		MMMM: function (format) {
			return this.lang().months(this, format);
		},
		D: function () {
			return this.date();
		},
		DDD: function () {
			return this.dayOfYear();
		},
		d: function () {
			return this.day();
		},
		dd: function (format) {
			return this.lang().weekdaysMin(this, format);
		},
		ddd: function (format) {
			return this.lang().weekdaysShort(this, format);
		},
		dddd: function (format) {
			return this.lang().weekdays(this, format);
		},
		w: function () {
			return this.week();
		},
		W: function () {
			return this.isoWeek();
		},
		YY: function () {
			return leftZeroFill(this.year() % 100, 2);
		},
		YYYY: function () {
			return leftZeroFill(this.year(), 4);
		},
		YYYYY: function () {
			return leftZeroFill(this.year(), 5);
		},
		a: function () {
			return this.lang().meridiem(this.hours(), this.minutes(), true);
		},
		A: function () {
			return this.lang().meridiem(this.hours(), this.minutes(), false);
		},
		H: function () {
			return this.hours();
		},
		h: function () {
			return this.hours() % 12 || 12;
		},
		m: function () {
			return this.minutes();
		},
		s: function () {
			return this.seconds();
		},
		S: function () {
			return ~~(this.milliseconds() / 100);
		},
		SS: function () {
			return leftZeroFill(~~(this.milliseconds() / 10), 2);
		},
		SSS: function () {
			return leftZeroFill(this.milliseconds(), 3);
		},
		Z: function () {
			var a = -this.zone(),
			b = "+";
			if (a < 0) {
				a = -a;
				b = "-";
			}
			return b + leftZeroFill(~~(a / 60), 2) + ":" + leftZeroFill(~~a % 60, 2);
		},
		ZZ: function () {
			var a = -this.zone(),
			b = "+";
			if (a < 0) {
				a = -a;
				b = "-";
			}
			return b + leftZeroFill(~~(10 * a / 6), 4);
		},
		X: function () {
			return this.unix();
		}
	};
	function padToken(func, count) {
		return function (a) {
			return leftZeroFill(func.call(this, a), count);
		};
	}
	function ordinalizeToken(func) {
		return function (a) {
			return this.lang().ordinal(func.call(this, a));
		};
	}
	while (ordinalizeTokens.length) {
		i = ordinalizeTokens.pop();
		formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i]);
	}
	while (paddedTokens.length) {
		i = paddedTokens.pop();
		formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
	}
	formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);
	function Language() {}
	function Moment(config) {
		extend(this, config);
	}
	function Duration(duration) {
		var data = this._data = {},
		years = duration.years || duration.year || duration.y || 0,
		months = duration.months || duration.month || duration.M || 0,
		weeks = duration.weeks || duration.week || duration.w || 0,
		days = duration.days || duration.day || duration.d || 0,
		hours = duration.hours || duration.hour || duration.h || 0,
		minutes = duration.minutes || duration.minute || duration.m || 0,
		seconds = duration.seconds || duration.second || duration.s || 0,
		milliseconds = duration.milliseconds || duration.millisecond || duration.ms || 0;
		this._milliseconds = milliseconds +
			seconds * 1e3 +
			minutes * 6e4 +
			hours * 36e5;
		this._days = days +
			weeks * 7;
		this._months = months +
			years * 12;
		data.milliseconds = milliseconds % 1000;
		seconds += absRound(milliseconds / 1000);
		data.seconds = seconds % 60;
		minutes += absRound(seconds / 60);
		data.minutes = minutes % 60;
		hours += absRound(minutes / 60);
		data.hours = hours % 24;
		days += absRound(hours / 24);
		days += weeks * 7;
		data.days = days % 30;
		months += absRound(days / 30);
		data.months = months % 12;
		years += absRound(months / 12);
		data.years = years;
	}
	function extend(a, b) {
		for (var i in b) {
			if (b.hasOwnProperty(i)) {
				a[i] = b[i];
			}
		}
		return a;
	}
	function absRound(number) {
		if (number < 0) {
			return Math.ceil(number);
		} else {
			return Math.floor(number);
		}
	}
	function leftZeroFill(number, targetLength) {
		var output = number + '';
		while (output.length < targetLength) {
			output = '0' + output;
		}
		return output;
	}
	function addOrSubtractDurationFromMoment(mom, duration, isAdding) {
		var ms = duration._milliseconds,
		d = duration._days,
		M = duration._months,
		currentDate;
		if (ms) {
			mom._d.setTime(+mom + ms * isAdding);
		}
		if (d) {
			mom.date(mom.date() + d * isAdding);
		}
		if (M) {
			currentDate = mom.date();
			mom.date(1).month(mom.month() + M * isAdding).date(Math.min(currentDate, mom.daysInMonth()));
		}
	}
	function isArray(input) {
		return Object.prototype.toString.call(input) === '[object Array]';
	}
	function compareArrays(array1, array2) {
		var len = Math.min(array1.length, array2.length),
		lengthDiff = Math.abs(array1.length - array2.length),
		diffs = 0,
		i;
		for (i = 0; i < len; i++) {
			if (~~array1[i] !== ~~array2[i]) {
				diffs++;
			}
		}
		return diffs + lengthDiff;
	}
	Language.prototype = {
		set: function (config) {
			var prop,
			i;
			for (i in config) {
				prop = config[i];
				if (typeof prop === 'function') {
					this[i] = prop;
				} else {
					this['_' + i] = prop;
				}
			}
		},
		_months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
		months: function (m) {
			return this._months[m.month()];
		},
		_monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
		monthsShort: function (m) {
			return this._monthsShort[m.month()];
		},
		monthsParse: function (monthName) {
			var i,
			mom,
			regex,
			output;
			if (!this._monthsParse) {
				this._monthsParse = [];
			}
			for (i = 0; i < 12; i++) {
				if (!this._monthsParse[i]) {
					mom = moment([2000, i]);
					regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
					this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
				}
				if (this._monthsParse[i].test(monthName)) {
					return i;
				}
			}
		},
		_weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
		weekdays: function (m) {
			return this._weekdays[m.day()];
		},
		_weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
		weekdaysShort: function (m) {
			return this._weekdaysShort[m.day()];
		},
		_weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
		weekdaysMin: function (m) {
			return this._weekdaysMin[m.day()];
		},
		_longDateFormat: {
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D YYYY",
			LLL: "MMMM D YYYY LT",
			LLLL: "dddd, MMMM D YYYY LT"
		},
		longDateFormat: function (key) {
			var output = this._longDateFormat[key];
			if (!output && this._longDateFormat[key.toUpperCase()]) {
				output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
						return val.slice(1);
					});
				this._longDateFormat[key] = output;
			}
			return output;
		},
		meridiem: function (hours, minutes, isLower) {
			if (hours > 11) {
				return isLower ? 'pm' : 'PM';
			} else {
				return isLower ? 'am' : 'AM';
			}
		},
		_calendar: {
			sameDay: '[Today at] LT',
			nextDay: '[Tomorrow at] LT',
			nextWeek: 'dddd [at] LT',
			lastDay: '[Yesterday at] LT',
			lastWeek: '[Last] dddd [at] LT',
			sameElse: 'L'
		},
		calendar: function (key, mom) {
			var output = this._calendar[key];
			return typeof output === 'function' ? output.apply(mom) : output;
		},
		_relativeTime: {
			future: "in %s",
			past: "%s ago",
			s: "a few seconds",
			m: "a minute",
			mm: "%d minutes",
			h: "an hour",
			hh: "%d hours",
			d: "a day",
			dd: "%d days",
			M: "a month",
			MM: "%d months",
			y: "a year",
			yy: "%d years"
		},
		relativeTime: function (number, withoutSuffix, string, isFuture) {
			var output = this._relativeTime[string];
			return (typeof output === 'function') ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
		},
		pastFuture: function (diff, output) {
			var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
			return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
		},
		ordinal: function (number) {
			return this._ordinal.replace("%d", number);
		},
		_ordinal: "%d",
		preparse: function (string) {
			return string;
		},
		postformat: function (string) {
			return string;
		},
		week: function (mom) {
			return weekOfYear(mom, this._week.dow, this._week.doy);
		},
		_week: {
			dow: 0,
			doy: 6
		}
	};
	function loadLang(key, values) {
		values.abbr = key;
		if (!languages[key]) {
			languages[key] = new Language();
		}
		languages[key].set(values);
		return languages[key];
	}
	function getLangDefinition(key) {
		if (!key) {
			return moment.fn._lang;
		}
		if (!languages[key] && hasModule) {
			require('./lang/' + key);
		}
		return languages[key];
	}
	function removeFormattingTokens(input) {
		if (input.match(/\[.*\]/)) {
			return input.replace(/^\[|\]$/g, "");
		}
		return input.replace(/\\/g, "");
	}
	function makeFormatFunction(format) {
		var array = format.match(formattingTokens),
		i,
		length;
		for (i = 0, length = array.length; i < length; i++) {
			if (formatTokenFunctions[array[i]]) {
				array[i] = formatTokenFunctions[array[i]];
			} else {
				array[i] = removeFormattingTokens(array[i]);
			}
		}
		return function (mom) {
			var output = "";
			for (i = 0; i < length; i++) {
				output += typeof array[i].call === 'function' ? array[i].call(mom, format) : array[i];
			}
			return output;
		};
	}
	function formatMoment(m, format) {
		var i = 5;
		function replaceLongDateFormatTokens(input) {
			return m.lang().longDateFormat(input) || input;
		}
		while (i-- && localFormattingTokens.test(format)) {
			format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
		}
		if (!formatFunctions[format]) {
			formatFunctions[format] = makeFormatFunction(format);
		}
		return formatFunctions[format](m);
	}
	function getParseRegexForToken(token) {
		switch (token) {
		case 'DDDD':
			return parseTokenThreeDigits;
		case 'YYYY':
			return parseTokenFourDigits;
		case 'YYYYY':
			return parseTokenSixDigits;
		case 'S':
		case 'SS':
		case 'SSS':
		case 'DDD':
			return parseTokenOneToThreeDigits;
		case 'MMM':
		case 'MMMM':
		case 'dd':
		case 'ddd':
		case 'dddd':
		case 'a':
		case 'A':
			return parseTokenWord;
		case 'X':
			return parseTokenTimestampMs;
		case 'Z':
		case 'ZZ':
			return parseTokenTimezone;
		case 'T':
			return parseTokenT;
		case 'MM':
		case 'DD':
		case 'YY':
		case 'HH':
		case 'hh':
		case 'mm':
		case 'ss':
		case 'M':
		case 'D':
		case 'd':
		case 'H':
		case 'h':
		case 'm':
		case 's':
			return parseTokenOneOrTwoDigits;
		default:
			return new RegExp(token.replace('\\', ''));
		}
	}
	function addTimeToArrayFromToken(token, input, config) {
		var a,
		b,
		datePartArray = config._a;
		switch (token) {
		case 'M':
		case 'MM':
			datePartArray[1] = (input == null) ? 0 : ~~input - 1;
			break;
		case 'MMM':
		case 'MMMM':
			a = getLangDefinition(config._l).monthsParse(input);
			if (a != null) {
				datePartArray[1] = a;
			} else {
				config._isValid = false;
			}
			break;
		case 'D':
		case 'DD':
		case 'DDD':
		case 'DDDD':
			if (input != null) {
				datePartArray[2] = ~~input;
			}
			break;
		case 'YY':
			datePartArray[0] = ~~input + (~~input > 68 ? 1900 : 2000);
			break;
		case 'YYYY':
		case 'YYYYY':
			datePartArray[0] = ~~input;
			break;
		case 'a':
		case 'A':
			config._isPm = ((input + '').toLowerCase() === 'pm');
			break;
		case 'H':
		case 'HH':
		case 'h':
		case 'hh':
			datePartArray[3] = ~~input;
			break;
		case 'm':
		case 'mm':
			datePartArray[4] = ~~input;
			break;
		case 's':
		case 'ss':
			datePartArray[5] = ~~input;
			break;
		case 'S':
		case 'SS':
		case 'SSS':
			datePartArray[6] = ~~(('0.' + input) * 1000);
			break;
		case 'X':
			config._d = new Date(parseFloat(input) * 1000);
			break;
		case 'Z':
		case 'ZZ':
			config._useUTC = true;
			a = (input + '').match(parseTimezoneChunker);
			if (a && a[1]) {
				config._tzh = ~~a[1];
			}
			if (a && a[2]) {
				config._tzm = ~~a[2];
			}
			if (a && a[0] === '+') {
				config._tzh = -config._tzh;
				config._tzm = -config._tzm;
			}
			break;
		}
		if (input == null) {
			config._isValid = false;
		}
	}
	function dateFromArray(config) {
		var i,
		date,
		input = [];
		if (config._d) {
			return;
		}
		for (i = 0; i < 7; i++) {
			config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
		}
		input[3] += config._tzh || 0;
		input[4] += config._tzm || 0;
		date = new Date(0);
		if (config._useUTC) {
			date.setUTCFullYear(input[0], input[1], input[2]);
			date.setUTCHours(input[3], input[4], input[5], input[6]);
		} else {
			date.setFullYear(input[0], input[1], input[2]);
			date.setHours(input[3], input[4], input[5], input[6]);
		}
		config._d = date;
	}
	function makeDateFromStringAndFormat(config) {
		var tokens = config._f.match(formattingTokens),
		string = config._i,
		i,
		parsedInput;
		config._a = [];
		for (i = 0; i < tokens.length; i++) {
			parsedInput = (getParseRegexForToken(tokens[i]).exec(string) || [])[0];
			if (parsedInput) {
				string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
			}
			if (formatTokenFunctions[tokens[i]]) {
				addTimeToArrayFromToken(tokens[i], parsedInput, config);
			}
		}
		if (config._isPm && config._a[3] < 12) {
			config._a[3] += 12;
		}
		if (config._isPm === false && config._a[3] === 12) {
			config._a[3] = 0;
		}
		dateFromArray(config);
	}
	function makeDateFromStringAndArray(config) {
		var tempConfig,
		tempMoment,
		bestMoment,
		scoreToBeat = 99,
		i,
		currentScore;
		for (i = config._f.length; i > 0; i--) {
			tempConfig = extend({}, config);
			tempConfig._f = config._f[i - 1];
			makeDateFromStringAndFormat(tempConfig);
			tempMoment = new Moment(tempConfig);
			if (tempMoment.isValid()) {
				bestMoment = tempMoment;
				break;
			}
			currentScore = compareArrays(tempConfig._a, tempMoment.toArray());
			if (currentScore < scoreToBeat) {
				scoreToBeat = currentScore;
				bestMoment = tempMoment;
			}
		}
		extend(config, bestMoment);
	}
	function makeDateFromString(config) {
		var i,
		string = config._i;
		if (isoRegex.exec(string)) {
			config._f = 'YYYY-MM-DDT';
			for (i = 0; i < 4; i++) {
				if (isoTimes[i][1].exec(string)) {
					config._f += isoTimes[i][0];
					break;
				}
			}
			if (parseTokenTimezone.exec(string)) {
				config._f += " Z";
			}
			makeDateFromStringAndFormat(config);
		} else {
			config._d = new Date(string);
		}
	}
	function makeDateFromInput(config) {
		var input = config._i,
		matched = aspNetJsonRegex.exec(input);
		if (input === undefined) {
			config._d = new Date();
		} else if (matched) {
			config._d = new Date(+matched[1]);
		} else if (typeof input === 'string') {
			makeDateFromString(config);
		} else if (isArray(input)) {
			config._a = input.slice(0);
			dateFromArray(config);
		} else {
			config._d = input instanceof Date ? new Date(+input) : new Date(input);
		}
	}
	function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
		return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	}
	function relativeTime(milliseconds, withoutSuffix, lang) {
		var seconds = round(Math.abs(milliseconds) / 1000),
		minutes = round(seconds / 60),
		hours = round(minutes / 60),
		days = round(hours / 24),
		years = round(days / 365),
		args = seconds < 45 && ['s', seconds] || minutes === 1 && ['m'] || minutes < 45 && ['mm', minutes] || hours === 1 && ['h'] || hours < 22 && ['hh', hours] || days === 1 && ['d'] || days <= 25 && ['dd', days] || days <= 45 && ['M'] || days < 345 && ['MM', round(days / 30)] || years === 1 && ['y'] || ['yy', years];
		args[2] = withoutSuffix;
		args[3] = milliseconds > 0;
		args[4] = lang;
		return substituteTimeAgo.apply({}, args);
	}
	function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
		var end = firstDayOfWeekOfYear - firstDayOfWeek,
		daysToDayOfWeek = firstDayOfWeekOfYear - mom.day();
		if (daysToDayOfWeek > end) {
			daysToDayOfWeek -= 7;
		}
		if (daysToDayOfWeek < end - 7) {
			daysToDayOfWeek += 7;
		}
		return Math.ceil(moment(mom).add('d', daysToDayOfWeek).dayOfYear() / 7);
	}
	function makeMoment(config) {
		var input = config._i,
		format = config._f;
		if (input === null || input === '') {
			return null;
		}
		if (typeof input === 'string') {
			config._i = input = getLangDefinition().preparse(input);
		}
		if (moment.isMoment(input)) {
			config = extend({}, input);
			config._d = new Date(+input._d);
		} else if (format) {
			if (isArray(format)) {
				makeDateFromStringAndArray(config);
			} else {
				makeDateFromStringAndFormat(config);
			}
		} else {
			makeDateFromInput(config);
		}
		return new Moment(config);
	}
	moment = function (input, format, lang) {
		return makeMoment({
			_i: input,
			_f: format,
			_l: lang,
			_isUTC: false
		});
	};
	moment.utc = function (input, format, lang) {
		return makeMoment({
			_useUTC: true,
			_isUTC: true,
			_l: lang,
			_i: input,
			_f: format
		});
	};
	moment.unix = function (input) {
		return moment(input * 1000);
	};
	moment.duration = function (input, key) {
		var isDuration = moment.isDuration(input),
		isNumber = (typeof input === 'number'),
		duration = (isDuration ? input._data : (isNumber ? {}
				 : input)),
		ret;
		if (isNumber) {
			if (key) {
				duration[key] = input;
			} else {
				duration.milliseconds = input;
			}
		}
		ret = new Duration(duration);
		if (isDuration && input.hasOwnProperty('_lang')) {
			ret._lang = input._lang;
		}
		return ret;
	};
	moment.version = VERSION;
	moment.defaultFormat = isoFormat;
	moment.lang = function (key, values) {
		var i;
		if (!key) {
			return moment.fn._lang._abbr;
		}
		if (values) {
			loadLang(key, values);
		} else if (!languages[key]) {
			getLangDefinition(key);
		}
		moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key);
	};
	moment.langData = function (key) {
		if (key && key._lang && key._lang._abbr) {
			key = key._lang._abbr;
		}
		return getLangDefinition(key);
	};
	moment.isMoment = function (obj) {
		return obj instanceof Moment;
	};
	moment.isDuration = function (obj) {
		return obj instanceof Duration;
	};
	moment.fn = Moment.prototype = {
		clone: function () {
			return moment(this);
		},
		valueOf: function () {
			return +this._d;
		},
		unix: function () {
			return Math.floor(+this._d / 1000);
		},
		toString: function () {
			return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
		},
		toDate: function () {
			return this._d;
		},
		toJSON: function () {
			return moment(this).utc().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
		},
		toArray: function () {
			var m = this;
			return [m.year(), m.month(), m.date(), m.hours(), m.minutes(), m.seconds(), m.milliseconds()];
		},
		isValid: function () {
			if (this._isValid == null) {
				if (this._a) {
					this._isValid = !compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray());
				} else {
					this._isValid = !isNaN(this._d.getTime());
				}
			}
			return !!this._isValid;
		},
		utc: function () {
			this._isUTC = true;
			return this;
		},
		local: function () {
			this._isUTC = false;
			return this;
		},
		format: function (inputString) {
			var output = formatMoment(this, inputString || moment.defaultFormat);
			return this.lang().postformat(output);
		},
		add: function (input, val) {
			var dur;
			if (typeof input === 'string') {
				dur = moment.duration(+val, input);
			} else {
				dur = moment.duration(input, val);
			}
			addOrSubtractDurationFromMoment(this, dur, 1);
			return this;
		},
		subtract: function (input, val) {
			var dur;
			if (typeof input === 'string') {
				dur = moment.duration(+val, input);
			} else {
				dur = moment.duration(input, val);
			}
			addOrSubtractDurationFromMoment(this, dur, -1);
			return this;
		},
		diff: function (input, units, asFloat) {
			var that = this._isUTC ? moment(input).utc() : moment(input).local(),
			zoneDiff = (this.zone() - that.zone()) * 6e4,
			diff,
			output;
			if (units) {
				units = units.replace(/s$/, '');
			}
			if (units === 'year' || units === 'month') {
				diff = (this.daysInMonth() + that.daysInMonth()) * 432e5;
				output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
				output += ((this - moment(this).startOf('month')) - (that - moment(that).startOf('month'))) / diff;
				if (units === 'year') {
					output = output / 12;
				}
			} else {
				diff = (this - that) - zoneDiff;
				output = units === 'second' ? diff / 1e3 : units === 'minute' ? diff / 6e4 : units === 'hour' ? diff / 36e5 : units === 'day' ? diff / 864e5 : units === 'week' ? diff / 6048e5 : diff;
			}
			return asFloat ? output : absRound(output);
		},
		from: function (time, withoutSuffix) {
			return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
		},
		fromNow: function (withoutSuffix) {
			return this.from(moment(), withoutSuffix);
		},
		calendar: function () {
			var diff = this.diff(moment().startOf('day'), 'days', true),
			format = diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
			return this.format(this.lang().calendar(format, this));
		},
		isLeapYear: function () {
			var year = this.year();
			return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
		},
		isDST: function () {
			return (this.zone() < moment([this.year()]).zone() || this.zone() < moment([this.year(), 5]).zone());
		},
		day: function (input) {
			var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
			return input == null ? day : this.add({
				d: input - day
			});
		},
		startOf: function (units) {
			units = units.replace(/s$/, '');
			switch (units) {
			case 'year':
				this.month(0);
			case 'month':
				this.date(1);
			case 'week':
			case 'day':
				this.hours(0);
			case 'hour':
				this.minutes(0);
			case 'minute':
				this.seconds(0);
			case 'second':
				this.milliseconds(0);
			}
			if (units === 'week') {
				this.day(0);
			}
			return this;
		},
		endOf: function (units) {
			return this.startOf(units).add(units.replace(/s?$/, 's'), 1).subtract('ms', 1);
		},
		isAfter: function (input, units) {
			units = typeof units !== 'undefined' ? units : 'millisecond';
			return +this.clone().startOf(units) > +moment(input).startOf(units);
		},
		isBefore: function (input, units) {
			units = typeof units !== 'undefined' ? units : 'millisecond';
			return +this.clone().startOf(units) < +moment(input).startOf(units);
		},
		isSame: function (input, units) {
			units = typeof units !== 'undefined' ? units : 'millisecond';
			return +this.clone().startOf(units) === +moment(input).startOf(units);
		},
		zone: function () {
			return this._isUTC ? 0 : this._d.getTimezoneOffset();
		},
		daysInMonth: function () {
			return moment.utc([this.year(), this.month() + 1, 0]).date();
		},
		dayOfYear: function (input) {
			var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
			return input == null ? dayOfYear : this.add("d", (input - dayOfYear));
		},
		isoWeek: function (input) {
			var week = weekOfYear(this, 1, 4);
			return input == null ? week : this.add("d", (input - week) * 7);
		},
		week: function (input) {
			var week = this.lang().week(this);
			return input == null ? week : this.add("d", (input - week) * 7);
		},
		lang: function (key) {
			if (key === undefined) {
				return this._lang;
			} else {
				this._lang = getLangDefinition(key);
				return this;
			}
		}
	};
	function makeGetterAndSetter(name, key) {
		moment.fn[name] = moment.fn[name + 's'] = function (input) {
			var utc = this._isUTC ? 'UTC' : '';
			if (input != null) {
				this._d['set' + utc + key](input);
				return this;
			} else {
				return this._d['get' + utc + key]();
			}
		};
	}
	for (i = 0; i < proxyGettersAndSetters.length; i++) {
		makeGetterAndSetter(proxyGettersAndSetters[i].toLowerCase().replace(/s$/, ''), proxyGettersAndSetters[i]);
	}
	makeGetterAndSetter('year', 'FullYear');
	moment.fn.days = moment.fn.day;
	moment.fn.weeks = moment.fn.week;
	moment.fn.isoWeeks = moment.fn.isoWeek;
	moment.duration.fn = Duration.prototype = {
		weeks: function () {
			return absRound(this.days() / 7);
		},
		valueOf: function () {
			return this._milliseconds +
			this._days * 864e5 +
			this._months * 2592e6;
		},
		humanize: function (withSuffix) {
			var difference = +this,
			output = relativeTime(difference, !withSuffix, this.lang());
			if (withSuffix) {
				output = this.lang().pastFuture(difference, output);
			}
			return this.lang().postformat(output);
		},
		lang: moment.fn.lang
	};
	function makeDurationGetter(name) {
		moment.duration.fn[name] = function () {
			return this._data[name];
		};
	}
	function makeDurationAsGetter(name, factor) {
		moment.duration.fn['as' + name] = function () {
			return +this / factor;
		};
	}
	for (i in unitMillisecondFactors) {
		if (unitMillisecondFactors.hasOwnProperty(i)) {
			makeDurationAsGetter(i, unitMillisecondFactors[i]);
			makeDurationGetter(i.toLowerCase());
		}
	}
	makeDurationAsGetter('Weeks', 6048e5);
	moment.lang('en', {
		ordinal: function (number) {
			var b = number % 10,
			output = (~~(number % 100 / 10) === 1) ? 'th' : (b === 1) ? 'st' : (b === 2) ? 'nd' : (b === 3) ? 'rd' : 'th';
			return number + output;
		}
	});
	if (hasModule) {
		module.exports = moment;
	}
	if (typeof ender === 'undefined') {
		this['moment'] = moment;
	}
	if (typeof define === "function" && define.amd) {
		define("moment", [], function () {
			return moment;
		});
	}
}).call(this);
(function () {
	function e(e) {
		(function () {
			function e(e) {
				(function () {
					e.lang("ar-ma", {
						months: "\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"),
						monthsShort: "\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"),
						weekdays: "\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062a\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),
						weekdaysShort: "\u0627\u062d\u062f_\u0627\u062a\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),
						weekdaysMin: "\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd D MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							nextDay: "[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							nextWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							lastDay: "[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							lastWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "\u0641\u064a %s",
							past: "\u0645\u0646\u0630 %s",
							s: "\u062b\u0648\u0627\u0646",
							m: "\u062f\u0642\u064a\u0642\u0629",
							mm: "%d \u062f\u0642\u0627\u0626\u0642",
							h: "\u0633\u0627\u0639\u0629",
							hh: "%d \u0633\u0627\u0639\u0627\u062a",
							d: "\u064a\u0648\u0645",
							dd: "%d \u0623\u064a\u0627\u0645",
							M: "\u0634\u0647\u0631",
							MM: "%d \u0623\u0634\u0647\u0631",
							y: "\u0633\u0646\u0629",
							yy: "%d \u0633\u0646\u0648\u0627\u062a"
						},
						week: {
							dow: 6,
							doy: 12
						}
					})
				})(),
				function () {
					e.lang("ar", {
						months: "\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u062b\u0627\u0646\u064a_\ufeb6\ufe91\ufe8e\ufec3_\u0622\u0630\u0627\u0631_\u0646\u064a\u0633\u0627\u0646_\u0623\u064a\u0627\u0631_\u062d\u0632\u064a\u0631\u0627\u0646_\u062a\u0645\u0648\u0632_\u0622\u0628_\u0623\u064a\u0644\u0648\u0644_\u062a\u0634\u0631\u064a\u0646 \u0627\u0644\u0623\u0648\u0644_\u062a\u0634\u0631\u064a\u0646 \u0627\u0644\u062b\u0627\u0646\u064a_\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u0623\u0648\u0644".split("_"),
						monthsShort: "\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u062b\u0627\u0646\u064a_\ufeb6\ufe91\ufe8e\ufec3_\u0622\u0630\u0627\u0631_\u0646\u064a\u0633\u0627\u0646_\u0623\u064a\u0627\u0631_\u062d\u0632\u064a\u0631\u0627\u0646_\u062a\u0645\u0648\u0632_\u0622\u0628_\u0623\u064a\u0644\u0648\u0644_\u062a\u0634\u0631\u064a\u0646 \u0627\u0644\u0623\u0648\u0644_\u062a\u0634\u0631\u064a\u0646 \u0627\u0644\u062b\u0627\u0646\u064a_\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u0623\u0648\u0644".split("_"),
						weekdays: "\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062a\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),
						weekdaysShort: "\u0627\u062d\u062f_\u0627\u062a\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),
						weekdaysMin: "\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd D MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							nextDay: "[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							nextWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							lastDay: "[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							lastWeek: "dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "\u0641\u064a %s",
							past: "\u0645\u0646\u0630 %s",
							s: "\u062b\u0648\u0627\u0646",
							m: "\u062f\u0642\u064a\u0642\u0629",
							mm: "%d \u062f\u0642\u0627\u0626\u0642",
							h: "\u0633\u0627\u0639\u0629",
							hh: "%d \u0633\u0627\u0639\u0627\u062a",
							d: "\u064a\u0648\u0645",
							dd: "%d \u0623\u064a\u0627\u0645",
							M: "\u0634\u0647\u0631",
							MM: "%d \u0623\u0634\u0647\u0631",
							y: "\u0633\u0646\u0629",
							yy: "%d \u0633\u0646\u0648\u0627\u062a"
						},
						week: {
							dow: 6,
							doy: 12
						}
					})
				}
				(),
				function () {
					e.lang("bg", {
						months: "\u044f\u043d\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0438\u043b_\u043c\u0430\u0439_\u044e\u043d\u0438_\u044e\u043b\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438_\u043e\u043a\u0442\u043e\u043c\u0432\u0440\u0438_\u043d\u043e\u0435\u043c\u0432\u0440\u0438_\u0434\u0435\u043a\u0435\u043c\u0432\u0440\u0438".split("_"),
						monthsShort: "\u044f\u043d\u0440_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0439_\u044e\u043d\u0438_\u044e\u043b\u0438_\u0430\u0432\u0433_\u0441\u0435\u043f_\u043e\u043a\u0442_\u043d\u043e\u0435_\u0434\u0435\u043a".split("_"),
						weekdays: "\u043d\u0435\u0434\u0435\u043b\u044f_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u044f\u0434\u0430_\u0447\u0435\u0442\u0432\u044a\u0440\u0442\u044a\u043a_\u043f\u0435\u0442\u044a\u043a_\u0441\u044a\u0431\u043e\u0442\u0430".split("_"),
						weekdaysShort: "\u043d\u0435\u0434_\u043f\u043e\u043d_\u0432\u0442\u043e_\u0441\u0440\u044f_\u0447\u0435\u0442_\u043f\u0435\u0442_\u0441\u044a\u0431".split("_"),
						weekdaysMin: "\u043d\u0434_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),
						longDateFormat: {
							LT: "h:mm",
							L: "D.MM.YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd, D MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[\u0414\u043d\u0435\u0441 \u0432] LT",
							nextDay: "[\u0423\u0442\u0440\u0435 \u0432] LT",
							nextWeek: "dddd [\u0432] LT",
							lastDay: "[\u0412\u0447\u0435\u0440\u0430 \u0432] LT",
							lastWeek: function () {
								switch (this.day()) {
								case 0:
								case 3:
								case 6:
									return "[\u0412 \u0438\u0437\u043c\u0438\u043d\u0430\u043b\u0430\u0442\u0430] dddd [\u0432] LT";
								case 1:
								case 2:
								case 4:
								case 5:
									return "[\u0412 \u0438\u0437\u043c\u0438\u043d\u0430\u043b\u0438\u044f] dddd [\u0432] LT"
								}
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "\u0441\u043b\u0435\u0434 %s",
							past: "\u043f\u0440\u0435\u0434\u0438 %s",
							s: "\u043d\u044f\u043a\u043e\u043b\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434\u0438",
							m: "\u043c\u0438\u043d\u0443\u0442\u0430",
							mm: "%d \u043c\u0438\u043d\u0443\u0442\u0438",
							h: "\u0447\u0430\u0441",
							hh: "%d \u0447\u0430\u0441\u0430",
							d: "\u0434\u0435\u043d",
							dd: "%d \u0434\u043d\u0438",
							M: "\u043c\u0435\u0441\u0435\u0446",
							MM: "%d \u043c\u0435\u0441\u0435\u0446\u0430",
							y: "\u0433\u043e\u0434\u0438\u043d\u0430",
							yy: "%d \u0433\u043e\u0434\u0438\u043d\u0438"
						},
						ordinal: function (e) {
							var t = e % 10,
							n = e % 100;
							return e === 0 ? e + "-\u0435\u0432" : n === 0 ? e + "-\u0435\u043d" : n > 10 && n < 20 ? e + "-\u0442\u0438" : t === 1 ? e + "-\u0432\u0438" : t === 2 ? e + "-\u0440\u0438" : t === 7 || t === 8 ? e + "-\u043c\u0438" : e + "-\u0442\u0438"
						},
						week: {
							dow: 1,
							doy: 7
						}
					})
				}
				(),
				function () {
					e.lang("ca", {
						months: "Gener_Febrer_Mar\u00e7_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre".split("_"),
						monthsShort: "Gen._Febr._Mar._Abr._Mai._Jun._Jul._Ag._Set._Oct._Nov._Des.".split("_"),
						weekdays: "Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte".split("_"),
						weekdaysShort: "Dg._Dl._Dt._Dc._Dj._Dv._Ds.".split("_"),
						weekdaysMin: "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
						longDateFormat: {
							LT: "H:mm",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd D MMMM YYYY LT"
						},
						calendar: {
							sameDay: function () {
								return "[avui a " + (this.hours() !== 1 ? "les" : "la") + "] LT"
							},
							nextDay: function () {
								return "[dem\u00e0 a " + (this.hours() !== 1 ? "les" : "la") + "] LT"
							},
							nextWeek: function () {
								return "dddd [a " + (this.hours() !== 1 ? "les" : "la") + "] LT"
							},
							lastDay: function () {
								return "[ahir a " + (this.hours() !== 1 ? "les" : "la") + "] LT"
							},
							lastWeek: function () {
								return "[el] dddd [passat a " + (this.hours() !== 1 ? "les" : "la") + "] LT"
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "en %s",
							past: "fa %s",
							s: "uns segons",
							m: "un minut",
							mm: "%d minuts",
							h: "una hora",
							hh: "%d hores",
							d: "un dia",
							dd: "%d dies",
							M: "un mes",
							MM: "%d mesos",
							y: "un any",
							yy: "%d anys"
						},
						ordinal: "%d\u00ba",
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					function r(e) {
						return e > 1 && e < 5 && ~~(e / 10) !== 1
					}
					function i(e, t, n, i) {
						var s = e + " ";
						switch (n) {
						case "s":
							return t || i ? "p\u00e1r vte\u0159in" : "p\u00e1r vte\u0159inami";
						case "m":
							return t ? "minuta" : i ? "minutu" : "minutou";
						case "mm":
							return t || i ? s + (r(e) ? "minuty" : "minut") : s + "minutami";
							break;
						case "h":
							return t ? "hodina" : i ? "hodinu" : "hodinou";
						case "hh":
							return t || i ? s + (r(e) ? "hodiny" : "hodin") : s + "hodinami";
							break;
						case "d":
							return t || i ? "den" : "dnem";
						case "dd":
							return t || i ? s + (r(e) ? "dny" : "dn\u00ed") : s + "dny";
							break;
						case "M":
							return t || i ? "m\u011bs\u00edc" : "m\u011bs\u00edcem";
						case "MM":
							return t || i ? s + (r(e) ? "m\u011bs\u00edce" : "m\u011bs\u00edc\u016f") : s + "m\u011bs\u00edci";
							break;
						case "y":
							return t || i ? "rok" : "rokem";
						case "yy":
							return t || i ? s + (r(e) ? "roky" : "let") : s + "lety"
						}
					}
					var t = "leden_\u00fanor_b\u0159ezen_duben_kv\u011bten_\u010derven_\u010dervenec_srpen_z\u00e1\u0159\u00ed_\u0159\u00edjen_listopad_prosinec".split("_"),
					n = "led_\u00fano_b\u0159e_dub_kv\u011b_\u010dvn_\u010dvc_srp_z\u00e1\u0159_\u0159\u00edj_lis_pro".split("_");
					e.lang("cs", {
						months: t,
						monthsShort: n,
						monthsParse: function (e, t) {
							var n,
							r = [];
							for (n = 0; n < 12; n++)
								r[n] = new RegExp("^" + e[n] + "$|^" + t[n] + "$", "i");
							return r
						}
						(t, n),
						weekdays: "ned\u011ble_pond\u011bl\u00ed_\u00fater\u00fd_st\u0159eda_\u010dtvrtek_p\u00e1tek_sobota".split("_"),
						weekdaysShort: "ne_po_\u00fat_st_\u010dt_p\u00e1_so".split("_"),
						weekdaysMin: "ne_po_\u00fat_st_\u010dt_p\u00e1_so".split("_"),
						longDateFormat: {
							LT: "H:mm",
							L: "DD.MM.YYYY",
							LL: "D. MMMM YYYY",
							LLL: "D. MMMM YYYY LT",
							LLLL: "dddd D. MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[dnes v] LT",
							nextDay: "[z\u00edtra v] LT",
							nextWeek: function () {
								switch (this.day()) {
								case 0:
									return "[v ned\u011bli v] LT";
								case 1:
								case 2:
									return "[v] dddd [v] LT";
								case 3:
									return "[ve st\u0159edu v] LT";
								case 4:
									return "[ve \u010dtvrtek v] LT";
								case 5:
									return "[v p\u00e1tek v] LT";
								case 6:
									return "[v sobotu v] LT"
								}
							},
							lastDay: "[v\u010dera v] LT",
							lastWeek: function () {
								switch (this.day()) {
								case 0:
									return "[minulou ned\u011bli v] LT";
								case 1:
								case 2:
									return "[minul\u00e9] dddd [v] LT";
								case 3:
									return "[minulou st\u0159edu v] LT";
								case 4:
								case 5:
									return "[minul\u00fd] dddd [v] LT";
								case 6:
									return "[minulou sobotu v] LT"
								}
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "za %s",
							past: "p\u0159ed %s",
							s: i,
							m: i,
							mm: i,
							h: i,
							hh: i,
							d: i,
							dd: i,
							M: i,
							MM: i,
							y: i,
							yy: i
						},
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					e.lang("cv", {
						months: "\u043a\u0103\u0440\u043b\u0430\u0447_\u043d\u0430\u0440\u0103\u0441_\u043f\u0443\u0448_\u0430\u043a\u0430_\u043c\u0430\u0439_\u00e7\u0115\u0440\u0442\u043c\u0435_\u0443\u0442\u0103_\u00e7\u0443\u0440\u043b\u0430_\u0430\u0432\u0103\u043d_\u044e\u043f\u0430_\u0447\u04f3\u043a_\u0440\u0430\u0448\u0442\u0430\u0432".split("_"),
						monthsShort: "\u043a\u0103\u0440_\u043d\u0430\u0440_\u043f\u0443\u0448_\u0430\u043a\u0430_\u043c\u0430\u0439_\u00e7\u0115\u0440_\u0443\u0442\u0103_\u00e7\u0443\u0440_\u0430\u0432_\u044e\u043f\u0430_\u0447\u04f3\u043a_\u0440\u0430\u0448".split("_"),
						weekdays: "\u0432\u044b\u0440\u0441\u0430\u0440\u043d\u0438\u043a\u0443\u043d_\u0442\u0443\u043d\u0442\u0438\u043a\u0443\u043d_\u044b\u0442\u043b\u0430\u0440\u0438\u043a\u0443\u043d_\u044e\u043d\u043a\u0443\u043d_\u043a\u0115\u00e7\u043d\u0435\u0440\u043d\u0438\u043a\u0443\u043d_\u044d\u0440\u043d\u0435\u043a\u0443\u043d_\u0448\u0103\u043c\u0430\u0442\u043a\u0443\u043d".split("_"),
						weekdaysShort: "\u0432\u044b\u0440_\u0442\u0443\u043d_\u044b\u0442\u043b_\u044e\u043d_\u043a\u0115\u00e7_\u044d\u0440\u043d_\u0448\u0103\u043c".split("_"),
						weekdaysMin: "\u0432\u0440_\u0442\u043d_\u044b\u0442_\u044e\u043d_\u043a\u00e7_\u044d\u0440_\u0448\u043c".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD-MM-YYYY",
							LL: "YYYY [\u00e7\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u0103\u0445\u0115\u043d] D[-\u043c\u0115\u0448\u0115]",
							LLL: "YYYY [\u00e7\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u0103\u0445\u0115\u043d] D[-\u043c\u0115\u0448\u0115], LT",
							LLLL: "dddd, YYYY [\u00e7\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u0103\u0445\u0115\u043d] D[-\u043c\u0115\u0448\u0115], LT"
						},
						calendar: {
							sameDay: "[\u041f\u0430\u044f\u043d] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",
							nextDay: "[\u042b\u0440\u0430\u043d] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",
							lastDay: "[\u0114\u043d\u0435\u0440] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",
							nextWeek: "[\u00c7\u0438\u0442\u0435\u0441] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",
							lastWeek: "[\u0418\u0440\u0442\u043d\u0115] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",
							sameElse: "L"
						},
						relativeTime: {
							future: function (e) {
								var t = /\u0441\u0435\u0445\u0435\u0442$/i.exec(e) ? "\u0440\u0435\u043d" : /\u00e7\u0443\u043b$/i.exec(e) ? "\u0442\u0430\u043d" : "\u0440\u0430\u043d";
								return e + t
							},
							past: "%s \u043a\u0430\u044f\u043b\u043b\u0430",
							s: "\u043f\u0115\u0440-\u0438\u043a \u00e7\u0435\u043a\u043a\u0443\u043d\u0442",
							m: "\u043f\u0115\u0440 \u043c\u0438\u043d\u0443\u0442",
							mm: "%d \u043c\u0438\u043d\u0443\u0442",
							h: "\u043f\u0115\u0440 \u0441\u0435\u0445\u0435\u0442",
							hh: "%d \u0441\u0435\u0445\u0435\u0442",
							d: "\u043f\u0115\u0440 \u043a\u0443\u043d",
							dd: "%d \u043a\u0443\u043d",
							M: "\u043f\u0115\u0440 \u0443\u0439\u0103\u0445",
							MM: "%d \u0443\u0439\u0103\u0445",
							y: "\u043f\u0115\u0440 \u00e7\u0443\u043b",
							yy: "%d \u00e7\u0443\u043b"
						},
						ordinal: "%d-\u043c\u0115\u0448",
						week: {
							dow: 1,
							doy: 7
						}
					})
				}
				(),
				function () {
					e.lang("da", {
						months: "Januar_Februar_Marts_April_Maj_Juni_Juli_August_September_Oktober_November_December".split("_"),
						monthsShort: "Jan_Feb_Mar_Apr_Maj_Jun_Jul_Aug_Sep_Okt_Nov_Dec".split("_"),
						weekdays: "S\u00f8ndag_Mandag_Tirsdag_Onsdag_Torsdag_Fredag_L\u00f8rdag".split("_"),
						weekdaysShort: "S\u00f8n_Man_Tir_Ons_Tor_Fre_L\u00f8r".split("_"),
						weekdaysMin: "S\u00f8_Ma_Ti_On_To_Fr_L\u00f8".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd D. MMMM, YYYY LT"
						},
						calendar: {
							sameDay: "[I dag kl.] LT",
							nextDay: "[I morgen kl.] LT",
							nextWeek: "dddd [kl.] LT",
							lastDay: "[I g\u00e5r kl.] LT",
							lastWeek: "[sidste] dddd [kl] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "om %s",
							past: "%s siden",
							s: "f\u00e5 sekunder",
							m: "et minut",
							mm: "%d minutter",
							h: "en time",
							hh: "%d timer",
							d: "en dag",
							dd: "%d dage",
							M: "en m\u00e5ned",
							MM: "%d m\u00e5neder",
							y: "et \u00e5r",
							yy: "%d \u00e5r"
						},
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					e.lang("de", {
						months: "Januar_Februar_M\u00e4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
						monthsShort: "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
						weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
						weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
						weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
						longDateFormat: {
							LT: "H:mm U\\hr",
							L: "DD.MM.YYYY",
							LL: "D. MMMM YYYY",
							LLL: "D. MMMM YYYY LT",
							LLLL: "dddd, D. MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[Heute um] LT",
							sameElse: "L",
							nextDay: "[Morgen um] LT",
							nextWeek: "dddd [um] LT",
							lastDay: "[Gestern um] LT",
							lastWeek: "[letzten] dddd [um] LT"
						},
						relativeTime: {
							future: "in %s",
							past: "vor %s",
							s: "ein paar Sekunden",
							m: "einer Minute",
							mm: "%d Minuten",
							h: "einer Stunde",
							hh: "%d Stunden",
							d: "einem Tag",
							dd: "%d Tagen",
							M: "einem Monat",
							MM: "%d Monaten",
							y: "einem Jahr",
							yy: "%d Jahren"
						},
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					e.lang("en-ca", {
						months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
						monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
						weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
						weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
						weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
						longDateFormat: {
							LT: "h:mm A",
							L: "YYYY-MM-DD",
							LL: "D MMMM, YYYY",
							LLL: "D MMMM, YYYY LT",
							LLLL: "dddd, D MMMM, YYYY LT"
						},
						calendar: {
							sameDay: "[Today at] LT",
							nextDay: "[Tomorrow at] LT",
							nextWeek: "dddd [at] LT",
							lastDay: "[Yesterday at] LT",
							lastWeek: "[last] dddd [at] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "in %s",
							past: "%s ago",
							s: "a few seconds",
							m: "a minute",
							mm: "%d minutes",
							h: "an hour",
							hh: "%d hours",
							d: "a day",
							dd: "%d days",
							M: "a month",
							MM: "%d months",
							y: "a year",
							yy: "%d years"
						},
						ordinal: function (e) {
							var t = e % 10,
							n = ~~(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
							return e + n
						}
					})
				}
				(),
				function () {
					e.lang("en-gb", {
						months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
						monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
						weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
						weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
						weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
						longDateFormat: {
							LT: "h:mm A",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd, D MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[Today at] LT",
							nextDay: "[Tomorrow at] LT",
							nextWeek: "dddd [at] LT",
							lastDay: "[Yesterday at] LT",
							lastWeek: "[last] dddd [at] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "in %s",
							past: "%s ago",
							s: "a few seconds",
							m: "a minute",
							mm: "%d minutes",
							h: "an hour",
							hh: "%d hours",
							d: "a day",
							dd: "%d days",
							M: "a month",
							MM: "%d months",
							y: "a year",
							yy: "%d years"
						},
						ordinal: function (e) {
							var t = e % 10,
							n = ~~(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
							return e + n
						},
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					e.lang("eo", {
						months: "januaro_februaro_marto_aprilo_majo_junio_julio_a\u016dgusto_septembro_oktobro_novembro_decembro".split("_"),
						monthsShort: "jan_feb_mar_apr_maj_jun_jul_a\u016dg_sep_okt_nov_dec".split("_"),
						weekdays: "Diman\u0109o_Lundo_Mardo_Merkredo_\u0134a\u016ddo_Vendredo_Sabato".split("_"),
						weekdaysShort: "Dim_Lun_Mard_Merk_\u0134a\u016d_Ven_Sab".split("_"),
						weekdaysMin: "Di_Lu_Ma_Me_\u0134a_Ve_Sa".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "YYYY-MM-DD",
							LL: "D-\\an \\de MMMM, YYYY",
							LLL: "D-\\an \\de MMMM, YYYY LT",
							LLLL: "dddd, \\l\\a D-\\an \\d\\e MMMM, YYYY LT"
						},
						meridiem: function (e, t, n) {
							return e > 11 ? n ? "p.t.m." : "P.T.M." : n ? "a.t.m." : "A.T.M."
						},
						calendar: {
							sameDay: "[Hodia\u016d je] LT",
							nextDay: "[Morga\u016d je] LT",
							nextWeek: "dddd [je] LT",
							lastDay: "[Hiera\u016d je] LT",
							lastWeek: "[pasinta] dddd [je] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "je %s",
							past: "anta\u016d %s",
							s: "sekundoj",
							m: "minuto",
							mm: "%d minutoj",
							h: "horo",
							hh: "%d horoj",
							d: "tago",
							dd: "%d tagoj",
							M: "monato",
							MM: "%d monatoj",
							y: "jaro",
							yy: "%d jaroj"
						},
						ordinal: "%da",
						week: {
							dow: 1,
							doy: 7
						}
					})
				}
				(),
				function () {
					e.lang("es", {
						months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
						monthsShort: "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
						weekdays: "domingo_lunes_martes_mi\u00e9rcoles_jueves_viernes_s\u00e1bado".split("_"),
						weekdaysShort: "dom._lun._mar._mi\u00e9._jue._vie._s\u00e1b.".split("_"),
						weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_S\u00e1".split("_"),
						longDateFormat: {
							LT: "H:mm",
							L: "DD/MM/YYYY",
							LL: "D \\de MMMM \\de YYYY",
							LLL: "D \\de MMMM \\de YYYY LT",
							LLLL: "dddd, D \\de MMMM \\de YYYY LT"
						},
						calendar: {
							sameDay: function () {
								return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							nextDay: function () {
								return "[ma\u00f1ana a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							nextWeek: function () {
								return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							lastDay: function () {
								return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							lastWeek: function () {
								return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT"
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "en %s",
							past: "hace %s",
							s: "unos segundos",
							m: "un minuto",
							mm: "%d minutos",
							h: "una hora",
							hh: "%d horas",
							d: "un d\u00eda",
							dd: "%d d\u00edas",
							M: "un mes",
							MM: "%d meses",
							y: "un a\u00f1o",
							yy: "%d a\u00f1os"
						},
						ordinal: "%d\u00ba",
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					function t(e, t, n, r) {
						return r || t ? "paari sekundi" : "paar sekundit"
					}
					e.lang("et", {
						months: "jaanuar_veebruar_m\u00e4rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
						monthsShort: "jaan_veebr_m\u00e4rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
						weekdays: "p\u00fchap\u00e4ev_esmasp\u00e4ev_teisip\u00e4ev_kolmap\u00e4ev_neljap\u00e4ev_reede_laup\u00e4ev".split("_"),
						weekdaysShort: "P_E_T_K_N_R_L".split("_"),
						weekdaysMin: "P_E_T_K_N_R_L".split("_"),
						longDateFormat: {
							LT: "H:mm",
							L: "DD.MM.YYYY",
							LL: "D. MMMM YYYY",
							LLL: "D. MMMM YYYY LT",
							LLLL: "dddd, D. MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[T\u00e4na,] LT",
							nextDay: "[Homme,] LT",
							nextWeek: "[J\u00e4rgmine] dddd LT",
							lastDay: "[Eile,] LT",
							lastWeek: "[Eelmine] dddd LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s p\u00e4rast",
							past: "%s tagasi",
							s: t,
							m: "minut",
							mm: "%d minutit",
							h: "tund",
							hh: "%d tundi",
							d: "p\u00e4ev",
							dd: "%d p\u00e4eva",
							M: "kuu",
							MM: "%d kuud",
							y: "aasta",
							yy: "%d aastat"
						},
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					e.lang("eu", {
						months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),
						monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),
						weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),
						weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"),
						weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "YYYY-MM-DD",
							LL: "YYYYko MMMMren D[a]",
							LLL: "YYYYko MMMMren D[a] LT",
							LLLL: "dddd, YYYYko MMMMren D[a] LT",
							l: "YYYY-M-D",
							ll: "YYYYko MMM D[a]",
							lll: "YYYYko MMM D[a] LT",
							llll: "ddd, YYYYko MMM D[a] LT"
						},
						calendar: {
							sameDay: "[gaur] LT[etan]",
							nextDay: "[bihar] LT[etan]",
							nextWeek: "dddd LT[etan]",
							lastDay: "[atzo] LT[etan]",
							lastWeek: "[aurreko] dddd LT[etan]",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s barru",
							past: "duela %s",
							s: "segundo batzuk",
							m: "minutu bat",
							mm: "%d minutu",
							h: "ordu bat",
							hh: "%d ordu",
							d: "egun bat",
							dd: "%d egun",
							M: "hilabete bat",
							MM: "%d hilabete",
							y: "urte bat",
							yy: "%d urte"
						},
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 7
						}
					})
				}
				(),
				function () {
					function r(e, t, n, r) {
						var s = "";
						switch (n) {
						case "s":
							return r ? "muutaman sekunnin" : "muutama sekunti";
						case "m":
							return r ? "minuutin" : "minuutti";
						case "mm":
							s = r ? "minuutin" : "minuuttia";
							break;
						case "h":
							return r ? "tunnin" : "tunti";
						case "hh":
							s = r ? "tunnin" : "tuntia";
							break;
						case "d":
							return r ? "p\u00e4iv\u00e4n" : "p\u00e4iv\u00e4";
						case "dd":
							s = r ? "p\u00e4iv\u00e4n" : "p\u00e4iv\u00e4\u00e4";
							break;
						case "M":
							return r ? "kuukauden" : "kuukausi";
						case "MM":
							s = r ? "kuukauden" : "kuukautta";
							break;
						case "y":
							return r ? "vuoden" : "vuosi";
						case "yy":
							s = r ? "vuoden" : "vuotta"
						}
						return s = i(e, r) + " " + s,
						s
					}
					function i(e, r) {
						return e < 10 ? r ? n[e] : t[e] : e
					}
					var t = "nolla yksi kaksi kolme nelj\u00e4 viisi kuusi seitsem\u00e4n kahdeksan yhdeks\u00e4n".split(" "),
					n = ["nolla", "yhden", "kahden", "kolmen", "nelj\u00e4n", "viiden", "kuuden", t[7], t[8], t[9]];
					e.lang("fi", {
						months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes\u00e4kuu_hein\u00e4kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
						monthsShort: "tam_hel_maa_huh_tou_kes_hei_elo_syy_lok_mar_jou".split("_"),
						weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
						weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
						weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
						longDateFormat: {
							LT: "HH.mm",
							L: "DD.MM.YYYY",
							LL: "Do MMMM[ta] YYYY",
							LLL: "Do MMMM[ta] YYYY, [klo] LT",
							LLLL: "dddd, Do MMMM[ta] YYYY, [klo] LT",
							l: "D.M.YYYY",
							ll: "Do MMM YYYY",
							lll: "Do MMM YYYY, [klo] LT",
							llll: "ddd, Do MMM YYYY, [klo] LT"
						},
						calendar: {
							sameDay: "[t\u00e4n\u00e4\u00e4n] [klo] LT",
							nextDay: "[huomenna] [klo] LT",
							nextWeek: "dddd [klo] LT",
							lastDay: "[eilen] [klo] LT",
							lastWeek: "[viime] dddd[na] [klo] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s p\u00e4\u00e4st\u00e4",
							past: "%s sitten",
							s: r,
							m: r,
							mm: r,
							h: r,
							hh: r,
							d: r,
							dd: r,
							M: r,
							MM: r,
							y: r,
							yy: r
						},
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					e.lang("fr-ca", {
						months: "janvier_f\u00e9vrier_mars_avril_mai_juin_juillet_ao\u00fbt_septembre_octobre_novembre_d\u00e9cembre".split("_"),
						monthsShort: "janv._f\u00e9vr._mars_avr._mai_juin_juil._ao\u00fbt_sept._oct._nov._d\u00e9c.".split("_"),
						weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
						weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
						weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "YYYY-MM-DD",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd D MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[Aujourd'hui \u00e0] LT",
							nextDay: "[Demain \u00e0] LT",
							nextWeek: "dddd [\u00e0] LT",
							lastDay: "[Hier \u00e0] LT",
							lastWeek: "dddd [dernier \u00e0] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "dans %s",
							past: "il y a %s",
							s: "quelques secondes",
							m: "une minute",
							mm: "%d minutes",
							h: "une heure",
							hh: "%d heures",
							d: "un jour",
							dd: "%d jours",
							M: "un mois",
							MM: "%d mois",
							y: "un an",
							yy: "%d ans"
						},
						ordinal: function (e) {
							return e + (e === 1 ? "er" : "\u00e8me")
						}
					})
				}
				(),
				function () {
					e.lang("fr", {
						months: "janvier_f\u00e9vrier_mars_avril_mai_juin_juillet_ao\u00fbt_septembre_octobre_novembre_d\u00e9cembre".split("_"),
						monthsShort: "janv._f\u00e9vr._mars_avr._mai_juin_juil._ao\u00fbt_sept._oct._nov._d\u00e9c.".split("_"),
						weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
						weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
						weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd D MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[Aujourd'hui \u00e0] LT",
							nextDay: "[Demain \u00e0] LT",
							nextWeek: "dddd [\u00e0] LT",
							lastDay: "[Hier \u00e0] LT",
							lastWeek: "dddd [dernier \u00e0] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "dans %s",
							past: "il y a %s",
							s: "quelques secondes",
							m: "une minute",
							mm: "%d minutes",
							h: "une heure",
							hh: "%d heures",
							d: "un jour",
							dd: "%d jours",
							M: "un mois",
							MM: "%d mois",
							y: "un an",
							yy: "%d ans"
						},
						ordinal: function (e) {
							return e + (e === 1 ? "er" : "\u00e8me")
						},
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					e.lang("gl", {
						months: "Xaneiro_Febreiro_Marzo_Abril_Maio_Xu\u00f1o_Xullo_Agosto_Setembro_Octubro_Novembro_Decembro".split("_"),
						monthsShort: "Xan._Feb._Mar._Abr._Mai._Xu\u00f1._Xul._Ago._Set._Out._Nov._Dec.".split("_"),
						weekdays: "Domingo_Luns_Martes_M\u00e9rcores_Xoves_Venres_S\u00e1bado".split("_"),
						weekdaysShort: "Dom._Lun._Mar._M\u00e9r._Xov._Ven._S\u00e1b.".split("_"),
						weekdaysMin: "Do_Lu_Ma_M\u00e9_Xo_Ve_S\u00e1".split("_"),
						longDateFormat: {
							LT: "H:mm",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd D MMMM YYYY LT"
						},
						calendar: {
							sameDay: function () {
								return "[hoxe " + (this.hours() !== 1 ? "\u00e1s" : "a") + "] LT"
							},
							nextDay: function () {
								return "[ma\u00f1\u00e1 " + (this.hours() !== 1 ? "\u00e1s" : "a") + "] LT"
							},
							nextWeek: function () {
								return "dddd [" + (this.hours() !== 1 ? "\u00e1s" : "a") + "] LT"
							},
							lastDay: function () {
								return "[onte " + (this.hours() !== 1 ? "\u00e1" : "a") + "] LT"
							},
							lastWeek: function () {
								return "[o] dddd [pasado " + (this.hours() !== 1 ? "\u00e1s" : "a") + "] LT"
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "en %s",
							past: "fai %s",
							s: "uns segundo",
							m: "un minuto",
							mm: "%d minutos",
							h: "unha hora",
							hh: "%d horas",
							d: "un d\u00eda",
							dd: "%d d\u00edas",
							M: "un mes",
							MM: "%d meses",
							y: "un ano",
							yy: "%d anos"
						},
						ordinal: "%d\u00ba",
						week: {
							dow: 1,
							doy: 7
						}
					})
				}
				(),
				function () {
					e.lang("he", {
						months: "\u05d9\u05e0\u05d5\u05d0\u05e8_\u05e4\u05d1\u05e8\u05d5\u05d0\u05e8_\u05de\u05e8\u05e5_\u05d0\u05e4\u05e8\u05d9\u05dc_\u05de\u05d0\u05d9_\u05d9\u05d5\u05e0\u05d9_\u05d9\u05d5\u05dc\u05d9_\u05d0\u05d5\u05d2\u05d5\u05e1\u05d8_\u05e1\u05e4\u05d8\u05de\u05d1\u05e8_\u05d0\u05d5\u05e7\u05d8\u05d5\u05d1\u05e8_\u05e0\u05d5\u05d1\u05de\u05d1\u05e8_\u05d3\u05e6\u05de\u05d1\u05e8".split("_"),
						monthsShort: "\u05d9\u05e0\u05d5\u05f3_\u05e4\u05d1\u05e8\u05f3_\u05de\u05e8\u05e5_\u05d0\u05e4\u05e8\u05f3_\u05de\u05d0\u05d9_\u05d9\u05d5\u05e0\u05d9_\u05d9\u05d5\u05dc\u05d9_\u05d0\u05d5\u05d2\u05f3_\u05e1\u05e4\u05d8\u05f3_\u05d0\u05d5\u05e7\u05f3_\u05e0\u05d5\u05d1\u05f3_\u05d3\u05e6\u05de\u05f3".split("_"),
						weekdays: "\u05e8\u05d0\u05e9\u05d5\u05df_\u05e9\u05e0\u05d9_\u05e9\u05dc\u05d9\u05e9\u05d9_\u05e8\u05d1\u05d9\u05e2\u05d9_\u05d7\u05de\u05d9\u05e9\u05d9_\u05e9\u05d9\u05e9\u05d9_\u05e9\u05d1\u05ea".split("_"),
						weekdaysShort: "\u05d0\u05f3_\u05d1\u05f3_\u05d2\u05f3_\u05d3\u05f3_\u05d4\u05f3_\u05d5\u05f3_\u05e9\u05f3".split("_"),
						weekdaysMin: "\u05d0_\u05d1_\u05d2_\u05d3_\u05d4_\u05d5_\u05e9".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD/MM/YYYY",
							LL: "D [\u05d1]MMMM YYYY",
							LLL: "D [\u05d1]MMMM YYYY LT",
							LLLL: "dddd, D [\u05d1]MMMM YYYY LT",
							l: "D/M/YYYY",
							ll: "D MMM YYYY",
							lll: "D MMM YYYY LT",
							llll: "ddd, D MMM YYYY LT"
						},
						calendar: {
							sameDay: "[\u05d4\u05d9\u05d5\u05dd \u05d1\u05be]LT",
							nextDay: "[\u05de\u05d7\u05e8 \u05d1\u05be]LT",
							nextWeek: "dddd [\u05d1\u05e9\u05e2\u05d4] LT",
							lastDay: "[\u05d0\u05ea\u05de\u05d5\u05dc \u05d1\u05be]LT",
							lastWeek: "[\u05d1\u05d9\u05d5\u05dd] dddd [\u05d4\u05d0\u05d7\u05e8\u05d5\u05df \u05d1\u05e9\u05e2\u05d4] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "\u05d1\u05e2\u05d5\u05d3 %s",
							past: "\u05dc\u05e4\u05e0\u05d9 %s",
							s: "\u05de\u05e1\u05e4\u05e8 \u05e9\u05e0\u05d9\u05d5\u05ea",
							m: "\u05d3\u05e7\u05d4",
							mm: "%d \u05d3\u05e7\u05d5\u05ea",
							h: "\u05e9\u05e2\u05d4",
							hh: "%d \u05e9\u05e2\u05d5\u05ea",
							d: "\u05d9\u05d5\u05dd",
							dd: "%d \u05d9\u05de\u05d9\u05dd",
							M: "\u05d7\u05d5\u05d3\u05e9",
							MM: "%d \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd",
							y: "\u05e9\u05e0\u05d4",
							yy: "%d \u05e9\u05e0\u05d9\u05dd"
						}
					})
				}
				(),
				function () {
					function n(e, t, n, r) {
						var i = e,
						s;
						switch (n) {
						case "s":
							return r || t ? "n\u00e9h\u00e1ny m\u00e1sodperc" : "n\u00e9h\u00e1ny m\u00e1sodperce";
						case "m":
							return "egy" + (r || t ? " perc" : " perce");
						case "mm":
							return i + (r || t ? " perc" : " perce");
						case "h":
							return "egy" + (r || t ? " \u00f3ra" : " \u00f3r\u00e1ja");
						case "hh":
							return i + (r || t ? " \u00f3ra" : " \u00f3r\u00e1ja");
						case "d":
							return "egy" + (r || t ? " nap" : " napja");
						case "dd":
							return i + (r || t ? " nap" : " napja");
						case "M":
							return "egy" + (r || t ? " h\u00f3nap" : " h\u00f3napja");
						case "MM":
							return i + (r || t ? " h\u00f3nap" : " h\u00f3napja");
						case "y":
							return "egy" + (r || t ? " \u00e9v" : " \u00e9ve");
						case "yy":
							return i + (r || t ? " \u00e9v" : " \u00e9ve")
						}
						return ""
					}
					function r(e) {
						return (e ? "" : "m\u00falt ") + "[" + t[this.day()] + "] LT[-kor]"
					}
					var t = "vas\u00e1rnap h\u00e9tf\u0151n kedden szerd\u00e1n cs\u00fct\u00f6rt\u00f6k\u00f6n p\u00e9nteken szombaton".split(" ");
					e.lang("hu", {
						months: "janu\u00e1r_febru\u00e1r_m\u00e1rcius_\u00e1prilis_m\u00e1jus_j\u00fanius_j\u00falius_augusztus_szeptember_okt\u00f3ber_november_december".split("_"),
						monthsShort: "jan_feb_m\u00e1rc_\u00e1pr_m\u00e1j_j\u00fan_j\u00fal_aug_szept_okt_nov_dec".split("_"),
						weekdays: "vas\u00e1rnap_h\u00e9tf\u0151_kedd_szerda_cs\u00fct\u00f6rt\u00f6k_p\u00e9ntek_szombat".split("_"),
						weekdaysShort: "v_h_k_sze_cs_p_szo".split("_"),
						longDateFormat: {
							LT: "H:mm",
							L: "YYYY.MM.DD.",
							LL: "YYYY. MMMM D.",
							LLL: "YYYY. MMMM D., LT",
							LLLL: "YYYY. MMMM D., dddd LT"
						},
						calendar: {
							sameDay: "[ma] LT[-kor]",
							nextDay: "[holnap] LT[-kor]",
							nextWeek: function () {
								return r.call(this, !0)
							},
							lastDay: "[tegnap] LT[-kor]",
							lastWeek: function () {
								return r.call(this, !1)
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "%s m\u00falva",
							past: "%s",
							s: n,
							m: n,
							mm: n,
							h: n,
							hh: n,
							d: n,
							dd: n,
							M: n,
							MM: n,
							y: n,
							yy: n
						},
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 7
						}
					})
				}
				(),
				function () {
					e.lang("id", {
						months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
						monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),
						weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
						weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
						weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
						longDateFormat: {
							LT: "HH.mm",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY [pukul] LT",
							LLLL: "dddd, D MMMM YYYY [pukul] LT"
						},
						meridiem: function (e, t, n) {
							return e < 11 ? "pagi" : e < 15 ? "siang" : e < 19 ? "sore" : "malam"
						},
						calendar: {
							sameDay: "[Hari ini pukul] LT",
							nextDay: "[Besok pukul] LT",
							nextWeek: "dddd [pukul] LT",
							lastDay: "[Kemarin pukul] LT",
							lastWeek: "dddd [lalu pukul] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "dalam %s",
							past: "%s yang lalu",
							s: "beberapa detik",
							m: "semenit",
							mm: "%d menit",
							h: "sejam",
							hh: "%d jam",
							d: "sehari",
							dd: "%d hari",
							M: "sebulan",
							MM: "%d bulan",
							y: "setahun",
							yy: "%d tahun"
						},
						week: {
							dow: 1,
							doy: 7
						}
					})
				}
				(),
				function () {
					function t(e) {
						return e % 100 === 11 ? !0 : e % 10 === 1 ? !1 : !0
					}
					function n(e, n, r, i) {
						var s = e + " ";
						switch (r) {
						case "s":
							return n || i ? "nokkrar sek\u00fandur" : "nokkrum sek\u00fandum";
						case "m":
							return n ? "m\u00edn\u00fata" : "m\u00edn\u00fatu";
						case "mm":
							if (t(e))
								return s + (n || i ? "m\u00edn\u00fatur" : "m\u00edn\u00fatum");
							if (n)
								return s + "m\u00edn\u00fata";
							return s + "m\u00edn\u00fatu";
						case "hh":
							if (t(e))
								return s + (n || i ? "klukkustundir" : "klukkustundum");
							return s + "klukkustund";
						case "d":
							if (n)
								return "dagur";
							return i ? "dag" : "degi";
						case "dd":
							if (t(e))
								return n ? s + "dagar" : s + (i ? "daga" : "d\u00f6gum");
							if (n)
								return s + "dagur";
							return s + (i ? "dag" : "degi");
						case "M":
							if (n)
								return "m\u00e1nu\u00f0ur";
							return i ? "m\u00e1nu\u00f0" : "m\u00e1nu\u00f0i";
						case "MM":
							if (t(e))
								return n ? s + "m\u00e1nu\u00f0ir" : s + (i ? "m\u00e1nu\u00f0i" : "m\u00e1nu\u00f0um");
							if (n)
								return s + "m\u00e1nu\u00f0ur";
							return s + (i ? "m\u00e1nu\u00f0" : "m\u00e1nu\u00f0i");
						case "y":
							return n || i ? "\u00e1r" : "\u00e1ri";
						case "yy":
							if (t(e))
								return s + (n || i ? "\u00e1r" : "\u00e1rum");
							return s + (n || i ? "\u00e1r" : "\u00e1ri")
						}
					}
					e.lang("is", {
						months: "jan\u00faar_febr\u00faar_mars_apr\u00edl_ma\u00ed_j\u00fan\u00ed_j\u00fal\u00ed_\u00e1g\u00fast_september_okt\u00f3ber_n\u00f3vember_desember".split("_"),
						monthsShort: "jan_feb_mar_apr_ma\u00ed_j\u00fan_j\u00fal_\u00e1g\u00fa_sep_okt_n\u00f3v_des".split("_"),
						weekdays: "sunnudagur_m\u00e1nudagur_\u00feri\u00f0judagur_mi\u00f0vikudagur_fimmtudagur_f\u00f6studagur_laugardagur".split("_"),
						weekdaysShort: "sun_m\u00e1n_\u00feri_mi\u00f0_fim_f\u00f6s_lau".split("_"),
						weekdaysMin: "Su_M\u00e1_\u00der_Mi_Fi_F\u00f6_La".split("_"),
						longDateFormat: {
							LT: "H:mm",
							L: "DD/MM/YYYY",
							LL: "D. MMMM YYYY",
							LLL: "D. MMMM YYYY [kl.] LT",
							LLLL: "dddd, D. MMMM YYYY [kl.] LT"
						},
						calendar: {
							sameDay: "[\u00ed dag kl.] LT",
							nextDay: "[\u00e1 morgun kl.] LT",
							nextWeek: "dddd [kl.] LT",
							lastDay: "[\u00ed g\u00e6r kl.] LT",
							lastWeek: "[s\u00ed\u00f0asta] dddd [kl.] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "eftir %s",
							past: "fyrir %s s\u00ed\u00f0an",
							s: n,
							m: n,
							mm: n,
							h: "klukkustund",
							hh: n,
							d: n,
							dd: n,
							M: n,
							MM: n,
							y: n,
							yy: n
						},
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					e.lang("it", {
						months: "Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre".split("_"),
						monthsShort: "Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),
						weekdays: "Domenica_Luned\u00ec_Marted\u00ec_Mercoled\u00ec_Gioved\u00ec_Venerd\u00ec_Sabato".split("_"),
						weekdaysShort: "Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
						weekdaysMin: "D_L_Ma_Me_G_V_S".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd, D MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[Oggi alle] LT",
							nextDay: "[Domani alle] LT",
							nextWeek: "dddd [alle] LT",
							lastDay: "[Ieri alle] LT",
							lastWeek: "[lo scorso] dddd [alle] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "in %s",
							past: "%s fa",
							s: "secondi",
							m: "un minuto",
							mm: "%d minuti",
							h: "un'ora",
							hh: "%d ore",
							d: "un giorno",
							dd: "%d giorni",
							M: "un mese",
							MM: "%d mesi",
							y: "un anno",
							yy: "%d anni"
						},
						ordinal: "%d\u00ba",
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					e.lang("ja", {
						months: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
						monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
						weekdays: "\u65e5\u66dc\u65e5_\u6708\u66dc\u65e5_\u706b\u66dc\u65e5_\u6c34\u66dc\u65e5_\u6728\u66dc\u65e5_\u91d1\u66dc\u65e5_\u571f\u66dc\u65e5".split("_"),
						weekdaysShort: "\u65e5_\u6708_\u706b_\u6c34_\u6728_\u91d1_\u571f".split("_"),
						weekdaysMin: "\u65e5_\u6708_\u706b_\u6c34_\u6728_\u91d1_\u571f".split("_"),
						longDateFormat: {
							LT: "Ah\u6642m\u5206",
							L: "YYYY/MM/DD",
							LL: "YYYY\u5e74M\u6708D\u65e5",
							LLL: "YYYY\u5e74M\u6708D\u65e5LT",
							LLLL: "YYYY\u5e74M\u6708D\u65e5LT dddd"
						},
						meridiem: function (e, t, n) {
							return e < 12 ? "\u5348\u524d" : "\u5348\u5f8c"
						},
						calendar: {
							sameDay: "[\u4eca\u65e5] LT",
							nextDay: "[\u660e\u65e5] LT",
							nextWeek: "[\u6765\u9031]dddd LT",
							lastDay: "[\u6628\u65e5] LT",
							lastWeek: "[\u524d\u9031]dddd LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s\u5f8c",
							past: "%s\u524d",
							s: "\u6570\u79d2",
							m: "1\u5206",
							mm: "%d\u5206",
							h: "1\u6642\u9593",
							hh: "%d\u6642\u9593",
							d: "1\u65e5",
							dd: "%d\u65e5",
							M: "1\u30f6\u6708",
							MM: "%d\u30f6\u6708",
							y: "1\u5e74",
							yy: "%d\u5e74"
						}
					})
				}
				(),
				function () {
					e.lang("ko", {
						months: "1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),
						monthsShort: "1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),
						weekdays: "\uc77c\uc694\uc77c_\uc6d4\uc694\uc77c_\ud654\uc694\uc77c_\uc218\uc694\uc77c_\ubaa9\uc694\uc77c_\uae08\uc694\uc77c_\ud1a0\uc694\uc77c".split("_"),
						weekdaysShort: "\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),
						weekdaysMin: "\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),
						longDateFormat: {
							LT: "A h\uc2dc mm\ubd84",
							L: "YYYY.MM.DD",
							LL: "YYYY\ub144 MMMM D\uc77c",
							LLL: "YYYY\ub144 MMMM D\uc77c LT",
							LLLL: "YYYY\ub144 MMMM D\uc77c dddd LT"
						},
						meridiem: function (e, t, n) {
							return e < 12 ? "\uc624\uc804" : "\uc624\ud6c4"
						},
						calendar: {
							sameDay: "\uc624\ub298 LT",
							nextDay: "\ub0b4\uc77c LT",
							nextWeek: "dddd LT",
							lastDay: "\uc5b4\uc81c LT",
							lastWeek: "\uc9c0\ub09c\uc8fc dddd LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s \ud6c4",
							past: "%s \uc804",
							s: "\uba87\ucd08",
							ss: "%d\ucd08",
							m: "\uc77c\ubd84",
							mm: "%d\ubd84",
							h: "\ud55c\uc2dc\uac04",
							hh: "%d\uc2dc\uac04",
							d: "\ud558\ub8e8",
							dd: "%d\uc77c",
							M: "\ud55c\ub2ec",
							MM: "%d\ub2ec",
							y: "\uc77c\ub144",
							yy: "%d\ub144"
						},
						ordinal: "%d\uc77c"
					})
				}
				(),
				function () {
					function n(e, t, n) {
						var r = e.split("_");
						return n ? t % 10 === 1 && t !== 11 ? r[2] : r[3] : t % 10 === 1 && t !== 11 ? r[0] : r[1]
					}
					function r(e, r, i) {
						return e + " " + n(t[i], e, r)
					}
					var t = {
						mm: "min\u016bti_min\u016btes_min\u016bte_min\u016btes",
						hh: "stundu_stundas_stunda_stundas",
						dd: "dienu_dienas_diena_dienas",
						MM: "m\u0113nesi_m\u0113ne\u0161us_m\u0113nesis_m\u0113ne\u0161i",
						yy: "gadu_gadus_gads_gadi"
					};
					e.lang("lv", {
						months: "janv\u0101ris_febru\u0101ris_marts_apr\u012blis_maijs_j\u016bnijs_j\u016blijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
						monthsShort: "jan_feb_mar_apr_mai_j\u016bn_j\u016bl_aug_sep_okt_nov_dec".split("_"),
						weekdays: "sv\u0113tdiena_pirmdiena_otrdiena_tre\u0161diena_ceturtdiena_piektdiena_sestdiena".split("_"),
						weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"),
						weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "YYYY.MM.DD.",
							LL: "YYYY. [gada] D. MMMM",
							LLL: "YYYY. [gada] D. MMMM, LT",
							LLLL: "YYYY. [gada] D. MMMM, dddd, LT"
						},
						calendar: {
							sameDay: "[\u0160odien pulksten] LT",
							nextDay: "[R\u012bt pulksten] LT",
							nextWeek: "dddd [pulksten] LT",
							lastDay: "[Vakar pulksten] LT",
							lastWeek: "[Pag\u0101ju\u0161\u0101] dddd [pulksten] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s v\u0113l\u0101k",
							past: "%s agr\u0101k",
							s: "da\u017eas sekundes",
							m: "min\u016bti",
							mm: r,
							h: "stundu",
							hh: r,
							d: "dienu",
							dd: r,
							M: "m\u0113nesi",
							MM: r,
							y: "gadu",
							yy: r
						},
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					e.lang("nb", {
						months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
						monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
						weekdays: "s\u00f8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\u00f8rdag".split("_"),
						weekdaysShort: "s\u00f8n_man_tir_ons_tor_fre_l\u00f8r".split("_"),
						weekdaysMin: "s\u00f8_ma_ti_on_to_fr_l\u00f8".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "YYYY-MM-DD",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd D MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[I dag klokken] LT",
							nextDay: "[I morgen klokken] LT",
							nextWeek: "dddd [klokken] LT",
							lastDay: "[I g\u00e5r klokken] LT",
							lastWeek: "[Forrige] dddd [klokken] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "om %s",
							past: "for %s siden",
							s: "noen sekunder",
							m: "ett minutt",
							mm: "%d minutter",
							h: "en time",
							hh: "%d timer",
							d: "en dag",
							dd: "%d dager",
							M: "en m\u00e5ned",
							MM: "%d m\u00e5neder",
							y: "ett \u00e5r",
							yy: "%d \u00e5r"
						},
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					var t = {
						1: "\u0967",
						2: "\u0968",
						3: "\u0969",
						4: "\u096a",
						5: "\u096b",
						6: "\u096c",
						7: "\u096d",
						8: "\u096e",
						9: "\u096f",
						0: "\u0966"
					},
					n = {
						"\u0967": "1",
						"\u0968": "2",
						"\u0969": "3",
						"\u096a": "4",
						"\u096b": "5",
						"\u096c": "6",
						"\u096d": "7",
						"\u096e": "8",
						"\u096f": "9",
						"\u0966": "0"
					};
					e.lang("ne", {
						months: "\u091c\u0928\u0935\u0930\u0940_\u092b\u0947\u092c\u094d\u0930\u0941\u0935\u0930\u0940_\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u093f\u0932_\u092e\u0908_\u091c\u0941\u0928_\u091c\u0941\u0932\u093e\u0908_\u0905\u0917\u0937\u094d\u091f_\u0938\u0947\u092a\u094d\u091f\u0947\u092e\u094d\u092c\u0930_\u0905\u0915\u094d\u091f\u094b\u092c\u0930_\u0928\u094b\u092d\u0947\u092e\u094d\u092c\u0930_\u0921\u093f\u0938\u0947\u092e\u094d\u092c\u0930".split("_"),
						monthsShort: "\u091c\u0928._\u092b\u0947\u092c\u094d\u0930\u0941._\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u093f._\u092e\u0908_\u091c\u0941\u0928_\u091c\u0941\u0932\u093e\u0908._\u0905\u0917._\u0938\u0947\u092a\u094d\u091f._\u0905\u0915\u094d\u091f\u094b._\u0928\u094b\u092d\u0947._\u0921\u093f\u0938\u0947.".split("_"),
						weekdays: "\u0906\u0907\u0924\u092c\u093e\u0930_\u0938\u094b\u092e\u092c\u093e\u0930_\u092e\u0919\u094d\u0917\u0932\u092c\u093e\u0930_\u092c\u0941\u0927\u092c\u093e\u0930_\u092c\u093f\u0939\u093f\u092c\u093e\u0930_\u0936\u0941\u0915\u094d\u0930\u092c\u093e\u0930_\u0936\u0928\u093f\u092c\u093e\u0930".split("_"),
						weekdaysShort: "\u0906\u0907\u0924._\u0938\u094b\u092e._\u092e\u0919\u094d\u0917\u0932._\u092c\u0941\u0927._\u092c\u093f\u0939\u093f._\u0936\u0941\u0915\u094d\u0930._\u0936\u0928\u093f.".split("_"),
						weekdaysMin: "\u0906\u0907._\u0938\u094b._\u092e\u0919\u094d_\u092c\u0941._\u092c\u093f._\u0936\u0941._\u0936.".split("_"),
						longDateFormat: {
							LT: "A\u0915\u094b h:mm \u092c\u091c\u0947",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY, LT",
							LLLL: "dddd, D MMMM YYYY, LT"
						},
						preparse: function (e) {
							return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g, function (e) {
								return n[e]
							})
						},
						postformat: function (e) {
							return e.replace(/\d/g, function (e) {
								return t[e]
							})
						},
						meridiem: function (e, t, n) {
							return e < 3 ? "\u0930\u093e\u0924\u0940" : e < 10 ? "\u092c\u093f\u0939\u093e\u0928" : e < 15 ? "\u0926\u093f\u0909\u0901\u0938\u094b" : e < 18 ? "\u092c\u0947\u0932\u0941\u0915\u093e" : e < 20 ? "\u0938\u093e\u0901\u091d" : "\u0930\u093e\u0924\u0940"
						},
						calendar: {
							sameDay: "[\u0906\u091c] LT",
							nextDay: "[\u092d\u094b\u0932\u0940] LT",
							nextWeek: "[\u0906\u0909\u0901\u0926\u094b] dddd[,] LT",
							lastDay: "[\u0939\u093f\u091c\u094b] LT",
							lastWeek: "[\u0917\u090f\u0915\u094b] dddd[,] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s\u092e\u093e",
							past: "%s \u0905\u0917\u093e\u0921\u0940",
							s: "\u0915\u0947\u0939\u0940 \u0938\u092e\u092f",
							m: "\u090f\u0915 \u092e\u093f\u0928\u0947\u091f",
							mm: "%d \u092e\u093f\u0928\u0947\u091f",
							h: "\u090f\u0915 \u0918\u0923\u094d\u091f\u093e",
							hh: "%d \u0918\u0923\u094d\u091f\u093e",
							d: "\u090f\u0915 \u0926\u093f\u0928",
							dd: "%d \u0926\u093f\u0928",
							M: "\u090f\u0915 \u092e\u0939\u093f\u0928\u093e",
							MM: "%d \u092e\u0939\u093f\u0928\u093e",
							y: "\u090f\u0915 \u092c\u0930\u094d\u0937",
							yy: "%d \u092c\u0930\u094d\u0937"
						},
						week: {
							dow: 1,
							doy: 7
						}
					})
				}
				(),
				function () {
					var t = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
					n = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");
					e.lang("nl", {
						months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
						monthsShort: function (e, r) {
							return /-MMM-/.test(r) ? n[e.month()] : t[e.month()]
						},
						weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
						weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
						weekdaysMin: "Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD-MM-YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd D MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[Vandaag om] LT",
							nextDay: "[Morgen om] LT",
							nextWeek: "dddd [om] LT",
							lastDay: "[Gisteren om] LT",
							lastWeek: "[afgelopen] dddd [om] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "over %s",
							past: "%s geleden",
							s: "een paar seconden",
							m: "\u00e9\u00e9n minuut",
							mm: "%d minuten",
							h: "\u00e9\u00e9n uur",
							hh: "%d uur",
							d: "\u00e9\u00e9n dag",
							dd: "%d dagen",
							M: "\u00e9\u00e9n maand",
							MM: "%d maanden",
							y: "\u00e9\u00e9n jaar",
							yy: "%d jaar"
						},
						ordinal: function (e) {
							return e + (e === 1 || e === 8 || e >= 20 ? "ste" : "de")
						},
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					function t(e) {
						return e % 10 < 5 && e % 10 > 1 && ~~(e / 10) !== 1
					}
					function n(e, n, r) {
						var i = e + " ";
						switch (r) {
						case "m":
							return n ? "minuta" : "minut\u0119";
						case "mm":
							return i + (t(e) ? "minuty" : "minut");
						case "h":
							return n ? "godzina" : "godzin\u0119";
						case "hh":
							return i + (t(e) ? "godziny" : "godzin");
						case "MM":
							return i + (t(e) ? "miesi\u0105ce" : "miesi\u0119cy");
						case "yy":
							return i + (t(e) ? "lata" : "lat")
						}
					}
					e.lang("pl", {
						months: "stycze\u0144_luty_marzec_kwiecie\u0144_maj_czerwiec_lipiec_sierpie\u0144_wrzesie\u0144_pa\u017adziernik_listopad_grudzie\u0144".split("_"),
						monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_pa\u017a_lis_gru".split("_"),
						weekdays: "niedziela_poniedzia\u0142ek_wtorek_\u015broda_czwartek_pi\u0105tek_sobota".split("_"),
						weekdaysShort: "nie_pon_wt_\u015br_czw_pt_sb".split("_"),
						weekdaysMin: "N_Pn_Wt_\u015ar_Cz_Pt_So".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD-MM-YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd, D MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[Dzi\u015b o] LT",
							nextDay: "[Jutro o] LT",
							nextWeek: "[W] dddd [o] LT",
							lastDay: "[Wczoraj o] LT",
							lastWeek: function () {
								switch (this.day()) {
								case 0:
									return "[W zesz\u0142\u0105 niedziel\u0119 o] LT";
								case 3:
									return "[W zesz\u0142\u0105 \u015brod\u0119 o] LT";
								case 6:
									return "[W zesz\u0142\u0105 sobot\u0119 o] LT";
								default:
									return "[W zesz\u0142y] dddd [o] LT"
								}
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "za %s",
							past: "%s temu",
							s: "kilka sekund",
							m: n,
							mm: n,
							h: n,
							hh: n,
							d: "1 dzie\u0144",
							dd: "%d dni",
							M: "miesi\u0105c",
							MM: n,
							y: "rok",
							yy: n
						},
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					e.lang("pt-br", {
						months: "Janeiro_Fevereiro_Mar\u00e7o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
						monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
						weekdays: "Domingo_Segunda-feira_Ter\u00e7a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S\u00e1bado".split("_"),
						weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_S\u00e1b".split("_"),
						weekdaysMin: "Dom_2\u00aa_3\u00aa_4\u00aa_5\u00aa_6\u00aa_S\u00e1b".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD/MM/YYYY",
							LL: "D \\de MMMM \\de YYYY",
							LLL: "D \\de MMMM \\de YYYY LT",
							LLLL: "dddd, D \\de MMMM \\de YYYY LT"
						},
						calendar: {
							sameDay: "[Hoje \u00e0s] LT",
							nextDay: "[Amanh\u00e3 \u00e0s] LT",
							nextWeek: "dddd [\u00e0s] LT",
							lastDay: "[Ontem \u00e0s] LT",
							lastWeek: function () {
								return this.day() === 0 || this.day() === 6 ? "[\u00daltimo] dddd [\u00e0s] LT" : "[\u00daltima] dddd [\u00e0s] LT"
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "em %s",
							past: "%s atr\u00e1s",
							s: "segundos",
							m: "um minuto",
							mm: "%d minutos",
							h: "uma hora",
							hh: "%d horas",
							d: "um dia",
							dd: "%d dias",
							M: "um m\u00eas",
							MM: "%d meses",
							y: "um ano",
							yy: "%d anos"
						},
						ordinal: "%d\u00ba"
					})
				}
				(),
				function () {
					e.lang("pt", {
						months: "Janeiro_Fevereiro_Mar\u00e7o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
						monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
						weekdays: "Domingo_Segunda-feira_Ter\u00e7a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S\u00e1bado".split("_"),
						weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_S\u00e1b".split("_"),
						weekdaysMin: "Dom_2\u00aa_3\u00aa_4\u00aa_5\u00aa_6\u00aa_S\u00e1b".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD/MM/YYYY",
							LL: "D \\de MMMM \\de YYYY",
							LLL: "D \\de MMMM \\de YYYY LT",
							LLLL: "dddd, D \\de MMMM \\de YYYY LT"
						},
						calendar: {
							sameDay: "[Hoje \u00e0s] LT",
							nextDay: "[Amanh\u00e3 \u00e0s] LT",
							nextWeek: "dddd [\u00e0s] LT",
							lastDay: "[Ontem \u00e0s] LT",
							lastWeek: function () {
								return this.day() === 0 || this.day() === 6 ? "[\u00daltimo] dddd [\u00e0s] LT" : "[\u00daltima] dddd [\u00e0s] LT"
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "em %s",
							past: "%s atr\u00e1s",
							s: "segundos",
							m: "um minuto",
							mm: "%d minutos",
							h: "uma hora",
							hh: "%d horas",
							d: "um dia",
							dd: "%d dias",
							M: "um m\u00eas",
							MM: "%d meses",
							y: "um ano",
							yy: "%d anos"
						},
						ordinal: "%d\u00ba",
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					e.lang("ro", {
						months: "Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie".split("_"),
						monthsShort: "Ian_Feb_Mar_Apr_Mai_Iun_Iul_Aug_Sep_Oct_Noi_Dec".split("_"),
						weekdays: "Duminic\u0103_Luni_Mar\u0163i_Miercuri_Joi_Vineri_S\u00e2mb\u0103t\u0103".split("_"),
						weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_S\u00e2m".split("_"),
						weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_S\u00e2".split("_"),
						longDateFormat: {
							LT: "H:mm",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY H:mm",
							LLLL: "dddd, D MMMM YYYY H:mm"
						},
						calendar: {
							sameDay: "[azi la] LT",
							nextDay: "[m\u00e2ine la] LT",
							nextWeek: "dddd [la] LT",
							lastDay: "[ieri la] LT",
							lastWeek: "[fosta] dddd [la] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "peste %s",
							past: "%s \u00een urm\u0103",
							s: "c\u00e2teva secunde",
							m: "un minut",
							mm: "%d minute",
							h: "o or\u0103",
							hh: "%d ore",
							d: "o zi",
							dd: "%d zile",
							M: "o lun\u0103",
							MM: "%d luni",
							y: "un an",
							yy: "%d ani"
						},
						week: {
							dow: 1,
							doy: 7
						}
					})
				}
				(),
				function () {
					function n(e, n) {
						var r = e.split("_"),
						i = Math.min(t.length, r.length),
						s = -1;
						while (++s < i)
							if (t[s](n))
								return r[s];
						return r[i - 1]
					}
					function r(e, t, r) {
						var i = {
							mm: "\u043c\u0438\u043d\u0443\u0442\u0430_\u043c\u0438\u043d\u0443\u0442\u044b_\u043c\u0438\u043d\u0443\u0442_\u043c\u0438\u043d\u0443\u0442\u044b",
							hh: "\u0447\u0430\u0441_\u0447\u0430\u0441\u0430_\u0447\u0430\u0441\u043e\u0432_\u0447\u0430\u0441\u0430",
							dd: "\u0434\u0435\u043d\u044c_\u0434\u043d\u044f_\u0434\u043d\u0435\u0439_\u0434\u043d\u044f",
							MM: "\u043c\u0435\u0441\u044f\u0446_\u043c\u0435\u0441\u044f\u0446\u0430_\u043c\u0435\u0441\u044f\u0446\u0435\u0432_\u043c\u0435\u0441\u044f\u0446\u0430",
							yy: "\u0433\u043e\u0434_\u0433\u043e\u0434\u0430_\u043b\u0435\u0442_\u0433\u043e\u0434\u0430"
						};
						return r === "m" ? t ? "\u043c\u0438\u043d\u0443\u0442\u0430" : "\u043c\u0438\u043d\u0443\u0442\u0443" : e + " " + n(i[r], +e)
					}
					function i(e, t) {
						var n = {
							nominative: "\u044f\u043d\u0432\u0430\u0440\u044c_\u0444\u0435\u0432\u0440\u0430\u043b\u044c_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0435\u043b\u044c_\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c_\u043e\u043a\u0442\u044f\u0431\u0440\u044c_\u043d\u043e\u044f\u0431\u0440\u044c_\u0434\u0435\u043a\u0430\u0431\u0440\u044c".split("_"),
							accusative: "\u044f\u043d\u0432\u0430\u0440\u044f_\u0444\u0435\u0432\u0440\u0430\u043b\u044f_\u043c\u0430\u0440\u0442\u0430_\u0430\u043f\u0440\u0435\u043b\u044f_\u043c\u0430\u044f_\u0438\u044e\u043d\u044f_\u0438\u044e\u043b\u044f_\u0430\u0432\u0433\u0443\u0441\u0442\u0430_\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044f_\u043e\u043a\u0442\u044f\u0431\u0440\u044f_\u043d\u043e\u044f\u0431\u0440\u044f_\u0434\u0435\u043a\u0430\u0431\u0440\u044f".split("_")
						},
						r = /D[oD]? *MMMM?/.test(t) ? "accusative" : "nominative";
						return n[r][e.month()]
					}
					function s(e, t) {
						var n = {
							nominative: "\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043f\u044f\u0442\u043d\u0438\u0446\u0430_\u0441\u0443\u0431\u0431\u043e\u0442\u0430".split("_"),
							accusative: "\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043f\u044f\u0442\u043d\u0438\u0446\u0443_\u0441\u0443\u0431\u0431\u043e\u0442\u0443".split("_")
						},
						r = /\[ ?[\u0412\u0432] ?(?:\u043f\u0440\u043e\u0448\u043b\u0443\u044e|\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0443\u044e)? ?\] ?dddd/.test(t) ? "accusative" : "nominative";
						return n[r][e.day()]
					}
					var t = [function (e) {
							return e % 10 === 1 && e % 100 !== 11
						}, function (e) {
							return e % 10 >= 2 && e % 10 <= 4 && e % 10 % 1 === 0 && (e % 100 < 12 || e % 100 > 14)
						}, function (e) {
							return e % 10 === 0 || e % 10 >= 5 && e % 10 <= 9 && e % 10 % 1 === 0 || e % 100 >= 11 && e % 100 <= 14 && e % 100 % 1 === 0
						}, function (e) {
							return !0
						}
					];
					e.lang("ru", {
						months: i,
						monthsShort: "\u044f\u043d\u0432_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0439_\u0438\u044e\u043d_\u0438\u044e\u043b_\u0430\u0432\u0433_\u0441\u0435\u043d_\u043e\u043a\u0442_\u043d\u043e\u044f_\u0434\u0435\u043a".split("_"),
						weekdays: s,
						weekdaysShort: "\u0432\u0441\u043a_\u043f\u043d\u0434_\u0432\u0442\u0440_\u0441\u0440\u0434_\u0447\u0442\u0432_\u043f\u0442\u043d_\u0441\u0431\u0442".split("_"),
						weekdaysMin: "\u0432\u0441_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD.MM.YYYY",
							LL: "D MMMM YYYY \u0433.",
							LLL: "D MMMM YYYY \u0433., LT",
							LLLL: "dddd, D MMMM YYYY \u0433., LT"
						},
						calendar: {
							sameDay: "[\u0421\u0435\u0433\u043e\u0434\u043d\u044f \u0432] LT",
							nextDay: "[\u0417\u0430\u0432\u0442\u0440\u0430 \u0432] LT",
							lastDay: "[\u0412\u0447\u0435\u0440\u0430 \u0432] LT",
							nextWeek: function () {
								return this.day() === 2 ? "[\u0412\u043e] dddd [\u0432] LT" : "[\u0412] dddd [\u0432] LT"
							},
							lastWeek: function () {
								switch (this.day()) {
								case 0:
									return "[\u0412 \u043f\u0440\u043e\u0448\u043b\u043e\u0435] dddd [\u0432] LT";
								case 1:
								case 2:
								case 4:
									return "[\u0412 \u043f\u0440\u043e\u0448\u043b\u044b\u0439] dddd [\u0432] LT";
								case 3:
								case 5:
								case 6:
									return "[\u0412 \u043f\u0440\u043e\u0448\u043b\u0443\u044e] dddd [\u0432] LT"
								}
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "\u0447\u0435\u0440\u0435\u0437 %s",
							past: "%s \u043d\u0430\u0437\u0430\u0434",
							s: "\u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434",
							m: r,
							mm: r,
							h: "\u0447\u0430\u0441",
							hh: r,
							d: "\u0434\u0435\u043d\u044c",
							dd: r,
							M: "\u043c\u0435\u0441\u044f\u0446",
							MM: r,
							y: "\u0433\u043e\u0434",
							yy: r
						},
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 7
						}
					})
				}
				(),
				function () {
					function t(e, t, n) {
						var r = e + " ";
						switch (n) {
						case "m":
							return t ? "ena minuta" : "eno minuto";
						case "mm":
							return e === 1 ? r += "minuta" : e === 2 ? r += "minuti" : e === 3 || e === 4 ? r += "minute" : r += "minut",
							r;
						case "h":
							return t ? "ena ura" : "eno uro";
						case "hh":
							return e === 1 ? r += "ura" : e === 2 ? r += "uri" : e === 3 || e === 4 ? r += "ure" : r += "ur",
							r;
						case "dd":
							return e === 1 ? r += "dan" : r += "dni",
							r;
						case "MM":
							return e === 1 ? r += "mesec" : e === 2 ? r += "meseca" : e === 3 || e === 4 ? r += "mesece" : r += "mesecev",
							r;
						case "yy":
							return e === 1 ? r += "leto" : e === 2 ? r += "leti" : e === 3 || e === 4 ? r += "leta" : r += "let",
							r
						}
					}
					e.lang("sl", {
						months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
						monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
						weekdays: "nedelja_ponedeljek_torek_sreda_\u010detrtek_petek_sobota".split("_"),
						weekdaysShort: "ned._pon._tor._sre._\u010det._pet._sob.".split("_"),
						weekdaysMin: "ne_po_to_sr_\u010de_pe_so".split("_"),
						longDateFormat: {
							LT: "H:mm",
							L: "DD. MM. YYYY",
							LL: "D. MMMM YYYY",
							LLL: "D. MMMM YYYY LT",
							LLLL: "dddd, D. MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[danes ob] LT",
							nextDay: "[jutri ob] LT",
							nextWeek: function () {
								switch (this.day()) {
								case 0:
									return "[v] [nedeljo] [ob] LT";
								case 3:
									return "[v] [sredo] [ob] LT";
								case 6:
									return "[v] [soboto] [ob] LT";
								case 1:
								case 2:
								case 4:
								case 5:
									return "[v] dddd [ob] LT"
								}
							},
							lastDay: "[v\u010deraj ob] LT",
							lastWeek: function () {
								switch (this.day()) {
								case 0:
								case 3:
								case 6:
									return "[prej\u0161nja] dddd [ob] LT";
								case 1:
								case 2:
								case 4:
								case 5:
									return "[prej\u0161nji] dddd [ob] LT"
								}
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "\u010dez %s",
							past: "%s nazaj",
							s: "nekaj sekund",
							m: t,
							mm: t,
							h: t,
							hh: t,
							d: "en dan",
							dd: t,
							M: "en mesec",
							MM: t,
							y: "eno leto",
							yy: t
						},
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 7
						}
					})
				}
				(),
				function () {
					e.lang("sv", {
						months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
						monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
						weekdays: "s\u00f6ndag_m\u00e5ndag_tisdag_onsdag_torsdag_fredag_l\u00f6rdag".split("_"),
						weekdaysShort: "s\u00f6n_m\u00e5n_tis_ons_tor_fre_l\u00f6r".split("_"),
						weekdaysMin: "s\u00f6_m\u00e5_ti_on_to_fr_l\u00f6".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "YYYY-MM-DD",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd D MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[Idag klockan] LT",
							nextDay: "[Imorgon klockan] LT",
							lastDay: "[Ig\u00e5r klockan] LT",
							nextWeek: "dddd [klockan] LT",
							lastWeek: "[F\u00f6rra] dddd[en klockan] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "om %s",
							past: "f\u00f6r %s sedan",
							s: "n\u00e5gra sekunder",
							m: "en minut",
							mm: "%d minuter",
							h: "en timme",
							hh: "%d timmar",
							d: "en dag",
							dd: "%d dagar",
							M: "en m\u00e5nad",
							MM: "%d m\u00e5nader",
							y: "ett \u00e5r",
							yy: "%d \u00e5r"
						},
						ordinal: function (e) {
							var t = e % 10,
							n = ~~(e % 100 / 10) === 1 ? "e" : t === 1 ? "a" : t === 2 ? "a" : t === 3 ? "e" : "e";
							return e + n
						},
						week: {
							dow: 1,
							doy: 4
						}
					})
				}
				(),
				function () {
					e.lang("th", {
						months: "\u0e21\u0e01\u0e23\u0e32\u0e04\u0e21_\u0e01\u0e38\u0e21\u0e20\u0e32\u0e1e\u0e31\u0e19\u0e18\u0e4c_\u0e21\u0e35\u0e19\u0e32\u0e04\u0e21_\u0e40\u0e21\u0e29\u0e32\u0e22\u0e19_\u0e1e\u0e24\u0e29\u0e20\u0e32\u0e04\u0e21_\u0e21\u0e34\u0e16\u0e38\u0e19\u0e32\u0e22\u0e19_\u0e01\u0e23\u0e01\u0e0e\u0e32\u0e04\u0e21_\u0e2a\u0e34\u0e07\u0e2b\u0e32\u0e04\u0e21_\u0e01\u0e31\u0e19\u0e22\u0e32\u0e22\u0e19_\u0e15\u0e38\u0e25\u0e32\u0e04\u0e21_\u0e1e\u0e24\u0e28\u0e08\u0e34\u0e01\u0e32\u0e22\u0e19_\u0e18\u0e31\u0e19\u0e27\u0e32\u0e04\u0e21".split("_"),
						monthsShort: "\u0e21\u0e01\u0e23\u0e32_\u0e01\u0e38\u0e21\u0e20\u0e32_\u0e21\u0e35\u0e19\u0e32_\u0e40\u0e21\u0e29\u0e32_\u0e1e\u0e24\u0e29\u0e20\u0e32_\u0e21\u0e34\u0e16\u0e38\u0e19\u0e32_\u0e01\u0e23\u0e01\u0e0e\u0e32_\u0e2a\u0e34\u0e07\u0e2b\u0e32_\u0e01\u0e31\u0e19\u0e22\u0e32_\u0e15\u0e38\u0e25\u0e32_\u0e1e\u0e24\u0e28\u0e08\u0e34\u0e01\u0e32_\u0e18\u0e31\u0e19\u0e27\u0e32".split("_"),
						weekdays: "\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c_\u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c_\u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23_\u0e1e\u0e38\u0e18_\u0e1e\u0e24\u0e2b\u0e31\u0e2a\u0e1a\u0e14\u0e35_\u0e28\u0e38\u0e01\u0e23\u0e4c_\u0e40\u0e2a\u0e32\u0e23\u0e4c".split("_"),
						weekdaysShort: "\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c_\u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c_\u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23_\u0e1e\u0e38\u0e18_\u0e1e\u0e24\u0e2b\u0e31\u0e2a_\u0e28\u0e38\u0e01\u0e23\u0e4c_\u0e40\u0e2a\u0e32\u0e23\u0e4c".split("_"),
						weekdaysMin: "\u0e2d\u0e32._\u0e08._\u0e2d._\u0e1e._\u0e1e\u0e24._\u0e28._\u0e2a.".split("_"),
						longDateFormat: {
							LT: "H \u0e19\u0e32\u0e2c\u0e34\u0e01\u0e32 m \u0e19\u0e32\u0e17\u0e35",
							L: "YYYY/MM/DD",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY \u0e40\u0e27\u0e25\u0e32 LT",
							LLLL: "\u0e27\u0e31\u0e19dddd\u0e17\u0e35\u0e48 D MMMM YYYY \u0e40\u0e27\u0e25\u0e32 LT"
						},
						meridiem: function (e, t, n) {
							return e < 12 ? "\u0e01\u0e48\u0e2d\u0e19\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07" : "\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07"
						},
						calendar: {
							sameDay: "[\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT",
							nextDay: "[\u0e1e\u0e23\u0e38\u0e48\u0e07\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT",
							nextWeek: "dddd[\u0e2b\u0e19\u0e49\u0e32 \u0e40\u0e27\u0e25\u0e32] LT",
							lastDay: "[\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e27\u0e32\u0e19\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT",
							lastWeek: "[\u0e27\u0e31\u0e19]dddd[\u0e17\u0e35\u0e48\u0e41\u0e25\u0e49\u0e27 \u0e40\u0e27\u0e25\u0e32] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "\u0e2d\u0e35\u0e01 %s",
							past: "%s\u0e17\u0e35\u0e48\u0e41\u0e25\u0e49\u0e27",
							s: "\u0e44\u0e21\u0e48\u0e01\u0e35\u0e48\u0e27\u0e34\u0e19\u0e32\u0e17\u0e35",
							m: "1 \u0e19\u0e32\u0e17\u0e35",
							mm: "%d \u0e19\u0e32\u0e17\u0e35",
							h: "1 \u0e0a\u0e31\u0e48\u0e27\u0e42\u0e21\u0e07",
							hh: "%d \u0e0a\u0e31\u0e48\u0e27\u0e42\u0e21\u0e07",
							d: "1 \u0e27\u0e31\u0e19",
							dd: "%d \u0e27\u0e31\u0e19",
							M: "1 \u0e40\u0e14\u0e37\u0e2d\u0e19",
							MM: "%d \u0e40\u0e14\u0e37\u0e2d\u0e19",
							y: "1 \u0e1b\u0e35",
							yy: "%d \u0e1b\u0e35"
						}
					})
				}
				(),
				function () {
					var t = {
						1: "'inci",
						5: "'inci",
						8: "'inci",
						70: "'inci",
						80: "'inci",
						2: "'nci",
						7: "'nci",
						20: "'nci",
						50: "'nci",
						3: "'\u00fcnc\u00fc",
						4: "'\u00fcnc\u00fc",
						100: "'\u00fcnc\u00fc",
						6: "'nc\u0131",
						9: "'uncu",
						10: "'uncu",
						30: "'uncu",
						60: "'\u0131nc\u0131",
						90: "'\u0131nc\u0131"
					};
					e.lang("tr", {
						months: "Ocak_\u015eubat_Mart_Nisan_May\u0131s_Haziran_Temmuz_A\u011fustos_Eyl\u00fcl_Ekim_Kas\u0131m_Aral\u0131k".split("_"),
						monthsShort: "Oca_\u015eub_Mar_Nis_May_Haz_Tem_A\u011fu_Eyl_Eki_Kas_Ara".split("_"),
						weekdays: "Pazar_Pazartesi_Sal\u0131_\u00c7ar\u015famba_Per\u015fembe_Cuma_Cumartesi".split("_"),
						weekdaysShort: "Paz_Pts_Sal_\u00c7ar_Per_Cum_Cts".split("_"),
						weekdaysMin: "Pz_Pt_Sa_\u00c7a_Pe_Cu_Ct".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD.MM.YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd, D MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[bug\u00fcn saat] LT",
							nextDay: "[yar\u0131n saat] LT",
							nextWeek: "[haftaya] dddd [saat] LT",
							lastDay: "[d\u00fcn] LT",
							lastWeek: "[ge\u00e7en hafta] dddd [saat] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s sonra",
							past: "%s \u00f6nce",
							s: "birka\u00e7 saniye",
							m: "bir dakika",
							mm: "%d dakika",
							h: "bir saat",
							hh: "%d saat",
							d: "bir g\u00fcn",
							dd: "%d g\u00fcn",
							M: "bir ay",
							MM: "%d ay",
							y: "bir y\u0131l",
							yy: "%d y\u0131l"
						},
						ordinal: function (e) {
							if (e === 0)
								return e + "'\u0131nc\u0131";
							var n = e % 10,
							r = e % 100 - n,
							i = e >= 100 ? 100 : null;
							return e + (t[n] || t[r] || t[i])
						},
						week: {
							dow: 1,
							doy: 7
						}
					})
				}
				(),
				function () {
					e.lang("tzm-la", {
						months: "innayr_br\u02e4ayr\u02e4_mar\u02e4s\u02e4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02e4wbr\u02e4_nwwanbir_dwjnbir".split("_"),
						monthsShort: "innayr_br\u02e4ayr\u02e4_mar\u02e4s\u02e4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02e4wbr\u02e4_nwwanbir_dwjnbir".split("_"),
						weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"),
						weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"),
						weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd D MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[asdkh g] LT",
							nextDay: "[aska g] LT",
							nextWeek: "dddd [g] LT",
							lastDay: "[assant g] LT",
							lastWeek: "dddd [g] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "dadkh s yan %s",
							past: "yan %s",
							s: "imik",
							m: "minu\u1e0d",
							mm: "%d minu\u1e0d",
							h: "sa\u025ba",
							hh: "%d tassa\u025bin",
							d: "ass",
							dd: "%d ossan",
							M: "ayowr",
							MM: "%d iyyirn",
							y: "asgas",
							yy: "%d isgasn"
						},
						week: {
							dow: 6,
							doy: 12
						}
					})
				}
				(),
				function () {
					e.lang("tzm", {
						months: "\u2d49\u2d4f\u2d4f\u2d30\u2d62\u2d54_\u2d31\u2d55\u2d30\u2d62\u2d55_\u2d4e\u2d30\u2d55\u2d5a_\u2d49\u2d31\u2d54\u2d49\u2d54_\u2d4e\u2d30\u2d62\u2d62\u2d53_\u2d62\u2d53\u2d4f\u2d62\u2d53_\u2d62\u2d53\u2d4d\u2d62\u2d53\u2d63_\u2d56\u2d53\u2d5b\u2d5c_\u2d5b\u2d53\u2d5c\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d3d\u2d5f\u2d53\u2d31\u2d55_\u2d4f\u2d53\u2d61\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d37\u2d53\u2d4a\u2d4f\u2d31\u2d49\u2d54".split("_"),
						monthsShort: "\u2d49\u2d4f\u2d4f\u2d30\u2d62\u2d54_\u2d31\u2d55\u2d30\u2d62\u2d55_\u2d4e\u2d30\u2d55\u2d5a_\u2d49\u2d31\u2d54\u2d49\u2d54_\u2d4e\u2d30\u2d62\u2d62\u2d53_\u2d62\u2d53\u2d4f\u2d62\u2d53_\u2d62\u2d53\u2d4d\u2d62\u2d53\u2d63_\u2d56\u2d53\u2d5b\u2d5c_\u2d5b\u2d53\u2d5c\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d3d\u2d5f\u2d53\u2d31\u2d55_\u2d4f\u2d53\u2d61\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d37\u2d53\u2d4a\u2d4f\u2d31\u2d49\u2d54".split("_"),
						weekdays: "\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"),
						weekdaysShort: "\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"),
						weekdaysMin: "\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD/MM/YYYY",
							LL: "D MMMM YYYY",
							LLL: "D MMMM YYYY LT",
							LLLL: "dddd D MMMM YYYY LT"
						},
						calendar: {
							sameDay: "[\u2d30\u2d59\u2d37\u2d45 \u2d34] LT",
							nextDay: "[\u2d30\u2d59\u2d3d\u2d30 \u2d34] LT",
							nextWeek: "dddd [\u2d34] LT",
							lastDay: "[\u2d30\u2d5a\u2d30\u2d4f\u2d5c \u2d34] LT",
							lastWeek: "dddd [\u2d34] LT",
							sameElse: "L"
						},
						relativeTime: {
							future: "\u2d37\u2d30\u2d37\u2d45 \u2d59 \u2d62\u2d30\u2d4f %s",
							past: "\u2d62\u2d30\u2d4f %s",
							s: "\u2d49\u2d4e\u2d49\u2d3d",
							m: "\u2d4e\u2d49\u2d4f\u2d53\u2d3a",
							mm: "%d \u2d4e\u2d49\u2d4f\u2d53\u2d3a",
							h: "\u2d59\u2d30\u2d44\u2d30",
							hh: "%d \u2d5c\u2d30\u2d59\u2d59\u2d30\u2d44\u2d49\u2d4f",
							d: "\u2d30\u2d59\u2d59",
							dd: "%d o\u2d59\u2d59\u2d30\u2d4f",
							M: "\u2d30\u2d62o\u2d53\u2d54",
							MM: "%d \u2d49\u2d62\u2d62\u2d49\u2d54\u2d4f",
							y: "\u2d30\u2d59\u2d33\u2d30\u2d59",
							yy: "%d \u2d49\u2d59\u2d33\u2d30\u2d59\u2d4f"
						},
						week: {
							dow: 6,
							doy: 12
						}
					})
				}
				(),
				function () {
					function n(e, n) {
						var r = e.split("_"),
						i = Math.min(t.length, r.length),
						s = -1;
						while (++s < i)
							if (t[s](n))
								return r[s];
						return r[i - 1]
					}
					function r(e, t, r) {
						var i = {
							mm: "\u0445\u0432\u0438\u043b\u0438\u043d\u0430_\u0445\u0432\u0438\u043b\u0438\u043d\u0438_\u0445\u0432\u0438\u043b\u0438\u043d_\u0445\u0432\u0438\u043b\u0438\u043d\u0438",
							hh: "\u0433\u043e\u0434\u0438\u043d\u0430_\u0433\u043e\u0434\u0438\u043d\u0438_\u0433\u043e\u0434\u0438\u043d_\u0433\u043e\u0434\u0438\u043d\u0438",
							dd: "\u0434\u0435\u043d\u044c_\u0434\u043d\u044f_\u0434\u043d\u0456\u0432_\u0434\u043d\u044f",
							MM: "\u043c\u0456\u0441\u044f\u0446\u044c_\u043c\u0456\u0441\u044f\u0446\u044f_\u043c\u0456\u0441\u044f\u0446\u0456\u0432_\u043c\u0456\u0441\u044f\u0446\u044f",
							yy: "\u0440\u0456\u043a_\u0440\u043e\u043a\u0443_\u0440\u043e\u043a\u0456\u0432_\u0440\u043e\u043a\u0443"
						};
						return r === "m" ? t ? "\u0445\u0432\u0438\u043b\u0438\u043d\u0430" : "\u0445\u0432\u0438\u043b\u0438\u043d\u0443" : e + " " + n(i[r], +e)
					}
					function i(e, t) {
						var n = {
							nominative: "\u0441\u0456\u0447\u0435\u043d\u044c_\u043b\u044e\u0442\u0438\u0439_\u0431\u0435\u0440\u0435\u0437\u0435\u043d\u044c_\u043a\u0432\u0456\u0442\u0435\u043d\u044c_\u0442\u0440\u0430\u0432\u0435\u043d\u044c_\u0447\u0435\u0440\u0432\u0435\u043d\u044c_\u043b\u0438\u043f\u0435\u043d\u044c_\u0441\u0435\u0440\u043f\u0435\u043d\u044c_\u0432\u0435\u0440\u0435\u0441\u0435\u043d\u044c_\u0436\u043e\u0432\u0442\u0435\u043d\u044c_\u043b\u0438\u0441\u0442\u043e\u043f\u0430\u0434_\u0433\u0440\u0443\u0434\u0435\u043d\u044c".split("_"),
							accusative: "\u0441\u0456\u0447\u043d\u044f_\u043b\u044e\u0442\u043e\u0433\u043e_\u0431\u0435\u0440\u0435\u0437\u043d\u044f_\u043a\u0432\u0456\u0442\u043d\u044f_\u0442\u0440\u0430\u0432\u043d\u044f_\u0447\u0435\u0440\u0432\u043d\u044f_\u043b\u0438\u043f\u043d\u044f_\u0441\u0435\u0440\u043f\u043d\u044f_\u0432\u0435\u0440\u0435\u0441\u043d\u044f_\u0436\u043e\u0432\u0442\u043d\u044f_\u043b\u0438\u0441\u0442\u043e\u043f\u0430\u0434\u0430_\u0433\u0440\u0443\u0434\u043d\u044f".split("_")
						},
						r = /D[oD]? *MMMM?/.test(t) ? "accusative" : "nominative";
						return n[r][e.month()]
					}
					function s(e, t) {
						var n = {
							nominative: "\u043d\u0435\u0434\u0456\u043b\u044f_\u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043e\u043a_\u0432\u0456\u0432\u0442\u043e\u0440\u043e\u043a_\u0441\u0435\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440_\u043f\u2019\u044f\u0442\u043d\u0438\u0446\u044f_\u0441\u0443\u0431\u043e\u0442\u0430".split("_"),
							accusative: "\u043d\u0435\u0434\u0456\u043b\u044e_\u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043e\u043a_\u0432\u0456\u0432\u0442\u043e\u0440\u043e\u043a_\u0441\u0435\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440_\u043f\u2019\u044f\u0442\u043d\u0438\u0446\u044e_\u0441\u0443\u0431\u043e\u0442\u0443".split("_")
						},
						r = /\[ ?[\u0412\u0432] ?(?:\u043f\u043e\u043f\u0435\u0440\u0435\u0434\u043d\u044e|\u043d\u0430\u0441\u0442\u0443\u043f\u043d\u0443)? ?\] ?dddd/.test(t) ? "accusative" : "nominative";
						return n[r][e.day()]
					}
					var t = [function (e) {
							return e % 10 === 1 && e % 100 !== 11
						}, function (e) {
							return e % 10 >= 2 && e % 10 <= 4 && e % 10 % 1 === 0 && (e % 100 < 12 || e % 100 > 14)
						}, function (e) {
							return e % 10 === 0 || e % 10 >= 5 && e % 10 <= 9 && e % 10 % 1 === 0 || e % 100 >= 11 && e % 100 <= 14 && e % 100 % 1 === 0
						}, function (e) {
							return !0
						}
					];
					e.lang("uk", {
						months: i,
						monthsShort: "\u0441\u0456\u0447_\u043b\u044e\u0442_\u0431\u0435\u0440_\u043a\u0432\u0456_\u0442\u0440\u0430_\u0447\u0435\u0440_\u043b\u0438\u043f_\u0441\u0435\u0440_\u0432\u0435\u0440_\u0436\u043e\u0432_\u043b\u0438\u0441_\u0433\u0440\u0443".split("_"),
						weekdays: s,
						weekdaysShort: "\u043d\u0435\u0434_\u043f\u043e\u043d_\u0432\u0456\u0432_\u0441\u0440\u0434_\u0447\u0435\u0442_\u043f\u0442\u043d_\u0441\u0443\u0431".split("_"),
						weekdaysMin: "\u043d\u0434_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),
						longDateFormat: {
							LT: "HH:mm",
							L: "DD.MM.YYYY",
							LL: "D MMMM YYYY \u0433.",
							LLL: "D MMMM YYYY \u0433., LT",
							LLLL: "dddd, D MMMM YYYY \u0433., LT"
						},
						calendar: {
							sameDay: "[\u0421\u044c\u043e\u0433\u043e\u0434\u043d\u0456 \u0432] LT",
							nextDay: "[\u0417\u0430\u0432\u0442\u0440\u0430 \u0432] LT",
							lastDay: "[\u0412\u0447\u043e\u0440\u0430 \u0432] LT",
							nextWeek: function () {
								return this.day() === 2 ? "[\u0423] dddd [\u0432] LT" : "[\u0412] dddd [\u0432] LT"
							},
							lastWeek: function () {
								switch (this.day()) {
								case 0:
								case 3:
								case 5:
								case 6:
									return "[\u0412 \u043c\u0438\u043d\u0443\u043b\u0443] dddd [\u0432] LT";
								case 1:
								case 2:
								case 4:
									return "[\u0412 \u043c\u0438\u043d\u0443\u043b\u0438\u0439] dddd [\u0432] LT"
								}
							},
							sameElse: "L"
						},
						relativeTime: {
							future: "\u0447\u0435\u0440\u0435\u0437 %s",
							past: "%s \u0442\u043e\u043c\u0443",
							s: "\u0434\u0435\u043a\u0456\u043b\u044c\u043a\u0430 \u0441\u0435\u043a\u0443\u043d\u0434",
							m: r,
							mm: r,
							h: "\u0433\u043e\u0434\u0438\u043d\u0443",
							hh: r,
							d: "\u0434\u0435\u043d\u044c",
							dd: r,
							M: "\u043c\u0456\u0441\u044f\u0446\u044c",
							MM: r,
							y: "\u0440\u0456\u043a",
							yy: r
						},
						ordinal: "%d.",
						week: {
							dow: 1,
							doy: 7
						}
					})
				}
				(),
				function () {
					e.lang("zh-cn", {
						months: "\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"),
						monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
						weekdays: "\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"),
						weekdaysShort: "\u5468\u65e5_\u5468\u4e00_\u5468\u4e8c_\u5468\u4e09_\u5468\u56db_\u5468\u4e94_\u5468\u516d".split("_"),
						weekdaysMin: "\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d".split("_"),
						longDateFormat: {
							LT: "Ah\u70b9mm",
							L: "YYYY\u5e74MMMD\u65e5",
							LL: "YYYY\u5e74MMMD\u65e5",
							LLL: "YYYY\u5e74MMMD\u65e5LT",
							LLLL: "YYYY\u5e74MMMD\u65e5ddddLT",
							l: "YYYY\u5e74MMMD\u65e5",
							ll: "YYYY\u5e74MMMD\u65e5",
							lll: "YYYY\u5e74MMMD\u65e5LT",
							llll: "YYYY\u5e74MMMD\u65e5ddddLT"
						},
						meridiem: function (e, t, n) {
							return e < 9 ? "\u65e9\u4e0a" : e < 11 && t < 30 ? "\u4e0a\u5348" : e < 13 && t < 30 ? "\u4e2d\u5348" : e < 18 ? "\u4e0b\u5348" : "\u665a\u4e0a"
						},
						calendar: {
							sameDay: "[\u4eca\u5929]LT",
							nextDay: "[\u660e\u5929]LT",
							nextWeek: "[\u4e0b]ddddLT",
							lastDay: "[\u6628\u5929]LT",
							lastWeek: "[\u4e0a]ddddLT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s\u5185",
							past: "%s\u524d",
							s: "\u51e0\u79d2",
							m: "1\u5206\u949f",
							mm: "%d\u5206\u949f",
							h: "1\u5c0f\u65f6",
							hh: "%d\u5c0f\u65f6",
							d: "1\u5929",
							dd: "%d\u5929",
							M: "1\u4e2a\u6708",
							MM: "%d\u4e2a\u6708",
							y: "1\u5e74",
							yy: "%d\u5e74"
						}
					})
				}
				(),
				function () {
					e.lang("zh-tw", {
						months: "\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"),
						monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),
						weekdays: "\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"),
						weekdaysShort: "\u9031\u65e5_\u9031\u4e00_\u9031\u4e8c_\u9031\u4e09_\u9031\u56db_\u9031\u4e94_\u9031\u516d".split("_"),
						weekdaysMin: "\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d".split("_"),
						longDateFormat: {
							LT: "Ah\u9edemm",
							L: "YYYY\u5e74MMMD\u65e5",
							LL: "YYYY\u5e74MMMD\u65e5",
							LLL: "YYYY\u5e74MMMD\u65e5LT",
							LLLL: "YYYY\u5e74MMMD\u65e5ddddLT",
							l: "YYYY\u5e74MMMD\u65e5",
							ll: "YYYY\u5e74MMMD\u65e5",
							lll: "YYYY\u5e74MMMD\u65e5LT",
							llll: "YYYY\u5e74MMMD\u65e5ddddLT"
						},
						meridiem: function (e, t, n) {
							return e < 9 ? "\u65e9\u4e0a" : e < 11 && t < 30 ? "\u4e0a\u5348" : e < 13 && t < 30 ? "\u4e2d\u5348" : e < 18 ? "\u4e0b\u5348" : "\u665a\u4e0a"
						},
						calendar: {
							sameDay: "[\u4eca\u5929]LT",
							nextDay: "[\u660e\u5929]LT",
							nextWeek: "[\u4e0b]ddddLT",
							lastDay: "[\u6628\u5929]LT",
							lastWeek: "[\u4e0a]ddddLT",
							sameElse: "L"
						},
						relativeTime: {
							future: "%s\u5167",
							past: "%s\u524d",
							s: "\u5e7e\u79d2",
							m: "\u4e00\u5206\u9418",
							mm: "%d\u5206\u9418",
							h: "\u4e00\u5c0f\u6642",
							hh: "%d\u5c0f\u6642",
							d: "\u4e00\u5929",
							dd: "%d\u5929",
							M: "\u4e00\u500b\u6708",
							MM: "%d\u500b\u6708",
							y: "\u4e00\u5e74",
							yy: "%d\u5e74"
						}
					})
				}
				(),
				e.lang("en")
			}
			typeof define == "function" && define.amd && define(["moment"], e),
			typeof window != "undefined" && window.moment && e(window.moment)
		})()
	}
	typeof define == "function" && define.amd && define(["moment"], e),
	typeof window != "undefined" && window.moment && e(window.moment)
})();
(function (root) {
	var jstz = (function () {
		'use strict';
		var HEMISPHERE_SOUTH = 's',
		get_date_offset = function (date) {
			var offset = -date.getTimezoneOffset();
			return (offset !== null ? offset : 0);
		},
		get_date = function (year, month, date) {
			var d = new Date();
			if (year !== undefined) {
				d.setFullYear(year);
			}
			d.setDate(date);
			d.setMonth(month);
			return d;
		},
		get_january_offset = function (year) {
			return get_date_offset(get_date(year, 0, 2));
		},
		get_june_offset = function (year) {
			return get_date_offset(get_date(year, 5, 2));
		},
		date_is_dst = function (date) {
			var base_offset = ((date.getMonth() > 7 ? get_june_offset(date.getFullYear()) : get_january_offset(date.getFullYear()))),
			date_offset = get_date_offset(date);
			return (base_offset - date_offset) !== 0;
		},
		lookup_key = function () {
			var january_offset = get_january_offset(),
			june_offset = get_june_offset(),
			diff = get_january_offset() - get_june_offset();
			if (diff < 0) {
				return january_offset + ",1";
			} else if (diff > 0) {
				return june_offset + ",1," + HEMISPHERE_SOUTH;
			}
			return january_offset + ",0";
		},
		determine = function () {
			var key = lookup_key();
			return new jstz.TimeZone(jstz.olson.timezones[key]);
		},
		dst_start_for = function (tz_name) {
			var ru_pre_dst_change = new Date(2010, 6, 15, 1, 0, 0, 0),
			dst_starts = {
				'America/Denver': new Date(2011, 2, 13, 3, 0, 0, 0),
				'America/Mazatlan': new Date(2011, 3, 3, 3, 0, 0, 0),
				'America/Chicago': new Date(2011, 2, 13, 3, 0, 0, 0),
				'America/Mexico_City': new Date(2011, 3, 3, 3, 0, 0, 0),
				'America/Asuncion': new Date(2012, 9, 7, 3, 0, 0, 0),
				'America/Santiago': new Date(2012, 9, 3, 3, 0, 0, 0),
				'America/Campo_Grande': new Date(2012, 9, 21, 5, 0, 0, 0),
				'America/Montevideo': new Date(2011, 9, 2, 3, 0, 0, 0),
				'America/Sao_Paulo': new Date(2011, 9, 16, 5, 0, 0, 0),
				'America/Los_Angeles': new Date(2011, 2, 13, 8, 0, 0, 0),
				'America/Santa_Isabel': new Date(2011, 3, 5, 8, 0, 0, 0),
				'America/Havana': new Date(2012, 2, 10, 2, 0, 0, 0),
				'America/New_York': new Date(2012, 2, 10, 7, 0, 0, 0),
				'Asia/Beirut': new Date(2011, 2, 27, 1, 0, 0, 0),
				'Europe/Helsinki': new Date(2011, 2, 27, 4, 0, 0, 0),
				'Europe/Istanbul': new Date(2011, 2, 28, 5, 0, 0, 0),
				'Asia/Damascus': new Date(2011, 3, 1, 2, 0, 0, 0),
				'Asia/Jerusalem': new Date(2011, 3, 1, 6, 0, 0, 0),
				'Asia/Gaza': new Date(2009, 2, 28, 0, 30, 0, 0),
				'Africa/Cairo': new Date(2009, 3, 25, 0, 30, 0, 0),
				'Pacific/Auckland': new Date(2011, 8, 26, 7, 0, 0, 0),
				'Pacific/Fiji': new Date(2010, 11, 29, 23, 0, 0, 0),
				'America/Halifax': new Date(2011, 2, 13, 6, 0, 0, 0),
				'America/Goose_Bay': new Date(2011, 2, 13, 2, 1, 0, 0),
				'America/Miquelon': new Date(2011, 2, 13, 5, 0, 0, 0),
				'America/Godthab': new Date(2011, 2, 27, 1, 0, 0, 0),
				'Europe/Moscow': ru_pre_dst_change,
				'Asia/Yekaterinburg': ru_pre_dst_change,
				'Asia/Omsk': ru_pre_dst_change,
				'Asia/Krasnoyarsk': ru_pre_dst_change,
				'Asia/Irkutsk': ru_pre_dst_change,
				'Asia/Yakutsk': ru_pre_dst_change,
				'Asia/Vladivostok': ru_pre_dst_change,
				'Asia/Kamchatka': ru_pre_dst_change,
				'Europe/Minsk': ru_pre_dst_change,
				'Australia/Perth': new Date(2008, 10, 1, 1, 0, 0, 0)
			};
			return dst_starts[tz_name];
		};
		return {
			determine: determine,
			date_is_dst: date_is_dst,
			dst_start_for: dst_start_for
		};
	}
		());
	jstz.TimeZone = function (tz_name) {
		'use strict';
		var AMBIGUITIES = {
			'America/Denver': ['America/Denver', 'America/Mazatlan'],
			'America/Chicago': ['America/Chicago', 'America/Mexico_City'],
			'America/Santiago': ['America/Santiago', 'America/Asuncion', 'America/Campo_Grande'],
			'America/Montevideo': ['America/Montevideo', 'America/Sao_Paulo'],
			'Asia/Beirut': ['Asia/Beirut', 'Europe/Helsinki', 'Europe/Istanbul', 'Asia/Damascus', 'Asia/Jerusalem', 'Asia/Gaza'],
			'Pacific/Auckland': ['Pacific/Auckland', 'Pacific/Fiji'],
			'America/Los_Angeles': ['America/Los_Angeles', 'America/Santa_Isabel'],
			'America/New_York': ['America/Havana', 'America/New_York'],
			'America/Halifax': ['America/Goose_Bay', 'America/Halifax'],
			'America/Godthab': ['America/Miquelon', 'America/Godthab'],
			'Asia/Dubai': ['Europe/Moscow'],
			'Asia/Dhaka': ['Asia/Yekaterinburg'],
			'Asia/Jakarta': ['Asia/Omsk'],
			'Asia/Shanghai': ['Asia/Krasnoyarsk', 'Australia/Perth'],
			'Asia/Tokyo': ['Asia/Irkutsk'],
			'Australia/Brisbane': ['Asia/Yakutsk'],
			'Pacific/Noumea': ['Asia/Vladivostok'],
			'Pacific/Tarawa': ['Asia/Kamchatka'],
			'Africa/Johannesburg': ['Asia/Gaza', 'Africa/Cairo'],
			'Asia/Baghdad': ['Europe/Minsk']
		},
		timezone_name = tz_name,
		ambiguity_check = function () {
			var ambiguity_list = AMBIGUITIES[timezone_name],
			length = ambiguity_list.length,
			i = 0,
			tz = ambiguity_list[0];
			for (; i < length; i += 1) {
				tz = ambiguity_list[i];
				if (jstz.date_is_dst(jstz.dst_start_for(tz))) {
					timezone_name = tz;
					return;
				}
			}
		},
		is_ambiguous = function () {
			return typeof(AMBIGUITIES[timezone_name]) !== 'undefined';
		};
		if (is_ambiguous()) {
			ambiguity_check();
		}
		return {
			name: function () {
				return timezone_name;
			}
		};
	};
	jstz.olson = {};
	jstz.olson.timezones = {
		'-720,0': 'Etc/GMT+12',
		'-660,0': 'Pacific/Pago_Pago',
		'-600,1': 'America/Adak',
		'-600,0': 'Pacific/Honolulu',
		'-570,0': 'Pacific/Marquesas',
		'-540,0': 'Pacific/Gambier',
		'-540,1': 'America/Anchorage',
		'-480,1': 'America/Los_Angeles',
		'-480,0': 'Pacific/Pitcairn',
		'-420,0': 'America/Phoenix',
		'-420,1': 'America/Denver',
		'-360,0': 'America/Guatemala',
		'-360,1': 'America/Chicago',
		'-360,1,s': 'Pacific/Easter',
		'-300,0': 'America/Bogota',
		'-300,1': 'America/New_York',
		'-270,0': 'America/Caracas',
		'-240,1': 'America/Halifax',
		'-240,0': 'America/Santo_Domingo',
		'-240,1,s': 'America/Santiago',
		'-210,1': 'America/St_Johns',
		'-180,1': 'America/Godthab',
		'-180,0': 'America/Argentina/Buenos_Aires',
		'-180,1,s': 'America/Montevideo',
		'-120,0': 'Etc/GMT+2',
		'-120,1': 'Etc/GMT+2',
		'-60,1': 'Atlantic/Azores',
		'-60,0': 'Atlantic/Cape_Verde',
		'0,0': 'Etc/UTC',
		'0,1': 'Europe/London',
		'60,1': 'Europe/Berlin',
		'60,0': 'Africa/Lagos',
		'60,1,s': 'Africa/Windhoek',
		'120,1': 'Asia/Beirut',
		'120,0': 'Africa/Johannesburg',
		'180,0': 'Asia/Baghdad',
		'180,1': 'Europe/Moscow',
		'210,1': 'Asia/Tehran',
		'240,0': 'Asia/Dubai',
		'240,1': 'Asia/Baku',
		'270,0': 'Asia/Kabul',
		'300,1': 'Asia/Yekaterinburg',
		'300,0': 'Asia/Karachi',
		'330,0': 'Asia/Kolkata',
		'345,0': 'Asia/Kathmandu',
		'360,0': 'Asia/Dhaka',
		'360,1': 'Asia/Omsk',
		'390,0': 'Asia/Rangoon',
		'420,1': 'Asia/Krasnoyarsk',
		'420,0': 'Asia/Jakarta',
		'480,0': 'Asia/Shanghai',
		'480,1': 'Asia/Irkutsk',
		'525,0': 'Australia/Eucla',
		'525,1,s': 'Australia/Eucla',
		'540,1': 'Asia/Yakutsk',
		'540,0': 'Asia/Tokyo',
		'570,0': 'Australia/Darwin',
		'570,1,s': 'Australia/Adelaide',
		'600,0': 'Australia/Brisbane',
		'600,1': 'Asia/Vladivostok',
		'600,1,s': 'Australia/Sydney',
		'630,1,s': 'Australia/Lord_Howe',
		'660,1': 'Asia/Kamchatka',
		'660,0': 'Pacific/Noumea',
		'690,0': 'Pacific/Norfolk',
		'720,1,s': 'Pacific/Auckland',
		'720,0': 'Pacific/Tarawa',
		'765,1,s': 'Pacific/Chatham',
		'780,0': 'Pacific/Tongatapu',
		'780,1,s': 'Pacific/Apia',
		'840,0': 'Pacific/Kiritimati'
	};
	if (typeof exports !== 'undefined') {
		exports.jstz = jstz;
	} else {
		root.jstz = jstz;
	}
})(this);
(function (jQuery) {
	if (!dateFormat || typeof(dateFormat) != "function") {
		var dateFormat = function (format) {
			var o = {
				"M+": this.getMonth() + 1,
				"d+": this.getDate(),
				"h+": this.getHours(),
				"H+": this.getHours(),
				"m+": this.getMinutes(),
				"s+": this.getSeconds(),
				"q+": Math.floor((this.getMonth() + 3) / 3),
				w: "0123456".indexOf(this.getDay()),
				S: this.getMilliseconds()
			};
			if (/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
			}
			for (var k in o) {
				if (new RegExp("(" + k + ")").test(format)) {
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
				}
			}
			return format
		}
	}
	if (!DateAdd || typeof(DateDiff) != "function") {
		var DateAdd = function (interval, number, idate) {
			number = parseInt(number);
			var date;
			if (typeof(idate) == "string") {
				date = idate.split(/\D/);
				eval("var date = new Date(" + date.join(",") + ")")
			}
			if (typeof(idate) == "object") {
				date = new Date(idate.toString())
			}
			switch (interval) {
			case "y":
				date.setFullYear(date.getFullYear() + number);
				break;
			case "m":
				date.setMonth(date.getMonth() + number);
				break;
			case "d":
				date.setDate(date.getDate() + number);
				break;
			case "w":
				date.setDate(date.getDate() + 7 * number);
				break;
			case "h":
				date.setHours(date.getHours() + number);
				break;
			case "n":
				date.setMinutes(date.getMinutes() + number);
				break;
			case "s":
				date.setSeconds(date.getSeconds() + number);
				break;
			case "l":
				date.setMilliseconds(date.getMilliseconds() + number);
				break
			}
			return date
		}
	}
	if (!DateDiff || typeof(DateDiff) != "function") {
		var DateDiff = function (interval, d1, d2) {
			switch (interval) {
			case "d":
			case "w":
				d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
				d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
				break;
			case "h":
				d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours());
				d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours());
				break;
			case "n":
				d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes());
				d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes());
				break;
			case "s":
				d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes(), d1.getSeconds());
				d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes(), d2.getSeconds());
				break
			}
			var t1 = d1.getTime(),
			t2 = d2.getTime();
			var diff = NaN;
			switch (interval) {
			case "y":
				diff = d2.getFullYear() - d1.getFullYear();
				break;
			case "m":
				diff = (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth();
				break;
			case "d":
				diff = Math.floor(t2 / 86400000) - Math.floor(t1 / 86400000);
				break;
			case "w":
				diff = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t1 + 345600000) / (604800000));
				break;
			case "h":
				diff = Math.floor(t2 / 3600000) - Math.floor(t1 / 3600000);
				break;
			case "n":
				diff = Math.floor(t2 / 60000) - Math.floor(t1 / 60000);
				break;
			case "s":
				diff = Math.floor(t2 / 1000) - Math.floor(t1 / 1000);
				break;
			case "l":
				diff = t2 - t1;
				break
			}
			return diff
		}
	}
	var userAgent = window.navigator.userAgent.toLowerCase();
	jQuery.browser.msie8 = jQuery.browser.msie && /msie 8\.0/i.test(userAgent);
	jQuery.browser.msie7 = jQuery.browser.msie && /msie 7\.0/i.test(userAgent);
	jQuery.browser.msie6 = !jQuery.browser.msie8 && !jQuery.browser.msie7 && jQuery.browser.msie && /msie 6\.0/i.test(userAgent);
	if (jQuery.fn.noSelect == undefined) {
		jQuery.fn.noSelect = function (p) {
			if (p == null) {
				prevent = true
			} else {
				prevent = p
			}
			if (prevent) {
				return this.each(function () {
					if (jQuery.browser.msie || jQuery.browser.safari) {
						jQuery(this).bind("selectstart", function () {
							return false
						})
					} else {
						if (jQuery.browser.mozilla) {
							jQuery(this).css("MozUserSelect", "none");
							jQuery("body").trigger("focus")
						} else {
							if (jQuery.browser.opera) {
								jQuery(this).bind("mousedown", function () {
									return false
								})
							} else {
								jQuery(this).attr("unselectable", "on")
							}
						}
					}
				})
			} else {
				return this.each(function () {
					if (jQuery.browser.msie || jQuery.browser.safari) {
						jQuery(this).unbind("selectstart")
					} else {
						if (jQuery.browser.mozilla) {
							jQuery(this).css("MozUserSelect", "inherit")
						} else {
							if (jQuery.browser.opera) {
								jQuery(this).unbind("mousedown")
							} else {
								jQuery(this).removeAttr("unselectable", "on")
							}
						}
					}
				})
			}
		}
	}
	jQuery.fn.datepicker = function (o) {
		var def = {
			weekStart: 0,
			weekName: [i18n.datepicker.dateformat.sun, i18n.datepicker.dateformat.mon, i18n.datepicker.dateformat.tue, i18n.datepicker.dateformat.wed, i18n.datepicker.dateformat.thu, i18n.datepicker.dateformat.fri, i18n.datepicker.dateformat.sat],
			monthName: [i18n.datepicker.dateformat.jan, i18n.datepicker.dateformat.feb, i18n.datepicker.dateformat.mar, i18n.datepicker.dateformat.apr, i18n.datepicker.dateformat.may, i18n.datepicker.dateformat.jun, i18n.datepicker.dateformat.jul, i18n.datepicker.dateformat.aug, i18n.datepicker.dateformat.sep, i18n.datepicker.dateformat.oct, i18n.datepicker.dateformat.nov, i18n.datepicker.dateformat.dec],
			monthp: i18n.datepicker.dateformat.postfix,
			Year: new Date().getFullYear(),
			Month: new Date().getMonth() + 1,
			Day: new Date().getDate(),
			today: new Date(),
			btnOk: i18n.datepicker.ok,
			btnCancel: i18n.datepicker.cancel,
			btnToday: i18n.datepicker.today,
			inputDate: null,
			onReturn: false,
			version: "1.1",
			applyrule: false,
			showtarget: null,
			picker: ""
		};
		jQuery.extend(def, o);
		var cp = jQuery("#BBIT_DP_CONTAINER");
		if (cp.length == 0) {
			var cpHA = [];
			cpHA.push("<div id='BBIT_DP_CONTAINER' class='bbit-dp' style='width:175px;z-index:999;'>");
			if (jQuery.browser.msie6) {
				cpHA.push('<iframe style="position:absolute;z-index:-1;width:100%;height:205px;top:0;left:0;scrolling:no;" frameborder="0" src="about:blank"></iframe>')
			}
			cpHA.push("<table class='dp-maintable' cellspacing='0' cellpadding='0' style='width:175px;'><tbody><tr><td>");
			cpHA.push("<table class='bbit-dp-top' cellspacing='0'><tr><td class='bbit-dp-top-left'> <a id='BBIT_DP_LEFTBTN' href='javascript:void(0);' title='", i18n.datepicker.prev_month_title, "'>&nbsp;</a></td><td class='bbit-dp-top-center' align='center'><em><button id='BBIT_DP_YMBTN'></button></em></td><td class='bbit-dp-top-right'><a id='BBIT_DP_RIGHTBTN' href='javascript:void(0);' title='", i18n.datepicker.next_month_title, "'>&nbsp;</a></td></tr></table>");
			cpHA.push("</td></tr>");
			cpHA.push("<tr><td>");
			cpHA.push("<table id='BBIT_DP_INNER' class='bbit-dp-inner' cellspacing='0'><thead><tr>");
			for (var i = def.weekStart, j = 0; j < 7; j++) {
				cpHA.push("<th><span>", def.weekName[i], "</span></th>");
				if (i == 6) {
					i = 0
				} else {
					i++
				}
			}
			cpHA.push("</tr></thead>");
			cpHA.push("<tbody></tbody></table>");
			cpHA.push("</td></tr>");
			cpHA.push("<tr><td class='bbit-dp-bottom' align='center'><button id='BBIT-DP-TODAY'>", def.btnToday, "</button><button id='BBIT-DP-CANCEL2'>", def.btnCancel, "</button></td></tr>");
			cpHA.push("</tbody></table>");
			cpHA.push("<div id='BBIT-DP-MP' class='bbit-dp-mp'  style='z-index:auto;'><table id='BBIT-DP-T' style='width: 175px; height: 193px' border='0' cellspacing='0'><tbody>");
			cpHA.push("<tr>");
			cpHA.push("<td class='bbit-dp-mp-month' xmonth='0'><a href='javascript:void(0);'>", def.monthName[0], "</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='6'><a href='javascript:void(0);'>", def.monthName[6], "</a></td><td class='bbit-dp-mp-ybtn' align='middle'><a id='BBIT-DP-MP-PREV' class='bbit-dp-mp-prev'></a></td><td class='bbit-dp-mp-ybtn' align='middle'><a id='BBIT-DP-MP-NEXT' class='bbit-dp-mp-next'></a></td>");
			cpHA.push("</tr>");
			cpHA.push("<tr>");
			cpHA.push("<td class='bbit-dp-mp-month' xmonth='1'><a href='javascript:void(0);'>", def.monthName[1], "</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='7'><a href='javascript:void(0);'>", def.monthName[7], "</a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td>");
			cpHA.push("</tr>");
			cpHA.push("<tr>");
			cpHA.push("<td class='bbit-dp-mp-month' xmonth='2'><a href='javascript:void(0);'>", def.monthName[2], "</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='8'><a href='javascript:void(0);'>", def.monthName[8], "</a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td>");
			cpHA.push("</tr>");
			cpHA.push("<tr>");
			cpHA.push("<td class='bbit-dp-mp-month' xmonth='3'><a href='javascript:void(0);'>", def.monthName[3], "</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='9'><a href='javascript:void(0);'>", def.monthName[9], "</a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td>");
			cpHA.push("</tr>");
			cpHA.push("<tr>");
			cpHA.push("<td class='bbit-dp-mp-month' xmonth='4'><a href='javascript:void(0);'>", def.monthName[4], "</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='10'><a href='javascript:void(0);'>", def.monthName[10], "</a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td>");
			cpHA.push("</tr>");
			cpHA.push("<tr>");
			cpHA.push("<td class='bbit-dp-mp-month' xmonth='5'><a href='javascript:void(0);'>", def.monthName[5], "</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='11'><a href='javascript:void(0);'>", def.monthName[11], "</a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td>");
			cpHA.push("</tr>");
			cpHA.push("<tr class='bbit-dp-mp-btns'>");
			cpHA.push("<td colspan='4'><button id='BBIT-DP-MP-OKBTN' class='bbit-dp-mp-ok'>", def.btnOk, "</button><button id='BBIT-DP-MP-CANCELBTN' class='bbit-dp-mp-cancel'>", def.btnCancel, "</button></td>");
			cpHA.push("</tr>");
			cpHA.push("</tbody></table>");
			cpHA.push("</div>");
			cpHA.push("</div>");
			var s = cpHA.join("");
			jQuery(document.body).append(s);
			cp = jQuery("#BBIT_DP_CONTAINER");
			initevents()
		}
		function initevents() {
			jQuery("#BBIT-DP-TODAY").click(returntoday);
			cp.click(returnfalse);
			jQuery("#BBIT_DP_INNER tbody").click(tbhandler);
			jQuery("#BBIT_DP_LEFTBTN").click(prevm);
			jQuery("#BBIT_DP_RIGHTBTN").click(nextm);
			jQuery("#BBIT_DP_YMBTN").click(showym);
			jQuery("#BBIT-DP-MP").click(mpclick).dblclick(mpdblclick);
			jQuery("#BBIT-DP-MP-PREV").click(mpprevy);
			jQuery("#BBIT-DP-MP-NEXT").click(mpnexty);
			jQuery("#BBIT-DP-MP-OKBTN").click(mpok);
			jQuery("#BBIT-DP-MP-CANCELBTN").click(mpcancel);
			jQuery("#BBIT-DP-CANCEL2").click(bbit_close);
		}
		function bbit_close() {
			cp.css("visibility", "hidden");
			jQuery('#calhead').click()
		};
		function mpcancel() {
			jQuery("#BBIT-DP-MP").animate({
				top: -193
			}, {
				duration: 200,
				complete: function () {
					jQuery("#BBIT-DP-MP").hide()
				}
			});
			return false
		}
		function mpok() {
			def.Year = def.cy;
			def.Month = def.cm + 1;
			def.Day = 1;
			jQuery("#BBIT-DP-MP").animate({
				top: -193
			}, {
				duration: 200,
				complete: function () {
					jQuery("#BBIT-DP-MP").hide()
				}
			});
			writecb();
			return false
		}
		function mpprevy() {
			var y = def.ty - 10;
			def.ty = y;
			rryear(y);
			return false
		}
		function mpnexty() {
			var y = def.ty + 10;
			def.ty = y;
			rryear(y);
			return false
		}
		function rryear(y) {
			var s = y - 4;
			var ar = [];
			for (var i = 0; i < 5; i++) {
				ar.push(s + i);
				ar.push(s + i + 5)
			}
			jQuery("#BBIT-DP-MP td.bbit-dp-mp-year").each(function (i) {
				if (def.Year == ar[i]) {
					jQuery(this).addClass("bbit-dp-mp-sel")
				} else {
					jQuery(this).removeClass("bbit-dp-mp-sel")
				}
				jQuery(this).html("<a href='javascript:void(0);'>" + ar[i] + "</a>").attr("xyear", ar[i])
			})
		}
		function mpdblclick(e) {
			var et = e.target || e.srcElement;
			var td = getTd(et);
			if (td == null) {
				return false
			}
			if (jQuery(td).hasClass("bbit-dp-mp-month") || jQuery(td).hasClass("bbit-dp-mp-year")) {
				mpok(e)
			}
			return false
		}
		function mpclick(e) {
			var panel = jQuery(this);
			var et = e.target || e.srcElement;
			var td = getTd(et);
			if (td == null) {
				return false
			}
			if (jQuery(td).hasClass("bbit-dp-mp-month")) {
				if (!jQuery(td).hasClass("bbit-dp-mp-sel")) {
					var ctd = panel.find("td.bbit-dp-mp-month.bbit-dp-mp-sel");
					if (ctd.length > 0) {
						ctd.removeClass("bbit-dp-mp-sel")
					}
					jQuery(td).addClass("bbit-dp-mp-sel");
					def.cm = parseInt(jQuery(td).attr("xmonth"))
				}
			}
			if (jQuery(td).hasClass("bbit-dp-mp-year")) {
				if (!jQuery(td).hasClass("bbit-dp-mp-sel")) {
					var ctd = panel.find("td.bbit-dp-mp-year.bbit-dp-mp-sel");
					if (ctd.length > 0) {
						ctd.removeClass("bbit-dp-mp-sel")
					}
					jQuery(td).addClass("bbit-dp-mp-sel");
					def.cy = parseInt(jQuery(td).attr("xyear"))
				}
			}
			return false
		}
		function showym() {
			var mp = jQuery("#BBIT-DP-MP");
			var y = def.Year;
			def.cy = def.ty = y;
			var m = def.Month - 1;
			def.cm = m;
			var ms = jQuery("#BBIT-DP-MP td.bbit-dp-mp-month");
			for (var i = ms.length - 1; i >= 0; i--) {
				var ch = jQuery(ms[i]).attr("xmonth");
				if (ch == m) {
					jQuery(ms[i]).addClass("bbit-dp-mp-sel")
				} else {
					jQuery(ms[i]).removeClass("bbit-dp-mp-sel")
				}
			}
			rryear(y);
			mp.css("top", -193).show().animate({
				top: 0
			}, {
				duration: 200
			})
		}
		function getTd(elm) {
			if (elm.tagName.toUpperCase() == "TD") {
				return elm
			} else {
				if (elm.tagName.toUpperCase() == "BODY") {
					return null
				} else {
					var p = jQuery(elm).parent();
					if (p.length > 0) {
						if (p[0].tagName.toUpperCase() != "TD") {
							return getTd(p[0])
						} else {
							return p[0]
						}
					}
				}
			}
			return null
		}
		function tbhandler(e) {
			var et = e.target || e.srcElement;
			var td = getTd(et);
			if (td == null) {
				return false
			}
			var jQuerytd = jQuery(td);
			if (!jQuery(td).hasClass("bbit-dp-disabled")) {
				var s = jQuerytd.attr("xdate");
				cp.data("indata", stringtodate(s));
				returndate()
			}
			return false
		}
		function returnfalse() {
			return false
		}
		function stringtodate(datestr) {
			try {
				var arrs = datestr.split(i18n.datepicker.dateformat.separator);
				var year = parseInt(arrs[i18n.datepicker.dateformat.year_index]);
				var month = parseInt(arrs[i18n.datepicker.dateformat.month_index]) - 1;
				var day = parseInt(arrs[i18n.datepicker.dateformat.day_index]);
				return new Date(year, month, day)
			} catch (e) {
				return null
			}
		}
		function prevm() {
			if (def.Month == 1) {
				def.Year--;
				def.Month = 12
			} else {
				def.Month--
			}
			writecb();
			return false
		}
		function nextm() {
			if (def.Month == 12) {
				def.Year++;
				def.Month = 1
			} else {
				def.Month++
			}
			writecb();
			return false
		}
		function returntoday() {
			cp.data("indata", new Date());
			returndate()
		}
		function returndate() {
			var ct = cp.data("ctarget");
			var ck = cp.data("cpk");
			var re = cp.data("onReturn");
			var ndate = cp.data("indata");
			var ads = cp.data("ads");
			var ade = cp.data("ade");
			var dis = false;
			if (ads && ndate < ads) {
				dis = true
			}
			if (ade && ndate > ade) {
				dis = true
			}
			if (dis) {
				return
			}
			if (re && jQuery.isFunction(re)) {
				re.call(ct[0], cp.data("indata"))
			} else {
				ct.val(dateFormat.call(cp.data("indata"), i18n.datepicker.dateformat.fulldayvalue))
			}
			ck.attr("isshow", "0");
			cp.removeData("ctarget").removeData("cpk").removeData("indata").removeData("onReturn").removeData("ads").removeData("ade");
			cp.css("visibility", "hidden");
			ct = ck = null
		}
		function writecb() {
			var tb = jQuery("#BBIT_DP_INNER tbody");
			jQuery("#BBIT_DP_YMBTN").html(def.monthName[def.Month - 1] + def.monthp + " " + def.Year);
			var firstdate = new Date(def.Year, def.Month - 1, 1);
			var diffday = def.weekStart - firstdate.getDay();
			var showmonth = def.Month - 1;
			if (diffday > 0) {
				diffday -= 7
			}
			var startdate = DateAdd("d", diffday, firstdate);
			var enddate = DateAdd("d", 42, startdate);
			var ads = cp.data("ads");
			var ade = cp.data("ade");
			var bhm = [];
			var tds = dateFormat.call(def.today, i18n.datepicker.dateformat.fulldayvalue);
			var indata = cp.data("indata");
			var ins = indata != null ? dateFormat.call(indata, i18n.datepicker.dateformat.fulldayvalue) : "";
			for (var i = 1; i <= 42; i++) {
				if (i % 7 == 1) {
					bhm.push("<tr>")
				}
				var ndate = DateAdd("d", i - 1, startdate);
				var tdc = [];
				var dis = false;
				if (ads && ndate < ads) {
					dis = true
				}
				if (ade && ndate > ade) {
					dis = true
				}
				if (ndate.getMonth() < showmonth) {
					tdc.push("bbit-dp-prevday")
				} else {
					if (ndate.getMonth() > showmonth) {
						tdc.push("bbit-dp-nextday")
					}
				}
				if (dis) {
					tdc.push("bbit-dp-disabled")
				} else {
					tdc.push("bbit-dp-active")
				}
				var s = dateFormat.call(ndate, i18n.datepicker.dateformat.fulldayvalue);
				if (s == tds) {
					tdc.push("bbit-dp-today")
				}
				if (s == ins) {
					tdc.push("bbit-dp-selected")
				}
				bhm.push("<td class='", tdc.join(" "), "' title='", dateFormat.call(ndate, i18n.datepicker.dateformat.fulldayvalue), "' xdate='", dateFormat.call(ndate, i18n.datepicker.dateformat.fulldayvalue), "'><a href='javascript:void(0);'><em><span>", ndate.getDate(), "</span></em></a></td>");
				if (i % 7 == 0) {
					bhm.push("</tr>")
				}
			}
			tb.html(bhm.join(""))
		}
		return jQuery(this).each(function () {
			var obj = jQuery(this).addClass("bbit-dp-input");
			var picker = jQuery(def.picker);
			def.showtarget == null && obj.after(picker);
			picker.click(function (e) {
				var isshow = jQuery(this).attr("isshow");
				var me = jQuery(this);
				if (cp.css("visibility") == "visible") {
					cp.css(" visibility", "hidden")
				}
				if (isshow == "1") {
					me.attr("isshow", "0");
					cp.removeData("ctarget").removeData("cpk").removeData("indata").removeData("onReturn");
					return false
				}
				var v = obj.val();
				if (v != "") {
					v = stringtodate(v)
				}
				if (v == null || v == "") {
					def.Year = new Date().getFullYear();
					def.Month = new Date().getMonth() + 1;
					def.Day = new Date().getDate();
					def.inputDate = null
				} else {
					def.Year = v.getFullYear();
					def.Month = v.getMonth() + 1;
					def.Day = v.getDate();
					def.inputDate = v
				}
				cp.data("ctarget", obj).data("cpk", me).data("indata", def.inputDate).data("onReturn", def.onReturn);
				if (def.applyrule && jQuery.isFunction(def.applyrule)) {
					var rule = def.applyrule.call(obj, obj[0].id);
					if (rule) {
						if (rule.startdate) {
							cp.data("ads", rule.startdate)
						} else {
							cp.removeData("ads")
						}
						if (rule.enddate) {
							cp.data("ade", rule.enddate)
						} else {
							cp.removeData("ade")
						}
					}
				} else {
					cp.removeData("ads").removeData("ade")
				}
				writecb();
				jQuery("#BBIT-DP-T").height(cp.height());
				var t = def.showtarget || obj;
				var pos = t.offset();
				var height = t.outerHeight();
				var newpos = {
					left: pos.left,
					top: pos.top + height
				};
				var w = cp.width();
				var h = cp.height();
				var bw = document.documentElement.clientWidth;
				var bh = document.documentElement.clientHeight;
				if ((newpos.left + w) >= bw) {
					newpos.left = bw - w - 2
				}
				if ((newpos.top + h) >= bh) {
					newpos.top = pos.top - h - 2
				}
				if (newpos.left < 0) {
					newpos.left = 10
				}
				if (newpos.top < 0) {
					newpos.top = 10
				}
				jQuery("#BBIT-DP-MP").hide();
				newpos.visibility = "visible";
				cp.css(newpos);
				jQuery(this).attr("isshow", "1");
				jQuery(document).one("click", function (e) {
					me.attr("isshow", "0");
					cp.removeData("ctarget").removeData("cpk").removeData("indata");
					cp.css("visibility", "hidden")
				});
				return false
			})
		})
	}
})(jQuery);
(function (c) {
	if (c.ShowIfrmDailog) {
		return
	}
	c.escapeHTML = function (d) {
		var e = document.createElement("div");
		e.appendChild(document.createTextNode(d));
		return e.innerHTML
	};
	c.documentCenter = function (d) {
		d = c(d);
		d.css({
			position: "absolute",
			left: Math.max((document.documentElement.clientWidth - d.width()) / 2 + document.documentElement.scrollLeft, 0) + "px",
			top: Math.max((document.documentElement.clientHeight - d.height()) / 2 + document.documentElement.scrollTop, 0) + "px"
		})
	};
	c.getMargins = function (k, g) {
		var i = jQuery(k);
		var h = i.css("marginTop") || "";
		var j = i.css("marginRight") || "";
		var d = i.css("marginBottom") || "";
		var f = i.css("marginLeft") || "";
		if (g) {
			return {
				t: parseInt(h) || 0,
				r: parseInt(j) || 0,
				b: parseInt(d) || 0,
				l: parseInt(f)
			}
		} else {
			return {
				t: h,
				r: j,
				b: d,
				l: f
			}
		}
	};
	function b(d, e) {
		return d.replace(/\$\{([\w]+)\}/g, function (g, f) {
			var h = e[f];
			if (typeof(h) != "undefined") {
				return h
			} else {
				return g
			}
		})
	}
	var a = false;
	c.ShowIfrmDailog = function (e, t) {
		if (a) {
			return
		}
		a = true;
		t = c.extend({
				width: "600px",
				height: "400px",
				caption: "",
				enabledrag: true,
				onclose: null
			}, t);
		if (typeof t.width == "number") {
			t.width = t.width + "px";
			t.height = t.height + "px"
		}
		var f = (new Date()).valueOf();
		t.newid = f;
		t.caption = c.escapeHTML(t.caption);
		var k = c("<div id='dailog_" + f + "' class='bbit-window bbit-window-plain'></div>");
		var m = "<div id='dailog_head_${newid}' class='bbit-window-tl'><div class='bbit-window-tr'><div class='bbit-window-tc'><div style='mozuserselect: none; khtmluserselect: none' class='bbit-window-header' unselectable='on'><div class='bbit-tool bbit-tool-close'>&nbsp;</div><span class='bbit-window-header-text'>${caption}</span></div></div></div></div>";
		var s = "<div class='bbit-window-bwrap'><div class='bbit-window-ml'><div class='bbit-window-mr'><div class='bbit-window-mc'><div id='dailog_body_${newid}' style='width: ${width}px; height: ${height}px' class='bbit-window-body'>${iframehtml}</div></div></div></div><div class='bbit-window-bl'><div class='bbit-window-br'><div class='bbit-window-bc'><div class='bbit-window-footer'></div></div></div></div></div>";
		var n = '<iframe id="dailog_iframe_${newid}" border="0" frameBorder="0" src="${url}" style="border:none;width:${width};height:${height}"></iframe>';
		t.url = e + (e.indexOf("?") > -1 ? "&" : "?") + "_=" + (new Date()).valueOf();
		var l = [];
		t.iframehtml = b(n, t);
		l.push(b(m, t));
		l.push(b(s, t));
		if (t.width.substring(t.width.length - 1) == "%") {
			var r = t.width.substring(t.width.length - 1)
		} else {
			var r = t.width.substring(t.width.length - 2)
		}
		var h;
		switch (r) {
		case "px":
			h = 16;
			break;
		case "em":
			break;
		case "pt":
			h = 16 * 0.75;
			break;
		case "in":
			h = 16 * 0.0133125;
			break;
		case "mm":
			h = 16 * 0.3381375;
			break;
		case "cm":
			h = 16 * 0.03381375;
			break;
		case "%":
			break;
		default:
			h = 0;
			break
		}
		var g = (parseInt(t.width) + h) + r;
		k.css({
			width: g
		}).html(l.join(""));
		var q = k.find("div.bbit-tool-close").hover(function (u) {
				c(this).addClass("hover")
			}, function (u) {
				c(this).removeClass("hover")
			}).click(i);
		var p = c.getMargins(document.body, true);
		var d = c("<div></div>").css({
				position: "absolute",
				left: 0,
				top: 0,
				width: Math.max(document.documentElement.clientWidth, document.body.scrollWidth),
				height: Math.max(document.documentElement.clientHeight, document.body.scrollHeight + p.t + p.b),
				zIndex: "998",
				background: "#fff",
				opacity: "0.5"
			}).bind("contextmenu", function () {
				return false
			}).appendTo(document.body);
		var o = false;
		if (t.enabledrag) {
			if (c.fn.easydrag) {
				k.addClass("bbit-window-draggable").easydrag(false).ondrag(function (u) {
					if (o == false) {
						o = true;
						c("#dailog_body_" + f).css("visibility", "hidden")
					}
				}).ondrop(function (u) {
					o = false;
					c("#dailog_body_" + f).css("visibility", "visible")
				})
			}
		}
		k.appendTo(document.body);
		c.documentCenter(k);
		if (c.browser.msie6) {
			c(document.body).addClass("hiddenselect");
			document.getElementById("dailog_iframe_" + f).src = t.url
		}
		function i(u) {
			c.closeIfrm()
		}
		function j() {
			return false
		}
		c.closeIfrm = function (v, u) {
			c.closeIfrm = j;
			if (c.browser.msie6) {
				c(document.body).removeClass("hiddenselect")
			}
			d.remove();
			q.remove();
			k.remove();
			a = false;
			q = d = k = null;
			v && v();
			if (u && t.onclose) {
				t.onclose();
				t.onclose = null
			}
		}
	}
})(jQuery);
try {
	document.execCommand("BackgroundImageCache", false, true)
} catch (e) {}
function PopUpCenterWindow(i, c, a, b, d) {
	var h = 0;
	if (typeof(b) == "undefined") {
		b = false
	}
	if (typeof(d) == "undefined") {
		d = 0
	}
	if (typeof(c) == "undefined") {
		c = 800
	}
	if (typeof(a) == "undefined") {
		a = 600
	}
	var g = 0;
	var f = 0;
	if (screen.width >= c) {
		g = Math.floor((screen.width - c) / 2)
	}
	if (screen.height >= a) {
		f = Math.floor((screen.height - a) / 2)
	}
	if (b) {
		open(i, "", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=" + d + ",resizable=yes,copyhistory=yes,width=" + c + ",height=" + a + ",left=" + g + ", top=" + f + ",screenX=" + g + ",screenY=" + f + "");
		return
	}
	if (h) {
		if (!h.closed) {
			h.close()
		}
	}
	h = open(i, "popUpWin", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=" + d + ",resizable=yes,copyhistory=yes,width=" + c + ",height=" + a + ",left=" + g + ", top=" + f + ",screenX=" + g + ",screenY=" + f + "");
	h.focus()
}
function OpenModelWindow(b, c) {
	var a;
	try {
		if (parent != null && parent.jQuery != null && parent.jQuery.ShowIfrmDailog != undefined) {
			a = parent.jQuery.ShowIfrmDailog
		} else {
			a = jQuery.ShowIfrmDailog
		}
	} catch (d) {
		a = jQuery.ShowIfrmDailog
	}
	a(b, c)
}
function CloseModelWindow(b, a) {
	parent.jQuery.closeIfrm(b, a)
}
function StrFormat(a, b) {
	return a.replace(/\{([\d]+)\}/g, function (d, c) {
		var f = b[c];
		if (typeof(f) != "undefined") {
			if (f instanceof(Date)) {
				return f.getTimezoneOffset()
			} else {
				return encodeURIComponent(f)
			}
		} else {
			return ""
		}
	})
}
function StrFormatNoEncode(a, b) {
	return a.replace(/\{([\d]+)\}/g, function (d, c) {
		var f = b[c];
		if (typeof(f) != "undefined") {
			if (f instanceof(Date)) {
				return f.getTimezoneOffset()
			} else {
				return (f)
			}
		} else {
			return ""
		}
	})
}
function getiev() {
	var b = window.navigator.userAgent.toLowerCase();
	jQuery.browser.msie8 = jQuery.browser.msie && /msie 8\.0/i.test(b);
	jQuery.browser.msie7 = jQuery.browser.msie && /msie 7\.0/i.test(b);
	jQuery.browser.msie6 = !jQuery.browser.msie8 && !jQuery.browser.msie7 && jQuery.browser.msie && /msie 6\.0/i.test(b);
	var a;
	if (jQuery.browser.msie8) {
		a = 8
	} else {
		if (jQuery.browser.msie7) {
			a = 7
		} else {
			if (jQuery.browser.msie6) {
				a = 6
			} else {
				a = -1
			}
		}
	}
	return a
}
jQuery(document).ready(function () {
	var a = getiev();
	if (a > 0) {
		jQuery(document.body).addClass("ie ie" + a)
	}
});
