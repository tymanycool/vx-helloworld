/**
 * @author xuxihai
 * @description 刻度尺
 * <input type="text" v-model="Amount" ui-scale="199000" base-scale="1000" initial-value="8" data-initial='true' main-value="0" class="zhiquts_01 add">
 */
(function (window, vx, undefined) {
	'use strict';
	var directive = {};
	var MINSCALEPX = 10; //精度对应的长度,最小刻度像素10px
	var RESPLEVEL = 10; //移动一格的进度系数,越大越慢(该值可以调解灵敏度)
	directive.uiScale2 = [
		'$compile',
		function ($compile) {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function (scope, element, attrs) {
					var totalScale = parseInt(scope.$eval(attrs.uiScale2)),
						ngModel = attrs.ngModel,
						baseScale = parseInt(scope.$eval(attrs.baseScale)),
						minScaleValue = baseScale / 10;

					// 输入框失去焦点时置下方触摸有效
					scope.undisCal = function () {
						if (scope.showNumBtn) {
							scope.showNumBtn = false;
						}
					};
					// 失去焦点时事件
					scope.changeAmount = function () {
						var init_x = $(document).width() / 2;// 初始位置
						scope.undisCal();
						scope[attrs.ngModel] = scope[attrs.ngModel] ? scope[attrs.ngModel] : 0;
						var amount = parseInt(scope[attrs.ngModel] / (baseScale / 10)) * (baseScale / 10);
						if (amount < 0) {
							amount = 0;
						} else if (amount > totalScale) {
							amount = totalScale;
						}
						scope[attrs.ngModel] = amount;
						$('.ruler .main').css({'-webkit-transform': 'translateX(' + (parseInt(init_x) - amount / 10) + 'px)'});
						attrs.mainValue = (parseInt(init_x) - amount / 10);
					};

					init();

					function init() {
						createScale();

						var startX, moveEndX, window_width, start, end, init_x, uiValue, pos_x, scaleEle, scaleList = [];
						for (var i = 0; i < totalScale; i += baseScale) { //10小格，即一大格
							scaleList.push({
								"scaleNum": i + baseScale
							});
						}
						scope.scaleList = scaleList;
						window_width = $(document).width();
						start = Math.ceil(window_width / 2);// 开始偏移坐标范围 left
						//每小格MINSCALEPX大小,10小格，即一大格,scaleList.length总大格数
						end = -MINSCALEPX * 10 * (scaleList.length) + window_width / 2;// 结束偏移坐标范围 right
						init_x = window_width / 2;// 初始位置
						uiValue = scope.$eval(ngModel); // 刚进入页面刻度尺显示值
						attrs.currentPosx = pos_x = parseInt(init_x) - uiValue / minScaleValue * MINSCALEPX;
						$('.ruler .main').css({
							'-webkit-transform': 'translateX(' + pos_x + 'px)'
						});
						scaleEle = $(element.next().find(".ruler"));

						scaleEle.bind({
							"touchstart": function (e) {
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
							"touchmove": function (event) {
								var moveDistince,
									position,//移动后的计算位置
									viewNumbers; //移动最小精度的间隔数
								moveEndX = event.originalEvent.changedTouches[0].pageX;
								moveDistince = moveEndX - startX;
								position = attrs.currentPosx + moveDistince / RESPLEVEL; //RESPLEVEL移动系数，计算移动后的位置
								if (position < end) { //超出最大刻度
									position = end; //reset Max Value
								} else if (position > start) { //reset 0   超出最小刻度
									position = start;
								}
								viewNumbers = Math.round((position - start) / MINSCALEPX); //刻度尺显示位置到０的格数
								scaleEle.find(".main").css({
									'-webkit-transform': 'translateX(' + position + 'px)'
								});
								attrs.currentPosx = position; //记录该次位置
								attrs.viewNumbers = viewNumbers;
								scope[ngModel] = -viewNumbers * minScaleValue; //保存数据
								scope.$apply();
							},
							"touchend": function (event) {

								var viewNumbers,//刻度尺显示位置到０的格数
									position; //移动后的位置
								viewNumbers = attrs.viewNumbers;
								position = viewNumbers * MINSCALEPX + start;
								scaleEle.find(".main").css({
									'-webkit-transform': 'translateX(' + position + 'px)'
								});
							}
						});
					}

					// 创建刻度尺
					function createScale() {
						var temp = '' +
							'<div class="page" data-page="profile1" id="scale">' +
							'   <div class="page-main">' +
							'       <div class="row">' +
							'           <label class="label">我要买' +
							'           <span class="number width-num" v-bind="' + ngModel + '|number:0" v-click="showNumBtn=true;" v-show="!showNumBtn"></span>' +
							'           <input type="number" class="number width-num" v-focus="' + ngModel + '=undefined;" v-blur="changeAmount()" v-model="' + ngModel + '" v-show="showNumBtn"/>' +
							'           <span class="letter">元</span> </label>' +
							'           <div style="width:100%;height: 3rem;z-index:20;position: absolute;" v-show="showNumBtn" v-click="undisCal()"></div>' +
							'           <div class="ruler ruler-height">' +
							'               <div class="main" value="-1">' +
							'                   <ul data-initial="true">' +
							'                       <span class="strnum">0</span>' +
							'                       <li class="keduc" id="keduc{{$index+1}}" v-repeat="row in scaleList" v-class="$index==0?\'first\':\'\'">' +
							'                           <span class="num" v-bind="row.scaleNum"></span>' +
							'                       </li>' +
							'                   </ul>' +
							'               </div>' +
							'           <div class="arrow"></div>' +
							'       </div>' +
							'   </div>' +
							'</div>';
						var coutemp = $(temp);
						$(element).css("display", "none");
						$(element).after(coutemp);
						$compile(coutemp)(scope);
					}

				}
			};

		}];
	vx.module('ibsapp').directive(directive);
})(window, window.vx);
