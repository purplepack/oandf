'use server';
import { google } from 'googleapis';
import { signIn } from '@/auth';
import { getUserByEmail } from './utils';

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
			console.log(user);
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
