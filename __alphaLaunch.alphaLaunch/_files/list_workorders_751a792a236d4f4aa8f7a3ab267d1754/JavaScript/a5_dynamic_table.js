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

	var tempCellData = new String();

	for(i=0;i<dynTableObj.cellData.length;i++){
		tempCellData = '';
		tempCellData = dynTableObj.cellData[i];
		while(tempCellData.search('{ORDERINDX}') != -1){
			tempCellData = tempCellData.replace('{ORDERINDX}',''+dynTableObj.orderIndx);
		}
		curCellObj = curRowObj.insertCell(i);
		curCellObj.innerHTML = tempCellData;
		curCellObj.className = dynTableObj.cellClass[i];
	}

	curCellObj = curRowObj.insertCell(curRowObj.cells.length);
	curCellObj.innerHTML = '<a href="#" class="'+queryObj.dynamic.linkClass+'" onclick="a5_dynamicTable_rowAdd(this.parentNode.parentNode,'+dynTableObj.varName+'); return false;">'+queryObj.dynamic.addText+'</a> <a href="#" class="'+queryObj.dynamic.linkClass+'" onclick="a5_dynamicTable_rowRemove(this.parentNode.parentNode,'+dynTableObj.varName+'); return false;">'+queryObj.dynamic.delText+'</a>';
	curCellObj.className = queryObj.dynamic.cellClass
	
	// update query order array
	dynTableObj.order.splice(curIndxNum-queryObj.rowOffset,0,dynTableObj.orderIndx);
	document.getElementById(queryObj.orderInput).value = dynTableObj.order.join('|');
}

function a5_dynamicTable_rowRemove(curObj,dynTableObj){
	var curIndxNum = new Number();
	var curParentObj = new Object();
	curIndxNum = curObj.rowIndex;
	curParentObj = curObj.parentNode;

	delete curObj;

	curParentObj.deleteRow(curIndxNum);

	// update query order array
	dynTableObj.order.splice(curIndxNum-queryObj.rowOffset,1);
	document.getElementById(queryObj.orderInput).value = dynTableObj.order.join('|');
}