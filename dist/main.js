"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const config_1 = require("./routes/config");
const forecast_1 = require("./routes/forecast");
const weather_1 = require("./routes/weather");
class App {
    constructor() {
        this.routeConfig = new config_1.ConfigRoutes();
        this.routeForecast = new forecast_1.ForecastRoutes();
        this.routeWeather = new weather_1.WeatherRoutes();
        this.app = express();
        this.config();
        this.routeConfig.routes(this.app);
        this.routeForecast.routes(this.app);
        this.routeWeather.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App().app;
//# sourceMappingURL=main.js.map