function a5_setPosHorz(A5ParentObject,A5ChildObject,A5offsetX,A5offsetY){
	a5_setPosHorzTop = a5_getEleTop(A5ParentObject);
	a5_setPosHorzLeft = a5_getEleLeft(A5ParentObject);
	a5_setPosHorzWidth = A5ParentObject.offsetWidth;
	a5_setPosHorzChildWidth = A5ChildObject.offsetWidth;
	a5_setPosHorzChildHeight = A5ChildObject.offsetHeight;

	
	if( typeof( window.innerWidth ) == 'number' ) {
		a5_setPosHorzPageWidth = window.innerWidth;
		a5_setPosHorzPageHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		a5_setPosHorzPageWidth = document.documentElement.clientWidth;
		a5_setPosHorzPageHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		a5_setPosHorzPageWidth = document.body.clientWidth;
		a5_setPosHorzPageHeight = document.body.clientHeight;
	}
	
	a5_setPosHorzPageWidth = a5_setPosHorzPageWidth+document.body.scrollLeft;
	a5_setPosHorzPageHeight = a5_setPosHorzPageHeight+document.body.scrollTop;
	
	a5_setPosHorzFinalTop = a5_setPosHorzTop + A5offsetY;
	a5_setPosHorzFinalLeft = a5_setPosHorzLeft + a5_setPosHorzWidth + A5offsetX;
		
	if(a5_setPosHorzFinalTop + a5_setPosHorzChildHeight >  a5_setPosHorzPageHeight){
		a5_setPosHorzFinalTop = a5_setPosHorzPageHeight - a5_setPosHorzChildHeight;
		if(a5_setPosHorzFinalTop < 0)
			a5_setPosHorzFinalTop = 0;
	}
	
	if(a5_setPosHorzFinalLeft + a5_setPosHorzChildWidth > a5_setPosHorzPageWidth){
		a5_setPosHorzFinalLeft = a5_setPosHorzFinalLeft - a5_setPosHorzWidth - a5_setPosHorzChildWidth - (A5offsetX*2);
		if(a5_setPosHorzFinalLeft < 0)
			a5_setPosHorzFinalLeft = 0;
	}
	//window.status = (a5_setPosHorzFinalLeft + a5_setPosHorzChildWidth)+'>'+a5_setPosHorzPageWidth+'    '+a5_setPosHorzChildWidth
	
	A5ChildObject.style.top = a5_setPosHorzFinalTop+'px';
	A5ChildObject.style.left = a5_setPosHorzFinalLeft+'px';
	delete A5ParentObject
	delete A5ChildObject	
}

function a5_setPosVert(A5ParentObject,A5ChildObject,A5offsetX,A5offsetY){
	a5_setPosVertTop = a5_getEleTop(A5ParentObject);
	a5_setPosVertLeft = a5_getEleLeft(A5ParentObject);
	a5_setPosVertWidth = A5ParentObject.offsetWidth;
	a5_setPosVertHeight = A5ParentObject.offsetHeight;
	a5_setPosVertChildWidth = A5ChildObject.offsetWidth;
	a5_setPosVertChildHeight = A5ChildObject.offsetHeight;

	
	if( typeof( window.innerWidth ) == 'number' ) {
		a5_setPosVertPageWidth = window.innerWidth;
		a5_setPosVertPageHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		a5_setPosVertPageWidth = document.documentElement.clientWidth;
		a5_setPosVertPageHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		a5_setPosVertPageWidth = document.body.clientWidth;
		a5_setPosVertPageHeight = document.body.clientHeight;
	}
	
	a5_setPosVertPageWidth = a5_setPosVertPageWidth+document.body.scrollLeft;
	a5_setPosVertPageHeight = a5_setPosVertPageHeight+document.body.scrollTop;
	
	a5_setPosVertFinalTop = a5_setPosVertTop + A5offsetY;
	a5_setPosVertFinalLeft = a5_setPosVertLeft + a5_setPosVertWidth + A5offsetX;
		
	if(a5_setPosVertFinalTop + a5_setPosVertChildHeight >  a5_setPosVertPageHeight){
		a5_setPosVertFinalTop = a5_setPosVertPageHeight - a5_setPosVertChildHeight;
		if(a5_setPosVertFinalTop < 0)
			a5_setPosVertFinalTop = 0;
	}
	
	if(a5_setPosVertFinalLeft + a5_setPosVertChildWidth > a5_setPosVertPageWidth){
		a5_setPosVertFinalLeft = a5_setPosVertFinalLeft - a5_setPosVertWidth - a5_setPosVertChildWidth - (A5offsetX*2);
		if(a5_setPosVertFinalLeft < 0)
			a5_setPosVertFinalLeft = 0;
	}
	//window.status = (a5_setPosVertFinalLeft + a5_setPosVertChildWidth)+'>'+a5_setPosVertPageWidth+'    '+a5_setPosVertChildWidth
	
	A5ChildObject.style.top = a5_setPosVertFinalTop+'px';
	A5ChildObject.style.left = a5_setPosVertFinalLeft+'px';
	delete A5ParentObject
	delete A5ChildObject	
}

