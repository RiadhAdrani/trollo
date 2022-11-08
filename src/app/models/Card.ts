import CheckItem from "./CheckItem";
import Label from "./Label";
import Obj, { ObjOptions } from "./Obj";

export interface CardOptions extends ObjOptions {
    title: string;
    description?: string;
    labels?: Array<Label>;
    checkItems?: Array<CheckItem>;
}

export default class Card extends Obj {
    public title: string;
    public description: string;
    public labels: Array<Label>;
    public checkItems: Array<CheckItem>;

    constructor(options: CardOptions) {
        super(options);

        this.title = options.title;
        this.description = options.description ?? "";
        this.labels = options.labels ?? [];
        this.checkItems = options.checkItems ?? [];
    }
}
