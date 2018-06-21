/**
 * @author HQC
 * @description 刻度尺
 * <input type="text" v-model="Amount" ui-scale="199000" base-scale="1000" initial-value="8" data-initial='true' main-value="0" class="zhiquts_01 add">
 */
(function(window, vx, undefined) {
    'use strict';
    var directive = {};
    directive.uiScale = [
        '$compile',
        function($compile) {
            return {
                restrict: 'A',
                require: 'ngModel',
                /*template : '<div class="page" data-page="profile1">'
                		+ '<div class="page-main">'
                		+ '<div class="row">'
                		+ '<label for="" class="label">我要买<span class="number width-num" v-bind="Amount|number:0"></span><span class="letter">元</span> </label>'
                		+ '<div class="ruler ruler-height">'
                		+ '<div class="main" value="-1">'
                		+ '<ul data-initial="true">'
                		+ '<li class="keduc" id="keduc" v-repeat="row in scaleList"><span class="num" v-bind="row.scaleNum"></span></li>'
                		+ '</ul>'
                		+ '</div>'
                		+ '<div class="arrow"></div>'
                		+ '</div>' + '</div>' + '</div>',*/
                link: function(scope, element, attrs) {
                    var totalScale = parseInt(scope.$eval(attrs.uiScale)),
                        scaleList = [],
                        baseScale = parseInt(scope.$eval(attrs.baseScale));
                    // 创建刻度尺
                    function createScale() {
                        var temp = '<div class="page" data-page="profile1" id="scale">' +
                            '<div class="page-main">' +
                            '<div class="row">' +
                            '<label class="label">我要买<span class="number width-num" v-bind="' + attrs.ngModel + '|number:0" v-click="showNumBtn=true;" v-show="!showNumBtn"></span><input type="number" class="number width-num" v-blur="changeAmount()" v-model="' + attrs.ngModel + '" v-show="showNumBtn"/><span class="letter">元</span> </label>' +
                            '<div style="width:100%;height: 3rem;z-index:20;position: absolute;" v-show="showNumBtn" v-click="undisCal()"></div>' +
                            '<div class="ruler ruler-height">' +
                            '<div class="main" value="-1">' +
                            '<ul data-initial="true">' +
                            '<li class="keduc" id="keduc" v-repeat="row in scaleList"><span class="num" v-bind="row.scaleNum"></span></li>' +
                            '</ul>' +
                            '</div>' +
                            '<div class="arrow"></div>' +
                            '</div>' + '</div>' + '</div>';
                        var coutemp = $(temp);
                        $(element).css("display", "none");
                        $(element).after(coutemp);
                        $compile(coutemp)(scope);
                    };
                    scope.undisCal = function() {
                        if (scope.showNumBtn) {
                            scope.showNumBtn = false;
                        }
                    }
                    scope.changeAmount = function() {
                        scope.undisCal();
                        var amount = parseInt(scope[attrs.ngModel] / (baseScale / 10)) * (baseScale / 10);
                        if (amount < 0) {
                            amount = 0;
                        } else if (amount > totalScale) {
                            amount = totalScale;
                        }
                        scope[attrs.ngModel] = amount;
                        $('.ruler .main').css({
                            '-webkit-transform': 'translateX(' + (parseInt(init_x) * mulriple - amount / 10) + 'px)'
                        });
                        attrs.mainValue = (parseInt(init_x) * mulriple - amount / 10);
                    };
                    createScale();
                    for (var i = 0; i < totalScale; i += baseScale) {
                        scaleList.push({
                            "scaleNum": i + baseScale
                        });
                    }
                    scope.scaleList = scaleList;
                    var end = -100 * (scaleList.length) +
                        $(document).width() / 2; // 结束偏移坐标范围
                    // 不能继续往右边滑动了
                    var start = Math.ceil($(document).width() / 2); // 开始偏移坐标范围
                    // 不能继续往左边滑动了
                    var mulriple = 1; // 1000像素有4个像素的误差 *mulriple 1040
                    var init_x = $(document).width() / 2; // 初始位置
                    // 刚进入页面刻度尺坐标值
                    var uiValue = scope.$eval(attrs.ngModel);
                    scope[attrs.ngModel] = scope.$eval(attrs.ngModel);
                    var startX, moveEndX;
                    // 偏移量
                    var minmul = Math.round(10 - $(document).width() / 2 % 10);
                    minmul = minmul == 10 ? 0 : minmul;
                    $('.ruler .main').css({
                        '-webkit-transform': 'translateX(' + (parseInt(init_x) * mulriple - uiValue / 10) + 'px)'
                    });
                    var scaleEle = $(element.next("#scale").find(".ruler"));
                    attrs.mainValue = (parseInt(init_x) * mulriple - uiValue / 10);
                    // console.log(attrs.mainValue);
                    scaleEle.bind({
                        "touchstart": function(e) {
                            var initial = attrs.initial || true;
                            e.stopPropagation();
                            if (initial == 'true') {
                                startX = e.originalEvent.touches[0].pageX;
                                attrs.initial = false;
                            } else {
                                startX = e.originalEvent.touches[0].pageX;
                            }
                            e.preventDefault();
                        },
                        "touchmove": function(e) {
                            // 鼠标移动事件监听
                            var number = parseInt(uiValue);
                            // 移动结束X坐标
                            moveEndX = e.originalEvent.changedTouches[0].pageX;
                            var moveDistince = moveEndX - startX;
                            var left = (startX - moveEndX) < 0;
                            // 判断往左边滑动还是右边滑动
                            if (left) {
                                // 刻度尺偏移量
                                var offset = parseInt((moveEndX - startX) / 10) + parseInt(attrs.mainValue);
                                // console.log(offset);
                                if (offset - start >= 0) {
                                    scaleEle.find(".main").css({
                                        '-webkit-transform': 'translateX(' + start + 'px)'
                                    });
                                    attrs.mainValue = start;
                                    scope[attrs.ngModel] = Math.abs(start * 10);
                                    scope.$apply();
                                } else {
                                    // 移动刻度尺
                                    //scaleEle.find(".main").css({'-webkit-transform' : 'translateX(' + offset * mulriple+ 'px)'});
                                    scaleEle.find(".main").css({
                                        '-webkit-transform': 'translateX(' + (offset * mulriple - minmul) + 'px)'
                                    });
                                    attrs.mainValue = offset;
                                    scope[attrs.ngModel] = Math.abs(Math.ceil((start - offset) / 10)) * 100;
                                    scope.$apply();
                                }
                            } else {
                                var offset = (parseInt(attrs.mainValue) + moveDistince / 10).toFixed(0);
                                // console.log(offset);
                                if (offset - end <= 0) {
                                    // 移动到最右边 不能再移动
                                    end = offset < end ? end : offset;
                                    scaleEle.find(".main").css({
                                        '-webkit-transform': 'translateX(' + end * mulriple + 'px)'
                                    });
                                    attrs.mainValue = end;
                                    scope[attrs.ngModel] = Math.abs((start - offset) * 100 / 10);
                                    scope.$apply();
                                } else {
                                    // 没有移动到最右边
                                    //scaleEle.find(".main").css({'-webkit-transform' : 'translateX(' + offset * mulriple + 'px)'});
                                    scaleEle.find(".main").css({
                                        '-webkit-transform': 'translateX(' + (offset * mulriple - minmul) + 'px)'
                                    });
                                    attrs.mainValue = offset;
                                    scope[attrs.ngModel] = Math.abs(Math.ceil((start - offset) / 10)) * 100;
                                    scope.$apply();
                                }

                            }
                        },
                        "touchend": function(e) {
                            var offset = parseInt(attrs.mainValue);
                            if (parseInt(offset - end) <= 0) {
                                scope[attrs.ngModel] = Math.abs(Math.floor(start - end) * 1000 / 100);
                                scope.$apply();
                                scaleEle.find(".main").css({
                                    '-webkit-transform': 'translateX(' + end * mulriple + 'px)'
                                });
                                attrs.mainValue = end;
                            } else if (parseInt(offset - start) >= 0) {
                                scaleEle.find(".main").css({
                                    '-webkit-transform': 'translateX(' + start * mulriple + 'px)'
                                });
                                attrs.mainValue = start;
                                scope[attrs.ngModel] = Math.abs((start - offset) * 100 / 10);
                                scope.$apply();
                            } else {
                                offset = Math.ceil((offset * mulriple / 10)) * 10;
                                scope[attrs.ngModel] = Math.abs(Math.ceil((start - offset) / 10)) * 100;
                                scaleEle.find(".main").css({
                                    '-webkit-transform': 'translateX(' + (offset * mulriple - minmul) + 'px)'
                                });
                                attrs.mainValue = offset;
                                scope.$apply();
                            }
                            e.preventDefault();
                        }
                    });
                }
            };

        }
    ];
    ibsapp.directive(directive);
})(window, window.vx);
/**
 * @author HQC
 * @description 标题栏浮动;
 */
