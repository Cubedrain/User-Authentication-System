const passport = require('passport')
const {Strategy} = require('passport-google-oauth20')
const Database = require('./../Database/GoogleUsers')
const randomID = require('crypto').randomBytes(16).toString('hex')

module.exports = passport.use(
    new Strategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:process.env.SUCCESS_REDIRECT_URL,
        scope:['profile','email']
    },async (accessToken,refreshToken,profile,callback) => {
        try{
            let newUser = profile && await Database.findOne({email:profile._json.email})
            if(newUser) callback(null,newUser)
            else{
                newUser = await Database.create({
                    id:randomID,
                    email:profile._json.email,
                    displayName:profile.displayName
                })
                callback(null,newUser)
                console.log("User successfully created")
            }
        }
        catch(error){
            callback(error,null)
        }
    }))