****create a .env file on backend folder

backend\.env

    NODE_ENV=development
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/schoolDB
    JWT_SECRET="Password@123"
    CLOUDINARY_URL=
    CLOUDINARY_UPLOAD_PRESET=

***
Go to the root folder and install the backend dependencies by using the command-

    npm install

    node server.js
***

Go to the frontend folder by command cd frontend and then install frontend dependecies using the command-

    npm install

    set NODE_OPTIONS=--openssl-legacy-provider

    npm start
***
