import { CenteredRow, I } from "@riadh-adrani/recursive-web/html";

export default (icon: string, size?: string) => {
    return CenteredRow({
        className: ["icon-btn"],
        style: { inline: { fontSize: size } },
        children: I({ className: ["fa", icon] }),
    });
};
