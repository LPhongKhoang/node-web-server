// Get  module
const fs = require('fs');
const express = require('express');

const hbs = require('hbs');

const port = process.env.PORT || 3000;


var app = express(); // a expresss() function is the top-level exported by express module

//Using hbs as the default view engine requires just one line of code in your app setup. 
//This will render .hbs files when res.render is called.
app.set('view engine', 'hbs'); // --> we must have a folder name views

// register partial directory for resue code (footer, header, etc) the same in difference file
hbs.registerPartials(__dirname + '/views/partial');

// One problem comes here is when we have the same partial for each file 
// ==> it can be have the same data (same function)
// DRY (DON'T REPEAT YOURSELF)
// also use hbs for registering a helper

// note: when a .hbs file is render --> it looks for a data from helper first then data passed in render
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('funcHasPara', (message)=>{
    return message.toUpperCase();
})



// MidleWare 1
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`;
    fs.appendFile('server.log', log+'\n', (err)=>{
        if(err){
            console.log("Unable to append to server.log");
        }
    });
    next();
});
// Midleware 2
// app.use((req, res, next)=>{
//     res.render('maintenace.hbs');
// })

// set a pre static path for files (.html, .jpg, so on)
app.use(express.static(__dirname+'/public'));

// Handle each route (each request)
app.get('/', (req, res)=>{
    // console.log(res);
    // console.log(typeof res);
    // console.log(typeof req);
    // console.log(res)
    
    // res.send("<h1>Hello</h1>");


    res.render('home.hbs', {
        pageTitle : 'Home page _ Long pro',
        message : 'Welcome to LONG PHONG KHOANG',
        
    });
});


app.get('/about', (req, res)=>{
    // res.send({
    //     name: "author propk",
    //     age : 10000,
    //     skill: [
    //         'Javascript',
    //         'Java',
    //         'Python',
    //         'C++'
    //     ]
    // });

    // the second para is data we pass for .hbs file
    res.render('about.hbs', {
        pageTitle : 'About page _ Long pro',
    });
});

app.get('/project', (req, res)=>{
    res.render('project.hbs', {
        pageTitle: 'Projects'
    })
})



// listen request at port 3000, second arg is callback function --> is executed firstly when server is ready
app.listen(port, ()=>{
    console.log(`SERVER is up (ready) on port ${port}`);
});

