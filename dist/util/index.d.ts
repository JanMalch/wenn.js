export declare function instanceOf(instance: any): (value: any) => boolean;
export declare function typeOf(type: string): (value: any) => boolean;
export declare function isFunction(value: any): boolean;
export declare function isNumeric(value: any): boolean;
export declare function isUndefined(value: any): boolean;
export declare function isntUndefined(value: any): boolean;
export declare function startsWith(prefix: string): (value: string) => boolean;
export declare function includes(substring: string): (value: string) => boolean;
export declare function endsWith(suffix: string): (value: string) => boolean;
export declare function isEven(value: number): boolean;
export declare function isOdd(value: number): boolean;
/**
 * isPositive will only return true if the value is greater than 0.
 * @param value the value to be checked
 */
export declare function isPositive(value: number): boolean;
/**
 * isNegative will only return true if the value is less than 0.
 * @param value the value to be checked
 */
export declare function isNegative(value: number): boolean;
export declare function inRange(min: number, max: number): (value: number) => boolean;
export declare function inArray<T>(array: T[]): (value: T) => boolean;
export declare function not(fn: (value: any) => boolean): (value: any) => boolean;
export declare function always(value?: any): boolean;
