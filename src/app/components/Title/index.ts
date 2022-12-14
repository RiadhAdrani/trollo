import { P } from "@riadh-adrani/recursive-web/html";

interface TitleProps {
    title: string;
    color?: string;
    size?: string;
}

export const Title = (props: TitleProps) => {
    return P({
        children: props.title,
        style: {
            className: "title",
            normal: {
                fontSize: props.size ?? "1.75em",
                color: props.color ?? "inherit",
                margin: "0px",
                padding: ["5px", "0"],
                fontWeight: "600",
            },
        },
    });
};

export const TitleBig = (title: string, color?: string) => {
    return Title({ title, size: "1.75em", color });
};

export const TitleSmall = (title: string, color?: string) => {
    return Title({ title, size: "1.35em", color });
};

export const SubTitle = (title: string, color?: string) => {
    return Title({ title, size: "1.15em", color });
};

export const SectionTitle = (title: string, color?: string) => {
    return Title({ title, size: "1.05em", color });
};
