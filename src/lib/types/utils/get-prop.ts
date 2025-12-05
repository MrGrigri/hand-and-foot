/**
 * Get the property of the object by key.
 * This works with native objects and arrays as arrays in JavaScript are Objects too.
 * If using an array, the key will be a number representing the index of the array.
 *
 * @example
 * type Data = { foo: { bar: { value: 'foobar' } } };
 * type Example = GetProp<Data, 'foo.bar.value'>; // 'foobar'
 *
 * @example
 * type Data = { foo: [ { bar: 1 }, 2, [false, true] ] };
 * type Example1 = GetProp<Data, 'foo.2.0'>; // false
 * type Example2 = GetProp<Data, 'foo.0.bar'>; // 1
 */
// iterate over keys of the object
export type GetProp<Obj, Key extends string> = Key extends keyof Obj
	? // If the key exists, return the value of the key
		Obj[Key]
	: // Else if the next key has a '.', separate the two by the first '.' and the rest (which could include other '.'s)
		Key extends `${infer NextKey}.${infer RestOfKeys}`
		? // If the first of the two keys exists, return the value of the key
			NextKey extends keyof Obj
			? // Else perform recursion to divide the keys further by the '.'
				GetProp<Obj[NextKey], RestOfKeys>
			: never
		: never;
