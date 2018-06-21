
/**
 * @author yoyo.liu
 * @name ui-submit
 * @description 提交表单验证
 * <form name="form1" novalidate ui-submit="doIt()">
 * <div>
 * <div>卡号</div>
 * <div><input type="text" name="AcNo" v-model="AcNo"  ui-validate required></div>
 * </div>
 * <input type="submit" value="提交">
 * </form>
 */

(function(window, vx, undefined) {
	'use strict';
	vx.module("ui.libraries")
	.directive("uiSubmit",uiSubmit);
 	uiSubmit.$inject=['$nativeCall'];
 	function uiSubmit($nativeCall) {
 		return function(scope, element, attrs) {
 			element.bind('submit', function(event) {
 				var form = scope[attrs.name];
 				var inputCtrls = attrs.$$element[0];
 				for(var i = 0; i < inputCtrls.length; i++) {
 					var ctrl = inputCtrls[i];
 					if(['input', 'select'].indexOf(ctrl.tagName.toLowerCase()) !== -1) {
 						ctrl.blur();
 					}
 					var validateAttr = ctrl.getAttribute("validate") || true;
					//默认原输入域的验证属性
					if((ctrl.nodeName === "BUTTON") || (validateAttr === 'false') || ctrl.type==='checkbox') {
						continue;
					}
					var message = {
						required : ctrl.getAttribute("required-message") || "不能为空",
						min : ctrl.getAttribute("min-message") || "最小值:" + ctrl.getAttribute("min"),
						max : ctrl.getAttribute("max-message") || "最大值:" + ctrl.getAttribute("max"),
						minlength : ctrl.getAttribute("minlength-message") || "最小长度:" + ctrl.getAttribute("minLength"),
						maxlength : ctrl.getAttribute("maxlength-message") || "最大长度:" + ctrl.getAttribute("maxLength"),
						pattern : ctrl.getAttribute("pattern-message") || "格式不正确",
						number: "格式不正确"
					};
					var ctrlName = ctrl['name'] || ctrl['id'];
					var ctrlComment = ctrl.parentNode.previousElementSibling ? ctrl.parentNode.previousElementSibling.innerText  : ctrl.placeholder;
					//var ctrlComment = "[" + ctrl.parentNode.previousElementSibling.innerText + "]  ";
					for(var key in form.$error) {
						for(var j = 0; j < form.$error[key].length; j++) {
							if(ctrlName == form.$error[key][j].$name) {
								$nativeCall.Alert(ctrlComment + message[key]);
								return;
							}
						}
					}
				}
				scope.$apply(attrs.uiSubmit);
				event.stopPropagation();
				event.preventDefault();
			});
 		};
 	}
 })(window, window.vx);


/**
 * @author yoyo.liu
 * @param {Object} window
 * @param {Object} vx
 * 输入框右侧校验ui-validate
 * <input type="text" name="AcNo" v-model="AcNo" ui-validate required>
 */
