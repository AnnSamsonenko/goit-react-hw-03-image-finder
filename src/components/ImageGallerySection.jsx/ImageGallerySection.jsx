import "./ImageGallerySection.css";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

export const ImageGallerySection = ({ images }) => {
  return (
    <section>
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
    </section>
  );
};
