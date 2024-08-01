import '../styles/global.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { setupStore } from '../redux/store';

const store = setupStore();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
