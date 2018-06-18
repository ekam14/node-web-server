const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');   //to use partials i.e same code at different locations//
//Tells us about the view engine of the template (template engine)
app.set('view engine','hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'\n',(err) =>{
    if(err){
      console.log('Unable to append to the server.log');
    }
  });
  next(); //will hang here if next is not called//
});

// app.use((req,res,next) => {
//   res.render('maintainence.hbs');
// });

//Middleware to use the static public folder
app.use(express.static(__dirname + '/public'));

//Hbs helper functions ,used if we are sending same key-value pair as an argument
hbs.registerHelper('getYear',() =>{
  return new Date().getFullYear();
});

app.get('/',(req,res) =>{
  res.render('home.hbs',{
    message:"Welcome to the Home page of the app",
    title:'Home Page'
  });
});

app.get('/about',(req,res) =>{
  res.render('about.hbs',{   //helps to call the templates in views folder
    title:'About Page'
  });
});

app.get('/projects',(req,res) =>{
  res.render('projects.hbs',{
    message:"My projects here",
    title:'Projects Page'
  });
});

app.listen(port,() => {
  console.log('App started at port ',port);
});
