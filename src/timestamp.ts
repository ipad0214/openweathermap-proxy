import axios from 'axios';
import { readFileSync } from "fs";

export class TimeStamp {

    private lastTimeStamp: Date;

    private loadConfig(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve(JSON.parse(readFileSync("./config.json").toString()));
        });
    }

    private calcNewPollTime(pollingDuration: string): Date {
        return new Date(this.lastTimeStamp.getTime() + parseInt(pollingDuration) * 60000);
    }

    public isPolltimeReached(current: Date): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if(this.lastTimeStamp === undefined) {
                console.log("get new first time");
                this.lastTimeStamp = current;
                resolve(true);
                return;
            }
            this.loadConfig().then((config: any) => {
                let pollTime: Date = this.calcNewPollTime(config.pollingDuration);
                if(pollTime <= current) {
                    this.lastTimeStamp = current;
                    console.log("get new");
                    resolve(true);
                    return;
                } else {
                    console.log("get cached");
                    resolve(false);
                    return;
                }
            });
        });
    }
}