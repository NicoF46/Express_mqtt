var mqtt = require('mqtt');
const config = require("./../config");
const MQTT_ENV = config.services.MQTT;
const fs = require('fs');
var caFile = fs.readFileSync('storage/client-certs/ca.crt');
var KEY = fs.readFileSync('storage/client-certs/client.key');
var CERT = fs.readFileSync('storage/client-certs/client.crt');


var options = {
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    rejectUnauthorized: false,
    username: MQTT_ENV.USERNAME,
    password: MQTT_ENV.PASSWORD,
    qos: 2,
    port: MQTT_ENV.PORT,
    key: KEY,
    cert: CERT,
    ca: caFile,
    clean: true
}
console.log("[MQTT] Entrando al archivo de configuracion del servicio");

const URI = `mqtts://${MQTT_ENV.HOST}`;
console.log("MQTT:" + URI);
const client = mqtt.connect(URI, options);

var arrayTopicsListen = [];
var arrayTopicsServer = [];
// connected
client.on('connect', function () {
    console.log("[MQTT] Init: Connected");
});
//handle errors
client.on("error", function (error) {
    console.log("[MQTT] Error: OCURRIÓ UN PROBLEMA: " + error);
});

client.MQTTOptions = options;
module.exports = client;