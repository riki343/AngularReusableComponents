(function () {
    angular.module('riki34.angular.notifier').controller('NotificationsController', NotificationsController);

    NotificationsController.$inject = [
        '$scope',
        'notificationService'
    ];

    function NotificationsController($scope, notificationService) {
        var self = this;
        this.notifications = {};

        this.removeNotification = removeNotification;
        this.getNotifications = getNotifications;

        function removeNotification(index, isError) {
            notificationService.removeNotification(index, isError);
        }

        function getNotifications() {
            self.notifications = notificationService.getNotifications();
        }

        notificationService.onNotificationsChanged($scope, function () {
            self.notifications = notificationService.getNotifications();
        });

        getNotifications();
    }
})();