# My-Crud Project

A simple CRUD project with HTML + Javascript + CSS, NodeJS and MySQL running on Docker.

To get it ready, simple run a ***docker-compose up*** on this project root folder.

There are some post-ready scripts inside the docker-config that are run automatically. If you need some info, dig on it!

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


