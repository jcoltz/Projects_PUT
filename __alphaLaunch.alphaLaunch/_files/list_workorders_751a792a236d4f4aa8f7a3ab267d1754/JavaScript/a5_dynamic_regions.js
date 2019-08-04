function a5_dynamicTable_rowAdd(curObj,dynTableObj){
	dynTableObj.orderIndx++;

	var curIndxNum = new Number();
	var curParentObj = new Object();
	var curRowObj = new Object();
	var curCellObj = new Object();
	curIndxNum = curObj.rowIndex+1;
	curParentObj = curObj.parentNode;

	curParentObj.insertRow(curIndxNum);
	curRowObj = curParentObj.rows[curIndxNum];

	var tempCellDataArr = new Array();
	

	for(i=0;i<dynTableObj.cells.length;i++){
		tempCellDataArr = dynTableObj.cells[i].tdHTML.split('{ORDERINDX}');
		
		
		curCellObj = curRowObj.insertCell(i);
		curCellObj.innerHTML = tempCellDataArr.join(''+dynTableObj.orderIndx);
		curCellObj.className = dynTableObj.cells[i].tdClass;
		curCellObj.vAlign = dynTableObj.cells[i].tdValign;
				
		
	}
	
	
	// run code
	var tempCodeArr = new Array();
	tempCodeArr = dynTableObj.row.onCreateCode.split('{ORDERINDX}');
	if(dynTableObj.row.onCreateCode != ''){
		eval(tempCodeArr.join(''+dynTableObj.orderIndx))
	}
	
	
	curCellObj = curRowObj.insertCell(curRowObj.cells.length);
	curCellObj.innerHTML = '<a href="#" class="'+dynTableObj.dynamic.linkClass+'" onclick="a5_dynamicTable_rowAdd(this.parentNode.parentNode,'+dynTableObj.varName+'); return false;">'+dynTableObj.dynamic.addHTML+'</a> <a href="#" class="'+dynTableObj.dynamic.linkClass+'" onclick="a5_dynamicTable_rowRemove(this.parentNode.parentNode,'+dynTableObj.varName+'); return false;">'+dynTableObj.dynamic.delHTML+'</a>';
	curCellObj.className = dynTableObj.dynamic.cellClass
	
	// update query order array
	dynTableObj.order.splice(curIndxNum-dynTableObj.row.offset,0,dynTableObj.orderIndx);
	document.getElementById(dynTableObj.orderInput).value = dynTableObj.order.join(',');
}

function a5_dynamicTable_rowRemove(curObj,dynTableObj){
	var curIndxNum = new Number();
	var curParentObj = new Object();
	curIndxNum = curObj.rowIndex;
	curParentObj = curObj.parentNode;

	delete curObj;

	curParentObj.deleteRow(curIndxNum);
	
	// run code
	var tempCodeArr = new Array();
	tempCodeArr = dynTableObj.row.onRemoveCode.split('{ORDERINDX}');
	if(dynTableObj.row.onCreateCode != ''){
		eval(tempCodeArr.join(''+dynTableObj.orderIndx))
	}
	
	// update query order array
	dynTableObj.order.splice(curIndxNum-dynTableObj.row.offset,1);
	document.getElementById(dynTableObj.orderInput).value = dynTableObj.order.join(',');
}

function a5_dynamicUL_rowAdd(curObj,dynULObj){
	dynULObj.indx++;
	dynULObj.indxArr[dynULObj.indxArr.length] = dynULObj.indx;
	var newLIObj = new Object();
	var addedLIObj = new Object();
	newLIObj = document.createElement('li')
	// not adding HTML to newLIObj because in IE events won't work on the HTML.
	addedLIObj = curObj.parentNode.appendChild(newLIObj)
	var tempArr = new Array();
	tempArr = dynULObj.popHTML.split('{INDX}')
	
	addedLIObj.innerHTML = tempArr.join(''+dynULObj.indx);
	
	if(dynULObj.indxID != ''){
		document.getElementById(dynULObj.indxID).value = dynULObj.indxArr.join(',')
	}
}

function a5_dynamicUL_rowRemove(curObj,dynULObj,dynULindx){
	for(i=0;i<dynULObj.indxArr.length;i++){
		if(dynULindx == dynULObj.indxArr[i]){
			dynULObj.indxArr.splice(i,1)
			break;
		}
	}
	
	var curParentObj = new Object();
	curParentObj = curObj.parentNode;
	curParentObj.removeChild(curObj)
	
	if(dynULObj.indxID != ''){
		document.getElementById(dynULObj.indxID).value = dynULObj.indxArr.join(',')
	}
}