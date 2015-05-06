###
    The directive adds the ability to show error spans for a given form field

    The Directive also follows a convention for displaying errors messages i.e. from a resourse bundle or from a
    provided string.

    A label attribute can be specified and will be used for error message other wise we fall back on defaults resource
    bundled messages found in /public/i18n/resourceBundle.json
###
directivesModule.directive('errorSpan', ($log, I18nResourceService) ->
    {
        restrict: 'E',
        replace:  true,
        scope: true,
        template: '<span class="help-block" ng-show="showError">{{errorMessage}}</span>',
        link: (scope, element, attrs) ->

            # If no label and no mapping resource found log error
            if not attrs.for or not attrs.type
                $log.error("[type] and [for] attributes must be defined!")

            # Return the label from the resource bundle or the attribute
            getLabel = () ->
                # Sample useage in html : {{ backoffice.resourceService.resources.form_validation_error_positive_numbers_only }}
                if attrs.label then return attrs.label

                resource = I18nResourceService.getMapForKey("form_validation_error_#{attrs.type}")
                if resource then resource else $log.error("No Resource Bundle Found for #{attrs.for}")

            scope.$watch("#{attrs.for}.$error.#{attrs.type} && !#{attrs.for}.$pristine", (invalidResult) ->

                # Show of hide the span
                scope.showError = invalidResult

                # Load the resource bundle
                if invalidResult and not scope.errorMessage
                    scope.errorMessage = getLabel()
            )
    }
)