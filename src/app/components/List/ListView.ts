import { createSelector } from "@riadh-adrani/recursive-web/css";
import { Column, Div, Row, Spacer } from "@riadh-adrani/recursive-web/html";
import { Selector, Selectors } from "@riadh-adrani/recursive-web/lib";
import { isBlank } from "@riadh-adrani/utility-js";
import { setState } from "../../..";
import useBoard from "../../hooks/useBoard";
import Card from "../../models/Card";
import List from "../../models/List";
import { darkAccent, lightAccent, radius } from "../../style";
import { StandardButton } from "../Button";
import CardView from "../Card/CardView";
import Icon from "../Icon/Icon";
import { FlatInput } from "../Input/Input";
import { SubTitle } from "../Title";
import Expanded from "../Utility/Expanded";

export default (list: List, board: string) => {
  const { addCard } = useBoard();

  const [title, setTitle] = setState(`list-${list.id}-title`, "");

  const [newCardTitle, setNewCardTitle] = setState(`list-${list.id}-new-card`, "");

  const onAddClicked = () => {
    if (isBlank(newCardTitle)) return;

    const card = new Card({ title: newCardTitle });

    addCard(card, list.id);
    setNewCardTitle("");
  };

  return Column({
    style: {
      normal: {
        minWidth: "300px",
        maxWidth: "300px",
        color: darkAccent,
        marginRight: "10px",
        overflowY: "hidden",
      },
    },
    children: [
      Column({
        style: {
          normal: {
            backgroundColor: lightAccent,
            borderRadius: radius,
            overflowY: "auto",
          },
        },
        children: [
          Row({
            style: {
              normal: {
                padding: ["8px", "8px"],
              },
              ["> .std-btn" as keyof Selectors]: createSelector({
                opacity: "0",
              }),
              [":hover > .std-btn" as keyof Selectors]: createSelector({
                opacity: "1",
              }),
            },
            children: [
              Expanded(
                FlatInput({
                  value: list.title,
                  placeholder: "List title...",
                  onChange: () => {},
                  size: "medium",
                })
              ),
              StandardButton({ text: Icon("fa-trash") }),
            ],
          }),
          Column({
            style: {
              normal: {
                overflowY: "auto",
                overflowX: "hidden",
                padding: ["16px", "8px"],
              },
            },
            children: list.cards.map((card) => CardView(card, list.id, board)),
          }),
          Row({
            style: {
              normal: {
                padding: ["8px"],
              },
            },
            children: [
              Expanded(
                FlatInput({
                  value: newCardTitle,
                  placeholder: "Add new card",
                  size: "small",
                  onInput: (e) => setNewCardTitle(e.currentTarget.value),
                })
              ),
              Spacer({ width: "5px" }),
              StandardButton({ text: "Add", flat: true, onClick: onAddClicked }),
            ],
          }),
        ],
      }),
    ],
  });
};
