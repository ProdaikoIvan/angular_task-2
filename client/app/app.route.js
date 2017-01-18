/**
 * Created by Enot on 11.01.2017.
 */

;(function () {
    'use strict'

    angular
        .module('app')
        .config(mainConfig);
    /* @ngInject */
    function mainConfig($routeProvider, $locationProvider) {

        $routeProvider
            .when('/',{
                templateUrl: 'templates/persons/person-list.html',
                controller: 'PersonList',
                controllerAs: 'vm',
                resolve: {
                     initPersons: function (persons) {
                        return persons.getPersons();
                    }
                }
            })
            .when('/person/:id',{
                templateUrl: 'templates/one-person/one-person.html',
                controller: 'onePerson',
                controllerAs: 'vm',
                resolve: {
                    initPersons: function (persons) {
                        return persons.getPersons();
                    }
                }
            })
            .otherwise({redirectTo: '/'});
             $locationProvider.html5Mode(true);
    }
})();