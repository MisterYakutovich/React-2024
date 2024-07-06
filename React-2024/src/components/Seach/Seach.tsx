import React from 'react';
import './Seach.css';


interface SearchState {
  search: string;
}
interface SearchProps {
  enterHandler: (search: string) => void;
}
class Seach extends React.Component<SearchProps, SearchState> {
  state: SearchState = {
    search: '',
  };
  handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.enterHandler(this.state.search);
    }
  };
  render() {
    return (
      <div className="row">
        <div className="input-field col s12">
          <input
            type="text"
            value={this.state.search}
            onChange={(event) => this.setState({ search: event.target.value })}
            onKeyUp={this.handleEnter}
            placeholder="Enter the name of the beer"
          />
          <button
            className="btn"
            onClick={() => this.props.enterHandler(this.state.search)}
          >
            Search
          </button>
         
        </div>
      </div>
    );
  }
}
export default Seach;
