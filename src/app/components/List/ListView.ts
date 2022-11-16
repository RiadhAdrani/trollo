import { Column, Div, Row, Spacer } from "@riadh-adrani/recursive-web/html";
import { isBlank } from "@riadh-adrani/utility-js";
import { setState } from "../../..";
import useBoard from "../../hooks/useBoard";
import Card from "../../models/Card";
import List from "../../models/List";
import { darkAccent, lightAccent, radius } from "../../style";
import { StandardButton } from "../Button";
import CardView from "../Card/CardView";
import { FlatInput } from "../Input/Input";
import { SubTitle } from "../Title";
import Expanded from "../Utility/Expanded";

export default (list: List, board: string) => {
  const { addCard } = useBoard();

  const [title, setTitle] = setState(`list-${list.id}-new-card`, "");

  const onAddClicked = () => {
    if (isBlank(title)) return;

    const card = new Card({ title: title });

    addCard(card, list.id);
    setTitle("");
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
          Div({
            style: {
              normal: {
                padding: ["8px", "8px"],
              },
            },
            children: SubTitle(list.title),
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
                  value: title,
                  placeholder: "Add new card",
                  size: "small",
                  onInput: (e) => setTitle(e.currentTarget.value),
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
