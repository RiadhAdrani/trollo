import { B, Column, Link } from "@riadh-adrani/recursive-web/html";
import Board from "../../models/Board";
import { radius, transitionDuration } from "../../style";
import { SubTitle } from "../Title";

export default (board: Board) => {
    return Link({
        style: {
            className: "board-preview",
            normal: {
                display: "flex",
                flexDirection: "column",
                height: "100px",
                backgroundColor: board.color,
                backgroundImage: `url('${board.img}')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: radius,
                cursor: "pointer",
            },
        },
        children: Column({
            style: {
                className: "board-paper",
                normal: {
                    backgroundColor: "#00000077",
                    flex: "1",
                    padding: ["10px", "20px"],
                    borderRadius: "inherit",
                    transitionDuration,
                },
                hover: {
                    backgroundColor: "#000000aa",
                },
            },
            children: [SubTitle(board.title, "white")],
        }),
    });
};
