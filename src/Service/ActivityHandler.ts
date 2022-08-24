import { json } from 'stream/consumers';
import {Activity, cherryPick, Convert, defaultActivity} from '../Model/Activity'
import {logger} from '../Logger/loggerActivity'
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const axios = require('axios').default;

export class Service {
    private endPoint: string = "https://www.boredapi.com/api/activity"

    async getRandomActivity(): Promise<Activity> {
        logger.debug(`request to ${this.endPoint}`)
        return axios.get(this.endPoint).then( (resp: any) => {
            return cherryPick(resp.data)
        }).catch((err: any) => console.log(err))
    }
}

