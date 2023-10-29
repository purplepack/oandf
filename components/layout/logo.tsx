import Link from 'next/link';
import React from 'react';

export default function Logo() {
	return (
		<Link
			className='text-background font-medium text-2xl'
			href='/'
		>{`OPS & FIN`}</Link>
	);
}
