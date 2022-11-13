import { ColorPicker } from "@riadh-adrani/recursive-web/html";
import { WebEvent } from "@riadh-adrani/recursive-web/lib";
import { radius } from "../../style";

interface ColorPickerProps {
  value: string;
  onChange?: (e: WebEvent<InputEvent, HTMLInputElement>) => void;
  size?: string;
}

export default ({ value, onChange, size }: ColorPickerProps) => {
  return ColorPicker({
    value,
    onChange,
    style: {
      normal: {
        height: size ?? "25px",
        width: size ?? "25px",
        borderRadius: radius,
        border: "none",
        cursor: "pointer",
      },
    },
  });
};
