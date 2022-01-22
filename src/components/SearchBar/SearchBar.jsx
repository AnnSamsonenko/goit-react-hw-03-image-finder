import { Component } from "react";
import "./SearchBar.css";
import propTypes from "prop-types";

export class SearchBar extends Component {
  state = {
    query: "",
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ query: value.toLowerCase().trim() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { query } = this.state;
    const { onSubmit } = this.props;

    if (query === "") {
      alert("Type something please");
      return;
    }

    onSubmit(query);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="searchForm-button"></button>

          <input
            className="searchForm-input"
            type="text"
            autoComplete="off"
            // autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
