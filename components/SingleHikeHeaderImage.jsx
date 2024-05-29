import Image from "next/image";
import '@/assets/styles/single-hike-page.css';

const SingleHikeHeaderImage = ({image}) => {
  return (
    <section>
        <Image
            src={image}
            width={1800}
            height={500}
            className="header-image"
            priority
            alt="top-header-image"
        >
        </Image>
    </section>
  )
}

export default SingleHikeHeaderImage