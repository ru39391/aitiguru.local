import type { FC } from "react";
import type { ITextField } from "../model/types";
import styles from './text-field.module.css';

const TextField: FC<ITextField> = ({ children, icon, isRequired, label, name, type }) => {
  const rowClassName = icon ? `${styles.row} ${styles.row_offset_y}` : styles.row;

  return (
    <div className={styles.item}>
      {Boolean(label) && <label className={styles.label}>{label}</label>}
      <div className={rowClassName}>
        {icon}
        <input id={name} className={`${styles.input} ${styles.label}`} type={type || "text"} {...(isRequired && { required: isRequired })} />
        {children}
      </div>
    </div>
  )
};

export default TextField;
