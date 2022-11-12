import { CenteredColumn, Column } from "@riadh-adrani/recursive-web/html";
import { BaseElement } from "@riadh-adrani/recursive-web/lib";
import { isFunction } from "@riadh-adrani/utility-js";
import { light, radius } from "../../style";

interface DialogProps {
  children: BaseElement;
  show: boolean;
  onBackClicked?: () => void;
  onEscapePressed?: () => void;
}

export default ({ children, show, onBackClicked, onEscapePressed }: DialogProps) => {
  return CenteredColumn({
    onClick: onBackClicked,
    onKeyUpGlobal: (e) => {
      if (e.code === "Escape" && isFunction(onEscapePressed)) {
        onEscapePressed();
      }
    },
    style: {
      normal: {
        position: "absolute",
        inset: "0px",
        backgroundColor: "#00000055",
      },
    },
    flags: { renderIf: show },
    children: [
      Column({
        onClick: (e) => {
          e.stopPropagation();
        },
        style: {
          normal: {
            backgroundColor: light,
            padding: ["5px", "10px"],
            borderRadius: radius,
          },
        },
        children,
      }),
    ],
  });
};
