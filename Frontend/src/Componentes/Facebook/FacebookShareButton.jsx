// Ver: https://developers.facebook.com/docs/plugins/share-button/

import './facebookShareButton.css';

import images from '../../assets/images/images';

const FacebookShareButton = () => {
  return (
    <div className="fb-share-button">
        <img src={images.facebook} id="facebook-logo"/>
        <a
          href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fbukinfood.s3-website.us-east-2.amazonaws.com%2Fhome&amp;src=sdkpreparse"
          onClick={(e) => {
              e.preventDefault();
              window.open(
                e.currentTarget.href,
                'facebook-share-dialog',
                'width=626,height=436'
              );
            }
          }
        >Compartir
        </a>
      </div>
  );
}

export default FacebookShareButton;
