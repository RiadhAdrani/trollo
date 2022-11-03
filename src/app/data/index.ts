import Board from "../models/Board";

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
];

export const getUserBoards = async (user: string): Promise<Array<Board>> =>
    new Promise((res) => {
        setTimeout(() => {
            res(data);
        }, 100);
    });
