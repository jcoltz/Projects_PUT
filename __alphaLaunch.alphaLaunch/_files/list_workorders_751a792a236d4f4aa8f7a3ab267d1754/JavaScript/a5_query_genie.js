function a5_query_genie_fieldname_change(orderIndx,queryDataObj){
	var curFieldNameStr = new String();
	var curFieldTypeNum = new Number();
	curFieldNameStr = document.getElementById(queryDataObj.varName+'.r'+orderIndx+'.fieldname').value;
	var fieldNameArr = new Array();
	var tempFieldNameArr = new Array();
	fieldNameArr = queryDataObj.fields.split('\n');
	for(i=0;i<fieldNameArr.length;i++){
		tempFieldNameArr = fieldNameArr[i].split('|');
		if(tempFieldNameArr[0] == curFieldNameStr){
			curFieldTypeNum = parseInt(tempFieldNameArr[1]);
			break;
		}
	}

	a5_populate_select_options(queryDataObj.varName+'.r'+orderIndx+'.operator',queryDataObj.varTypeDefault[curFieldTypeNum],true,queryDataObj.varTypeSel[curFieldTypeNum])

	a5_query_genie_set_doubleValue(orderIndx,queryDataObj)

}

function a5_query_genie_set_doubleValue(orderIndx,queryDataObj){
	setDoubleLogical = false;
	setNoLogical = false;
	if(queryDataObj.doubleValues.length > 0){
		var curOpStr = new String();
		curOpStr = document.getElementById(queryDataObj.varName+'.r'+orderIndx+'.operator').value;
		for(i=0;i<queryDataObj.doubleValues.length;i++){
			if(queryDataObj.doubleValues[i] == curOpStr){
				setDoubleLogical = true;
				break;
			}
		}
		for(i=0;i<queryDataObj.noValues.length;i++){
			if(queryDataObj.noValues[i] == curOpStr){
				setNoLogical = true;
				break;
			}
		}
	}
	
	
	var indxArr = new Array();
	var tempStr = new String();
	tempStr = document.getElementById(queryDataObj.varName+'.r'+orderIndx+'.valueIndx').value
	indxArr = tempStr.split(',')
	
	if(setDoubleLogical){
		for(i=0;i<indxArr.length;i++){
			document.getElementById(queryDataObj.varName+'.r'+orderIndx+'.v'+indxArr[i]+'.doubleCont').style.display = 'inline';
			document.getElementById(queryDataObj.varName+'.r'+orderIndx+'.v'+indxArr[i]+'.value1').style.width = queryDataObj.doubleValueSize
		}
	} else{
		for(i=0;i<indxArr.length;i++){
			document.getElementById(queryDataObj.varName+'.r'+orderIndx+'.v'+indxArr[i]+'.doubleCont').style.display = 'none';
			document.getElementById(queryDataObj.varName+'.r'+orderIndx+'.v'+indxArr[i]+'.value1').style.width = queryDataObj.singleValueSize
		}
	}
	
	if(setNoLogical){
		document.getElementById(queryDataObj.varName+'.r'+orderIndx+'.valueUL').style.display = 'none';
	} else {
		document.getElementById(queryDataObj.varName+'.r'+orderIndx+'.valueUL').style.display = 'block';
	}
}

function a5_query_genie_submit(orderArr,queryDataObj){
	
	submitFormLog = true
	
	var totalPnum = new Number();
	var curRPstr = new String();
	var curRParr = new Array();
	var curRPnum = new Number();
	var curLPstr = new String();
	var curLParr = new Array();
	var curLPnum = new Number();
	for(i=0;i<orderArr.length;i++){
		curRPstr = document.getElementById(queryDataObj.varName+'.r'+orderArr[i]+'.rparen').value;
		curRPnum = 0;
		curLPstr = document.getElementById(queryDataObj.varName+'.r'+orderArr[i]+'.lparen').value;
		curLPnum = 0;
		
		curRParr = curRPstr.split(')')
		curLParr = curLPstr.split('(')
		
		if(curRPstr.length != curRParr.length-1){
			alert('Bad character in right parenthesis, row '+(i+1)+'.');
			submitFormLog = false;
			break;
		} else {
			curRPnum = curRParr.length
		}
		if(curLPstr.length != curLParr.length-1){
			alert('Bad character in left parenthesis, row '+(i+1)+'.');
			submitFormLog = false;
			break;
		} else {
			curLPnum = curLParr.length
		}
		
		totalPnum = totalPnum+curLPnum-curRPnum
	}
	
	if(totalPnum != 0){
		if(totalPnum > 0){
			alert(totalPnum+' missing ")".');
			submitFormLog = false;
		} else{
			alert(Math.abs(totalPnum)+' missing "(".');
			submitFormLog = false;
		}
	}
	
	return submitFormLog;
}