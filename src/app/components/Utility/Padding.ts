import { Div } from "@riadh-adrani/recursive-web/html";
import { BaseElement, CssPropertyDeclarationOf } from "@riadh-adrani/recursive-web/lib";

export default (children: BaseElement | string, padding: CssPropertyDeclarationOf<string>) => {
    return Div({
        children,
        style: {
            normal: {
                padding,
            },
        },
    });
};
