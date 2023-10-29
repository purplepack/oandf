import { NavigationBar } from '@/components/layout/navigation-bar';
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<NavigationBar />
			<div className='max-w-7xl mx-auto'>{children}</div>
		</main>
	);
}
