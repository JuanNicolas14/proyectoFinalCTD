// Ver: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
import twitter from '../../assets/images/twitter.png';
import Button from '../Button/Button';

const TwitterShareButton = ({size, text, message, hashtags}) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(
      e.currentTarget.href,
      'twitter-share-dialog',
      'width=626,height=436'
    );
  }

  return <Button
      icon={twitter}
      color="#1DA1F2"
      textColor="white"
      size={size}
      text={text}
      onClick={handleClick}
      href={`https://twitter.com/intent/tweet?text=${message}&hashtags=${hashtags}`}
    />
}

export default TwitterShareButton;
