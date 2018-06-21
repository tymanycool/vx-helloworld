/**
 * 用户状态过滤
 * @author：PtAu
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function userStaFilter() {
		return function(input) {
			if(input !== undefined) {
				// 00 正常  01 销户 02  锁定  03 未首次登陆
				if(input == '00') {
					return "正常"
				} else if(input == '01') {
					return "销户"
				} else if(input == '02') {
					return "锁定"
				} else {
					return "未首次登陆"
				}
			}

			return input;
		};
	}
	ibsapp.filter('userStaFilter', userStaFilter);
})(window, window.vx);

/**
 * 项目阶段
 * @author：PtAu
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");
	function prjPhaseFilter() {
		return function(input) {
			var prjPhsList = [
				{"Log":"C","action":"ProConAbs","name":"项目承揽","navId":"1"},
				{"Log":"D","action":"","name":"尽职调查"},
				{"Log":"L","action":"ProAprAbs","name":"项目立项","navId":"2"},
				{"Log":"F","action":"ProCouAbs","name":"项目辅导","navId":"3"},
				{"Log":"S","action":"ProAppRevAbs","name":"项目申报评审","navId":"4"},
				{"Log":"N","action":"IntRevAbs","name":"内核","navId":"5"},
				{"Log":"Z","action":"ComRevAbs","name":"证监会审核","navId":"6"},
				{"Log":"X","action":"ProRelAbs","name":"发行上市","navId":"7"},
				{"Log":"J","action":"ConSupAbs","name":"持续督导","navId":"8"},
				{"Log":"H","action":"","name":"实施"}
			]
			if(input !== undefined) {
				for(var i=0;i<10;i++){
					if(input == prjPhsList[i].Log){
						return prjPhsList[i].name;
						break;
					}
				}
				return input;
			}
			return input;
		};
	}
	ibsapp.filter('prjPhaseFilter', prjPhaseFilter);
})(window, window.vx);


/**
 * 项目类型
 * @author：PtAu
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function prjTypeFilter() {
		return function(input) {
			///	P01|IPO	P02|公开增发	P03|可转债	P04|配股	P05|非公开	P06|优先股非公开	P07|重组	P08|借壳类重组	P09|公司债券	P10|金融债  P11|一般财务顾问 P12|恢复上市	P13|收购
			var prjTypList = [
			{"Log":"P01", "name": "IPO"},
			{"Log":"P02", "name": "非公开"},
			{"Log":"P03", "name": "公开增发"},
			{"Log":"P04", "name": "可转债"},
			{"Log":"P05", "name": "配股"},
			{"Log":"P06", "name": "重组"},
			{"Log":"P07", "name": "借壳类重组"},
			{"Log":"P08", "name": "公司债券"},
			{"Log":"P09", "name": "金融债"},
			{"Log":"P10", "name": "一般财务顾问"},
			{"Log":"P11", "name": "恢复上市"},
			{"Log":"P12", "name": "收购"}
		]		
		
			if(input !== undefined) {
				for(var i=0;i<12;i++){
					if(prjTypList[i].Log == input){
						return prjTypList[i].name;
						break;
					}
				}
				return input;
			}
		};
	}
	ibsapp.filter('prjTypeFilter', prjTypeFilter);
})(window, window.vx);



/**
 * 项目分类
 * @author：PtAu
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function prjClassFilter() {
		return function(input) {
			var prjClassList = [
			{"Log":"C01","Type":"ipo", "name": "IPO"},
			{"Log":"C02","Type":"Refinancing", "name": "再融资"},
			{"Log":"C03","Type":"MA", "name": "并购重组"},
			{"Log":"C04","Type":"Bonds", "name": "债券"},
			{"Log":"C05","Type":"other", "name": "其他"}
		]		
		
			if(input !== undefined) {
				for(var i=0;i<5;i++){
					if(prjClassList[i].Log == input){
						return prjClassList[i].name;
						break;
					}
				}
				return input;
			}
		};
	}
	ibsapp.filter('prjClassFilter', prjClassFilter);
})(window, window.vx);



/**
 * 文件分类
 * 
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function fileTypeFilter() {
		return function(input) {
			var fileTypeList = [
			{"fileType":"F01", "name": "告知函"},
			{"fileType":"F02", "name": "受理函"},
			{"fileType":"F03", "name": "发行批文"},
			{"fileType":"F04", "name": "反馈意见"},
			{"fileType":"F05", "name": "口头反馈意见"}
		]		
		
			if(input !== undefined) {
				for(var i=0;i<5;i++){
					if(fileTypeList[i].Log == input){
						return fileTypeList[i].name;
						break;
					}
				}
				return input;
			}
		};
	}
	ibsapp.filter('fileTypeFilter', fileTypeFilter);
})(window, window.vx);




/**
 * 项目所属板块
 * @author：PtAu
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function prjMarketFilter() {
		return function(input) {
		//	M01|上交所主板 M02|深交所主板 M03|深交所创业板 M04|深交所中小板
			var prjMarList = [
			{"Log":"M01", "name": "上交所主板"},
			{"Log":"M02", "name": "深交所主板"},
			{"Log":"M03", "name": "深交所创业板"},
			{"Log":"M04", "name": "深交所中小板"}
		]		
		
			if(input !== undefined) {
				for(var i=0;i<4;i++){
					if(prjMarList[i].Log == input){
						return prjMarList[i].name;
						break;
					}
				}
				return input;
			}
		};
	}
	ibsapp.filter('prjMarketFilter', prjMarketFilter);
})(window, window.vx);
	
/**
 * 项目状态  S00|正常  S01|暂缓	S02|终止		S03|完成		S04|储备
 * @author：PtAu
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function prjStaFilter() {
		return function(input) {
			var prjStaList = [
			{"Log":"S00", "name": "正常"},
			{"Log":"S02", "name": "终止"},
			{"Log":"S03", "name": "完成"},
			{"Log":"S04", "name": "高风险"}
		]		
		
			if(input !== undefined) {
				for(var i=0;i<4;i++){
					if(prjStaList[i].Log == input){
						return prjStaList[i].name;
						break;
					}
				}
				return input;
			}
			
		};
	}
	ibsapp.filter('prjStaFilter', prjStaFilter);
})(window, window.vx);

/**
 * 性别
 * @author：PtAu
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function sexFilter() {
		return function(input) {
			if(input !== undefined) {
				if(input == '00'){
					return '男'
				}else{
					return '女'
				}
			}
		};
	}
	ibsapp.filter('sexFilter', sexFilter);
})(window, window.vx);

/**
 * 是否保代
 * @author：PtAu
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function paulFilter() {
		return function(input) {
			if(input !== undefined) {
				if(input == '00'){
					return '是'
				}else{
					return '否'
				}
			}
		};
	}
	ibsapp.filter('paulFilter', paulFilter);
})(window, window.vx);


/**
 * 是否
 * @author：PtAu
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function checkFilter() {
		return function(input) {
			if(input !== undefined) {
				if(input == 'Y'){
					return '是'
				}else if(input == 'N'){
					return '否'
				}else{
					return input
				}
			}
		};
	}
	ibsapp.filter('checkFilter', checkFilter);
})(window, window.vx);


/**
 * 所属行业
 * @author：PtAu
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function prjIndFilter() {
		return function(input) {
			//所属行业
			var prjIndList = [
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
			if(input !== undefined) {
				for(var i=0;i<19;i++){
					if(input == prjIndList[i].Id){
						return prjIndList[i].Name;
						break;
					}
				}
				return input;
			}
		};
	}
	ibsapp.filter('prjIndFilter', prjIndFilter);
})(window, window.vx);


/**
 * 部门--三个城市
 * @author：PtAu
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function prjdeptFilter() {
		return function(input) {
			// 部门
			var prjDeptList = [
				{"Id":"D01","Name":"上海"},
				{"Id":"D02","Name":"北京"},
				{"Id":"D03","Name":"深圳"}
			]
			if(input !== undefined) {
				for(var i=0;i<3;i++){
					if(input == prjDeptList[i].Id){
						return prjDeptList[i].Name;
						break;
					}
				}
				return input;
			}
		};
	}
	ibsapp.filter('prjdeptFilter', prjdeptFilter);
})(window, window.vx);


/**
 * 项目组成员职位
 * @author：PtAu
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function prjMemPosFilter() {
		return function(input) {
			// 部门
			var prjMemPosList = [
				{"Id":"P01","Name":"保荐代表人"},
				{"Id":"P02","Name":"项目协办人"},
				{"Id":"P03","Name":"文件管理员"},
				{"Id":"P04","Name":"项目负责人"},
				{"Id":"P05","Name":"持续督导专员"},
				{"Id":"P06","Name":"分管领导"},
				{"Id":"P07","Name":"秘书"},
				{"Id":"P08","Name":"质控审核员"},
				{"Id":"P09","Name":"项目成员"}
			]
			if(input !== undefined) {
				for(var i=0;i<9;i++){
					if(input == prjMemPosList[i].Id){
						return prjMemPosList[i].Name;
						break;
					}
				}
				return input;
			}
		};
	}
	ibsapp.filter('prjMemPosFilter', prjMemPosFilter);
})(window, window.vx);

/**
 * 业务提示状态
 * @author：PtAu
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function readSttFilter() {
		return function(input) {
			if(input !== undefined) {
				if(input == 'R01'){
					return "未读";
				}else{
					return "已读";
				}
				return input;
			}
		};
	}
	ibsapp.filter('readSttFilter', readSttFilter);
})(window, window.vx);


/**
 * 项目详情--审批状态阶段
 * @author：PtAu
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function auditPhaseFilter() {
		return function(input) {
			if(input !== undefined) {
				if(input == 'P01'){
					return "项目立项";
				}else if(input == 'P02'){
					return "申报评审";
				}else if(input == 'P03'){
					return "内核"
				}
				return input;
			}
		};
	}
	ibsapp.filter('auditPhaseFilter', auditPhaseFilter);
})(window, window.vx);


/**
 * 用印状态--材料上报查询
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function prjMaterialPrintFilter() {
		return function(input) {
			// 部门
			var prjMaterialPrintList = [
				{"Id":"WFPMISAPPMOD","Name":"申请"},
				{"Id":"WFPMISSEALSCHK1","Name":"项目组审核"},
				{"Id":"WFPMISSEALSCHK2","Name":"质控审核"},
				{"Id":"WFPMISSEALSDOW","Name":"秘书组下载用印"},
				{"Id":"WFPMISPASSED","Name":"审批通过"},
				{"Id":"WFPMISFAILED","Name":"拒绝"},
				{"Id":"UNSUIT","Name":"不适用"}
			]
			if(input !== undefined) {
				for(var i=0;i<7;i++){
					if(input == prjMaterialPrintList[i].Id){
						return prjMaterialPrintList[i].Name;
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
	ibsapp.filter('prjMaterialPrintFilter', prjMaterialPrintFilter);
})(window, window.vx);


/**
 * 是否复核告知--材料上报查询
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function MaterialIsReviewFilter() {
		return function(input) {
			if(input !== undefined) {
				if(input == 'Y'){
					return "是";
				}else if(input == 'N'){
					return "否";
				}else if(input == 'U'){
					return "不适用";
				}
				return input;
			}else{
				return '暂无'
			}
		};
	}
	ibsapp.filter('MaterialIsReviewFilter', MaterialIsReviewFilter);
})(window, window.vx);

/**
 * 报送状态--材料上报查询
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function MaterialrecheckNoticeSttFilter() {
		return function(input) {
			if(input !== undefined) {
				if(input == 'R01'){
					return "已报送";
				}else if(input == 'R02'){
					return "不再报送";
				}
				return input;
			}else{
				return '暂无'
			}
		};
	}
	ibsapp.filter('MaterialrecheckNoticeSttFilter', MaterialrecheckNoticeSttFilter);
})(window, window.vx);

/**
 * 文件类型--材料上报查询
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function prjMaterialTypeFilter() {
		return function(input) {
			// 部门
			var prjMaterialTypeList =[
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
						{"Id":"F46","Name":"问询反馈"},
						{"Id":"F50","Name":"立项受理审批附件"},
						{"Id":"F51","Name":"立项发布会议审批附件"},
						{"Id":"F52","Name":"立项会议结果审批附件"},
						{"Id":"F53","Name":"立项审批员审批意见审批附件"},
						{"Id":"F66","Name":"立项审批员审批意见回复附件"},
						{"Id":"F54","Name":"申报评审受理审批附件"},
						{"Id":"F55","Name":"申报评审发布会议审批附件"},
						{"Id":"F56","Name":"申报评审会议结果审批附件"},
						{"Id":"F57","Name":"申报评审审批员审批意见审批附件"},
						{"Id":"F67","Name":"申报评审审批员审批意见回复附件"},
						{"Id":"F58","Name":"内核受理审批附件"},
						{"Id":"F59","Name":"内核发布会议审批附件"},
						{"Id":"F60","Name":"内核会议结果审批附件"},
						{"Id":"F61","Name":"内核审批员审批意见审批附件"},
						{"Id":"F68","Name":"内核审批员审批意见回复附件"},
						{"Id":"F62","Name":"用印项目组审核附件"},
						{"Id":"F63","Name":"用印质控审核附件"},
						{"Id":"F64","Name":"挂网初审附件"},
						{"Id":"F65","Name":"挂网复审附件"}

					]
			if(input !== undefined) {
				for(var i=0;i<63;i++){
					if(input == prjMaterialTypeList[i].Id){
						return prjMaterialTypeList[i].Name;
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
	ibsapp.filter('prjMaterialTypeFilter', prjMaterialTypeFilter);
})(window, window.vx);


/**
 * 项目子阶段
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function prjSubPhaseListFilter() {
		return function(input) {
			// 部门
			var prjSubPhaseList = [
						{"Id":"A01","Name":"已保存"},
						{"Id":"A02","Name":"承揽"},
						{"Id":"A03","Name":"储备"},
						{"Id":"A04","Name":"申请立项提交"},
						{"Id":"A05","Name":"已立项"},
						{"Id":"A06","Name":"辅导"},
						{"Id":"A07","Name":"申请申报评审提交"},
						{"Id":"A08","Name":"申报评审通过"},
						{"Id":"A09","Name":"申请内核提交"},
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
						{"Id":"A33","Name":"持续督导"},
						{"Id":"A34","Name":"申请立项保存"},
						{"Id":"A35","Name":"申请申报评审保存"},
						{"Id":"A36","Name":"申请内核保存"}
					]
			if(input !== undefined) {
				for(var i=0;i<36;i++){
					if(input == prjSubPhaseList[i].Id){
						return prjSubPhaseList[i].Name;
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
	ibsapp.filter('prjSubPhaseListFilter', prjSubPhaseListFilter);
})(window, window.vx);

/**
 * 问询状态--问询检查
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function askStatusFilter() {
		return function(input) {
			if(input !== undefined) {
				if(input == 'A01'){
					return "等待回复";
				}else if(input == 'A02'){
					return "等待处理";
				}else if(input == 'A03'){
					return "结束问询";
				}
				return input;
			}else{
				return '暂无'
			}
		};
	}
	ibsapp.filter('askStatusFilter', askStatusFilter);
})(window, window.vx);

/**
 * 问询历史操作类型--问询检查
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function askHistoryOpFilter() {
		return function(input) {
			if(input !== undefined) {
				if(input == 'P01'){
					return "问询";
				}else if(input == 'P02'){
					return "回复";
				}
				return input;
			}else{
				return '暂无'
			}
		};
	}
	ibsapp.filter('askHistoryOpFilter', askHistoryOpFilter);
})(window, window.vx);

/**
 * 公共信息查询  -- 时点
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function msgTimePointFilter() {
		return function(input) {
			// 部门
			var msgTimePointList =[
						{"Id":"P01","Name":"报会前一天"},
						{"Id":"P02","Name":"每月"},
						{"Id":"P03","Name":"报送更新前一天"},
						{"Id":"P04","Name":"反馈回复文件前一天"},
						{"Id":"P05","Name":"初会审会前一天"},
						{"Id":"P06","Name":"发行期间"},
						{"Id":"P07","Name":"每季度"}
					]
			if(input !== undefined) {
				for(var i=0;i<43;i++){
					if(input == prjMaterialTypeList[i].Id){
						return prjMaterialTypeList[i].Name;
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
	ibsapp.filter('msgTimePointFilter', msgTimePointFilter);
})(window, window.vx);
/**
 * 公共信息查询  -- 项目类型
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function msgProjectTypeFilter() {
		return function(input) {
			// 部门
			var msgProjectTypeList =[
					{
					"msgProjectType": 'T01',
					"msgProjectTypeName": "公开信息查询"
					},
					{
					"msgProjectType": 'T02',
					"msgProjectTypeName": "在会审核项目"
					},
					{
					"msgProjectType": 'T03',
					"msgProjectTypeName": "发行中项目"
					},
					{
					"msgProjectType": 'T04',
					"msgProjectTypeName": "持续督导项目"
					},
					{
					"msgProjectType": 'T05',
					"msgProjectTypeName": "突发负面信息"
					}
					]
			if(input !== undefined) {
				for(var i=0;i<43;i++){
					if(input == prjMaterialTypeList[i].msgProjectType){
						return prjMaterialTypeList[i].msgProjectTypeName;
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
	ibsapp.filter('msgProjectTypeFilter', msgProjectTypeFilter);
})(window, window.vx);

/**
 * 证监会审核  -- 文件类型
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");
	function conReFileFilter() {
		return function(input) {
			// 部门
			var conReFileList = [
			{"id":"F48","Name":"证监会审核其它"},
			{
				"Name":"接收",
				"id":"F30"
			},{
				"Name":"受理",
				"id":"F02"
			},{
				"Name":"首次预披露",
				"id":"F29"
			},{
				"Name":"反馈",
				"id":"F31"
			},{
				"Name":"反馈回复",
				"id":"F47"
			},{
				"Name":"口头反馈",
				"id":"F04"
			},{
				"Name":"口头反馈回复",
				"id":"F05"
			},{
				"Name":"中止",
				"id":"F07"
			},{
				"Name":"恢复",
				"id":"F06"
			},{
				"Name":"撤回",
				"id":"F09"
			},{
				"Name":"终止审查通知书",
				"id":"F49"
			},{
				"Name":"反馈意见挂网",
				"id":"F33"
			},{
				"Name":"二次预披露",
				"id":"F32"
			},{
				"Name":"报送上会稿",
				"id":"F34"
			},{
				"Name":"初审会",
				"id":"F35"
			},{
				"Name":"收到告知函",
				"id":"F01"
			},{
				"Name":"告知函回复",
				"id":"F36"
			},{
				"Name":"批文",
				"id":"F40"
			},{
				"Name":"举报信核查",
				"id":"F10"
			},{
				"Name":"不予核准函",
				"id":"F08"
			}
		]
			if(input !== undefined) {
				for(var i=0;i<43;i++){
					if(input == conReFileList[i].id){
						return conReFileList[i].Name;
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
	ibsapp.filter('conReFileFilter', conReFileFilter);
})(window, window.vx);

/**
 * 证监会审核  -- 提交状态
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function prjAuditStaFilter() {
		return function(input) {
			// 部门
			var conReFileList = [{
				"Name":"已提交",
				"id":"C"
			},{
				"Name":"已保存",
				"id":"S"
			}
		]
			if(input !== undefined) {
				for(var i=0;i<2;i++){
					if(input == conReFileList[i].id){
						return conReFileList[i].Name;
						break;
					}
				}
				return input;
			}else{
				return input
			}
		};
	}
	ibsapp.filter('prjAuditStaFilter', prjAuditStaFilter);
})(window, window.vx);
/**
 *    跑批类
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function runTaskFilter() {
		return function(input) {
			// 部门
			var runTaskList = [
			{"Id":"AskJobTask","Name":"问询检查"},
         {"Id":"PublishTask","Name":"发行上市处理"},
         {"Id":"SupervisionTask","Name":"持续督导"},
         {"Id":"TipsDailyTask","Name":"业务提示"},
         {"Id":"EvPerATask","Name":"高管视图个人活跃度"},
         {"Id":"EvProATask","Name":"高管视图项目活跃度"},
         {"Id":"EvProRTask","Name":"高管视图项目统计"}
		]
			if(input !== undefined) {
				for(var i=0;i<7;i++){
					if(input == runTaskList[i].Id){
						return runTaskList[i].Name;
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
	ibsapp.filter('runTaskFilter', runTaskFilter);
})(window, window.vx);

/**
 *    跑批状态类
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function runTaskStateFilter() {
		return function(input) {
			// 部门
			var runTaskStateList = [
			{"Id":"B00","Name":"跑批待处理"},
         {"Id":"B01","Name":"跑批中"},
         {"Id":"B02","Name":"跑批异常结束"},
         {"Id":"B03","Name":"跑批成功结束"}  
		]
			if(input !== undefined) {
				for(var i=0;i<4;i++){
					if(input == runTaskStateList[i].Id){
						return runTaskStateList[i].Name;
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
	ibsapp.filter('runTaskStateFilter', runTaskStateFilter);
})(window, window.vx);

/**
 *    证监会4种状态
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function perMetTypeFilter() {
		return function(input) {
			// 部门
			var runTaskStateList = [{
								"Name": "通过",
								"id": "C01"
							}, {
								"Name": "未通过",
								"id": "C02"
							}, {
								"Name": "暂缓表决",
								"id": "C03"
							}, {
								"Name": "取消审核",
								"id": "C04"
							}
				
						]
			if(input !== undefined) {
				for(var i=0;i<4;i++){
					if(input == runTaskStateList[i].id){
						return runTaskStateList[i].Name;
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
	ibsapp.filter('perMetTypeFilter', perMetTypeFilter);
})(window, window.vx);

/**
 *    证监会4种状态
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function askRecordFilter() {
		return function(input) {
			// 部门
			var askRecordList = [{
								"Name": "问询",
								"id": "P01"
							}, {
								"Name": "回复",
								"id": "P02"
							}
				
						]
			if(input !== undefined) {
				for(var i=0;i<2;i++){
					if(input == askRecordList[i].id){
						return askRecordList[i].Name;
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
	ibsapp.filter('askRecordFilter', askRecordFilter);
})(window, window.vx);

/**
 *    businessType
 * @author：dy
 */
