import * as figlet from 'figlet';
import app from "./main";
const PORT = 5001;

let boot: Promise<boolean> = new Promise((resolve: any, reject: any) => {
    figlet('Weather Proxy', (err, banner) => {
        if(err) {
            console.error("Something went wrong...");
            console.error(err)
            reject(false);
        }
    
        resolve(banner);
    })
});

boot.then((banner) => {
    console.info(banner);
    app.listen(PORT, () => {
        console.log('Express server listening on port ' + PORT);
    });
});

