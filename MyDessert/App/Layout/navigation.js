(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Navigation', Navigation);

    Navigation.$inject = ['$route', '$location', 'routeHelper', 'sessionService', 'authenticationService', 'config'];

    function Navigation($route, $location, routeHelper, sessionService, authenticationService, config) {

        var vm = this;

        vm.version = config.version;
        vm.isLoggedIn = isLoggedIn;
        vm.username = sessionService.getUsername;
        vm.logout = logout;
        vm.isAuthorized = isAuthorized;


        var routes = routeHelper.getRoutes();

        init();

        function init() {
            getNavRoutes();
        }

        function getNavRoutes() {
            vm.navRoutes = routes.filter(function (rt) {
                return rt.settings && rt.settings.navOrder;
            }).sort(function (route1, route2) {
                return route1.settings.navOrder - route2.settings.navOrder;
            });
        }

        function isAuthorized(route) {

            return route &&
                route.access.allowAnonymousAccess ||
                (!route.access.allowAnonymousAccess && sessionService.isLoggedIn());
        }

        function isLoggedIn() {
            
            return sessionService.isLoggedIn();
        }

        function logout() {

            authenticationService.logout();

            $location.path('/desserts');
        }
    }

})();