(function () {
    'use strict';

    angular.module('app', [
       /* Cross App Modules */
        'app.core',
        //'app.widgets',

        /* Feature Modules */
        'app.authentication',
        'app.desserts',
        'app.shoppingList',
        'app.layout',
        'app.dataServices'
        
    ]);
})();
