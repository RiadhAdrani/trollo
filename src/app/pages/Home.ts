import { CenteredColumn, Column, Div } from "@riadh-adrani/recursive-web/html";
import { BaseElement } from "@riadh-adrani/recursive-web/lib";
import { goTo } from "../..";
import BoardPreview from "../components/Board/BoardPreview";
import Icon from "../components/Icon/Icon";
import useApp from "../hooks/useApp";
import Board from "../models/Board";
import { lightAccent, radius } from "../style";

export default (): BaseElement => {
  const { boards, addBoard } = useApp();

  return Column({
    style: {
      normal: {
        alignItems: "center",
        flex: "1",
        marginTop: "20px",
      },
    },
    children: [
      Div({
        style: {
          normal: {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridColumnGap: "10px",
            gridRowGap: "10px",
            minWidth: "1000px",
          },
        },
        children: [
          ...boards.map(BoardPreview),
          CenteredColumn({
            style: {
              normal: { backgroundColor: lightAccent, borderRadius: radius, cursor: "pointer" },
              hover: { opacity: "0.8" },
            },
            children: Icon("fa-add"),
            onClick: () => {
              const board = new Board({ title: "Nameless board" });

              addBoard(board).then(() => goTo(`/board/${board.id}`));
            },
          }),
        ],
      }),
    ],
  });
};
