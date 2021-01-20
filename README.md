# Images Gallery

## Setup

- Prerequisites

    * [NodeJS](https://nodejs.org/en/) with [npm](https://www.npmjs.com/) v6+ or nvm install 8.3.11
    * [MongoDB](https://www.npmjs.com/package/mongodb) - npm install mongodb
    * [Redis]

## Instructions to run application    

* Clone repository
* Move to project root and run:
* npm install
* run npm start

**Server**

 The server is running locally in http://localhost:5000

**API urls**

* http://localhost:5000/images/
* http://localhost:5000/images/:id
* http://localhost:5000/images/search/:name  

**Database**

 The db is running on localhost:27017
 - To start a MongoDB process using the init script
    . sudo /etc/init.d/<script-name> start
 - To stop a MongoDB process using its init script, issue:
    . sudo /etc/init.d/<script-name> stop
 - create a db :test-stored_images  (use test-stored_images)

**Unit Test**
 
 * TODO

**Features**
- Node
- Express
- Mocha cli
- Chai
- MongoDB
- Redis
- Axios
