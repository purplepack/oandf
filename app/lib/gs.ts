'use server';
import { google } from 'googleapis';
import { signIn } from '@/auth';
import {
	convertArrayToObject,
	createObjectFromArrays,
	getUserByEmail,
} from './utils';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { USERS_SHEET_ID, SPREADSHEET_ID } from '@/data/data';

const credentials = {
	type: process.env.GOOGLE_API_TYPE,
	private_key: process.env.GOOGLE_PRIVATE_KEY,
	client_email: process.env.GOOGLE_CLIENT_EMAIL,
	client_id: process.env.GOOGLE_CLIENT_ID,
	universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
};

export async function getGoogleSheet() {
	const auth = await google.auth.getClient({
		projectId: process.env.PROJECT_ID,
		credentials: credentials,
		scopes: [
			'https://www.googleapis.com/auth/spreadsheets',
			'https://www.googleapis.com/auth/drive',
		],
	});

	const sheets = google.sheets({ version: 'v4', auth });

	return sheets;
}

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

export async function getSheetByRange(range: string, majorDimension?: string) {
	const sheets = await getGoogleSheet();
	const data = await sheets.spreadsheets.values.get({
		spreadsheetId: SPREADSHEET_ID,
		range: range,
		majorDimension: majorDimension || 'ROWS', // "COLUMNS" || "ROWS"
	});

	return data.data;
}

export async function getUsers(): Promise<User[]> {
	unstable_noStore();
	try {
		const userArray = await getSheetByRange('Staffs!A1:F');
		if (userArray && userArray.values) {
			const users = convertArrayToObject(userArray.values);
			return users as User[];
		} else return [];
	} catch (error) {
		console.error('Failed to fetch user:', error);
		throw new Error('Failed to fetch user.');
	}
}

export async function getUser(email: string): Promise<User | undefined> {
	const sheets = await getGoogleSheet();

	try {
		const userArray = await sheets.spreadsheets.values.get({
			// spreadsheetId: '11EUwYoCmpXZMWxLlHQ1B5nibMY-MqmIK1dfd0F2XrKI',
			spreadsheetId: SPREADSHEET_ID, // Google App Script Test
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

export async function deleteUser(formData: FormData) {
	const index = parseInt(formData.get('id')?.toString()!);
	const sheets = await getGoogleSheet();
	const startIndex = index;
	const endIndex = index + 1;

	try {
		const response = await sheets.spreadsheets.batchUpdate({
			spreadsheetId: SPREADSHEET_ID,

			// Request body metadata
			requestBody: {
				requests: [
					{
						deleteDimension: {
							range: {
								sheetId: USERS_SHEET_ID,
								dimension: 'ROWS',
								startIndex: startIndex, // parseInt(index!),
								endIndex: endIndex, // parseInt(index! + 1),
							},
						},
					},
				],
			},
		});
		// revalidatePath('/dashboard/user', 'page');
		console.log(response);

		return response;
	} catch (error) {
		return { message: 'Database Error: Failed to Delete user.' };
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
export async function addUser(
	prevState: string | undefined,
	formData: FormData
) {
	const sheets = await getGoogleSheet();
	const data = formData;
	const sortedData = Object.fromEntries(formData);

	try {
		// console.log(data, sortedData);
		const response = await sheets.spreadsheets.values.append({
			spreadsheetId: SPREADSHEET_ID,
			valueInputOption: 'RAW',
			range: 'Staffs!A1:F',
			requestBody: {
				majorDimension: 'ROWS',
				range: 'Staffs!A1:F',
				values: [
					[
						formData.get('name'),
						formData.get('role'),
						formData.get('email'),
						formData.get('phone'),
						formData.get('password'),
					],
				],
			},
		});
		// revalidatePath('/dashboard/user', 'page');
		console.log(response, 'Success');

		return response;
	} catch (error) {
		if (error as Error) {
			console.log(error);
			return 'Something Went Wrong';
		}
		throw error;
	}
}

export async function getCompanyDetails() {
	const sheets = await getGoogleSheet();

	try {
		const companyArray = await sheets.spreadsheets.values.get({
			spreadsheetId: SPREADSHEET_ID, // Google App Script Test
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
