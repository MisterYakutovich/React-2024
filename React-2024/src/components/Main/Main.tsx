import React from 'react';
import './Main.css';
import { ArrSearchResult } from '../../Page';

interface SearchState {
  search: string;
  items: PeopleArray[];
  isLoaded: boolean;
}
export interface PeopleProps {
  personNameSearch: ArrSearchResult[];
  localResult: ArrSearchResult[];
}
interface PeopleArray {
  name: string;
  id: string;
}
class Main extends React.Component<PeopleProps, SearchState> {
  state: SearchState = {
    search: '',
    items: [],
    isLoaded: false,
  };
  componentDidMount() {
    fetch('https://swapi.dev/api/people/?page=4')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results,
          });
        },
        () => {
          this.setState({
            isLoaded: true,
          });
        }
      );
  }
  render() {
    const allItems: PeopleArray[] = this.state.items;
    const arrResultLocal: ArrSearchResult[] = this.props.localResult;

    return (
      <section className="section-main">
        <div className="container">
          {arrResultLocal.length == 0
            ? allItems.map((i) => (
                <div key={i.id} className="card">
                  <p key={i.name} className="card_title">
                    {i.name}
                  </p>
                </div>
              ))
            : arrResultLocal.map((i) => (
                <div key={i.id} className="card">
                  <p key={i.name} className="card_title">
                    {i.name}
                  </p>
                </div>
              ))}
        </div>
      </section>
    );
  }
}
export default Main;
