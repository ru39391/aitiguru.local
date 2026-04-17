import type { FC } from "react";
import { CheckedIcon } from "@/shared/icons";
import type { ICheckbox } from "../model/types";
import styles from './checkbox.module.css';

const Checkbox: FC<ICheckbox> = ({ name, caption }) => (
  <div className={styles.checkbox}>
    <input id={name} name={name} className={styles.checkbox__item} type="checkbox" />
    <label htmlFor={name} className={styles.checkbox__caption}>
      <span className={styles.checkbox__toggler}><CheckedIcon /></span>
      {caption}
    </label>
  </div>
);

export default Checkbox;
