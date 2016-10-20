(function () {
    'use strict';

    angular
        .module('app.desserts')
        .controller('Desserts', Desserts);

    Desserts.$inject = ['$filter', 'dessertsService', 'common'];

    function Desserts($filter, dessertsService, common) {

        var vm = this;
        vm.title = 'Desserts';
        vm.desserts = [];

        init();

        function init() {

            getData();
        }

        function getData() {
            dessertsService.getData()
                .then(function (response) {
                    if (response.status === "OK") {

                        vm.desserts = response.data;

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
