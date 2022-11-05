import { Column, Div } from "@riadh-adrani/recursive-web/html";
import { BaseElement } from "@riadh-adrani/recursive-web/lib";
import BoardPreview from "../components/Board/BoardPreview";
import useApp from "../hooks/useApp";

export default (): BaseElement => {
    const { boards } = useApp();

    return Column({
        style: {
            normal: {
                alignItems: "center",
                flex: "1",
                marginTop: "20px",
            },
        },
        children: [
            Div({
                style: {
                    normal: {
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gridColumnGap: "10px",
                        gridRowGap: "10px",
                        minWidth: "1000px",
                    },
                },
                children: boards.map(BoardPreview),
            }),
        ],
    });
};
