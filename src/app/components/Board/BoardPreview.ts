import { Column, Link } from "@riadh-adrani/recursive-web/html";
import Board from "../../models/Board";
import { radius, transitionDuration } from "../../style";
import { SubTitle } from "../Title";

export default (board: Board) => {
    return Link({
        className: ["board-bg", "no-deco"],
        href: `/board/${board.id}`,
        style: {
            className: "board-preview",
            normal: {
                display: "flex",
                flexDirection: "column",
                height: "100px",
                backgroundColor: board.color,
                backgroundImage: `url('${board.img}')`,
                borderRadius: radius,
                cursor: "pointer",
            },
        },
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
