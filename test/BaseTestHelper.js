// Mock I18nResourceService
beforeEach(module(function ($provide){
    $provide.factory('I18nResourceService', function (){
        return {
            getMapForKey: function (key){
                return {
                    'form_validation_error_url': 'Invalid URL',
                    'flash_success': 'Success',
                    'flash_error': 'Error occurred' }
            }
        };
    });
}));

// Mock $dialog
beforeEach(module(function ($provide){
    $provide.factory('$dialog', function (){
        return {
            prompt: function (title, msg){
                return true;
            }
        };
    });

    $provide.decorator('$log', function ($delegate) {
        $delegate.getInstance = function (ctx) {
            return $delegate;
        }
        return $delegate;
    });
}));


this.commonModule = angular.module('myApp.common', []);
this.i18nModule = angular.module('myApp.i18n', ['myApp.common']);
this.directivesModule = angular.module('myApp.directives', ['myApp.i18n']);

beforeEach(module('angular-flash.service'));
beforeEach(module('ngI18n'));
beforeEach(module('myApp.i18n'));
beforeEach(module('myApp.common'));
beforeEach(module('myApp.directives'));
