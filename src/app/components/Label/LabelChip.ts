import { Span } from "@riadh-adrani/recursive-web/html";
import { generateContrastSafeColor } from "@riadh-adrani/utility-js";
import Label from "../../models/Label";
import { radius } from "../../style";

export interface LabelChipProps {
  onClick?: (e: Event) => void;
  mini?: boolean;
}

export default (item: Label, props: LabelChipProps) => {
  return Span({
    children: Span({ children: item.text, flags: { renderIf: !props.mini } }),
    onClick: props.onClick,
    style: {
      normal: {
        color: generateContrastSafeColor(item.color),
        padding: [props.mini ? "3px" : "2px", "8px"],
        margin: ["0", "2px"],
        borderRadius: radius,
        backgroundColor: item.color,
        fontWeight: "600",
        fontSize: "small",
        cursor: "pointer",
      },
      hover: {
        opacity: "0.5",
      },
    },
  });
};
