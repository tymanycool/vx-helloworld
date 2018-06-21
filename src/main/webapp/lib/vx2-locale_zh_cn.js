/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/

(function(vx) {
	
    var locales = {};
    vx.module("ibsapp").value('$locale', locales);

    locales.id = "zh_CN";

    // data-time formats
    locales.DATETIME_FORMATS = {
        "TITLE" : ["年", "月", "日"],
        "MONTH" : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        "SHORTMONTH" : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        "DAY" : ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        "SHORTDAY" : ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        "AMPMS" : ["上午", "下午"],
        "medium" : "yyyy-M-d ah:mm:ss",
        "short" : "yy-M-d ah:mm",
        "fullDate" : "y年M月d日EEEE",
        "longDate" : "y年M月d日",
        "mediumDate" : "yyyy-M-d",
        "shortDate" : "yy-M-d",
        "mediumTime" : "ah:mm:ss",
        "shortTime" : "ah:mm"
    };

    // number formats
    locales.NUMBER_FORMATS = {
        "DECIMAL_SEP" : ".",
        "GROUP_SEP" : ",",
        "PATTERNS" : [{
            "minInt" : 1,
            "minFrac" : 0,
            "maxFrac" : 3,
            "posPre" : "",
            "posSuf" : "",
            "negPre" : "-",
            "negSuf" : "",
            "gSize" : 3,
            "lgSize" : 3
        }, {
            "minInt" : 1,
            "minFrac" : 2,
            "maxFrac" : 2,
            "posPre" : "\u00A4",
            "posSuf" : "",
            "negPre" : "\u00A4-",
            "negSuf" : "",
            "gSize" : 3,
            "lgSize" : 3
        }],
        "CURRENCY_SYM" : "¥"
    };

    /**
     * fields/messages for example $field("xxxx")/$msg("xxxx") or
     * $locale.FIELDS.xxxx/$locale.MESSAGES.xxxx
     */
    var fields = {}, messages = {};
    locales.FIELDS = fields;
    locales.MESSAGES = messages;
    messages["Currency"] = {
        "AUD" : "澳大利亚元",
        "CAD" : "加拿大元",
        "CHF" : "瑞士法郎",
        "CNY" : "人民币",
        "EUR" : "欧元",
        "GBP" : "英镑",
        "HKD" : "港币",
        "JPY" : "日元",
        "NZD" : "新西兰元",
        "SEK" : "瑞典克郎",
        "SGD" : "新加坡元",
        "USD" : "美元"
    };
	messages["idCard"] = {
		"00": "居民身份证",
		"01": "临时身份证",
		"03": "军人身份证",
		"04": "武警身份证",
		"05": "护照",
		"06": "港澳居民往来内地通行证/回乡证",
		"07": "台湾居民往来内地通行证",
		"08": "其他身份证明文件(个人)"
	};
	messages["BankAcType"] = {
		"01": "活期一本通",
		"02": "活期",
		"03": "借记卡",
		"04": "信用卡",
		"20": "定期一本通",
	};
    messages["RespeCertificateType"] = {
        "01" : "身份证"//,
        // "2" : "户口簿",
        // "3" : "护照",
        // "4" : "军官证",
        // "5" : "士兵证",
        // "6" : "警官证",
        // "7" : "港澳来往内地通行证",
        // "8" : "台湾来往内地通行证",
        // "9" : "外国人居留证",
        // "10" : "社会保障证",
        // "11" : "个人纳税证"    
      };
        /*star Level*/
   messages["StarLevel"]={
   	"1":"1星",
   	"2":"2星",
   	"3":"3星",
   	"4":"4星",
   	"5":"5星"
   };
   /*message send state*/
   messages["SendState"]={
   	"1":"已发送",
   	"9":"待发送"
   };
   /*message check state*/
   messages["ActivityAuthState"]={
   	"0":"待审核",
   	"1":"审核中",
   	"2":"审核未通过",
   	"3":"待发送",
   	"4":"未发送",
   	"5":"已发送"
   };
   /*活动管理-活动消息状态*/
   messages["ActivityMsgQryState"]={
   	"1":"审核中",
   	"2":"审核未通过",
   	"4":"待发送",
   	"5":"已发送"
   	//"已过期"
   };
   /*order classification*/
   messages["CashFlag"]={
   	"C":"钞",
   	"T":"汇"
   };
   /*order state*/
   messages["OrderOperaState"]={
   	"":"全部",
   	"0":"预订成功",
   	"1":"预订失败",
   	"2":"待处理",
   	"3":"预订取消"
   };
   /*GroupPurcState 1-待审核，2-审核未通过，3-审核通过，4-待上架，5-已上架，6-已售完，7-抢购商品*/  
   messages["GroupPurcState"]={
   	"1":"待审核",
   	"2":"审核未通过",
   	"4":"待上架",
   	"5":"已上架",
   	"6":"已售完",
   	"8":"已过期"
   };
   /*Goods opera manage GroupPurcState*/
  messages["GroupPurcState2"]={
   	"1":"审核中",
   	"2":"审核未通过",
   	//"3":"审核通过",
   	"4":"待上架",
   	"5":"已上架",
   	"6":"已售完",
   	"7":"已过期",
   	"8":"待复核"
   };
   /*订单状态*/
	messages["State"] = {
		"0":"支付成功",//完成
		"1":"待支付",
		"2":"支付失败",
		"3":"交易未明",
		"4":"已退款",
		"5":"退款未明",
		"6":"取消",
		"11":"已消费"
	};
   messages["CertificateType"] = {
        "1" : "身份证",
        "2" : "营业执照证书"
    };
   /*shop state*/
   messages["ShopState"] = {
        "1" : "审核中",
        "2" : "审核不通过",
        "3" : "审核通过",
        "4" : "没有申请店铺"
    };
    /*Shop Identify state*/
   messages["resultCode"] = {
        "50" : "认证中",
        "100" : "认证未通过",
        "150" : "未认证",
        "200" : "认证通过"
    };
    /*商户类型*/
    messages["MerchantKindType"] = {
        "1" : "个人商户",
        "2" : "企业商户"
    };
    /*G团购订单管理状态*/
   messages["GroupOrderState"] = {
   		""   : "全部",
   		"1"  : "待支付",
   		"2"  : "支付失败",
   		"10" : "待消费",
   		"11" : "已消费",
   		"4"  : "已退款",
   		"21" : "退款中"
   };
   /*团购 订单 type*/
   messages["OrderType"] = {
		"1" : "团购",
		"2" : "二维码" 
	};
	/*订单状态*/
	messages["OrderState"]={
			"null" : "未消费",
			"0" : "已消费"
	};
	/*性别*/
	messages["Sex"]={
			"1" : "男",
			"2" : "女"
	};
	/*预订座位类型*/
	messages["SeatType"]={
			"1" : "包间",
			"2" : "大堂"
	};
	/*外卖订单管理订单状态*/
	messages["TakeOutOrderType"]={
			"0": "线上支付完成",//(待接单)
		    "1": "待支付",
		    "2": "支付失败",
		    "3": "交易未明",
		    "4": "已退款",
		    "5": "退款未明",
		    "6": "线下支付客户确认完成",
		    "7": "线下支付批量确认完成",
		    "8": "待发货",//（）未发货
		    "9": "配送中",//（）已发货
		    "10": "未收货",//(待消费)
		    "11": "完成订单",//(已消费，)已收货
		    "12": "已退货",
		    "13": "已过期",//（团购券过期指超过使用时间，电商外卖过期指支付过期"）
		   	"14": "退款中",
		    "15": "支付中",
		    "16": "已评论",
		    "17": "客户申请退货",
		    "19": "已接单",
		    "20": "已拒绝",
		    "21": "取消中",
		    "22": "已取消",
		    "23": "退货中",
		    "24": "冻结",
		    "25": "线下支付，货到付款"//（待接单）
	};
	/*电商类商品订单状态-筛选条件*/
	messages["EcomOrderType"]={
			"1" : "待支付（等待买家付款）",
			"8" : "待发货",
			"21": "取消中",
			"22": "已取消",
			"9" : "配送中",
			"11": "完成订单",
			"23": "退货中（退货申请、退货确认）",
			"12": "已退货",
			"13": "已过期",
			"24": "冻结"
	};
	/*即时抢购维护-审核状态*/
	messages["SaleState"]={
			"1" : "待审核",
			"2" : "审核未通过",
			"3" : "审核通过"
	};
	/*即时抢购维护-抢购状态*/
	messages["FlashState"]={
			"1" : "未开抢",
			"2" : "抢购中",
			"3" : "抢购结束"
	};
	/*外卖订单管理-支付方式*/
	messages["TakeAwayOrderType"]={
			"0" : "货到付款",
			"1" : "在线支付",
			//"01": "货到付款&在线支付"
	};
	/*外卖订单管理-配送方式*/
	messages["TakeAwayPostType"]={
			"0" : "自取",
			"1" : "商家配送",
			//"01": "自取&商家配送"
	};
	/*外卖订单管理-配送方式*/
	messages["EcomPostType"]={
			"0" : "自取",
			"1" : "物流配送",
	};
	/*商品订单管理-自取方式-订单显示*/
	messages["EcomSendType"]={
			"9" : "已备好"
	};
	/*商户装修-店铺装修-美食大类分类*/
	messages["ClassIfIcation"]={
			"B000" : "餐饮美食",
			"C000" : "酒店住宿",
			"D000" : "周边旅游",
			"E000" : "便民服务",
			"F000" : "特色产品",
			"G000" : "休闲娱乐"
	};
	//高管视图项目类
    messages["ManageViewProject"]={
			"C01" : "IPO",
			"C02" : "再融资",
			"C03" : "并购重组",
			"C04" : "债券",
			"C05" : "其他"
	};
	messages["ChangeViewProject"]={
			"IPO" : "C01",
			"再融资" : "C02",
			"并购重组" : "C03",
			"债券" : "C04",
			"其他" : "C05"
	};
	//图表数据域
	messages["ProjectState"]={
			"S1" : "已挂牌",
			"S2" : "发行中",
			"S3" : "在会中",
			"S4" : "已立项",
			"S5" : "撤回末通过"
	};
	//项目类型
	messages["ProjectType"]={
			"P00" : "非公开发行",
			"P01" : "IPO",
			"P02" : "公开增发",
			"P03" : "可转债",
			"P04" : "配股",
			"P05" : "非公开",
			"P06" : "优先股非公开",
			"P07" : "重组",
			"P08" : "借壳类重组",
			"P09" : "公司债券",
			"P10" : "金融债",
			"P11" : "一般财务顾问",
			"P12" : "恢复上市",
			"P13" : "收购"
	};
	messages["ChangeProjectType"]={
			"非公开发行" : "P00",
			"IPO" : "P01",
			"公开增发" : "P02",
			"可转债" : "P03",
			"配股" : "P04",
			"非公开" : "P05",
			"优先股非公开" : "P06",
			"重组" : "P07",
			"借壳类重组" : "P08",
			"公司债券" : "P09",
			"金融债" : "P10",
			"一般财务顾问" : "P11",
			"恢复上市" : "P12",
			"收购" : "P13"
	};
	//项目阶段
	messages["ProjectPhase"]={
			"C" : "项目承揽",
			"D" : "尽职调查",
			"L" : "项目立项",
			"F" : "项目辅导",
			"S" : "项目申报评审",
			"N" : "内核 ",
			"Z" : "证监会审核",
			"X" : "发行上市",
			"J" : "持续监导",
			"H":"实施"

	};
	messages["ChangeProjectPhase"]={
			"项目承揽" : "C",
			"尽职调查" : "D",
			"项目立项" : "L",
			"项目辅导" : "F",
			"项目申报评审" : "S",
			"内核" : "N",
			"证监会审核" : "Z",
			"发行上市" : "X",
			"持续监导" : "J",
			"实施":"H"
	};
	//面板
	messages["StockMarket"]={
			'M00':'主板',
			"M01" : "上交所主板",
			"M02" : "深交所主板",
			"M03" : "深交所创业板",
			"M04" : "深交所中小板"
	};
	messages["ChangeStockMarket"]={
			"主板":'M00',
			"上交所主板" : "M01",
			"深交所主板" : "M02",
			"深交所创业板" : "M03",
			"深交所中小板" : "M04"
	};
	//部门
	messages["Department"]={
			"D01" : "上海",
			"D02" : "北京",
			"D03" : "深圳"
	};
	messages["ChangeDepartment"]={
			"上海" : "D01",
			"北京" : "D02",
			"深圳" : "D03"
	};
	//操作类型
	messages["OperationState"]={
			"O01" : "审批次数",
			"O02" : "承揽",
			"O03" : "尽职调查",
			"O04" : "立项目申请",
			"O05" : "项目申报评审",
			"O06" : "内核申请",
			"O07" : "证监会审核",
			"O08" : "反馈记录",
			"O09" : "挂网申请",
			"O10" : "用印申请",
			"O11" : "复核告知",
			"O12" : "工作日志",
			"O13" : "外勤调查",
			"O14" : "公开信息查询",
			"O15" : "项目问询",
			"O16" : "被退回"
	};
})(window.vx);
