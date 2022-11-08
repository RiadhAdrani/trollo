import { getParams } from "../../..";
import useBoard from "../../hooks/useBoard";
import Card from "../../models/Card";
import { FlatTextArea } from "../Input/TextArea";

export default () => {
    const { card: cardId, list: listId } = getParams();

    const { getCard, updateCard } = useBoard();

    const card = getCard(listId, cardId) as Card;

    return FlatTextArea({
        value: card.description,
        placeholder: "What's on your mind ?",
        onChange(e) {
            card.description = e.currentTarget.value;
            updateCard(listId, card.id, card);
            e.stopPropagation();
        },
    });
};
