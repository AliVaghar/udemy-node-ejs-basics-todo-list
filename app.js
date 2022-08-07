const express = require("express");
const bodyParser = require("body-parser");

app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// use all of the contents in public folder
app.use(express.static("public"));

var items = [];

function addItem(item) {
  items.push(item);
};

app.get("/", function(req, res) {
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let day = new Date().toLocaleDateString('en-us', options);
  console.log(items);
  res.render('index', {TODAY: day, TASKS: items});
})

app.post("/add", function(req, res) {
  let newTask = req.body.task;
  addItem(newTask);
  res.redirect("/");
});

app.listen(3000, function(){
})
