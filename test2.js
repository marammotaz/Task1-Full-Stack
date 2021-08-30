
var axios= require("axios").default ;
const express = require('express');
const app = express();
app.listen(3000);
app.set('view engine','ejs');

var options = {
  method: 'GET',
  url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
  params: {q: 'London', days: '3'},
  headers: {
    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
    'x-rapidapi-key': '550d5c0adbmshef0d5eeb82e44dap1f663cjsn71ba1944d4b6'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});