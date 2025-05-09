export class Stamp {
    public id!: number;
    public time!: string;
    user!: {
        "id": number,
        "username": string,
        "firstName": string,
        "lastName": string,
        "workhours": number,
        "workminutes": number,
    }
}