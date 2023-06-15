// Ver: https://developers.facebook.com/docs/plugins/share-button/
import facebook from '../../assets/images/facebook.png';
import Button from '../Button/Button';

const FacebookShareButton = ({size, text, link}) => {
  const handleClick = (e) => {
    e.preventDefault();;
    window.open(
      e.currentTarget.href,
      'facebook-share-dialog',
      'width=626,height=436'
    );
  }

  return <Button
      icon={facebook}
      color="#4267B2"
      textColor="white"
      size={size}
      text={text}
      onClick={handleClick}
      href={`https://www.facebook.com/sharer/sharer.php?u=${link}&amp;src=sdkpreparse`}
    />
}

export default FacebookShareButton;
