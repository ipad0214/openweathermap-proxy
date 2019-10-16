import { Request, Response } from "express";
import * as fs from 'fs';

export class ConfigRoutes {
    public routes(app: any): void {
        app.route('/config')
            .get((req: Request, res: Response) => {
                let json:any = JSON.parse(fs.readFileSync("./config.json").toString());
                res.status(200).send(json);
            })
            .post((req: Request, res: Response) => {
                let json:any = JSON.parse(fs.readFileSync("./config.json").toString());
                json.apiKey = req.body.apiKey;
                json.pollingDuration = req.body.pollingDuration;
                json.zipCode = req.body.zipCode;
                json.countryCode = req.body.countryCode;
                fs.writeFileSync("./config.json", JSON.stringify(json));
                res.send(fs.readFileSync("./config.json"));
            });

        app.route("/config/apiKey")
            .get((req: Request, res: Response) => {
                let json:any = JSON.parse(fs.readFileSync("./config.json").toString());
                res.send(json.apiKey);
            })
            .post((req: Request, res: Response) => {
                let json:any = JSON.parse(fs.readFileSync("./config.json").toString());
                json.apiKey = req.body.apiKey;
                fs.writeFileSync("./config.json", JSON.stringify(json));
                res.send(fs.readFileSync("./config.json"));
            });
    }
}