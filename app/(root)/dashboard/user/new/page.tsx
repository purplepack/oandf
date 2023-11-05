import AddUserForm from '@/components/forms/add-user-form';
import React from 'react';

export default function NewUserPage() {
	return (
		<main className='flex items-center justify-center min-h-screen'>
			<div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4'>
				<div className='flex h-20 w-full items-end rounded-lg bg-primary p-3 md:h-36'>
					<div className='w-32 text-white md:w-36'>
						Add New User
					</div>
				</div>
				<AddUserForm />
			</div>
		</main>
	);
}
