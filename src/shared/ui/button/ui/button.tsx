import type { FC } from "react";
import type { IButton } from "../model/types";
import styles from './button.module.css';

const Button: FC<IButton> = ({ caption }) => <button className={styles.btn} type="button">{caption}</button>;

export default Button;
