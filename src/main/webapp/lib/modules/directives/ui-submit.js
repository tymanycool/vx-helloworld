/**
 * @author yoyo.liu
 * @param  window
 * @param  vx
 * 输入框右侧校验ui-submit
 */
(function (window, vx) {
	'use strict';
	var directive = {};
	directive.uiSubmit = ['$compile', '$log',
		function ($compile, $log) {
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
						minlength : ctrl.getAttribute("minlength-message") || "最小长度:" + ctrl.getAttribute("v-minlength"),
						maxlength : ctrl.getAttribute("maxlength-message") || "最大长度:" + ctrl.getAttribute("v-maxlength"),
						pattern : ctrl.getAttribute("pattern-message") || "格式不正确",
						email : ctrl.getAttribute("email-message") || "格式不正确"
					};
					var ctrlName = ctrl['name'] || ctrl['id'];
					var ctrlComment;
					//var ctrlComment = ctrl.parentNode.children ? "[" + ctrl.parentNode.children[1].innerText + "]  " : ctrl.placeholder;
					//var ctrlComment = "[" + ctrl.parentNode.previousElementSibling.innerText + "]  ";
					//从js角度兼容特殊情况eg,忘记密码的验证码字段，添加自定义属性 validate-msg （也可以从从css角度修改）
					if(ctrl.getAttribute('validate-msg')){
						ctrlComment = "[" +ctrl.getAttribute('validate-msg')+"]";
					}
					for(var key in form.$error) {
						for(var j = 0; j < form.$error[key].length; j++) {
							if(ctrlName == form.$error[key][j].$name) {
								var json = {
										title:'提示',
										content:ctrlComment + message[key]
								}
								scope.$alert(json);
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
		}];
	vx.module('ibsapp').directive(directive);
})(window, window.vx);