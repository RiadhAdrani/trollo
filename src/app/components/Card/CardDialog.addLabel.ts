import { CenteredRow, Row, Span } from "@riadh-adrani/recursive-web/html";
import { BaseElement } from "@riadh-adrani/recursive-web/lib";
import { setState } from "../../..";
import useBoard from "../../hooks/useBoard";
import Board from "../../models/Board";
import Label from "../../models/Label";
import { light, radius } from "../../style";
import Icon from "../Icon/Icon";
import LabelChip from "../Label/LabelChip";

export default (list: string, card: string) => {
  const { board, updateCardAddLabel, updateCardRemoveLabel, updateBoardAddLabel, cardHasLabel } =
    useBoard();

  const labels: Array<Label> = (board as Board).labels;

  const [add, setAdd] = setState("card-dialog-add-label", false);

  const onLabelClicked = (item: Label) => {
    if (cardHasLabel(list, card, item.id)) {
      updateCardRemoveLabel(list, card, item.id);
    } else {
      updateCardAddLabel(list, card, item);
    }
  };

  const toggleAdd = () => {
    setAdd(!add);
  };

  const AddLabelList = () => {
    return Span({
      flags: {
        renderIf: add,
      },
      children: labels
        .filter((item) => !cardHasLabel(list, card, item.id))
        .map((item) => LabelChip(item, { onClick: () => onLabelClicked(item) })),
    });
  };

  const Wrapper = (children: Array<BaseElement | string>) => {
    return CenteredRow({
      children,
      style: {
        normal: {
          backgroundColor: light,
          padding: ["4px", "8px"],
          borderRadius: radius,
          marginRight: "4px",
          cursor: "pointer",
        },
      },
    });
  };

  return Wrapper([Row({ children: [Icon("fa-tag")], onClick: toggleAdd }), AddLabelList()]);
};
