###
 Validates a password field, to ensure more then 7 chars and contain at least one non alphabetic character.
###
directivesModule.directive('passwordValidate', ($log, $filter) ->
    {
    restrict: 'A',  ## Only use on attributes
    require: '^ngModel',  ## Must have a ngModel
    link: (scope, elm, attrs, ctrl) ->
        ctrl.$parsers.unshift((viewValue) =>

            # Default blank string if null
            viewValue = viewValue or ""

            # More than 7 chars
            pwdValidLength = viewValue.length >= 7

            # Must contain numeric
            pwdContainsNumber = /^(?=.*[0-9])/.test(viewValue)

            $log.info "Password validation : Length Check [#{pwdValidLength}], Number Check [#{pwdContainsNumber}]"

            if (pwdValidLength and pwdContainsNumber) or viewValue.length == 0
                ctrl.$setValidity('password', true)
                viewValue
            else
                ctrl.$setValidity('password', false)
                undefined
        )

        ## Runs when the model gets updated on the scope directly and keeps our view in sync
        ctrl.$render = () =>
            elm.val(ctrl.$modelValue)
    }
)