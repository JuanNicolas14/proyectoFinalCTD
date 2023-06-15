import Button from "../Button/Button";

import whatsapp from '../../assets/images/whatsapp.png';

const WhatsappShareButton = ({ size, text, message }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(
      e.currentTarget.href,
      'whatsapp-share-dialog',
      'width=626,height=436'
    );
  }

  return <Button
    icon={whatsapp}
    color="#25D366"
    textColor="white"
    size={size}
    text={text}
    onClick={handleClick}
    href={`https://api.whatsapp.com/send?text=${message}`}
  />
}

export default WhatsappShareButton;