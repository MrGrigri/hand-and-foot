/**
 * This function will return true/false if a string (mainString) is in the array (stringArray)
 *
 * @example
 * import { stringContainsAnyFromArray } from '$lib';
 *
 * const str = 'foo';
 * const arr = ['foo', 'bar', 'baz']
 * const result = stringContainsAnyFromArray(str, arr);
 *
 * console.log(result) // Output: true
 */
export const stringContainsAnyFromArray = (
	mainString: string,
	stringArray: Array<string>
): boolean => {
	return stringArray.some((str: string) => mainString.includes(str));
};
