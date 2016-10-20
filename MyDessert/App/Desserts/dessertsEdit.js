(function () {
    'use strict';

    angular
        .module('app.desserts')
        .controller('DessertsEdit', DessertsEdit);

    DessertsEdit.$inject = ['$routeParams', 'dessertsService'];

    function DessertsEdit($routeParams, dessertsService) {

        var vm = this;
        vm.ingredients = [];
        vm.addIngredient = addIngredient;
        vm.removeIngredient = removeIngredient;
        vm.addNewRecipe = addNewRecipe;

        init();

        function init() {


        }

        function addIngredient(ingredient) {

            if (!ingredient) {
                return;
            }

            if (vm.ingredients.indexOf(ingredient) > -1) {
                common.showWarningMessage("Ingredient already in the list!");
                return;
            }

            vm.ingredients.push(ingredient);
            // Clear the add ingredients box
            vm.ingredient = "";

        }

        function removeIngredient(ingredient) {

            var index = vm.ingredients.indexOf(ingredient);

            vm.ingredients.splice(index, 1);
        }

        function addNewRecipe() {
            dessertsService.addRecipe()
                .then(function (response) {
                    if (response.status === "OK") {

                        common.showSuccessMessage("Recipe added!");

                    } else {
                        common.showErrorMessage(response.Message);
                    }
                },
                function (response) {
                    common.showErrorMessage(response.Message);
                });
        }
    }
})();
