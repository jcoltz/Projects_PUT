/*
@license
dhtmlxScheduler v.4.3.25 Professional

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
!function(){function e(e){var t=function(){};return t.prototype=e,t}var t=scheduler._load;scheduler._load=function(a,r){if(a=a||this._load_url,"object"==typeof a)for(var n=e(this._loaded),i=0;i<a.length;i++)this._loaded=new n,t.call(this,a[i],r);else t.apply(this,arguments)}}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_multisource.js.map