import { Input } from "@riadh-adrani/recursive-web/html";
import { WebEvent } from "@riadh-adrani/recursive-web/lib";
import { generateContrastSafeColor } from "@riadh-adrani/utility-js";
import { blue, darkAccent, light, lightAccent, radius } from "../../style";

interface FlatInputProps {
  value: string;
  placeholder: string;
  onInput?: (e: WebEvent<InputEvent, HTMLInputElement>) => void;
  onChange?: (e: WebEvent<InputEvent, HTMLInputElement>) => void;
  onKeyUp?: (e: WebEvent<KeyboardEvent, HTMLInputElement>) => void;
  size?: string;
  color?: string;
  type?: "text" | "password" | "number";
  max?: string;
  min?: string;
}

export const FlatInput = (props: FlatInputProps) => {
  return Input({
    ...props,
    style: {
      normal: {
        width: "auto",
        border: "none",
        backgroundColor: "transparent",
        color: props.color ?? darkAccent,
        fontSize: props.size ?? "x-large",
        fontWeight: "500",
        padding: ["4px", "8px"],
        borderRadius: radius,
      },
      focus: {
        outlineColor: blue,
        backgroundColor: light,
        color: generateContrastSafeColor(light, lightAccent, darkAccent),
      },
    },
  });
};
