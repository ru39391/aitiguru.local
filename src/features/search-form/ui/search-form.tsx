import type { FC } from "react";
import { SearchIcon } from "@/shared/icons";
import styles from './search-form.module.css';

const SearchForm: FC = () => (
  <form className={styles.form}>
    <button className={styles.form__button} type="button"><SearchIcon /></button>
    <input className={styles.form__field} placeholder="Найти" type="text" />
  </form>
);

export default SearchForm;
