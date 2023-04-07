import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { InitTrpcWrapper } from '../system/InitTrpcWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <InitTrpcWrapper>
      <Component {...pageProps} />
    </InitTrpcWrapper>
  );
}
