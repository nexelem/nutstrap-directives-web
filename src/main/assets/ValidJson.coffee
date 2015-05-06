

###
    This directive watches the username field and raises a validation error if it already exists
###
directivesModule.directive('validJson', ($log) ->
    {
        restrict: 'A', ## Only use on attributes
        require: 'ngModel', ## Must have a ngModel
        link: (scope, elm, attrs, ctrl) ->

            ctrl.$parsers.unshift((viewValue) =>

                valid = true
                try
                    JSON.parse(viewValue)
                catch e
                    valid = false

                ctrl.$setValidity('validjson', valid)
                viewValue
            )
    }
)