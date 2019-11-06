import { Request, Response } from "express";
import * as fs from 'fs';
import axios from 'axios';

export class ForecastRoutes {
    private generateUrl() {
        let json:any = JSON.parse(fs.readFileSync("./config.json").toString());
        return `http://api.openweathermap.org/data/2.5/forecast?zip=${json.zipCode},${json.countryCode}&units=metric&APPID=${json.apiKey}`;
    }
    
    public routes(app: any): void {
        app.route('/forecast')
            .get((req: Request, res: Response) => {
                axios.get(this.generateUrl()).then(resp => {
                    res.send(JSON.stringify(resp.data));
                }).catch(error => {
                    res.send(JSON.stringify(error));
                });
            });
    }
}