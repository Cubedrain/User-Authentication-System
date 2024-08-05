const express = require('express'),
    dotenv = require('dotenv'),
    mongoose = require('mongoose')

dotenv.config()

const app = express()

app.listen(process.env.PORT,() => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Server and Database are connected and listening"))
        .catch((error) => console.log("Server is connected, Database is innacessible at the moment"))
})
//Error ignored since most errors occur from either change of location (ip address) or lack of a stable connection to connect to the database