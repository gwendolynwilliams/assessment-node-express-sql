# assessment-node-express-sql

Instructions
Create a new table in a new database to track animals in our zoo. It should include an auto-incrementing primary key, a column for the type of animal as a string, and a number to keep track of how many of this animal type we have.

Save the SQL statements used to create your table in a database.txt file as a part of your final project git repo.

Create a Node/Express server app. This app should actively listen for requests on port 3000. It should be able to serve back our static files (index.html, any js or css files) as well as handle incoming requests to any routes. Include a routing module to use with your Ajax requests.

Create a custom module with the following function exported: function randomNumber(min, max){ return Math.floor(Math.random() * (1 + max - min) + min); }

Our application needs to be able to input new animals and display current animals. This will require Ajax requests to send data to the server and Ajax requests to retrieve data from the server.

When a new kind of animal is entered from the user, use the randomNumber function from the custom module to get a number between 1 and 100. Use this number as your number of animals value in the database for this entry.

The app should display all animals listed in our database when it loads and after each animal group is added.
