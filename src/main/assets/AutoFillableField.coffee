
directivesModule.directive('autoFillableField', ['$timeout', ($timeout) ->
    {
        require: '^ngModel',
        restrict: 'A',
        link: (scope, element, attrs, ngModel) ->
            $timeout(() ->
                if ngModel.$viewValue isnt element.val() and element.val() isnt ""
                    ngModel.$setViewValue(element.val())
            , 500)
    }
])
