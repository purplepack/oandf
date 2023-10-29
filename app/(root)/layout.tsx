import { NavigationBar } from '@/components/layout/navigation-bar';
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<NavigationBar />
			<div className='max-w-7xl overflow-clip mx-auto'>{children}</div>
		</main>
	);
}
