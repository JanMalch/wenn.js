// types

export function instanceOf(instance: any): (value: any) => boolean {
    return (value: any) => value instanceof instance;
}
export function typeOf(type: string): (value: any) => boolean {
    return (value: any) => typeof value === type;
}

export function isFunction(value: any): boolean {
    return typeof value === "function";
}

export function isNumeric(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

export function isUndefined(value: any): boolean {
    return value === undefined;
}

export function isntUndefined(value: any): boolean {
    return value !== undefined;
}

// strings

export function startsWith(prefix: string): (value: string) => boolean {
    return (value: string) => !!value.startsWith && value.startsWith(prefix);
}

export function includes(substring: string): (value: string) => boolean {
    return (value: string) => !!value.includes && value.includes(substring);
}

export function endsWith(suffix: string): (value: string) => boolean {
    return (value: string) => !!value.endsWith && value.endsWith(suffix);
}


// number

export function isEven(value: number): boolean {
    return value % 2 == 0;
}

export function isOdd(value: number): boolean {
    return value % 2 == 1;
}

/**
 * isPositive will only return true if the value is greater than 0.
 * @param value the value to be checked
 */
export function isPositive(value: number): boolean {
    return value > 0;
}

/**
 * isNegative will only return true if the value is less than 0.
 * @param value the value to be checked
 */
export function isNegative(value: number): boolean {
    return value < 0;
}

export function inRange(min: number, max: number): (value: number) => boolean {
    return (value: number) => value >= min && value <= max;
}

// collections

export function inArray<T>(array: T[]): (value: T) => boolean {
    return (value: T) => array.indexOf(value) !== -1;
}

// other
export function not(fn: (value: any) => boolean): (value: any) => boolean {
    return (value: any) => !(fn(value));
}

export function always(value?: any): boolean {
    return true;
}