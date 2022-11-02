import Obj, { ObjOptions } from "./Obj";

export interface LabelOptions extends ObjOptions {
    text: string;
    color: string;
}

export default class Label extends Obj {
    public text: string;
    public color: string;

    constructor(options: LabelOptions) {
        super(options);

        this.color = options.color;
        this.text = options.text;
    }
}
