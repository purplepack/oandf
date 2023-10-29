export function arrayToUser(arr: any[]): User {
	const [id, name, role, email, phone, suuid] = arr;
	console.log(arr);
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
