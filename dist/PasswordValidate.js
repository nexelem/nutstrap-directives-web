(function(){directivesModule.directive("passwordValidate",function($log,$filter){return{restrict:"A",require:"^ngModel",link:function(scope,elm,attrs,ctrl){return ctrl.$parsers.unshift(function(_this){return function(viewValue){var pwdContainsNumber,pwdValidLength;return viewValue=viewValue||"",pwdValidLength=viewValue.length>=7,pwdContainsNumber=/^(?=.*[0-9])/.test(viewValue),$log.info("Password validation : Length Check ["+pwdValidLength+"], Number Check ["+pwdContainsNumber+"]"),pwdValidLength&&pwdContainsNumber||0===viewValue.length?(ctrl.$setValidity("password",!0),viewValue):void ctrl.$setValidity("password",!1)}}(this)),ctrl.$render=function(_this){return function(){return elm.val(ctrl.$modelValue)}}(this)}}})}).call(this);