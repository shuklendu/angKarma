function MyService () {
  return 'hello!';
}
function MyController ($scope) {
  $scope.property = 'value';
}
MyController.$inject = ['$scope', 'MyService'];
angular.app('myApp', [])
.controller('MyController', MyController)
.factory('MyService', MyService);