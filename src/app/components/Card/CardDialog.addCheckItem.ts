import { Row, Spacer } from "@riadh-adrani/recursive-web/html";
import { isBlank } from "@riadh-adrani/utility-js";
import { getParams, setState } from "../../..";
import useBoard from "../../hooks/useBoard";
import Card from "../../models/Card";
import CheckItem from "../../models/CheckItem";
import { light, radius } from "../../style";
import { StandardButton } from "../Button";
import { FlatInput } from "../Input/Input";
import Expanded from "../Utility/Expanded";

export default () => {
    const { card: cardId, list: listId } = getParams();

    const { getCard, updateCardAddCheckItem } = useBoard();

    const card = getCard(listId, cardId) as Card;

    const [checkValue, setCheckValue] = setState("add-check-item-value", "");

    const addItem = () => {
        if (isBlank(checkValue)) return;

        const item = new CheckItem({ doneDate: -1, dueDate: -1, text: checkValue });

        updateCardAddCheckItem(listId, cardId, item);
        setCheckValue("");
    };

    return Row({
        key: "add-check-item-view",
        style: {
            normal: {
                marginTop: "10px",
                padding: ["8px"],
                backgroundColor: light,
                borderRadius: radius,
            },
        },
        children: [
            Expanded(
                FlatInput({
                    size: "medium",
                    value: checkValue,
                    onInput: (e) => {
                        setCheckValue(e.currentTarget.value);
                    },
                    onKeyUp: (e) => {
                        if (e.code === "Enter") {
                            addItem();
                        }
                    },
                    placeholder: "Add new item",
                })
            ),
            Spacer({ width: "10px" }),
            StandardButton({
                text: "Add",
                onClick: addItem,
            }),
        ],
    });
};
