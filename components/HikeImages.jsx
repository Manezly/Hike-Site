import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const HikeImages = ({ images }) => {
    const limitedImages = images.slice(0, 4);
    return (
      <Gallery>
        <section className="section container images">
          {limitedImages.map((image, index) => (
            <Item
              key={index}
              original={image}
              thumbnail={image}
              width={1000}
              height={600}
            >
              {({ ref, open }) => (
                <div key={index} onClick={open}>
                  <Image
                    ref={ref}
                    src={image}
                    alt=""
                    width={1800}
                    height={400}
                    priority
                  />
                </div>
              )}
            </Item>
          ))}
        </section>
      </Gallery>
    );
  };

export default HikeImages