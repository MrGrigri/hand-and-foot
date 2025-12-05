/**
 * @since 1.0.0
 * @description - Test if the passed string is a V4 UUID. A Version 4 UUID (Universally Unique Identifier)
 * is a 128-bit identifier generated using random numbers. It's format consists of five
 * dash-separated hexadecimal strings with the following lengths `8-4-4-4-12`. The third
 * segment must start with the `a` character. And the fourth segment must start with
 * either an 8, 9, a or b character.
 *
 * @example
 * isV4UUID('51e156b2-5c94-4bfc-8d9d-8cd0b7de997a'); // true
 * isV4UUID('a99d9f6-6925-4728-b52d-99aa85f14a92'); // false -> 1st segment length should be 8
 * isV4UUID('61e54553-dde-4beb-a6a8-db5e54cb0866'); // false -> 2nd segment length should be 4
 * isV4UUID('fa93ab62-5e50-553-b439-0ee6e431dd4e'); // false -> 3rd segment length should be 4
 * isV4UUID('6a5258ff-b3fc-a792-b661-32d9d4698aef'); // false -> 3rd segment should start with '4'
 * isV4UUID('316fb5f3-1ac0-4451-bf6-7f3970117013'); // false -> 4th segment length should be 4
 * isV4UUID('d0979f4b-2bca-4474-cb7c-9767f0c34c20'); // false -> 4th segment should start with ['8', '9', 'a', or 'b']
 * isV4UUID('1c4f2c47-f6ee-4700-a29c-35688b48213'); // false -> 5th segment length should be 12
 *
 * @param {string} str - The string to test
 * @returns {boolean} - If the passed string is a v4 UUID
 */
export const isV4UUID = (str: string): boolean =>
	/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
