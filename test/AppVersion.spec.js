describe('AppVersion Directive Spec', function() {

    // Run test
    describe('AppVersion', function(){

        var $scope, compiledForm, version;

        // Set the dom to manipulate
        beforeEach(inject(function($compile, $rootScope, $injector) {
            $scope = $rootScope;
            $scope.build = "1"
            $scope.date = "Monday"
            var element = angular.element('<app-version version=\"build\" date=\"date\"></appversion>');
            compiledForm = $compile(element)($scope);
            $scope.$digest();
        }));

        it('Should output correct version from common module', function() {

            // Check compiled element has correct version
            expect(compiledForm[0].innerHTML).toBe("<p class=\"ng-binding\">Version: 1 <span class=\"text-muted ng-binding\">(Monday)</span></p>");
        });
    });

});