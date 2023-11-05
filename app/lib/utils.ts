export function arrayToUser(arr: any[]): User {
	const [id, name, role, email, phone, suuid, index] = arr;
	const user: User = {
		id,
		name,
		role,
		email,
		phone,
		suuid, //Secure unique user id
		index,
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

export function convertArrayToObject(arr: any[]): object[] {
	const header = arr[0]; // The first array contains property names
	const result = [];

	for (let i = 1; i < arr.length; i++) {
		const obj: { [key: string]: any } = {};

		for (let j = 0; j < header.length; j++) {
			obj[header[j]] = arr[i][j];
		}

		result.push(obj as User[]);
	}

	return result;
}
