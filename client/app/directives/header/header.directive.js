/**
 * Created by Enot on 18.01.2017.
 */

(function () {
    'use strict'
    
    angular.module('app')
        .directive('headerApp', headerApp);
    
    function headerApp() {
        return {
            templateUrl: 'directives/header/header.html',
            controller: headerApp,
            controllerAs: 'headerApp'
        };

        function headerApp($location) {
            var headerApp = this;

            headerApp.goHome = goHome;

            function goHome() {
                $location.path('/');
            }

        }
    }
})();