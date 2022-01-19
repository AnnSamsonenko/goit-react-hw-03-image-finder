import { Component } from "react";
import "./App.css";
import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export class App extends Component {
  state = {
    query: "",
    page: 1,
  };

  handleFormSubmit = (query) => {
    this.setState({ query: query, page: 1 });
  };

  handleLoadMoreClick = () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { query, page } = this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          query={query}
          page={page}
          onClick={this.handleLoadMoreClick}
        />
      </div>
    );
  }
}
