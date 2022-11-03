import { setEffect, setState } from "../..";
import { getUserBoards } from "../data";
import Board from "../models/Board";
import User from "../models/User";

interface AppProps {
    user?: User;
}

export default () => {
    const [app, setApp] = setState<AppProps>("app", {
        user: new User({
            cDate: Date.now(),
            email: "e@mail.com",
            id: Date.now().toString(),
            img: "",
            username: "Da Usa",
        }),
    });

    const [boards, setBoards] = setState<Array<Board>>("user-boards", []);

    setEffect("get-user-boards", [app.user], () => {
        if (!app.user) return;

        async function getBoards() {
            const res = await getUserBoards(app.user.id);

            setBoards(res);
        }

        getBoards();
    });

    const isLogged = app.user !== undefined;

    return { isLogged, boards };
};
