import './button.css'

const Button = ({icon, text, size, color, textColor, href, onClick}) => {
  const divClassName = `button ${size} ${color}`;

  // Para botones pequeños, no se muestra el texto
  if (size === 'small') {
    text = '';
  }

  return (
    <a 
      className={divClassName}
      style={{backgroundColor: color, color: textColor}}
      onClick={onClick}
      href={href}
    >
      {typeof icon === 'string' && <img src={icon} className="button-icon" />}
      {typeof icon === 'object' && icon}
      {text}
    </a>
  )
}

export default Button;