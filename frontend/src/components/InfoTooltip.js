import successImg from "../images/tooltip.svg";
import errorImg from "../images/tooltip_error.svg";
import Popup from "./Popup";

export default function InfoTooltip({ onClose, isOpen, tooltip: { image, message } }) {
  const imgSrc = image ? successImg : errorImg;

  return (
      <Popup isOpen={isOpen} name="tooltip" onClose={onClose}>
          <img
              className="popup__img"
              src={imgSrc}
              alt={message}
          />
          <h3 className="popup__title">{message}</h3>
      </Popup>
  );
}
