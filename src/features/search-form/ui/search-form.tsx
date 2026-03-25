import { type FC } from "react";
import { SearchIcon } from "@/shared/icons";
import { useSearchForm } from "../hooks/use-search-form";
import styles from './search-form.module.css';

const SearchForm: FC = () => {
  const { handleChange, searchValue } = useSearchForm();

  return (
    <form className={styles.form}>
      <button className={styles.form__button} type="button"><SearchIcon /></button>
      <input
        className={styles.form__field}
        value={searchValue}
        onChange={handleChange}
        placeholder="Найти"
        type="text"
      />
    </form>
  )
};

export default SearchForm;
