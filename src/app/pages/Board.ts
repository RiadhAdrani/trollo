import { CenteredColumn, Column, Row, Spacer } from "@riadh-adrani/recursive-web/html";
import { getParams, renderRoute } from "../..";
import ListView from "../components/List/ListView";
import { SubTitle, TitleBig, TitleSmall } from "../components/Title";
import useBoard from "../hooks/useBoard";
import Board from "../models/Board";
import { navBarHeight } from "../style";

export default () => {
    const { isLoading, isNotFound, board: _board } = useBoard();

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
                backgroundImage: `url(${board.img})`,
                height: `calc(100vh - ${navBarHeight})`,
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
                        padding: ["10px", "20px"],
                    },
                },
                className: ["board-paper"],
                children: [
                    TitleSmall(board.title),
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
            renderRoute(),
        ],
    });
};
