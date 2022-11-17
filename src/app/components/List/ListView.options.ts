import { Column, Row, Spacer, Span } from "@riadh-adrani/recursive-web/html";
import useBoard from "../../hooks/useBoard";
import List from "../../models/List";
import { StandardButton } from "../Button";
import Dialog from "../Dialog/Dialog";
import Icon from "../Icon/Icon";
import { Title, TitleSmall } from "../Title";
import Expanded from "../Utility/Expanded";

export default (id: string, show: boolean, hide: () => void) => {
  const { deleteList, getList, updateListPosition, getListPosition } = useBoard();

  const list = getList(id) as List;

  const remove = () => deleteList(id);

  const move = (position: number) => {
    updateListPosition(id, position);
  };

  const moveRight = () => {
    const newPos = getListPosition(id) + 1;
    move(newPos);
  };

  const moveLeft = () => {
    const newPos = getListPosition(id) - 1;
    move(newPos);
  };

  return Dialog({
    show,
    onBackClicked: hide,
    onEscapePressed: hide,
    children: Column({
      style: { normal: { width: "300px", padding: ["8px"] } },
      children: [
        TitleSmall(list.title),
        Spacer({ height: "20px" }),
        Row({
          children: [
            Expanded(Span({ children: "Remove" })),
            StandardButton({ text: "Delete", onClick: remove }),
          ],
        }),
        Spacer({ height: "10px" }),
        Row({
          children: [
            Expanded(Span({ children: "Position" })),
            Row({
              children: [
                StandardButton({ text: Icon("fa-arrow-left"), onClick: moveLeft }),
                Spacer({ width: "5px" }),
                StandardButton({ text: Icon("fa-arrow-right"), onClick: moveRight }),
              ],
            }),
          ],
        }),
        Spacer({ height: "25px" }),
        StandardButton({ text: "Close", onClick: hide }),
      ],
    }),
  });
};
