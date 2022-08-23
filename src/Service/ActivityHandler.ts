import { json } from 'stream/consumers';
import {Activity, cherryPick, Convert, defaultActivity} from '../Model/Activity'
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const axios = require('axios').default;

export class Service {
    endPoint: string = "https://www.boredapi.com/api/activity"

    async getRandomActivity(): Promise<Activity> {
        return axios.get(this.endPoint).then( (resp: any) => {
            return cherryPick(resp.data)
        }).catch((err: any) => console.log(err))
    }
}

