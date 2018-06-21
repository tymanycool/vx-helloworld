/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/

'use strict';
var ibsapp = vx.module("ibsapp");
ibsapp.run(["$rootScope", "$state", "$stateParams", function($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);
ibsapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$controllerProvider', "$compileProvider", "$filterProvider", "$provide",
	function($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
		ibsapp.controller = $controllerProvider.register;
		ibsapp.directive = $compileProvider.directive;
		ibsapp.filter = $filterProvider.register;
		ibsapp.factory = $provide.factory;
		ibsapp.service = $provide.service;
		ibsapp.constant = $provide.constant;
		ibsapp.value = $provide.value;
		//是否使用全局controller
		$controllerProvider.allowGlobals();

		$urlRouterProvider.otherwise(function($injector) {
			var $state = $injector.get("$state");
			$state.go("trade.Home");
		});
		$stateProvider
			.state('welcome', {
				url: '/welcome',
				templateUrl: 'htmls/apps/welcome.html'
			})
			.state('trade', {
				abstract: true,
				url: '/trade',
				templateUrl: 'htmls/apps/trade.html'
			})
			.state('trade.home', {
				url: '/Home',
				templateUrl: 'htmls/Main/Home/Home.html'
			})

		//遍历菜单生成路由
		function registerRoute(base, Menu) {
			base = base || "htmls";
			for(var i = 0; i < Menu.length; i++) {
				var temp_node = Menu[i];
				if(temp_node.children && temp_node.children.length > 0) {
					registerRoute(base + "/" + temp_node.root, temp_node.children);
				} else {
					if(Menu[i].ActionId) {
						$stateProvider.state("trade." + Menu[i].ActionId, {
							url: "/" + Menu[i].ActionId,
							templateUrl: base + "/" + temp_node.ActionId + "/" + temp_node.ActionId + ".html"
						});
						functions.push(Menu[i]);
					}
				}
			}
		}

		var functions = [];
		registerRoute(null, window.AllFunctions);

		vx.getFunctions = function() {
			return functions;
		};
	}
]);