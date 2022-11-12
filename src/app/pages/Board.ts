import Dialog from "../components/Dialog/Dialog";
import ListView from "../components/List/ListView";
import Expanded from "../components/Utility/Expanded";
import useBoard from "../hooks/useBoard";
import Board from "../models/Board";
import { FlatInput } from "../components/Input/Input";
import { CenteredColumn, Column, Row, Spacer } from "@riadh-adrani/recursive-web/html";
import { renderRoute } from "../..";
import { SubTitle, TitleBig } from "../components/Title";
import { darkAccent, navBarHeight } from "../style";
import { StandardButton } from "../components/Button";
import Icon from "../components/Icon/Icon";
import { calc, url } from "@riadh-adrani/recursive-web/css";
import BoardLabelModal from "../components/Board/Board.labelModal";

export default () => {
  const {
    isLoading,
    isNotFound,
    board: _board,
    updateBoardTitle,
    showLabelsModal,
    setShowLabelModal,
  } = useBoard();

  if (isLoading) {
    return CenteredColumn({ children: SubTitle("Loading...") });
  }

  if (isNotFound) {
    return CenteredColumn({ children: TitleBig("😢 Unable to retrieve your board !") });
  }

  const board = _board as Board;

  return Column({
    className: ["board-bg"],
    style: {
      normal: {
        backgroundImage: url(board.img),
        height: calc("100vh", "-", navBarHeight),
        width: "100vw",
        overflowY: "hidden",
      },
    },
    children: [
      Column({
        style: {
          normal: {
            flex: "1",
            color: "white",
            overflowY: "hidden",
            padding: ["15px", "20px"],
          },
        },
        className: ["board-paper"],
        children: [
          Row({
            children: [
              Expanded(
                FlatInput({
                  value: board.title,
                  placeholder: "Board title",
                  color: "white",
                  onInput: (e) => {
                    updateBoardTitle(e.currentTarget.value);
                  },
                })
              ),
              Spacer({ width: "10px" }),
              StandardButton({
                text: Icon("fa-tag"),
                color: darkAccent,
                onClick: () => {
                  setShowLabelModal(true);
                },
              }),
            ],
          }),
          Spacer({ height: "15px" }),
          Row({
            style: {
              normal: {
                flex: "1",
                marginBottom: "10px",
                overflowY: "hidden",
              },
            },
            children: board.lists.map((list) => ListView(list, board.id)),
          }),
        ],
      }),
      BoardLabelModal(),
      renderRoute(),
    ],
  });
};
