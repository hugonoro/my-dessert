(function () {
    'use strict';

    angular
        .module('app.authentication')
        .controller('Authentication', Authentication);

    Authentication.$inject = ['$location', 'authenticationService', 'sessionService', 'common'];

    function Authentication($location, authenticationService, sessionService, common) {

        var vm = this;

        vm.login = login;

        function login() {

            // No details provided there's no point in proceeding with the request
            if (!vm.username || !vm.password ) {
                return;
            }

            authenticationService.login(vm).then(
                function (response) {
                    if (response.status === "OK") {
                        sessionService.setLoggedIn(vm.username, response.isLoggedIn);
                        $location.path("/desserts");
                    } else {
                        common.showErrorMessage("Wrong username and password combination, please try again");
                    }

                    vm.password = ""; // Don't fill password field in when displaying page
                },
                function (response) {

                    vm.password = ""; // Don't fill password field in
                    common.showErrorMessage("There was an error logging in: " + response.status);
                }
            );
        }
    }
})();