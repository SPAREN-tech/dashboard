import type { AppProps } from 'next/app';

import { SWRConfig } from 'swr';

import { Dashboard } from '@components/Dashboard';

import { getFromLocalStorage } from '@utils/cache';

import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: (resource) => getFromLocalStorage(resource) }}>
      <Dashboard>
        <main className="flex-1 pb-8">
          <Component {...pageProps} />
        </main>
      </Dashboard>
    </SWRConfig>
  );
}
