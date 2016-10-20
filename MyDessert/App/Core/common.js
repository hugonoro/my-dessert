(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('common', common);

    common.$inject = ['$alert'];

    function common($alert) {

        var service = {

            showSuccessMessage: showSuccessMessage,
            showErrorMessage: showErrorMessage,
            showWarningMessage: showWarningMessage
        };

        return service;

        function showAlert(alertSettings) {

            $alert(alertSettings);
        }

        function showErrorMessage(message) {
            showAlert({
                title: 'Error: ',
                content: message,
                container: '#alertContainer',
                type: 'danger',
                show: true
            });
        }


        function showWarningMessage(message) {
            showAlert({
                content: message,
                container: '#alertContainer',
                type: 'warning',
                show: true,
                dismissable: true,
                duration: 5
            });
        }


        function showSuccessMessage(message) {
            showAlert({
                title: 'Success: ',
                content: message,
                container: '#alertContainer',
                type: 'success',
                show: true,
                duration: 10
            });
        }
    }
})();