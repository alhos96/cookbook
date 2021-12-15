# Cookbook

Cookbook is full MERN stack web application. The application aims to provide user with personal account options to search and rate recipes, as well as add to their own recipes. 

## technologies
In this MERN stack application the **frontend** is developed in HTML5, CSS3 and React.js while **backend** is created in Express and Node.js. 
**Data** is stored in MongoDB Atlas and users can access only their data but no others.

## starting application


#### frontend

After cloning repository and opening it in terminal type command `cd client` and run `npm install` script to install all the dependencies. After successfull instalataion run `npm start`. 

That runs the frontend part of application in the development mode.

Open http://localhost:3000 to view it in the browser.


#### backend

In terminal type command `cd server` and add your own .env file with following variables: **PORT** use(5000), **JWT_SECRET**, **MONGO_URI**. After that run `npm install` to install all the dependencies. After completing these steps run `npm start` script. 

That runs the server part of application in the development mode on http://localhost:5000.


#### seeding database

To seed database with users and recipes make sure you are located in `server` then type command `npm run seed`. 
