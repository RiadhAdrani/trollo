import Board from "../models/Board";
import Card from "../models/Card";
import CheckItem from "../models/CheckItem";
import Label from "../models/Label";
import List from "../models/List";

const data: Array<Board> = [
    new Board({
        cDate: Date.now(),
        color: "blue",
        id: "s1fd35",
        img: "https://images.unsplash.com/photo-1667339406244-24977ed6e1ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80",
        lists: [],
        title: "Right down the Road !",
    }),
    new Board({
        cDate: Date.now(),
        color: "red",
        id: "s1fd355",
        img: "https://images.unsplash.com/photo-1661987584509-20babb3905be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
        lists: [],
        title: "Star Sky",
    }),
    new Board({
        cDate: Date.now(),
        color: "yellow",
        id: "b-r-u-h",
        img: "https://images.unsplash.com/photo-1667381494713-09cd87a4c076?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=462&q=80",
        lists: [],
        title: "Ocean",
    }),
    new Board({
        cDate: Date.now(),
        color: "cyan",
        id: "b-r-u-v",
        img: "https://images.unsplash.com/photo-1667375101846-89ef2154c5e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
        lists: [],
        title: "Mountain",
    }),
    new Board({
        cDate: Date.now(),
        color: "green",
        id: "na3ne3",
        img: "https://images.unsplash.com/photo-1664383042756-d1d0f742ff06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        lists: [
            new List({
                id: "to-do",
                cards: [
                    new Card({
                        cDate: Date.now(),
                        description: "Hello My name",
                        id: "My name",
                        labels: [
                            new Label({ text: "C#", color: "#aacc00" }),
                            new Label({ text: "Green", color: "#aaccff" }),
                        ],
                        title: "Na3ne3",
                        checkItems: [
                            new CheckItem({
                                doneDate: -1,
                                text: "somesing is about do habben",
                                dueDate: -1,
                            }),
                            new CheckItem({
                                doneDate: -1,
                                text: "na3neeeeeeeeeeeeeeeeeeee3",
                                dueDate: -1,
                            }),
                        ],
                    }),
                ],
                cDate: Date.now(),
                title: "To Do",
            }),
            new List({ id: "in-progress", cards: [], cDate: Date.now(), title: "In Brogress" }),
            new List({ id: "today", cards: [], cDate: Date.now(), title: "Today" }),
            new List({ id: "done", cards: [], cDate: Date.now(), title: "Done" }),
        ],
        title: "Na3ne3",
    }),
];

export const getUserBoards = async (user: string): Promise<Array<Board>> => {
    return new Promise((res) => {
        setTimeout(() => {
            res(data);
        }, 100);
    });
};

export const getBoard = async (id: string): Promise<Board | string> => {
    {
        return new Promise((res) => {
            const board = data.find((b) => b.id === id);

            setTimeout(() => {
                res(board ?? "Unable to retrieve the board !");
            }, 100);
        });
    }
};
