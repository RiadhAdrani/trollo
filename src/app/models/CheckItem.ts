import Obj, { ObjOptions } from "./Obj";

export interface CheckItemOptions extends ObjOptions {
    text: string;
    dueDate: number;
    doneDate: number;
}

export default class CheckItem extends Obj {
    public text: string;
    public dueDate: number;
    public doneDate: number;

    constructor(options: CheckItemOptions) {
        super(options);

        this.dueDate = options.dueDate;
        this.doneDate = options.doneDate;
        this.text = options.text;
    }
}
