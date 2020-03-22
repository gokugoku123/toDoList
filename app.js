const express = require('express');;
const bodyParser = require('body-parser');

const date = require(__dirname + '/date.js');
 
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", (req, res) => {

let day = date.getDate();

  res.render("list", {listTitle:day, newItems:items});

});

app.get("/work", (req, res) => {
  res.render("list", {listTitle : "Work", newItems : workItems})
});

app.post("/work", (req, res) => {
  let item = req.body.newItem;

  workItems.push(item);

  res.redirect("/work");
});

app.post("/", (req, res) => {
  let item = req.body.newItem;
  let buttonName = req.body.listButton;

    if(buttonName === "Work") {
      workItems.push(item);
      res.redirect("/work");
    } else {
      items.push(item);
      res.redirect("/");
    }



});

app.get("/about",(req,res) => {
  res.render("about");
})

app.listen(3000, () => {
  console.log("server running on port 3000");
})
