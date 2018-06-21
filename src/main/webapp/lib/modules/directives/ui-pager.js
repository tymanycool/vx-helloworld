/**
 * @author liuyoyo
 * @description 必须依赖skip过滤器
 */
(function(window, vx, undefined) {'use strict';
	var mod=vx.module('ui.libraries');
	/*
	 * 过滤器skipFilter
	 * [skipAt,skipEndAt) 从 skipAt 开始（包括 skipAt）到 skipEndAt 结束（不包括 skipEndAt）
	 * example:
	 * {{exa|skip:1:2}}
	 */
	var filter = {};
	filter.skipFilter = function() {
		return function(input, skipAt, skipEndAt, appendStr) {
			if (!vx.isArray(input) && !vx.isString(input))
				return input;
			else if (skipEndAt && !appendStr)
				return input.slice(skipAt, skipEndAt);
			else if (appendStr){
				if(vx.isString(input) && (input.length-1)>skipEndAt){
					return input.slice(skipAt, skipEndAt)+appendStr;
				}else if(vx.isString(input)){
					return input.slice(skipAt, skipEndAt);
				}
			}else
				return input.slice(skipAt);

		};
	};

	mod.filter('skip', filter.skipFilter);
	/*
	 * 分页组件ui-pager
	 */
	pagerController.$inject = ['$element', '$attrs', '$scope', '$remote','$compile'];
	function pagerController($element, $attrs, $scope, $remote,$compile) {
		var pager = this;
		pager.currentIndex = 0;
		pager.curIdx = 0;//前端分页使用
		pager.currentPage = 1;
		pager.totalPage = 0;
		pager.recordNumber = null;
		pager.pageSize = $attrs.pagersize ? parseInt($attrs.pagersize) : 10;
		pager.pageOptions = [];
		//pager.List = [];

		var name = ($attrs.uiPager || $attrs.uiPager.length > 0) ? $attrs.uiPager : $attrs.name;
		pager.langFlag = ($scope['language'] || $attrs.language) === 'en' ? false : true;
		$scope[name] = vx.extend(pager, $scope[name]||{});

		$scope.$watch(function() {
			return $scope[name];
		}, function(values) {
			if(!$scope[name]){
				//$scope[name]=pager;
				return;
			}
			var pager = $scope[name];
			if(isNaN(pager.currentIndex)){
				pager.currentIndex =  0;
			}
			if(isNaN(pager.curIdx)){
				pager.curIdx =  0;
			}
			if(isNaN(pager.currentPage)){
				pager.currentPage =  1;
			}
			if(isNaN(pager.totalPage)){
				pager.totalPage = 0;
			}
			if (!pager.langFlag) {
				pager.langFlag = true;
			}
			if(isNaN(pager.pageSize)){
				pager.pageSize = $attrs.pagersize ? parseInt($attrs.pagersize) : 10;
			}
			if(isNaN(pager.recordNumber)){
				pager.recordNumber = $attrs.pagertype?pager["List"].length: 0;
			}
			pager.totalPage =  pager.recordNumber % pager.pageSize == 0 ? Math.floor(pager.recordNumber / pager.pageSize) : (Math.floor(pager.recordNumber / pager.pageSize) + 1);
			if(!pager.pageOptions || pager.pageOptions.length == 0){
				pager.pageOptions = [];
				for (var i = 0; i < parseInt(pager.totalPage); i++) {
					var no = pager.langFlag ? '第' + (i + 1 ) + '页' : i + 1;
					pager.pageOptions.push(no);
				}
			}
		});

		$scope.topPage = function(name) {
			var pager = $scope[name];
			if (pager.currentPage > 1) {
				pager.currentIndex = 0;
				if($attrs.pagertype) pager.curIdx=0;
				pager.goPageNo=null;
				changePage(pager,name);
			};
		};
		$scope.prevPage = function(name) {
			var pager = $scope[name];
			var curIdxTemp = pager.currentIndex - pager.pageSize;
			if (curIdxTemp < 0 || pager.totalPage <= 1)
				return false;
			pager.currentIndex = curIdxTemp;
			if($attrs.pagertype) pager.curIdx = curIdxTemp;
			pager.prevPageEnable = true;
			pager.goPageNo=null;
			changePage(pager,name);
		};
		$scope.nextPage = function(name) {
			var pager = $scope[name];
			var curIdxTemp = pager.currentIndex + pager.pageSize;
			if (curIdxTemp >= pager.recordNumber)
				return false;
			pager.currentIndex = curIdxTemp;
			if($attrs.pagertype) pager.curIdx = curIdxTemp;
			pager.nextPageEnable = true;
			pager.goPageNo=null;
			changePage(pager,name);
		};
		$scope.bottomPage = function(name) {
			var pager = $scope[name];
			if (pager.currentPage < pager.totalPage) {
				pager.currentIndex = (pager.totalPage - 1) * pager.pageSize;
				if($attrs.pagertype) pager.curIdx = (pager.totalPage - 1) * pager.pageSize;
				pager.goPageNo=null;
				changePage(pager,name);
			};
		};
		$scope.goPage = function(name) {
			var pager = $scope[name];
			var curIdxTemp = 0;
			if(!pager.goPageNo) return false;
			for (var i = 0; i < pager.pageOptions.length; i++) {
				if (pager.goPageNo == pager.pageOptions[i]){
					curIdxTemp = i * pager.pageSize;
					break;
				}
			}
			//var curIdx = (pager.pageOptions.indexOf(pager.goPageNo)) * pager.pageSize;
			pager.currentIndex = curIdxTemp;
			if($attrs.pagertype) pager.curIdx = curIdxTemp;
			changePage(pager,name);
			$("#selectNo"+name).find("option[value="+pager.goPageNo+"]").attr("selected","selected").siblings().removeAttr("selected");
			$compile($("#selectNo"+name))($scope);
		};

		$scope.goPageNum = function(name){
			var pager = $scope[name];
			pager.totalPage = pager.recordNumber % pager.pageSize == 0 ? Math.floor(pager.recordNumber / pager.pageSize) : Math.floor(pager.recordNumber / pager.pageSize) + 1;
			pager.pageOptions = [];
			for (var i = 0; i < parseInt(pager.totalPage); i++) {
				var no = pager.langFlag ? '第' + (i + 1 ) + '页' : i + 1;
				pager.pageOptions.push(no);
			};
			pager.currentPage = 1;
			pager.currentIndex = 0;
			if($attrs.pagertype) pager.curIdx=0;
			pager.goPageNo=null;
			changePage(pager,name);
			$("#selectId"+name).find("option[value="+pager.pageSize+"]").attr("selected","selected").siblings().removeAttr("selected");
			$compile($("#selectId"+name))($scope);
		};

		function changePage(pager,name) {
			pager.currentPage = pager.currentIndex / pager.pageSize + 1;
			if(!$attrs.pagertype){
				delete pager["List"];
				$remote.post(pager.TransactionId+".do", pager, function(value) {
					$scope[name] = value['resultMap'];
				});
			}
		};
	};

	var directive = {};

	directive.uiPager = ['$compile','$log',
		function($compile,$log) {
			return {
				restrict : 'CA',
				controller : pagerController,
				compile : function(tElement, tAttrs) {
					var name = (tAttrs.uiPager || tAttrs.uiPager.length > 0) ? tAttrs.uiPager : tAttrs.name;
					var orderFlag = (tAttrs.order && tAttrs.order != 'false') ? true : false;
					var col = 0, bodyTr = tElement.children('tbody:first').children('tr'), ths = tElement.children('thead').find('th'), repeatTarget = bodyTr.attr('v-repeat') ? bodyTr : tElement.children('tbody:first'), expa = repeatTarget.attr('v-repeat');
					if(!expa) $log.error("DOM must have <tbody> & <thead>");
					// 给v-repeat指令返回的list数组，设置按什么字段（predicate）升/降排序（reverse）过滤器
					repeatTarget.attr('v-repeat', expa + '| skip:' +name+ '.curIdx | limitTo:'+name+'.pageSize | orderBy:' + name + '.predicate:' + name + '.reverse');
					// 遍历tbody里td，用于生成thead的名称等属性
					vx.forEach(bodyTr.children('td'), function(elm) {
						var expc = $(elm).text(), exp = expc.replace(/[{}\s]/g, ""), name = (exp.indexOf(".") > 0 && exp.split(".").length == 2) ? exp.split(".")[1].split(/\|/)[0] : null;
						orderFlag && name && $(ths[col]).attr('order', name) && $(ths[col]).append('<span class="ui-icon ui-icon-triangle-1-s"> </span>');
						col += 1;
					});
					return {
						pre : function(scope, element, attrs, ctrl) {
							// 定义排序ORDER函数，通过改变过滤器orderBy的predicate以及reverse来达到目的
							var listenerOrder = function(ev) {
								var sort = vx.element(this).children('span');
								scope[name].predicate = vx.element(this).attr('order');
								scope[name].reverse = false;
								vx.element(this).siblings().children('span').removeClass('ui-icon-triangle-1-n ui-icon-triangle-1-s').toggleClass('ui-icon-triangle-1-s');
								if (sort.hasClass('ui-icon-triangle-1-n')) {
									scope[name].reverse = true;
									sort.removeClass('ui-icon-triangle-1-n');
									sort.toggleClass('ui-icon-triangle-1-s');
								} else {
									scope[name].reverse = false;
									sort.removeClass('ui-icon-triangle-1-s');
									sort.toggleClass('ui-icon-triangle-1-n');
								}
								// console.log('orderBy :' + grid.predicate + '
								// order: ' + grid.reverse);
								scope.$digest();
							};
							// 给表头th绑定排序ORDER函数
							vx.forEach(ths, function(elm) {
								$(elm).bind('click', listenerOrder);
							});
							//追加表尾
							var tail = '';
							/*
							 * 原版样式
							 * '<tfoot><tr><td colspan="'+col+'">\
							 <span style="float:left">当前第{{'+name+'.currentPage}}页&nbsp;共{{'+name+'.totalPage}}页&nbsp;{{'+name+'.recordNumber}}条记录</span>\
							 <div class="btn-page pull-right" style="+margin-top: -6px;_margin-top: -6px;+padding-right: 20px;_padding-right: 20px;+margin-right:-20px;">\
							 <a class="btn topPage" v-click="topPage()">\
							 <i class="icon-step-backward"></i>\
							 首页\
							 </a>\
							 <a class="btn prevPage" v-click="prevPage()">\
							 <i class="icon-backward"></i>\
							 上一页\
							 </a>\
							 <a class="btn nextPage" v-click="nextPage()">\
							 下一页\
							 <i class="icon-forward"></i>\
							 </a>\
							 <a class="btn bottomPage" v-click="bottomPage()">\
							 尾页\
							 <i class="icon-step-forward"></i>\
							 </a>\&nbsp;转到\
							 <select class="input-small" style="margin-bottom: 0px;width: auto" v-model="'+name+'.goPageNo" v-options="opt as opt for opt in '+name+'.pageOptions" v-change="goPage()"><option value="">请选择</option></select>\
							 </div>\
							 </td></tr></tfoot>'
							 */
							if(ctrl.langFlag) tail = '<tfoot><tr><td colspan="'+col+'" >\
						 <span style="float:left">当前第{{'+name+'.currentPage}}页&nbsp;共{{'+name+'.totalPage}}页&nbsp;{{'+name+'.recordNumber}}条记录</span>\
						 <div class="btn-page pull-right" >\
						 <a class="btn topPage" v-click="topPage(\''+name+'\')">\
						 <i class="fa fa-fast-backward"></i>\
						 首页\
						 </a>\
						 <a class="btn prevPage" v-click="prevPage(\''+name+'\')">\
						 <i class="fa fa-backward"></i>\
						 上一页\
						 </a>\
						 <a class="btn nextPage" v-click="nextPage(\''+name+'\')">\
						 下一页\
						 <i class="fa fa-forward"></i>\
						 </a>\
						 <a class="btn bottomPage" v-click="bottomPage(\''+name+'\')">\
						 尾页\
						 <i class="fa fa-fast-forward"></i>\
						 </a>\&nbsp;跳转到\
						 <select class="input-small" style="margin-bottom: 0px;width: auto" v-model="'+name+'.goPageNo" v-options="opt as opt for opt in '+name+'.pageOptions" v-change="goPage(\''+name+'\')"><option value="">-选择-</option></select>页\
						 </div>\
						 </td></tr></tfoot>';
							else tail = '<tfoot><tr><td colspan="'+col+'" >\
						 <span style="float:left">current page:{{'+name+'.currentPage}}&nbsp;total page:{{'+name+'.totalPage}}&nbsp;total record:{{'+name+'.recordNumber}}</span>\
						 <div class="btn-page pull-right" >\
						 <a class="btn topPage" v-click="topPage(\''+name+'\')">\
						 <i class="icon-step-backward"></i>\
						 first\
						 </a>\
						 <a class="btn prevPage" v-click="prevPage(\''+name+'\')">\
						 <i class="icon-backward"></i>\
						 previous\
						 </a>\
						 <a class="btn nextPage" v-click="nextPage(\''+name+'\')">\
						 next\
						 <i class="icon-forward"></i>\
						 </a>\
						 <a class="btn bottomPage" v-click="bottomPage(\''+name+'\')">\
						 last\
						 <i class="icon-step-forward"></i>\
						 </a>\&nbsp;跳至\
						 <select class="input-small" style="margin-bottom: 0px;width: auto" v-model="'+name+'.goPageNo" v-options="opt as opt for opt in '+name+'.pageOptions" v-change="goPage(\''+name+'\')"><option value="">-选择-</option></select>页\
						 </div>\
						 </td></tr></tfoot>';
							element.append(tail);
							$compile(element.contents())(scope);

						}
					};
				}
			};
		}];
	
	
	mulipagerController.$inject = ['$element', '$attrs', '$scope', '$remote','$compile'];
	function mulipagerController($element, $attrs, $scope, $remote,$compile) {

		$scope.pagerInit=function(){
			$scope.pagerNum=10;
			$scope.pageLength=0;
		}
//		一页显示多少条
		$scope.showSize=function(index){
			
			$scope.pagerNum=index;
			$scope.pageLength=Math.ceil($scope.size/$scope.pagerNum);
			$scope.getListData(1);
		}
//		上一页
		$scope.previousPage=function(){
			if($scope.currentIndex!=1){
				$scope.getListData(--$scope.currentIndex);
			}
			
		}
//		下一页
		$scope.nextPage=function(){
			if($scope.currentIndex<$scope.pageLength){
			$scope.getListData(++$scope.currentIndex);
			}
		}

//		跳转页
		$scope.gotoPage=function(index){
			
			$scope.getListData(index);
			
		}
//		获取当前数据
		$scope.getListData=function(index){
			
			var current=(index-1)*$scope.pagerNum;
			var last=index*$scope.pagerNum;
			
			//当前页
			$scope.currentIndex=index;
			//当前最小页
			$scope.minIndex=parseInt(($scope.currentIndex-1)/5)*5+1;
			
			$scope.currentNum=($scope.currentIndex-1)%5;
			$scope[$scope.name+"_pager"]=$scope[$scope.name].slice(current,last);
			
		}
	}
	
	directive.uiMulipager = ['$compile','$log',
	             		function($compile,$log) {
	             			return {
	             				restrict : 'CA',
	             				controller : mulipagerController,
	             				templateUrl : 'htmls/Common/pager.html',
	             				compile : function(tElement, tAttrs) {
	             					
	             					
	             					return {
	             						pre : function(scope, element, attrs, ctrl) {
	             							
	             							var model=attrs.uiMulipager;
	             							scope.$watch(model,function(data){
	             								if(!data) return;
	             								
	             								scope.size=data.length;
	             								scope.name=model;
	             								scope[attrs.uiMulipager+"_pager"]=scope[attrs.uiMulipager];
	             								scope.showSize(10);
	             								scope.getListData(1);
	             								
	             							})
//	             							element.append(tail);
//	             							$compile(element.contents())(scope);

	             						}
	             					};
	             				}
	             			};
	             		}];
	
	
	
	
	mod.directive(directive);

})(window, window.vx);