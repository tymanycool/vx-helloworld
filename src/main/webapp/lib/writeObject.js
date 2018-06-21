var WIN_32_ACTIVEX_VERSION = 2003009018;					//Windows系统下32位控件版本号
var WIN_64_ACTIVEX_VERSION = 2003009018;					//Windows系统下64位控件版本号
var WIN_PLUGIN_VERSION = 2003009018;						//Windows系统下插件版本号
var MAC_PLUGIN_VERSION = 0;									//Mac系统下插件版本号
var WIN_SETUP_PATH = "lib/setup/PowerEnterHTSEC.exe";			//Windows系统下安装程序下载路径
var MAC_SETUP_PATH = "lib/setup/PowerEnterHTSEC.pkg";			//Mac系统下安装程序下载路径
var LocalObjVersion="";
var isInistall = false;


//安全输入控件
var PassCtrlClsid = "clsid:66905F52-D095-4B0F-8362-DA569E4D1E6C";
var UtilCtrlClsid = "clsid:169C6FD3-9C5B-4D51-B7EA-663E274369A9";
var CtlName = "POWERENTERHTSEC.PowerUtilityXHTSECCtrl.1";

//安全输入插件
var MIME = "application/x-vnd-csii-powerenter-htsec";
var PowerEnterPluginDescription = "PowerEnter Plug-in for HTSEC";

//控件默认属性
function powerConfig(args) {
	var defaults = { 
		"width":150,
		"height":22,
		"maxLength":16,
		"minLength":6,
		"maskChar":"*",
		"backColor":"#FFFFFF",
		"textColor":"#0000FF",
		"caption":"海通证券",
		"borderColor":"#7F9DB9",
		"accepts":"[:graph:]+",
		"softKeyboard":"true"
	};
	for (var p in args)
		if (args[p] != null) defaults[p] = args[p];
	return defaults;
}

function writePluginObject(oid, clsid, cfg) {
	document.write('<object id="' + oid + '" type="' + clsid
		+ '" width="' + cfg.width + '" height="' + cfg.height
		+ '" style="width:' + cfg.width + 'px;height:' + cfg.height + 'px">');
	for (var name in cfg)
		document.write('<param name="' + name + '" value="' + cfg[name] + '">');
	document.write('</object>');
};

function writeObject(oid, clsid, cfg) {	
	document.write('<object id="' + oid + '" classid="' + clsid		
			+ '" width="' + cfg.width + '" height="' + cfg.height  + '">');
	for (var name in cfg)
		document.write('<param name="' + name + '" value="' + cfg[name] + '">');
	document.write('</object>');
};

function getPluginObject(oid, clsid, cfg) {
	var htmlContent = '<object id="' + oid + '" type="' + clsid
		+ '" width="' + cfg.width + '" height="' + cfg.height
		+ '" style="width:' + cfg.width + 'px;height:' + cfg.height + 'px">';
	for (var name in cfg)
		htmlContent += '<param name="' + name + '" value="' + cfg[name] + '">';
	htmlContent += '</object>';

	return htmlContent;
};

function getObject(oid, clsid, cfg) {
	var htmlContent = '<object id="' + oid + '" classid="' + clsid
			+ '" width="' + cfg.width + '" height="' + cfg.height  + '">';
	for (var name in cfg)
		htmlContent += '<param name="' + name + '" value="' + cfg[name] + '">';
	htmlContent += '</object>';

	return htmlContent;
};

function getPassObject(oid, cfg) {
	if (!oid || typeof(oid) != "string") {
		alert("writePassObj Failed: oid are required!");
	} else {
		var tempPassHtml = getPEXSetupUrl(oid);
		if(tempPassHtml == "")
		{
			if (isIE())
			{
				tempPassHtml = getObject(oid, PassCtrlClsid, powerConfig(cfg));
			}
			else
			{
				tempPassHtml = getPluginObject(oid, MIME, powerConfig(cfg));
			}
		}
    return tempPassHtml;
	}
};

function writePassObject(oid, cfg) {
	if (!oid || typeof(oid) != "string") {
		alert("writePassObj Failed: oid are required!");
	} else {
		setPEXSetupUrl(oid);
		if(isInistall)
		{
			if (isIE())
			{
				writeObject(oid, PassCtrlClsid, powerConfig(cfg));
			}
			else
			{
				writePluginObject(oid, MIME, powerConfig(cfg));
			}
		}
	}
};

function writeUtilObject(oid, cfg) {
	if (!oid || typeof(oid) != "string") {
		alert("writePassObj Failed: oid are required!");
	} else {
		if (isIE())
		{
			writeObject(oid, UtilCtrlClsid, powerConfig(cfg));
		}
		else
		{
			writePluginObject(oid, MIME, powerConfig(cfg));
		}
	}
};

