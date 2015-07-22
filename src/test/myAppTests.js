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