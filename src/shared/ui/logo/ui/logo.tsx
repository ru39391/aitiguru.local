import type { FC } from "react";
import { LogoIcon } from "@/shared/icons";
import styles from './logo.module.css';

const Logo: FC = () => <div className={styles.logo}><LogoIcon /></div>;

export default Logo;
