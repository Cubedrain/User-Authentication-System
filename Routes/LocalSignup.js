const router = require('express').Router(),
    Database = require('./../Database/LocalUsers'),
    randomID = require('crypto').randomBytes(16).toString('hex')

router.post('/',async (request,response) => {
    const {displayName,email,password} = request.body
    try{
        const duplicateFinder = await Database.findOne({email:email})
        if(duplicateFinder){
            return response.status(204).send("User already exists")
        }
        else{
            const newUser = Database.create({
                displayName:displayName,
                email:email,
                password:password
            })
            console.log("User created locally and successfully")
        }
    }
    catch(error){
        console.log("Authentication failed")
        console.log(error)
    }
})