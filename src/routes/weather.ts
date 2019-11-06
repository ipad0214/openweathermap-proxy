import { Request, Response } from "express";
import * as fs from 'fs';
import axios from 'axios';

export class WeatherRoutes {
    private generateUrl() {
        let json:any = JSON.parse(fs.readFileSync("./config.json").toString());
        return `http://api.openweathermap.org/data/2.5/weather?zip=${json.zipCode},${json.countryCode}&units=metric&APPID=${json.apiKey}`;
    }

    private async getIcon(icon: string) {
        return new Promise((resolve, reject) => {
            axios.get(`http://openweathermap.org/img/wn/${icon}@2x.png`, {
                responseType: 'arraybuffer'
            }).then(resp => {
                resolve(new Buffer(resp.data, 'binary').toString('base64'));
            }).catch(error => {
                reject("")
            });
        });
    }
    
    public routes(app: any): void {
        app.route('/weather')
            .get((req: Request, res: Response) => {
                axios.get(this.generateUrl()).then(resp => {
                    this.getIcon(resp.data.weather[0].icon).then(icon => {
                        resp.data.weather[0].iconSrc = icon;
                        res.send(JSON.stringify(resp.data));
                    });
                }).catch(error => {
                    res.send(JSON.stringify(error));
                });
            });
    }
}