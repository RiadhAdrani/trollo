import { Link, Row } from "@riadh-adrani/recursive-web/html";
import Card from "../../models/Card";
import { darkPaper, light, lightVariant, radius } from "../../style";
import Icon from "../Icon/Icon";

export default (card: Card, list: string, board: string) => {
    return Link({
        href: `/board/${board}/${list}/${card.id}`,
        className: ["no-deco"],
        style: {
            normal: {
                backgroundColor: light,
                padding: ["4px", "10px"],
                marginBottom: "10px",
                borderRadius: radius,
                boxShadow: ["0px", "1px", "1px", "0px", darkPaper],
                cursor: "pointer",
                position: "relative",
                display: "flex",
            },
            hover: {
                backgroundColor: lightVariant,
            },
        },
        children: Row({
            style: {
                normal: { alignItems: "center", justifyContent: "space-between", flexGrow: "1" },
            },
            children: [card.title, Icon("fa-ellipsis")],
        }),
    });
};
