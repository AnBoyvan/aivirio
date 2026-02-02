import type { NextConfig } from 'next';

import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Cross-Origin-Embedder-Policy',
						value: 'credentialless',
					},
					{
						key: 'Cross-Origin-Opener-Policy',
						value: 'same-origin',
					},
				],
			},
		];
	},
};

export default withSentryConfig(nextConfig, {
	org: 'abdev-1f',
	project: 'aivirio',
	silent: !process.env.CI,
	widenClientFileUpload: true,
	tunnelRoute: '/monitoring',
	webpack: {
		automaticVercelMonitors: true,
		treeshake: {
			removeDebugLogging: true,
		},
	},
});
