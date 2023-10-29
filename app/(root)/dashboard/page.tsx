import { getCompanyDetails } from '@/app/lib/gs';
import { Card } from '@/components/ui/card';
import React from 'react';

export default async function DashboardPage() {
	const company = await getCompanyDetails();
	return (
		<div className='grid h-screen place-items-center'>
			<Card className='p-5 bg-primary text-background'>
				<div className=''>Name: {company?.name}</div>
				<div className=''>Description: {company?.description}</div>
				<div className=''>Industry: {company?.industry}</div>
				<div className=''>Location: {company?.location}</div>
				<div className=''>Email: {company?.email}</div>
				<div className=''>Phone: {company?.phone}</div>
				<div className=''>Facebook: {company?.facebook}</div>
				<div className=''>Instagram: {company?.instagram}</div>
			</Card>
		</div>
	);
}
