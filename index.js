//  1.  Require the express library
const express = require('express');
const app = express();

//  8   new ver of bodyparser
app.use(express.urlencoded({extended: true}))

//  8.  Cookie Parser
const cookieParser = require('cookie-parser');
app.use(cookieParser())
//  8.  Custom Middleware_Cookie Parser
app.use((req, res, next) =>  {
    const username = req.cookies.username
    res.locals.username = '';
    if(username){
        res.locals.username = username;
        console.log(`Signed in as ${username}`)
    }
    next();
})


//  7.  Static assets --->>> public directory
const path = require("path")
app.use(express.static(path.join(__dirname, 'public')));


//  4.  Logging Middleware Morgan
const logger = require('morgan');
app.use(logger('dev'));

//  2.  =================================ROUTES/ ROUTERS
//  2.  Root page
// app.get('/', (req, res) => {
//    res.render('index') //   6.
// })

app.get('/clucks', (req, res) => {
    res.render('index') //   6.
   
 })

// sign_in page
app.get('/sign_in', (req, res) => {
    // res.send("<h1>Hello World</h1>")
    res.render('sign_in')
})

//  9.  Sign in POST request
app.post('/sign_in', (req, res) => {
    const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24
    const username = req.body.username
    res.cookie('username', username, {maxAge: COOKIE_MAX_AGE})
    res.redirect('/')
})
//  9.  Sign out POST request
app.post('/sign_out', (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
})  

//  10.   POST ROUTER ACCESSING POST ROUTES
const postRouter = require('./routes/posts')
app.use('/', postRouter)


//  5.  Set View Engine  --->>>  view directory
app.set('view engine', 'ejs')
app.set('views', 'views')


//  3.  ==================================SERVER
const PORT = 3000;
const DOMAIN = 'localhost' //loopback address: 127.0.0.1

app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})