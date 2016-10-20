(function () {
    'use strict';

    angular
        .module('app.desserts')
        .controller('DessertsDetails', DessertsDetails);

    DessertsDetails.$inject = ['$routeParams', 'dessertsService', 'shoppingListService','sessionService', 'common'];

    function DessertsDetails($routeParams, dessertsService, shoppingListService,sessionService, common) {

        var vm = this;
        vm.toggleCurrentlyBaking = toggleCurrentlyBaking;
        vm.isLoggedIn = isLoggedIn;
        

        init();

        function init() {

            getDetails();
        }

        function getDetails() {

            var recipe = $routeParams.recipe;

            dessertsService.getDetails(recipe)
                .then(function (response) {
                    if (response.status === "OK") {

                        vm.dessert = response.data;

                    } else {
                        common.showErrorMessage(response.Message);
                    }
                },
                function (response) {
                    common.showErrorMessage(response.Message);
                });
        }

        function toggleCurrentlyBaking(recipeId) {

            dessertsService.toggleCurrentlyBaking(recipeId)
                .then(function (response) {
                    if (response.status === "OK") {

                        if (response.data.addToShoppingList) {

                            var shoppingListEntry = {
                                
                                recipeName: response.data.recipe.name,
                                ingredients: response.data.recipe.ingredients
                            }

                            shoppingListService.addToList(shoppingListEntry);
                        }

                    } else {
                        common.showErrorMessage(response.Message);
                    }
                },
                function (response) {
                    common.showErrorMessage(response.Message);
                });
        }

        function isLoggedIn() {
            return sessionService.isLoggedIn();
        }
    }
})();
