import { getParams, setEffect, setState } from "../..";
import { getBoard } from "../data";
import Board from "../models/Board";
import Card from "../models/Card";
import CheckItem from "../models/CheckItem";
import Label from "../models/Label";
import List from "../models/List";

export default () => {
    const { id } = getParams();

    const [board, setBoard] = setState<Board | string | undefined>(`board-${id}`, undefined);

    setEffect(`get-board-with-id-${id}`, [], () => {
        if (board !== undefined) return;

        async function get() {
            const res = await getBoard(id);
            setBoard(res);
        }

        get();
    });

    const isLoading = board === undefined;

    const isNotFound = typeof board === "string";

    const getList = (id: string) => {
        return (board as Board).lists.find((l) => l.id === id) ?? false;
    };

    const getCard = (listId: string, id: string): Card | boolean => {
        const list = getList(listId);

        if (!list) return false;

        return list.cards.find((c) => c.id === id) ?? false;
    };

    const updateBoardAddLabel = (label: Label) => {
        (board as Board).labels.push(label);
        setBoard(board);
    };

    const updateBoardRemoveLabel = (id: string) => {
        const labels = (board as Board).labels;
        (board as Board).labels = labels.filter((l) => l.id !== id);
        setBoard(board);
    };

    const updateCard = (listId: string, id: string, value: Card) => {
        const list: List = (board as Board).lists.find((l) => l.id === listId);
        const i: number = list.cards.findIndex((c) => c.id === id);

        list.cards[i] = value;

        setBoard(board);
    };

    const updateCardTitle = (listId: string, id: string, title: string) => {
        (getCard(listId, id) as Card).title = title;
        setBoard(board);
    };

    const updateCardAddLabel = (listId: string, id: string, label: Label) => {
        (getCard(listId, id) as Card).labels.push(label);
        setBoard(board);
    };

    const updateCardRemoveLabel = (listId: string, id: string, label: string) => {
        (getCard(listId, id) as Card).labels = (getCard(listId, id) as Card).labels.filter(
            (item) => item.id !== label
        );
        setBoard(board);
    };

    const updateCardDescription = (listId: string, id: string, description: string) => {
        (getCard(listId, id) as Card).description = description;
        setBoard(board);
    };

    const updateCardAddCheckItem = (listId: string, id: string, item: CheckItem) => {
        (getCard(listId, id) as Card).checkItems.push(item);
        setBoard(board);
    };

    const updateCardRemoveCheckItem = (listId: string, id: string, item: string) => {
        (getCard(listId, id) as Card).checkItems = (getCard(listId, id) as Card).checkItems.filter(
            (i) => i.id !== item
        );
        setBoard(board);
    };

    const updateCardCheckItemText = (listId: string, cardId: string, id: string, text: string) => {
        (getCard(listId, cardId) as Card).checkItems.find((c) => c.id === id).text = text;
        setBoard(board);
    };

    const updateCardCheckItemDone = (
        listId: string,
        cardId: string,
        id: string,
        value: boolean
    ) => {
        const item = (getCard(listId, cardId) as Card).checkItems.find((c) => c.id === id);

        item.doneDate = value ? Date.now() : -1;

        setBoard(board);
    };

    const moveCardToList = (listId: string, cardId: string, newListId: string) => {
        const oldList = getList(listId) as List;
        const newList = getList(newListId) as List;

        const card = getCard(listId, cardId) as Card;

        oldList.cards = oldList.cards.filter((c) => c.id !== cardId);
        newList.cards.push(card);

        setBoard(board);
    };

    const cardHasLabel = (listId: string, cardId: string, LabelId: string): boolean => {
        return (
            (getCard(listId, cardId) as Card).labels.find((item) => item.id === LabelId) !==
            undefined
        );
    };

    return {
        isLoading,
        isNotFound,
        board,

        updateBoardAddLabel,
        updateBoardRemoveLabel,

        getList,
        getCard,

        updateCard,
        updateCardTitle,
        updateCardDescription,
        updateCardAddLabel,
        updateCardRemoveLabel,
        updateCardCheckItemText,
        updateCardCheckItemDone,
        updateCardAddCheckItem,
        updateCardRemoveCheckItem,

        cardHasLabel,

        moveCardToList,
    };
};
