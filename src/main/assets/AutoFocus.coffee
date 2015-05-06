
directivesModule.directive('autoFocus', ($timeout) ->
    {
        restrict: 'AC',
        link: (scope, elem, attr) ->
            $timeout(
                () -> elem[0].focus()
                ,
                0)
    }
)
