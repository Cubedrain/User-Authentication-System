const express = require('express'),
    dotenv = require('dotenv'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    sessions = require('express-session')

dotenv.config()

const app = express()

app.use(sessions({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000 * 60 * 60 * 24
    }
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((error,user) => {
    console.log("Inside serialization process")
    if(error) console.log(error)
    else{
        return user.id
    }
})

passport.deserializeUser(async (userID,done) => {
    const googleDatabase = require('./Database/GoogleUsers'),
        localDatabase = require('./Database/LocalUsers')

    try{
        const userFinder = await googleDatabase.findOne({id:userID}) || await localDatabase.findOne({id:userID})
        if(userFinder) return done(null,userFinder)
        else {
            console.log("No deserialization in place")
            return done(null,null)
        }
    }
    catch(error){
        console.log(error)
        done(error,null)
    }
})

//Routes and Strategies
const googleStrategy = require('./Authentication/GoogleStrategy')
const googleSignIn = require('./Routes/GoogleLogin')

app.use('/accounts/googleoauth',googleSignIn)

app.get('/',(request,response) => {
    response.status(200).send(request.user ? request.user : "No available user logged in currently")
})

app.listen(process.env.PORT,() => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Server and Database are connected and listening"))
        .catch((error) => console.log("Server is connected, Database is innacessible at the moment"))
})
//Error ignored since most errors occur from either change of location (ip address) or lack of a stable connection to connect to the database