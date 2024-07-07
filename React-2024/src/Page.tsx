import React from 'react';
import Seach from './components/Seach/Seach';
import Main from './components/Main/Main';


export interface PageBeers {
  show: string;
  personNameSearch: ArrSearchResult[];
  loading: boolean;
  localResult: ArrSearchResult[];
  search: string;
  localResultSearch: string;
}
export interface ArrSearchResult {
  url: string;
  name: string;
  id: string;
}
class Page extends React.Component<Record<string, never>, PageBeers> {
  state: PageBeers = {
    show: 'index',
    personNameSearch: [],
    loading: true,
    localResult: [],
    search: '',
    localResultSearch: '',
  };
  componentDidMount() {
    const localData = localStorage.getItem('key');
    const localSearch = localStorage.getItem('search');
    const localResult = localData ? JSON.parse(localData) : [];
    const localResultSearch = localSearch ? JSON.parse(localSearch) : '';
    this.setState({ localResult, localResultSearch });
  }

  handleEnter = (search: string): void => {
    if (search.trim() === '') {
      localStorage.removeItem('key');
      localStorage.removeItem('search');
      this.setState({
        localResult: [],
        localResultSearch: '',
      });
      return;
    }

    this.setState({
      loading: true,
      show: 'search',
    });

    search = encodeURIComponent(search);
    const url = `https://swapi.dev/api/people/?search=${search}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          personNameSearch: data.results,
          loading: false,
          localResult: data.results,
          search: search,
        });
        localStorage.setItem('search', JSON.stringify(search));
        localStorage.setItem('key', JSON.stringify(data.results));
      });
  };

  render() {
    const localResultSearch = this.state.localResultSearch;

    return (
      <>
        <Seach
          enterHandler={this.handleEnter}
          savedSearchLocal={localResultSearch}
        />
        <Main
          personNameSearch={this.state.personNameSearch}
          localResult={this.state.localResult}
        />
      </>
    );
  }
}
export default Page;
