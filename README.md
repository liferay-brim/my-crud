# My-Crud Project

A simple CRUD project with HTML + Javascript + CSS, NodeJS and MySQL running on Docker.

To get it ready, simple run a ***docker-compose up*** on this project root folder.

There are some post-ready scripts inside the docker-config that are run automatically. If you need some info, dig on it!

## branch exercise: 

This branch will be breaked or have some contents removed in order to you create/fix your project. Clone/fork from here to develop your version.

## Learning Plan:

The objective of this training is to get a simple CRUD application using the above mentioned tools and help the learners to visualize different layers communicating with each other.

### Requirements:
 - Basic understanding on Docker and Docker-Compose, Nginx/Apache, MySQL, HTTP Requests/APIs.

### List of subjects and estimated time:

    1. Present the project business model and requirements (CRUD of users entity) - 30m;

    2. Present the general overview of the project infrastructure - 4h:
       a. Docker setup;
       b. Nginx, NodeJS and MySQL servers on containers;
       c. Serving volumes to the containers;
       d. Services first time dependencies and configurations (scripts and entrypoints);
       e. Communication between containers (network and ports);

    3. Dig into the project (debug everything) - 8h:
        a. The database structure;
        b. The backend server:
            b.1. NodeJS basic overview (dependencies, nodemon, express, app.js/server.js);
            b.2. Database connection instance;
            b.3. Routes, models and controllers;
            b.4. Creating HTTP Requests with Postman;
        c. The HTML + Javascript components and its methods;
        d. Debugging the Frontend + Backend communication on the CRUD methods.

    4. Practice (4d+-):
       a. A sample of this frontend + backend files will be given to the traineers and it will be asked them to configure the services in a way like this project, using Docker, Nginx, NodeJS and MySQL. Considerations:
            a.1. The docker-compose will not be supplied.
            a.2. It is possible that this practice will require some days to be completed.
            a.3. We're using the premise that we need to focus on the service side rather than development, but without a glimpse of dev, its more difficult to visualize everything working together.
        b. Exercises: 
            1. Configure a new docker-compose with all the services working togheter and with the frontend and backend folders served to the containers.
            2. Implement only the method 'search by name like' to actually create an end to end feature;
            3. Fix bugs on services after they are intentionally inserted into the environment.

----------------------------------------------------------------
## TASKS

a) Tasks for MySQL container:

	1) Run a MYSQL:5.7 image inside a container with docker-compose.    

    2) The MySQL Server inside this image uses the following folder to store the database files. Pull it out from the container with a volume to keep its data persistent:
        /var/lib/mysql
	    
	3) Execute on the container startup the file './docker-config/mysql/init.sql' to create the default DATABASE and TABLE users.
	
	4) In order to let the node server to connect the database, we'll have to add the 'skip-grant-tables' tag on the '/etc/mysql/conf.d/docker.cnf' folder inside the container. We can use the 'volumes' feature to override it on the container with the file supplied on the './docker-config/mysql/docker.cnf';

b) Tasks for Node container:
	
	1) Define a PORT to the node:15 service on the docker-compose and the app.js file and expose it to your host;

	2) Create a bridge network on your docker-compose and add it to all containers;

	3) Replace the database connection parameters on './backend/config/db-config.js'. The host will be the container name you supplied on the docker-file.yml. Use database name as 'my_crud' and the user and password you used to create the database.

c) Tasks for NGINX container:

	1) Run a base image of nginx.

	2) Override the file '/etc/nginx/conf.d/default.conf' inside the container with './docker-config/nginx/default.conf';

	3) Supply your hosts './frontend' files to the container in the folder '/var/www/html';

	4) Remember to add your network on the compose-file.

	5) Check/replace the port of your node server on the line one of './frontend/main.js' with your selected port.

	6) Test your full project accessing http://localhost/ on your browser.

d) Don't forget to commit and push your project into your forked repository.

----------------------------------------------------------------