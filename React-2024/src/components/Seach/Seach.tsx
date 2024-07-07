import React from 'react';
import './Seach.css';
import ErrorButton from '../ErrorButton/ErrorButton';

interface SearchState {
  search: string;
  isSavedSearch: boolean;
}
interface SearchProps {
  enterHandler: (search: string) => void;
  savedSearchLocal: string;
}
class Seach extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      search: '',
      isSavedSearch: false,
    };
  }
  componentDidMount() {
    this.updateSearchFromLocalStorage();
  }
  componentDidUpdate(prevProps: SearchProps) {
    if (prevProps.savedSearchLocal !== this.props.savedSearchLocal) {
      this.updateSearchFromLocalStorage();
    }
  }
  updateSearchFromLocalStorage() {
    const { savedSearchLocal } = this.props;
    if (savedSearchLocal) {
      this.setState({
        search: savedSearchLocal,
        isSavedSearch: true,
      });
    }
  }

  handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.enterHandler(this.state.search);
    }
  };

  render() {
    const { savedSearchLocal } = this.props;
    return (
      <div className="row">
        <div className="input-field col s12">
          <input
            type="text"
            value={
              this.state.isSavedSearch ? savedSearchLocal : this.state.search
            }
            onChange={(event) =>
              this.setState({
                search: event.target.value,
                isSavedSearch: false,
              })
            }
            onKeyUp={this.handleEnter}
            placeholder="Enter the name of the person"
          />
          <button
            className="btn"
            onClick={() => this.props.enterHandler(this.state.search)}
          >
            Search
          </button>
          <ErrorButton />
        </div>
      </div>
    );
  }
}
export default Seach;
