var UserRepository = require('../../../src/repository/UserRepository');


describe("UserRepository Create", function() {
    it("should call db.write", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);

        var repository = new UserRepository(mockDb);
        repository.create({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2000-01-01'
        });

        expect(mockDb.push).toHaveBeenCalledWith({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2000-01-01'
        });
        expect(mockDb.write).toHaveBeenCalledTimes(1);
    });

    it("should throw exception undefined", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.create();
        };

        expect(f).toThrow('User object is undefined')
    });

    it("should throw exception missing information", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.create({
                'id' : 1
            });
        };

        expect(f).toThrow('User object is missing information')
    });


});

describe("UserRepository FindOneById", function() {
    it("should return existing user", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'find', 'value']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.value.and.returnValue({
            id: "123",
            firstname: "John",
            lastname: "doe",
            birthday: "2001-01-10"
        });

        var repository = new UserRepository(mockDb);
        var user = repository.findOneById("123");

        expect(user.id).toEqual("123");
        expect(user.firstname).toEqual("John");
        expect(user.lastname).toEqual("doe");
        expect(user.birthday).toEqual("2001-01-10");
        expect(mockDb.find).toHaveBeenCalledTimes(1);
    });
});