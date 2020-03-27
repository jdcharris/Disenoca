// jshint esversion: 6
var lati = document.getElementById("lat");
var long = document.getElementById("lon");
var fech = document.getElementById("fec");
var time = document.getElementById("hor");
var latitud, longitud, fecha, hora, mensaje, poly;
var mymap = L.map('mapid').setView([11.0192, -74.8505], 15);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicHVjY2luaWMiLCJhIjoiY2swOTh3NHA2MDVoczNtbW5odXAybDlxbSJ9.ySZV9JduMLAW8DphUa4Bsg'
}).addTo(mymap);
var marker = L.marker([11.0192, -74.8505]).addTo(mymap);

function actualizar() {
    fetch("/tr").then(res => {
        return res.json()
    }).then(data => {
        mensaje = data;
        latitud = data.latitud;
        longitud = data.longitud;
        fecha = data.fecha;
        hora = data.hora;
        lati.innerText = latitud;
        long.innerText = longitud;
        fech.innerText = fecha.slice(0, 10);
        time.innerText = hora;
        var latln = new L.LatLng(latitud, longitud);
        marker.setLatLng(latln);
        mymap.setView(latln);
        if (!poly) {
            poly = L.polyline([{ lat: latitud, lon: longitud }]).addTo(mymap);
        }
        poly.addLatLng(latln);
    });
}

var actualizar_w = setInterval(actualizar, 500);





// var req = new XMLHttpRequest();
// req.onreadystatechange = function(aEvt) {
//     if (req.readyState == 4) {
//         if (req.status == 200) {
//             let res = JSON.parse(req.responseText);
//             console.log(res);
//             let lat = `<b>latitud:</b> ${res.lat} `;
//             let lon = `<b>longitud:</b> ${res.lon} `;
//             let time = `<b>tiempo:</b> ${res.time} `;
//             let texti = '<p>' + lat + lon + time + '</p>';
//             $('#syrus').html(texti);
//             marker.setLatLng([res.lat, res.lon]);

//         }
//     } else {}
// };
// window.setInterval(function() {
//     req.open('GET', '/Appdata', true);
//     req.send(null);
// }, 9000);