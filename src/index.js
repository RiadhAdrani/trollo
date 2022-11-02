import {
    RecursiveWebApp,
    createComponentStyle,
    importFile,
    mergeComponentStyles,
} from "@riadh-adrani/recursive-web";
import { createElement, createRoute } from "@riadh-adrani/recursive-web/use";

import app from "./app/app";
import route from "./app/route";

const webApp = new RecursiveWebApp({
    root: document.body,
    app,
    base: "",
    scopedStyle: true,
    scrollCorrection: false,
    route: route,
});

export { importFile, mergeComponentStyles };
export { createComponentStyle, createElement, createRoute };

/**
 * Calculate the parameters of the current path and returns them as a key-value object.
 *  @throws an error when the router is not initialized.
 */
export function getParams() {
    return webApp.getParams();
}
/**
 * Change the current route and trigger an update if needed.
 * @throws an error when the router is not initialized.
 * @param {string} path Destination path.
 */
export function goTo(path) {
    return webApp.goTo(path);
}
/**
 * Used to inject a route component into the elements tree.
 * Could be used recursively within nested routes to render the appropriate components
 *  @throws an error when the router is not initialized.
 * * @returns The current route fragment element.
 */
export function renderRoute() {
    return webApp.renderRoute();
}
/**
 *  Retrieve the current route as string.
 * @throws an error when the router is not initialized.
 */
export function getRoute() {
    return webApp.getRoute();
}
/**
 * return the currently targeted anchor
 *  @throws an error when the router is not initialized.
 */
export function getAnchor() {
    return webApp.getAnchor();
}
/**
 * Return the base of the application.
 * @throws an error when the router is not initialized.
 * @returns {string} Base as string.
 */
export function getBase() {
    return webApp.getBase();
}
/**
 * Retrieve an existing stateful object from the `state` store if it exists.
 * @param {string} key identifier
 * @throw an error if the state does not exist.
 * @returns {StateArray} state as an array.
 */
export function getState(key) {
    return webApp.getState(key);
}
/**
 * Retrieve an existing stateful object from the `cache` store if it exists.
 * @param {string} key identifier
 * @throw an error if the state does not exist.
 * @returns {StateArray} state as an array.
 */
export function getCache(key) {
    return webApp.getCache(key);
}
/**
 * Retrieve an existing element from the `reference` store, or the default value.
 * Use the `hooks.onRef` hook and return a string from the function to initialize a new reference.
 */
export function getRef(key, defaultValue) {
    return webApp.getRef(key, defaultValue);
}
/**
 * Create and save a stateful object in the `state` store within the global `StateStore`.
 * Objects created by this method are deleted when they are not used or called in a rendering iteration
 * @param {string} key unique identifier of the state within its store.
 * @param {any} value initial value
 * @param {Function} onInit a function that will execute when the state is initialized.
 * If the return value of this function is a function itself,
 * it will be executed whe the state is destroyed.
 * @param {Function} onRemoved a function that will execute when the state has been destroyed.
 * @returns {StateArray} state as an Array
 */
export function setState(key, value, onInit, onRemoved) {
    return webApp.setState(key, value, onInit, onRemoved);
}
/**
 * Create and save a stateful object in the `cache` store within the global `StateStore`.
 * Objects created by this method are not deleted when they are not used,
 * unless the number of cached object exceed the maximum allocated size which is by default `1000`.
 * Older states will be deleted first.
 * @param {string} key unique identifier of the state within its store.
 * @param {any} value initial value
 * @param {Function} onInit a function that will execute when the state is initialized.
 * If the return value of this function is a function itself,
 * it will be executed whe the state is destroyed.
 * @param {Function} onRemoved a function that will execute when the state has been destroyed.
 * @returns {StateArray} state as an array.
 */
export function setCache(key, value, onInit, onRemoved) {
    return webApp.setCache(key, value, onInit, onRemoved);
}
/**
 * Execute an effect.
 * @param {string} key identifier.
 * @param {Function} callback callback to be executed.
 * @param {Array} dependencies effect dependencies that will decide if the effect should be called again.
 */
export function setEffect(key, dependencies, callback) {
    return webApp.setEffect(key, dependencies, callback);
}
/**
 * Batch update made within the callback.
 * Used generally to state update after an asynchronous call.
 * `The callback function should not be an asynchronous function.`
 */
export function updateOn(callback) {
    webApp.updateOn(callback);
}
/**
 * Add a style sheet that will be evaluated every time the app rerender.
 * Can be used multiple times, at any depth within the tree of components.
 *  @param style style sheet declaration.
 */
export function setStyle(style) {
    webApp.setStyle(style);
}

webApp.render();
