#!/bin/bash
if !(nodemon --version); then
    echo "Node dependencies not found. Installing."
    npm install -g nodemon
    npm install cors --save
else
    echo "Node dependencies found. Proceeding"
fi

go=0;

function check_running() {
    nodemon /application/app.js
}

check_running;
if [ $? -gt 0 ]; then
    echo "A problem occurred running app.js. Lets wait 20 seconds and try once more! (Probabilly database not ready!)..."
    sleep 20;
    check_running;
fi
