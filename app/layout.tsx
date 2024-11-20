import type { Metadata } from 'next';
import { Header, Footer } from './_components';
import { Provider } from './provider';
import './_styles/common.scss';

export const metadata: Metadata = {
  title: 'Sketch Memory',
  description: 'Sketch Memory POC Application',
};

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <Provider>{children}</Provider>
        <Footer />
      </body>
    </html>
  );
}
