(function () {
    'use strict';

    angular
        .module('app.authentication')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/login',
                config: {
                    templateUrl: 'app/authentication/login.html',
                    controller: 'Authentication',
                    controllerAs: 'vm',
                    title: 'login',
                    access: {
                        allowAnonymousAccess: true
                    },
                    settings: {}
                }
            }
        ];
    }


})();
