var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var path = require("path");

var port = process.env.PORT || 8080;

var app = express();

//
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false}));

//Override with POST having ?_method = DELETE
app.use(methodOverride("_method"));

//set Handlebars here:
var expshbs = require("express-handlebars");

app.engine("handlebars", expshbs(
    { layoutsDir: path.join(__dirname, "views/layouts"), 
    defaultLayout : "main"}));
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'views'));

var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

app.listen(port, function(err){
    if (err) throw err;
    console.log("App listening on port " + port)
});
