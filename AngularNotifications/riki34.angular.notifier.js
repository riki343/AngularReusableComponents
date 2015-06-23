(function (angular) {
    if (typeof angular === 'undefined') {
        throw 'AngularJS not found. Notifier requires AngularJS';
    }

    angular.module('riki34.angular.notifier', []).factory('notificationService', notificationService);

    notificationService.$inject = [
        '$rootScope',
        '$q'
    ];

    function notificationService($rootScope, $q) {
        var self = this;
        this.notifications = {
            'error': [],
            'success': []
        };

        var factory = {
            'getNotifications': getNotifications,
            'addNotifications': addNotifications,
            'addNotification': addNotification,
            'handleNotifications': handleNotifications,
            'removeNotification': removeNotification,
            'onNotificationsChanged': onNotificationsChanged
        };

        return factory;

        function getNotifications() {
            return self.notifications;
        }

        function handleNotifications(data) {
            if (data.data.messages.length > 0) {
                if (data.data.error == -1) {
                    addNotifications(data.data.messages, false);
                } else {
                    addNotifications(data.data.messages, true)
                }
            }
            return data.data.object;
        }

        function addNotifications(notifications, isError) {
            var key = (isError) ? 'error' : 'success';
            for (var i = 0; i < notifications.length; i++) {
                if (self.notifications[key].indexOf(notifications[i]) == -1) {
                    self.notifications[key].push(notifications[i]);
                }
            }
            $rootScope.$broadcast('onNotificationsChanged');
        }

        function addNotification(notification, isError) {
            var key = (isError) ? 'error' : 'success';
            if (self.notifications[key].indexOf(notification) == -1) {
                self.notifications[key].push(notification);
            }
            $rootScope.$broadcast('onNotificationsChanged');
        }

        function removeNotification(index, isError) {
            var key = (isError) ? 'error' : 'success';
            self.notifications[key].splice(index, 1);
            $rootScope.$broadcast('onNotificationsChanged');
        }

        function onNotificationsChanged($scope, handler) {
            $scope.$on('onNotificationsChanged', handler());
        }
    }
})(angular);