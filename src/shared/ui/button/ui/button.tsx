import type { FC } from "react";
import { Link } from "react-router";
import type { IButton } from "../model/types";
import styles from './button.module.css';

const Button: FC<IButton> = ({ caption = "", children, href, handleClick, isDisabled = false, style, type = "button" }) => {
  const btnClassName = isDisabled ? `${styles.btn} ${styles.btn_type_disabled}` : styles.btn;
  const classNameMod = `btn_type_${style}`;

  if(href) {
    return (
      <Link
        className={style ? `${btnClassName} ${styles[classNameMod]}` : btnClassName}
        to={href}
      >
        {children || ""}{caption}
      </Link>
    )
  }

  return (
    <button
      className={style ? `${btnClassName} ${styles[classNameMod]}` : btnClassName}
      type={type}
      {...( handleClick && { onClick: handleClick } )}
      {...( isDisabled && { disabled: isDisabled } )}
    >
      {children || ""}{caption}
    </button>
  )
};

export default Button;