(function(window, vx, undefined) {
    'use strict';
    var directive = {};
    directive.uiTitleFixed = ['$compile', function($compile) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                // 标题栏高度
                var height = $(element).height();
                //						var height = $(element).height(), startY, moveEndY, topT=0, maxH=document.body.clientHeight-screen.height;
                // 标题栏浮动
                var temp = $($(element).context.outerHTML.replace('ui-title-fixed=""', 'style="position:fixed;z-index:99;top:0;left:-1px;height:' + height + 'px"'));
                $(element).hide();
                $(element).after(temp);
                $compile(temp)(scope);
                /*element.closest('body').bind({
                	"touchstart" : function(e) {
                		startY = e.originalEvent.touches[0].pageY
                	},
                	"touchmove" : function(e) {
                		moveEndY = e.originalEvent.changedTouches[0].pageY-startY;
                		topT+=moveEndY;
                		if(topT-maxH>maxH){
                			topT = 0;
                		}else if(topT-maxH<0){
                			topT = 0;
                		}
                		console.log(topT);
                	},
                	"touchend" : function(e) {
                	}
                });*/
            }
        };

    }];
    ibsapp.directive(directive);
})(window, window.vx);
/**
 * @author HQC
 * @description 可拖动浮窗
 */
(function(window, vx, undefined) {
    'use strict';
    var directive = {};
    directive.drag = [
        '$compile',
        function($compile) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var _mv = false,
                        _obj = $(element); //移动标记
                    var _x, _y, _z = _obj.css("z-index"),
                        _wid = _obj.width(),
                        _hei = _obj.height(); //鼠标离控件左上角的相对位置
                    var docE = document.documentElement;
                    element.css({
                        "user-select": "none",
                        "-webkit-user-select": "none",
                        "-moz-user-select": "none",
                        "-webkit-touch-callout": "none"
                    });
                    element
                        .bind({
                            "touchstart": function(e) {
                                $("body").css({
                                    "overflow-y": "hidden",
                                    "position": "relative"
                                });
                                _mv = true;
                                var leftD = parseInt(_obj.css("left"));
                                var left = isNaN(leftD) ? (docE.clientWidth - parseInt(_obj.css("right")) - _wid) : leftD;
                                _x = e.originalEvent.touches[0].pageX - parseInt(left); //获得左边位置
                                _y = e.originalEvent.touches[0].pageY - parseInt(_obj.css("top")); //获得上边位置
                                _obj.css({
                                    "z-index": _z - (-1)
                                }).fadeTo(20, .6); //点击后开始拖动并透明显示
                            },
                            "touchmove": function(e) {
                                if (_mv) {
                                    var x = e.originalEvent.changedTouches[0].pageX - _x; //移动时根据鼠标位置计算控件左上角的绝对位置
                                    if (x <= 0) {
                                        x = 0
                                    };
                                    x = Math.min(docE.clientWidth - _wid, x) - 5;
                                    var y = e.originalEvent.changedTouches[0].pageY - _y;
                                    if (y <= 0) {
                                        y = 0
                                    };
                                    y = Math.min(docE.clientHeight - _hei, y) - 5;
                                    _obj.css({
                                        top: y,
                                        left: x
                                    }); //控件新位置
                                }
                            },
                            "touchend": function(e) {
                                $("body").css({
                                    "overflow-y": "auto"
                                });
                                _mv = false;
                                _obj.fadeTo(10, 1); //松开鼠标后停止移动并恢复成不透明
                            }
                        });
                }
            };

        }
    ];
    ibsapp.directive(directive);
})(window, window.vx);
