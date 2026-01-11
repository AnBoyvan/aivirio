export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			// Base
			BASE_URL: string;
			NEXT_PUBLIC_BASE_URL: string;
			NEXT_PUBLIC_DEVELOPED_BY: string;

			// Clerk
			NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
			CLERK_SECRET_KEY: string;
			CLERK_JWT_ISSUER_DOMAIN: sring;

			// Convex
			CONVEX_DEPLOYMENT: string;
			NEXT_PUBLIC_CONVEX_URL: string;

			// Anthropic
			ANTHROPIC_API_KEY: sting;

			// Firecrawl
			FIRECRAWL_API_KEY: string;

			// Sentry
			SENTRY_AUTH_TOKEN: string;

			// Node
			NODE_ENV: 'development' | 'production' | 'test';
		}
	}
}
