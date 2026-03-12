import type { FC } from "react";
import type { IButton } from "../model/types";
import styles from './button.module.css';

const Button: FC<IButton> = ({ caption = "", children, handleClick, style, type = "button" }) => {
  const classNameMod = `btn_type_${style}`;

  return (
    <button className={style ? `${styles.btn} ${styles[classNameMod]}` : styles.btn} type={type} {...( handleClick && { onClick: handleClick } )}>
      {children || ""}{caption}
    </button>
  )
};

export default Button;
