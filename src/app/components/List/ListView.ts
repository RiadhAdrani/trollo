import { Column, Div } from "@riadh-adrani/recursive-web/html";
import List from "../../models/List";
import { darkAccent, lightAccent, radius } from "../../style";
import CardView from "../Card/CardView";
import { SubTitle } from "../Title";

export default (list: List, board: string) => {
    return Column({
        style: {
            normal: {
                minWidth: "300px",
                maxWidth: "300px",
                color: darkAccent,
                marginRight: "10px",
                overflowY: "hidden",
            },
        },
        children: [
            Column({
                style: {
                    normal: {
                        backgroundColor: lightAccent,
                        borderRadius: radius,
                        overflowY: "auto",
                    },
                },
                children: [
                    Div({
                        style: {
                            normal: {
                                padding: ["8px", "8px"],
                            },
                        },
                        children: SubTitle(list.title),
                    }),

                    Column({
                        style: {
                            normal: {
                                overflowY: "auto",
                                overflowX: "hidden",
                                padding: ["16px", "8px"],
                            },
                        },
                        children: list.cards.map((card) => CardView(card, list.id, board)),
                    }),
                ],
            }),
        ],
    });
};
