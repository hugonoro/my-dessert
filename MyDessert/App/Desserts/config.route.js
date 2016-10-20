(function () {
    'use strict';

    angular
        .module('app.desserts')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            
            {
                url: '/desserts',
                config: {
                    templateUrl: 'app/desserts/list.html',
                    controller: 'Desserts',
                    controllerAs: 'vm',
                    title: 'desserts',
                    access: {
                        allowAnonymousAccess: true
                    },
                    settings: {
                        navOrder: 1,
                        content: 'All Desserts'
                    }
                }
            },
            {
                url: '/desserts/edit',
                config: {
                    templateUrl: 'app/desserts/edit.html',
                    controller: 'DessertsEdit',
                    controllerAs: 'vm',
                    title: 'desserts',
                    access: {
                        allowAnonymousAccess: false
                    },
                    settings: {
                        navOrder: 2,
                        content: 'New Dessert'
                    }
                }
            },
            {
                url: '/desserts/details/:recipe',
                config: {
                    templateUrl: 'app/desserts/details.html',
                    controller: 'DessertsDetails',
                    controllerAs: 'vm',
                    title: 'desserts',
                    access: {
                        allowAnonymousAccess: true
                    },
                    settings: {}
                }
            }
        ];
    }

})();
