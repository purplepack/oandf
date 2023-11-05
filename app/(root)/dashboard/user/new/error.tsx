'use client'; // Error components must be Client Components

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className='h-[80svh] grid place-items-center'>
			<div className='w-full max-w-sm bg-green-100 rounded-2xl h-72 flex flex-col items-center justify-center gap-10'>
				<h2 className='text-2xl'>User Added</h2>
				{/* <button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => {
						reset();
						revalidatePath('dashboard/users', 'layout');
					}
				}
			>
				Back to Users
			</button> */}
				<a
					className='bg-green-500 text-white rounded-lg px-3 py-1 hover:bg-green-400'
					href='/dashboard/user'
				>
					Click here to go back
				</a>
			</div>
		</div>
	);
}
