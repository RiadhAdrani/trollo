import { Input, TextArea } from "@riadh-adrani/recursive-web/html";
import { WebEvent } from "@riadh-adrani/recursive-web/lib";
import { blue, darkAccent, light, radius } from "../../style";

interface FlatTextAreaProps {
    value: string;
    placeholder: string;
    onInput?: (e: WebEvent<InputEvent, HTMLTextAreaElement>) => void;
    onChange?: (e: WebEvent<InputEvent, HTMLTextAreaElement>) => void;
}

export const FlatTextArea = (props: FlatTextAreaProps) => {
    return TextArea({
        ...props,
        style: {
            normal: {
                border: "none",
                color: darkAccent,
                fontSize: "medium",
                fontWeight: "400",
                padding: "8px",
                resize: "vertical",
                backgroundColor: light,
                borderRadius: radius,
                fontFamily: "inherit",
                minHeight: "6em",
            },
            focus: {
                outlineColor: blue,
            },
        },
    });
};
