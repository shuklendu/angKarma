angular.module('myApp', []);
angular.module('myApp')
	.value('visitor', {
	    country: 'IN'
	})
  .factory('Person', function (visitor, $http) {
    return function Person (name) {
      this.name = name;
      this.greet = function () {
        if (visitor.country === 'UK') {
          return 'Good day to you, ' + this.name + '.';
        }
        else {
          return 'Hey ' + this.name + '!';
        }
      };
      this.create = function () {
        return $http.post('/people', this);
      };
    };
  });
angular.module('myApp')
  .controller('PersonController', function ($scope, Person) {
    this.person = $scope.person = new Person('Ben');
  });;