import { setStyle } from "..";

export const blue = "#026aa7";
export const darkPaper = "#00000077";
export const darkerPaper = "#000000aa";

export const light = "#ffffff";
export const lightAccent = "#ebecf0";
export const lightVariant = "#f4f5f7";

export const dark = "#000000";
export const darkAccent = "#172b4d";
export const darkVariant = "#172b4dcc";

export const radius = "4px";

export const transitionDuration = "150ms";

export const navBarHeight = "50px";

export const useStyle = () => {
    setStyle({
        selectors: {
            body: {
                fontSize: "14px",
                margin: "0",
                fontFamily: "system-ui",
            },
            "*": {
                boxSizing: "border-box",
            },
            ".board-bg": {
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            },
            ".board-paper": {
                backgroundColor: darkPaper,
            },
            ".board-paper-effect:hover": {
                backgroundColor: darkerPaper,
            },
            ".no-deco": {
                textDecoration: "none",
            },
            ".icon-btn": {
                display: "flex",
                padding: "4px",
                boxSizing: "box-sizing",
                borderRadius: radius,
            },
        },
    });
};
