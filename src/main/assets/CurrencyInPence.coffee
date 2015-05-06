
## Basic currency regex
CURRENCY_REGEXP = /^\d+(\.?\d?\d?)?$/;

###
    This directive validates, sets the view value and sets the model value for a monatary value assuming its in pence and needs displaying in pounds, also performs basic regex validation
###
directivesModule.directive('currencyInPence', ($log, $filter) ->
    {
        restrict: 'A', ## Only use on attributes
        require: 'ngModel', ## Must have a ngModel
        link: (scope, elm, attrs, ctrl) ->

            @penceToPound = (value) ->
                if (value != undefined)
                    (parseFloat(value) / 100).toFixed(2)
                else
                    0

            @poundsToPence = (value) ->
                if (value != undefined)
                    parseFloat(value) * 100
                else
                    0

            ###
            # The $parsers pipeline converts the $viewValue into the $modelValue -> http://docs.angularjs.org/api/ng/type/ngModel.NgModelController#$parsers
            # Use $formatters pipeline to convert a $modelValue into the $viewValue -> http://docs.angularjs.org/api/ng/type/ngModel.NgModelController#$formatters
            #
            # This function is added to the list of the $parsers. It will be executed when the DOM (the view value) changes.
            # Array.unshift() put it in the beginning of the list, so it will be executed before all the other
            ###
            ctrl.$parsers.unshift((viewValue) =>

                ## Validate the viewValue to ensure valid currency
                if CURRENCY_REGEXP.test(viewValue)
                    ctrl.$setValidity('currency', true) ## Set to be valid once its passed RegEx
                    @poundsToPence(viewValue) ## Convert pounds to pence

                else if viewValue is ''
                    ctrl.$setValidity('currency', false) # Set Invalid when blank
                    0 ## Convert blank string to 0 for consistancy
                else
                    ctrl.$setValidity('currency', false) # Set Validity when invalid
                    undefined ## return undefined (no model update)
            )

            ## Runs when the model gets updated on the scope directly and keeps our view in sync
            ctrl.$render = () =>
                elm.val( @penceToPound(ctrl.$modelValue) )
    }
)