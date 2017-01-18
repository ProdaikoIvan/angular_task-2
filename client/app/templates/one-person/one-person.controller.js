/**
 * Created by Enot on 16.01.2017.
 */

;(function () {
    'use strict'

    angular.module('app')
        .controller('onePerson', onePerson);

    function onePerson(initPersons, $routeParams,  $location) {
        var vm = this;

        vm.person = initPersons.data[$routeParams.id -1];

        vm.goBack = goBack;

        function goBack() {
            console.log('back');
            $location.path('/');
        }
    }
})();