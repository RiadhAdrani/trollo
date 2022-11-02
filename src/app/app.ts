import { Column } from "@riadh-adrani/recursive-web/html";
import { setStyle, renderRoute } from "..";
import NavBarView from "./components/NavBar/NavBar.view";

const App = () => {
    setStyle({
        selectors: {
            "body,html": { margin: "0", fontFamily: "system-ui", fontSize: "large" },
        },
    });

    return Column({
        children: [NavBarView(), renderRoute()],
    });
};
export default App;
