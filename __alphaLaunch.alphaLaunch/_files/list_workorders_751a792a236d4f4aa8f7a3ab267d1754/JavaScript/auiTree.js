
AUI.tree = new Object();
AUI.tree.Tree = Class.create();
AUI.tree.Tree.prototype = {
	initialize: function(contId,data,options){
		this.contId = contId
		
		var fullOptions = {
			inputId: '',
			focusClassName: '',
			multiple: false,
			separator: '.',
			loadingMessage: 'Loading...',
			dynamicDataURL: '',
			dynamicDataHandle: '',
			node: {
				className: '',
				selectedClassName: '',
				labelClassName: '',
				icon: '',
				expandedIcon: '',
				collapsedIcon: '',
				leaf: {
					firstImage: '',
					image: '',
					lastImage: ''
				},
				branch: {
					firstExpandedImage: '',
					firstCollapsedImage: '',
					firstExpandedHoverImage: '',
					firstCollapsedHoverImage: '',
					expandedImage: '',
					collapsedImage: '',
					expandedHoverImage: '',
					collapsedHoverImage: '',
					lastExpandedImage: '',
					lastCollapsedImage: '',
					lastExpandedHoverImage: '',
					lastCollapsedHoverImage: ''
				}
			},
			branch: {
				className: '',
				lineImage: '',
				nullImage: ''
			},
			onFocus: 0,
			onBlur: 0,
			onRightClick: 0,
			onNodeSelect: 0,
			onNodeClick: 0,
			onNodeExpand: 0,
			onNodeCollapse: 0
		};
		$u.o.assign(fullOptions,options);
		
		if(fullOptions.node.collapsedIcon == '') fullOptions.node.collapsedIcon = fullOptions.node.icon;
		if(fullOptions.node.expandedIcon == '') fullOptions.node.expandedIcon = fullOptions.node.collapsedIcon;
		
		if(fullOptions.node.selectedCollapsedIcon == '') fullOptions.node.selectedCollapsedIcon = fullOptions.node.selectedIcon;
		if(fullOptions.node.selectedExpandedIcon == '') fullOptions.node.selectedExpandedIcon = fullOptions.node.selectedCollapsedIcon;
		
		if(fullOptions.branch.lineImage == '') fullOptions.branch.lineImage = fullOptions.branch.nullImage;
		
		if(fullOptions.node.leaf.image == '') fullOptions.node.leaf.image = fullOptions.branch.nullImage;
		if(fullOptions.node.branch.expandedImage == '') fullOptions.node.branch.expandedImage = fullOptions.branch.nullImage;
		if(fullOptions.node.branch.collapsedImage == '') fullOptions.node.branch.collapsedImage = fullOptions.branch.nullImage;
		if(fullOptions.node.leaf.firstImage == '') fullOptions.node.leaf.firstImage = fullOptions.node.leaf.image;
		if(fullOptions.node.leaf.lastImage == '') fullOptions.node.leaf.lastImage = fullOptions.node.leaf.image;
		if(fullOptions.node.branch.firstExpandedImage == '') fullOptions.node.branch.firstExpandedImage = fullOptions.node.branch.expandedImage;
		if(fullOptions.node.branch.lastExpandedImage == '') fullOptions.node.branch.lastExpandedImage = fullOptions.node.branch.expandedImage;
		if(fullOptions.node.branch.firstCollapsedImage == '') fullOptions.node.branch.firstCollapsedImage = fullOptions.node.branch.collapsedImage;
		if(fullOptions.node.branch.lastCollapsedImage == '') fullOptions.node.branch.lastCollapsedImage = fullOptions.node.branch.collapsedImage;
		
		if(fullOptions.node.branch.firstExpandedHoverImage == '') fullOptions.node.branch.firstExpandedHoverImage = fullOptions.node.branch.expandedHoverImage;
		if(fullOptions.node.branch.lastExpandedHoverImage == '') fullOptions.node.branch.lastExpandedHoverImage = fullOptions.node.branch.expandedHoverImage;
		if(fullOptions.node.branch.firstCollapsedHoverImage == '') fullOptions.node.branch.firstCollapsedHoverImage = fullOptions.node.branch.collapsedHoverImage;
		if(fullOptions.node.branch.lastCollapsedHoverImage == '') fullOptions.node.branch.lastCollapsedHoverImage = fullOptions.node.branch.collapsedHoverImage;
		
		$u.o.assign(this,fullOptions);
		
		this.data = this._expandTreeData(data);
		var HTMLNodes = this._generateHTMLNodes([],[],this.data,true,'');
		HTMLNodes.id = contId+'.TREE';
		var contElement = $(contId);
		
		contElement.insertBefore(HTMLNodes,contElement.lastChild);
		
		this._keyWatch = new AUI.KeyWatcher([
								{key: 'up', handle: this._keyPrevNode},
								{key: 'down', handle: this._keyNextNode},
								{key: 'left', handle: this._keyBranchNode},
								{key: 'right', handle: this._keyChildNode},
								{key: 'enter', handle: this._keyEnter},
								{key: 'tab', handle: this._blur},
								{key: 'shift+tab', handle: this._blur}
							],this);
		
		var HTMLFocusCatcher = document.createElement('input');
		HTMLFocusCatcher.id = contId+'.FOCUSCATCHER';
		HTMLFocusCatcher.readonly = true;
		HTMLFocusCatcher.style.position = 'absolute';
		HTMLFocusCatcher.style.top = '-20px';
		HTMLFocusCatcher.style.left = '-20px';
		HTMLFocusCatcher.style.fontSize = '0px';
		$e.add(HTMLFocusCatcher,'focus',this._focus,this,true);
		$e.add(contElement,'click',this._focus,this,true);
		$e.add(contElement,'contextmenu',this._rClick,this,true);
		contElement.parentNode.insertBefore(HTMLFocusCatcher,contElement);
	},
	populateNode: function(nodeLoc,data){
		data = this._expandTreeData(data);
		var nodeImages = new Array();
		nodeImages[nodeImages.length] = $if(nodeLoc[0] == this.data.length-1,this.branch.nullImage,this.branch.lineImage);
		var dataNode = this.data[nodeLoc[0]];
		for(var i=1;i<nodeLoc.length;i++){
			nodeImages[i] = $if(nodeLoc[i] == dataNode.children.length-1,this.branch.nullImage,this.branch.lineImage);
			dataNode = dataNode.children[nodeLoc[i]];
		}
		dataNode.children = data;
		var HTMLNodes = this._generateHTMLNodes(nodeLoc,nodeImages,data,true,dataNode.branchClassName);
		$(this.contId+'.'+nodeLoc.join('.')).appendChild(HTMLNodes);
	},
	getDataNode: function(dataLoc){
		if(dataLoc.length == 0) return 0;
		var dataNode = this.data[dataLoc[0]];
		
		if(typeof dataLoc[0] == 'number'){
			var dataNode = this.data[dataLoc[0]];
			var parsedNodeLoc = [dataLoc[0]];
		} else {
			for(var i=0;i<this.data.length;i++){
				if(this.data[i].value.toLowerCase() == String(dataLoc[0]).toLowerCase()){
					var dataNode = this.data[i];
					var parsedNodeLoc = [i];
					break;
				}
			}
		}
		
		for(var i=1;i<dataLoc.length;i++){
			if(typeof dataLoc[i] == 'number'){
				dataNode = dataNode.children[dataLoc[i]];
				parsedNodeLoc[parsedNodeLoc.length] = dataLoc[i];
			} else {
				for(var j=0;j<dataNode.children.length;j++){
					if(dataNode.children[j].value.toLowerCase() == String(dataLoc[i]).toLowerCase()){
						dataNode = dataNode.children[j];
						parsedNodeLoc[parsedNodeLoc.length] = j;
						break;
					}
				}
			}
		}
		dataNode.location = parsedNodeLoc;
		return dataNode;
	},
	scrollToNode: function(dataNode){
		var bId = this.contId+'.'+dataNode.location.join('.')+'.LABEL';
		if($(bId)){
			var bNode = $(bId);
			var cEle = $(this.contId);
			if(cEle.scrollTop > bNode.offsetTop-(bNode.parentNode.offsetHeight*2)) cEle.scrollTop = bNode.offsetTop-(bNode.parentNode.offsetHeight*2)
			else if(cEle.scrollTop+cEle.offsetHeight < bNode.offsetTop) cEle.scrollTop = bNode.offsetTop+(bNode.parentNode.offsetHeight)-cEle.offsetHeight;
			//cEle.scrollTop = bNode.offsetTop-(bNode.parentNode.offsetHeight*2);
			cEle.scrollLeft = bNode.offsetLeft-40;
		}
	},
	setValue: function(){
		this._deselectAll();
		var selClassName = '';
		var dataNode = new Object();
		var dataLoc = 0;
		var valArr = 0;
		var valStart = arguments.length-1;
		if(this.multiple) valStart = 0;
		for(var i=valStart;i<arguments.length;i++){
			dataNode = 0;
			if(arguments[i].constructor == Array) dataNode = this.getDataNode(arguments[i]);
			else{
				valArr = String(arguments[i]).split(this.separator);
				if(valArr.length > 1) dataNode = this.getDataNode(valArr);
				else {
					dataLoc = new Array();
					this._getDataNodeFromValue(arguments[i],this.data,dataLoc);
					dataLoc.reverse();
					dataNode = this.getDataNode(dataLoc);
				}
			}
			
			if(typeof dataNode == 'object'){
				selClassName = this._gDef(dataNode.selectedClassName,this.node.selectedClassName);
				if(selClassName != '') $acn($(this.contId+'.'+dataNode.location.join('.')).firstChild,selClassName);
				this.selection[this.selection.length] = dataNode;
			}
		}
	},
	_expandTreeData: function(data){
		var tempData = new Object();
		for(var i=0;i<data.length;i++){
			if(typeof data[i] != 'object'){
				tempData = {html: ''+$u.s.tran(data[i],['<','>'],['&lt;','&gt;']), value: ''+data[i]};
				$u.o.assign(tempData,this._defaultNode,true);
				data[i] = tempData;
			} else{
				if(typeof data[i].value != 'undefined') data[i].defaultValue = false;
				$u.o.assign(data[i],this._defaultNode,true);
				
				if(data[i].value == '' && data[i].html != '') data[i].value = data[i].html;
				else if(data[i].html == '' && data[i].value != '') data[i].html = $u.s.tran(data[i].value,['<','>'],['&lt;','&gt;']);
				if(data[i].children.constructor == Array) data[i].children = this._expandTreeData(data[i].children);
			}
			
			if(i==data.length-1) data[i].isLast = true;
			else data[i].isLast = false;
		}
		return data;
	},
	_getPrevVisDataNode: function(dataNode){
		var dataLoc = new Array();
		for(var i=0;i<dataNode.location.length;i++) dataLoc[i] = dataNode.location[i];
		if(dataLoc[dataLoc.length-1] == 0){
			dataLoc.pop();
			return this.getDataNode(dataLoc);
		} else{
			dataLoc[dataLoc.length-1]--;
			var newDataNode = this.getDataNode(dataLoc);
			while(newDataNode.expanded){
				dataLoc.push(newDataNode.children.length-1);
				newDataNode = this.getDataNode(dataLoc);
			}
			return newDataNode;
		}
	},
	_getNextVisDataNode: function(dataNode){
		var dataLoc = new Array();
		for(var i=0;i<dataNode.location.length;i++) dataLoc[i] = dataNode.location[i];
		if(dataNode.isLast && !dataNode.expanded){
			// find the next child of the parent, or failing that of the parents parent...
			dataLoc.pop();
			if(dataLoc.length == 0) return false;
			var newDataNode = this.getDataNode(dataLoc);
			while(newDataNode.isLast){
				dataLoc.pop();
				if(dataLoc.length == 0) return false;
				newDataNode = this.getDataNode(dataLoc);
			}
			dataLoc[dataLoc.length-1]++;
			return this.getDataNode(dataLoc);
		} else{
			if(dataNode.expanded){
				dataLoc[dataLoc.length] = 0;
				return this.getDataNode(dataLoc);
			} else{
				dataLoc[dataLoc.length-1]++;
				return this.getDataNode(dataLoc);
			}
		}
	},
	_getDataNodeFromValue: function(value,data,dataLoc){
		var dataNode = 0;
		for(var i=0;i<data.length;i++){
			if(data[i].value == value){
				dataLoc[0] = i;
				break;
			}
			
			if(data[i].children.constructor == Array) this._getDataNodeFromValue(value,data[i].children,dataLoc);
			if(dataLoc.length > 0){
				dataLoc.push(i);
				break;
			}
		}
	},
	_getDataNodeValue: function(dataNode){
		if(dataNode.defaultValue){
			var valDataNode = new Object();
			var valDataLoc = new Array();
			var curValue = '';
			for(var i=0;i<dataNode.location.length;i++) valDataLoc[i] = dataNode.location[i];
			for(var i=valDataLoc.length-1;i>=0;i--){
				valDataNode = this.getDataNode(valDataLoc);
				curValue = $if(i!=0,this.separator,'')+valDataNode.value+curValue;
				valDataLoc.pop();
			}
			return curValue;
		} else{
			return dataNode.value;
		}
	},
	_generateHTMLNodes: function(parentNodeLocs,parentNodeLineImages,data,expanded,branchClassName){
		var ulNode = document.createElement('ul');
		var liNode = new Object();
		var divNode = new Object();
		var buttonNode = new Object();
		var tempNode = new Object();
		var tempNodeloc = new Array();
		var tempLineImages = new Array();
		var joinedParentLocs = parentNodeLocs.join('.');
		var baseId = '';
		var isLast = false;
		var curIcon = '';
		
		ulNode.className = this._gDef(branchClassName,this.branch.className);
		ulNode.style.margin = '0px';
		ulNode.style.padding = '0px';
		ulNode.style.listStyle = 'none';
		if(!expanded) ulNode.style.display = 'none';
		ulNode.unselectable = 'on';
		for(var i=0;i<data.length;i++){
			baseId = $if(joinedParentLocs!='',this.contId+'.'+joinedParentLocs+'.'+i,this.contId+'.'+i);
			
			liNode = document.createElement('li');
			liNode.style.margin = '0px';
			liNode.style.padding = '0px';
			liNode.id = baseId;
			liNode.setAttribute('AUITreeNodeLocation',$if(joinedParentLocs!='',joinedParentLocs+'.'+i,i))
			liNode.unselectable = 'on';
			
			divNode = document.createElement('div');
			divNode.className = this._gDef(data[i].className,this.node.className);
			divNode.style.whiteSpace = 'nowrap';
			divNode.unselectable = 'on';
			
			// content of node
			// establish location in array
			if(i == data.length-1) isLast = true;
			// create indent images
			for(var j=0;j<parentNodeLineImages.length;j++){
				tempNode = document.createElement('img');
				tempNode.src = parentNodeLineImages[j];
				tempNode.style.verticalAlign = 'middle';
				tempNode.align = 'absmiddle';
				divNode.appendChild(tempNode);
			}
			
			// the button part of the node
			buttonNode = document.createElement('a');
			buttonNode.tabIndex = 1;
			buttonNode.href = "#";
			$e.add(buttonNode,'mouseup',this._clickNode,this);
			buttonNode.className = this._gDef(data[i].labelClassName,this.node.labelClassName);
			buttonNode.id = baseId+'.LABEL';
			buttonNode.unselectable = 'on';
			
			
			// handle branch or leaf
			if(typeof data[i].children == 'object' || typeof data[i].children == 'string'){
				// has children - is branch
				
				if(data[i].children.constructor != Array) data[i].expanded = false;
				
				tempNode = document.createElement('img');
				if(data[i].expanded){
					curIcon = this._gDef(data[i].expandedIcon,this.node.expandedIcon);
					if(i==0 && parentNodeLocs.length == 0) tempNode.src = this._gDef(data[i].expandedImage,this.node.branch.firstExpandedImage);
					else if(isLast) tempNode.src = this._gDef(data[i].expandedImage,this.node.branch.lastExpandedImage);
					else tempNode.src = this._gDef(data[i].expandedImage,this.node.branch.expandedImage);
				} else{
					curIcon = this._gDef(data[i].collapsedIcon,this.node.collapsedIcon);
					if(i==0 && parentNodeLocs.length == 0) tempNode.src = this._gDef(data[i].collapsedImage,this.node.branch.firstCollapsedImage);
					else if(isLast) tempNode.src = this._gDef(data[i].collapsedImage,this.node.branch.lastCollapsedImage);
					else tempNode.src = this._gDef(data[i].collapsedImage,this.node.branch.collapsedImage);
				}
				
				if(this.node.branch.collapsedHoverImage != '' || data[i].collapsedHoverImage != ''){
					$e.add(tempNode,'mouseover',this._nodeImageMouseOver,this);
					$e.add(tempNode,'mouseout',this._nodeImageMouseOut,this);
				}
				
				tempNode.style.verticalAlign = 'middle';
				tempNode.align = 'absmiddle';
				$e.add(tempNode,'mouseup',this._clickToggleBranch,this);
				divNode.appendChild(tempNode);
				
				// interior of button part of node
				
				if(curIcon != ''){
					buttonNode.innerHTML = '<img id="'+baseId+'.LABELICON" src="'+curIcon+'" style="border: none" align="absmiddle" /> '+data[i].html;
				} else{
					buttonNode.innerHTML = data[i].html;
				}
				
				divNode.appendChild(buttonNode);
				
				// do branch
				if(data[i].children.constructor == Array){
					if(parentNodeLocs.length == 0){
						tempNodeLocs = new Array();
						tempLineImages = new Array();
					} else{
						tempNodeLocs = new Array(parentNodeLocs);
						tempLineImages = new Array(parentNodeLineImages);
					}
					tempNodeLocs[tempNodeLocs.length] = i;
					tempLineImages[tempLineImages.length] = $if(isLast,this.branch.nullImage,this.branch.lineImage);
					
					liNode.appendChild(divNode);
					liNode.appendChild(this._generateHTMLNodes(tempNodeLocs,tempLineImages,data[i].children,data[i].expanded,data[i].branchClassName));
				} else liNode.appendChild(divNode);
			} else{
				// no children - is leaf
				tempNode = document.createElement('img');
				if(i==0 && parentNodeLocs.length == 0) tempNode.src = this._gDef(data[i].image,this.node.leaf.firstImage);
				else if(isLast) tempNode.src = this._gDef(data[i].image,this.node.leaf.lastImage);
				else tempNode.src = this._gDef(data[i].image,this.node.leaf.image);
				tempNode.style.verticalAlign = 'middle';
				tempNode.align = 'absmiddle';
				divNode.appendChild(tempNode);
				// interior of button part of node
				curIcon = this._gDef(data[i].icon,this.node.icon);
				if(curIcon != ''){
					buttonNode.innerHTML = '<img id="'+baseId+'.LABELICON" src="'+curIcon+'" style="border: none" align="absmiddle" /> '+data[i].html;
				} else{
					buttonNode.innerHTML = data[i].html;
				}
				divNode.appendChild(buttonNode);
				liNode.appendChild(divNode);
			}
			
			// append node
			ulNode.appendChild(liNode);
		}
		return ulNode;
	},
	_clickToggleBranch: function(e,classInstance){
		var liEle = this.parentNode.parentNode;
		var dataLocArr = String(liEle.getAttribute('AUITreeNodeLocation')).split('.');
		for(var i=0;i<dataLocArr.length;i++) dataLocArr[i] = Number(dataLocArr[i]);
		var dataNode = classInstance.getDataNode(dataLocArr,false);
		classInstance._toggleBranch(dataNode,true);
	},
	_toggleBranch: function(dataNode){
		if(dataNode.children.constructor != Array){
			if(dataNode.dynamicDataHandle.constructor == Function || this.dynamicDataHandle.constructor == Function){
				if(dataNode.dynamicDataHandle.constructor == Function) var resData = dataNode.dynamicDataHandle(dataNode);
				else var resData = this.dynamicDataHandle(dataNode);
				if(resData.constructor == Array){
					this.populateNode(dataNode.location,resData);
					if(dataNode.onExpand.constructor == Function) dataNode.onExpand(dataNode);
					else if(this.onNodeExpand.constructor == Function) this.onNodeExpand(dataNode);
				}
			} else{
				var curValue = this._getDataNodeValue(dataNode);
				var dataURL = '';
				if(typeof dataNode.children == 'object'){
					dataURL = dataNode.children.url;
					if(dataURL == '') dataURL = this.dynamicDataURL;
					if(dataURL != '') new $a.simple(dataNode.children.url,{data: $if(dataNode.children.data,dataNode.children.data+'&','')+'AUITreeNodeLoaction=['+dataNode.location.join(',')+']&AUITreeNodeValue='+curValue, handle: this._responseHandle, handleContext: this})
				} else{
					dataURL = ''+dataNode.children;
					if(dataURL.substr(0,1) == '?') dataURL = this.dynamicDataURL;
					if(dataURL != '') new $a.simple(dataURL,{data: 'AUITreeNodeLoaction=['+dataNode.location.join(',')+']&AUITreeNodeValue='+curValue, handle: this._responseHandle, handleContext: this})
				}
				$(this.contId+'.'+dataNode.location.join('.')+'.LABEL').innerHTML = this.loadingMessage;
			}
			var iNode = $(this.contId+'.'+dataNode.location.join('.')+'.LABEL').previousSibling;
			
			if(arguments[1]){
				if(dataNode.location[dataNode.location.length-1] == 0 && dataNode.location.length == 1) iNode.src = this._gDef(dataNode.expandedHoverImage,this.node.branch.firstExpandedHoverImage,dataNode.expandedImage,this.node.branch.firstExpandedImage);
				else if(dataNode.isLast) iNode.src = this._gDef(dataNode.expandedHoverImage,this.node.branch.lastExpandedHoverImage,dataNode.expandedImage,this.node.branch.lastExpandedImage);
				else iNode.src = this._gDef(dataNode.expandedHoverImage,this.node.branch.expandedHoverImage,dataNode.expandedImage,this.node.branch.expandedImage);
			} else{
				if(dataNode.location[dataNode.location.length-1] == 0 && dataNode.location.length == 1) iNode.src = this._gDef(dataNode.expandedImage,this.node.branch.firstExpandedImage);
				else if(dataNode.isLast) iNode.src = this._gDef(dataNode.expandedImage,this.node.branch.lastExpandedImage);
				else iNode.src = this._gDef(dataNode.expandedImage,this.node.branch.expandedImage);
			}
			
			dataNode.expanded = true;
		} else{
			var iNode = $(this.contId+'.'+dataNode.location.join('.')+'.LABEL').previousSibling;
			var bNode = $(this.contId+'.'+dataNode.location.join('.')).lastChild;
			while(!bNode.tagName){
				bNode = bNode.previousSibling;
			}
			
			if(bNode.style.display == 'none'){
				if(arguments[1]){
					if(dataNode.location[dataNode.location.length-1] == 0 && dataNode.location.length == 1) iNode.src = this._gDef(dataNode.expandedHoverImage,this.node.branch.firstExpandedHoverImage,dataNode.expandedImage,this.node.branch.firstExpandedImage);
					else if(dataNode.isLast) iNode.src = this._gDef(dataNode.expandedHoverImage,this.node.branch.lastExpandedHoverImage,dataNode.expandedImage,this.node.branch.lastExpandedImage);
					else iNode.src = this._gDef(dataNode.expandedHoverImage,this.node.branch.expandedHoverImage,dataNode.expandedImage,this.node.branch.expandedImage);
				} else{
					if(dataNode.location[dataNode.location.length-1] == 0 && dataNode.location.length == 1) iNode.src = this._gDef(dataNode.expandedImage,this.node.branch.firstExpandedImage);
					else if(dataNode.isLast) iNode.src = this._gDef(dataNode.expandedImage,this.node.branch.lastExpandedImage);
					else iNode.src = this._gDef(dataNode.expandedImage,this.node.branch.expandedImage);
				}
				
				var curIcon = this._gDef(dataNode.expandedIcon,this.node.expandedIcon);
				if(curIcon != ''){
					if($(this.contId+'.'+dataNode.location.join('.')+'.LABELICON')){
						$(this.contId+'.'+dataNode.location.join('.')+'.LABELICON').src = curIcon;
					}
				}
					
				bNode.style.display = 'block';
				dataNode.expanded = true;
				if(dataNode.onExpand.constructor == Function) dataNode.onExpand(dataNode);
				else if(this.onNodeExpand.constructor == Function) this.onNodeExpand(dataNode);
			} else{
				if(arguments[1]){
					if(dataNode.location[dataNode.location.length-1] == 0 && dataNode.location.length == 1) iNode.src = this._gDef(dataNode.collapsedHoverImage,this.node.branch.firstCollapsedHoverImage,dataNode.collapsedImage,this.node.branch.firstCollapsedImage);
					else if(dataNode.isLast) iNode.src = this._gDef(dataNode.collapsedHoverImage,this.node.branch.lastCollapsedHoverImage,dataNode.collapsedImage,this.node.branch.lastCollapsedImage);
					else iNode.src = this._gDef(dataNode.collapsedHoverImage,this.node.branch.collapsedHoverImage,dataNode.collapsedImage,this.node.branch.collapsedImage);
				} else{
					if(dataNode.location[dataNode.location.length-1] == 0 && dataNode.location.length == 1) iNode.src = this._gDef(dataNode.collapsedImage,this.node.branch.firstCollapsedImage);
					else if(dataNode.isLast) iNode.src = this._gDef(dataNode.collapsedImage,this.node.branch.lastCollapsedImage);
					else iNode.src = this._gDef(dataNode.collapsedImage,this.node.branch.collapsedImage);
				}
				
				var curIcon = this._gDef(dataNode.collapsedIcon,this.node.collapsedIcon);
				if(curIcon != ''){
					if($(this.contId+'.'+dataNode.location.join('.')+'.LABELICON')){
						$(this.contId+'.'+dataNode.location.join('.')+'.LABELICON').src = curIcon;
					}
				}
				
				bNode.style.display = 'none';
				dataNode.expanded = false;
				
				if(dataNode.onCollapse.constructor == Function) dataNode.onCollapse(dataNode);
				else if(this.onNodeCollapse.constructor == Function) this.onNodeCollapse(dataNode);
			}
		}
	},
	_selectNode: function(dataNode){
		var curValue = [];
		var selClassName = '';
		if(this.multiple && (this._keyWatch.ctrl || this._keyWatch.shift)){
			var addToSel = true;
			for(var i=0;i<this.selection.length;i++){
				if(this.selection[i].location.join('.') == dataNode.location.join('.')){
					selClassName = this._gDef(this.selection[i].selectedClassName,this.node.selectedClassName);
					if(selClassName != '') $rcn($(this.contId+'.'+this.selection[i].location.join('.')).firstChild,selClassName);
					this.selection.splice(i,1);
					addToSel = false;
					break;
				}
			}
			if(addToSel){
				selClassName = this._gDef(dataNode.selectedClassName,this.node.selectedClassName);
				if(selClassName != '') $acn($(this.contId+'.'+dataNode.location.join('.')).firstChild,selClassName);
				this.selection[this.selection.length] = dataNode;
			}
		} else{
			this._deselectAll();
			selClassName = this._gDef(dataNode.selectedClassName,this.node.selectedClassName);
			if(selClassName != '') $acn($(this.contId+'.'+dataNode.location.join('.')).firstChild,selClassName);
			this.selection[0] = dataNode;
		}
		
		for(var i=0;i<this.selection.length;i++){
			curValue[i] = this._getDataNodeValue(this.selection[i])
		}
		this.value = curValue;
		if(this.inputId != '') $(this.inputId).value = curValue.join('\n');
		
		if(dataNode.onSelect.constructor == Function) dataNode.onSelect(dataNode);
		else if(this.onNodeSelect.constructor == Function) this.onNodeSelect(dataNode);
	},
	_deselectAll: function(){
		var oldDataNode = new Object();
		for(var i=0;i<this.selection.length;i++){
			oldDataNode = this.selection[i];
			if(typeof oldDataNode == 'object'){
				selClassName = this._gDef(oldDataNode.selectedClassName,this.node.selectedClassName);
				if(selClassName != '') $rcn($(this.contId+'.'+oldDataNode.location.join('.')).firstChild,selClassName);
				
			}
		}
		this.selection = new Array();
	},
	_nodeImageMouseOver: function(e,classInstance){
		var liEle = this.parentNode.parentNode;
		var dataLocArr = String(liEle.getAttribute('AUITreeNodeLocation')).split('.');
		for(var i=0;i<dataLocArr.length;i++) dataLocArr[i] = Number(dataLocArr[i]);
		var dataNode = classInstance.getDataNode(dataLocArr,false);
		if(dataNode.expanded){
			if(dataNode.location[dataNode.location.length-1]==0 && dataNode.location.length == 1) this.src = classInstance._gDef(dataNode.expandedHoverImage,classInstance.node.branch.firstExpandedHoverImage);
			else if(dataNode.isLast) this.src = classInstance._gDef(dataNode.expandedHoverImage,classInstance.node.branch.lastExpandedHoverImage);
			else this.src = classInstance._gDef(dataNode.expandedHoverImage,classInstance.node.branch.expandedHoverImage);
		} else{
			if(dataNode.location[dataNode.location.length-1]==0 && dataNode.location.length == 1) this.src = classInstance._gDef(dataNode.collapsedHoverImage,classInstance.node.branch.firstCollapsedHoverImage);
			else if(dataNode.isLast) this.src = classInstance._gDef(dataNode.collapsedHoverImage,classInstance.node.branch.lastCollapsedHoverImage);
			else this.src = classInstance._gDef(dataNode.collapsedHoverImage,classInstance.node.branch.collapsedHoverImage);
		}
	},
	_nodeImageMouseOut: function(e,classInstance){
		var liEle = this.parentNode.parentNode;
		var dataLocArr = String(liEle.getAttribute('AUITreeNodeLocation')).split('.');
		for(var i=0;i<dataLocArr.length;i++) dataLocArr[i] = Number(dataLocArr[i]);
		var dataNode = classInstance.getDataNode(dataLocArr,false);
		if(dataNode.expanded){
			if(dataNode.location[dataNode.location.length-1]==0 && dataNode.location.length == 1) this.src = classInstance._gDef(dataNode.expandedImage,classInstance.node.branch.firstExpandedImage);
			else if(dataNode.isLast) this.src = classInstance._gDef(dataNode.expandedImage,classInstance.node.branch.lastExpandedImage);
			else this.src = classInstance._gDef(dataNode.expandedImage,classInstance.node.branch.expandedImage);
		} else{
			if(dataNode.location[dataNode.location.length-1]==0 && dataNode.location.length == 1) this.src = classInstance._gDef(dataNode.collapsedImage,classInstance.node.branch.firstCollapsedImage);
			else if(dataNode.isLast) this.src = classInstance._gDef(dataNode.collapsedImage,classInstance.node.branch.lastCollapsedImage);
			else this.src = classInstance._gDef(dataNode.collapsedImage,classInstance.node.branch.collapsedImage);
		}
	},
	_clickNode: function(e,classInstance){
		$(classInstance.contId+'.FOCUSCATCHER').focus();
		var liEle = this.parentNode.parentNode;
		var dataLocArr = String(liEle.getAttribute('AUITreeNodeLocation')).split('.');
		for(var i=0;i<dataLocArr.length;i++) dataLocArr[i] = Number(dataLocArr[i]);
		var dataNode = classInstance.getDataNode(dataLocArr,false);
		
		classInstance._selectNode(dataNode);
		
		if(dataNode.onClick.constructor == Function) dataNode.onClick(dataNode);
		else if(classInstance.onNodeClick.constructor == Function) classInstance.onNodeClick(dataNode);
	},
	_keyPrevNode: function(){
		var oldDataNode = this.selection[this.selection.length-1];
		if(typeof oldDataNode == 'object'){
			if(oldDataNode.location.join('') != '0'){
				var dataNode = this._getPrevVisDataNode(oldDataNode);
				this._selectNode(dataNode);
				this.scrollToNode(dataNode);
			}
		} else{
			this._selectNode(this.getDataNode([0]));
		}
	},
	_keyNextNode: function(){
		var oldDataNode = this.selection[this.selection.length-1];
		if(typeof oldDataNode == 'object'){
			var dataNode = this._getNextVisDataNode(oldDataNode);
			if(typeof dataNode.location != 'undefined'){
				this._selectNode(dataNode);
				this.scrollToNode(dataNode);
			}
		} else{
			this._selectNode(this.getDataNode([0]));
		}
	},
	_keyBranchNode: function(){
		var oldDataNode = this.selection[this.selection.length-1];
		if(typeof oldDataNode == 'object'){
			if(oldDataNode.expanded == true){
				this._toggleBranch(oldDataNode);
			} else{
				var dataLoc = new Array();
				for(var i=0;i<oldDataNode.location.length-1;i++) dataLoc[i] = oldDataNode.location[i];
				if(dataLoc.length > 0) this._selectNode(this.getDataNode(dataLoc));
			}
		} else{
			this._selectNode(this.getDataNode([0]));
		}
	},
	_keyChildNode: function(){
		var oldDataNode = this.selection[this.selection.length-1];
		if(typeof oldDataNode == 'object'){
			if(oldDataNode.expanded == false && (typeof oldDataNode.children == 'object' || typeof oldDataNode.children == 'string')){
				this._toggleBranch(oldDataNode);
			} else if(typeof oldDataNode.children == 'object' || typeof oldDataNode.children == 'string'){
				var dataNode = this._getNextVisDataNode(oldDataNode);
				if(typeof dataNode.location != 'undefined'){
					this._selectNode(dataNode);
					this.scrollToNode(dataNode);
				}
			}
		} else{
			this._selectNode(this.getDataNode([0]));
		}
	},
	_keyEnter: function(){
		var dataNode = this.selection[this.selection.length-1];
		if(typeof dataNode == 'object'){
			if(typeof dataNode.children == 'object' || typeof dataNode.children == 'string') this._toggleBranch(dataNode);
			else{
				if(dataNode.onClick.constructor == Function) dataNode.onClick(dataNode);
				else if(this.onNodeClick.constructor == Function) this.onNodeClick(dataNode);
			}
		}
	},
	_rClick: function(e,classInstance){
		if(classInstance.onRightClick.constructor == Function){
			classInstance.onRightClick();
			e = $e.getEvent(e);
			$e.stopEvent(e);
			return false;
		}
	},
	_focus: function(e){
		if(this._hasFocus == false){
			this._keyWatch.on();
			this._hasFocus = true;
			$e.add(document.documentElement,'click',this._blur,this,true);
			if(this.focusClassName != '') $acn($(this.contId),this.focusClassName);
			if(this.onFocus.constructor == Function) this.onBlur();
		}
		e = $e.getEvent(e);
		$e.stopEvent(e);
		return false;
	},
	_blur: function(){
		this._hasFocus = false;
		this._keyWatch.off();
		if(this.focusClassName != '') $rcn($(this.contId),this.focusClassName);
		$e.remove(document.documentElement,'click',this._blur);
		if(this.onBlur.constructor == Function) this.onBlur();
	},
	_responseHandle: function(obj){
		var resJSON = eval('('+obj.responseText+')');
		this.populateNode(resJSON.location,resJSON.data);
		
		var dataNode = this.getDataNode(resJSON.location);
		var baseId = this.contId+'.'+resJSON.location.join('.');
		var buttonNode = $(baseId+'.LABEL');
		var curIcon = this._gDef(dataNode.expandedIcon,this.node.expandedIcon);
		if(curIcon != ''){
			buttonNode.innerHTML = '<img id="'+baseId+'.LABELICON" src="'+curIcon+'" style="border: none" align="absmiddle" /> '+dataNode.html;
		} else{
			buttonNode.innerHTML = dataNode.html;
		}
		if(dataNode.onExpand.constructor == Function) dataNode.onExpand(dataNode);
		else if(this.onNodeExpand.constructor == Function) this.onNodeExpand(dataNode);
	},
	_gDef: function(val, dVal){
		for(var i=0;i<arguments.length;i++) if(arguments[i] != '') return arguments[i];
		return '';
	},
	_defaultNode: {
		html: '',
		value: '',
		children: 0,
		className: '',
		selectedClassName: '',
		labelClassName: '',
		branchClassName: '',
		icon: '',
		expandedIcon: '',
		collapsedIcon: '',
		image: '',
		expandedImage: '',
		collapsedImage: '',
		expandedHoverImage: '',
		collapsedHoverImage: '',
		onSelect: 0,
		onClick: 0,
		onExpand: 0,
		onCollapse: 0,
		dynamicDataHandle: 0,
		expanded: false,
		defaultValue: true
	},
	selection: [],
	value: [],
	_hasFocus: false
}

