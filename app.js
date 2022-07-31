const express = require("express");
const bodyParser = require("body-parser");

app = express();

app.set('view engine', 'ejs');

function getStringDay(numberDay) {
  switch(numberDay) {
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    case 7:
      return 'Sunday';
  }
}

app.get("/", function(req, res) {
  let day = new Date();
  res.render('index', {TODAY: getStringDay(day.getDay())});
})

app.listen(3000, function(){
})
