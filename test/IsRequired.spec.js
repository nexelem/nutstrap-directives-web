describe('IsRequired Directive Spec', function() {


    // Run test
    describe('IsRequired on Single Field', function(){

        var $scope, $form, compiledForm;

        // Set the dom to manipulate
        beforeEach(inject(function($compile, $rootScope) {
            $scope = $rootScope;
            var element = angular.element(
                '<form name="form">' +
                    '<label for="field" is-required="form.field">Field Label</label>' +
                    '<input type="text" ng-model="model.field" name="field" required/>' +
                '</form>'
            );
            $scope.model = { field: "" }
            compiledForm = $compile(element)($scope);
            $scope.$digest();
            $form = $scope.form;
        }));

        // Basic test setup verification
        beforeEach(inject(function($compile, $rootScope) {
            expect($form.field.$viewValue).toBeUndefined()
            expect($scope.model.field).toBe("");

            compiledForm.scope().$apply();

            expect($form.field.$pristine).toBe(true);
            expect($form.field.$invalid).toBe(true);
            expect($form.field.$error.required).toBe(true);

            expect(compiledForm.find('label')[0].innerHTML).toBe("Field Label *");
        }));

        it('Should show and hide asterisk depending on value set and required flag', function() {

            // Set form value to be VALID
            $form.field.$setViewValue('some valid value');

            // Apply the changes to the scope
            compiledForm.scope().$apply();

            // Confirm validation flags
            expect($form.field.$pristine).toBe(false);
            expect($form.field.$invalid).toBe(false);
            expect($form.field.$error.required).toBe(false);

            // Check element
            expect(compiledForm.find('label')[0].innerHTML).toBe("Field Label");

            // Set form INVALID
            $form.field.$setViewValue('');

            // Apply the changes to the scope
            compiledForm.scope().$apply();

            // Confirm set form validation flags
            expect($form.field.$pristine).toBe(false);
            expect($form.field.$invalid).toBe(true);
            expect($form.field.$error.required).toBe(true);

            // Check element has asterisk
            expect(compiledForm.find('label')[0].innerHTML).toBe("Field Label *");
        });

    });

    // Run test
    describe('IsRequired on Multiple Fields', function(){

        var $scope, $form, compiledForm;

        // Set the dom to manipulate
        beforeEach(inject(function($compile, $rootScope) {
            $scope = $rootScope;
            var element = angular.element(
                '<form name="form">' +
                    '<label for="field" is-required="[\'form.field_1\',\'form.field_2\']">Field Label</label>' +
                    '<input ng-model="model.field_1" name="field_1" required/>' +
                    '<input ng-model="model.field_2" name="field_2" required/>' +
                '</form>'
            );
            $scope.model = { field_1: "", field_2: "" }
            compiledForm = $compile(element)($scope);
            $scope.$digest();
            $form = $scope.form;
        }));

        // Basic test setup verification
        beforeEach(inject(function($compile, $rootScope) {

            expect($form.field_1.$viewValue).toBeUndefined()
            expect($form.field_2.$viewValue).toBeUndefined()

            expect($scope.model.field_1).toBe("");
            expect($scope.model.field_2).toBe("");

            compiledForm.scope().$apply();

            expect($form.field_1.$pristine).toBe(true);
            expect($form.field_1.$invalid).toBe(true);
            expect($form.field_1.$error.required).toBe(true);

            expect($form.field_2.$pristine).toBe(true);
            expect($form.field_2.$invalid).toBe(true);
            expect($form.field_2.$error.required).toBe(true);

            expect(compiledForm.find('label')[0].innerHTML).toBe("Field Label *");
        }));

        it('Should show and hide asterisk depending on value set and required flag', function() {

            // Set form value to be VALID
            $form.field_1.$setViewValue('some valid value');

            // Apply the changes to the scope
            compiledForm.scope().$apply();

            // Confirm validation flags
            expect($form.field_1.$pristine).toBe(false);
            expect($form.field_1.$invalid).toBe(false);
            expect($form.field_1.$error.required).toBe(false);

            // Check element still highlighted as REQUIRED
            expect(compiledForm.find('label')[0].innerHTML).toBe("Field Label *");

            // Set form value to be VALID
            $form.field_2.$setViewValue('some valid value');

            // Apply the changes to the scope
            compiledForm.scope().$apply();

            // Confirm validation flags
            expect($form.field_2.$pristine).toBe(false);
            expect($form.field_2.$invalid).toBe(false);
            expect($form.field_2.$error.required).toBe(false);

            // Check element NOT highlighted as REQUIRED
            expect(compiledForm.find('label')[0].innerHTML).toBe("Field Label");

            // Set form INVALID
            $form.field_1.$setViewValue('');

            // Apply the changes to the scope
            compiledForm.scope().$apply();

            // Confirm set form validation flags
            expect($form.field_1.$pristine).toBe(false);
            expect($form.field_1.$invalid).toBe(true);
            expect($form.field_1.$error.required).toBe(true);

            // Check element still highlighted as REQUIRED
            expect(compiledForm.find('label')[0].innerHTML).toBe("Field Label *");
        });

    });


    // Run test
    describe('IsRequired on Multiple Fields', function(){

        var $scope, $form, $log, compiledForm;

        // Set the dom to manipulate
        beforeEach(inject(function($compile, $rootScope, $injector) {
            $scope = $rootScope;
            $log = $injector.get('$log');
            var element = angular.element(
                '<form name="form">' +
                    '<label for="field" is-required="form.field_1"></label>' +
                    '<input ng-model="model.field_1" name="field_1" required/>' +
                '</form>'
            );
            $scope.model = { field_1: "" }
            compiledForm = $compile(element)($scope);
            $scope.$digest();
            $form = $scope.form;
        }));

        it('Should log error as no html found in label contents', function() {
            // The test
            expect($log.error.logs[0][0]).toEqual('IsRequired : No label value found for form.field_1');
        });

    });


});