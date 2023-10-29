import React from 'react';
import { Button } from '../ui/button';
import { LogInIcon, PowerOffIcon } from 'lucide-react';
import { auth, signIn, signOut } from '@/auth';
import Link from 'next/link';

export default async function LogoutButton() {
	const session = await auth();
	if (session?.user) {
		return (
			<form
				action={async () => {
					'use server';
					await signOut();
				}}
			>
				<Button className='flex gap-1 justify-start items-center w-full'>
					<PowerOffIcon className='w-4' />
					<div className='block'>{session.user.name}</div>
				</Button>
			</form>
		);
	} else {
		return (
			<Button
				asChild
				className=''
			>
				<Link
					href='/login'
					className='hidden md:flex gap-1 items-center'
				>
					<LogInIcon className='w-4' />
					Sign in
				</Link>
			</Button>
		);
	}
}
