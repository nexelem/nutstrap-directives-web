(function(){directivesModule.directive("autoFocus",function($timeout){return{restrict:"AC",link:function(scope,elem,attr){return $timeout(function(){return elem[0].focus()},0)}}})}).call(this);