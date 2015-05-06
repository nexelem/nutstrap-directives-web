(function(){directivesModule.directive("characterCount",function($log,$filter){return{restrict:"E",replace:!0,scope:!0,template:"<sub>{{remainingCount}} {{message}}</sub>",link:function(scope,element,attrs){return attrs.count||$log.error("No length attribute specified"),attrs.field||$log.error("No field attribute specified"),scope.$watch(attrs.field,function(newValue,oldValue){return void 0===newValue?(scope.remainingCount="",scope.message=""):""===newValue&&oldValue?(scope.remainingCount=attrs.count,scope.message="characters left"):newValue?(scope.remainingCount=newValue.length>=attrs.count?0:attrs.count-newValue.length,scope.message=(attrs.count-newValue.length===1?"character":"characters")+" left"):(scope.remainingCount="",scope.message="")})}}})}).call(this);