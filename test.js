var axios= require("axios").default ;
const express = require('express');
const app = express();
app.listen(3000);
app.set('view engine','ejs');
var options = {
  method: 'GET',
  url: 'https://weatherapi-com.p.rapidapi.com/timezone.json',
  params: {q: 'cairo'},
  headers: {
    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
    'x-rapidapi-key': '550d5c0adbmshef0d5eeb82e44dap1f663cjsn71ba1944d4b6'
  }
};
axios.request(options).then(function (response) {
	app.get('/weather', (req,res)=>{
       var x=response.data.location.name;
      
        res.render('weather',{x});
    })
}).catch(function (error) {
	console.error(error);
});
