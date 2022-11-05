import { Column } from "@riadh-adrani/recursive-web/html";
import { BaseElement } from "@riadh-adrani/recursive-web/lib";

export default (children: BaseElement) => {
    return Column({
        style: {
            normal: { flex: "1", alignItems: "stretch" },
        },
        children,
    });
};
