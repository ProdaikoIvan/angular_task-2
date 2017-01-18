/**
 * Created by Enot on 15.01.2017.
 */
;(function () {
    'use strict'

    angular.module('app')
        .factory('validForm', validForm);
    
    function validForm() {
        var template = "(XXX)-XX-XX-XXX";
        var newTemplate = template;

        return {
            getTemplate: getTemplate
        };

        function getTemplate(person) {
            var lengthTelInput;
            if (person.telephone) {
                lengthTelInput = person.telephone.length;
                var lastChar = person.telephone.charAt(lengthTelInput - 1);
                if (isNaN(parseInt(lastChar))) {
                    person.telephone = person.telephone.substring(0, person.telephone.length -1);
                    return newTemplate;
                }
            }
            else {
                newTemplate = template;
                return template;
            }

            var startSubStr,
                endSubStr;

            switch (person.telephone.length) {
                case 1:
                case 2:
                case 3:
                    startSubStr = lengthTelInput;
                    endSubStr = lengthTelInput + 1;
                    break;
                case 4:
                case 5:
                    startSubStr = lengthTelInput + 2;
                    endSubStr = lengthTelInput + 3;
                    break;
                case 6:
                case 7:
                    startSubStr = lengthTelInput + 3;
                    endSubStr = lengthTelInput + 4;
                    break;
                case 8:
                case 9:
                case 10:
                    startSubStr = lengthTelInput + 4;
                    endSubStr = lengthTelInput + 5;
                    break;
                default:
                    startSubStr = false;
                    person.telephone = person.telephone.substring(0, person.telephone.length - 1);
                    console.error('max length = 10');
                    return "too many digits";
            }
            if (startSubStr) {
                newTemplate = newTemplate.substr(0, startSubStr);
                newTemplate += lastChar;
                newTemplate += template.substr(endSubStr);
                return newTemplate;
            }
        }
    }
})();