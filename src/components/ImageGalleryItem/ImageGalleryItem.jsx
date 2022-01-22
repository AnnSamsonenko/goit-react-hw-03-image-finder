import "./ImageGalleryItem.css";
import propTypes from "prop-types";

export const ImageGalleryItem = ({ largeImage, tags, preview }) => {
  return (
    <li className="ImageGalleryItem">
      <a className="ImageGalleryItem-link" href={largeImage}>
        <img className="ImageGalleryItem-image" src={preview} alt={tags} />
      </a>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImage: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  preview: propTypes.string.isRequired,
};
