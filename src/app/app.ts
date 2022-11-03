import { Column } from "@riadh-adrani/recursive-web/html";
import { setStyle, renderRoute } from "..";
import NavBarView from "./components/NavBar/NavBar.view";
import useApp from "./hooks/useApp";
import { navBarHeight } from "./style";

const App = () => {
    const {} = useApp();

    setStyle({
        selectors: {
            "body,html": { margin: "0", fontFamily: "system-ui", fontSize: "large" },
            "*": {
                boxSizing: "border-box",
            },
        },
    });

    return Column({
        id: "app-root",
        style: {
            normal: {
                minHeight: "100vh",
                width: "100vw",
            },
        },
        children: [
            NavBarView(),
            Column({
                style: {
                    className: "app-content",
                    normal: {
                        marginTop: navBarHeight,
                        flex: "1",
                    },
                },
                children: renderRoute(),
            }),
        ],
    });
};
export default App;
