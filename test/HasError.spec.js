describe('HasError Directive Spec', function() {


    // Run test
    describe('HasError on single field only', function(){

        var $scope, $form, compiledForm;

        // Set the dom to manipulate
        beforeEach(inject(function($compile, $rootScope) {
            $scope = $rootScope;
            var element = angular.element(
                '<form name="form">' +
                    '<div has-error="form.field">' +
                        '<input ng-model="model.field" name="field" required ng-maxlength="5"/>' +
                    '</div>' +
                '</form>'
            );
            $scope.model = { field: "abc" }
            compiledForm = $compile(element)($scope);
            $scope.$digest();
            $form = $scope.form;
        }));

        // Basic test setup verification
        beforeEach(inject(function($compile, $rootScope) {
            expect($form.field.$viewValue).toEqual("abc")
            expect($scope.model.field).toEqual("abc")

            expect($form.field.$pristine).toBe(true);
            expect($form.field.$invalid).toBe(false);

            expect(compiledForm.find('div').hasClass('has-error')).toBe(false);
        }));

        it('Should add error class when form is invalid', function() {

            // Set form value to be invalid
            $form.field.$setViewValue('invalid-length-string');

            // Confirm set and checkout form validation flags
            expect($form.field.$viewValue).toEqual('invalid-length-string')
            expect($form.field.$pristine).toBe(false);
            expect($form.field.$invalid).toBe(true);

            // Apply the changes to the scope
            compiledForm.scope().$apply();

            // Check element has-error exists
            expect(compiledForm.find('div').hasClass('has-error')).toBe(true);
        });

        it('Should remove error class when form element becomes valid', function() {

            // Set form value to be invalid
            $form.field.$setViewValue('invalid-length-string');
            compiledForm.scope().$apply();
            expect(compiledForm.find('div').hasClass('has-error')).toBe(true);

            // Set value to be valid and check class not present
            $form.field.$setViewValue('valid');
            compiledForm.scope().$apply();
            expect(compiledForm.find('div').hasClass('has-error')).toBe(false);
        });

    });


    // Run test
    describe('HasError on multiple field only', function(){

        var $scope, $form, compiledForm;

        // Set the dom to manipulate
        beforeEach(inject(function($compile, $rootScope) {
            $scope = $rootScope;
            var element = angular.element(
                '<form name="form">' +
                    '<div has-error="[\'form.field_1\',\'form.field_2\']">' +
                        '<input ng-model="model.field_1" name="field_1" required ng-maxlength="5"/>' +
                        '<input ng-model="model.field_2" name="field_2" required ng-maxlength="5"/>' +
                    '</div>' +
                '</form>'
            );
            $scope.model = { field_1: "abc", field_2: "abc"  }
            compiledForm = $compile(element)($scope);
            $scope.$digest();
            $form = $scope.form;
        }));

        // Basic test setup verification
        beforeEach(inject(function($compile, $rootScope) {
            expect($form.field_1.$viewValue).toEqual("abc")
            expect($form.field_2.$viewValue).toEqual("abc")
            expect($scope.model.field_1).toEqual("abc")
            expect($scope.model.field_2).toEqual("abc")

            expect($form.field_1.$pristine).toBe(true);
            expect($form.field_1.$invalid).toBe(false);

            expect($form.field_2.$pristine).toBe(true);
            expect($form.field_2.$invalid).toBe(false);

            expect(compiledForm.find('div').hasClass('has-error')).toBe(false);
        }));

        it('Should remove error class when form element becomes valid', function() {

            // Set form value to be invalid
            $form.field_1.$setViewValue('invalid-length-string');
            $form.field_2.$setViewValue('invalid-length-string');
            compiledForm.scope().$apply();
            expect(compiledForm.find('div').hasClass('has-error')).toBe(true);

            // Set field_1 value to be valid and check class not present
            $form.field_1.$setViewValue('valid');
            compiledForm.scope().$apply();
            expect(compiledForm.find('div').hasClass('has-error')).toBe(true);

            // Set field_2 value to be valid and check class not present
            $form.field_2.$setViewValue('valid');
            compiledForm.scope().$apply();

            // Once both valid - error class has been removed
            expect(compiledForm.find('div').hasClass('has-error')).toBe(false);
        });

    });


});