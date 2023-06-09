import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { InitTrpcWrapper } from '../system/InitTrpcWrapper';
import { ViewportWrapper } from '../system/ViewportWrapper';
import { Header } from '../components/Header';

export default function App({ Component, pageProps }: AppProps) {

  console.log(process.env.NEXT_PUBLIC_SERVER_URL);

  return (
    <InitTrpcWrapper>
      <ViewportWrapper title="App">
        <>
          <Header />
          <Component {...pageProps} />
        </>
      </ViewportWrapper>
    </InitTrpcWrapper>
  );
}
