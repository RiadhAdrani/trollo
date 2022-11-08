import {
    CenteredRow,
    ColorPicker,
    Fragment,
    I,
    Row,
    Spacer,
    Span,
} from "@riadh-adrani/recursive-web/html";
import { BaseElement } from "@riadh-adrani/recursive-web/lib";
import { isBlank } from "@riadh-adrani/utility-js";
import { setState } from "../../..";
import useBoard from "../../hooks/useBoard";
import Board from "../../models/Board";
import Label from "../../models/Label";
import { light, radius } from "../../style";
import { StandardButton } from "../Button";
import Icon from "../Icon/Icon";
import { FlatInput } from "../Input/Input";

export default (list: string, card: string) => {
    const { board, updateCardAddLabel, updateCardRemoveLabel, updateBoardAddLabel, cardHasLabel } =
        useBoard();

    const labels: Array<Label> = (board as Board).labels;

    const [add, setAdd] = setState("card-dialog-add-label", false);

    const [create, setCreate] = setState("card-dialog-create-label", {
        show: false,
        value: "",
        color: "#f8f8f8",
    });

    const updateValue = (value: string) => {
        setCreate({ ...create, value });
    };

    const updateColor = (color: string) => {
        setCreate({ ...create, color });
    };

    const addLabel = () => {
        if (isBlank(create.value)) return;

        updateBoardAddLabel(new Label({ text: create.value, color: create.color }));
        setCreate({ ...create, value: "" });
    };

    const onLabelClicked = (item: Label) => {
        if (cardHasLabel(list, card, item.id)) {
            updateCardRemoveLabel(list, card, item.id);
        } else {
            updateCardAddLabel(list, card, item);
        }
    };

    const toggleAdd = () => {
        setAdd(!add);
    };

    const toggleCreate = (show: boolean) => {
        setCreate({ ...create, show });
    };

    const AddLabelList = () => {
        return Span({
            flags: {
                renderIf: add,
            },
            children: labels
                .filter((item) => !cardHasLabel(list, card, item.id))
                .map((item) =>
                    Span({
                        children: [
                            item.text,
                            Fragment({
                                flags: { renderIf: cardHasLabel(list, card, item.id) },
                                children: [" ", I({ className: ["fa", "fa-xmark"] })],
                            }),
                        ],
                        onClick: () => {
                            onLabelClicked(item);
                        },
                        style: {
                            normal: {
                                color: light,
                                padding: ["2px", "8px"],
                                margin: ["0", "2px"],
                                borderRadius: radius,
                                backgroundColor: item.color,
                                fontWeight: "600",
                            },
                            hover: {
                                opacity: "0.5",
                            },
                        },
                    })
                ),
        });
    };

    const CreateLabel = () => {
        return Row({
            flags: { renderIf: create.show },
            children: [
                FlatInput({
                    value: create.value,
                    placeholder: "Label title",
                    size: "medium",
                    onInput: (e) => {
                        updateValue(e.currentTarget.value);
                    },
                }),
                Spacer({ width: "10px" }),
                ColorPicker({
                    value: create.color,
                    onChange: (e) => {
                        updateColor(e.currentTarget.value);
                    },
                }),
                Spacer({ width: "10px" }),
                StandardButton({
                    text: CenteredRow({ children: [Icon("fa-add"), "Create"] }),
                    onClick: addLabel,
                }),
                Spacer({ width: "10px" }),
                StandardButton({
                    text: CenteredRow({ children: [Icon("fa-xmark"), "Cancel"] }),
                    onClick: () => toggleCreate(false),
                }),
            ],
        });
    };

    const Wrapper = (children: Array<BaseElement | string>) => {
        return CenteredRow({
            children,
            style: {
                normal: {
                    backgroundColor: light,
                    padding: ["4px", "8px"],
                    borderRadius: radius,
                    marginRight: "4px",
                    cursor: "pointer",
                },
            },
        });
    };

    return Row({
        children: [
            Wrapper([Row({ children: [Icon("fa-tag")], onClick: toggleAdd }), AddLabelList()]),
            Wrapper([
                Row({
                    children: [Icon("fa-add")],
                    onClick: () => {
                        toggleCreate(true);
                    },
                }),
                CreateLabel(),
            ]),
        ],
    });
};
