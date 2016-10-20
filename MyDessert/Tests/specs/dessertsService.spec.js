describe("app.dataServices", function () {
    "use strict";

    var $rootScope, dessertsService, sessionService;

    // Fake route provider and inject needed dependencies
    beforeEach(function () {
        module('app', function ($provide) {
            specHelper.fakeRouteProvider($provide);
        });
        inject(function (_$rootScope_, _dessertsService_, _sessionService_) {

            $rootScope = _$rootScope_;
            dessertsService = _dessertsService_;
            sessionService = _sessionService_;
        });
    });

    afterEach(function () {

    });

    describe('toggleCurrentlyBaking', function () {

        it('should return error message when trying to add more than 5 recipes to currently baking', function () {

            var response;

            dessertsService.toggleCurrentlyBaking(1);
            dessertsService.toggleCurrentlyBaking(2);
            dessertsService.toggleCurrentlyBaking(3);
            dessertsService.toggleCurrentlyBaking(4);
            dessertsService.toggleCurrentlyBaking(5);

            dessertsService.toggleCurrentlyBaking(6).then(function (result) {
                response = result;
            });

            $rootScope.$apply();
     
            expect(response.Message).toBe("You have exceed the maximum number of recipes. Please unselect at least one before proceeding");
        });

        it('should return addToShopping flag true when is baking less than 5 and is not duplicate', function () {

            var response;

            dessertsService.toggleCurrentlyBaking(1);
            dessertsService.toggleCurrentlyBaking(2);
            dessertsService.toggleCurrentlyBaking(3);

            dessertsService.toggleCurrentlyBaking(6).then(function (result) {
                response = result;
            });

            $rootScope.$apply();

            expect(response.data.addToShoppingList).toBeTruthy();
        });

        it('should return isCurrentlyBaking flag true when is baking less than 5 and is not duplicate', function () {

            var response;

            dessertsService.toggleCurrentlyBaking(5);
            dessertsService.toggleCurrentlyBaking(6);
            dessertsService.toggleCurrentlyBaking(7);

            dessertsService.toggleCurrentlyBaking(9).then(function (result) {
                response = result;
            });

            $rootScope.$apply();

            expect(response.data.isCurrentlyBaking).toBeTruthy();
        });
    });
});