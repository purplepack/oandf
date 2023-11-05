'use client';
import { useFormState, useFormStatus } from 'react-dom';
import {
	ArrowRightIcon,
	AtSignIcon,
	InfoIcon,
	KeyIcon,
	Phone,
	Settings,
	User,
} from 'lucide-react';
import { Button } from '../ui/button';
import { addUser } from '@/app/lib/gs';

export default function AddUserForm() {
	const [code, action] = useFormState(addUser, undefined);
	const { pending } = useFormStatus();

	return (
		<form
			action={action}
			className='space-y-3'
		>
			<div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
				<div className='w-full'>
					<div>
						<label
							className='mb-3 mt-5 block text-xs font-medium text-gray-900'
							htmlFor='name'
						>
							Name
						</label>
						<div className='relative'>
							<input
								className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
								id='name'
								type='text'
								name='name'
								placeholder='Enter your name'
								required
							/>
							<User className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
						</div>
					</div>
					<div>
						<label
							className='mb-3 mt-5 block text-xs font-medium text-gray-900'
							htmlFor='phone'
						>
							Phone
						</label>
						<div className='relative'>
							<input
								className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
								id='phone'
								type='text'
								name='phone'
								placeholder='Enter your phone number'
								required
							/>
							<Phone className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
						</div>
					</div>
					<div>
						<label
							className='mb-3 mt-5 block text-xs font-medium text-gray-900'
							htmlFor='email'
						>
							Email
						</label>
						<div className='relative'>
							<input
								className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
								id='email'
								type='email'
								name='email'
								placeholder='Enter your email address'
								required
							/>
							<AtSignIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
						</div>
					</div>
					<div className='mt-4'>
						<label
							className='mb-3 mt-5 block text-xs font-medium text-gray-900'
							htmlFor='password'
						>
							Password
						</label>
						<div className='relative'>
							<input
								className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
								id='password'
								type='password'
								name='password'
								placeholder='Enter password'
								required
								minLength={6}
							/>
							<KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
						</div>
					</div>
					<div className='mt-4'>
						<label
							className='mb-3 mt-5 block text-xs font-medium text-gray-900'
							htmlFor='password'
						>
							Retype Password
						</label>
						<div className='relative'>
							<input
								className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
								id='confirmPassword'
								type='password'
								name='confirmPassword'
								placeholder='Retype password'
								required
								minLength={6}
							/>
							<KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
						</div>
					</div>
					<div className='mt-4'>
						<label
							className='mb-3 mt-5 block text-xs font-medium text-gray-900'
							htmlFor='password'
						>
							Role
						</label>
						<div className='relative'>
							<input
								className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
								id='role'
								type='role'
								name='role'
								placeholder='Enter role'
								required
							/>

							<Settings className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
						</div>
					</div>
				</div>
				<LoginButton />
				<div className='flex h-8 items-end space-x-1'>
					{code === 'CredentialSignin' && (
						<>
							<InfoIcon className='h-5 w-5 text-red-500' />
							<p
								aria-live='polite'
								className='text-sm text-red-500'
							>
								Invalid credentials
							</p>
						</>
					)}
				</div>
			</div>
		</form>
	);
}

function LoginButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			className='mt-4 w-full'
			disabled={pending}
		>
			Create User{' '}
			<ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
		</Button>
	);
}
