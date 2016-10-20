(function () {
    'use strict';

    angular
        .module('app.shoppingList')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [

            {
                url: '/shopping-list',
                config: {
                    templateUrl: 'app/shoppingList/list.html',
                    controller: 'ShoppingList',
                    controllerAs: 'vm',
                    title: 'Shopping List',
                    access: {
                        allowAnonymousAccess: false
                    },
                    settings: {
                        navOrder: 3,
                        content: 'Shopping List'
                    }
                }
            }

        ];
    }

})();
