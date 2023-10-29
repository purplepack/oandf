import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { PencilIcon, TrashIcon } from 'lucide-react';

export default async function UsersPage() {
	const users: User[] = [
		{
			id: 'ertyuigf',
			name: 'TRYR',
			role: 'tree',
			email: 'email',
			phone: 'ERtkjhgvcv',
			suuid: 'hbfhfh',
		},
		{
			id: 'ertyuigf',
			name: 'TRYR',
			role: 'tree',
			email: 'email',
			phone: 'ERtkjhgvcv',
			suuid: 'hbfhfh',
		},
	];
	return (
		<div className='flex w-full p-5 overflow-clip'>
			<div className='w-full'>
				<Button asChild>
					<Link href={'/dashboard/user/add'}>Add New User</Link>
				</Button>
				<div className='w-full'>
					<Table className='w-full'>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{users.map((user, key) => (
								<TableRow key={key}>
									<TableCell className='font-medium'>
										{user.name}
									</TableCell>
									<TableCell> {user.role}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell className='flex gap-2'>
										<TrashIcon className='text-green-700 h-4 w-4' />
										<PencilIcon className='text-red-700 h-4 w-4' />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
