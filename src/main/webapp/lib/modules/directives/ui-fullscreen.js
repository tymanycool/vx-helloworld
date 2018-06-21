vx.module('ui.libraries')
	.directive('uiFullscreen', ['$document', '$window', function ($document, $window) {
		return {
			restrict: 'AC',
			template: '<i class="fa fa-expand fa-fw text"></i><i class="fa fa-compress fa-fw text-active"></i>',
			link: function (scope, el, attr) {
				el.addClass('hide');
				if (IsPC()) {
					// disable on ie11
					if (screenfull.enabled && !navigator.userAgent.match(/Trident.*rv:11\./)) {
						el.removeClass('hide');
					}
					el.on('click', function () {
						var target;
						attr.target && ( target = $(attr.target)[0] );
						screenfull.toggle(target);
					});
					//兼容IE9修改
					screenfull.raw && $document.on(screenfull.raw.fullscreenchange, function () {
						if (screenfull.isFullscreen) {
							el.addClass('active');
						} else {
							el.removeClass('active');
						}
					});
				}
				function IsPC() {
					var userAgentInfo = navigator.userAgent;
					var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
					var flag = true;
					for (var v = 0; v < Agents.length; v++) {
						if (userAgentInfo.indexOf(Agents[v]) > 0) {
							flag = false;
							break;
						}
					}
					return flag;
				}

			}
		};
	}]);