function getPassInput(id, ts, spanId, massage) 
{
    try
    {
		var powerobj = document.getElementById(id);	
		powerobj.setTimestamp(ts);
		var nresult = powerobj.verify();
		if(nresult < 0)
		{
			var error;
			if(nresult == -1)
			{
				error = "内容不能为空";
			}
			else if(nresult == -2)
			{
				error = "输入长度不足";
			}
			else if(nresult == -3)
			{
				error = "输入内容不合规";
			}
			else
			{
				error = powerobj.lastError(); 
			}
			// PEGetElement(spanId).innerHTML = massage +error;
			tipShow(massage +error);
			return null;
		}
		
		value = powerobj.getValue();
		if(value=="")
		{
			// PEGetElement(spanId).innerHTML= massage+powerobj.lastError();
			tipShow(massage+powerobj.lastError());
			return null;
		}
		else
		{
			return value;
		}
	}
	catch(e)
	{
		// PEGetElement(spanId).innerHTML= "控件尚未安装，请下载并安装控件！:"+e;
		tipShow("控件尚未安装，请下载并安装控件！:"+e);
	}
	return null;
}

function getMFMInput(id, ts, spanId,massage) 
{
    try 
    {
		var powerobj = document.getElementById(id);	
		powerobj.setTimestamp(ts);
		value = powerobj.getMFM();
		if(value=="")
		{
			PEGetElement(spanId).innerHTML= massage + powerobj.lastError(); 
			return null;
		}
		else
		{
			return value;
		}
	}
	catch(e)
	{
		PEGetElement(spanId).innerHTML= massage + e.message;
	}
	return null;
}

function PEGetElement(id)
{
	return  window.document.getElementById(id);
}

function getPEXSetupUrl(oid)
{
	var DownloadPath = getDownLoadPath();
	var ObjVersion = getObjVersion();
	var tempSetupUrl = "";
	if(isRegisteredPowerEnter()==false){
		if((navigator.platform == "Win32") ||
		   (navigator.platform == "Windows") ||
		   (navigator.platform == "Win64") ||
		   (navigator.platform == "Mac68K") ||
		   (navigator.platform == "MacPPC") ||
		   (navigator.platform == "Macintosh") ||
		   (navigator.platform == "MacIntel")){
			tempSetupUrl = '<a href="'+DownloadPath+'" class="download_install">请点击下载安全控件</a>';
		}else{
			tempSetupUrl = '<a href="#" class="download_install">暂不支持此系统</a>';
		}
	}else{
		var LocalObjVersion = getLocalObjVersion();
		if(LocalObjVersion < ObjVersion){
			tempSetupUrl = '<a href="'+DownloadPath+'" class="download_install">点击此处更新控件</a>';
		}
	}

	return tempSetupUrl;
}

function setPEXSetupUrl(oid)
{
	var DownloadPath = getDownLoadPath();
	var ObjVersion = getObjVersion();
	
	if(isRegisteredPowerEnter()==false){
		if((navigator.platform == "Win32") || 
		   (navigator.platform == "Windows") || 
		   (navigator.platform == "Win64") ||
		   (navigator.platform == "Mac68K") || 
		   (navigator.platform == "MacPPC") || 
		   (navigator.platform == "Macintosh") || 
		   (navigator.platform == "MacIntel")){
			document.write('<a href="'+DownloadPath+'" class="download_install">点击此处下载控件</a>');	
		}else{
			document.write('<a href="#" class="download_install">暂不支持此系统</a>');
		}
		isInistall = false;
	}else{
		var LocalObjVersion = getLocalObjVersion();
		if(LocalObjVersion < ObjVersion){
			document.write('<a href="'+DownloadPath+'" class="download_install">点击此处更新控件</a>');
			isInistall = false;
		} else {
			isInistall = true;
		}
	}
}

function isRegisteredPowerEnter(){
	try{
		if (isIE()){
			new ActiveXObject(CtlName);
		}else{
			var powerEnterPlugin = navigator.plugins[PowerEnterPluginDescription];
			if(powerEnterPlugin == null)
				return false;
		}
	}catch(e){
		return false;   
	}
	return true;
}

function getDownLoadPath()
{
	if((navigator.platform == "Win32") || (navigator.platform == "Windows") || (navigator.platform == "Win64"))
		return WIN_SETUP_PATH;				//Windows
	else if((navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel"))
		return MAC_SETUP_PATH;		    //MAC

	return WIN_SETUP_PATH; 
}

function getObjVersion()
{
    if((navigator.platform == "Win64" || navigator.cpuClass == "x64")){
        if (isIE())
            return WIN_64_ACTIVEX_VERSION;         // Windows系统下64位控件版本
        else
            return WIN_PLUGIN_VERSION;             // Windows系统下插件版本
     }else if((navigator.platform == "Win32") || (navigator.platform == "Windows")){
        if (isIE())
            return WIN_32_ACTIVEX_VERSION;         // Windows系统下32位控件版本
        else
            return WIN_PLUGIN_VERSION;             // Windows系统下插件版本
     }else if((navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel")){
     	return MAC_PLUGIN_VERSION;		  		  // Mac系统下插件版本
     }
     return "";
}

// writeUtilObject("versionObj",{"width":1,"height":1});

function getLocalObjVersion()
{
	if(LocalObjVersion == "")
	{
		try{
			LocalObjVersion = PEGetElement("versionObj").getVersion();
		}catch(e){
			LocalObjVersion = getObjVersion();
		}
	}
	return LocalObjVersion;
}

function isIE()
{
	if (navigator.appName == 'Microsoft Internet Explorer' || navigator.userAgent.indexOf("Trident")>0)
		return true;
	else
		return false;
}

