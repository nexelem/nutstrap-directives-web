(function(){directivesModule.directive("validJson",function($log){return{restrict:"A",require:"ngModel",link:function(scope,elm,attrs,ctrl){return ctrl.$parsers.unshift(function(_this){return function(viewValue){var e,valid;valid=!0;try{JSON.parse(viewValue)}catch(_error){e=_error,valid=!1}return ctrl.$setValidity("validjson",valid),viewValue}}(this))}}})}).call(this);