(function(window, vx) {
	'use strict';
	var ibsapp = vx.module("ibsapp.libraries");

	function businessTypeFilter() {
		return function(input) {
			// 部门
			var businessTypeList = [
								 {"Name": "项目承揽","id": "T01"},
								 {"Name": "尽职调查","id": "T02"}, 
								 {"Name": "项目立项","id": "T03"}, 
								 {"Name": "项目辅导 ","id": "T04"}, 
								 {"Name": "项目申报评审","id": "T05"}, 
								 {"Name": "内核","id": "T06"}, 
								 {"Name": "证监会审核","id": "T07"}, 
								 {"Name": "发行上市","id": "T08"}, 
								 {"Name": "持续督导","id": "T09"}, 
								 {"Name": "复核告知","id": "T10"}, 
								 {"Name": "用印材料","id": "T11"}, 
								 {"Name": "其他材料","id": "T12"}, 
								 {"Name": "工作日志","id": "T13"}, 
								 {"Name": "检查问询","id": "T14"}, 
								 {"Name": "问询反馈","id": "T15"}, 
								 {"Name": "重大事项调整","id": "T16"}, 
								 {"Name": "挂网材料","id": "T17"}, 
								 {"Name": "外勤调查","id": "T18"}, 
								 {"Name": "审批","id": "T19"}, 
								 {"Name": "公开信息查询","id": "T20"}
						]
			if(input !== undefined) {
				for(var i=0;i<20;i++){
					if(input == businessTypeList[i].id){
						return businessTypeList[i].Name;
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
	ibsapp.filter('businessTypeFilter', businessTypeFilter);
})(window, window.vx);