vx.module('ui.libraries')
	.run(['$anchorScroll', function ($anchorScroll) {
		$anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
	}])
	.directive('uiScrollTo', ['$location', '$anchorScroll', function ($location, $anchorScroll) {
		return {
			restrict: 'AC',
			link: function (scope, el, attr) {
				el.on('click', function (e) {
					$location.hash(attr.uiScrollTo);
					$anchorScroll(50);
					attr.callback && scope.$eval(attr.callback);
				});
			}
		};
	}]);