(function(window, vx) {
	'use strict';
	vx.module("ui.libraries")
	.directive("uiValidate",uiValidate);
 	uiValidate.$inject=['$compile', '$log'];
 	function uiValidate($compile, $log) {
 		return {
			restrict : 'EA',
			//transclude : true, // It transcludes the contents of the directive into the template
			//replace : false, // The element containing the directive will be replaced with the template
			//templateUrl : 'lib/template/blurError/blurError.html',
			//require: 'ngModel',
			controller : ['$scope', '$element', '$attrs',
			function(scope, element, attr) {
				this.message = {};
				this.message["zh_CN"] = {
					required : attr["requiredMessage"] || "不能为空",
					min : attr["minMessage"] || "最小值:" + attr["ngMin"],
					max : attr["maxMessage"] || "最大值:" + attr["ngMax"],
					minlength : attr["minlengthMessage"] || "最小长度:" + attr["ngMinlength"],
					maxlength : attr["maxlengthMessage"] || "最大长度:" + attr["ngMaxlength"],
					pattern : attr["patternMessage"] || "格式不正确",
					"default" : "格式不正确"
				};
				this.message["en"] = {
					required : attr["requiredMessageEn"] || "required invalid",
					min : attr["minMessageEn"] || "min value:" + attr["ngMin"],
					max : attr["maxMessageEn"] || "max value:" + attr["ngMax"],
					minlength : attr["minlengthMessageEn"] || "min length:" + attr["ngMinlength"],
					maxlength : attr["maxlengthMessageEn"] || "max length:" + attr["ngMaxlength"],
					pattern : attr["patternMessageEn"] || "pattern invalid",
					"default" : "pattern invalid"
				};
			}],
			link : function(scope, element, attr, ctrl) {
				var controls = element.controller('form');
				var formName = controls.$name;
				//var valObj = vx.element('<span>&nbsp;<img src="images/gou_01.png" width="16" height="16" v-show="' + formName + '.' + attr.name + '.$dirty&&' + formName + '.' + attr.name + '.$valid"/>&nbsp;<span v-show="' + formName + '.' + attr.name + '.$dirty&&' + formName + '.' + attr.name + '.$invalid&&' + formName + '.' + attr.name + '.uiValidateMsg"><img src="images/ico_10.png" width="16" height="16"/><span v-bind="' + formName + '.' + attr.name + '.uiValidateMsg"></span></span></span>');
				// element.after(valObj);
				// $compile(valObj.contents())(scope);

				var message = ctrl.message;
				var ctrlName = attr['name'] || attr['id'];
				var lang = attr.language || scope["language"] || "zh_CN";
				//取域的title值
				var ctrlComment = lang === "en" ? "[" + (attr['title_en'] || ctrlName) + "]  " : "[" + (attr['title_zh'] || attr.title || ctrlName) + "]  ";
				element.bind("change",function(a){
					var model = scope[formName][attr.name];
					if (!model.$dirty)
						return;
					for (var key in model.$error) {
						if (model.$error[key]) {
							var errMessageAttrName = lang === "en" ? key + "MessageEn" : key + "Message";
							var errMessage = message[lang][key] || attr[errMessageAttrName] || message[lang]['default'];
							model["uiValidateMsg"] = errMessage;
							//scope.$apply();
							$log.error("ui-validate error:" + ctrlComment + errMessage);
							scope.$apply();
							return;
						}
					}

				})
				// scope.$watch(function() {
				// 	return scope[attr.name];
				// }, function(newVal, oldVal, scope) {
				// 	var model = scope[formName][attr.name];
				// 	if (!model.$dirty)
				// 		return;
				// 	for (var key in model.$error) {
				// 		if (model.$error[key]) {
				// 			var errMessageAttrName = lang === "en" ? key + "MessageEn" : key + "Message";
				// 			var errMessage = message[lang][key] || attr[errMessageAttrName] || message[lang]['default'];
				// 			model["uiValidateMsg"] = errMessage;
				// 			//scope.$apply();
				// 			$log.error("ui-validate error:" + ctrlComment + errMessage);
				// 			return;
				// 		}
				// 	}
				// });
			}
		};
 	}
})(window, window.vx);



/*
 * 失去焦点事件
 * @author yoyo.liu
 * @param {Object} window
 * @param {Object} vx
 * 输入框失去焦点触发
 */
(function(window,vx,$){
 	'use strict';
 	vx.module("ui.libraries").directive("uiBlur",uiBlur);
 	// uiBlur.$inject=[];
 	function uiBlur() {
 		return { 
 			restrict: 'A', 
 			link: function(scope, element, attr, ctrl) {
 				var uiBlur=attr.uiBlur;
 				element.bind("blur", function(e) { 
 					scope.$apply(uiBlur);
 				}); 
 			} 
 		}; 
 	}
 })(window,window.vx,window.$);