import * as express from "express";
import * as bodyParser from "body-parser";
import { ConfigRoutes } from "./routes/config"
import { ForecastRoutes } from "./routes/forecast"
import { WeatherRoutes } from "./routes/weather";

class App {

    public app: express.Application;
    public routeConfig: ConfigRoutes = new ConfigRoutes();
    public routeForecast: ForecastRoutes = new ForecastRoutes();
    public routeWeather: WeatherRoutes = new WeatherRoutes();

    constructor() {
        this.app = express();
        this.config();   
        this.routeConfig.routes(this.app);
        this.routeForecast.routes(this.app);
        this.routeWeather.routes(this.app);
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;