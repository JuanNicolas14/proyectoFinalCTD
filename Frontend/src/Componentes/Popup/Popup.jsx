import { useEffect, useState } from "react";
import Button from "../Button/Button";

import './popup.css';

const Popup = ({ icon, children, direction, borderColor, x, y }) => {
  const [showPopup, setShowPopup] = useState(false);
  const iconos = document.querySelectorAll('.iconos')[0];

  return (
    <>
      <Button
      icon={icon}
      size="tiny"
      color="white"
      onClick={(e) => {
        e.preventDefault();
        setShowPopup(!showPopup);
      }} />
      <dialog
        open={showPopup}
        className="popup"
        style={{border: `solid 1px ${borderColor}`,
                left: iconos?.getBoundingClientRect().left - x,
                top: iconos?.getBoundingClientRect().top - y
        }}
      >
        <div className="popup-content" style={{flexDirection: direction}}>
          {children}
        </div>
      </dialog>
    </>
  )
}

export default Popup;