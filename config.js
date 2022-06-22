require("dotenv").config();
module.exports = {
    services: {
        API: {
            HOST: process.env.API_HOST || "",
            PORT: process.env.API_PORT || ""
        },
        MQTT: {
            USERNAME: process.env.MQTT_USERNAME || "",
            PASSWORD: process.env.MQTT_PASSWORD || "",
            HOST: process.env.MQTT_HOST,
            PORT: process.env.MQTT_PORT
        },
        DATABASE: {
            POSTGRES: {
                USERNAME: process.env.DB_POSTGRES_USERNAME || "",
                PASSWORD: process.env.DB_POSTGRES_PASSWORD || "",
                DBNAME: process.env.DB_POSTGRES_NAME || "",
                HOST: process.env.DB_POSTGRES_HOST || "",
                PORT: process.env.DB_POSTGRES_PORT || ""
            }
        }
    },
    ROUTER_PATH: process.env.ROUTER_PATH || "",
    ENVIRONMENT: process.env.ENVIRONMENT || ""
}