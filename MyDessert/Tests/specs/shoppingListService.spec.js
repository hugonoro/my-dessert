describe("app.dataServices", function () {
    "use strict";

    var $rootScope, shoppingListService, sessionService;

    // Fake route provider and inject needed dependencies
    beforeEach(function () {
        module('app', function ($provide) {
            specHelper.fakeRouteProvider($provide);
        });
        inject(function (_$rootScope_, _shoppingListService_, _sessionService_) {

            $rootScope = _$rootScope_;
            shoppingListService = _shoppingListService_;
            sessionService = _sessionService_;
        });
    });

    afterEach(function () {

    });

    describe('addToList', function () {

        it('should not add duplicate ingredients to an already existing recipe', function () {

            var response;

            var shoppingListEntry = {

                recipeName: "Recipe 1",
                ingredients: ["Ingredient 1", "Ingredient 2"]
            }

            spyOn(sessionService,"getUsername").and.returnValue("user1");

            shoppingListService.addToList(shoppingListEntry);

            shoppingListService.addToList(shoppingListEntry).then(function (result) {
                response = result;
            });

            $rootScope.$apply();

            var element = window.MockShoppingLists.data.filter(function(item){
                return item.user === "user1";
            })

            expect(element[0].shoppingList.length).toBe(1);
        });
    });
});
