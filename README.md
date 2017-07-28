# Creact

**Framewokrs and tools:**
- AspNet Core 1.1
- React
- Babel
- Webpack
- Karma
- Enzyme
- Bootstrap
- Yahoo Weather api
- Entity Framework core (Lite and in memory for tests)

## Running instructions:
- Download and install the latest version of the [.net framework](https://www.microsoft.com/net/download/core)
- Clone the repo.
- If you are using VS2015 or VS2017 on build the packages should get downloaded.
- If you prefer go to the console and follow this steps:
    - cd Creact
    - dotnet restore (restore nuget packages)
    - dotnet build (builds the application)
    - npm run build (transpiles the React files and minifies css)
    - cd ../Creact.Tests
    - dotnet restore (restore nuget packages)
    - dotnet build (builds the application)
    - dotnet test (will run the tests)

On the Creact directory there are tests for the client app. You can run them by:
1. npm run test (single execution)
2. npm run test-watch (they will keep running)


On the same directory there are tasks to keep webpack watching and building your changes
1. npm run build-watch


Once the dotnet app is running there are two **endpoints**:
1. http://localhost:5000/api/contacts (post) to insert contacts
2. http://localhost:5000/api/contacts to see all the existing ones on the db.

### What is not there
- There is no design patterns on the server side, the app is to simple for that.
- I hope in the future add linting and hot reloading