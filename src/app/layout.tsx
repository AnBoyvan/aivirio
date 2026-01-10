import type { Metadata } from 'next';
import { IBM_Plex_Mono, Inter } from 'next/font/google';

import favicon from '../../public/favicon.ico';
import './globals.css';

import { Providers } from '@/components/providers';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

const plexMono = IBM_Plex_Mono({
	variable: '--font-plex-mono',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.BASE_URL || ''),
	icons: {
		icon: favicon.src,
	},
	title: {
		default: 'Aivirio',
		template: 'Aivirio',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} ${plexMono.variable} antialiased`}>
				<Providers>
					{/* <header>
								<SignedOut>
									<SignInButton />
									<SignUpButton>
										<button className="h-10 cursor-pointer rounded-full bg-[#6c47ff] px-4 font-medium text-sm text-white sm:h-12 sm:px-5 sm:text-base">
											Sign Up
										</button>
									</SignUpButton>
								</SignedOut>
								<SignedIn>
									<UserButton />
								</SignedIn>
							</header> */}
					{children}
				</Providers>
			</body>
		</html>
	);
}
