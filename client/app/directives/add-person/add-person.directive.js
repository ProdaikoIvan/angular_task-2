/**
 * Created by Enot on 15.01.2017.
 */

;(function () {
    'use strict'

    angular.module('app')
        .directive('addPost', AddPost);

    function AddPost() {
        return {
            templateUrl: 'directives/add-person/add-person.html',
            controller: AddFormCTRL,
            controllerAs: 'add',
            replace: true
        };

        function AddFormCTRL($scope, validForm, persons) {
            var add = this;

            add.addSuccess = false;
            add.telTemplate = "(XXX)-XX-XX-XXX";

            add.addPerson = addPerson;
            add.changeTel = changeTel;
            add.focusTel = focusTel;
            add.blurTel = blurTel;

            resetForm();

            function addPerson(form) {
                if (form.$valid) {
                    persons.addPerson(add.person).then(function (data) {
                        if (data.status == 201) {
                            $scope.$emit('addNewPerson');
                            resetForm(form);
                        }
                        else {
                            add.addSuccess = true;
                            console.log('error');
                        }
                    });
                }
                if (form.$invalid) {
                    console.log('invalid');
                }
            }

            function changeTel() {
                add.phoneTemplate = validForm.getTemplate(add.person);
            }

            function focusTel() {
                var phoneInput = document.querySelector(".telInput");
                phoneInput.placeholder = add.telTemplate;
            }

            function blurTel() {
                var phoneInput = document.querySelector(".telInput");
                phoneInput.placeholder = "";
            }

            function resetForm(form) {
                add.person = {};
                add.phoneTemplate = add.telTemplate;
                if (form) {
                    form.$setPristine();
                    form.$setUntouched();
                }
            }
        }
    }
})();