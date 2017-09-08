//Set up your mySQL connection
var mysql = require('mysql');
var connection;

if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);

} else {connection = mysql.createConnection({
        port: 3306,
        host: "localhost",
        user: 'root',
        password: '1998',
        database: 'burgersDB'

    });
};

//Actually make the connection
connection.connect(function(err){
    if (err){
        console.error("There was an error connecting: " + err.stack);
        return;
    }
    console.log("Connected as ID " + connection.threadId + 
                "to port " + connection.port)
})

// Export this connection variable for the ORM to use:
module.exports = connection;