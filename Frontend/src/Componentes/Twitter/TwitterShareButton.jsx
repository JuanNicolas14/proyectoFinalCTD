// Ver: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
import './twitterShareButton.css';

import images from '../../assets/images/images';

const TwitterShareButton = () => {
  return (
    <div className="twitter-share-button">
      <img src={images.twitter} id="twitter-logo"/>
      <a
        href="https://twitter.com/intent/tweet?text=BukingFood. La app de suscripción a comida.! http://bukinfood.s3-website.us-east-2.amazonaws.com/&hashtags=BukinFood"
        onClick={(e) => {
            e.preventDefault();
            window.open(
              e.currentTarget.href,
              'twitter-share-dialog',
              'width=626,height=436'
            );
          }
        }
      >
        Compartir
      </a>
    </div>
  )
}

export default TwitterShareButton;
