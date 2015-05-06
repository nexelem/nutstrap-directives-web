
directivesModule.directive('appVersion', () ->
    {
        restrict: 'E',
        scope: {
            bversion: '=version',
            bdate: '=date',
        },
        template: "<p>Version: {{bversion}} <span class=\"text-muted\">({{bdate}})</span></p>"
    }
)
