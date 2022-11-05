import { Input } from "@riadh-adrani/recursive-web/html";
import { WebEvent } from "@riadh-adrani/recursive-web/lib";
import { blue, darkAccent, light, radius } from "../../style";

interface FlatInputProps {
    value: string;
    placeholder: string;
    onInput?: (e: WebEvent<InputEvent, HTMLInputElement>) => void;
    onChange?: (e: WebEvent<InputEvent, HTMLInputElement>) => void;
    size?: string;
}

export const FlatInput = (props: FlatInputProps) => {
    return Input({
        ...props,
        style: {
            normal: {
                border: "none",
                backgroundColor: "transparent",
                color: darkAccent,
                fontSize: props.size ?? "x-large",
                fontWeight: "500",
                padding: ["4px", "8px"],
                borderRadius: radius,
            },
            focus: {
                outlineColor: blue,
                backgroundColor: light,
            },
        },
    });
};
