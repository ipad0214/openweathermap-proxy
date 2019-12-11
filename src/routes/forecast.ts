import { Request, Response } from "express";
import * as fs from 'fs';
import axios from 'axios';
import { TimeStamp } from '../timestamp';

export class ForecastRoutes {
    private lastPoll: Date = null;
    private data: String = "";
    private timeStamp: TimeStamp;
    private cachedWeatherData: String = "";

    constructor() {
        this.timeStamp = new TimeStamp();
    }

    private generateUrl() {
        let json:any = JSON.parse(fs.readFileSync("./config.json").toString());
        return `http://api.openweathermap.org/data/2.5/forecast?zip=${json.zipCode},${json.countryCode}&units=metric&APPID=${json.apiKey}`;
    }

    public routes(app: any): void {
        app.route('/forecast')
            .get((req: Request, res: Response) => {
                this.timeStamp.isPolltimeReached(new Date()).then(polltimeIsReached => {
                    if (polltimeIsReached) {
                        axios.get(this.generateUrl()).then(resp => {
                            let weatherData = JSON.stringify(resp.data);
                            this.cachedWeatherData = weatherData;
                            res.send(weatherData);
                        }).catch(error => {
                            res.send(JSON.stringify(error));
                        });
                    } else {
                        res.send(this.cachedWeatherData);
                    }
                });
            });
    }
}