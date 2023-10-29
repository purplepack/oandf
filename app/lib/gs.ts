'use server';
import { google } from 'googleapis';
import { signIn } from '@/auth';
import {
	convertArrayToObject,
	createObjectFromArrays,
	getUserByEmail,
} from './utils';
import { revalidatePath, unstable_noStore } from 'next/cache';

const credentials = {
	type: process.env.GOOGLE_API_TYPE,
	private_key: process.env.GOOGLE_PRIVATE_KEY,
	client_email: process.env.GOOGLE_CLIENT_EMAIL,
	client_id: process.env.GOOGLE_CLIENT_ID,
	universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
};

export async function create() {
	const auth = await google.auth.getClient({
		projectId: process.env.PROJECT_ID,
		credentials: credentials,
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	});

	const sheets = google.sheets({ version: 'v4', auth });

	const data = await sheets.spreadsheets.create();

	return data.data;
}

export async function getSheetById(range: string) {
	const auth = await google.auth.getClient({
		projectId: process.env.PROJECT_ID,
		credentials: credentials,
		scopes: [
			'https://www.googleapis.com/auth/spreadsheets',
			'https://www.googleapis.com/auth/drive',
		],
	});

	const sheets = google.sheets({ version: 'v4', auth });

	const data = await sheets.spreadsheets.values.get({
		// spreadsheetId: '11EUwYoCmpXZMWxLlHQ1B5nibMY-MqmIK1dfd0F2XrKI',
		spreadsheetId: '1HUMnnlvc2NirqFB489JtVC1_y97mF5khwChOZ5MbexY', // Google App Script Test
		range: range,
	});

	return data.data;
}

export async function getUsers(): Promise<User[]> {
	unstable_noStore();
	const auth = await google.auth.getClient({
		projectId: process.env.PROJECT_ID,
		credentials: credentials,
		scopes: [
			'https://www.googleapis.com/auth/spreadsheets',
			'https://www.googleapis.com/auth/drive',
		],
	});
	const sheets = google.sheets({ version: 'v4', auth });

	try {
		const userArray = await sheets.spreadsheets.values.get({
			spreadsheetId: '1HUMnnlvc2NirqFB489JtVC1_y97mF5khwChOZ5MbexY', // Google App Script Test
			range: 'Staffs!A1:F',
			majorDimension: 'ROWS',
		});
		if (userArray && userArray.data && userArray.data.values) {
			const users = convertArrayToObject(userArray.data.values);
			return users as User[];
		} else return [];
	} catch (error) {
		console.error('Failed to fetch user:', error);
		throw new Error('Failed to fetch user.');
	}
}

export async function deleteUser(formData: FormData) {
	const id = formData.get('id')?.toString();
	const user = await getUser(id!);
	console.log(user);
	const auth = await google.auth.getClient({
		projectId: process.env.PROJECT_ID,
		credentials: credentials,
		scopes: [
			'https://www.googleapis.com/auth/spreadsheets',
			'https://www.googleapis.com/auth/drive',
		],
	});

	const sheets = google.sheets({ version: 'v4', auth });
	const activeSheet = await sheets.spreadsheets.values.get({
		// spreadsheetId: '11EUwYoCmpXZMWxLlHQ1B5nibMY-MqmIK1dfd0F2XrKI',
		spreadsheetId: '1HUMnnlvc2NirqFB489JtVC1_y97mF5khwChOZ5MbexY', // Google App Script Test
		range: 'Staffs',
	});
	console.log(activeSheet.data);
	const sheetId = 1603622916;
	const response = await sheets.spreadsheets.batchUpdate({
		spreadsheetId: '1HUMnnlvc2NirqFB489JtVC1_y97mF5khwChOZ5MbexY',

		// Request body metadata
		requestBody: {
			requests: [
				// {
				// 	deleteDimension: {
				// 		range: {
				// 			sheetId: sheetId,
				// 			dimension: 'COLUMNS',
				// 			startIndex: 0,
				// 			endIndex: 6,
				// 		},
				// 	},
				// },
				{
					deleteDimension: {
						range: {
							sheetId: sheetId,
							dimension: 'ROWS',
							startIndex: 7,
							endIndex: 7,
						},
					},
				},
			],
		},
	});
	console.log(response.data);
	revalidatePath('/dashbord/user', 'page');

	return response.data;
}

export async function getUser(email: string): Promise<User | undefined> {
	const auth = await google.auth.getClient({
		projectId: process.env.PROJECT_ID,
		credentials: credentials,
		scopes: [
			'https://www.googleapis.com/auth/spreadsheets',
			'https://www.googleapis.com/auth/drive',
		],
	});

	const sheets = google.sheets({ version: 'v4', auth });

	try {
		const userArray = await sheets.spreadsheets.values.get({
			// spreadsheetId: '11EUwYoCmpXZMWxLlHQ1B5nibMY-MqmIK1dfd0F2XrKI',
			spreadsheetId: '1HUMnnlvc2NirqFB489JtVC1_y97mF5khwChOZ5MbexY', // Google App Script Test
			range: 'Staffs!A1:F',
			majorDimension: 'ROWS',
		});

		if (userArray && userArray.data && userArray.data.values) {
			const user = getUserByEmail(email, userArray.data.values);
			if (user) return user;
			else return undefined;
		} else return undefined;
	} catch (error) {
		console.error('Failed to fetch user:', error);
		throw new Error('Failed to fetch user.');
	}
}

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	try {
		await signIn('credentials', Object.fromEntries(formData));
	} catch (error) {
		if ((error as Error).message.includes('CredentialsSignin')) {
			return 'CredentialSignin';
		}
		throw error;
	}
}

export async function getCompanyDetails() {
	const auth = await google.auth.getClient({
		projectId: process.env.PROJECT_ID,
		credentials: credentials,
		scopes: [
			'https://www.googleapis.com/auth/spreadsheets',
			'https://www.googleapis.com/auth/drive',
		],
	});

	const sheets = google.sheets({ version: 'v4', auth });

	try {
		const companyArray = await sheets.spreadsheets.values.get({
			spreadsheetId: '1HUMnnlvc2NirqFB489JtVC1_y97mF5khwChOZ5MbexY', // Google App Script Test
			range: 'About!A1:H',
			majorDimension: 'ROWS',
		});

		if (companyArray && companyArray.data && companyArray.data.values) {
			const key = companyArray?.data?.values[0];
			const value = companyArray?.data?.values[1];
			const company: ICompany = createObjectFromArrays(key, value);
			return company;
		}
	} catch (error) {
		console.error('Failed to fetch user:', error);
		throw new Error('Failed to fetch user.');
	}
}
