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

import { HammerIcon, PowerOffIcon } from 'lucide-react';
import { Button } from '../ui/button';
import LogoutButton from './logout-button';

export function NavigationBar() {
	return (
		<div className='bg-primary w-full '>
			<div className='max-w-7xl mx-auto py-2 flex items-center justify-between'>
				<Link
					href='/'
					className='text-background text-xl font-bold'
				>{`OPS & FIN`}</Link>
				<div className='flex'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button>Transactions</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-32'>
							<DropdownMenuGroup>
								{TRANSACTION_MENU.map((tm, key) => (
									<DropdownMenuItem key={key}>
										<Link href={tm.href}>
											<span>{tm.title}</span>
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
					{NAVBAR_MENU.map((menu, key) => (
						<Button
							asChild
							key={key}
						>
							<Link href={menu.href}>{menu.title}</Link>
						</Button>
					))}
					<LogoutButton />
				</div>
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
