'use client';

import { Provider } from 'react-redux';
import { PeopleArray } from '../../types/types';
import PageItem from '../PageItem/PageItem';
import { store } from '../../redux/store';
import Themes from '../Themes/Themes';
import ThemeProvider from '../../context/ThemeProvider';

interface PageItemCartClientProps {
  details: PeopleArray;
}
export default function PageItemCartClient({
  details,
}: PageItemCartClientProps) {
  // const [loading, setLoading] = useState(true);
  // const items = useSelector((state: RootState) => state.itemsCurrentPage.items);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Themes />
        <PageItem details={details} />
      </ThemeProvider>
    </Provider>
  );
}
