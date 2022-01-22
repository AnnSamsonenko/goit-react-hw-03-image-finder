import "./ImageGalleryList.css";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { SRLWrapper } from "simple-react-lightbox";
import propTypes from "prop-types";

const options = {
  settings: {
    overlayColor: "rgba(0, 0, 0, 0.8)",
    disableWheelControls: true,
    disablePanzoom: true,
  },
  caption: {
    showCaption: false,
  },
  buttons: {
    showAutoplayButton: false,
    showCloseButton: true,
    showDownloadButton: false,
    showFullscreenButton: false,
    showNextButton: true,
    showPrevButton: true,
    showThumbnailsButton: false,
  },
  thumbnails: {
    showThumbnails: false,
  },
  progressBar: {
    showProgressBar: false,
  },
};

export const ImageGalleryList = ({ images }) => {
  return (
    <SRLWrapper options={options}>
      <ul className="imageGallery">
        {images.map(({ id, largeImageURL, tags, webformatURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              largeImage={largeImageURL}
              tags={tags}
              preview={webformatURL}
            />
          );
        })}
      </ul>
    </SRLWrapper>
  );
};

ImageGalleryList.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      largeImageURL: propTypes.string.isRequired,
      webformatURL: propTypes.string.isRequired,
      tags: propTypes.string.isRequired,
    })
  ).isRequired,
};
