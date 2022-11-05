import {
    CenteredColumn,
    CenteredRow,
    CheckBox,
    Column,
    Label,
    Row,
    S,
    Spacer,
    Span,
} from "@riadh-adrani/recursive-web/html";
import { BaseElement } from "@riadh-adrani/recursive-web/lib";
import { getParams, goTo } from "../..";
import Icon from "../components/Icon/Icon";
import { FlatInput } from "../components/Input/Input";
import { FlatTextArea } from "../components/Input/TextArea";
import { SubTitle } from "../components/Title";
import Expanded from "../components/Utility/Expanded";
import Padding from "../components/Utility/Padding";
import useBoard from "../hooks/useBoard";
import Card from "../models/Card";
import List from "../models/List";
import { blue, darkPaper, light, lightAccent, radius } from "../style";

export default () => {
    const { id, card: cardId, list: listId } = getParams();

    const { getCard, getList } = useBoard(id);

    const card = getCard(listId, cardId) as Card;
    const list = getList(listId) as List;

    if (!card) {
        goTo(`/board/${id}`);
    }

    const SectionContainer = (icon: string, children: Array<BaseElement>) => {
        return Row({
            style: {
                normal: {
                    alignItems: "flex-start",
                },
            },
            children: [
                Icon(icon, "x-large"),
                Spacer({ width: "8px" }),
                Column({
                    style: { normal: { flex: "1" } },
                    children,
                }),
            ],
        });
    };

    return CenteredColumn({
        style: {
            normal: {
                position: "absolute",
                inset: "0px",
                padding: ["16px", "32px"],
                backgroundColor: darkPaper,
            },
        },
        children: Column({
            style: {
                normal: {
                    padding: ["16px", "32px"],
                    backgroundColor: lightAccent,
                    borderRadius: radius,
                    width: "80%",
                    maxHeight: "90%",
                    flex: "1",
                    overflowY: "auto",
                    alignItems: "stretch",
                },
            },
            children: [
                Spacer({ height: "12px" }),
                SectionContainer("fa-heading", [
                    Row({
                        children: [
                            Expanded(
                                FlatInput({ value: card.title, placeholder: "Enter card title" })
                            ),
                            Spacer({ width: "8px" }),
                            Row({
                                style: { normal: { alignSelf: "center", cursor: "pointer" } },
                                onClick: () => {
                                    goTo(`/board/${id}`);
                                },
                                children: Icon("fa-xmark", "2em"),
                            }),
                        ],
                    }),
                    Column({
                        style: {
                            normal: {
                                padding: ["8px"],
                            },
                        },
                        children: [
                            Span({ children: ["In list ", list.title] }),
                            Spacer({ height: "12px" }),
                            Row({
                                children: [
                                    ...card.labels.map((label) => {
                                        return CenteredRow({
                                            children: label.text,
                                            style: {
                                                normal: {
                                                    backgroundColor: label.color,
                                                    padding: ["4px", "8px"],
                                                    borderRadius: radius,
                                                    marginRight: "4px",
                                                    cursor: "pointer",
                                                },
                                            },
                                        });
                                    }),
                                    CenteredRow({
                                        children: [Icon("fa-add"), "Add"],
                                        style: {
                                            normal: {
                                                backgroundColor: light,
                                                padding: ["4px", "8px"],
                                                borderRadius: radius,
                                                marginRight: "4px",
                                                cursor: "pointer",
                                            },
                                        },
                                    }),
                                ],
                            }),
                        ],
                    }),
                ]),
                Spacer({ height: "16px" }),
                SectionContainer("fa-align-justify", [
                    Padding(SubTitle("Description"), ["0px", "8px"]),
                    Spacer({ height: "16px" }),
                    FlatTextArea({
                        value: card.description,
                        placeholder: "What's on your mind ?",
                    }),
                ]),
                Spacer({ height: "16px" }),
                SectionContainer("fa-square-check fa-regular", [
                    Padding(SubTitle("Checklist"), ["0px", "8px"]),
                    Column({
                        children: card.checkItems.map((item) =>
                            Label({
                                style: {
                                    normal: {
                                        marginTop: "8px",
                                        padding: ["8px"],
                                        display: "flex",
                                        fontSize: "medium",
                                        backgroundColor: light,
                                        borderRadius: radius,
                                    },
                                },
                                children: [
                                    CheckBox({
                                        style: {
                                            normal: {
                                                accentColor: blue,
                                                height: "1.25em",
                                                width: "1.25em",
                                            },
                                        },
                                    }),
                                    Spacer({ width: "8px" }),
                                    Expanded(
                                        FlatInput({
                                            value: item.text,
                                            placeholder: "To do...",
                                            size: "medium",
                                        })
                                    ),
                                ],
                            })
                        ),
                    }),
                ]),
            ],
        }),
    });
};
