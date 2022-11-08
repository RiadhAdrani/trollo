import { getParams } from "../../..";
import useBoard from "../../hooks/useBoard";
import Card from "../../models/Card";
import { FlatInput } from "../Input/Input";

export default () => {
    const { card: cardId, list: listId } = getParams();

    const { getCard, updateCard } = useBoard();

    const card = getCard(listId, cardId) as Card;

    return FlatInput({
        value: card.title,
        placeholder: "Enter card title",
        onChange(e) {
            card.title = e.currentTarget.value;
            updateCard(listId, card.id, card);
        },
    });
};
