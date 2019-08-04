	
/*
Copyright (c) 2001, 2016 Alpha Software Corporation
All Rights Reserved.

This JavaScript library is licensed exclusively for use with Alpha Anywhere, Alpha Five,
Alpha Five Application Server, Alpha Anywhere Application Server,
Alpha Five Run Engine, and Alpha Anywhere Run Engine. It is specifically
not licensed for use on a server that does not have installed on it a
licensed copy of the Alpha Five Application Server or the Alpha Anywhere Application Server.
*/



function a5GridRowsHarvest(formID){var eles=$(formID).getElementsByTagName('tbody');var regionsArray=[];for(var i=0;i<eles.length;i++){if($ga(eles[i],'A5DataRegion')=='A5DataRegion')regionsArray[regionsArray.length]=eles[i].id;}
return a5AjaxRegionHarvest(regionsArray);}
function toggleVisibility(id){var state=document.getElementById(id).style.display;if(state=='none'){state='block'}
else{state='none'};document.getElementById(id).style.display=state;}
function a5AjaxGridMozFixRow(rowId){var ele=$(rowId);if(ele.style.height==''||ele.style.height.toLowerCase()=='auto')ele.style.height=ele.offsetHeight+'px';var eles=ele.getElementsByTagName('input');for(var i=0;i<eles.length;i++){if(eles[i].style.height==''||eles[i].style.height.toLowerCase()=='auto')eles[i].style.height=eles[i].offsetHeight+'px';}
eles=ele.getElementsByTagName('select');for(var i=0;i<eles.length;i++){if(eles[i].style.height==''||eles[i].style.height.toLowerCase()=='auto')eles[i].style.height=eles[i].offsetHeight+'px';}
eles=ele.getElementsByTagName('textarea');for(var i=0;i<eles.length;i++){if(eles[i].style.height==''||eles[i].style.height.toLowerCase()=='auto')eles[i].style.height=eles[i].offsetHeight+'px';}
setTimeout('a5AjaxGridMozFixRowPost(\''+rowId+'\')',1);}
function a5AjaxGridMozFixRowPost(rowId){var ele=$(rowId);if(ele.style.height==ele.offsetHeight+'px')ele.style.height='';var eles=ele.getElementsByTagName('input');for(var i=0;i<eles.length;i++){if(eles[i].style.height==eles[i].offsetHeight+'px')eles[i].style.height='';}
eles=ele.getElementsByTagName('select');for(var i=0;i<eles.length;i++){if(eles[i].style.height==eles[i].offsetHeight+'px')eles[i].style.height='';}
eles=ele.getElementsByTagName('textarea');for(var i=0;i<eles.length;i++){if(eles[i].style.height==eles[i].offsetHeight+'px')eles[i].style.height='';}}
function a5AjaxGridReband(cmpName,rows,oddRows,evenRows,oddClass,evenClass){var obj=new Object();var tdObj=new Object();var curOffset=0;var curRows=oddRows;var curClass=oddClass;var curType='o';for(var i=1;i<=rows;i++){obj=$(cmpName+'.R'+i);if(obj.style.display!='none'){curOffset=curOffset+1;if(curOffset>curRows){if(curType=='o'){curOffset=1;curRows=evenRows;curClass=evenClass;curType='e';}else{curOffset=1;curRows=oddRows;curClass=oddClass;curType='o';}}
tdObj=obj.getElementsByTagName('td');for(var j=0;j<tdObj.length;j++)if(tdObj[j].className==oddClass||tdObj[j].className==evenClass)tdObj[j].className=curClass;}}}
function urlencode(text){return escape(text);text=escape(text.toString()).replace(/\+/g,"%2B");var matches=text.match(/(%([0-9A-F]{2}))/gi);if(matches){for(var matchid=0;matchid<matches.length;matchid++){var code=matches[matchid].substring(1,3);if(parseInt(code,16)>=128){text=text.replace(matches[matchid],'%'+code);}}}
return text;}
function a5Grid(action,formID,stateID,url){var componentName=stateID.replace(/_stateInfo/,'');var data='';var stateInfo=$(stateID).value?$(stateID).value:'';var stateInfoArray=stateInfo.split('&');var finalStateInfoArray=new Array();if(action=='submit'){var fObj=$(formID);var valueArr=new Array();var elemName='';for(var i=0;i<fObj.elements.length;i++){if(fObj.elements[i].name!=''){elemName=fObj.elements[i].name;currValue=$gvs($n(elemName));if(elemName.substr(elemName.length-2)=='[]'){for(var j=0;j<stateInfoArray.length;j++){if($u.s.word(stateInfoArray[j],1,'=')==elemName)stateInfoArray[j]='';}}
for(var j=0;j<currValue.length;j++){valueArr[valueArr.length]=urlencode(fObj.elements[i].name)+'='+urlencode(currValue[j]);}}}
for(var i=0;i<stateInfoArray.length;i++){if(stateInfoArray[i]!='')finalStateInfoArray[finalStateInfoArray.length]=stateInfoArray[i];}
stateInfo=finalStateInfoArray.join('&');data=valueArr.join('&');data=data+'&'+'__FormID_Submitted='+formID;}else if(action=='submit:DetailView'){data=a5AjaxRegionHarvest(formID);data=$u.s.rTrim(data,' &')+'&'+'__FormID_Submitted='+formID+'&'+'__GridAction=DetailViewUpdate';}else if(action=='submit:DetailViewNewRecord'){data=a5AjaxRegionHarvest(formID);data=$u.s.rTrim(data,' &')+'&'+'__FormID_Submitted='+formID+'&'+'__GridAction=DetailViewNewRecord';}else if(action=='submit:GridRow'){data=a5AjaxRegionHarvest(formID);data=$u.s.rTrim(data,' &')+'&'+'__FormID_Submitted='+formID+'&'+'__GridAction=GridRowUpdate';}else if(action=='submit:GridRows'){data=a5GridRowsHarvest(formID);data=$u.s.rTrim(data,' &')+'&'+'__FormID_Submitted='+formID+'&'+'__GridAction=GridRowsUpdate';}
else data=action+'&'+'__GridAction='+formID;var URLInfo=document.URL;URLInfo=URLInfo.split('?').slice(1).join('?');if(URLInfo!='')URLInfo=URLInfo+'&';if(stateInfo!='')stateInfo=stateInfo+'&';data=URLInfo+stateInfo+data;data=data+'&'+'__WaitDialogs=_GRIDPART_HTML_DIV|_DETAILVIEWPART_HTML_DIV';AUI.LockUI.element(componentName+'_GRIDPART_HTML_DIV','AUILock')
AUI.LockUI.element(componentName+'_DETAILVIEWPART_HTML_DIV','AUILock')
AUI.WaitDialog.setGlobal({content:'<img src="css/wait.gif" align="top" /> Loading...',className:'AUIWaitDialog'});data=$u.s.tran(data,'\n','%20%0D%0A');new $a.simple(url,{data:data,handleGeneric:true,method:'post'})}
function a5ClearForm(formID){$(formID).reset();}
function a5AjaxRegionPrepare(regionID){var rObj=new Array();if(typeof regionID=='object'&&regionID.length){for(var i=0;i<regionID.length;i++)rObj[rObj.length]=$(regionID[i]);}else{rObj=[$(regionID)];}
for(var i=0;i<rObj.length;i++){var eles=rObj[i].getElementsByTagName('input');for(var j=0;j<eles.length;j++){eles[j].setAttribute('A5OriginalValue',$gvs($n(eles[j].name)).join('||A5ARRAYSEP||'));}
$e.add(eles,'blur',a5AjaxSetDirty,null,false,rObj.id+'Events');eles=rObj[i].getElementsByTagName('select');for(var j=0;j<eles.length;j++){eles[j].setAttribute('A5OriginalValue',$gvs($n(eles[j].name)).join('||A5ARRAYSEP||'));}
$e.add(eles,'blur',a5AjaxSetDirty,null,false,rObj.id+'Events');eles=rObj[i].getElementsByTagName('textarea');for(var j=0;j<eles.length;j++){eles[j].setAttribute('A5OriginalValue',$gvs($n(eles[j].name)).join('||A5ARRAYSEP||'));}
$e.add(eles,'blur',a5AjaxSetDirty,null,false,rObj.id+'Events');rObj[i].setAttribute('A5DataRegion','A5DataRegion');}}
function a5AjaxRegionHarvest(regionID){var rObj=new Array();if(typeof regionID=='object'&&regionID.length){for(var i=0;i<regionID.length;i++)rObj[rObj.length]=$(regionID[i]);}else{rObj=[$(regionID)];}
var eles=new Object();var valArr=new Array();var curVal=new Array();var usedNames=new Array();var dirtyRegions=new Array();var dirtyValues=new Array();for(var i=0;i<rObj.length;i++){$e.removeGroup(rObj[i].id+'Events');if(rObj[i].getAttribute('A5IsDirty')=='true'){dirtyRegions[dirtyRegions.length]=rObj[i].id;eles=rObj[i].getElementsByTagName('input');for(var j=0;j<eles.length;j++){if(eles[j].type.toLowerCase()=='radio'){if($u.a.find(usedNames,eles[j].name)==-1){usedNames[usedNames.length]=eles[j].name;valArr[valArr.length]=a5AjaxSubmitValueParam('old.'+eles[j].name,eles[j].getAttribute('A5OriginalValue').split('||A5ARRAYSEP||'));if(eles[j].getAttribute('A5IsDirty')=='true'){dirtyValues[dirtyValues.length]=eles[j].name;valArr[valArr.length]=a5AjaxSubmitValueParam(eles[j].name,$gvs($n(eles[j].name)));}}}else if(eles[j].type.toLowerCase()=='checkbox'){if($u.a.find(usedNames,eles[j].name)==-1){usedNames[usedNames.length]=eles[j].name;valArr[valArr.length]=a5AjaxSubmitValueParam('old.'+eles[j].name,eles[j].getAttribute('A5OriginalValue').split('||A5ARRAYSEP||'));if(eles[j].getAttribute('A5IsDirty')=='true'){dirtyValues[dirtyValues.length]=eles[j].name;valArr[valArr.length]=a5AjaxSubmitValueParam(eles[j].name,$gvs($n(eles[j].name)));}}}else if(eles[j].type.toLowerCase()=='text'||eles[j].type=='hidden'||eles[j].type=='password'||eles[j].type==''){valArr[valArr.length]=a5AjaxSubmitValueParam('old.'+eles[j].name,eles[j].getAttribute('A5OriginalValue').split('||A5ARRAYSEP||'));if(eles[j].getAttribute('A5IsDirty')=='true'){dirtyValues[dirtyValues.length]=eles[j].name;valArr[valArr.length]=a5AjaxSubmitValueParam(eles[j].name,$gvs(eles[j]));}}}
eles=rObj[i].getElementsByTagName('select');for(var j=0;j<eles.length;j++){valArr[valArr.length]=a5AjaxSubmitValueParam('old.'+eles[j].name,eles[j].getAttribute('A5OriginalValue').split('||A5ARRAYSEP||'));if(eles[j].getAttribute('A5IsDirty')=='true'){dirtyValues[dirtyValues.length]=eles[j].name;valArr[valArr.length]=a5AjaxSubmitValueParam(eles[j].name,$gvs(eles[j]));}}
eles=rObj[i].getElementsByTagName('textarea');for(var j=0;j<eles.length;j++){valArr[valArr.length]=a5AjaxSubmitValueParam('old.'+eles[j].name,eles[j].getAttribute('A5OriginalValue').split('||A5ARRAYSEP||'));if(eles[j].getAttribute('A5IsDirty')=='true'){dirtyValues[dirtyValues.length]=eles[j].name;valArr[valArr.length]=a5AjaxSubmitValueParam(eles[j].name,$gvs(eles[j]));}}}}
return'a5DirtyRegions='+dirtyRegions.join('\n')+'&'+'a5RegionsDirtyValues='+dirtyValues.join('\n')+'&'+valArr.join('&');}
function a5AjaxSubmitValueParam(eleName,eleValue){if(typeof eleValue=='string'){return urlencode(eleName)+'='+urlencode(eleValue);}else{var valArr=new Array();if(eleValue.length==0){return urlencode(eleName)+'=';}else
{for(var j=0;j<eleValue.length;j++){valArr[valArr.length]=urlencode(eleName)+'='+urlencode(eleValue[j]);}
return valArr.join('&');}}}
function a5AjaxSetDirty(){var isDirty=false;if(this.tagName.toLowerCase()=='input'&&(this.type.toLowerCase()=='radio'||this.type.toLowerCase()=='checkbox')){var eles=$n(this.name);if($gvs(eles).join('||A5ARRAYSEP||')!=eles[0].getAttribute('A5OriginalValue')){for(var i=0;i<eles.length;i++)eles[i].setAttribute('A5IsDirty','true');isDirty=true;}else for(var i=0;i<eles.length;i++)eles[i].setAttribute('A5IsDirty','false');}else{if($gvs(this)!=this.getAttribute('A5OriginalValue')){this.setAttribute('A5IsDirty','true');isDirty=true;}else this.setAttribute('A5IsDirty','false');}
if(isDirty){var ele=this.parentNode;while(ele.getAttribute('A5DataRegion')!='A5DataRegion'){if(ele.tagName.toLowerCase()=='body')return;ele=ele.parentNode;}
ele.setAttribute('A5IsDirty','true');}}
function a5AjaxErrorsSet(eTargs,eHTML,eleCNs,eEleCNs){var baseEleCN='';var baseEEleCN='';var curEleCN='';var curEEleCN='';if(typeof eleCNs=='string')baseEleCN=eleCNs;if(typeof eEleCNs=='string')baseEEleCN=eEleCNs;var ele=new Object();var eleCtl=new Object();var errorArr=new Array();for(var i=0;i<eTargs.length;i++){curEleCN=typeof eleCNs=='object'&&eleCNs[i]?eleCNs[i]:baseEleCN;curEEleCN=typeof eEleCNs=='object'&&eEleCNs[i]?eEleCNs[i]:baseEEleCN;ele=$(eTargs[i]+'.ERRORMSG');eleCtl=$(eTargs[i]);ele.innerHTML=eHTML[i];if(curEEleCN!='')$acn(ele,curEEleCN);if(curEleCN!='')$acn(eleCtl,curEleCN);$sa(eleCtl,'A5IsDirty','true');eleCtl=eleCtl.parentNode;while(eleCtl.getAttribute('A5DataRegion')!='A5DataRegion'){if(eleCtl.tagName.toLowerCase()=='body')return;eleCtl=eleCtl.parentNode;}
eleCtl.setAttribute('A5IsDirty','true');errorArr[i]={id:eTargs[i],errorEleClassName:curEEleCN,eleClassName:curEleCN};}
return errorArr;}
function a5AjaxErrorsClear(errorArr){var ele=new Object();for(var i=0;i<errorArr.length;i++){ele=$(errorArr[i].id+'.ERRORMSG')
if(ele)ele.innerHTML='';if(errorArr[i].errorEleClassName!='')$rcn(ele,errorArr[i].errorEleClassName);if(errorArr[i].eleClassName!='')$rcn($(errorArr[i].id),errorArr[i].eleClassName);}
return new Array();}
function a5GridSelectRow(element,topElement,styleName){var oldElementId=topElement.getAttribute('A5SelectedRow');if(oldElementId==element.id)return false;$acn(element,styleName+'RowSelected');if($(oldElementId)){$rcn($(oldElementId),styleName+'RowSelected');}
topElement.setAttribute('A5SelectedRow',element.id);}