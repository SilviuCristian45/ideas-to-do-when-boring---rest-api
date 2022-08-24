import express from "express";
import { Database } from "../Db/db"
import { Activity, cherryPick } from "../Model/Activity";
import { Service } from "../Service/ActivityHandler";
import {logger} from '../Logger/loggerActivity'
import { AnyARecord } from "dns";
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);

export class Api {
    app: any;
    port: number;
    service: Service
    database: Database

    constructor() {
        this.app = express()
        this.port = 3000    
        this.configureApp()
        this.service = new Service()
        this.database = new Database()
    }

    private configureApp() {
        this.app.use(session({
            store: new SQLiteStore,
            secret: 'your secret',
            cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 week
        }));
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}));
    }
    
    public start() {
        this.app.get('/activity', (req: any, res: any) => {
            this.service.getRandomActivity().then( (activity: Activity) => {
                res.json(activity)
            }).catch(err => {
                logger.error(err)
                res.status(404)
            })
        })

        this.app.get('/activities', (req: any, res: any) => {
            this.database.selectFromTable('activities').then( activities => {
                res.json(activities)
            }).catch(err => {
                logger.error(err)
                res.status(404)
            })
        })

        this.app.post('/placeActivity', (req: any, res: any) => {
            const newActivity = cherryPick(req.body)
            this.database.insertInTable('activities', newActivity).then( () => {
                res.json(newActivity)
            }).catch(err => {
                logger.error(err)
                res.status(404)
            })
        })

        this.app.post('/placeRandomActivity', (req: any, res: any) => {
            this.service.getRandomActivity().then( activity => {
                this.database.insertInTable('activities', activity).then( () => {
                    res.json(activity)
                }).catch(err => {
                    logger.error(err)
                    res.status(404)
                })
            })
        })

        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }

    public stop() {
        this.app.stop
    }
}