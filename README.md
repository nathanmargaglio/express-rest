# ExpressJS RESTful API

## Development Setup
### Prereqs
On your local machine (hopefully a UNIX machine), you'll need Vagrant installed and setup as well as NodeJS (version 8).  You can use `nvm` to manage node versions.  The [Wiki](https://wiki.studiolabs.com/display/DEV/Vagrant) has information on both of these tools.  

## Local Setup
After cloning, run `vagrant up`.  This creates a virtual machine that houses the Postgres database and sets up some of the project's guts (such as a couple of databases, installs node dependencies, etc.).

That should be it.  You can now run `npm test`, you should see a bunch of tests run (all of which will certainly pass).  Congrats, you setup the new, sleek MouthWatch service and you're ready to develop :D

To begin local development, run the command `npm run dev`.  This will start the server and watch for changes in .ts files.  Once that's running, you can cURL or Postman `localhost:3000` to hit the endpoints (try GET, POST, PUT, PATCH, and DELETE on `localhost:3000/test` to test some basic crud operations).

Vagrant also sets up forwarding to allow you to access the Postgres databases directly from your host computer.  The command `psql -h localhost -p 15432 -U postgres` should give you the command line interface (assuming you have the Postgres client installed on your machine) or you can SSH into the Vagrant machine (`vagrant ssh`) and access it via `psql -U postgres`.

## Project Structure
This is a Typescript ExpressJS REST API that relies heavily on [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript) to manage models and [typescript-rest](https://www.npmjs.com/package/typescript-rest) to manage controllers.

### sequelize-typescript
This library provides a typed ORM to interact with our database.  An example of one such model is in `src/models/Test.ts` (the app automatically searches this directory for sequelize models).  The general idea is that you define the database tables as sequelize models using various decorators, and let the ORM handle the details of any interactions you might have with it:

    @Table({
        tableName: 'test'
    })
    export class Test extends Model<Test> {
        @PrimaryKey
        @AutoIncrement
        @Column
        id: number;
        
        @Column
        value: string;
    
        @CreatedAt
        @Column({field: 'created_at'})
        createdAt: Date;
    
        @UpdatedAt
        @Column({field: 'updated_at'})
        updatedAt: Date;
    }
You can then call methods on these models to do things like query for entries, create new ones, update old ones, etc.

### typescript-rest
This library uses decorators to define REST actions and endpoints.  It's pretty straightforward how these are setup (a nice example being `src/controllers/Test.ts`), but the basic idea is that each object get's it's own controller file, which then consists of it's particular endpoints.  An example:

    @GET
    async getTests(): Promise<Test[]> {
        return await Test.findAll();
    }
Notice we're using async functions here.  Sequelize methods return promises, and typescript-rest can handle these promises naturally.

### Basic Process
At this point, the process for development should be pretty clear: you create a sequelize model to represent data, then create a controller to interact with that model in a RESTful way.  Once the endpoints are written, we should then write tests to make sure those endpoints work as expected, which leads us to...

## Testing
We're developing the service with tests in mind, so writing tests as we go and running tests frequently is going to be necessary.  We've limited the scope of testing to focus on the functionality of the endpoints (versus something like testing individual methods or anything).  This should make testing quick and painless, but still necessary.

The way I imagine testing to work is that we should have a set of tests for each endpoint, with each test representing some permutation of the possible roles/actions someone might possibly have/make for the endpoint.

### Testing Details
For testing, we're using [mocha](https://www.npmjs.com/package/mocha) with [chai](https://www.npmjs.com/package/chai).  The mocha library is a general testing suite, while chai is built specifically to interact with APIs.  Together, they allow us to interact with the API in a rigorous way that make the process straightforward.

When running `vagrant up`, we not only built a database for local development, but we also built a test database that is used exclusively for these purposes.  The idea is that when we run tests, we want the database to be in a predictable state so that we can write tests with as much specificity as possible.

When you run the tests (using `npm test`), the test database is cleared and the tables are rebuilt (using sequelize).  This means that data won't be saved from test to test (so don't rely on it).  The database, however, will not be cleared *after* running tests, so that we may inspect it after if we need to.

### Writing Tests
All tests go in the `test` directory located in the root of the project and are typescript files which end with `.test.ts`.  The `test` endpoint has some tests written for it, which you can find in `test/Test.test.ts` (just so you know it's definitely for testing), has some examples of what these tests might look like.

An example of one of these tests:

    it('should be json', () => {
		return chai.request(app).get('/test')
			.then(res => {
				expect(res.type).to.eql('application/json');
			});
	});

Here, we make a GET request to the `/test` endpoint, and check that the response is of type `application/json`.  These tests can obviously be much more complex, but all that requires is adding more `expect` statements after the response is received.  When you want to hit another endpoint, you'd just write a similar `it` statement.

## Summary
That's the basic idea of working with this project.  The workflow should be similar to:

 1. Define Model
 2. Setup Controller Methods
 3. Write Tests

As the project becomes more complex, we may have to abstract code to different parts of the project, but the general outline above should still be in place.
