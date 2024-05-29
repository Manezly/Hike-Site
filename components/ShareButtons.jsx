import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon
} from 'react-share';
// css in header.css

const ShareButtons = ({hike}) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/hikes/${hike._id}`;
  return (
    <>
    <div className="socials_parent">

        <h3>Share this hike:</h3>
        <div className='socials_container'>
            <FacebookShareButton
                url={shareUrl}
                quote={hike.name}
                hashtag={`#${hike.title}`}
            >
                <FacebookIcon size={40} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
                url={shareUrl}
                quote={hike.name}
                hashtags={[`#Hike#${hike.title}`]}
            >
                <TwitterIcon size={40} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton
                url={shareUrl}
                quote={hike.name}
                separator=':: '
            >
                <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
            <EmailShareButton
                url={shareUrl}
                quote={hike.name}
                body={`Check out this hike: ${shareUrl}`}
            >
                <EmailIcon size={40} round={true} />
            </EmailShareButton>
        </div>
    </div>
    </>
  )
}

export default ShareButtons