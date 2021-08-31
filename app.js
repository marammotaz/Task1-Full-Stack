const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const weather= require('./models/weatherDetails')
var axios= require("axios").default ;
const dotenv = require('dotenv').config()
const app = express();

// connect to mongodb & listen for requests
const dbURI = process.env.URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.PORT||3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});


var options = {
  method: 'GET',
  url: process.env.API ,
  params: {q: 'cairo'},
  headers: {
    'x-rapidapi-host': process.env.host,
    'x-rapidapi-key': process.env.key
  }
};
app.get('/weather', (req,res)=>{
axios.request(options).then(function (response) {
	
       var x=response.data.location.name;
       var y=response.data.location.country;
       var z=response.data.current.temp_c;
       var m=response.data.location.localtime;
       var n=response.data.current.wind_degree;
       var o=response.data.current.cloud;

       const maram = new weather ({
        name:x,
        country:y,
        Temp:z,
        LocalTime:m,
        winddegree:n,
        cloud:o,

      });
  
      maram.save().catch (err=> {console.log(err);})

        res.render('weather',{title:'the weather', x,y,z,m,n,o});
    })
    .catch(function (error) {
      console.error(error);
    });
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});