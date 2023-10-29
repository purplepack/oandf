import LoginForm from '@/components/forms/login-form';
import Logo from '@/components/layout/logo';

export default async function Home() {
	return (
		<main className='flex items-center justify-center md:h-screen'>
			<div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4'>
				<div className='flex h-20 w-full items-end rounded-lg bg-primary p-3 md:h-36'>
					<div className='w-32 text-white md:w-36'>
						<Logo />
					</div>
				</div>
				<LoginForm />
			</div>
		</main>
	);
}
