
vx.module('ui.bootstrap.alert', [])

.controller('AlertController', ['$scope', '$attrs', function($scope, $attrs) {
    $scope.closeable = 'close' in $attrs;
    this.close = $scope.close;
}])

.directive('alert', function() {
    return {
        restrict: 'EA',
        controller: 'AlertController',
        template:'<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissable\' : null]" role="alert">\
            <button ng-show="closeable" type="button" class="close" ng-click="close()">\
            <span aria-hidden="true">&times;</span>\
            <span class="sr-only">Close</span>\
            </button>\
            <div ng-transclude></div>\
            </div>',
        transclude: true,
        replace: true,
        scope: {
            type: '@',
            close: '&'
        }
    };
})

.directive('dismissOnTimeout', ['$timeout', function($timeout) {
    return {
        require: 'alert',
        link: function(scope, element, attrs, alertCtrl) {
            $timeout(function() {
                alertCtrl.close();
            }, parseInt(attrs.dismissOnTimeout, 10));
        }
    };
}]);
