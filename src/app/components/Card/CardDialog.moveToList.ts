import { CenteredRow, Column, Div, Row, Spacer } from "@riadh-adrani/recursive-web/html";
import { goTo, setState } from "../../..";
import useBoard from "../../hooks/useBoard";
import Board from "../../models/Board";
import { light } from "../../style";
import { StandardButton } from "../Button";
import Dialog from "../Dialog/Dialog";
import Icon from "../Icon/Icon";
import { SubTitle } from "../Title";

export default (cardId: string, listId: string) => {
  const { board, moveCardToList } = useBoard();

  const [show, setShow] = setState("show-card-settings-modal", true);

  const hide = () => {
    if (show) setShow(false);
  };

  const moveCard = (targetListId: string) => {
    goTo(`/board/${(board as Board).id}/${targetListId}/${cardId}`);
    moveCardToList(listId, cardId, targetListId);
  };

  return CenteredRow({
    children: [
      StandardButton({
        text: Icon("fa-up-down-left-right"),
        bgColor: light,
        onClick: () => setShow(true),
      }),
      Dialog({
        show,
        onBackClicked: hide,
        onEscapePressed: hide,
        children: Column({
          style: { normal: { width: "400px", padding: ["10px"] } },
          children: [
            SubTitle("Move card"),
            Spacer({ height: "10px" }),
            Column({
              children: (board as Board).lists
                .filter((list) => list.id !== listId)
                .map((list) =>
                  Column({
                    style: { normal: { marginBottom: "10px" } },
                    children: StandardButton({
                      text: list.title,
                      onClick: () => moveCard(list.id),
                    }),
                  })
                ),
            }),
            Spacer({ height: "10px" }),
            StandardButton({ text: "close", onClick: hide, flat: true }),
          ],
        }),
      }),
    ],
  });
};
