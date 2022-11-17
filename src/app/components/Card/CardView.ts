import { createSelector } from "@riadh-adrani/recursive-web/css";
import { Column, Link, Row } from "@riadh-adrani/recursive-web/html";
import { Selectors } from "@riadh-adrani/recursive-web/lib";
import useBoard from "../../hooks/useBoard";
import Card from "../../models/Card";
import { dark, darkPaper, light, lightVariant, radius } from "../../style";
import { StandardButton } from "../Button";
import Icon from "../Icon/Icon";
import LabelChip from "../Label/LabelChip";

export default (card: Card, list: string, board: string) => {
  const { getLabel, miniLabel, toggleMiniLabel, deleteCard } = useBoard();

  const toggleMini = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    toggleMiniLabel();
  };

  return Link({
    href: `/board/${board}/${list}/${card.id}`,
    className: ["no-deco"],
    style: {
      normal: {
        backgroundColor: light,
        padding: ["4px", "10px"],
        marginBottom: "10px",
        borderRadius: radius,
        boxShadow: ["0px", "1px", "1px", "0px", darkPaper],
        cursor: "pointer",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        color: dark,
      },
      hover: {
        backgroundColor: lightVariant,
      },
      active: {
        color: "initial",
      },
    },
    children: Column({
      children: [
        Row({
          flags: {
            renderIf: card.labels.length > 0,
          },
          style: { normal: { flexWrap: "wrap" } },
          children: card.labels.map((id) =>
            LabelChip(getLabel(id), { mini: miniLabel, onClick: toggleMini })
          ),
        }),
        Row({
          style: {
            normal: {
              alignItems: "center",
              justifyContent: "space-between",
            },
            ["> .std-btn" as keyof Selectors]: createSelector({
              opacity: "0",
              fontSize: "small",
              transitionDuration: "150ms",
            }),
            [":hover > .std-btn" as keyof Selectors]: createSelector({
              opacity: "1",
            }),
          },
          children: [
            card.title,
            StandardButton({
              text: Icon("fa-trash"),
              onClick: (e) => {
                e.stopPropagation();
                e.preventDefault();

                deleteCard(list, card.id);
              },
            }),
          ],
        }),
      ],
    }),
  });
};
