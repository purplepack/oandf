import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { deleteUser } from '@/app/lib/gs';

export function CreateUser() {
	return (
		<Button asChild>
			<Link href='/dashboard/user/add'>
				<span className='hidden md:block'>Add New User</span>{' '}
				<PlusIcon className='h-5 md:ml-4' />
			</Link>
		</Button>
	);
}

export function UpdateUser({ id }: { id: string }) {
	return (
		<Link
			href={`/dashboard/user/${id}/edit`}
			className='text-emerald-700'
		>
			<PencilIcon className='w-5' />
		</Link>
	);
}

export function DeleteUser({ id }: { id: string }) {
	return (
		<form action={deleteUser}>
			<input
				type='hidden'
				name='id'
				value={id}
			/>
			<button>
				<span className='sr-only'>Delete</span>
				<TrashIcon className='w-5 text-red-700' />
			</button>
		</form>
	);
}
