import { CenteredColumn, Column, Row, Spacer, Span } from "@riadh-adrani/recursive-web/html";
import { BaseElement } from "@riadh-adrani/recursive-web/lib";
import { getParams, goTo } from "../..";
import Icon from "../components/Icon/Icon";
import { SubTitle } from "../components/Title";
import Expanded from "../components/Utility/Expanded";
import Padding from "../components/Utility/Padding";
import useBoard from "../hooks/useBoard";
import Card from "../models/Card";
import List from "../models/List";
import { darkPaper, lightAccent, radius } from "../style";
import CardDialogTitle from "../components/Card/CardDialog.title";
import CardDialogDescription from "../components/Card/CardDialog.description";
import CardDialogCheckItem from "../components/Card/CardDialog.checkItem";
import CardDialogAddCheckItem from "../components/Card/CardDialog.addCheckItem";
import CardDialogAddLabel from "../components/Card/CardDialog.addLabel";
import LabelChip from "../components/Label/LabelChip";
import CardDialogMoveToList from "../components/Card/CardDialog.moveToList";
import CardDialogChangePosition from "../components/Card/CardDialog.changePosition";

export default () => {
  const { id, card: cardId, list: listId } = getParams();

  const { getCard, getList, updateCardRemoveLabel, getLabel } = useBoard();

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
              Expanded(CardDialogTitle()),
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
                children: card.labels.map((id) => {
                  const label = getLabel(id);

                  return LabelChip(label, {
                    onClick: () => {
                      updateCardRemoveLabel(listId, cardId, label.id);
                    },
                  });
                }),
              }),
              Spacer({ height: "12px" }),
              Row({
                children: [
                  CardDialogAddLabel(listId, cardId),
                  Spacer({ width: "10px" }),
                  CardDialogMoveToList(cardId, listId),
                  Spacer({ width: "16px" }),
                  CardDialogChangePosition(listId, cardId),
                ],
              }),
            ],
          }),
        ]),
        Spacer({ height: "16px" }),
        SectionContainer("fa-align-justify", [
          Padding(SubTitle("Description"), ["0px", "8px"]),
          Spacer({ height: "16px" }),
          CardDialogDescription(),
        ]),
        Spacer({ height: "16px" }),
        SectionContainer("fa-square-check fa-regular", [
          Padding(SubTitle("Checklist"), ["0px", "8px"]),
          Column({
            children: [
              ...card.checkItems.map((item) => CardDialogCheckItem(listId, cardId, item)),
              CardDialogAddCheckItem(),
            ],
          }),
        ]),
      ],
    }),
  });
};
