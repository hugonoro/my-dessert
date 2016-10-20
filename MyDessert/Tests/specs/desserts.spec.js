describe("app.desserts", function () {
    "use strict";

    var controller, dessertsService, common, $filter, $location, $q, $rootScope;

    // Fake route provider and inject needed dependencies
    beforeEach(function () {
        module('app', function ($provide) {
            specHelper.fakeRouteProvider($provide);
        });
        inject(function (_$controller_, _$rootScope_, _$q_, _$filter_, _$location_, _dessertsService_, _common_) {

            $q = _$q_;
            $rootScope = _$rootScope_;
            $location = _$location_;
            $filter = _$filter_;
            dessertsService = _dessertsService_;
            common = _common_;

            controller = _$controller_('Desserts', {
                $filter: $filter,
                dessertsService: dessertsService,
                common: common
            });

        });
    });

    describe('getData', function () {

        var def;

        beforeEach(function () {

            def = $q.defer();

            spyOn(dessertsService, 'getData').and.returnValue(def.promise);

        });

        it('should set the list of desserts on controller init', function () {

            def.resolve({
                status: "OK"
            });

            $rootScope.$apply();

            expect(controller.desserts.length).toBeGreaterThan(0);
        });
    });
});