function a5_menuSetup(style,width,mainOffset,subOffset,imgSize,parentMenus,peripheralMenus,childMenus,exitCode,container,TOvarName,varName,A5Menu){
	A5Menu.arr = new Array();
	A5Menu.varName = varName;
	A5Menu.TOvarName = TOvarName;
	A5Menu.style = style;
	A5Menu.width = width;
	A5Menu.mainOffset = mainOffset;
	A5Menu.subOffset = subOffset;
	A5Menu.imgSize = imgSize;
	A5Menu.parentMenus = parentMenus;
	A5Menu.peripheralMenus = peripheralMenus;
	A5Menu.childMenus = childMenus;
	A5Menu.container = container;
	A5Menu.exitCode = exitCode;
}

function a5_menuAddItem(type,text,textOver,icon,iconOver,href,target,js,html,childMenu,A5Menu,id){
	A5MenuArray = A5Menu.arr;
	i = A5MenuArray.length;
	A5MenuArray[i] = new Object();
	A5MenuArray[i].type = type;
	A5MenuArray[i].text = text;
	A5MenuArray[i].textOver = textOver;
	A5MenuArray[i].icon = icon;
	A5MenuArray[i].iconOver = iconOver;
	A5MenuArray[i].href = href;
	A5MenuArray[i].target = target;
	A5MenuArray[i].js = js;
	A5MenuArray[i].html = html;
	A5MenuArray[i].id = '';
	if(typeof id != 'undefined') A5MenuArray[i].id = id;
	A5MenuArray[i].childMenu = childMenu;
}

