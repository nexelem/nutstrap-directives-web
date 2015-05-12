
/*
 Shows a simple count of remaing characters
 */

(function() {
  directivesModule.directive('characterCount', function($log, $filter) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template: '<sub>{{remainingCount}} {{message}}</sub>',
      link: function(scope, element, attrs) {
        if (!attrs.count) {
          $log.error("No length attribute specified");
        }
        if (!attrs.field) {
          $log.error("No field attribute specified");
        }
        return scope.$watch(attrs.field, function(newValue, oldValue) {
          if (newValue === void 0) {
            scope.remainingCount = "";
            return scope.message = "";
          } else if (newValue === "" && oldValue) {
            scope.remainingCount = attrs.count;
            return scope.message = "characters left";
          } else if (newValue) {
            scope.remainingCount = newValue.length >= attrs.count ? 0 : attrs.count - newValue.length;
            return scope.message = ((attrs.count - newValue.length) === 1 ? 'character' : 'characters') + " left";
          } else {
            scope.remainingCount = "";
            return scope.message = "";
          }
        });
      }
    };
  });

}).call(this);
