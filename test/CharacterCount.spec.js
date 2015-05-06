
describe('Character Count Directive', function(){


    var $scope, $form, compiledForm;

    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        var element = angular.element(
            '<input ng-model="model.field" name="field" ng-maxlength="20"/>' +
            '<character-count count="20" field="model.field"></character-count>'
        );
        $scope.model = {
            field: ""
        };
        compiledForm = $compile(element)($scope);
        $scope.$digest();
        $form = $scope.form;
    }));

    beforeEach(inject(function($compile, $rootScope) {
        expect($scope.model.field).toEqual("");
        expect(compiledForm[1].innerHTML).toEqual(' ');
    }));

    it('Should count character lengths', function() {

        // Set 9 character long length value
        $scope.model.field = "123456789";

        compiledForm.scope().$apply();

        expect(compiledForm[1].innerHTML).toEqual('11 characters left');
    });

    it('Should determine if plural and singular character message', function() {

        // Set 18 character long length value
        $scope.model.field = "123456789012345678";
        compiledForm.scope().$apply();

        expect(compiledForm[1].innerHTML).toEqual('2 characters left');

        // Set 19 character long length value
        $scope.model.field = "1234567890123456789";
        compiledForm.scope().$apply();

        expect(compiledForm[1].innerHTML).toEqual('1 character left');
    });


    it('Should handle switching between valid and invalid character length', function() {

        // Set 19 character long length value
        $scope.model.field = "1234567890123456789";
        compiledForm.scope().$apply();

        expect(compiledForm[1].innerHTML).toEqual('1 character left');

        // Set 20 character long length value
        $scope.model.field = "12345678901234567890";
        compiledForm.scope().$apply();

        expect(compiledForm[1].innerHTML).toEqual('0 characters left');

        // Set 21 character long length value
        $scope.model.field = "123456789012345678901";
        compiledForm.scope().$apply();

        expect(compiledForm[1].innerHTML).toEqual('0 characters left');
    });

    it('Should show 0 characters left even if goes over the limit', function() {

        // Set 30 character long length value
        $scope.model.field = "123456789012345678901234567890";
        compiledForm.scope().$apply();

        expect(compiledForm[1].innerHTML).toEqual('0 characters left');
    });

    it('Should show correct characters left even moving between populated and unpoulated models', function() {

        // Set 30 character long length value
        $scope.model.field = "123456789012345678901234567890";
        compiledForm.scope().$apply();

        expect(compiledForm[1].innerHTML).toEqual('0 characters left');

        // Set 0 characters
        $scope.model.field = "";
        compiledForm.scope().$apply();

        expect(compiledForm[1].innerHTML).toEqual('20 characters left');
    });

});

describe('Character Count Directive Error logging', function(){

    beforeEach(module('myApp.directives'));

    var $scope, $form, $log, compiledForm;

    beforeEach(inject(function($compile, $rootScope, $injector) {
        $scope = $rootScope;
        var element = angular.element(
            '<input ng-model="model.field" name="field" ng-maxlength="20"/>' +
            '<character-count></character-count>'
        );
        $scope.model = {
            field: ""
        };
        $log = $injector.get("$log");
        compiledForm = $compile(element)($scope);
        $scope.$digest();
        $form = $scope.form;
    }));

    it('Should log error if not count and model set', function() {
        compiledForm.scope().$apply();
        expect($log.error.logs[0][0]).toEqual("No length attribute specified");
        expect($log.error.logs[1][0]).toEqual("No field attribute specified");
    });

});


