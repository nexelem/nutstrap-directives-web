
###
    This directive shows and hides a asterisk (*) depending on if an element is required and valid

    Example Useage:
        Single field checks : is-required="createBrandForm.providerId"
        Multi field checks  : is-required="['createBrandForm.quoteGuaranteeValue','createBrandForm.quoteGuaranteeUnit']"
###
directivesModule.directive('isRequired', ($log) ->
    {
        restrict: 'A',
        link: (scope, element, attrs) ->

            elementText = element[0].innerHTML;

            formAttributesToWatch = if attrs.isRequired.match(/\[(.*?)\]/) then eval(attrs.isRequired) else [attrs.isRequired]

            $log.error("IsRequired : No label value found for #{attrs.isRequired}") if elementText is null or elementText.length is 0

            fieldValidationString = ""

            for field, i in formAttributesToWatch
                computationValue = "#{field}.$invalid && #{field}.$error.required"
                fieldValidationString += if i < formAttributesToWatch.length - 1 then "#{computationValue} , " else computationValue

#            $log.debug "Watching collection : [#{fieldValidationString}]"

            scope.$watchCollection("[#{fieldValidationString}]", (resultValues) ->
                if resultValues.indexOf(true) == -1
                     element.empty();
                     element.append(elementText);
                 else
                     element.empty();
                     element.append("#{elementText} *");
            )
    }
)