import type { FC } from "react";
import type { IButton } from "../model/types";
import styles from './button.module.css';

const Button: FC<IButton> = ({ caption, type = "button" }) => <button className={styles.btn} type={type}>{caption}</button>;

export default Button;
