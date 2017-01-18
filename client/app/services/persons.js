
/**
 * Created by Enot on 14.01.2017.
 */
;(function () {
    'use strict'

    angular.module('app')
        .factory('persons', persons);

    function persons($http, $q) {
        var api = 'http://localhost:3000/';

        return {
            getPersons: getPersons,
            addPerson: addPerson,
            deletePerson: deletePerson
        };

        function getPersons() {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: api + 'persons'
            }).then(function (data) {
                defer.resolve(data);
            });
            return defer.promise;
        }

        function addPerson(data) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: api + 'persons',
                data: data
            }).then(function (data, error) {
                defer.resolve(data);
            });
            return defer.promise;
        }

        function deletePerson(id) {
            var defer = $q.defer();
            $http({
                method: 'DELETE',
                url: api + 'persons/' + id
            }).then(function (data) {
                defer.resolve(data);
            });
            return defer.promise;
        }
    }
})();