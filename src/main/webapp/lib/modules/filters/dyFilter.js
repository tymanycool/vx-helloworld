/**
 *    尽职调查 -- 调查方法
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function surveryListFilter() {
		return function(input) {
			var surveryList = [{
			'surveryName': '问卷调查',
			'icon': 'W01'
		}, {
			'surveryName': '访谈',
			'icon': 'W02'
		}, {
			'surveryName': '列席会议',
			'icon': 'W03'
		},
		{
			'surveryName': '信息分析',
			'icon': 'W04'
		}, {
			'surveryName': '实地调查',
			'icon': 'W05'
		}, {
			'surveryName': '印证',
			'icon': 'W06'
		}, {
			'surveryName': '讨论',
			'icon': 'W07'
		}
	]
			if(input !== undefined) {
				for(var i=0;i<7;i++){
					if(input == surveryList[i].icon){
						return surveryList[i].surveryName;
						break;
					}
				}
				return input;
			}else{
				input = '暂无'
				return input
			}
		};
	}
	ibsapp.filter('surveryListFilter', surveryListFilter);
})(window, window.vx);


/**
 * 项目组成员职位
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function myprjMemPosFilter() {
		return function(input) {
			// 部门
			var myprjMemPosList = [
				{"Id":"P01","Name":"保荐代表人"},
				{"Id":"P02","Name":"项目协办人"},
				{"Id":"P03","Name":"文件管理员"},
				{"Id":"P04","Name":"项目负责人"},
				{"Id":"P05","Name":"持续督导专员"},
				{"Id":"P06","Name":"分管领导"},
				{"Id":"P07","Name":"秘书"},
				{"Id":"","Name":"项目成员"}
			]
			if(input !== undefined) {
				for(var i=0;i<8;i++){
					if(input == myprjMemPosList[i].Id){
						return myprjMemPosList[i].Name;
						break;
					}
				}
				return input;
			}
		};
	}
	ibsapp.filter('myprjMemPosFilter', myprjMemPosFilter);
})(window, window.vx);