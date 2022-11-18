import { Row, Spacer } from "@riadh-adrani/recursive-web/html";
import useBoard from "../../hooks/useBoard";
import { light } from "../../style";
import { StandardButton } from "../Button";
import Icon from "../Icon/Icon";

export default (listId: string, cardId: string) => {
  const { getCardPosition, updateCardPosition } = useBoard();

  const moveUp = () => {
    updateCardPosition(listId, cardId, getCardPosition(listId, cardId) - 1);
  };

  const moveDown = () => {
    updateCardPosition(listId, cardId, getCardPosition(listId, cardId) + 1);
  };

  return Row({
    children: [
      StandardButton({ text: Icon("fa-arrow-up"), bgColor: light, onClick: moveUp }),
      Spacer({ width: "5px" }),
      StandardButton({ text: Icon("fa-arrow-down"), bgColor: light, onClick: moveDown }),
    ],
  });
};
