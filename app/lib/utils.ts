export function arrayToUser(arr: any[]): User {
	const [id, name, role, email, phone, suuid] = arr;
	const user: User = {
		id,
		name,
		role,
		email,
		phone,
		suuid, //Secure unique user id
	};

	return user;
}

export function getUserByEmail(
	emailToFind: string,
	arrayOfArrays: any[][]
): User | null {
	for (let i = 1; i < arrayOfArrays.length; i++) {
		if (arrayOfArrays[i][3] === emailToFind) {
			return arrayToUser(arrayOfArrays[i]);
		}
	}
	return null;
}

export function createObjectFromArrays(
	keys: string[],
	values: any[]
): Record<string, any> {
	if (keys.length !== values.length) {
		throw new Error('Keys and values arrays must have the same length.');
	}

	const obj: Record<string, any> = {};

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const value = values[i];
		obj[key] = value;
	}

	return obj;
}
