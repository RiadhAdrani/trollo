import { getParams, setEffect, setState } from "../..";
import { getBoard } from "../data";
import Board from "../models/Board";
import Card from "../models/Card";
import CheckItem from "../models/CheckItem";
import Label from "../models/Label";
import List from "../models/List";
import { clamp } from "@riadh-adrani/utility-js";

export default () => {
  const { id } = getParams();

  const [board, setBoard] = setState<Board | string | undefined>(`board-${id}`, undefined);

  const [showLabelsModal, setShowLabelModal] = setState(`board-${id}-show-modal`, false);

  const [miniLabel, setMiniLabel] = setState(`board-${id}-mini-labels`, false);

  setEffect(`get-board-with-id-${id}`, [], () => {
    if (board !== undefined) return;

    async function get() {
      const res = await getBoard(id);
      setBoard(res);
    }

    get();
  });

  const update = () => {
    setBoard(board);
  };

  const isLoading = board === undefined;

  const isNotFound = typeof board === "string";

  const toggleMiniLabel = () => setMiniLabel(!miniLabel);

  const getList = (id: string) => {
    return (board as Board).lists.find((l) => l.id === id) ?? false;
  };

  const getCard = (listId: string, id: string): Card | boolean => {
    const list = getList(listId);

    if (!list) return false;

    return list.cards.find((c) => c.id === id) ?? false;
  };

  const updateBoardTitle = (title: string) => {
    (board as Board).title = title;
    update();
  };

  const updateBoardAddLabel = (label: Label) => {
    (board as Board).labels.push(label);
    update();
  };

  const updateBoardLabel = (id: string, newLabelValue: Label) => {
    let index = (board as Board).labels.findIndex((l) => l.id === id);
    (board as Board).labels[index] = newLabelValue;
    update();
  };

  const updateBoardRemoveLabel = (id: string) => {
    (board as Board).lists.forEach((list) => {
      list.cards.forEach((card) => {
        card.labels = card.labels.filter((label) => label !== id);
      });
    });

    const labels = (board as Board).labels;
    (board as Board).labels = labels.filter((l) => l.id !== id);
    update();
  };

  const updateCard = (listId: string, id: string, value: Card) => {
    const list: List = (board as Board).lists.find((l) => l.id === listId);
    const i: number = list.cards.findIndex((c) => c.id === id);

    list.cards[i] = value;

    update();
  };

  const updateCardTitle = (listId: string, id: string, title: string) => {
    (getCard(listId, id) as Card).title = title;
    update();
  };

  const updateCardAddLabel = (listId: string, id: string, label: Label) => {
    (getCard(listId, id) as Card).labels.push(label.id);
    update();
  };

  const updateCardRemoveLabel = (listId: string, id: string, label: string) => {
    (getCard(listId, id) as Card).labels = (getCard(listId, id) as Card).labels.filter(
      (item) => item !== label
    );
    update();
  };

  const updateCardDescription = (listId: string, id: string, description: string) => {
    (getCard(listId, id) as Card).description = description;
    update();
  };

  const updateCardAddCheckItem = (listId: string, id: string, item: CheckItem) => {
    (getCard(listId, id) as Card).checkItems.push(item);
    update();
  };

  const updateCardRemoveCheckItem = (listId: string, id: string, item: string) => {
    (getCard(listId, id) as Card).checkItems = (getCard(listId, id) as Card).checkItems.filter(
      (i) => i.id !== item
    );
    update();
  };

  const updateCardCheckItemText = (listId: string, cardId: string, id: string, text: string) => {
    (getCard(listId, cardId) as Card).checkItems.find((c) => c.id === id).text = text;
    update();
  };

  const updateCardCheckItemDone = (listId: string, cardId: string, id: string, value: boolean) => {
    const item = (getCard(listId, cardId) as Card).checkItems.find((c) => c.id === id);

    item.doneDate = value ? Date.now() : -1;

    update();
  };

  const moveCardToList = (listId: string, cardId: string, newListId: string) => {
    const oldList = getList(listId) as List;
    const newList = getList(newListId) as List;

    const card = getCard(listId, cardId) as Card;

    oldList.cards = oldList.cards.filter((c) => c.id !== cardId);
    newList.cards.push(card);

    update();
  };

  const cardHasLabel = (listId: string, cardId: string, LabelId: string): boolean => {
    return (getCard(listId, cardId) as Card).labels.find((item) => item === LabelId) !== undefined;
  };

  const getLabel = (id: string) => {
    return (board as Board).labels.find((l) => l.id === id);
  };

  const addCard = (card: Card, listId: string) => {
    const list = getList(listId);

    if (list) {
      list.cards.push(card);
      update();
    }
  };

  const addList = (list: List) => {
    (board as Board).lists.push(list);
    update();
  };

  const deleteCard = (listId: string, id: string) => {
    const list = getList(listId);

    if (list) {
      list.cards = list.cards.filter((card) => card.id !== id);
      update();
    }
  };

  const deleteList = (id: string) => {
    (board as Board).lists = (board as Board).lists.filter((list) => list.id !== id);
    update();
  };

  const updateListTitle = (id: string, title: string) => {
    const list = getList(id);

    if (list) {
      list.title = title;
      update();
    }
  };

  const updateListPosition = (listId: string, position: number) => {
    const list = getList(listId);

    if (list) {
      const b = board as Board;
      const o = getListPosition(listId);
      const i = clamp(0, position, b.lists.length - 1);
      const aux = b.lists[i];

      b.lists[i] = list;
      b.lists[o] = aux;
      update();
    }
  };

  const getListPosition = (id: string): number => {
    return (board as Board).lists.indexOf(getList(id) as List);
  };

  const getCardPosition = (listId: string, id: string): number => {
    return ((board as Board).lists.find((i) => i.id == listId) as List).cards.indexOf(
      getCard(listId, id) as Card
    );
  };

  const updateCardPosition = (listId: string, id: string, position: number) => {
    const list = getList(listId);

    if (list) {
      const b = board as Board;
      const o = getCardPosition(listId, id);
      const i = clamp(0, position, list.cards.length - 1);
      const aux = list.cards[i];

      list.cards[i] = getCard(listId, id) as Card;
      list.cards[o] = aux;
      update();
    }
  };

  return {
    isLoading,
    isNotFound,
    board,

    updateBoardAddLabel,
    updateBoardRemoveLabel,
    updateBoardTitle,
    updateBoardLabel,

    getListPosition,
    getCardPosition,

    getList,
    getCard,
    getLabel,

    updateListTitle,
    updateListPosition,

    addCard,
    addList,

    deleteCard,
    deleteList,

    updateCard,
    updateCardPosition,
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

    showLabelsModal,
    setShowLabelModal,

    miniLabel,
    toggleMiniLabel,
  };
};
