import { getCompanyDetails } from '@/app/lib/gs';
import { Card } from '@/components/ui/card';
import React from 'react';

export default async function DashboardPage() {
	const company = await getCompanyDetails();
	return (
		<div className='flex flex-col h-screen items-center pt-10 gap-5'>
			<h1 className='text-3xl font-medium'>DASHBOARD</h1>
			<Card className='p-5 bg-primary text-background max-w-lg'>
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
