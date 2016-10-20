describe("app.authentication", function () {
    "use strict";

    var controller, authenticationService, sessionService, common, $location, $q, $rootScope;

    // Fake route provider and inject needed dependencies
    beforeEach(function () {
        module('app', function ($provide) {
            specHelper.fakeRouteProvider($provide);
        });
        inject(function (_$controller_, _$rootScope_, _$q_, _$location_, _authenticationService_, _sessionService_, _common_) {

            $q = _$q_;
            $rootScope = _$rootScope_;
            $location = _$location_;
            authenticationService = _authenticationService_;
            sessionService = _sessionService_;
            common = _common_;

            controller = _$controller_('Authentication', {
                $location: $location,
                authenticationService: authenticationService,
                sessionService: sessionService,
                common: common
            });

        });
    });

    describe('login', function () {

        var def;

        beforeEach(function () {

            def = $q.defer();

            spyOn(authenticationService, 'login').and.returnValue(def.promise);

            controller.username = "user";
            controller.password = "password";

            controller.login();
        });

        it('should display error message on failed login', function () {

            spyOn(common, 'showErrorMessage');

            def.resolve({
                status: "Unauthorized"
            });

            $rootScope.$apply();

            expect(common.showErrorMessage).toHaveBeenCalledWith('Wrong username and password combination, please try again');
        });

        it('should redirect to desserts page on success', function () {

            def.resolve({
                status: "OK"
            });

            $rootScope.$apply();

            expect($location.path()).toEqual('/desserts');
        });

        it('should store credentials in session storage on success', function () {

            spyOn(sessionService, 'setLoggedIn');

            def.resolve({
                status: "OK",
                isLoggedIn: true

            });

            $rootScope.$apply();

            expect(sessionService.setLoggedIn).toHaveBeenCalledWith(controller.username, true);
        });

        it('should return a friendly message when an error occurred', function () {

            spyOn(common, 'showErrorMessage');

            def.reject({
                status: "500"
            });

            $rootScope.$apply();

            expect(common.showErrorMessage).toHaveBeenCalledWith('There was an error logging in: 500');
        });

    });
});