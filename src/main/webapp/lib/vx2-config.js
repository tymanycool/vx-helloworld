vx.module('ibsapp.config', []);
vx.module('ui.libraries', []);
vx.module('ibsapp.libraries', []);
vx.module("ui.bootstrap", ["ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdown", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"]);

var ibsapp = vx.module('ibsapp', [
	'ui.router',
	'vStorage',
	'vx.lazyLoad',
	'ngSanitize',
	'vviewport.vpage',
	'ui.libraries',
	'ui.bootstrap',
	'ibsapp.libraries',
	'ibsapp.config',
]);
(function(window, vx, $) {
	'use strict';
	var mod = vx.module('ibsapp.config');

	configLog.$inject = ['$logProvider'];

	function configLog($logProvider) {
		$logProvider.debugEnabled(false);
	}

	configBrowser.$inject = ['$browserProvider'];

	function configBrowser($browserProvider) {}

	configRemote.$inject = ['$remoteProvider'];

	// 生成uuid
	function guid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
	// 获取当前日期
	function getRqDate() {
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
	function getRqTime() {
		var item = new Date();
		var hour = item.getHours() < 10 ? "0" + item.getHours() : item.getHours();
		var minute = item.getMinutes() < 10 ? "0" + item.getMinutes() : item.getMinutes();
		var second = item.getSeconds() < 10 ? "0" + item.getSeconds() : item.getSeconds();
		var Time = hour.toString() + minute.toString() + second.toString();
		return Time;
	}

	function configRemote($remoteProvider) {
		$remoteProvider.setErrorTag(function(data) {
			//		console.debug('filter data with setErrorTag');
			if(data.header) {
				if(data.header.retCode != '000000') {
				
					return true;
				}
			} else {
				if(data.ReturnCode) {
					return true;
				}
			}

		});
		// $remoteProvider.setTrsContext("/local/");
		// $remoteProvider.setTrsContext("/pmis-website/");
		$remoteProvider.setTrsContext("");
		$remoteProvider.setSendBeforeFn(function() {
			$('#overlay').show();
		});
		$remoteProvider.setSendAfterFn(function() {
			$('#overlay').hide();
		});
		$remoteProvider.config = {
			headers: {
				'Content-Type': 'application/json'
			},
			timeout: 60000,
			toKeyValue: false
		};
		$remoteProvider.setErrorCallback(function(data, status, headers, config) {
			try {
				var $S = config.$scope,
					httpRequest = config.url;
				var currentScope = vx.element("div[v-view]>*").scope() || vx.element("body").scope();
				if(status != 200) {
					currentScope.jsonError = "请求错误!";
				} else {
					if(data.header) {
						currentScope.jsonCode = data.header.retCode;
						if(data.header.retCode != '000000') {
							
							currentScope.jsonError = data.header.retMsg;
						}else if(data.header.retCode == 'role.invalid_user'){
							
							currentScope.jsonError = data.header.retMsg;
						}
					} else {
						if(data.ReturnCode) {
							currentScope.jsonError = data.ReturnCode;
						}
					}
				}

				var errorMsg = currentScope.jsonError;
				var errCode = currentScope.jsonCode;
				$dialogService.$alert({
					type: "error",
					title: "提示",
					content: errorMsg,
					ok: function() {
						if(errCode == 'role.invalid_user'){
							window.location.href = "login.html";
						}
					}
				}, false);
				return;
			} catch(e) {
				var errorMsg = "操作异常";
			}

			
			$dialogSerivce.error("错误信息：" + errorMsg);

		});
	}

	configHttp.$inject = ['$httpProvider'];

	function configHttp($httpProvider) {
		fnReq.$inject = ['$q'];

		function fnReq($q) {
			var interceptor = {
				'request': function(config) {
					if(config.method == "POST") {
						config.data = vx.extend(config.data || {}, {
							'channelId': '00',
							'tranDate': getRqDate(),
							'tranTime': getRqTime()
						});
					}
					return config;
				},
				'response': function(resp) {
					return resp;
				},
				'requestError': function(rejection) {
					return $q.reject(rejection);
				},
				'responseError': function(rejection) {
					return rejection
				}
			};
			return interceptor;
		}

		$httpProvider.interceptors.push(fnReq);
	}

	configHttpBackend.$inject = ['$httpBackendProvider'];

	function configHttpBackend($httpBackendProvider) {}

	configSubmit.$inject = ['$submitConfigProvider'];

	function configSubmit($submitConfigProvider) {
		$submitConfigProvider.setSubmitCompileProcess(function(scope) {
			delete scope.jsonError;
		});
		$submitConfigProvider.setSubmitBeforeProcess(function(scope) {
			delete scope.jsonError;
		});
		$submitConfigProvider.setSubmitErrProcess(function(ctrlComment, errMessage, scope, ctrl) {
			$(ctrl).stop().animate({
				left: "-10px"
			}, 100).animate({
				left: "10px"
			}, 100).animate({
				left: "-10px"
			}, 100).animate({
				left: "10px"
			}, 100).animate({
				left: "0px"
			}, 100);
			scope.jsonError = [{
				"_exceptionMessage": ctrlComment + errMessage
			}];
			scope.$apply();
		});
	}

	configContext.$inject = ['$contextConfigProvider'];

	function configContext($contextConfigProvider) {
		$contextConfigProvider.setSessionStorageEnable(true);
	}

	mod.config(configLog);
	mod.config(configBrowser);
	mod.config(configRemote);
	mod.config(configHttp);
	mod.config(configHttpBackend);
	mod.config(configSubmit);
	mod.config(configContext);
	runRootScope.$inject = ['$rootScope', '$window', '$http', '$locale', '$state', '$stateParams', '$location', '$context', '$filter', '$remote', '$targets', '$modal'];

	function runRootScope($rootScope, $window, $http, $locale, $state, $stateParams, $location, $context, $filter, $remote, $targets, $modal) {
		window.$rootScope = $rootScope;
		$rootScope.$TrsContext = $window.TRSCONTEXT;
		$rootScope.$ClientMode = $window.CLIENTMODE;
		$rootScope.$state = $state;
		$rootScope.getRouteParams = function(param) {
			return $stateParams[param];
		};
		$rootScope.goto = function(url, params, viewportName) {
			if(!url) {
				return;
			}
			if(/[\.]/.test(url)) {
				if($state.current.name != url) {
					$state.go(url, params);
				} else {
					$state.reload();
				}
			} else if(/^[\/]/.test(url)) {
				window.location.hash = url;
			} else if(/^[#]/.test(url)) {
				$targets(viewportName || "content", url);
			} else if(/\.html/.test(url)) {
				window.location = url;
			}
		};

		/**
		 * 弹出确认操作的模态框
		 * example：
		 * 		$scope.$confirm({
		 * 			title: "确认信息",
		 * 			content: "是否删除当前部门？",
		 * 			ok: function() {
		 * 				...
		 * 			}
		 *		});
		 */
		$rootScope.$confirm = function(message) {
			var modalInstance = $modal.open({
				templateUrl: 'htmls/Common/Confirm.html',
				controller: ['$scope', '$modalInstance',
					function($scope, $modalInstance) {
						$scope.message = message;
						$scope.ok = function() {
							$modalInstance.close();
							if(message.ok && typeof message.ok == "function") {
								message.ok.apply($scope);
							}
						};
						$scope.cancel = function() {
							$modalInstance.dismiss('cancel');
							if(message.cancel && typeof message.cancel == "function") {
								message.cancel.apply($scope);
							}
						};
					}
				]
			});
		};
		$rootScope.$alert = function(message) {
			var modalInstance = $modal.open({
				templateUrl: 'htmls/Common/Alert.html',
				controller: ['$scope', '$modalInstance',
					function($scope, $modalInstance) {
						$scope.message = message;
						$scope.ok = function() {
							$modalInstance.close();
							if(message.ok && typeof message.ok == "function") {
								message.ok.apply($scope);
							}
						};
					}
				]
			});
		};

		window.$dialogService = {};
		vx.forEach(['error', 'success', 'warn'], function(key) {
			$dialogService[key] = function(message, callback) {
				$rootScope.$notice({
					content: message,
					type: key,
					ok: callback,
					cancel: callback
				});
			}
		});
		$dialogService.$alert = function(message, keyboard) {
			if($dialogService.$alert.isExist) {
				return;
			}
			var modalInstance = $modal.open({
				keyboard: keyboard || true,
				templateUrl: 'htmls/Common/Alert.html',
				controller: ['$scope', '$modalInstance',
					function($scope, $modalInstance) {
						$scope.message = message;
						$scope.ok = function() {
							$dialogService.$alert.isExist = false;
							$modalInstance.close();
							if(message.ok && typeof message.ok == "function") {
								message.ok.apply($scope);
							}
						};
					}
				]
			});
			$dialogService.$alert.isExist = true;
		};

		$rootScope.gotoLocation = function(url) {
			window.location = url;
		};
		$rootScope.goback = function(param) {
			window.history.back(param || -1);
		};
		$rootScope.$field = function(name) {
			return $locale.FIELDS[name] || name;
		};
		$rootScope.$msg = function(name) {
			return $locale.MESSAGES[name] || name;
		};
		$rootScope.showError = function(errorMessage, currentScope) {
			if(currentScope) {
				currentScope.$apply(function() {
					currentScope.jsonError = [{
						"_exceptionMessage": errorMessage
					}];
				});
			} else {
				var currentScope = vx.element("div[v-view]>*").scope() || vx.element("body").scope();
				currentScope.jsonError = [{
					"_exceptionMessage": errorMessage
				}];
			}
		};
		$rootScope.showOk = function(successMessage, currentScope) {
			if(currentScope) {
				currentScope.$apply(function() {
					currentScope.jsonError = [{
						"type": "success",
						"_exceptionMessage": successMessage
					}];
				});
			} else {
				var currentScope = vx.element("div[v-view]>*").scope() || vx.element("body").scope();
				currentScope.jsonError = [{
					"type": "success",
					"_exceptionMessage": successMessage
				}];
			}
		};
		$rootScope.setValidation = function(el, value) {
			vx.element(el).attr("validate", value);
		};

		$rootScope.$on('$stateChangeStart', function(event, to, pargs, from) {
			if(!$rootScope.$userInfo) {

			}
		});
		$rootScope.selectItem = function(item) {
		
			if(item.ActionId) {
				$rootScope.goto('/trade/' + item.ActionId);
			}
			if(item.ActionName === "Home") {
				$rootScope.goto('/trade/Home');
			}
		};
		// 自定义操作

		// 时间转换--匹配date显示格式
		$rootScope.strToDate = function(item) {
			if(item) {
				var OneMonth = item.substring(5, item.lastIndexOf('-'));
				var OneDay = item.substring(item.length, item.lastIndexOf('-') + 1);
				var OneYear = item.substring(0, item.indexOf('-'));
				var formDate = new Date(Date.parse(OneMonth + '/' + OneDay + '/' + OneYear));
				return formDate;
			}
			return;

		}
		// 时间转换--后台所需时间格式 yyyy-MM-dd
		$rootScope.FormDate = function(item) {
			if(item) {
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
				var Time = yy + "-" + mm + "-" + dd;
				return Time;
			}
			return;
		}

		$rootScope.$on('$stateChangeSuccess', function(event, to, pargs, from) {
//			if(from.url === "^") { //刷新
//				console.log(from.url + '--->' + to.url);
//			}
			// 本地存储登录用户信息，刷新可用
			if($window.sessionStorage.$userInfo){
				$rootScope.$userInfo = JSON.parse($window.sessionStorage.$userInfo);
			}
//			if(!$rootScope.$userInfo){
//				window.location.href = 'login.html';
//			}
		});

		// Menu
		$rootScope.MenuList = [{
				"ActionName": "首页",
				"ActionId": "Home",
				"root": "Main",
				"icon": "iconNav1"
			}, {
				"ActionName": "工作平台",
				"ActionId": "AgencyBusiness",
				"root": "Main",
				"icon": "iconNav2"
			},
			{
				"ActionName": "统计信息",
				"ActionId": "Home2",
				"hasChildren": "tj",
				"childrenNum": 6,
				"root": "Main",
				"icon": "iconNav3",
				"children": [{
					"ActionName": "项目发行情况表",
					"ActionId": "ProjectDistribution",
					"hasFather": "1"
				}, {
					"ActionName": "发行中项目",
					"ActionId": "ProjectInIssue",
					"hasFather": "1"
				}, {
					"ActionName": "项目在会情况表",
					"ActionId": "SituationProject",
					"hasFather": "1"
				}, {
					"ActionName": "已立项项目情况表",
					"ActionId": "ProjectedProject",
					"hasFather": "1"
				}, {
					"ActionName": "撤回、未通过情况表",
					"ActionId": "FailProject",
					"hasFather": "1"
				}, {
					"ActionName": "储备项目情况表",
					"ActionId": "ReserveProject",
					"hasFather": "1"
				}]
			}, {
				"ActionName": "高管视图",
				"ActionId": "ManageMana",
				"root": "ManageView",
				"icon": "iconNav4"
			},{
				"ActionName": "项目管理",
				"ActionId": "Home3",
				"hasChildren": "pm",
				"childrenNum": 8,
				"root": "Main",
				"icon": "iconNav2",
				"children": [{
					"ActionName": "IPO项目",
					"ActionId": "ipo",
					"hasFather": "1"
				}, {
					"ActionName": "再融资项目",
					"ActionId": "Refinancing",
					"hasFather": "1"
				}, {
					"ActionName": "并购与重组",
					"ActionId": "MA",
					"hasFather": "1"
				}, {
					"ActionName": "债券",
					"ActionId": "Bonds",
					"hasFather": "1"
				}, {
					"ActionName": "其他项目",
					"ActionId": "other",
					"hasFather": "1"
				}, {
					"ActionName": "完成项目",
					"ActionId": "AchieveProject",
					"hasFather": "1"
				}, {
					"ActionName": "终止项目",
					"ActionId": "StopProject",
					"hasFather": "1"
				}, {
					"ActionName": "高风险项目",
					"ActionId": "RiskProject",
					"hasFather": "1"
				}]
			},{
				"ActionName": "工作底稿",
				"ActionId": "Home4",
				"hasChildren": "wd",
				"childrenNum": 3,
				"root": "Main",
				"icon": "iconNav1",
				"children": [{
					"ActionName": "尽职调查",
					"ActionId": "DiligenceSponsor",
					"hasFather": "1"
				}, {
					"ActionName": "保荐业务记录",
					"ActionId": "DiligenceRecord",
					"hasFather": "1"
				}, {
					"ActionName": "申请文件以及其他文件",
					"ActionId": "ApplyOtherFiles",
					"hasFather": "1"
				}]
			}
		]
		$rootScope.ManMenuList = [{
			"ActionName": "系统管理",
			"ActionId": "sys",
			"root": "Main",
			"icon": "iconNav2",
			"hasChildren": "sysmg",
			"children": [{
				"ActionName": "用户管理",
				"ActionId": "SysMng",
				"hasFather": "1"
			}, {
				"ActionName": "角色管理",
				"ActionId": "RoleMng",
				"hasFather": "1"
			}, {
				"ActionName": "部门管理",
				"ActionId": "DepartmentManage",
				"hasFather": "1"
			}]
		}, {
			"ActionName": "通讯录维护",
			"ActionId": "ContactMng",
			"root": "Main",
			"icon": "iconNav3"
		}, {
			"ActionName": "批量管理",
			"ActionId": "BatchMng",
			"root": "ManageView",
			"icon": "iconNav4"
		}]
	}

	ibsapp.run(runRootScope);
	ibsapp.run(['$remote','$window', function($remote, $window) {
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
	}]);
})(window, window.vx, window.jQuery);