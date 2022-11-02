import { CenteredColumn } from "@riadh-adrani/recursive-web/html";
import { setStyle, renderRoute } from "..";

const App = () => {
    setStyle({
        selectors: {
            "body,html": { margin: "0", fontFamily: "system-ui", fontSize: "large" },
            button: { fontSize: "x-large" },
        },
    });

    return CenteredColumn({
        style: {
            inline: {
                padding: ["20px", "10px"],
                height: "100vh",
                boxSizing: "border-box",
            },
        },
        children: [renderRoute()],
    });
};
export default App;
