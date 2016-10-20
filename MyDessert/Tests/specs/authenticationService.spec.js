describe("app.dataServices", function () {
    "use strict";

    var  $rootScope, authenticationService, sessionService;

    // Fake route provider and inject needed dependencies
    beforeEach(function () {
        module('app', function ($provide) {
            specHelper.fakeRouteProvider($provide);
        });
        inject(function (_$rootScope_, _authenticationService_, _sessionService_) {
   
            $rootScope = _$rootScope_;
            authenticationService = _authenticationService_;
            sessionService = _sessionService_;
        });
    });

    afterEach(function () {

    });

    describe('login', function () {

        it('should return logged in true when successfully authenticated', function () {

            var response;

            authenticationService.login({username:'user1',password:'password1'}).then(function (result) {
                response = result;
            });

            $rootScope.$apply();
 
            expect(response.isLoggedIn).toBeTruthy();
        });

        it('should return logged in false when authentication failed', function () {

            var response;

            authenticationService.login({ username: 'user12', password: 'password112' }).then(function (result) {
                response = result;
            });

            $rootScope.$apply();

            expect(response.isLoggedIn).toBeFalsy();
        });
    });

    describe('logout', function () {

        it('should clear session storage on logout', function () {

            spyOn(sessionService, 'clearLoggedIn');

            authenticationService.logout();

            expect(sessionService.clearLoggedIn).toHaveBeenCalled();
        });
    });
});