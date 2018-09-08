/**
 * type alias for a string or a function, that represents the elvis THENs
 */
export declare type ElvisThen = string | ((value: any) => any | undefined);
/**
 * wennElvis ensures error free access to properties in a chain, even if any one of them is undefined.
 * You may access them via dot notation in string or function calls. This includes functions like find for arrays etc.
 * If any property in the chain wasn't found or is undefined, the whole function will safely return undefined.
 * It builds on top of {@link wennChain}.
 * @param {T} value the value, which properties should be accessed
 * @param {ElvisThen} thens varargs of {@link ElvisThen Thens} to be checked
 * @returns {E} the accessed value or undefined
 * @see wennChain
 */
export declare function wennElvis<T, E>(value: T, ...thens: ElvisThen[]): E;
declare type IndexSignature = {
    [key: string]: any;
};
/**
 * internal function to safely access properties via dot notation
 * @param {any} object the input object
 * @param {string} path the path to the property with dot notation
 */
export declare function elvis(object: IndexSignature | undefined, path: string): any;
/**
 * internal function to provide a curried version for the {@link #elvis} function
 * @param {string} path the path to the property with dot notation
 */
export declare function elvisCurried(path: string): (object: IndexSignature | undefined) => any;
export {};
