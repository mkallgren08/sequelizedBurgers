var connection = require('./connection.js');



// Helper function for SQL syntax.
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

// Another helper function for SQL Syntax
function objToSQL(ob){
    var arr = [];

    for (var key in ob){
        if(Object.hasOwnProperty.call(ob, key)){
            arr.push(key + "=" + ob[key]);
        }
    }

    return arr.toString();
}

// ORM stands for "Object Relational Mapping". This basically means using 
// constructed objects as a translator between normally incompatiable languages,
// like JS and MySQL!

// This object, called orm, will be the object used to define all the needed SQL
// statement functions:

// * `selectAll()` 
// * `insertOne()` 
// * `updateOne()` 

var orm = {
    selectAll: function( tableInput, cb){
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
          cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb){
        var queryString = "INSERT INTO " + table;
        
            queryString += " (";
            queryString += cols.toString();
            queryString += ") ";
            queryString += "VALUES (";
            queryString += printQuestionMarks(vals.length);
            queryString += ") ";
        
            console.log(queryString);
        
            connection.query(queryString, vals, function(err, result) {
              if (err) {
                throw err;
              }
              cb(result);
            });
    }, updateOne: function(table, objColVals, condition, cb){
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSQL(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result)
        });
    }
};


module.exports = orm

