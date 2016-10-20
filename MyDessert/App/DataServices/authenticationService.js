(function () {
    'use strict';

    angular
        .module('app.dataServices')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', '$q', 'sessionService'];

    function authenticationService($http, $q, sessionService) {

        var service = {
            login: login,
            logout: logout

        };

        return service;

        function login(loginDetails) {

            var deferred = $q.defer();

            var user = MockUserData.data.filter(function (item) {
                return item.username === loginDetails.username && item.password === loginDetails.password;
            });

            if (user.length > 0) {

                deferred.resolve({ 'code': 200, 'status': 'OK', 'isLoggedIn': true });
            } else {
                deferred.resolve({ 'code': 401, 'status': 'Unauthorized', 'isLoggedIn': false });
            }

            return deferred.promise;
        }

        function logout() {

            sessionService.clearLoggedIn();
        }
    }

})();