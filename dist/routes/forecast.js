"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const axios_1 = require("axios");
class ForecastRoutes {
    generateUrl() {
        let json = JSON.parse(fs.readFileSync("./config.json").toString());
        return `http://api.openweathermap.org/data/2.5/forecast?zip=${json.zipCode},${json.countryCode}&APPID=${json.apiKey}`;
    }
    routes(app) {
        app.route('/forecast')
            .get((req, res) => {
            axios_1.default.get(this.generateUrl()).then(resp => {
                res.send(JSON.stringify(resp.data));
            }).catch(error => {
                res.send(JSON.stringify(error));
            });
        });
    }
}
exports.ForecastRoutes = ForecastRoutes;
//# sourceMappingURL=forecast.js.map