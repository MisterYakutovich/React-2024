import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Download from './Download';
import { makeStore } from '../../redux/store';
import '@testing-library/jest-dom';

const store = makeStore();
describe('Download Component', () => {
  it('следует отображать компонент «Download» и показывать ссылку Download', () => {
    window.URL.createObjectURL = jest.fn();
    render(
      <Provider store={store}>
        <Download />
      </Provider>
    );
    const downloadLink = screen.getByText('Download');
    expect(downloadLink).toBeInTheDocument();
  });
});
