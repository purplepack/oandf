import * as React from 'react';
import Link from 'next/link';
import { NAVBAR_MENU, TRANSACTION_MENU } from '@/data/data';

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
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

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
											href={'/dashboard/user'}
										>
											<span>Users</span>
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
				<Sheet>
					<SheetTrigger asChild>
						<MenuIcon className='w-6 h-6 text-background lg:hidden' />
					</SheetTrigger>
					<SheetContent className='pt-12 w-52 flex flex-col gap-0 '>
						<SheetClose asChild>
							<Button
								variant='ghost'
								asChild
								className='w-full justify-start'
							>
								<Link href={'/dashboard'}>
									Dashboard
								</Link>
							</Button>
						</SheetClose>
						<SheetClose asChild>
							<Button
								variant='ghost'
								asChild
								className='w-full justify-start'
							>
								<Link href={'/transactions'}>
									Transactions
								</Link>
							</Button>
						</SheetClose>
						{NAVBAR_MENU.map((trans, key) => (
							<SheetClose
								asChild
								key={key}
							>
								<Button
									variant='ghost'
									asChild
									className='w-full justify-start'
								>
									<Link href={trans.href}>
										{trans.title}
									</Link>
								</Button>
							</SheetClose>
						))}
						<LogoutButton />
					</SheetContent>
				</Sheet>
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
