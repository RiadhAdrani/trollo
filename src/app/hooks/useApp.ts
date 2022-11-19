import { setEffect, setState } from "../..";
import { addNewBoard, getUserBoards } from "../data";
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

  const addBoard = async (board: Board) => {
    boards.push(board);
    setBoards(boards);
    await addNewBoard(board);
  };

  return { isLogged, boards, addBoard };
};
