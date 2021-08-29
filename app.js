const express = require('express');
//const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
var axios= require("axios").default ;

const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://maram:maram123@cluster0.ybd7z.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
//app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});


// blog routes
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
  // console.log(req.body);
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
  url: 'https://weatherapi-com.p.rapidapi.com/timezone.json',
  params: {q: 'cairo'},
  headers: {
    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
    'x-rapidapi-key': '550d5c0adbmshef0d5eeb82e44dap1f663cjsn71ba1944d4b6'
  }
};
app.get('/weather', (req,res)=>{
axios.request(options).then(function (response) {
	
       var x=response.data.location.name;
       var y=response.data.location.country;
       var z=response.data.location.lat;
       var m=response.data.location.localtime;
       
        res.render('weather',{x,y,z,m});
    })
    .catch(function (error) {
      console.error(error);
    });
})





// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});