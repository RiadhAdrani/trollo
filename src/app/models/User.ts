import Board from "./Board";
import Obj, { ObjOptions } from "./Obj";

export interface UserOptions extends ObjOptions {
    username: string;
    email: string;
    img: string;
    boards: Array<Board>;
}

export default class User extends Obj {
    public username: string;
    public email: string;
    public img: string;
    public boards: Array<Board>;

    constructor(options: UserOptions) {
        super(options);

        this.username = options.username;
        this.email = options.email;
        this.img = options.img;
        this.boards = options.boards;
    }
}
