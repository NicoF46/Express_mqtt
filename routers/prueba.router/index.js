const dispositivo = require("./models/dispositivos");
const logs = require("./models/logs");
const clientMqtt = require("../../storage/mqtt");
const { json } = require("express");
const options = clientMqtt.MQTTOptions;
var arrayTopicsListen = ["/#"];
var arrayTopicsServer = ["/expressApp/"];
var pool = require('../../storage/database/postgres');
var moment = require('moment-timezone');

clientMqtt.on("connect", async function () {
    //BUSCO TODOS LOS NODOS NO REPETIDOS
    console.log("Estoy conectado al broker mqtt")

    clientMqtt.subscribe(arrayTopicsListen, options, () => {
        console.log("Subscribed to topics: ");
        console.log(arrayTopicsListen);
    });
    //console.log(arrayTopicsServer);
    for (var elemento in arrayTopicsServer) {
        //console.log("MQTT: " + elemento);
        const mensaje = {
            dispositivoId: elemento,
            nombre: "ESP32_TEMP_NODEjs",
            ubicacion: "Terraza",
            logId: 1,
            ts: new Date().getTime(),
            luz1: 0,
            luz2: 0,
            temperatura: 16,
            humedad: 80,
            nodoId: 0,
        };
        const payload = JSON.stringify(mensaje);
        // Publico mensajes al inicio del servicio para verificar la subscripción
        clientMqtt.publish(arrayTopicsServer[elemento], payload, options, (error) => {
            if (error) {
                console.log(error);
            }
        })
    }
    clientMqtt.on("message", async (topic, payload) => {
        console.log("[MQTT] Mensaje recibido: " + topic + ": " + payload.toString());
        console.log(topic);
        if (topic == '/departamento/e/comedor/planta/regador') {
            var mensaje = payload.toString();
            const jason = JSON.parse(mensaje);
            console.log(jason.dispositivo_id);
            console.log(moment().format());
            pool.query('Insert into RECORDS (device_id,value,created_at) VALUES ($1, $2, $3)', [jason.dispositivo_id, jason, moment().format()], function (err, result, fields) {
                if (err) {
                    console.log(err);
                    console.log("Error al intentar guardar los datos en la base de datos");
                    return;
                }
                console.log("Se ha registrado la lectura correctamente en la base de datos");
            });
        }
     })

})

const register = (router) => {
    router.get("/status", (req, resp) => resp.json({ status: 200 }));

    router.get('/dispositivos', async function (req, res) {
        const listado = await dispositivo.find();
        if (!listado) return res.json({ data: null, error: 'No hay datos en la Base de Datos.' });
        if (listado) return res.json({ data: listado, error: null });
    });

    router.get('/dispositivos/:id', async function (req, res) {
        const listado = await dispositivo.findOne({ "_id": req.params.id });
        if (!listado) return res.json({ data: null, error: 'No hay datos en la Base de Datos.' });
        if (listado) return res.json({ data: listado, error: null });
    });

    return router;
};

module.exports = {
    register,
};
