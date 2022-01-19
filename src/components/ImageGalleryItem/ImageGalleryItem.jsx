import "./ImageGalleryItem.css";

export const ImageGalleryItem = ({ largeImage, tags, preview }) => {
  return (
    <li className="ImageGalleryItem">
      <a className="ImageGalleryItem-link" href={largeImage}>
        <img className="ImageGalleryItem-image" src={preview} alt={tags} />
      </a>
    </li>
  );
};
