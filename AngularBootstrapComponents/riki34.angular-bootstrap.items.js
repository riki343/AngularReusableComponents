/**
 * @author riki34
 * @email vladislav.kosko@gmail.com
 */

(function (angular) {
    if (typeof angular === 'undefined') {
        throw 'This module require AngularJS and Bootstrap';
    }

    angular
        .module('riki34.angular-bootstrap.items', [])
        .config(Config)
        .directive('riki34List', riki34List)
    ;

    Config.$inject = [ '$interpolateProvider' ];
    function Config($interpolateProvider) {
        $interpolateProvider.startSymbol('{{');
        $interpolateProvider.endSymbol('}}');
    }

    riki34List.$inject = [];
    function riki34List() {
        var template =
                '<div class="list-group custom-scroll {{ listClass }}">' +
                '<h4 align="center" ng-if="listTitle" class="list-group-item list-group-item-heading list-group-item-info" ng-bind="listTitle"></h4>' +
                '<div ng-style="{ \'max-height\': height }" style="overflow-y: scroll; overflow-x: hidden;">' +
                '<a class="list-group-item {{ itemClass }}" style="cursor: pointer;"' +
                'ng-repeat="item in list"' +
                'ng-class="{ \'active\': selection.item === item }"' +
                'ng-click="selection.item = (selection.item !== item) ? item : null;">' +
                '<span ng-show="ordered" ng-bind="($index + 1) + \'. \'"></span>' +
                '<span ng-bind="item.text"></span>' +
                '</a>' +
                '</div>' +
                '</div>'
            ;

        function Link($scope, $element, $attrs) {
            $scope.list = [];
            $scope.selection = { 'item': null };

            $scope.$watch('items', function (newValue, oldValue) {
                $scope.list = [];
                var index = 0;
                angular.forEach(newValue, function (val) {
                    if (angular.isDefined($scope.itemField)) {
                        this.push({ 'text': val[$scope.itemField], 'index': index });
                    } else {
                        this.push({ 'text': val, 'index': index });
                    }
                    index++;
                }, $scope.list)
            });
        }

        return {
            'template': template,
            'link': Link,
            'scope': {
                'items': '=items',
                'ordered': '=ordered',
                'height': '@',
                'itemField': '@',
                'listClass': '@',
                'itemClass': '@',
                'listTitle': '@'
            }
        };
    }
})(angular);