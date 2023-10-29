import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import AddProductsForm from '@/components/forms/add-products-form';

export default function ProductsPage() {
	return (
		<div className='grid min-h-screen place-items-center'>
			<div className='flex flex-col gap-5'>
				<Dialog>
					<DialogTrigger>Add Product</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								Are you sure absolutely sure?
							</DialogTitle>
							<DialogDescription>
								<AddProductsForm />
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
