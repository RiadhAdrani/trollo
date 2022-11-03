import { FreeStyleSheet } from "@riadh-adrani/recursive-web/lib";
import { ObjectOf } from "@riadh-adrani/recursive-web/types/util";
import { StateArray, BaseElement } from "@riadh-adrani/recursive/lib";

export {
    importFile,
    mergeComponentStyles,
    createComponentStyle,
} from "@riadh-adrani/recursive-web";
export { createElement, createRoute } from "@riadh-adrani/recursive";

/**
 * Calculate the parameters of the current path and returns them as a key-value object.
 *  @throws an error when the router is not initialized.
 */
export function getParams(): ObjectOf<string>;
/**
 * Change the current route and trigger an update if needed.
 * @throws an error when the router is not initialized.
 * @param {string} path Destination path.
 */
export function goTo(path: string): void;
/**
 * Used to inject a route component into the elements tree.
 * Could be used recursively within nested routes to render the appropriate components
 *  @throws an error when the router is not initialized.
 * @returns The current route fragment element.
 */
export function renderRoute(): BaseElement;
/**
 *  Retrieve the current route as string.
 * @throws an error when the router is not initialized.
 */
export function getRoute(): string;
/**
 * return the currently targeted anchor
 *  @throws an error when the router is not initialized.
 */
export function getAnchor(): string;
/**
 * Return the base of the application.
 * @throws an error when the router is not initialized.
 * @returns {string} Base as string.
 */
export function getBase(): string;
/**
 * Retrieve an existing stateful object from the `state` store if it exists.
 * @param {string} key identifier
 * @throw an error if the state does not exist.
 * @returns {StateArray} state as an array.
 */
export function getState<T = any>(key: string): StateArray<T>;
/**
 * Retrieve an existing stateful object from the `cache` store if it exists.
 * @param {string} key identifier
 * @throw an error if the state does not exist.
 * @returns {StateArray} state as an array.
 */
export function getCache<T = any>(key: string): StateArray<T>;
/**
 * Retrieve an existing element from the `reference` store, or the default value.
 * Use the `hooks.onRef` hook and return a string from the function to initialize a new reference.
 */
export function getRef(key: string, defaultValue: Element): Element;
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
export function setState<T>(
    key: string,
    value: T,
    onInit?: () => Function | void,
    onRemoved?: () => void
): StateArray<T>;
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
export function setCache<T>(
    key: string,
    value: T,
    onInit?: () => Function | void,
    onRemoved?: () => void
): StateArray<T>;
/**
 * Execute an effect.
 * @param {string} key identifier.
 * @param {Function} callback callback to be executed.
 * @param {Array} dependencies effect dependencies that will decide if the effect should be called again.
 */
export function setEffect(
    key: string,
    dependencies: Array<any>,
    callback: () => Function | void
): void;
/**
 * Batch update made within the callback.
 * Used generally to state update after an asynchronous call.
 * The callback function should not be an asynchronous function.
 */
export function updateOn(callback: () => void): void;
/**
 * Add a style sheet that will be evaluated every time the app rerender.
 * Can be used multiple times, at any depth within the tree of components.
 *  @param style style sheet declaration.
 */
export function setStyle(style: FreeStyleSheet): void;
