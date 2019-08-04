function a5_detail_populate(curRow,rowObj){
	var tempValArr = new Array();
	tempValArr = rowObj.pop.data.split(rowObj.sep1)
	a5_populate_from_map(rowObj.pop.ids,tempValArr[curRow],rowObj.sep2)
	
	var i = new Number();

	if(rowObj.sel.length > 0){
		for(i=0;i<rowObj.sel.length;i++){
			tempValStr = rowObj.sel[i].val
			tempValArr = tempValStr.split(rowObj.sep1);
			a5_populate_select_options(rowObj.sel[i].objID,tempValArr[curRow],true,rowObj.sel[i].list);
		}
	}

	if(rowObj.iList.length > 0){
		for(i=0;i<rowObj.iList.length;i++){
			tempValStr = rowObj.iList[i].val
			tempValArr = tempValStr.split(rowObj.sep1);
			a5_populate_input_list(rowObj.iList[i].type,rowObj.iList[i].contID,rowObj.iList[i].objID,tempValArr[curRow],true,rowObj.iList[i].list,rowObj.iList[i].lb);
		}
	}

	
	if(rowObj.newFormID != '' && rowObj.editFormID != ''){
		if(curRow == 0){
			document.getElementById(rowObj.newFormID).style.display = 'block';
			document.getElementById(rowObj.editFormID).style.display = 'none';
		} else {
			document.getElementById(rowObj.editFormID).style.display = 'block';
			document.getElementById(rowObj.newFormID).style.display = 'none';
		}
	}

	if(rowObj.hideGrid) {
		document.getElementById(rowObj.gridID).style.display = 'none';
	}

	if(rowObj.hideDetailView) {
		document.getElementById(rowObj.detailViewID).style.display = 'block';
	}
	var ele = document.getElementById(rowObj.detailViewID)
		var selectedPosX = 0;
		var selectedPosY = 0;
		
		while(ele != null){
			selectedPosX += ele.offsetLeft;
			selectedPosY += ele.offsetTop;
			ele = ele.offsetParent;
		}
	window.scrollTo(selectedPosX,selectedPosY);
	
}


function a5_populate_from_map(idMap,popData,sepStr){
	idArr = idMap.split(sepStr);
	popArr = popData.split(sepStr);
	var tempArr = new Array();
	for(i=0;i<idArr.length;i++){
		curObj = document.getElementById(idArr[i])
		if(curObj.tagName.toLowerCase() == 'input'){
			if(curObj.type.toLowerCase() == 'checkbox'){
				if(popArr[i].toLowerCase() == 'true'){
					curObj.checked = true;
				} else{
					curObj.checked = false;
				}
			} else{
				curObj.value = a5_populate_parse_value(popArr[i],'input');
			}
		} else if(curObj.tagName.toLowerCase() == 'textarea'){
			curObj.value = a5_populate_parse_value(popArr[i],'input');
		} else if(curObj.tagName.toLowerCase() == 'img'){
			curObj.src = popArr[i];
		} else {
			tempArr = popArr[i].split('&crlf;')
			curObj.innerHTML = a5_populate_parse_value(popArr[i],'');
		}
	}
}

