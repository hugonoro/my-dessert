(function () {
    'use strict';

    angular
        .module('app.core')
        .provider('routeHelperConfig', routeHelperConfig)
        .factory('routeHelper', routeHelper);


    routeHelper.$inject = ['$route', '$rootScope', '$location', 'routeHelperConfig', 'sessionService'];

    function routeHelperConfig() {

        this.config = {

        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }

    function routeHelper($route, $rootScope, $location, routeHelperConfig, sessionService) {

        var routes = [];
        var $routeProvider = routeHelperConfig.config.$routeProvider;

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes
        };


        init();

        return service;

        function configureRoutes(routes) {
            routes.forEach(function (route) {
                route.config.resolve = angular.extend(route.config.resolve || {}, routeHelperConfig.config.resolveAlways);
                $routeProvider.when(route.url, route.config);
            });

            $routeProvider.otherwise({ redirectTo: '/desserts' });
        }

        function getRoutes() {
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }

        function handleRoutingErrors() {
            $rootScope.$on('$routeChangeError',
                function (event, current, previous, rejection) {
                    //TODO
                });
        }

        function handleUnauthorizedRoutingRequests() {
            $rootScope.$on('$routeChangeStart',
                function (event, current, previous, rejection) {

                    if (current.access !== undefined) {
                        if (!current.access.allowAnonymousAccess && !sessionService.isLoggedIn()) {
                            event.preventDefault();
                            $location.path("/login");
                        }
                    }

                    if (current.settings !== undefined) {
                        current.settings.curPage = true;
                    }
                    if (previous && previous.settings !== undefined) {
                        previous.settings.curPage = false;
                    }
                });
        }

        function init() {
            handleUnauthorizedRoutingRequests();
            handleRoutingErrors();
        }
    }


})();