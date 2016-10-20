(function () {

    'use strict';

    var core = angular.module('app.core');

    var config = {
        appTitle: 'My Dessert',
        version: 1.0
    }

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$routeProvider', 'routeHelperConfigProvider'];

    function configure($routeProvider, routeHelperConfigProvider) {

        //Configure the common route provider
        routeHelperConfigProvider.config.$routeProvider = $routeProvider;

        var resolveAlways = {
            ready: function () {
                //Add here any logic for resolving dependencies in the config phase (e.g. finishing loading bootstrap data)
            }
        };

        routeHelperConfigProvider.config.resolveAlways = resolveAlways;
    }

})();