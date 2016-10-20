(function () {
    'use strict';

    angular
        .module('app.dataServices')
        .factory('dessertsService', dessertsService);

    dessertsService.$inject = ['$http', '$q'];

    function dessertsService($http, $q) {

        var currentlyBaking = [];

        var service = {
            getData: getData,
            addRecipe: addRecipe,
            getDetails: getDetails,
            toggleCurrentlyBaking: toggleCurrentlyBaking
        };

        return service;

        function getData() {

            var deferred = $q.defer();

            deferred.resolve(MockDessertList);

            return deferred.promise;
        }

        function addRecipe() {

            var deferred = $q.defer();

            deferred.resolve({ 'code': 200, 'status': 'OK' });

            return deferred.promise;
        }

        function getDetails(recipe) {

            var deferred = $q.defer();

            var dessertDetails = MockDessertList.data.filter(function (item) {

                return item.friendlyName === recipe;
            });

            deferred.resolve({ 'code': 200, 'status': 'OK', 'data': dessertDetails[0] });

            return deferred.promise;
        }

        function toggleCurrentlyBaking(recipeId) {

            var deferred = $q.defer();

            var response = {
                recipe: {},
                addToShoppingList: false,
                isCurrentlyBaking: false
            };

            if (currentlyBaking.indexOf(recipeId) < 0) {
                if (currentlyBaking.length === 5) {

                    deferred.resolve({ 'code': 409, 'status': 'Conflict', 'Message': 'You have exceed the maximum number of recipes. Please unselect at least one before proceeding' });

                    return deferred.promise;
                } else {

                    currentlyBaking.push(recipeId);
                }
            }

            for (var i = 0; i < MockDessertList.data.length; i++) {

                var recipe = MockDessertList.data[i];

                if (recipe.id === recipeId) {

                    if (recipe.isCurrentlyBaking) {

                        var index = currentlyBaking.indexOf(recipe.id);

                        currentlyBaking.splice(index, 1);
                    } else {
                        response.isCurrentlyBaking = true;
                        response.recipe = angular.copy(recipe);
                        response.addToShoppingList = true;
                    }

                    recipe.isCurrentlyBaking = !recipe.isCurrentlyBaking;
                    break;
                }
            }

            deferred.resolve({ 'code': 200, 'status': 'OK', 'data': response});

            return deferred.promise;

        }
    }
})();