import { setEffect, setState } from "../..";
import { getBoard } from "../data";
import Board from "../models/Board";
import Card from "../models/Card";

export default (id: string) => {
    const [board, setBoard] = setState<Board | string | undefined>(`board-${id}`, undefined);

    setEffect(`get-board-with-id-${id}`, [], () => {
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

    return {
        isLoading,
        isNotFound,
        board,
        getList,
        getCard,
    };
};
