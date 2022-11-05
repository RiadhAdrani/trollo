import { Route } from "@riadh-adrani/recursive-web/lib";
import { createRoute, getParams, renderRoute } from "..";
import Board from "./pages/Board";
import Card from "./pages/Card";
import Home from "./pages/Home";

const title = (title: string) => `${title} | Trollo`;

const route: Route = {
    path: "/",
    title: title("Home"),
    component: Home,
    routes: [
        createRoute({
            path: "board",
            component: () => renderRoute(),
            redirectTo: "/",
            routes: [
                createRoute({
                    path: ":id",
                    component: Board,
                    routes: [
                        createRoute({
                            path: ":list",
                            component: () => renderRoute(),
                            routes: [
                                createRoute({
                                    path: ":card",
                                    component: Card,
                                    title: title("Card"),
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }),
    ],
};

export default route;
