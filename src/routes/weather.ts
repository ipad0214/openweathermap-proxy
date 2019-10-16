import { Request, Response } from "express";
import * as fs from 'fs';
import axios from 'axios';

export class WeatherRoutes {
    private generateUrl() {
        let json:any = JSON.parse(fs.readFileSync("./config.json").toString());
        return `http://api.openweathermap.org/data/2.5/weather?zip=${json.zipCode},${json.countryCode}&APPID=${json.apiKey}`;
    }
    
    public routes(app: any): void {
        app.route('/weather')
            .get((req: Request, res: Response) => {
                axios.get(this.generateUrl()).then(resp => {
                    console.log(resp.data);
                    res.send(JSON.stringify(resp.data));
                }).catch(error => {
                    res.send(JSON.stringify(error));
                });
            });
    }
}