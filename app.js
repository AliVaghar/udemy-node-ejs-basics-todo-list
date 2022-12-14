const express = require("express");
const bodyParser = require("body-parser");
const methods = require(__dirname + "/methods.js");
const mongoose = require("mongoose");

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// use all of the contents in public folder
app.use(express.static("public"));

// Connet to DB (will be created if not already existed)
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/ToDoListDB", {
  useNewUrlParser: true,
});

// We have to define a Schema (we can embed a few constraints on the schema - see mongoose schema data validation)
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required!"],
  },
});

// Define collection and assign schema - mongo will use lower case when create it.
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({ name: "test item 1" });

// var items = ["Default Task 1"];

function addItem(item) {
  // items.push(item);
  Item.insertMany([new Item({ name: item })])
    .then(function () {
      console.log("Data inserted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
}

function removeItem(item_id) {
  Item.findByIdAndRemove(item_id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed item : ", docs);
    }
  });
  // Item.deleteOne({ _id: item_id }, function (err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("successfull deleted!");
  //   }
  // });
}

app.get("/", function (req, res) {
  let day = methods.getDate();
  Item.find({}, function (err, items) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { TODAY: day, TASKS: items });
    }
  });
});

app.post("/add", function (req, res) {
  let newTask = req.body.task;
  addItem(newTask);
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const item_id = req.body.checkbox;
  console.log(item_id);
  removeItem(item_id);
  res.redirect("/");
});

// dynamic route
app.get("/:customer_input", function(req, res) {
  console.log(req.params.customer_input);
  console.log(req.params)
});

app.listen(3000, function () {});
