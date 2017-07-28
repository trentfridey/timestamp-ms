var express = require('express');

var app = express();

app.use(express.static('static'))

app.get('/', function(req, res){
  res.render('index.html');
});

app.get('/:date', function(req, res){
  var ts = {};
  var reqDate = req.params.date.toString();
  if(reqDate.match(/[^0-9]{1,}/)){
    if(new Date(reqDate)){
      var dt = new Date(reqDate);
      ts.unix = dt.getTime()/1000; // getTime returns milliseconds
      ts.natural = reqDate;
    }
    else {
      ts.unix = null;
      ts.natural = null;
    }
  }
  else {
    if(new Date(parseInt(reqDate)*1000)){
      var dt = new Date(parseInt(reqDate)*1000);
      ts.unix = parseInt(reqDate);
      ts.natural = dt.getMonth() + " " + dt.getDate() + ", " + dt.getYear();
    }
    else {
      ts.unix = null;
      ts.natural = null;
    }
  }
  res.json(ts);
});

app.listen(3000);