import { CheckBox, Label, Spacer } from "@riadh-adrani/recursive-web/html";
import useBoard from "../../hooks/useBoard";
import CheckItem from "../../models/CheckItem";
import { blue, light, radius } from "../../style";
import { StandardButton } from "../Button";
import Icon from "../Icon/Icon";
import { FlatInput } from "../Input/Input";
import Expanded from "../Utility/Expanded";

export default (listId: string, cardId: string, item: CheckItem) => {
    const { updateCardRemoveCheckItem, updateCardCheckItemText, updateCardCheckItemDone } =
        useBoard();

    const remove = () => {
        updateCardRemoveCheckItem(listId, cardId, item.id);
    };

    const setText = (text: string) => {
        updateCardCheckItemText(listId, cardId, item.id, text);
    };

    const setDone = (value: boolean) => {
        updateCardCheckItemDone(listId, cardId, item.id, value);
    };

    const isDone = item.doneDate !== -1;

    return Label({
        key: item.id,
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
                checked: isDone,
                onChange: (e) => {
                    setDone(e.currentTarget.checked);
                },
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
                    onInput: (e) => {
                        setText(e.currentTarget.value);
                    },
                })
            ),
            Spacer({ width: "12px" }),
            StandardButton({ text: Icon("fa-trash"), onClick: remove }),
        ],
    });
};
