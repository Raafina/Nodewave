import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import AppShell from '@/components/commons/AppShell';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import { onErrorHandler } from '@/libs/axios/response.handler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false, // for not looping touch API
      throwOnError(error) {
        onErrorHandler(error as Error);
        return false;
      },
    },
    mutations: {
      onError: onErrorHandler,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <AppShell>
          <Component {...pageProps} />
          <Toaster richColors position="top-center" />
        </AppShell>
      </QueryClientProvider>
    </SessionProvider>
  );
}
