import Page from '../Page';
import Themes from '../components/Themes/Themes';
import ThemeProvider from '../context/ThemeProvider';

export default function Home() {
  return (
    <>
      {' '}
      <ThemeProvider>
        <Themes />
        <Page />
      </ThemeProvider>
    </>
  );
}
