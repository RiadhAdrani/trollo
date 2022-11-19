import { createComponentStyle } from "@riadh-adrani/recursive-web";
import { Column, Link } from "@riadh-adrani/recursive-web/html";
import { ComponentStyleSheet } from "@riadh-adrani/recursive-web/lib";
import { merge } from "@riadh-adrani/utility-js";
import Board from "../../models/Board";
import { radius, transitionDuration } from "../../style";
import { SubTitle } from "../Title";

export const boardCardStyle = createComponentStyle({
  className: "board-preview",
  normal: {
    display: "flex",
    flexDirection: "column",
    height: "100px",
    borderRadius: radius,
    cursor: "pointer",
  },
});

export default (board: Board) => {
  return Link({
    className: ["board-bg", "no-deco"],
    href: `/board/${board.id}`,
    style: merge<ComponentStyleSheet>(boardCardStyle as Record<string, any>, {
      normal: {
        backgroundColor: board.color,
        backgroundImage: `url('${board.img}')`,
      },
    }),
    children: Column({
      className: ["board-paper", "board-paper-effect"],
      style: {
        normal: {
          flex: "1",
          padding: ["10px", "20px"],
          borderRadius: "inherit",
          transitionDuration,
        },
      },
      children: [SubTitle(board.title, "white")],
    }),
  });
};
