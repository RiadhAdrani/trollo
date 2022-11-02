import List from "./List";
import Obj, { ObjOptions } from "./Obj";

export interface BoardOptions extends ObjOptions {
    title: string;
    color: string;
    img: string;
    lists: Array<List>;
}

export default class Board extends Obj {
    public title: string;
    public color: string;
    public img: string;
    public lists: Array<List>;

    constructor(options: BoardOptions) {
        super(options);

        this.title = options.title;
        this.color = options.color;
        this.img = options.img;
        this.lists = options.lists;
    }
}
