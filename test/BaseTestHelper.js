this.commonModule = angular.module('myApp.common', []);
this.i18nModule = angular.module('myApp.i18n', ['myApp.common']);
this.directivesModule = angular.module('myApp.directives', ['myApp.i18n']);

beforeEach(module('angular-flash.service'));
beforeEach(module('ngI18n'));
beforeEach(module('myApp.i18n'));
beforeEach(module('myApp.common'));
beforeEach(module('myApp.directives'));
