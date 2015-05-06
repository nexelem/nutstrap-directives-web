describe('CurrencyInPence Directive Spec', function() {


    // Run test
    describe('CurrencyInPence conversion tests', function(){

        var $scope, $form, compiledForm;

        // Set the dom to manipulate
        beforeEach(inject(function($compile, $rootScope) {
            $scope = $rootScope;
            var element = angular.element(
                '<form name="form">' +
                    '<input type="number" ng-model="model.field" name="field" currency-in-pence/>' +
                '</form>'
            );
            $scope.model = { field: undefined };
            compiledForm = $compile(element)($scope);
            $scope.$digest();
            $form = $scope.form;
        }));

        // Basic test setup verification
        beforeEach(inject(function($compile, $rootScope) {
            expect($form.field.$viewValue).toBe('')

            // Scope undefined due to failed regex
            expect($scope.model.field).toBeUndefined()
        }));

        it('Should convert between pounds and pence', function() {

            // Set form INVALID
            $form.field.$setViewValue(null);

            // Apply the changes to the scope
            compiledForm.scope().$apply();

            // Default error!
            expect($form.field.$error.currency).toBe(true);

            // Scope undefined due to failed regex
            expect($scope.model.field).toBeUndefined()

            ///////////////////////////////////////////////////

            // Set form VALID
            $form.field.$setViewValue(11.99);

            // Apply the changes to the scope
            compiledForm.scope().$apply();

            // Confirm valid
            expect($form.field.$error.currency).toBe(false);

            // Check element
            expect($scope.model.field).toBe(1199);

            ///////////////////////////////////////////////////

            // Set form INVALID
            $form.field.$setViewValue('');

            // Apply the changes to the scope
            compiledForm.scope().$apply();

            // Confirm INVALID
            expect($form.field.$error.currency).toBe(true);

            // Check element
            expect($scope.model.field).toBe(0);
        });

        it('Should convert the pence to pounds'), function() {

            // Set form empty
            $scope.model = { field: 1500 }

            // Apply the changes to the scope
            $scope.$digest();
            $scope.$apply();
            $form.field.$setViewValue('');
            compiledForm.scope().$apply();
            // Confirm INVALID
            //expect($form.field.$error.currency).toBe(true);

            // Check element
            expect($form.field.$viewValue).toBe("1500");
        }

        it('Should not accept negative numbers as valid', function() {

            // Set form VALID
            $form.field.$setViewValue(11.99);

            // Apply the changes to the scope
            compiledForm.scope().$apply();

            // Confirm valid
            expect($form.field.$error.currency).toBe(false);

            // Check element
            expect($scope.model.field).toBe(1199);

            ///////////////////////////////////////////////////

            // Set form INVALID
            $form.field.$setViewValue(-99.9);

            // Apply the changes to the scope
            compiledForm.scope().$apply();

            // Confirm INVALID
            expect($form.field.$error.currency).toBe(true);

            // Scope undefined due to failed regex
            expect($scope.model.field).toBeUndefined()
        });

        it('Should not accept letters as valid', function() {

            // Set form VALID
            $form.field.$setViewValue('ddd');

            // Apply the changes to the scope
            compiledForm.scope().$apply();

            // Confirm in-valid
            expect($form.field.$error.currency).toBe(true);

            // Scope undefined due to failed regex
            expect($scope.model.field).toBeUndefined()

        });

    });

});