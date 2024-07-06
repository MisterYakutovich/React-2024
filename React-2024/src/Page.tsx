import React from 'react';


export interface PageBeers {
  show: string;
  personNameSearch: ArrSearchResult[];
  loading: boolean;
  localResult: ArrSearchResult[];
}
export interface ArrSearchResult {
  name: string;
  id: string;
}
class Page extends React.Component<Record<string, never>, PageBeers> {
  state: PageBeers = {
    show: 'index',
    personNameSearch: [],
    loading: true,
    localResult: [],
  };
  componentDidMount() {
    const localData = localStorage.getItem('key');
    const localResult = localData ? JSON.parse(localData) : [];
    this.setState({ localResult });
  }

  handleEnter = (search: string): void => {
    if (search.trim() === '') {
      localStorage.removeItem('key');
      this.setState({
        localResult: [],
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
        });
        localStorage.setItem('key', JSON.stringify(data.results));
      });
  };

  render() {
    return (
      <>
       
      </>
    );
  }
}
export default Page;
