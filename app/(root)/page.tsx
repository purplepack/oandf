import { getSheetById } from '../lib/gs';

export default async function Home() {
	const sheet = await getSheetById('A1');
	return (
		<main className=''>
			<div className=''>
				<h1>Next Google Sheet API Integration</h1>
				<div className=''>{sheet.range}</div>
			</div>
		</main>
	);
}
