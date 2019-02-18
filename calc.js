'use strict';
angular.module('CalculatorApp', [])
    .controller('CalculatorController', function($scope) {
        function factorial(term) { //term: 8!
            const num = term.split('!')[0];
            if (num<=0) {
                return 1;
            }
            var out = '(';
            for (var i=1; i<=num; i++) {
                out += i+"*";
            }
            out += '1)'; //add the 1 because there's an extra * at the end
            return out;
        }
        $scope.result = function() {
            if ($scope.expression==='') {
                return 'enter an input';
            }
            try {
                var value = eval($scope.expression
                    .replace('Math.','') //in case user doesn't know we handle this
                    .replace('sin','Math.sin')
                    .replace('cos','Math.cos')
                    .replace('tan','Math.tan')
                    .replace('arcsin','Math.asin')
                    .replace('arccos','Math.acos')
                    .replace('arctan','Math.tan')
                    .replace('pi','Math.PI')
                    .replace('sqrt','Math.sqrt')
                    .replace('cbrt','Math.cbrt')
                    .replace('e','Math.E')
                    .replace('ln','Math.log') //log base e
                    .replace('log','Math.log10') //log base 10
                    .replace(/(.+)\^(.+)/g,'Math.pow($1,$2)') //a**b results in a^b, but a^b results in a+b
                    .replace(/\|(.+)\|/g,'Math.abs($1)')
                    .replace(/(\d+!)/g,n=>factorial(n)) //replace number! with parseable string
                    //sometimes doesn't work because of the order of these statements
                    );
                console.log(value);
                if (value===undefined) {
                    return 'invalid input';
                }
                else {
                    return value;
                }
            }
            catch(e) {
                if (e instanceof ReferenceError) {
                    return 'invalid input';
                }
            }
        };
    }
);