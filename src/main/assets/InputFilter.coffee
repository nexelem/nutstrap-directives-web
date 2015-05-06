
directivesModule.directive('inputFilter', () ->
  restrict: 'E',
  scope: {
    placeholdertext: '=?',
    clearable: '=?'
  },
  template: '<div class="form-group">
                  <input type="text" ng-model="searchText" id="txt_filter" placeholder="{{placeholdertext}}" class="form-control"/>
                  <span ng-show="clearable" class="clearable glyphicon glyphicon-remove-circle" ng-click="searchText = \'\'"></span></div>',
  link: ($scope, $element, $attrs)->
    console.log "THE INPUTFILTER DIRECTIVE LINK FUNCTION HAS BEEN CALLED"
    $scope.placeholdertext = $scope.placeholdertext or 'Type to Filter...';
    $scope.clearable = $scope.clearable or false;

)
