const router = require('express').Router(),
    passport = require('passport')

router.get('/',passport.authenticate('google',{
    scope:['profile','email']
}))
router.get('/redirect',passport.authenticate('google',{
    successRedirect:'http://localhost:4000',
    failureRedirect:process.env.FAILURE_REDIRECT_URL
}),(request,response) => {
    response.status(200).redirect('/')
})
router.get('/redirectFailure',(request,response) => {
    response.status(404).send("Authentication failed, try again")
})

module.exports = router