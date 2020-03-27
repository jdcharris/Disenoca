var mysql = require('mysql');
var latitud, longitud, fecha, hora;
var con = mysql.createConnection({
    host: "design.ck9qlt1qutiu.us-east-1.rds.amazonaws.com",
    user: "dark",
    password: "mr01121998",
    database: 'design'
});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE syrusdb (name VARCHAR(255), address VARCHAR(255))";
//     con.query(sql, function(err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });

latitud = 10.9325;
longitud = -74.5698;
fecha = 2020 - 3 - 27;


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO syrusdb (latitud,longitud,fecha,hora) VALUES ?";
    var values = [
        [latitud, longitud, fecha, '19:57:10']
    ];
    con.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("insert");
    });
});