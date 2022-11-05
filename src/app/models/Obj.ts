export interface ObjOptions {
    id?: string;
    cDate?: number;
}

export default class Obj {
    public cDate: number = Date.now();
    public id: string;

    constructor(options: ObjOptions) {
        this.cDate = options.cDate ?? Date.now();
        this.id = options.id ?? (Date.now() * Math.random()).toString();
    }
}
