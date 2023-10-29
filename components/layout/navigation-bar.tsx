import * as React from 'react';
import Link from 'next/link';
import { GETTING_STARTED, NAVBAR_MENU, TRANSACTION_MENU } from '@/data/data';

import { cn } from '@/lib/utils';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '../ui/button';
import LogoutButton from './logout-button';
import { MenuIcon } from 'lucide-react';

export function NavigationBar() {
	return (
		<div className='bg-primary w-full '>
			<div className='lg:max-w-7xl mx-auto p-2 flex items-center justify-between w-full'>
				<Link
					href='/'
					className='text-background text-xl font-bold shrink-0'
				>{`OPS & FIN`}</Link>
				<div className='lg:flex w-full justify-between hidden'>
					<div className=''>
						<Button asChild>
							<Link href={'/dashboard'}>Dashboard</Link>
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button>Transactions</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-32'>
								<DropdownMenuGroup>
									{TRANSACTION_MENU.map(
										(tm, key) => (
											<DropdownMenuItem
												key={key}
											>
												<Link
													href={tm.href}
												>
													<span>
														{tm.title}
													</span>
												</Link>
											</DropdownMenuItem>
										)
									)}
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
						{NAVBAR_MENU.map((menu, key) => (
							<Button
								asChild
								key={key}
							>
								<Link href={menu.href}>
									{menu.title}
								</Link>
							</Button>
						))}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button>Tools</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-32'>
								<DropdownMenuGroup>
									<DropdownMenuItem asChild>
										<Link
											href={
												'dashboard/user/add'
											}
										>
											<span>Add User</span>
										</Link>
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className='flex'>
						<Button asChild>
							<Link href={'/sales'}>Record Sales</Link>
						</Button>
						<Button asChild>
							<Link href={'/expenses'}>
								Record Expenses
							</Link>
						</Button>
						<LogoutButton />
					</div>
				</div>
				<MenuIcon className='w-6 h-6 text-background lg:hidden' />
			</div>
		</div>
	);
}

const ListItem = ({
	href,
	title,
	description,
}: {
	href: string;
	title: string;
	description: string;
}) => {
	return (
		<Link
			className={cn(
				'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
			)}
			href={href}
		>
			<div className='text-sm font-medium leading-none'>{title}</div>
			<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
				{description}
			</p>
		</Link>
	);
};
ListItem.displayName = 'ListItem';
