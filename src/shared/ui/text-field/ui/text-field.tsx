import type { FC } from "react";
import type { ITextField } from "../model/types";
import styles from './text-field.module.css';

const TextFieldInput: FC<{ name: ITextField["name"]; type: ITextField["type"]; isRequired: ITextField["isRequired"]; }> = ({ name, type, isRequired }) => (
  <input id={name} className={`${styles.field__input} ${styles.field__label}`} type={type || "text"} {...(isRequired && { required: isRequired })} />
);

const TextField: FC<ITextField> = ({ children, icon, isRequired, label, name, type }) => {
  const rowClassName = icon ? `${styles.field__row} ${styles.field__row_offset_y}` : styles.field__row;
  const input = (<TextFieldInput {...{ name, type, isRequired }} />);

  return (
    <div className={styles.field}>
      {Boolean(label) && <label className={styles.field__label}>{label}</label>}
      <div className={rowClassName}>
        {icon ? (<><div className={styles.field__icon}>{icon}</div>{input}</>) : input}
        {children}
      </div>
    </div>
  )
};

export default TextField;
