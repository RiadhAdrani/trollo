import { CenteredRow, Row, Spacer } from "@riadh-adrani/recursive-web/html";
import { blue } from "../../style";
import { StandardButton } from "../Button";
import { TitleSmall } from "../Title";

export default () => {
    return Row({
        style: {
            normal: {
                padding: ["4px", "20px"],
                alignItems: "center",
                backgroundColor: blue,
                color: "white",
                justifyContent: "space-between",
            },
        },
        children: [
            CenteredRow({
                children: [
                    TitleSmall("Trollo"),
                    Spacer({ width: "10px" }),
                    StandardButton({ text: "Create", flat: true }),
                ],
            }),
            StandardButton({ text: "User", flat: true }),
        ],
    });
};
