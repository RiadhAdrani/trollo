import Obj, { ObjOptions } from "./Obj";

export interface CheckItemOptions extends ObjOptions {
    text: string;
    dueDate?: number;
    doneDate?: number;
}

export default class CheckItem extends Obj {
    public text: string;
    public dueDate: number;
    public doneDate: number;

    constructor(options: CheckItemOptions) {
        super(options);

        this.dueDate = options.dueDate ?? -1;
        this.doneDate = options.doneDate ?? -1;
        this.text = options.text;
    }

    get isDone(): boolean {
        return this.doneDate > -1;
    }
}
