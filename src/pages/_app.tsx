import '../styles/global.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { makeStore, wrapper } from '../redux/store';

const store = makeStore();

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default wrapper.withRedux(App);
