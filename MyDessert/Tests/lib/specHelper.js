
var specHelper = (function () {

    var service = {
        fakeRouteProvider: fakeRouteProvider
    };

    return service;

    function fakeRouteProvider($provide) {

        $provide.provider('$route', function () {

            var config = jasmine.createSpy('config');

            this.$get = function () {

                return {

                };
            };
        });
    }
}());