import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { getUsers } from '@/app/lib/gs';
import Search from '@/components/ui/search';
import { CreateUser, DeleteUser, UpdateUser } from '@/components/buttons';

export default async function UsersPage({
	searchParams,
}: {
	searchParams?: {
		query?: string;
	};
}) {
	const users = await getUsers();
	return (
		<div className='flex w-full p-5 overflow-clip'>
			<div className='w-full'>
				<div className='flex gap-5'>
					<Search placeholder='Search ...' />
					<CreateUser />
				</div>
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
										<DeleteUser id={user.email} />
										<UpdateUser id={user.id} />
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
