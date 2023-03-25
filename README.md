# Tech Blog

## Description
A full stack Blog application with user authentication and authorization. This project allows users to communicate about tech. Users can comment, view others profiles, create comments, delete comments, view their own profile, create posts, and delete posts.

## Installation
This site is not currently accessable but i plan on deploying it soon. For now the source code is available on my github.

## Usage
To use this appplication without it being deployed you must first initialize a connection. This Project uses MySQL. 

## Technologies
- Bcrypt
- Express
- React
- JWT
- Sequelize

## Landing view
![Alt text](./readme-ss/Landing.png?raw=true)
- Users are Greeted with a landing page nad have a choice to login

## Main view
![Alt text](./readme-ss/Main.png?raw=true)
- A user can scroll down and be greeted with the top 6 trending posts followed by recent posts
## Login view
![Alt text](./readme-ss/Login.png?raw=true)
- Upon pressing login the User can anter an email and password or signup

## My Profile view
![Alt text](./readme-ss/MyProfile.png?raw=true)
- A user can view their own profile in which they can create and delete theri posts 
## Single view
![Alt text](./readme-ss/Single.png?raw=true)
- Upon pressing view post the user is directed to a page with that post and its description. This is followed by the current top 6 most popular articles.

## View Profile
![Alt text](./readme-ss/ViewProfile.png?raw=true)
- A user can view anothers profile by pressing view profile or clicking on their name in the comments. This will link them to that users posts.

## How it Works

When the user registers the server recieves this input via express. This username is checked if it doesnt already exists in the database. The password is encrypted using bcrypt and stored in the database. When a user signs in the sam process occurs but bcrypt.compare is used to check the password in constant time. When succesfully logged in a Token is returned and stored in the local storage (Yes this is not a good idea for a few reasons.). Between every request the user makes the server checks if their JWT is still valid and if they are who they say they are. Even if a user made a request to the servertrying to delete a comment that isnt theirs they are unable to. This is due to the middleware that decrypts the token with the secret and checks if they have access to delete this post or comment.