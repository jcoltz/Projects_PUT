var A5WDialog = Class.create();
A5WDialog.prototype = {
	initialize: function(varName){
		this.bind = varName;
		this.name = '';
		this.contID = '';
		this.partialSubmit = true;
		this.dirty = false;
		this.url = '_AjaxCallBack.a5w';
		this.errors = {
			type: 1,
			contID: '',
			html: 'Error:',
			genericContID: '',
			_ids: new Array()
		}
		this.variables = {
		};
		this.wait = {
			image: '',
			className: '',
			fetchText: 'Fetching Data...',
			saveText: 'Saving Data...',
			show: true
		}
		this.state = {};
	},
	create: function(gridName,contID){
		this.name = gridName;
		this.contID = contID;
		this.wait.obj = document.createElement('div');
		this.wait.obj.style.position = 'absolute';
		this.wait.obj.style.display = 'none';
		this.wait.obj.style.padding = '6px;';
		this.wait.obj.className = this.wait.className;
		document.body.appendChild(this.wait.obj);
		
		for(var prop in this.variables){
			if(this.variables[prop].type == 'calendar') this.variables[prop].initialize();
		}
	},
	populate: function(){
		var varHandler = new Object();
		var obj = new Object();
		for(var i=0;i<arguments.length;i++){
			if(this.variables[arguments[i].name]){
				varHandler = this.variables[arguments[i].name];
				if(varHandler.format.constructor == Function)
					arguments[i].value = varHandler.format(arguments[i].value);
				if(varHandler.type != 'label' && varHandler.type != 'link' && varHandler.type != 'link:image' && varHandler.type != 'image'){
					obj = $n(this.name+'.'+arguments[i].name)
				} else{
					obj = $(this.name+'.'+arguments[i].name)
				}
				// now handle the differnt types of dynamic controls that can be used
				if(varHandler.type == 'input:checkbox:list' || varHandler.type == 'input:radio:list'){
					var contID = this.name+'.'+arguments[i].name+'.DynamicContent';
					this._setLists(varHandler.type,obj,contID,arguments[i].value,varHandler.list,varHandler.stack,varHandler.className,varHandler.inlineStyle,varHandler.changeEvent);
					$sa(obj,'oldValue',arguments[i].value);
				} else if(varHandler.type == 'select:list'){
					this._setLists(varHandler.type,obj,'',arguments[i].value,varHandler.list);
					$sa(obj,'oldValue',arguments[i].value);
				} else if(varHandler.type == 'link'){
					obj.innerHTML = arguments[i].value;
					obj.href = arguments[i].href;
				} else if(varHandler.type == 'link:image'){
					obj.href = arguments[i].href;
					obj.childNodes[0].src = arguments[i].value;
				} else if(varHandler.type == 'image'){
					obj.src = arguments[i].value;
				} else if(varHandler.type == 'calendar'){
					$svs(obj,arguments[i].value);
					$sa(obj,'oldValue',arguments[i].value);
					if(varHandler.populate.constructor == Function)
						varHandler.populate(arguments[i].value);
				} else if(varHandler.type == 'label:dynamic'){
					$svs(obj,arguments[i].value);
					$sa(obj,'oldValue',arguments[i].value);
					$(this.name+'.'+arguments[i].name+'.Dynamic').innerHTML = arguments[i].value;
				} else{
					//if(obj[0])	alert('Hello '+obj[0].name+' '+arguments[i].value)
					$svs(obj,arguments[i].value);
					$sa(obj,'oldValue',arguments[i].value);
				}
			}
		}
	},
	submit: function(){
		var submitContext = typeof arguments[0] != 'undefined' ? arguments[0] : true;
		var controlContext = typeof arguments[1] != 'undefined' ? arguments[1] : '';
		var controlContOnly = typeof arguments[2] != 'undefined' ? arguments[2] : false;
	
		var varHandler = new Object();
		var obj = new Object();
		var tObj = new Object();
		var tArr = new Array();
		if(controlContOnly && controlContext != ''){
			obj = $n(controlContext);
			tObj[controlContext] = [$gvs(obj),$ga(obj[0],'oldValue')];
		} else{
			if(this.partialSubmit == true){
				for(var prop in this.variables){
					varHandler = this.variables[prop];
					if(varHandler.type != 'label' && varHandler.type != 'link' && varHandler.type != 'link:image' && varHandler.type != 'image'){
						obj = $n(this.name+'.'+prop);
						tArr = $gvs(obj);
						if(typeof tArr == 'object'){
							if($ga(obj[0],'oldValue') != tArr.join(','))
								tObj[this.name+'.'+prop] = [tArr,$ga(obj[0],'oldValue')];
						} else{
							if($ga(obj[0],'oldValue') != tArr)
								tObj[this.name+'.'+prop] = [tArr,$ga(obj[0],'oldValue')];
						}
					}
				}
			} else{
				for(var prop in this.variables){
					varHandler = this.variables[prop];
					if(varHandler.type != 'label' && varHandler.type != 'link' && varHandler.type != 'link:image' && varHandler.type != 'image'){
						obj = $n(this.name+'.'+prop);
						tObj[this.name+'.'+prop] = [$gvs(obj),$ga(obj[0],'oldValue')];
					}
				}
			}
		}
		
		var tArr = new Array();
		for(var prop in tObj){
			tArr[tArr.length] = prop+'='+tObj[prop][0]+'|'+tObj[prop][1];
		}
		
		if(tArr.length > 0){
			var submitStr = '_AjaxCallbackCmpType=dialog&_AjaxCallbackCmpName='+this.name+'&_AjaxCallbackCmpAlias='+this.bind+'&'+$if(controlContext!='','_AjaxCallbackControlContext='+controlContext+'&','')+tArr.join('&')+this._genStateInfo()+'&'+Math.random();
			if(submitContext){
				//makeRequest(this.url,'_AjaxCallbackCommand=save&'+submitStr);
				new $a.simple(this.url,{data: '_AjaxCallbackCommand=save&'+submitStr, handleGeneric: true});
				if(this.wait.show) this.showWait(this.wait.saveText);
			} else{
				//makeRequest(this.url,'_AjaxCallbackCommand=dynamicChange&'+submitStr);
				new $a.simple(this.url,{data: '_AjaxCallbackCommand=dynamicChange&'+submitStr, handleGeneric: true});
				if(this.wait.show) this.showWait(this.wait.fetchText);
			}
		}
		
	},
	_setLists: function(type,objs,id,setValues,curValues,stack){
		var newValues = $u.a.compare(setValues,curValues,'>');
		if(id != ''){
			var obj = $(id);
			var name = objs[0].name
		} else{
			var obj = objs[0];
			var name = obj.name;
		}
		var i = 0;
		var clear = $ga(obj,'dynamicContent')
		if(type == 'input:checkbox:list' || type == 'input:radio:list'){
			var className = typeof arguments[6] != 'undefined' ? arguments[6] : '';
			var inlineStyle = typeof arguments[7] != 'undefined' ? arguments[7] : '';
			var changeEvent = arguments[8] ? this.bind+'.submit.call('+this.bind+',false,this.name,true);' : '';
			if(newValues.length == 0 && clear == 'yes'){
				obj.innerHTML = '';
				$sa(obj,'dynamicContent','no')
			} else{
				$sa(obj,'dynamicContent','yes')
				var stackHTML = ' ';
				if(stack)
					stackHTML = '<br />';
				var inptType = 'radio';
				if(type == 'input:checkbox:list')
					inptType = 'checkbox';
				var htmlArr = new Array();
				for(i=0;i<newValues.length;i++){
					htmlArr[i] = stackHTML+'<input type="'+inptType+'" name="'+name+'" class="'+className+'" style="'+inlineStyle+'" onchange="'+this.bind+'.setDirty.call('+this.bind+');'+changeEvent+'" value="'+newValues[i]+'" checked="checked" /> '+newValues[i]+' ';
				}
				obj.innerHTML = htmlArr.join('');
			}
			$svs(objs,setValues);
		} else if(type == 'select:list'){
			if(clear == 'yes'){
				obj.options.length = curValues.length;
			}
			
			if(newValues.length == 0){
				$sa(obj,'dynamicContent','no')
			} else{
				$sa(obj,'dynamicContent','yes')
				for(i=0;i<newValues.length;i++)
					obj.options[obj.options.length] = new Option(newValues[i],newValues[i]);
			}
			$svs(objs,setValues);
		}
	},
	setErrors: function(){
		this.clearErrors();
		this.errors._ids = new Array();
		var idStr = '';
		var obj = new Object();
		var eObj = new Object();
		var varHandler = new Object();
		var errorArr = new Array();
		for(var i=0;i<arguments.length;i++){
			if(this.variables[arguments[i].name]){
				varHandler = this.variables[arguments[i].name];
				if(this.errors.type == 1 || this.errors.type == 2){
					idStr = this.name+'.'+arguments[i].name;
					
					if(this.errors.type == 1){
						eObj = document.createElement('div');
						eObj.innerHTML = this.errors.html+' '+arguments[i].error;
					} else{
						eObj = document.createElement('span');
						eObj.innerHTML = this.errors.html;
						$sa(eObj,'errorText',arguments[i].error);
						$sa(eObj,'errorFloatID',this.errors.contID);
						eObj.onmouseover = this._errorShow;
						eObj.onmouseout = this._errorHide;
					}
					eObj.id = idStr+'.Error';
					eObj.className = 'error';
					
					if(varHandler.type == 'input:radio' || varHandler.type == 'input:checkbox'){
						obj = $n(this.name+'.'+arguments[i].name);
						obj[0].parentNode.appendChild(eObj);
					} else if(varHandler.type == 'input:radio:list' || varHandler.type == 'input:checkbox:list'){
						obj = $n(this.name+'.'+arguments[i].name);
						obj[0].parentNode.parentNode.appendChild(eObj);
					} else{
						obj = $(this.name+'.'+arguments[i].name);
						obj.parentNode.insertBefore(eObj,obj.nextSibling);
						// setting of style has been removed till better nailed down.
						//$ss(obj,{borderStyle: 'solid', borderColor: 'red', borderWidth: '1px', color: 'red'});
					}
					
					this.errors._ids[this.errors._ids.length] = idStr;
				} else if(this.errors.type == 3 || this.errors.contID != ''){
					errorArr.push(arguments[i].error);
				}
			}
		}
		
		if(this.errors.type == 3 && errorArr.length != 0){
			obj = $(this.errors.contID);
			obj.style.display = '';
			obj.innerHTML = errorArr.join('<br />');
		}
		
	},
	clearErrors: function(){
		var obj = new Object();
		if(this.errors.type == 3){
			obj = $(this.errors.contID);
			obj.style.display = 'none';
		} else{
			for(var i=0;i<this.errors._ids.length;i++){
				obj = $(this.errors._ids[i]+'.Error');
				obj.parentNode.removeChild(obj);
				
				/*
					Reseting of style has been removed till better nailed down
					if(varHandler.type != 'input:radio' || varHandler.type != 'input:checkbox' || varHandler.type != 'input:radio:list' || varHandler.type != 'input:checkbox:list'){
					obj = $(this.errors._ids[i]);
					$ss(obj,{borderStyle: '', borderColor: '', borderWidth: '', color: ''});
				}*/
			}
		}
		this.errors._ids = new Array();
		
	},
	_errorShow: function(){
		var obj = $($ga(this,'errorFloatID'));
		$po(obj,this,14,2,0);
		obj.style.display = 'block';
		obj.innerHTML = $ga(this,'errorText');
	},
	_errorHide: function(){
		var obj = $($ga(this,'errorFloatID'));
		obj.style.display = 'none';
	},
	setGenericErrors: function(errorTxt){
		if(this.errors.genericContID != ''){
			if($(this.errors.genericContID)){
				var errObj = $(this.errors.genericContID);
				errObj.style.display = '';
				errObj.innerHTML = errorTxt;
			}
		}
	},
	clearGenericErrors: function(){
		if(this.errors.genericContID != ''){
			if($(this.errors.genericContID))
				$(this.errors.genericContID).style.display = 'none';
		}
	},
	setDirty: function(){
		this.dirty = true;
	},
	clearDirty: function(){
		if(arguments.length == 0){
			this.dirty = false;
			for(var prop in this.variables){
				varHandler = this.variables[prop];
				if(varHandler.type != 'label' && varHandler.type != 'link' && varHandler.type != 'link:image' && varHandler.type != 'image'){
					obj = $n(this.name+'.'+prop);
					tArr = $gvs(obj);
					if(typeof tArr == 'object'){
						$sa(obj[0],'oldValue',tArr.join(','))
					} else{
						$sa(obj[0],'oldValue',tArr)
					}
				}
			}
		} else{
			for(var i=0;i<=arguments.length;i++){
				obj = $n(arguments[i]);
				tArr = $gvs(obj);
				if(typeof tArr == 'object'){
					$sa(obj[0],'oldValue',tArr.join(','))
				} else{
					$sa(obj[0],'oldValue',tArr)
				}
			}
		}
	},
	showWait: function(txt){
		this.wait.obj.innerHTML = '<img src="'+this.wait.image+'" style="vertical-align: middle;" /> '+txt;
		this.wait.obj.style.display = 'block';
		$po(this.wait.obj,$(this.contID),19,0,0);
	},
	hideWait: function(){
		this.wait.obj.style.display = 'none';
	},
	setListChoices: function(varName,valArr){
		var textArr = arguments[2] ? arguments[2] : valArr;
		var varHandler = this.variables[varName];
		if(varHandler != 'undefined'){
			varHandler.list = valArr;
			var i = 0;
			var htmlArr = new Array();
			var htmlStr = '';
			var changeEvent = $if(varHandler.changeEvent,this.bind+'.submit.call('+this.bind+',false,this.name,true);','');
			if(varHandler.type == 'input:checkbox:list' || varHandler.type == 'input:radio:list'){
				var inputType = $u.s.word(varHandler.type,2,':');
				for(i=0;i<valArr.length;i++){
					htmlArr.push('<input type="'+inputType+'" class="'+varHandler.className+'" style="'+varHandler.inlineStyle+'" name="'+this.name+'.'+varName+'" onchange="'+this.bind+'.setDirty.call('+this.bind+');'+changeEvent+'" value="'+valArr[i]+'" />'+textArr[i]);
				}
				htmlStr = varHandler.stack ? htmlArr.join('<br />') : htmlArr.join('');
				$(this.name+'.'+varName+'.InitContent').innerHTML = htmlStr;
			} else if(varHandler.type == 'select:list'){
				for(i=0;i<valArr.length;i++){
					htmlArr.push('<option value="'+valArr[i]+'">'+textArr[i]+'</option>');
				}
				htmlStr = htmlArr.join('');
				$(this.name+'.'+varName).innerHTML = htmlStr;
			}
		}
	},
	_genStateInfo: function(){
		var stateArr = new Array();
		for(var prop in this.state)
			stateArr.push('&'+prop+'='+this.state[prop]);
		return stateArr.join('');
	}
}