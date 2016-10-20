(function () {
    'use strict';

    angular
        .module('app.shoppingList')
        .controller('ShoppingList', ShoppingList);

    ShoppingList.$inject = ['shoppingListService'];

    function ShoppingList(shoppingListService) {

        var vm = this;
        vm.shoppingList = null;
        vm.removeIngredient = removeIngredient;

        init();

        function init() {
            getData();
        }

        function getData() {

            shoppingListService.getData()
               .then(function (response) {
                   if (response.status === "OK") {

                       vm.shoppingList = response.data;

                   } else {
                       common.showErrorMessage(response.Message);
                   }
               },
               function (response) {
                   common.showErrorMessage(response.Message);
               });
        }

        function removeIngredient(ingredient) {

            shoppingListService.removeIngredient(ingredient)
               .then(function (response) {
                   if (response.status === "OK") {

                       vm.shoppingList = response.data;

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
