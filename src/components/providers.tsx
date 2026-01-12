'use client';

import type { ReactNode } from 'react';

import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import {
	Authenticated,
	AuthLoading,
	ConvexReactClient,
	Unauthenticated,
} from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ThemeProvider } from 'next-themes';

import { AuthLoadingView } from '@/features/auth/components/auth-loading-view';
import { UnauthenticatedView } from '@/features/auth/components/unauthenticated-view';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ClerkProvider
			appearance={{
				theme: dark,
			}}
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<Authenticated>{children}</Authenticated>
					<Unauthenticated>
						<UnauthenticatedView />
					</Unauthenticated>
					<AuthLoading>
						<AuthLoadingView />
					</AuthLoading>
				</ThemeProvider>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
};
