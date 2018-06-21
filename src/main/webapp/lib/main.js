'use strict';

/* Controllers */

vx.module('ibsapp').controller('AppCtrl', ['$scope', '$localStorage', '$window','$remote', '$FileDownloader',  function($scope, $localStorage, $window, $remote,$FileDownloader) {
	// add 'ie' classes to html
	var isIE = !!navigator.userAgent.match(/MSIE/i);
	isIE && vx.element($window.document.body).addClass('ie');
	isSmartDevice($window) && vx.element($window.document.body).addClass('smart');
	$scope.$functions = vx.getFunctions();
	// config
	$scope.app = {
		name: '管理平台',
		version: 'v1.0.0',
		// for chart colors
		color: {
			primary: '#7266ba',
			info: '#23b7e5',
			success: '#27c24c',
			warning: '#fad733',
			danger: '#f05050',
			light: '#e8eff0',
			dark: '#3a3f51',
			black: '#1c2b36'
		},
		settings: {
			"themeID": "4",
			"navbarHeaderColor": "bg-info",
			"navbarCollapseColor": "bg-white-only",
			"asideColor": "bg-black",
			"headerFixed": true,
			"asideFixed": true,
			"asideFolded": false,
			"asideDock": false,
			"container": false,
			"chat": false
		}
	};
	$scope.optionsHeaderPie = {
		percent: 65,
		lineWidth: 50,
		trackColor: $scope.app.color.light,
		barColor: $scope.app.color.info,
		scaleColor: false,
		size: 100,
		rotate: 90,
		lineCap: 'butt',
		animate: 2000
	};
	
	$scope.CurrRoute = "Home";
	
	// 初始化
	$scope.startUp = function(){
		console.log("main.js");
		$remote.post('loginInfoQuery.do', {}, function(data) {
			if(data) { // 已经登录
				$rootScope.$userInfo = data;
				$rootScope.$menuList = data.menuList;
				$rootScope.$userInfo = data;
				$window.sessionStorage.$userInfo = JSON.stringify(data);
				if($rootScope.$userInfo.staffId == '900001' || $rootScope.$userInfo.staffId == '900002') {
					$rootScope.$userIdentity = "MG";
				} else {
					$rootScope.$userIdentity = "NU";
					var permlist = $rootScope.$userInfo.roleList;
					// 高管视图
					if(!(permlist.indexOf('vizirView') > -1)) {
						$rootScope.MenuList.splice(3, 1);
					}
					var checkList = [{
							"funcId": "ProjectDistribution",
							"permId": "publishSituation",
							"funcName": "项目发行情况"
						},
						{
							"funcId": "ProjectInIssue",
							"permId": "underwaySituation",
							"funcName": "发行中项目"
						},
						{
							"funcId": "SituationProject",
							"permId": "participateSituation",
							"funcName": "项目在会情况"
						},
						{
							"funcId": "ProjectedProject",
							"permId": "establishSituation",
							"funcName": "已立项项目情况"
						},
						{
							"funcId": "FailProject",
							"permId": "revocationSituation",
							"funcName": "撤回和未通过项目情况"
						},
						{
							"funcId": "ReserveProject",
							"permId": "reserveSituation",
							"funcName": "储备项目信息"
						}
					]
					var aperList = [];
					for(var i = 0; i < 6; i++) {
						for(var j = 0; j < permlist.length; j++) {
							if(checkList[i].permId == permlist[j]) {
								aperList.push(checkList[i]);
							}
						}
					}
					var len = aperList.length;
					if(len == 0) {
						$rootScope.MenuList.splice(2, 1);
					} else {
						var fcunList = $rootScope.MenuList[2].children;
						var bperList = [];
						for(var i = 0; i < len; i++) {
							for(var j = 0; j < 6; j++) {
								if(aperList[i].funcId == fcunList[j].ActionId) {
									bperList.push(fcunList[j]);
								}
							}
						}
						$rootScope.MenuList[2].children = bperList;
						$rootScope.MenuList[2].childrenNum = bperList.length;
					}
				}
			} else {
				window.location.href = 'login.html';
			}
		});
	}
	
	// 通讯录
	
	$scope.getContact = function(item) {
		var param = {
			dept: $scope.deptName,
			juniorDept: $scope.juniorDeptName,
			staffName: item
		}
		
		$remote.post('contactListQuery.do', param, function(data) {
		
			$scope.cList = data.list;
			if($scope.cList.length > 0) {
				$scope.perInfo = $scope.cList[0];
			} else {
				$scope.perInfo = false;
			}
		})
	}
	//顶部搜索框
	$rootScope.goTopQuery = function(item){
		$window.sessionStorage.setItem('topQueryPrj',item)
		$scope.goto('trade.topQuery')
	}
	// PM-nav-aside
	$rootScope.pNavLog = $window.sessionStorage.pNavLog ? $window.sessionStorage.pNavLog : "";
	var a = new Object();
	
	if($window.sessionStorage.prjSubPhaseKeyList) {
		a = JSON.parse($window.sessionStorage.prjSubPhaseKeyList);
	} else {
		a = "";
	}
	
	// 获取当前日期
	$scope.getRqDate = function() {
		var item = new Date();
		var yy = item.getFullYear(); //获取完整的年份(4位,1970-????)
		if(item.getMonth() + 1 < 10) {
			var mm = '0' + (item.getMonth() + 1).toString(); //获取当前月份(0-11,0代表1月)
		} else {
			var mm = item.getMonth() + 1;
		}
		if(item.getDate() < 10) {
			var dd = '0' + item.getDate().toString(); //获取当前日(1-31)
		} else {
			var dd = item.getDate(); //获取当前日(1-31)
		}
		var Time = yy.toString() + mm.toString() + dd.toString();
		return Time;
	
	}
	// 获取当前时间
	$scope.getRqTime = function() {
		var item = new Date();
		var hour = item.getHours() < 10 ? "0" + item.getHours() : item.getHours();
		var minute = item.getMinutes() < 10 ? "0" + item.getMinutes() : item.getMinutes();
		var second = item.getSeconds() < 10 ? "0" + item.getSeconds() : item.getSeconds();
		var Time = hour.toString() + minute.toString() + second.toString();
		return Time;
	}
	
	// 文件下载公共方法
	$rootScope.pubDownloadFile = function(second) {
		var formData = {
			channelId: '00',
			'tranDate': $scope.getRqDate(),
			'tranTime': $scope.getRqTime(),
			userId: $scope.$userInfo.staffId,
			id: second.id
		}
		
		var myDownloader = new $FileDownloader();
		myDownloader.download("uploadFileDownload.do", formData, function(data, status, headers) {
			
			var str = JSON.stringify(data);
			if(str.indexOf('errorInfo') > -1){
				$scope.$alert({"content":"文件下载失败"});
			}
		}, function(data, status, headers) {
			
			$scope.alert({
				content: '下载失败请稍后重试'
			});
			return;
		});
	}
	
	$rootScope.prjSubPhaseKeyList = a ? a : "";
	$rootScope.openNacPM = function(item) {
		$scope.setMenuFeedBack(item);
		$rootScope.pNavLog = item;
		$window.sessionStorage.pNavLog = item;
		$scope.navTag = "ProjectContract";
		var pmNavLists = [{
				"Id": 'other',
				"Type": "C05",
				"Name":"其他"
			},
			{
				"Id": 'Bonds',
				"Type": "C04",
				"Name":"债卷"
			},
			{
				"Id": 'MA',
				"Type": "C03",
				"Name":"并购重组"
			},
			{
				"Id": 'Refinancing',
				"Type": "C02",
				"Name":"再融资"
			},
			{
				"Id": 'ipo',
				"Type": "C01",
				"Name":"IPO"
			}
		];
		// 修改项目类型
		for(var i = 0; i < 5; i++) {
			if(pmNavLists[i].Id == item) {
				$window.sessionStorage.phaseNavPrjType = pmNavLists[i].Type;
				var obj = new Object();
				obj.Name = pmNavLists[i].Name;
				obj.Id = "ProjectContract";
				$scope.trackHistorySet(obj,1);
				var objPhase =  new Object();
				obj.Name = "项目承揽";
				obj.Id = "ProjectContract";
				$scope.trackHistorySet(obj,2);
			}
		}
		for(var i = 0; i < 5; i++) {
			if($window.sessionStorage.phaseNavPrjType == $rootScope.prjClassList[i].Id) {
				$rootScope.prjSubPhaseKeyList = $rootScope.prjClassList[i].childrenList;
				var funItem = new Object();
				funItem.Id = "";
				funItem.Name = "全部";
				if(JSON.stringify($rootScope.prjSubPhaseKeyList).indexOf('全部') > -1) {
	
				} else {
					$rootScope.prjSubPhaseKeyList.push(funItem);
				}
				$window.sessionStorage.prjSubPhaseKeyList = JSON.stringify($rootScope.prjSubPhaseKeyList);
			}
		}
		$scope.goto('trade.ProjectContract');
	}
	
	// 记录跳转历史
	$scope.trackHistorySet = function(item,reset){
		
		if(reset == 0){
			var list = [];
			list.push(item);
			$window.sessionStorage.trackHistory = JSON.stringify(list);
		}else{
			if($window.sessionStorage.trackHistory){
				var list = JSON.parse($window.sessionStorage.trackHistory);
				list = list.splice(0,reset);
//				if(!($window.sessionStorage.trackHistory.indexOf(item.Id) > -1)){
					list.push(item);
					$window.sessionStorage.trackHistory = JSON.stringify(list);	
//				}
			}
		}

	}
	
	// user-nav
	$scope.openMenu = function(item) {
		// 导航栏操作关闭通讯录
		if(!$scope.leftCont) {
			$scope.showContact();
		}
		if(item.ActionId == 'AgencyBusiness') {
			
			var obj = new Object();
			obj.Name = "工作平台";
			obj.Id = item.ActionId;
			var list = [];
			list.push(obj);
			$window.sessionStorage.trackHistory = JSON.stringify(list);
		}
	
		if(item.children) {
			if($("#" + item.hasChildren).is(":hidden")) {
				$('#' + item.hasChildren + 'img').css('background', 'url(images/arrowD2.png) no-repeat 0 50%');
				$("#" + item.hasChildren).slideDown();
			} else {
				$('#' + item.hasChildren + 'img').css('background', 'url(images/arrowR1.png) no-repeat 0 50%');
				$("#" + item.hasChildren).slideUp();
			}
		} else {
			$scope.setMenu(item);
		}
	}
	
	$scope.setMenu = function(item) {
		var len = $scope.MenuList.length;
		
		for(var i = 0; i < len; i++) {
			if($scope.MenuList[i].ActionId != item.ActionId) {
				$('#' + $scope.MenuList[i].ActionId).removeClass('act');
				if($scope.MenuList[i].hasChildren) {
					var childrenlen = $scope.MenuList[i].children.length;
					
					for(var j = 0; j < childrenlen; j++) {
						if($scope.MenuList[i].children[j].ActionId === item.ActionId) {
							$scope.CurrRoute = item.ActionId;
							$('#' + item.ActionId).addClass('act');
							var pmNavLists = [{
									"Id": 'other',
									"Type": "C05",
									"Name": "其他"
								},
								{
									"Id": 'Bonds',
									"Type": "C04",
									"Name":"债卷"
								},
								{
									"Id": 'MA',
									"Type": "C03",
									"Name":"并购与重组"
								},
								{
									"Id": 'Refinancing',
									"Type": "C02",
									"Name":"再融资项目"
								},
								{
									"Id": 'ipo',
									"Type": "C01",
									"Name":"IPO"
								}
							];
							
							if(item.ActionId == 'other' || item.ActionId == 'Bonds' || item.ActionId == 'MA' || item.ActionId == 'Refinancing' || item.ActionId == 'ipo') {
								var objm = new Object();
								objm.Name = "工作平台";
								objm.Id = "AgencyBusiness";
								$scope.trackHistorySet(objm,0);		
								for(var m=0;m<5;m++){
									if(item.ActionId == pmNavLists[m].Id){
										$window.sessionStorage.navTag = "ProjectContract";
										var objt = new Object();
										objt.Id = "ProjectContract";
										objt.Name = pmNavLists[m].Name;
										$scope.trackHistorySet(objt,1);	
									}
								}
								var objb = new Object();
								objb.Id = "ProjectContract";
								objb.Name = "项目承揽";
								$scope.trackHistorySet(objb,2);
								$scope.openNacPM(item.ActionId);
								
							} else {
								$scope.goto('trade.' + item.ActionId);
							}
						} else {
							$('#' + $scope.MenuList[i].children[j].ActionId).removeClass('act');
						}
					}
				}
			} else {
				$scope.CurrRoute = item.ActionId;
				$('#' + item.ActionId).addClass('act');
				$scope.goto('trade.' + item.ActionId);
			}
		}
	}
	// 内部菜单反馈主菜单
	$scope.setMenuFeedBack = function(item) {
		var len = $scope.MenuList.length;
		console.log(item)
		console.log($scope.MenuList);
		for(var i = 0; i < len; i++) {
			if($scope.MenuList[i].ActionId != item) {
				$('#' + $scope.MenuList[i].ActionId).removeClass('act');
				if($scope.MenuList[i].hasChildren) {
					var childrenlen = $scope.MenuList[i].children.length;
					for(var j = 0; j < childrenlen; j++) {
						if($scope.MenuList[i].children[j].ActionId === item) {
							console.log(item)
							$('#' + item).addClass('act');
						} else {
							$('#' + $scope.MenuList[i].children[j].ActionId).removeClass('act');
						}
					}
				}
			} else {
				$('#' + item).addClass('act');
			}
		}
	}
	
	//  manager-nav
	$scope.openManMenu = function(item) {
		if(item.children) {
			if($("#" + item.hasChildren).is(":hidden")) {
				$('#' + item.hasChildren + 'img').css('background', 'url(images/arrowD2.png) no-repeat 0 50%');
				$("#" + item.hasChildren).slideDown();
			} else {
				$('#' + item.hasChildren + 'img').css('background', 'url(images/arrowR1.png) no-repeat 0 50%');
				$("#" + item.hasChildren).slideUp();
			}
		} else {
			$scope.setManMenu(item);
		}
	}
	$scope.setManMenu = function(item) {
		var len = $scope.ManMenuList.length;
		for(var i = 0; i < len; i++) {
			if($scope.ManMenuList[i].ActionId != item.ActionId) {
				$('#' + $scope.ManMenuList[i].ActionId).removeClass('act');
				if($scope.ManMenuList[i].hasChildren) {
					var lenS = $scope.ManMenuList[i].children.length;
					for(var j = 0; j < lenS; j++) {
						if($scope.ManMenuList[i].children[j].ActionId === item.ActionId) {
							$scope.CurrRoute = item.ActionId;
							$('#' + item.ActionId).addClass('act');
							$scope.goto('trade.' + item.ActionId);
						} else {
							$('#' + $scope.ManMenuList[i].children[j].ActionId).removeClass('act');
						}
					}
				}
			} else {
				$scope.CurrRoute = item.ActionId;
				$('#' + item.ActionId).addClass('act');
				$scope.goto('trade.' + item.ActionId);
			}
		}
	}
	
	$scope.openSetting = function() {
		$('.setMenuAbs').slideToggle('fast');
	}
	$scope.goSysMng = function() {
		$('.setMenu').slideToggle('fast');
		$scope.goto('trade.SysMng');
	}
	$scope.goContactMng = function() {
		$('.setMenu').slideToggle('fast');
		$scope.goto('trade.ContactMng');
	}
	$scope.goUserInfo = function() {
		$('.setMenu').slideToggle('fast');
		$scope.goto('trade.UserInfo');
	}
	
	/* Contact Show or not */
	//$window.sessionStorage.contactShow = false;
	// 导航左侧弹出
	$scope.leftCont = true;
	
	$rootScope.showContact = function() {
	
		if($scope.leftCont) {
			$('.contBox').addClass('f3right');
			$('.sideMenu').addClass('f2right');
			$('.sideMenu').addClass('fadeInLeft');
			$('#contactOp').removeClass('none');
			$('#contactList').removeClass('none');
			$scope.leftCont = false;
			$scope.getContact();
			//查询部门等级
			$scope.deptAllQuery();
		} else {
			$('.contBox').removeClass('f3right');
			$('.sideMenu').removeClass('f2right');
			$('.sideMenu').removeClass('fadeInLeft');
			$('#contactOp').addClass('none');
			$('#contactList').addClass('none');
			$scope.leftCont = true;
		}
	}
	
	// 
	$scope.showInfo = function() {
		if($('#userInfo').hasClass('none')) {
			$('#userInfo').addClass('bounceInDown');
			$('#userInfo').removeClass('none');
			$('#userInfo').removeClass('bounceOutDown');
		} else {
			$('#userInfo').addClass('bounceOutDown');
			$('#userInfo').removeClass('bounceInDown');
			$('#userInfo').addClass('none');
		}
	
	}
	//展示员工信息
	$scope.setPerInfo = function(row) {
		$scope.perInfo = row;
	}
	
	//查询部门层级结构
	$scope.deptAllQuery = function() {
		var formData = {};
		$remote.post("deptAllQuery.do", formData, function(data) {
			$scope.deptList = data;
		})
	}
	
	//重置查询条件
	$scope.resetQuery = function() {
		$scope.deptName = '';
		$scope.juniorDeptName = '';
		$scope.getContact();
	}
	
	//设置一级部门
	$scope.setDeptName = function(deptName) {
		$scope.deptName = deptName;
		$scope.juniorDeptName = "";
		if($("#" + deptName).is(":hidden")) {
			// $('#' + deptName + 'img').css('background', 'url(images/arrowD2.png) no-repeat 0 50%');
			$("#" + deptName).slideDown();
		} else {
			// $('#' + deptName + 'img').css('background', 'url(images/arrowR1.png) no-repeat 0 50%');
			$("#" + deptName).slideUp();
		}
		$scope.getContact()
	}
	
	//设置二级部门
	$scope.setJuniorDeptName = function(deptName, juniorDeptName) {
		$scope.deptName = deptName;
		$scope.juniorDeptName = juniorDeptName;
		$scope.getContact();
	}
	
	// 
	$scope.goIndex = function() {
		$scope.openMenu($scope.MenuList[0]);
	}
	
	// pm-abs-nav-top
	$rootScope.goFuncItem = function(item) {
		$scope.goto('trade.' + item);
	}
	
	// pm-abs-nav-left
	$scope.navTag = $window.sessionStorage.navTag ? $window.sessionStorage.navTag : "";
	$scope.goProMng = function(item) {
	
		if(item == 'InfoPub') {
			$window.sessionStorage.navTitle = "";
		}
		$scope.goto('trade.' + item);
		var len = $scope.prjPhaseNavList.length;
		for(var i = 0; i < len; i++) {
			if(item == $scope.prjPhaseNavList[i].Id) {
				$window.sessionStorage.navTag = item;
				$scope.navTag = item;
				
				var obj = new Object();
				obj = $scope.prjPhaseNavList[i];
				$scope.trackHistorySet(obj,2);
			}
		}
	}
	
	/**logout **/
	$scope.logout = function() {
		$remote.post("logout.do", {}, function(data) {
			if(data.header.retCode == '000000') {
				$scope.$root.$userInfo = undefined;
				window.location.href = "login.html";
			}
		});
	};
	
	// save settings to local storage
	if(vx.isDefined($localStorage.settings)) {
		$scope.app.settings = $localStorage.settings;
	} else {
		$localStorage.settings = $scope.app.settings;
	}
	$scope.$watch('app.settings', function() {
		if($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
			// aside dock and fixed must set the header fixed.
			$scope.app.settings.headerFixed = true;
		}
		// save to local storage
		$localStorage.settings = $scope.app.settings;
	}, true);
	
	// angular translate
	$scope.lang = {
		isopen: false
	};
	$scope.langs = {
		zh_CN: '中文',
		en: 'English'
	}; //, de_DE:'German', it_IT:'Italian'
	$scope.setLang = function(langKey, $event) {
		// set the current lang
		$scope.selectLang = $scope.langs[langKey];
		// You can change the language during runtime
		$scope.lang.isopen = !$scope.lang.isopen;
	};
	
	function isSmartDevice($window) {
		// Adapted from http://www.detectmobilebrowsers.com
		var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
		// Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
		return(/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
	}
	
	function tabsC(tabTit, tabCon, on) {
		var _on = $(tabTit).find('.' + on);
		var _i = $(tabTit).children().index(_on[0]);
		$(tabCon).each(function() {
			$(this).children().eq(_i).show();
		});
		$(tabTit).children().click(function() {
			$(this).addClass(on).siblings().removeClass(on);
			var index = $(tabTit).children().index(this);
			$(tabCon).children().eq(index).show().siblings().hide();
		});
	}
	tabsC('.sw1', '.tabCon1', 'on');
	tabsC('.sw2', '.tabCon2', 'on');
	tabsC('.sw3', '.tabCon3', 'on');
	tabsC('.sw4', '.tabCon4', 'on');
	tabsC('.sHead', '.tabCon5', 'on');
	
	$('.tab1 tbody tr:odd').addClass('bgTab');
	$('.tab2 tbody tr:odd').addClass('bgTab');
	$('.showMenu').click(function(e) {
		e.stopPropagation();
		$('.setMenu').slideToggle('fast');
	});
	
	$('.btnChange').click(function() {
		$('.mask').fadeIn('fast');
		$('.changeBox').fadeIn('fast');
	});
	$('.changeBox .cancel').click(function() {
		$('.changeBox').fadeOut('fast');
		$('.mask').fadeOut('fast');
	});


	// 项目阶段导航
	$scope.prjPhaseNavList = [
		{"Id":"ProjectContract","Name":"项目承揽"},
		{"Id":"ProjectApproval","Name":"项目立项"},
		{"Id":"ProjectCounseling","Name":"项目辅导"},
		{"Id":"ProjectAppReview","Name":"项目申报评审"},
		{"Id":"InternalReview","Name":"内核"},
		{"Id":"CommissionReview","Name":"证监会审核"},
		{"Id":"ProjectRelease","Name":"发布上市"},
		{"Id":"ContinuousSupervision","Name":"持续督导"},
		{"Id":"ProImp","Name":"实施"}
	]

	// AbsFuncLists

	// 项目承揽
	$rootScope.AbsFuncList1 = [
		{"FuncName": "项目信息","FuncId":"ConSupAbs","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"MaterialReported","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"ProjectOperationDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"ProjectTeamMembers","Log":"icon4"},
		{"FuncName": "项目阶段配置","FuncId":"ProTeaSetUp","Log":"icon1"}
	]
	// 项目立项
	$rootScope.AbsFuncList2 = [
		{"FuncName": "立项申请信息","FuncId":"ProAprInfo","Log":"icon1"},
		{"FuncName": "项目信息","FuncId":"ConSupAbs","Log":"icon2"},
		{"FuncName": "材料上报","FuncId":"MaterialReported","Log":"icon3"},
		{"FuncName": "项目运行图","FuncId":"ProjectOperationDiagram","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"SignComments","Log":"icon1"},
		{"FuncName": "项目组成员","FuncId":"ProjectTeamMembers","Log":"icon2"},
		{"FuncName": "项目阶段配置","FuncId":"ProTeaSetUp","Log":"icon3"}
	]
	// 项目辅导
	$rootScope.AbsFuncList3 = [
		{"FuncName": "项目信息","FuncId":"ConSupAbs","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"MaterialReported","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"ProjectOperationDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"ProjectTeamMembers","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"SignComments","Log":"icon1"}
	]
	// 项目申报评审
	$rootScope.AbsFuncList4 = [
		{"FuncName": "申报评审信息","FuncId":"ProAppRevInfo","Log":"icon1"},
		{"FuncName": "项目信息","FuncId":"ConSupAbs","Log":"icon2"},
		{"FuncName": "材料上报","FuncId":"MaterialReported","Log":"icon3"},
		{"FuncName": "项目运行图","FuncId":"ProjectOperationDiagram","Log":"icon4"},
		{"FuncName": "项目组成员","FuncId":"ProjectTeamMembers","Log":"icon1"},
		{"FuncName": "查看签署意见","FuncId":"SignComments","Log":"icon2"},
		{"FuncName": "项目阶段配置","FuncId":"ProTeaSetUp","Log":"icon3"}
	]
	// 内核
	$rootScope.AbsFuncList5 = [
		{"FuncName": "内核申请信息","FuncId":"IntRevInfo","Log":"icon1"},
		{"FuncName": "项目信息","FuncId":"ConSupAbs","Log":"icon2"},
		{"FuncName": "材料上报","FuncId":"MaterialReported","Log":"icon3"},
		{"FuncName": "项目运行图","FuncId":"ProjectOperationDiagram","Log":"icon4"},
		{"FuncName": "项目组成员","FuncId":"ProjectTeamMembers","Log":"icon1"},
		{"FuncName": "查看签署意见","FuncId":"SignComments","Log":"icon2"},
//		{"FuncName": "审批跟踪","FuncId":"ApprovalTracking"},
		{"FuncName": "项目阶段配置","FuncId":"ProTeaSetUp","Log":"icon3"}
	]
	// 证监会审核
	$rootScope.AbsFuncList6 = [
		{"FuncName": "项目信息","FuncId":"ConSupAbs","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"MaterialReported","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"ProjectOperationDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"ProjectTeamMembers","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"SignComments","Log":"icon1"},
		{"FuncName": "项目阶段配置","FuncId":"ProTeaSetUp","Log":"icon2"}
		
	]
	// 发布上市
	$rootScope.AbsFuncList7 = [
		{"FuncName": "项目信息","FuncId":"ConSupAbs","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"MaterialReported","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"ProjectOperationDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"ProjectTeamMembers","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"SignComments","Log":"icon1"},
		{"FuncName": "证监会反馈记录","FuncId":"ComRevList","Log":"icon2"}
	]
	// 持续督导
	$rootScope.AbsFuncList8 = [
		{"FuncName": "项目信息","FuncId":"ConSupAbs","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"MaterialReported","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"ProjectOperationDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"ProjectTeamMembers","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"SignComments","Log":"icon1"},
		{"FuncName": "证监会反馈记录","FuncId":"ComRevList","Log":"icon2"}
	]
	
	$rootScope.AllAbsFuncList = [$rootScope.AbsFuncList1,$rootScope.AbsFuncList2,$rootScope.AbsFuncList3,$rootScope.AbsFuncList4,$rootScope.AbsFuncList5,$rootScope.AbsFuncList6,$rootScope.AbsFuncList7,$rootScope.AbsFuncList8]
	
	//高风险项目
	//项目承揽
	$rootScope.RiskFuncList1=[
		{"FuncName": "项目信息","FuncId":"ProjectMsg","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"MaterialReport","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"ProOperDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"ProTeamMembers","Log":"icon4"},
		{"FuncName": "项目阶段配置","FuncId":"ProPhaseConfig","Log":"icon1"}
	]
	//项目立项
	$rootScope.RiskFuncList2=[
	 	{"FuncName": "立项申请信息","FuncId":"ProApplInfo","Log":"icon1"},
		{"FuncName": "项目信息","FuncId":"ProjectMsg","Log":"icon2"},
		{"FuncName": "材料上报","FuncId":"MaterialReport","Log":"icon3"},
		{"FuncName": "项目运行图","FuncId":"ProOperDiagram","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"ViewSigning","Log":"icon1"},
//		{"FuncName": "审批跟踪","FuncId":"TrackingApproval"},
		{"FuncName": "项目组成员","FuncId":"ProTeamMembers","Log":"icon2"},
		{"FuncName": "项目阶段配置","FuncId":"ProPhaseConfig","Log":"icon3"}
	]
	//项目辅导
	$rootScope.RiskFuncList3=[
		{"FuncName": "项目信息","FuncId":"ProjectMsg","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"MaterialReport","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"ProOperDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"ProTeamMembers","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"ViewSigning","Log":"icon1"}
	]
	//项目申报评审
	$rootScope.RiskFuncList4=[
		{"FuncName": "申报评审信息","FuncId":"DeclarationInfo","Log":"icon1"},
		{"FuncName": "项目信息","FuncId":"ProjectMsg","Log":"icon2"},
		{"FuncName": "材料上报","FuncId":"MaterialReport","Log":"icon3"},
		{"FuncName": "项目运行图","FuncId":"ProOperDiagram","Log":"icon4"},
		{"FuncName": "项目组成员","FuncId":"ProTeamMembers","Log":"icon1"},
		{"FuncName": "查看签署意见","FuncId":"ViewSigning","Log":"icon2"},
//		{"FuncName": "审批跟踪","FuncId":"TrackingApproval"},
		{"FuncName": "项目阶段配置","FuncId":"ProPhaseConfig","Log":"icon3"}
	]
	//内核
	$rootScope.RiskFuncList5=[
		{"FuncName": "内核申请信息","FuncId":"KernelApplInfo","Log":"icon1"},
		{"FuncName": "项目信息","FuncId":"ProjectMsg","Log":"icon2"},
		{"FuncName": "材料上报","FuncId":"MaterialReport","Log":"icon3"},
		{"FuncName": "项目运行图","FuncId":"ProOperDiagram","Log":"icon4"},
		{"FuncName": "项目组成员","FuncId":"ProTeamMembers","Log":"icon1"},
		{"FuncName": "查看签署意见","FuncId":"ViewSigning","Log":"icon2"},
//		{"FuncName": "审批跟踪","FuncId":"TrackingApproval"},
		{"FuncName": "项目阶段配置","FuncId":"ProPhaseConfig","Log":"icon3"}
	]
	//证监会审核
	$rootScope.RiskFuncList6=[
		{"FuncName": "项目信息","FuncId":"ProjectMsg","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"MaterialReport","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"ProOperDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"ProTeamMembers","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"ViewSigning","Log":"icon1"},
		{"FuncName": "项目阶段配置","FuncId":"ProPhaseConfig","Log":"icon2"},
		{"FuncName": "证监会反馈记录","FuncId":"SFCFeedbackRecord","Log":"icon3"}
	]
	//发布上市
	$rootScope.RiskFuncList7=[
		{"FuncName": "项目信息","FuncId":"ProjectMsg","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"MaterialReport","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"ProOperDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"ProTeamMembers","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"ViewSigning","Log":"icon1"},
		{"FuncName": "证监会反馈记录","FuncId":"SFCFeedbackRecord","Log":"icon2"}
	]
	//持续督导
	$rootScope.RiskFuncList8=[
		{"FuncName": "项目信息","FuncId":"ProjectMsg","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"MaterialReport","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"ProOperDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"ProTeamMembers","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"ViewSigning","Log":"icon1"},
		{"FuncName": "证监会反馈记录","FuncId":"SFCFeedbackRecord","Log":"icon2"}
	]
	$rootScope.AllRiskFuncList = [$rootScope.RiskFuncList1,$rootScope.RiskFuncList2,$rootScope.RiskFuncList3,$rootScope.RiskFuncList4,$rootScope.RiskFuncList5,$rootScope.RiskFuncList6,$rootScope.RiskFuncList7,$rootScope.RiskFuncList8]
	
	//完成项目、终止项目
	//项目承揽
	$rootScope.FtFuncList1=[
		{"FuncName": "项目信息","FuncId":"FtProjectMsg","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"FtMaterialReport","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"FtProOperDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"FtProTeamMembers","Log":"icon4"},
		{"FuncName": "项目阶段配置","FuncId":"FtProPhaseConfig","Log":"icon1"},
		{"FuncName": "入库记录","FuncId":"StaChangeList","Log":"icon2"}
	]
	//项目立项
	$rootScope.FtFuncList2=[
	 	{"FuncName": "立项申请信息","FuncId":"FtProApplInfo","Log":"icon1"},
		{"FuncName": "项目信息","FuncId":"FtProjectMsg","Log":"icon2"},
		{"FuncName": "材料上报","FuncId":"FtMaterialReport","Log":"icon3"},
		{"FuncName": "项目运行图","FuncId":"FtProOperDiagram","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"FtViewSigning","Log":"icon1"},
//		{"FuncName": "审批跟踪","FuncId":"FtTrackingApproval"},
		{"FuncName": "项目组成员","FuncId":"FtProTeamMembers","Log":"icon2"},
		{"FuncName": "项目阶段配置","FuncId":"FtProPhaseConfig","Log":"icon3"},
		{"FuncName": "入库记录","FuncId":"StaChangeList","Log":"icon4"}
	]
	//项目辅导
	$rootScope.FtFuncList3=[
		{"FuncName": "项目信息","FuncId":"FtProjectMsg","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"FtMaterialReport","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"FtProOperDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"FtProTeamMembers","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"FtViewSigning","Log":"icon1"},
		{"FuncName": "入库记录","FuncId":"StaChangeList","Log":"icon2"}
	]
	//项目申报评审
	$rootScope.FtFuncList4=[
		{"FuncName": "申报评审信息","FuncId":"FtDeclarationInfo","Log":"icon1"},
		{"FuncName": "项目信息","FuncId":"FtProjectMsg","Log":"icon2"},
		{"FuncName": "材料上报","FuncId":"FtMaterialReport","Log":"icon3"},
		{"FuncName": "项目运行图","FuncId":"FtProOperDiagram","Log":"icon4"},
		{"FuncName": "项目组成员","FuncId":"FtProTeamMembers","Log":"icon1"},
		{"FuncName": "查看签署意见","FuncId":"FtViewSigning","Log":"icon2"},
//		{"FuncName": "审批跟踪","FuncId":"FtTrackingApproval"},
		{"FuncName": "项目阶段配置","FuncId":"FtProPhaseConfig","Log":"icon3"},
		{"FuncName": "入库记录","FuncId":"StaChangeList","Log":"icon4"}
	]
	//内核
	$rootScope.FtFuncList5=[
		{"FuncName": "内核申请信息","FuncId":"FtKernelApplInfo","Log":"icon1"},
		{"FuncName": "项目信息","FuncId":"FtProjectMsg","Log":"icon2"},
		{"FuncName": "材料上报","FuncId":"FtMaterialReport","Log":"icon3"},
		{"FuncName": "项目运行图","FuncId":"FtProOperDiagram","Log":"icon4"},
		{"FuncName": "项目组成员","FuncId":"FtProTeamMembers","Log":"icon1"},
		{"FuncName": "查看签署意见","FuncId":"FtViewSigning","Log":"icon2"},
//		{"FuncName": "审批跟踪","FuncId":"FtTrackingApproval"},
		{"FuncName": "项目阶段配置","FuncId":"FtProPhaseConfig","Log":"icon3"},
		{"FuncName": "入库记录","FuncId":"StaChangeList","Log":"icon4"}
	]
	//证监会审核
	$rootScope.FtFuncList6=[
		{"FuncName": "项目信息","FuncId":"FtProjectMsg","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"FtMaterialReport","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"FtProOperDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"FtProTeamMembers","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"FtViewSigning","Log":"icon1"},
		{"FuncName": "项目阶段配置","FuncId":"FtProPhaseConfig","Log":"icon2"},
		{"FuncName": "入库记录","FuncId":"StaChangeList","Log":"icon3"}
	]
	//发布上市
	$rootScope.FtFuncList7=[
		{"FuncName": "项目信息","FuncId":"FtProjectMsg","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"FtMaterialReport","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"FtProOperDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"FtProTeamMembers","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"FtViewSigning","Log":"icon5"},
		{"FuncName": "证监会反馈记录","FuncId":"FtSFCFeedbackRecord","Log":"icon1"},
		{"FuncName": "入库记录","FuncId":"StaChangeList","Log":"icon2"}
	]
	//持续督导
	$rootScope.FtFuncList8=[
		{"FuncName": "项目信息","FuncId":"FtProjectMsg","Log":"icon1"},
		{"FuncName": "材料上报","FuncId":"FtMaterialReport","Log":"icon2"},
		{"FuncName": "项目运行图","FuncId":"FtProOperDiagram","Log":"icon3"},
		{"FuncName": "项目组成员","FuncId":"FtProTeamMembers","Log":"icon4"},
		{"FuncName": "查看签署意见","FuncId":"FtViewSigning","Log":"icon1"},
		{"FuncName": "证监会反馈记录","FuncId":"FtSFCFeedbackRecord","Log":"icon2"},
		{"FuncName": "入库记录","FuncId":"StaChangeList","Log":"icon3"}
	]
	$rootScope.AllFtFuncList = [$rootScope.FtFuncList1,$rootScope.FtFuncList2,$rootScope.FtFuncList3,$rootScope.FtFuncList4,$rootScope.FtFuncList5,$rootScope.FtFuncList6,$rootScope.FtFuncList7,$rootScope.FtFuncList8]
	
	// 项目阶段
	$rootScope.prjPhaseList = [
		{"Id":"C","Name":"项目承揽"},
		{"Id":"L","Name":"项目立项"},
		{"Id":"F","Name":"项目辅导"},
		{"Id":"S","Name":"项目申报评审"},
		{"Id":"N","Name":"内核"},
		{"Id":"Z","Name":"证监会审核"},
		{"Id":"X","Name":"发行上市"},
		{"Id":"J","Name":"持续监导"},
		{"Id":"H","Name":"实施"}
	]
	
	// 项目子阶段
	$rootScope.prjSubPhaseList = [
		{"Id":"A01","Name":"已保存"},
		{"Id":"A02","Name":"承揽"},
		{"Id":"A03","Name":"储备"},
		{"Id":"A04","Name":"申请立项"},
		{"Id":"A05","Name":"已立项"},
		{"Id":"A06","Name":"辅导"},
		{"Id":"A07","Name":"申请申报评审"},
		{"Id":"A08","Name":"申报评审通过"},
		{"Id":"A09","Name":"申请内核"},
		{"Id":"A10","Name":"内核通过"},
		{"Id":"A11","Name":"接收"},
		{"Id":"A12","Name":"受理"},
		{"Id":"A13","Name":"首次预披露"},
		{"Id":"A14","Name":"反馈"},
		{"Id":"A15","Name":"反馈回复"},
		{"Id":"A16","Name":"中止"},
		{"Id":"A17","Name":"恢复"},
		{"Id":"A18","Name":"撤回"},
		{"Id":"A19","Name":"反馈意见挂网"},
		{"Id":"A20","Name":"二次预披露"},
		{"Id":"A21","Name":"报送上会稿"},
		{"Id":"A22","Name":"初审会"},
		{"Id":"A23","Name":"收到告知函"},
		{"Id":"A24","Name":"告知函回复"},
		{"Id":"A25","Name":"暂缓表决"},
		{"Id":"A26","Name":"取消审核"},
		{"Id":"A27","Name":"过会"},
		{"Id":"A28","Name":"未通过"},
		{"Id":"A29","Name":"批文"},
		{"Id":"A30","Name":"批文失效"},
		{"Id":"A31","Name":"已挂牌"},
		{"Id":"A32","Name":"实施"},
		{"Id":"A33","Name":"持续督导"}
	]
	
	// 项目状态
	$rootScope.prjStaList = [
		{"Id":"","Name":"全部"},
		{"Id":"S00","Name":"正常"},
		{"Id":"S02","Name":"终止"},
		{"Id":"S03","Name":"完成"},
		{"Id":"S04","Name":"高风险"}
	]
	// 项目分类
	$rootScope.prjClassList = [
		{"Id":"C01","Name":"IPO","childrenList":[{"Id":"P01","Name":"IPO"}]},
		{"Id":"C02","Name":"再融资","childrenList":[{"Id":"P02","Name":"非公开"},{"Id":"P03","Name":"公开增发"},{"Id":"P04","Name":"可转债"},{"Id":"P05","Name":"配股"}]},
		{"Id":"C03","Name":"并购重组","childrenList":[{"Id":"P06","Name":"重组"},{"Id":"P07","Name":"借壳类重组"}]},
		{"Id":"C04","Name":"债券","childrenList":[{"Id":"P08","Name":"公司债券"},{"Id":"P09","Name":"金融债"}]},
		{"Id":"C05","Name":"其他","childrenList":[{"Id":"P11","Name":"恢复上市"},{"Id":"P10","Name":"一般财务顾问"},{"Id":"P12","Name":"收购"}]}
	]
	// 项目类型
	$rootScope.prjTypeList = [
		
		{"Id":"P01", "Name": "IPO"},
		{"Id":"P02", "Name": "非公开"},
		{"Id":"P03", "Name": "公开增发"},
		{"Id":"P04", "Name": "可转债"},
		{"Id":"P05", "Name": "配股"},
		{"Id":"P06", "Name": "重组"},
		{"Id":"P07", "Name": "借壳类重组"},
		{"Id":"P08", "Name": "公司债券"},
		{"Id":"P09", "Name": "金融债"},
		{"Id":"P10", "Name": "一般财务顾问"},
		{"Id":"P11", "Name": "恢复上市"},
		{"Id":"P12", "Name": "收购"}
	]
	
	// 项目流程
	$rootScope.prjFlowList = [
		{"Id":"C","Name":"项目承揽"},
		{"Id":"D","Name":"尽职调查"},
		{"Id":"L","Name":"项目立项"},
		{"Id":"F","Name":"项目辅导"},
		{"Id":"S","Name":"项目申报评审"},
		{"Id":"N","Name":"内核"},
		{"Id":"Z","Name":"证监会审核"},
		{"Id":"X","Name":"发行上市"},
		{"Id":"J","Name":"持续监导"},
		{"Id":"H","Name":"实施"}
	]

	// 项目主阶段

	$rootScope.mainPhaseList = [
		{"Id":"C","Name":"项目承揽"},
		{"Id":"D","Name":"尽职调查"},
		{"Id":"L","Name":"项目立项"},
		{"Id":"F","Name":"项目辅导"},
		{"Id":"S","Name":"项目申报评审"},
		{"Id":"N","Name":"内核"},
		{"Id":"Z","Name":"证监会审核"},
		{"Id":"X","Name":"发行上市"},
		{"Id":"J","Name":"持续监导"},
		{"Id":"H","Name":"实施"}
	]



	//问询状态
	$rootScope.prjAskStaList = [
		{"Id":"A01","Name":"正常"},
		{"Id":"A02","Name":"问询中"},
		{"Id":"A03","Name":"通过"},
		{"Id":"A04","Name":"拒绝"}
	]
	
	// 股市板块
	$rootScope.prjMarketListAbs = [
		{"Id":"M01" ,"Name":"上交所主板"},
		{"Id":"M02" ,"Name":"深交所主板"},
		{"Id":"M03" ,"Name":"深交所创业板"},
		{"Id":"M04" ,"Name":"深交所中小板"}
	]
	//股市板块
	$rootScope.prjMarketList = [
		{"Id":"" ,"Name":"全部"},
		{"Id":"M01" ,"Name":"上交所主板"},
		{"Id":"M02" ,"Name":"深交所主板"},
		{"Id":"M03" ,"Name":"深交所创业板"},
		{"Id":"M04" ,"Name":"深交所中小板"}
	]
	//所属行业
	$rootScope.prjIndList = [
		{"Id":"S01","Name":"农、林、牧、渔业"},
		{"Id":"S02","Name":"采矿业"},
		{"Id":"S03","Name":"制造业"},
		{"Id":"S04","Name":"电力、热力、燃气及水的生产和供应业"},
		{"Id":"S05","Name":"建筑业"},
		{"Id":"S06","Name":"批发和零售业"},
		{"Id":"S07","Name":"交通运输、仓储和邮政业"},
		{"Id":"S08","Name":"住宿和餐饮业"},
		{"Id":"S09","Name":"信息传输、软件和信息技术服务业"},
		{"Id":"S10","Name":"金融业"},
		{"Id":"S11","Name":"房地产业"},
		{"Id":"S12","Name":"租赁和商务服务业"},
		{"Id":"S13","Name":"科学研究和技术服务业"},
		{"Id":"S14","Name":"水利、环境和公共设施管理业"},
		{"Id":"S15","Name":"居民服务、修理和其他服务业"},
		{"Id":"S16","Name":"教育"},
		{"Id":"S17","Name":"卫生和社会工作"},
		{"Id":"S18","Name":"文化、体育和娱乐业"},
		{"Id":"S19","Name":"综合"}
	]
	// 部门
	$rootScope.prjDeptList = [
		{"Id":"D01","Name":"上海"},
		{"Id":"D02","Name":"北京"},
		{"Id":"D03","Name":"深圳"}
	]

	// 项目组成员职位
	$scope.prjMemPosList  = [
		{"Id":"P01","Name":"保荐代表人"},
		{"Id":"P02","Name":"项目协办人"},
		{"Id":"P04","Name":"项目负责人"},
		{"Id":"P06","Name":"分管领导"},
		{"Id":"P07","Name":"秘书"},
		{"Id":"P08","Name":"质控审核员"},
		{"Id":"P09","Name":"项目成员"}
	]
	
	// 文件类型
	$scope.fileTagDefList =[
		{"Id":"F11","Name":"发审会"},
		{"Id":"F12","Name":"红头文"},
		{"Id":"F13","Name":"非红头文"},
		{"Id":"F14","Name":"工作日志"},
		{"Id":"F15","Name":"备忘录"},
		{"Id":"F16","Name":"会议纪要"},
		{"Id":"F17","Name":"立项申请报告"},
		{"Id":"F18","Name":"隔离墙审批表"},
		{"Id":"F19","Name":"禁配对象信息表"},
		{"Id":"F20","Name":"内幕信息知情人登记表"},
		{"Id":"F21","Name":"立项申请其他"},
		{"Id":"F22","Name":"申报评审申请表"},
		{"Id":"F23","Name":"申报评审其他"},
		{"Id":"F24","Name":"内核申请表"},
		{"Id":"F25","Name":"内核其他"},
		{"Id":"F26","Name":"挂网材料"},
		{"Id":"F27","Name":"复核告知"},
		{"Id":"F28","Name":"外勤调查"},
		{"Id":"F30","Name":"接收"},
		{"Id":"F02","Name":"受理"},
		{"Id":"F29","Name":"首次预披露"},
		{"Id":"F31","Name":"反馈"},
		{"Id":"F47","Name":"反馈回复"},
		{"Id":"F04","Name":"口头反馈"},
		{"Id":"F05","Name":"口头反馈回复"},
		{"Id":"F07","Name":"中止"},
		{"Id":"F06","Name":"恢复"},
		{"Id":"F09","Name":"撤回"},
		{"Id":"F49","Name":"终止审查通知书"},
		{"Id":"F33","Name":"反馈意见挂网"},
		{"Id":"F32","Name":"二次预披露"},
		{"Id":"F34","Name":"报送上会稿"},
		{"Id":"F35","Name":"初审会"},
		{"Id":"F01","Name":"收到告知函"},
		{"Id":"F36","Name":"告知函回复"},
		{"Id":"F40","Name":"批文"},
		{"Id":"F41","Name":"批文失效"},
		{"Id":"F10","Name":"举报信核查"},
		{"Id":"F08","Name":"不予核准函"},
		{"Id":"F48","Name":"证监会审核其它"},
		{"Id":"F43","Name":"审批附件"},
		{"Id":"F44","Name":"公开信息查询"},
		{"Id":"F45","Name":"检查问询"},
		{"Id":"F46","Name":"问询反馈"}
	]

	// 上传文件文件类型

	$scope.uploadFileTypeList = [
		{"Id":"F01","Name":"告知函"},
		{"Id":"F02","Name":"受理函"},
		{"Id":"F03","Name":"发行批文"},
		{"Id":"F04","Name":"反馈意见"},
		{"Id":"F05","Name":"口头反馈意见"},
		{"Id":"F06","Name":"同意恢复"},
		{"Id":"F07","Name":"同意中止"},
		{"Id":"F08","Name":"不予核准函"},
		{"Id":"F09","Name":"同意撤回"},
		{"Id":"F10","Name":"举报信核查"},
		{"Id":"F11","Name":"发审会"},
		{"Id":"F12","Name":"红头文"},
		{"Id":"F13","Name":"非红头文"},
		{"Id":"F14","Name":"工作日志"},
		{"Id":"F15","Name":"备忘录"},
		{"Id":"F16","Name":"会议纪要"},
		{"Id":"F17","Name":"立项申请报告"},
		{"Id":"F18","Name":"隔离墙审批表"},
		{"Id":"F19","Name":"禁配对象信息表"},
		{"Id":"F20","Name":"内幕信息知情人登记表"},
		{"Id":"F21","Name":"立项申请其他"},
		{"Id":"F22","Name":"申报评审申请表"},
		{"Id":"F23","Name":"申报评审其他"},
		{"Id":"F24","Name":"内核申请表"},
		{"Id":"F25","Name":"内核其他"}
	]



	// 待办业务--签署意见
	$scope.agencyDealList =[
		{"Id":"WFPMISAUDITRECV","Menu":"Accepted","Name":"受理"},
		{"Id":"WFPMISAUDITMEET","Menu":"PubMeetingTime","Name":"发布会议时间"},
		{"Id":"WFPMISAUDITRES","Menu":"MeetingResult","Name":"会议结果"},
		{"Id":"WFPMISAUDITCHK","Menu":"AuditorComments","Name":"审核员意见"},
		{"Id":"WFPMISAUDITRTN","Menu":"CommentsReply","Name":"意见回复"},
		{"Id":"WFPMISONLINECHK1","Menu":"Approved","Name":"审批"},
		{"Id":"WFPMISONLINECHK2","Menu":"Approved","Name":"审批"},
		{"Id":"WFPMISSEALSCHK1","Menu":"Approved","Name":"审批"},
		{"Id":"WFPMISSEALSCHK2","Menu":"Approved","Name":"审批"},
		{"Id":"WFPMISSEALSDOW","Menu":"","Name":"下载"},
		{"Id":"WFPMISAUDITMOD","Menu":"","Name":"立项/申报/内核信息修改"},
		{"Id":"WFPMISONLINEMOD","Menu":"","Name":"挂网审评"},
		{"Id":"WFPMISAPPMOD","Menu":"","Name":"用印申请"}
	]

	// 待办业务---任务详情
	$scope.agencyTaskTypeList = [
		{"Id":"PMISPROJECTAPPROVAL","Name":"内核申请","Menu":"TaskDetailsInner"},
		{"Id":"PMISPROJECTAUDIT","Name":"申报评审","Menu":"TaskDetailsDeclare"},
		{"Id":"PMISPROJECTBUILD","Name":"立项申请","Menu":"TaskDetailsBuild"},
		{"Id":"PMISPROJECTONLINE","Name":"挂网申请","Menu":"TaskDetailsOnline"},
		{"Id":"PMISSEALSAPPLY","Name":"用印申请","Menu":"TaskDetailsPrint"}
	]

	// ===================待办业务展示菜单===================

	// 6个阶段-- 受理5 审批1
	$rootScope.funcListDealPhase = [
		{"Id":"Accepted","Name":"受理","icon":""},
		{"Id":"PubMeetingTime","Name":"发布会议时间","icon":""},
		{"Id":"MeetingResult","Name":"会议结果","icon":""},
		{"Id":"AuditorComments","Name":"审核员意见","icon":""},
		{"Id":"CommentsReply","Name":"意见回复","icon":""},
		{"Id":"Approved","Name":"审批","icon":""}
	]
	// 5种任务详情
	$rootScope.funcListTaskDetail = [
		{"Id":"TaskDetailsBuild","Name":"任务详情-立项","icon":""},
		{"Id":"TaskDetailsDeclare","Name":"任务详情-申报","icon":""},
		{"Id":"TaskDetailsInner","Name":"任务详情-内核","icon":""},
		{"Id":"TaskDetailsOnline","Name":"任务详情-挂网","icon":""},
		{"Id":"TaskDetailsPrint","Name":"任务详情-用印","icon":""}
	]
	// =================== End 待办业务展示菜单===================

}]);