import Card from "./Card";
import Obj, { ObjOptions } from "./Obj";

export interface ListOptions extends ObjOptions {
  title: string;
  cards?: Array<Card>;
}

export default class List extends Obj {
  public title: string;
  public cards: Array<Card>;

  constructor(options: ListOptions) {
    super(options);

    this.title = options.title;
    this.cards = options.cards ?? [];
  }
}
