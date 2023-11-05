'use client';
import {
	PencilIcon,
	PlusIcon,
	RefreshCcw,
	RefreshCw,
	TrashIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { deleteUser } from '@/app/lib/gs';
import { useFormStatus } from 'react-dom';

export function CreateUser() {
	return (
		<Button asChild>
			<Link href='/dashboard/user/new'>
				<span className='hidden md:block'>Add New User</span>{' '}
				<PlusIcon className='h-5 md:ml-4' />
			</Link>
		</Button>
	);
}

export function UpdateUser({ id }: { id: string }) {
	return (
		<Button
			asChild
			variant={'ghost'}
			className='p-0'
		>
			<Link
				href={`/dashboard/user/${id}/edit`}
				className='text-emerald-700'
			>
				<PencilIcon className='w-5' />
			</Link>
		</Button>
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
			<DeleteButton />
		</form>
	);
}

function DeleteButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			variant={'ghost'}
			className={`p-0`}
			disabled={pending}
		>
			<span className='sr-only'>Delete</span>
			{pending ? (
				<RefreshCw className='w-5 animate-spin text-red-700' />
			) : (
				<TrashIcon className='w-5 text-red-700' />
			)}
		</Button>
	);
}
