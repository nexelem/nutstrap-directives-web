describe('Password Directive Spec', function() {


    // Run test
    describe('Password validation tests', function(){

        var html = '<form name="passwordForm">' +
                        '<input type="password" ng-model="model.field" name="field" password-validate/>' +
                    '</form>';

        var $scope, $form, compiled, element;

        // Set the dom to manipulate
        beforeEach(inject(function($compile, $rootScope) {
            //create a scope (you could just use $rootScope, I suppose)
            $scope = $rootScope;

            //get the jqLite or jQuery element
            element = angular.element(html);

            $scope.model = { field: '' };

            //compile the element into a function to process the view.
            compiled = $compile(element);

            //run the compiled view.
            compiled($scope);

            //call digest on the scope!
            $scope.$digest();

            $form = $scope.passwordForm;
        }));

        it('Should be able to set a valid password', function() {

            // Set form value to be VALID
            $form.field.$setViewValue('Password1@');

            // Apply the changes to the scope
            $scope.$digest();

            // Confirm validation flags
            expect($form.field.$error.password).toBe(false);

            // Scope undefined due to failed regex
            expect($scope.model.field).toBe('Password1@');

            // Set form INVALID
            $form.field.$setViewValue('invalid_random_text');

            // Apply the changes to the scope
            $scope.$digest();

            // Confirm set form validation flags
            expect($form.field.$error.password).toBe(true);

        });

    });

});