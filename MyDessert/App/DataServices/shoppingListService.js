(function () {
    'use strict';

    angular
        .module('app.dataServices')
        .factory('shoppingListService', shoppingListService);

    shoppingListService.$inject = ['$http', '$q', 'sessionService'];

    function shoppingListService($http, $q, sessionService) {
        var service = {
            getData: getData,
            addToList: addToList,
            removeIngredient: removeIngredient
        };

        return service;

        function getData() {

            var user = sessionService.getUsername();

            var deferred = $q.defer();

            var result = MockShoppingLists.data.filter(function (item) {
                return item.user === user;
            });

            deferred.resolve({ 'code': 200, 'status': 'OK', 'data': result[0].shoppingList });

            return deferred.promise;
        }

        function addToList(shoppingListEntry) {

            var user = sessionService.getUsername();

            var deferred = $q.defer();

            for (var i = 0; i < MockShoppingLists.data.length; i++) {

                var userList = MockShoppingLists.data[i];

                if (userList.user === user) {

                    if (userList.shoppingList.map(function (el) { return el.recipeName }).indexOf(shoppingListEntry.recipeName) < 0) {
                        userList.shoppingList.push(shoppingListEntry);
                    }
                }
            }

            deferred.resolve({ 'code': 200, 'status': 'OK' });

            return deferred.promise;

        }

        function removeIngredient(ingredient) {

            var user = sessionService.getUsername();

            var deferred = $q.defer();

            for (var i = 0; i < MockShoppingLists.data.length; i++) {

                var userList = MockShoppingLists.data[i];

                if (userList.user === user) {

                    for (var j = 0; j < userList.shoppingList.length; j++) {

                        var ingredientList = userList.shoppingList[j];

                        var index = ingredientList.ingredients.indexOf(ingredient);

                        if (index > -1) {
                            ingredientList.ingredients.splice(index, 1);

                            break;
                        }
                    }
                }
            }

            var result = MockShoppingLists.data.filter(function (item) {
                return item.user === user;
            });

            deferred.resolve({ 'code': 200, 'status': 'OK', 'data': result[0].shoppingList });

            return deferred.promise;
        }
    }
})();