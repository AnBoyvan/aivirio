import * as Sentry from '@sentry/nextjs';

Sentry.init({
	dsn: 'https://2ebd1026858516a9c4fe87dea202afb3@o4510691545186304.ingest.de.sentry.io/4510691923394640',
	tracesSampleRate: 1,
	enableLogs: true,
	sendDefaultPii: true,
	integrations: [Sentry.vercelAIIntegration()],
});
