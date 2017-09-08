var express = require('express');
var burgers = require('./../models/burgers.js');
var router = express.Router();

// This is the file where we make our routers!

//Here is where we write the get function for all the data:
// hbsObject stands for "Handlebars Object"
router.get('/', function(req,res){
    burgers.selectAll(function(data){
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject)
        res.render("index", hbsObject)
    });
    
});

router.post("/", function(req, res){
    burgers.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function() {
        res.redirect("/")
    })
});

router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition: ", condition);

    burgers.updateOne({
        devoured: req.body.devoured
    }, condition, function(){
        res.redirect("/")
    });
});



module.exports = router;