function a5_menuRender(A5Menu){
	var renderedHTML = '';
	if(A5Menu.parentMenus.search(',') == -1){
		renderedHTML = renderedHTML+'<span id="A5MENU_'+A5Menu.varName+'_CASPOINTER" style="display: none"></span>';
	}
	var renderedHTML = renderedHTML+'<div id="A5MENU_'+A5Menu.varName+'" class="'+A5Menu.style+'MenuCont" style="display: none; position: absolute"><ul class="'+A5Menu.style+'Menu">\n'
	renderImgSize = A5Menu.imgSize;
	if(renderImgSize != ''){
		renderImgSize = 'padding-left: '+renderImgSize+';'
	}
	var renderWidth = A5Menu.width;
	var forceNoWrap = 'white-space: nowrap;';
	if(renderWidth != ''){
		renderWidth = 'width: '+renderWidth+';';
		forceNoWrap = '';
	}
	for(i=0;i<A5Menu.arr.length;i++){
		curMenuEle = A5Menu.arr[i];
		curRenderID = ''
		if(curMenuEle.type == 1){
			curRenderJS = ''
			curRenderIcon = ' style="'+renderImgSize+'"';
			if(curMenuEle.childMenu != ''){
				curRenderID = ' id="A5MENU_'+curMenuEle.childMenu+'_CASPOINTER"';
			}
			else{
				curRenderID = '';
			}
			curRenderClass = A5Menu.style+'MenuOff';
			if(curMenuEle.href != ''){
				curRenderJS = ' onclick="a5_menuNavigate(\''+curMenuEle.href+'\',\''+curMenuEle.target+'\');"'
			}
			
			if(curMenuEle.js != ''){
				A5MenuHideList = ''
				if(A5Menu.parentMenus != ''){
					A5MenuHideList = A5Menu.parentMenus
				}
				if(A5MenuHideList != ''){
					A5MenuHideList = A5MenuHideList+','+A5Menu.varName
				}
				else{
					A5MenuHideList = A5Menu.varName
				}
				if(A5Menu.peripheralMenus != ''){
					A5MenuHideList = A5MenuHideList+','+A5Menu.peripheralMenus
				}
				if(A5Menu.childMenus != ''){
					A5MenuHideList = A5MenuHideList+','+A5Menu.childMenus
				}
				curRenderJS = ' onclick="'+curMenuEle.js+'; a5_menuCleanup(\''+A5MenuHideList+'\',\''+A5Menu.style+'\','+A5Menu.varName+'.exitCode);"';
			}
			if(curMenuEle.icon != ''){
				curRenderIcon = ' style="background-image: url(\''+curMenuEle.icon+'\'); background-position: center left; background-repeat: no-repeat; '+renderImgSize+'"';
			}
			
			curContents = '<span id="'+curMenuEle.id+'"'+curRenderIcon+'>'+curMenuEle.text+'</span>'
			if(curMenuEle.childMenu != ''){
				curContents = '<span class="'+A5Menu.style+'MenuCas" style="display: block;">'+curContents+'</span>'
			}
			renderedHTML = renderedHTML + '\t<li'+curRenderID+' class="'+curRenderClass+'" style="'+renderWidth+forceNoWrap+'" onmouseover="a5_menuOnMouseOver('+A5Menu.varName+',this,'+i+','+A5Menu.TOvarName+')" onmouseout="'+A5Menu.TOvarName+' = a5_menuOnMouseOut('+A5Menu.varName+',this,'+i+')"'+curRenderJS+'>'+curContents+'</li>\n';
		}
		else if(curMenuEle.type == 2){
			if(curMenuEle.childMenu != ''){
				curRenderID = ' id="A5MENU_'+curMenuEle.childMenu+'_CASPOINTER"';
			}
			else{
				curRenderID = '';
			}
			curRenderClass = A5Menu.style+'MenuOff';
			renderedHTML = renderedHTML + '\t<li'+curRenderID+' class="'+curRenderClass+'" style="'+renderWidth+'" onmouseover="a5_menuOnMouseOver('+A5Menu.varName+',this,'+i+','+A5Menu.TOvarName+')" onmouseout="'+A5Menu.TOvarName+' = a5_menuOnMouseOut('+A5Menu.varName+',this,'+i+')">'+curMenuEle.html+'</li>\n';
		}
		else if(curMenuEle.type == 3){
			renderedHTML = renderedHTML + '</ul>\n\t<div class="'+A5Menu.style+'MenuSeparator" style="'+renderWidth+'" onmouseover="a5_menuOnMouseOver('+A5Menu.varName+',this,'+i+','+A5Menu.TOvarName+')" onmouseout="'+A5Menu.TOvarName+' = a5_menuOnMouseOut('+A5Menu.varName+',this,'+i+')">&nbsp;</div>\n<ul class="'+A5Menu.style+'Menu">';
		}
	}
	renderedHTML = renderedHTML + '</ul></div>\n'
	if(document.getElementById(A5Menu.container)) renderContainer = document.getElementById(A5Menu.container);
	else {
		renderContainer = document.createElement('div');
		renderContainer.id = A5Menu.container;
		renderContainer.style.borderStyle = 'none';
		renderContainer.style.backgroundColor = '';
		renderContainer.style.backgroundImage = '';
		renderContainer.style.position = 'absolute';
		renderContainer.style.top = '0px';
		renderContainer.style.left = '0px';
		renderContainer.style.zIndex = '999999';
		document.body.insertBefore(renderContainer,document.body.firstChild);
	}
	renderContainer.innerHTML =  renderContainer.innerHTML + renderedHTML;
	
	delete renderContainer
	delete renderedHTML
}

function a5_menuOnMouseOver(A5Menu,A5MenuEle,A5MenuArrayEle,A5MenuTimeoutVar){
	curMenuEle = A5Menu.arr[A5MenuArrayEle];

	if(A5Menu.parentMenus != ''){
		A5menuDIVarrStr = A5Menu.parentMenus+','+A5Menu.varName
		A5menuDIVarr = A5menuDIVarrStr.split(',');
		if(A5menuDIVarr.length > 1){
			for(i=1;i<A5menuDIVarr.length;i++){
				document.getElementById('A5MENU_'+A5menuDIVarr[i]+'_CASPOINTER').className = A5Menu.style+'MenuOn';
			}
		}
	}
	
	if(A5Menu.childMenus != ''){
		a5_menuCleanup('null,'+A5Menu.childMenus,A5Menu.style,'');
	}

	if(curMenuEle.type == 1){
		A5MenuEle.className = A5Menu.style+'MenuOn';
		
		if(curMenuEle.iconOver != ''){
			A5MenuEle.firstChild.style.backgroundImage = 'url('+curMenuEle.iconOver+')';
		}
		if(curMenuEle.textOver != ''){
			A5MenuEle.firstChild.innerHTML = curMenuEle.textOver;
		}
	}
	else if(curMenuEle.type == 2){
		A5MenuEle.className = A5Menu.style+'MenuOn';
	}

	if(curMenuEle.childMenu != ''){
		curChildMenu = document.getElementById('A5MENU_'+curMenuEle.childMenu);
		curChildMenu.style.display = 'block';
		a5_setPosHorz(A5MenuEle,curChildMenu,A5Menu.mainOffset,A5Menu.subOffset)
		
		
	}
	
	clearTimeout(A5MenuTimeoutVar);
	a5_hideSelects();
}

