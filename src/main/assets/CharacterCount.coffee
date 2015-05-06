
###
 Shows a simple count of remaing characters
###
directivesModule.directive('characterCount', ($log, $filter) ->
    {
        restrict: 'E',
        replace:  true,
        scope: true,
        template: '<sub>{{remainingCount}} {{message}}</sub>',
        link: (scope, element, attrs) ->

            $log.error "No length attribute specified" if !attrs.count
            $log.error "No field attribute specified" if !attrs.field

            scope.$watch(attrs.field, (newValue, oldValue) ->

                # The model value is undefined i.e. removed by ngMaxLength
                if newValue is undefined
                    scope.remainingCount = ""
                    scope.message = ""
                # The model value is now invalid
                else if newValue is "" and oldValue
                    scope.remainingCount = attrs.count
                    scope.message = "characters left"
                # The model value is valid
                else if newValue
                    scope.remainingCount = if newValue.length >= attrs.count then 0 else (attrs.count - newValue.length)
                    scope.message = "#{if (attrs.count - newValue.length) is 1 then 'character' else 'characters'} left"

                # Default we dont have a model value yet
                else
                    scope.remainingCount = ""
                    scope.message = ""
            )
    }
)