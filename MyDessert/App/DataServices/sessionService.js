(function () {
    'use strict';

    angular
        .module('app.dataServices')
        .factory('sessionService', sessionService);

    function sessionService() {

        var service = {
            getUsername: getUsername,
            isLoggedIn: isLoggedIn,
            setLoggedIn: setLoggedIn,
            clearLoggedIn: clearLoggedIn
        };

        return service;

        function getUsername() {
            return window.sessionStorage.getItem("MYDESSERT_SESSION_USERNAME");
        }

        function isLoggedIn() {
            return window.sessionStorage.getItem("MYDESSERT_SESSION_ISLOGGEDIN") === "1";
        }

        function setLoggedIn(username, loggedIn) {
            window.sessionStorage.setItem("MYDESSERT_SESSION_USERNAME", username);
            window.sessionStorage.setItem("MYDESSERT_SESSION_ISLOGGEDIN", loggedIn ? "1" : "0");
        }

        function clearLoggedIn() {
            window.sessionStorage.removeItem("MYDESSERT_SESSION_USERNAME");
            window.sessionStorage.removeItem("MYDESSERT_SESSION_ISLOGGEDIN");
        }
    }


})();