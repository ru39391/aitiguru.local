import type { FC } from "react";
import { ArrowLeft, ArrowRight } from "@/shared/icons";
import styles from './pagination.module.css';

const Pagination: FC = () => (
  <div className={styles.pagination}>
    <ArrowLeft />
    <ArrowRight />
  </div>
);

export default Pagination;
