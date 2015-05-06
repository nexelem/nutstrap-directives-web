describe('AutoFillableField Directive Spec', function() {



    // Run test
    describe('AutoFillableField tests ', function(){

        var $scope, $form, compiledForm,$timeout;

        // Set the dom to manipulate
        beforeEach(inject(function($compile, $rootScope,$timeout) {
            $scope = $rootScope;
            var element = angular.element(
                    '<form name="form">' +
                    '<input type="number" ng-model="model.field" name="field" auto-fillable-field/>' +
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

        it('Should call the directive', function() {
            $form.field.$setViewValue(null);

            // Apply the changes to the scope
            compiledForm.scope().$apply();
        });
    });
});