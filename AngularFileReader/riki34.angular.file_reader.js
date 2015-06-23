(function (angular) {
    if (typeof angular === 'undefined') {
        throw 'AngularJS not found. File reader requires AngularJS';
    }

    angular.module('riki34.angular.file_reader', []).factory('fileReaderService', fileReaderService);

    fileReaderService.$inject = [
        '$q'
    ];

    function fileReaderService($q) {
        var self = this;

        var factory = {
            'readAsDataURL': readAsDataURL
        };

        return factory;

        function onLoad(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        }

        function onError(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        }

        function onProgress($scope) {
            return function (event) {
                $scope.$broadcast("fileProgressChanged", { total: event.total, loaded: event.loaded });
            };
        }

        function getReader(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(scope);
            return reader;
        }

        function readAsDataURL(file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);

            return deferred.promise;
        }
    }
})(angular);