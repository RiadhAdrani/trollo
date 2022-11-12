import { CenteredRow } from "@riadh-adrani/recursive-web/html";
import { generateContrastSafeColor } from "@riadh-adrani/utility-js";
import useBoard from "../../hooks/useBoard";
import Label from "../../models/Label";
import { radius } from "../../style";

export default (list: string, card: string, label: Label) => {
  const { updateCardRemoveLabel } = useBoard();

  return CenteredRow({
    children: label.text,
    onClick: () => {
      updateCardRemoveLabel(list, card, label.id);
    },
    style: {
      normal: {
        backgroundColor: label.color,
        padding: ["4px", "8px"],
        borderRadius: radius,
        marginRight: "4px",
        cursor: "pointer",
        color: generateContrastSafeColor(label.color),
        fontWeight: "600",
      },
    },
  });
};