function a5_menuOnMouseOut(A5Menu,A5MenuEle,A5MenuArrayEle){
	if(A5MenuArrayEle > -1){
		curMenuEle = A5Menu.arr[A5MenuArrayEle];
		if(curMenuEle.type == 1){
			A5MenuEle.className = A5Menu.style+'MenuOff';
			
			if(curMenuEle.iconOver != ''){
				A5MenuEle.firstChild.style.backgroundImage = 'url('+curMenuEle.icon+')';
			}
			if(curMenuEle.textOver != ''){
				A5MenuEle.firstChild.innerHTML = curMenuEle.text;
			}
		}
		else if(curMenuEle.type == 2){
			A5MenuEle.className = A5Menu.style+'MenuOff';
		}
	}

	if(A5Menu.parentMenus != ''){
		A5MenuHideList = ''
		if(A5Menu.parentMenus != ''){
			A5MenuHideList = A5Menu.parentMenus
		}
		if(A5MenuHideList != ''){
			A5MenuHideList = A5MenuHideList+','+A5Menu.varName
		}
		else{
			A5MenuHideList = A5Menu.varName
		}
		if(A5Menu.peripheralMenus != ''){
			A5MenuHideList = A5MenuHideList+','+A5Menu.peripheralMenus
		}
		if(A5Menu.childMenus != ''){
			A5MenuHideList = A5MenuHideList+','+A5Menu.childMenus
		}
		return setTimeout('a5_menuCleanup(\''+A5MenuHideList+'\',\''+A5Menu.style+'\','+A5Menu.varName+'.exitCode)',500)
	}
	else{
		return 0
	}
}

function a5_menuCleanFromVar(A5Menu){
	if(A5Menu.parentMenus != ''){
		A5MenuHideList = ''
		if(A5Menu.parentMenus != ''){
			A5MenuHideList = A5Menu.parentMenus
		}
		if(A5MenuHideList != ''){
			A5MenuHideList = A5MenuHideList+','+A5Menu.varName
		}
		else{
			A5MenuHideList = A5Menu.varName
		}
		if(A5Menu.peripheralMenus != ''){
			A5MenuHideList = A5MenuHideList+','+A5Menu.peripheralMenus
		}
		if(A5Menu.childMenus != ''){
			A5MenuHideList = A5MenuHideList+','+A5Menu.childMenus
		}
		a5_menuCleanup(A5MenuHideList,A5Menu.style,A5Menu.exitCode);
	}
}

function a5_menuCleanup(A5MenuList,A5MenuStyle,a5_menuCleanupCode){
	if(A5MenuList != ''){
		A5menuDIVarr = A5MenuList.split(',');
		if(A5menuDIVarr.length > 1){
			for(i=1;i<A5menuDIVarr.length;i++){
				document.getElementById('A5MENU_'+A5menuDIVarr[i]).style.display = 'none';
				document.getElementById('A5MENU_'+A5menuDIVarr[i]+'_CASPOINTER').className = A5MenuStyle+'MenuOff';
			}
		}
		if(a5_menuCleanupCode != ''){
			eval(a5_menuCleanupCode)
		}
		a5_showSelects();
	}
}

function a5_menuNavigate(curHrefStr,curTargetStr){
	if(curTargetStr != ''){
		window.open(curHrefStr,curTargetStr);
	} else{
		document.location = curHrefStr;
	}	
}

function a5_menuShowTop(parentObj,menuObj,posTypeNum,mainOffNum,subOffNum){
	a5_setObjPos(parentObj,menuObj,posTypeNum,mainOffNum,subOffNum);
	menuObj.style.display = 'block';
	a5_hideSelects();
}

function a5_showSelects(){
	if(a5menuSettings.shouldHide && a5menuSettings.selectsHidden == true){
		var selsObj = document.getElementsByTagName('SELECT');
		for(i=0;i<selsObj.length;i++)
			selsObj[i].style.visibility = 'visible';
		a5menuSettings.selectsHidden = false;
	}
}
function a5_hideSelects(){
	if(a5menuSettings.shouldHide && a5menuSettings.selectsHidden == false){
		var selsObj = document.getElementsByTagName('SELECT');
		for(i=0;i<selsObj.length;i++)
			selsObj[i].style.visibility = 'hidden';
		a5menuSettings.selectsHidden = true;
	}
}

var a5menuSettings = new Object();
a5menuSettings.selectsHidden = false;
a5menuSettings.shouldHide = false;
if(document.getElementsByTagName('SELECT') && document.all)
	a5menuSettings.shouldHide = true;