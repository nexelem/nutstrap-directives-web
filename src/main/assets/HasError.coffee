
###
    This simple directive replaces some of the duplication required for adding and removing errors classes to elements

    Example Useage:
        Single field checks : has-error="createBrandForm.providerId"
        Multi field checks  : has-error="['createBrandForm.quoteGuaranteeValue','createBrandForm.quoteGuaranteeUnit']"
###
directivesModule.directive('hasError', ($log) ->
    {
        restrict: 'A',
        link: (scope, element, attrs) ->

            formAttributesToWatch = if attrs.hasError.match(/\[(.*?)\]/) then eval(attrs.hasError) else [attrs.hasError]

            fieldValidationString = ""

            for field, i in formAttributesToWatch
                computationValue = "#{field}.$invalid && !#{field}.$pristine"
                fieldValidationString += if i < formAttributesToWatch.length - 1 then "#{computationValue} , " else computationValue

#            $log.debug "Watching collection : [#{fieldValidationString}]"

            scope.$watchCollection("[#{fieldValidationString}]", (resultValues) ->
                if resultValues.indexOf(true) == -1 then  element.removeClass("has-error") else element.addClass("has-error")
            )
    }
)