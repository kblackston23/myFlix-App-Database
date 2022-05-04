#MOVIE API
Api for movie database, created to be used with the myFlix app

##User Stories
 - As a user, I want to be able to receive information on movies, directors, and genres so that I
can learn more about movies I’ve watched or am interested in.
 - As a user, I want to be able to create a profile so I can save data about my favorite movies

##Features
 - Returns a list of ALL movies to the user
 - Returns data (description, genre, director, image URL, whether it’s featured or not) about a
single movie by title to the user
 - Returns data about a genre (description) by name/title (e.g., “Thriller”)
 - Returns data about a director (bio, birth year, death year) by name
 - Allows new users to register
 - Allows users to update their user info (username, password, email, date of birth)
 - Allows users to add a movie to their list of favorites
 - Allows users to remove a movie from their list of favorites
 - Allows existing users to deregister


##Technologies Used
 - Node.js
 - JavaScript
 - Express.js
 - MongoDB
 - Mongoose