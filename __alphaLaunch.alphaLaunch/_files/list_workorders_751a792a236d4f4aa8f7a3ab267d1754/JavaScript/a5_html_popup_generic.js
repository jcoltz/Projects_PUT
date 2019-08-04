

function a5_popup_open(targetId,targetPage,targetHeight,targetWidth,IsResizeable,HasScrollBars){
	
	if(document.all){
		tempX = event.screenX;
		tempY = event.screenY;
		if(tempX+targetWidth > screen.width){
			tempX = screen.width-targetWidth;
		}
		if(tempY+targetHeight > screen.height){
			tempY = screen.height-targetHeight;
		}
		var new_win = open(targetPage,'','location=no,toolbar=no,width='+targetWidth+',height='+targetHeight+',top='+tempY+',left='+tempX+',resizable='+IsResizeable+',scrollbars='+HasScrollBars)
	}
	else{
		var new_win = open(targetPage,'','location=no,toolbar=no,width='+targetWidth+',height='+targetHeight+',top=100,left=100,resizable='+IsResizeable+',scrollbars='+HasScrollBars)
	}
	
	new_win.targetParentId = targetId;
}

function a5_popup_close(targetId,newValue){
	window.opener.document.getElementById(targetId).value = newValue;
	window.close();
}

function a5_multi_popup_open(targetIdList,targetPage,targetHeight,targetWidth,IsResizeable,HasScrollBars){
	
	if(document.all){
		tempX = event.screenX;
		tempY = event.screenY;
		if(tempX+targetWidth > screen.width){
			tempX = screen.width-targetWidth;
		}
		if(tempY+targetHeight > screen.height){
			tempY = screen.height-targetHeight;
		}
		var new_win = open(targetPage,'','location=no,toolbar=no,width='+targetWidth+',height='+targetHeight+',top='+tempY+',left='+tempX+',resizable='+IsResizeable+',scrollbars='+HasScrollBars)
	}
	else{
		var new_win = open(targetPage,'','location=no,toolbar=no,width='+targetWidth+',height='+targetHeight+',top=100,left=100,resizable='+IsResizeable+',scrollbars='+HasScrollBars)
	}
	
	new_win.targetParentIdList = targetIdList;
}

function a5_multi_popup_close(targetIdList,newValueArr){
	var targetIdArr = new Array();
	targetIdArr = targetIdList.split(',');
	for(i=0;i<targetIdArr.length;i++){
		if(window.opener.document.getElementById(targetIdArr[i]))
		{
		window.opener.document.getElementById(targetIdArr[i]).value = newValueArr[i];
		}
	}
	window.close();
}