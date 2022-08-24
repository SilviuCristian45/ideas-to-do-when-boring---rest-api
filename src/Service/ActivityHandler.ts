import { json } from 'stream/consumers';
import {Activity, cherryPick, Convert, defaultActivity} from '../Model/Activity'
import {logger} from '../Logger/loggerActivity'
import { Database } from "../Db/db"
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const axios = require('axios').default;

export class Service {
    private endPoint: string = "https://www.boredapi.com/api/activity"
    public database: Database 

    constructor() {
        this.database = new Database()
    }

    async getRandomActivity(): Promise<Activity> {
        logger.debug(`request to ${this.endPoint}`)
        return axios.get(this.endPoint).then( (resp: any) => {
            return cherryPick(resp.data)
        }).catch((err: any) => console.log(err))
    }

    async getActivitiesByType(type: String): Promise<Array<Activity>> {
        logger.debug('http://localhost:3000/activities/?type')
        try {
            const activities = await this.database.selectFromTable('activities')
            return activities.filter( (activity) => activity.type === type )
        }
        catch (err) {
            return []
        }
    }
}

