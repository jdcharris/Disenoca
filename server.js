// jshint esversion: 6
//data base conection 
var mysql = require('mysql');
var latitud, longitud, fecha, hora, mensaje;
var con = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ''
});

//Udp conection
const dgram = require('dgram');
const UDP_PORT = '53000';
const IP_ADRESS = '192.168.0.10';
const server = dgram.createSocket('udp4');
server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    mensaje = msg.toString('utf8')
    fecha = mensaje.slice(4, 17)
    id = mensaje.slice(38, 42);
    latitud = mensaje.slice(17, 25);
    longitud = mensaje.slice(25, 34);

    fech = new Date(parseFloat(fecha));
    fecha = `${fech.getFullYear()}-${fech.getMonth() + 1}-${fech.getDate()}`;
    hora = `${fech.getHours()}:${fech.getMinutes()}:${fech.getSeconds()}`;
    if (con) {
        console.log("Connected!");
        var sql = "INSERT INTO syrusdb (latitud,longitud,fecha,hora) VALUES ?";
        var values = [
            [latitud, longitud, fecha, hora]
        ];
        con.query(sql, [values], function(err, result) {
            if (err) throw err;
            console.log("insert");
        });
    } else {
        console.log("Problem with db");
    }



});

server.bind(UDP_PORT, IP_ADRESS);

//server conection
const express = require('express');
const TCP_PORT = 8080;
const app = express();

app.use(express.static('Public'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/tr', (req, res) => {
    if (con) {
        var sql = "SELECT * FROM syrusdb ORDER BY id DESC limit 1 ";
        con.query(sql, function(err, result) {
            if (err) throw err;
            res.json(result[0]);
        });
    } else {
        console.log("error conection with db");
    }
});

app.get('/Appdata');

app.listen(TCP_PORT, function() {
    console.log('Server started at port ' + TCP_PORT.toString());
});
