import { Component } from "react";
import "./App.css";
import { SearchBar } from "./SearchBar/SearchBar";
import { fetchImages } from "../Services/Api";
import { ImageGalleryList } from "./ImageGalleryList/ImageGalleryList";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";

const ITEMS_PER_PAGE = 12;

export class App extends Component {
  state = {
    query: "",
    page: 1,
    images: [],
    loading: false,
    currentHitsPerPage: null,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    if (prevQuery !== nextQuery) {
      this.getImagesData();
    }

    if (this.state.page > 2) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  handleFormSubmit = (query) => {
    this.setState(() => {
      return { query: query, page: 1, images: [] };
    });
  };

  handleLoadMoreClick = () => {
    this.getImagesData();
  };

  getImagesData = async () => {
    try {
      this.setState({ loading: true });
      const { hits, totalHits } = await fetchImages(
        this.state.page,
        this.state.query
      );
      if (totalHits === 0) {
        alert("Nothing found with such query");
        this.setState({ loading: false, currentHitsPerPage: null });
        return;
      }

      const images = this.makeImagesArray(hits);

      this.setState((prevState) => {
        return {
          images: [...prevState.images, ...images],
          currentHitsPerPage: hits.length,
          page: prevState.page + 1,
        };
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  makeImagesArray = (data) => {
    return data.map(({ id, largeImageURL, tags, webformatURL }) => {
      return { id, largeImageURL, tags, webformatURL };
    });
  };

  render() {
    const { images, loading, currentHitsPerPage, error } = this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />

        {images.length > 0 && !error && (
          <>
            <ImageGalleryList images={images} />
            {currentHitsPerPage && currentHitsPerPage < ITEMS_PER_PAGE && (
              <p className="Message">End of search results</p>
            )}
          </>
        )}
        {currentHitsPerPage === ITEMS_PER_PAGE && !loading && (
          <Button onClick={this.handleLoadMoreClick} />
        )}
        {loading && <Loader />}
        {error && (
          <h2 className="Message">Something went wrong, please try again</h2>
        )}
      </div>
    );
  }
}
