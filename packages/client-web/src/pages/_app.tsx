import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { InitTrpcWrapper } from '../system/InitTrpcWrapper';
import { ViewportWrapper } from '../system/ViewportWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <InitTrpcWrapper>
      <ViewportWrapper title="App">
        <Component {...pageProps} />
      </ViewportWrapper>
    </InitTrpcWrapper>
  );
}
