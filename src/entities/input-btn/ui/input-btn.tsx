import type { FC } from "react";
import type { IInputBtn } from "../model/types";
import styles from './input-btn.module.css';

const InputBtn: FC<IInputBtn> = ({ children, handleClick }) => (
  <button onClick={handleClick} className={styles.btn} type="button">{children}</button>
);

export default InputBtn;
