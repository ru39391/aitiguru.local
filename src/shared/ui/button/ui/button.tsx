import type { FC } from "react";
import type { IButton } from "../model/types";
import styles from './button.module.css';

const Button: FC<IButton> = ({ caption = "", children, handleClick, isDisabled = false, style, type = "button" }) => {
  const btnClassName = isDisabled ? `${styles.btn} ${styles.btn_type_disabled}` : styles.btn;
  const classNameMod = `btn_type_${style}`;

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
