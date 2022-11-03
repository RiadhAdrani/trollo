import { Button } from "@riadh-adrani/recursive-web/html";
import { WebEvent } from "@riadh-adrani/recursive-web/lib";

interface ButtonProps {
    text: string;
    onClick?: (event: WebEvent) => void;
    color?: string;
    bgColor?: string;
    flat?: boolean;
}

export const StandardButton = (props: ButtonProps) => {
    return Button({
        children: props.text,
        onClick: props.onClick,
        style: {
            className: "btn",
            normal: {
                border: "none",
                padding: ["4px", "16px"],
                borderRadius: "4px",
                backgroundColor: props.flat ? "transparent" : props.bgColor,
                cursor: "pointer",
                color: props.color ?? "inherit",
            },
            hover: {
                opacity: "0.75",
            },
        },
    });
};