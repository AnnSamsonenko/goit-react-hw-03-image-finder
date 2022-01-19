import { Component } from "react";
import { fetchImages } from "../../Services/Api";
import { ImageGalleryList } from "../ImageGalleryList/ImageGalleryList";
import { Button } from "../Button/Button";
import "./ImageGallery.css";
import { Loader } from "../Loader/Loader";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const ITEMS_PER_PAGE = 12;

export class ImageGallery extends Component {
  state = {
    images: [],
    status: Status.IDLE,
    currentHitsPerPage: 0,
  };

  async componentDidUpdate(prevProps) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    nextPage > 1 &&
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });

    prevQuery !== nextQuery &&
      this.setState({ images: [], status: Status.PENDING });

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      try {
        const { hits, totalHits } = await fetchImages(nextPage, nextQuery);
        if (totalHits === 0) {
          alert("Nothing found with such query");
          this.setState({ status: Status.IDLE });
          return;
        }

        const images = this.makeImagesArray(hits);

        this.setState((prevState) => {
          return {
            images: [...prevState.images, ...images],
            status: Status.RESOLVED,
            currentHitsPerPage: hits.length,
          };
        });
      } catch (error) {
        console.log(error);
        this.setState({ status: Status.REJECTED });
      }
    }
  }

  makeImagesArray = (data) => {
    return data.map(({ id, largeImageURL, tags, webformatURL }) => {
      return { id, largeImageURL, tags, webformatURL };
    });
  };

  render() {
    const { images, status, currentHitsPerPage } = this.state;
    const { onClick } = this.props;

    if (status === Status.IDLE) {
      return <h2 className="Message">Type your search query</h2>;
    }

    if (status === Status.PENDING) {
      return (
        <>
          <ImageGalleryList images={images} />
          <Loader />
        </>
      );
    }

    if (status === Status.REJECTED) {
      return (
        <h2 className="Message">Something went wrong, please try again</h2>
      );
    }

    if (status === Status.RESOLVED) {
      return (
        <>
          <ImageGalleryList images={images} />
          {currentHitsPerPage < ITEMS_PER_PAGE ? (
            <p className="Message">End of search results</p>
          ) : (
            <Button
              onClick={() => {
                this.setState({ status: Status.PENDING });
                onClick();
              }}
            />
          )}
        </>
      );
    }
  }
}
