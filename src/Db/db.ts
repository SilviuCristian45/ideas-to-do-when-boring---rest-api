import sqlite3 from "sqlite3"
import { Activity, cherryPick } from "../Model/Activity";


export class Database {
   private db: sqlite3.Database

   constructor() {
        this.db = new sqlite3.Database("database.db");
   }

   public selectFromTable(tableName: string): Promise<Array<Activity>> {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM ${tableName}`, (err, data) => {
                if (err) reject('couldnt select from this table')
                resolve(data.map( (element) => cherryPick(element)))
            })
        }) 
   }

   public insertInTable(tableName: string, activity: Activity): Promise<void> {
        return new Promise( (resolve, reject) => {
            this.db.run(`INSERT INTO ${tableName} VALUES (?, ?, ?, ?, ?, ?, ?)`, [activity.activity, 
                                                                   activity.type,
                                                                activity.participants, 
                                                                activity.price,
                                                                activity.link,
                                                                activity.key,
                                                                activity.accessibility],
            (err) => {
                if (err) { console.log(err); reject(); return; }
                resolve()
           })
        }) 
   }
  
}