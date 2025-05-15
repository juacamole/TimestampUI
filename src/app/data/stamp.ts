export class Stamp {
    public id!: number;
    public time!: string;
    user!: {
        "id": number,
        "username": string,
        "firstname": string,
        "lastname": string,
        "workhours": number,
        "workminutes": number,
    }
}