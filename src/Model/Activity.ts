export interface Activity {
    activity:      string;
    type:          string;
    participants:  number;
    price:         number;
    link:          string;
    key:           string;
    accessibility: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toActivity(json: string): Activity {
        return JSON.parse(json);
    }

    public static activityToJson(value: Activity): string {
        return JSON.stringify(value);
    }
}

export let defaultActivity: Activity = {
    activity: "default",
    type: "default",
    participants: 5,
    price: 12,
    link: "a",
    key: "b",
    accessibility: 5
}

export let cherryPick= (object: any) : Activity => {
    return {
        activity: object.activity,
        type: object.type,
        participants: object.participants,
        price: object.price,
        link: object.link,
        key: object.key,
        accessibility: object.accessibility
    }
}