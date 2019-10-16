"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class ConfigRoutes {
    routes(app) {
        app.route('/config')
            .get((req, res) => {
            let json = JSON.parse(fs.readFileSync("./config.json").toString());
            res.status(200).send(json);
        })
            .post((req, res) => {
            let json = JSON.parse(fs.readFileSync("./config.json").toString());
            json.apiKey = req.body.apiKey;
            json.pollingDuration = req.body.pollingDuration;
            json.zipCode = req.body.zipCode;
            json.countryCode = req.body.countryCode;
            fs.writeFileSync("./config.json", JSON.stringify(json));
            res.send(fs.readFileSync("./config.json"));
        });
        app.route("/config/apiKey")
            .get((req, res) => {
            let json = JSON.parse(fs.readFileSync("./config.json").toString());
            res.send(json.apiKey);
        })
            .post((req, res) => {
            let json = JSON.parse(fs.readFileSync("./config.json").toString());
            json.apiKey = req.body.apiKey;
            fs.writeFileSync("./config.json", JSON.stringify(json));
            res.send(fs.readFileSync("./config.json"));
        });
    }
}
exports.ConfigRoutes = ConfigRoutes;
//# sourceMappingURL=config.js.map