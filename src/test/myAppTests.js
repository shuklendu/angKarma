describe('Person', function () {

  var Person, visitor;
  beforeEach(module('myApp'));
  beforeEach(module(function ($provide) {
    visitor = {};
    $provide.value('visitor', visitor);
  }));
  beforeEach(inject(function (_Person_, _$httpBackend_) {
    Person = _Person_;
    $httpBackend = _$httpBackend_;
  }));
  


  describe('#greet', function () {

    it('greets UK visitors formally', function () {
      visitor.country = 'UK';
      expect(new Person('Nigel').greet()).to.equal('Good day to you, Nigel.');
    });

    it('greets others visitors informally', function () {
      expect(new Person('Ben').greet()).to.equal('Hey Ben!');
    });

  });

  describe('#create', function () {

    it('creates the person on the server', function () {
      $httpBackend
      .expectPOST('/people', {
        name: 'Shuk'
      })
      .respond(200);
      var succeeded;
      new Person('Shuk').create()
      .then(function () {
        succeeded = true;
      });
      $httpBackend.flush();
      expect(succeeded).to.be.true;
    });

  });

});

describe('PersonController', function () {

  var Person, controller, scope;
  beforeEach(module('myApp'));
  beforeEach(module(function ($provide) {
    $provide.value('visitor', {});
  }));
  beforeEach(inject(function (_Person_, $controller, $rootScope) {
    Person = _Person_;
    scope = $rootScope.$new();
    controller = $controller('PersonController', {
      $scope: scope
    });
  }));

  it('assigns a person to the controller', function () {
    expect(controller.person).to.be.an.instanceOf(Person);
  });

  it('assigns a person to the scope', function () {
    expect(scope.person).to.be.an.instanceOf(Person);
  });

});