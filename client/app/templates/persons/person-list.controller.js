/**
 * Created by Enot on 14.01.2017.
 */

;(function () {
    'use strict'

    angular.module('app')
        .controller('PersonList', PersonList);

    function PersonList($scope, initPersons, persons, $location) {
        var vm = this;

        vm.persons = initPersons.data;
        vm.sortType = 'firstName';
        vm.sortReverse = false;

        vm.go = go;
        vm.deletePerson = deletePerson;

        $scope.$on('addNewPerson', function () {
            persons.getPersons().then(function (data) {
                vm.persons = data.data;
            });
        });

        function go(id) {
            $location.path('person/' + id);
        }

        function deletePerson(id, thisPerson) {
            persons.deletePerson(id).then(function (data) {
                if (data.status == 200) {
                    for(var i= 0; i< vm.persons.length; i++){
                        if(vm.persons[i].id == id){
                            vm.persons.splice(i, 1);
                        }
                    }
                }
            })
        }
    }
})();