function a5_populate_input_list(curInputType,curContID,curID,curValue,clearOld,popList,radioLineBreak){

	var curHTML = new String();
	var radioArr = new Array();
	radioArr = popList.split('\n');
	var tempRadioArr = new Array();
	var tempSelAtt = new String();
	
	var curValArr = new Array();
	if(curValue != ''){
		curValArr = curValue.split(',')
	}
	
	var lineBreakStr = new String();
	if(radioLineBreak){
		lineBreakStr = '<br />';
	}
	if(popList != ''){
		var curIlistArrIndx = new Number();
		curIlistArrIndx = 0
		var tempIlistArrIndx = new Number();
		for(curIlistArrIndx=0;curIlistArrIndx<radioArr.length;curIlistArrIndx++){
			tempRadioArr = radioArr[curIlistArrIndx].split('|')
			tempSelAtt = ''
			if(tempRadioArr.length > 1){
				if(curValArr.length > 0){
					tempIlistArrIndx = 0
					for(tempIlistArrIndx=0;tempIlistArrIndx<curValArr.length;tempIlistArrIndx++){
						if(tempRadioArr[1] == curValArr[tempIlistArrIndx]){
							curValArr[tempIlistArrIndx] = ' '
							curValArr = curValArr.sort()
							curValArr = curValArr.reverse()
							curValArr.length = curValArr.length - 1
							tempSelAtt = ' checked'
							break
						}
					}
				}
				curHTML = curHTML + '<input type="'+curInputType+'" value="'+tempRadioArr[1]+'" name="'+curID+'" id="'+curID+'_'+curIlistArrIndx+'"'+tempSelAtt+' /> <label for="'+curID+'_'+curIlistArrIndx+'">'+tempRadioArr[0]+'</label>'+lineBreakStr
			}
			else{
				if(curValArr.length > 0){
					tempIlistArrIndx = 0
					for(tempIlistArrIndx=0;tempIlistArrIndx<curValArr.length;tempIlistArrIndx++){
						if(tempRadioArr[0] == curValArr[tempIlistArrIndx]){
							curValArr[tempIlistArrIndx] = ' '
							curValArr = curValArr.sort()
							curValArr = curValArr.reverse()
							curValArr.length = curValArr.length - 1
							tempSelAtt = ' checked'
							break
						}
					}
				}
				curHTML = curHTML + '<input type="'+curInputType+'" value="'+tempRadioArr[0]+'" name="'+curID+'" id="'+curID+'_'+curIlistArrIndx+'"'+tempSelAtt+' /> <label for="'+curID+'_'+curIlistArrIndx+'">'+tempRadioArr[0]+'</label>'+lineBreakStr
			}
		}
	}
	
	if(curValArr.length > 0){
		tempIlistArrIndx = 0
		for(tempIlistArrIndx=0;tempIlistArrIndx<curValArr.length;tempIlistArrIndx++){
			curHTML = '<input type="'+curInputType+'" value="'+curValArr[tempIlistArrIndx]+'" name="'+curID+'" id="'+curID+'_'+radioArr.length+'" checked /> <label for="'+curID+'_'+radioArr.length+'">'+curValArr[tempIlistArrIndx]+'</label>'+lineBreakStr+curHTML
		}
	}

	curObj = document.getElementById(curContID)
	if(clearOld){
		curObj.innerHTML = curHTML
	}
	else{
		curObj.innerHTML = curObj.innerHTML + curHTML
	}
}

function a5_populate_select_options(curID,curValue,clearOld,popList){
	
	var curValArr = new Array();
	if(curValue != ''){
		curValArr = curValue.split(',')
	} else {
		curValArr[0] = ''
	}
	
	curObj = document.getElementById(curID)
	if(clearOld){
		curObj.options.length = 0;
		curIndx = 0
	}
	else{
		curIndx = curObj.options.length
	}
	
	var tempSelArrIndx = new Number();
	
	
	var optArr = new Array()
	optArr = popList.split('\n')
	if(optArr.length > 0){
		curSelOptIndNum = 0
		var optTempArr = new Array()
		for(curSelOptIndNum=0;curSelOptIndNum<optArr.length;curSelOptIndNum++){
			optTempArr = optArr[curSelOptIndNum].split('|')
			if(optTempArr.length > 1){
				curObj.options[curIndx] = new Option(optTempArr[0],optTempArr[1])
				
				if(curValArr.length > 0){
					tempSelArrIndx = 0
					for(tempSelArrIndx=0;tempSelArrIndx<curValArr.length;tempSelArrIndx++){
						if(optTempArr[1] == curValArr[tempSelArrIndx]){
							curValArr[tempSelArrIndx] = ' ';
							curValArr = curValArr.sort();
							curValArr = curValArr.reverse();
							curValArr.length = curValArr.length - 1;
							curObj.options[curIndx].selected = true;
							break;
						}
					}
				}
			}
			else{
				curObj.options[curIndx] = new Option(optTempArr[0],optTempArr[0])
				
				if(curValArr.length > 0){
					tempSelArrIndx = 0
					for(tempSelArrIndx=0;tempSelArrIndx<curValArr.length;tempSelArrIndx++){
						if(optTempArr[0] == curValArr[tempSelArrIndx]){
							curValArr[tempSelArrIndx] = ' ';
							curValArr = curValArr.sort();
							curValArr = curValArr.reverse();
							curValArr.length = curValArr.length - 1;
							curObj.options[curIndx].selected = true;
							break;
						}
					}
				}
			}
			curIndx++
		}
	}

	otpValFound = false

	if(curValArr.length > 0){
		for(tempSelArrIndx=0;tempSelArrIndx<curValArr.length;tempSelArrIndx++){
			curObj.options[curIndx] = new Option(curValArr[tempSelArrIndx],curValArr[tempSelArrIndx])
			curObj.options[curIndx].selected = true;
			curIndx++
		}
	}
}


function a5_populate_parse_value(curValue,valueType){
	var tempArr = new Array();
	
	
	tempArr = curValue.split('&crlf;');
	curValue = tempArr.join('\n')
	tempArr = curValue.split('&pipe;');
	curValue = tempArr.join('|')
	
	if(valueType != 'input'){
		tempArr = curValue.split('<');
		curValue = tempArr.join('&gt;')
		tempArr = curValue.split('>')
		curValue = tempArr.join('&lt;')
	}
	
	return curValue;
}
