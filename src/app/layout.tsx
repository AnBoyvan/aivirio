import type { Metadata } from 'next';
import { IBM_Plex_Mono, Inter } from 'next/font/google';

import './globals.css';
import 'allotment/dist/style.css';

import { Providers } from '@/components/providers';

import favicon from '../../public/favicon.ico';

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
		template: '%s · Aivirio',
	},
	description:
		'AI-powered, browser-first web development workspace. Combines AI-assisted code editing, GitHub integration, and in-browser runtimes for rapid prototyping, live previews, and reduced setup friction.',

	keywords: [
		'AI development workspace',
		'browser-based IDE',
		'AI code editor',
		'web development platform',
		'in-browser runtime',
		'GitHub integration',
		'rapid prototyping',
		'developer tools',
	],
	applicationName: 'Aivirio',
	creator: 'Andrii Boyvan',
	openGraph: {
		type: 'website',
		siteName: 'Aivirio',
		title: 'Aivirio — AI-Powered Web Development Workspace',
		description:
			'AI-powered, browser-first web development workspace for rapid prototyping with AI-assisted code editing, GitHub integration, and live in-browser runtimes.',
		url: '/',
		images: [
			{
				url: '/opengraph-image.png',
				width: 1200,
				height: 630,
				alt: 'Aivirio — AI-Powered Web Development Workspace',
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		title: 'Aivirio — AI-Powered Web Development Workspace',
		description:
			'Browser-first AI development workspace with live previews, GitHub integration, and in-browser runtimes.',
		images: ['/twitter-image.png'],
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},

	category: 'technology',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.className} ${inter.variable} ${plexMono.variable} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
