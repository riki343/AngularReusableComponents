(function () {
    angular.module('riki34.angular.spinner').controller('SpinnerController', SpinnerController);

    SpinnerController.$inject = [
        '$scope',
        'spinner'
    ];

    function SpinnerController($scope, spinner) {
        var self = this;
        this.spinner = false;

        spinner.onPromisesStart($scope, function () {
            self.spinner = true;
        });

        spinner.onPromisesEnd($scope, function () {
            self.spinner = false;
        });
    }
})();