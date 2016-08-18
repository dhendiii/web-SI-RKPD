app.directive('showErrors', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        require:  '^form',
        link: function ($scope, $element, $attributes, ngFormCtrl) {
            // this timeout is necessary to handle the case when we have
            // ng generated code inside of the show-errors element.

            // usually this can be done by setting the directive to "terminal: true",
            // but we want to allow interpolation child elements, so we just
            // offset the attachment of the watchers until the next browser frame
            $timeout(function() {
                // we search for a .form-control whose name attriubte is set
                var childInputName = $element.find('.form-control[name]').first().attr('name');

                if (angular.isUndefined(ngFormCtrl[childInputName])) {
                    // there is no child element that has been properly setup for the form
                    // so we cannot do any validation
                    return;
                }

                $scope.$watch(function() {
                    // on scope changes, check if the input's validation status has changed.
                    // additionally, if an input has not been touched or the form has not been
                    // yet submitted, consider the element valid
                    return ngFormCtrl[childInputName].$invalid
                    && (ngFormCtrl[childInputName].$touched || ngFormCtrl[childInputName].$dirty || ngFormCtrl.$submitted);
                }, function(is_invalid) {

                    $element.toggleClass('has-error', is_invalid);
                });                                                                                                                                                                                                                                                                              }, 0, false);
            },
        };
    }]);

app.constant('FLOAT_REGEXP', /^\-?\d+\.?(\d{1,2})?$/)

app.directive('adFloat', ['FLOAT_REGEXP', function(FLOAT_REGEXP) {
    return {
        require: 'ngModel',
        link: function($scope, $element, iAttrs, ngModelCtrl) {
            // For DOM -> model validation
            ngModelCtrl.$parsers.push(function(viewValue) {
                if (ngModelCtrl.$isEmpty(viewValue)) {
                    ngModelCtrl.$setValidity('float', true);

                    return viewValue;
                }

                if (FLOAT_REGEXP.test(viewValue)) {
                    ngModelCtrl.$setValidity('float', true);

                    return parseFloat(viewValue.toString().replace(',', '.')).toFixed(2);
                } else {
                    ngModelCtrl.$setValidity('float', false);

                    return undefined;
                }
            });

            // For model -> DOM validation
            ngModelCtrl.$formatters.unshift(function(value) {
                if (!(ngModelCtrl.$isEmpty(value) || FLOAT_REGEXP.test(value))) {
                    ngModelCtrl.$setValidity('float', false);
                } else {
                    ngModelCtrl.$setValidity('float', true);
                }

                return value;
            });
        },
    };
}])
;
