describe('InputFilter Directive Spec', function() {
    return describe('Input Filter', function() {
        var $scope, inputEl;
        $scope = null;
        inputEl = null;
        beforeEach(inject(function($rootScope) {
            $scope = $rootScope;
        }));
        describe('should use default values', function() {
            beforeEach(inject(function($compile) {
                var compiledInputFilter;
                compiledInputFilter = $compile(angular.element('<input-filter></input-filter>'))($scope);
                $scope.$digest();
                inputEl = compiledInputFilter.find('input')[0];
            }));
            it('it should have placeholder text of "Type to Filter..."', function() {
                expect(inputEl.placeholder).toBe('Type to Filter...');
            });
            return it('it should have clearable of false', function() {
                expect($scope.clearable).toBeFalsy();
            });
        });
        return describe('should use supplied values', function() {
            var compiledInputFilter;
            compiledInputFilter = null;
            beforeEach(inject(function($compile) {
                var element;
                $scope.bclearable = true;
                $scope.bplaceholdertext = 'SomeText';
                element = angular.element('<input-filter clearable=\"bclearable\" placeholdertext=\"bplaceholdertext\"/>');
                compiledInputFilter = $compile(element)($scope);
                $scope.$digest();
            }));
            it('it should have input with placeholder text of "SomeText"', function() {
                inputEl = compiledInputFilter.find('input')[0];
                expect(inputEl.placeholder).toBe('SomeText');
            });
            return it('it should have span with ng-show of clearable', function() {
                var span;
                span = compiledInputFilter.find('span')[0];
                expect(span.getAttribute('ng-show')).toBe('clearable');
            });
        });
    });
});
