describe('ValidJson Directive Spec', function() {

    // Run test
    describe('ValidJson tests', function(){

        var $scope, $form, compiledForm;

        // Set the dom to manipulate
        beforeEach(inject(function($compile, $rootScope) {
            $scope = $rootScope.$new();

            var element = angular.element(
                '<form name="form" novalidate>' +
                    '<input type="text" ng-model="payload" name="payload" valid-json/>' +
                '</form>'
            );

            compiledForm = $compile(element)($scope);
        }));

        it('Should not accept invalid Json', function() {

            $scope.form.payload.$setViewValue('{{ZZ');

            compiledForm.scope().$apply();
            $scope.$digest();

            // Confirm in-valid
            expect($scope.form.$invalid).toBe(true);

            // Scope undefined due to failed regex
            expect($scope.payload).toBe('{{ZZ');

        });

        it('Should not accept invalid Json', function() {

            $scope.form.payload.$setViewValue('{}');

            compiledForm.scope().$apply();
            $scope.$digest();

            // Confirm in-valid
            expect($scope.form.$invalid).toBe(false);

            // Scope undefined due to failed regex
            expect($scope.payload).toBe('{}');
        });
    });

});