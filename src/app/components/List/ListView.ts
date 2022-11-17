import { createSelector } from "@riadh-adrani/recursive-web/css";
import { Column, Row, Spacer } from "@riadh-adrani/recursive-web/html";
import { Selectors } from "@riadh-adrani/recursive-web/lib";
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
import Expanded from "../Utility/Expanded";
import ListViewOptions from "./ListView.options";

export default (list: List, board: string) => {
  const { addCard, deleteList, updateListTitle } = useBoard();

  const [newCardTitle, setNewCardTitle] = setState(`list-${list.id}-new-card`, "");

  const [showOpt, setShowOpts] = setState(`list-${list.id}-opts`, false);

  const onAddClicked = () => {
    if (isBlank(newCardTitle)) return;

    const card = new Card({ title: newCardTitle });

    addCard(card, list.id);
    setNewCardTitle("");
  };

  const hideOpts = () => setShowOpts(false);
  const displayOpts = () => setShowOpts(true);

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
                transitionDuration: "150ms",
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
                  onChange: (e) => {
                    updateListTitle(list.id, e.currentTarget.value);
                  },
                  size: "medium",
                })
              ),
              Spacer({ width: "5px" }),
              StandardButton({
                text: Icon("fa-gear"),
                onClick: displayOpts,
              }),
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
          ListViewOptions(list.id, showOpt, hideOpts),
        ],
      }),
    ],
  });
};
