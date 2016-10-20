(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('MasterPage', MasterPage);


    MasterPage.$inject = ['config'];

    function MasterPage(config) {

        var vm = this;

        vm.title = config.appTitle;
        vm.busyMessage = 'Loading...';
        vm.searchQuery = '';
    }

})();
