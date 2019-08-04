function a5_getEleLeft(element){
	var left_pos = element.offsetLeft;
	var parElement = element.offsetParent;
	while (parElement != null){
		left_pos += parElement.offsetLeft;
		parElement = parElement.offsetParent;
	}
	return left_pos;
}

function a5_getEleTop(element){
	var top_pos = element.offsetTop;
	var parElement = element.offsetParent;
	while (parElement != null){
		top_pos += parElement.offsetTop;
		parElement = parElement.offsetParent;
	}
	return top_pos;
}

function a5_setObjPos(parentObj,childObj,posTypeNum,mainOffNum,subOffNum){
	var parentTopNum = new Number();
	var parentLeftNum = new Number();
	var parentWidthNum = new Number();
	var parentHeightNum = new Number();
	var childWidthNum = new Number();
	var childHeightNum = new Number();

	parentTopNum = a5_getEleTop(parentObj);
	parentLeftNum = a5_getEleLeft(parentObj);
	parentWidthNum = parentObj.offsetWidth;
	parentHeightNum = parentObj.offsetHeight;
	childWidthNum = childObj.offsetWidth;
	childHeightNum = childObj.offsetHeight;

	switch(posTypeNum){
		case(1):
			childObj.style.left = (parentLeftNum-childWidthNum-mainOffNum)+'px'
			childObj.style.top = (parentTopNum-childHeightNum-subOffNum)+'px'
		break
		case(2):
			childObj.style.left = (parentLeftNum+subOffNum)+'px'
			childObj.style.top = (parentTopNum-childHeightNum-mainOffNum)+'px'
		break
		case(3):
			childObj.style.left = (parentLeftNum+(parentWidthNum-childWidthNum)-subOffNum)+'px'
			childObj.style.top = (parentTopNum-childHeightNum-mainOffNum)+'px'
		break
		case(4):
			childObj.style.left = (parentLeftNum+parentWidthNum+mainOffNum)+'px'
			childObj.style.top = (parentTopNum-childHeightNum-subOffNum)+'px'
		break
		case(5):
			childObj.style.left = (parentLeftNum-childWidthNum-mainOffNum)+'px'
			childObj.style.top = (parentTopNum+subOffNum)+'px'
		break
		case(6):
			childObj.style.left = (parentLeftNum+subOffNum)+'px'
			childObj.style.top = (parentTopNum+mainOffNum)+'px'
		break
		case(7):
			childObj.style.left = (parentLeftNum+parentWidthNum-childWidthNum-subOffNum)+'px'
			childObj.style.top = (parentTopNum+mainOffNum)+'px'
		break
		case(8):
			childObj.style.left = (parentLeftNum+parentWidthNum+mainOffNum)+'px'
			childObj.style.top = (parentTopNum+subOffNum)+'px'
		break
		case(9):
			childObj.style.left = (parentLeftNum-childWidthNum-mainOffNum)+'px'
			childObj.style.top = (parentTopNum-(childHeightNum-parentHeightNum)-subOffNum)+'px'
		break
		case(10):
			childObj.style.left = (parentLeftNum+subOffNum)+'px'
			childObj.style.top = (parentTopNum-(childHeightNum-parentHeightNum)-mainOffNum)+'px'
		break
		case(11):
			childObj.style.left = (parentLeftNum+parentWidthNum-childWidthNum-subOffNum)+'px'
			childObj.style.top = (parentTopNum-(childHeightNum-parentHeightNum)-mainOffNum)+'px'
		break
		case(12):
			childObj.style.left = (parentLeftNum+parentWidthNum+mainOffNum)+'px'
			childObj.style.top = (parentTopNum-(childHeightNum-parentHeightNum)-subOffNum)+'px'
		break
		case(13):
			childObj.style.left = (parentLeftNum-childWidthNum-mainOffNum)+'px'
			childObj.style.top = (parentTopNum+parentHeightNum+subOffNum)+'px'
		break
		case(14):
			childObj.style.left = (parentLeftNum+subOffNum)+'px'
			childObj.style.top = (parentTopNum+parentHeightNum+mainOffNum)+'px'
		break
		case(15):
			childObj.style.left = (parentLeftNum+(parentWidthNum-childWidthNum)-subOffNum)+'px'
			childObj.style.top = (parentTopNum+parentHeightNum+mainOffNum)+'px'
		break
		case(type=16):
			childObj.style.left = (parentLeftNum+parentWidthNum+mainOffNum)+'px'
			childObj.style.top = (parentTopNum+parentHeightNum+subOffNum)+'px'
		break
	}
}
