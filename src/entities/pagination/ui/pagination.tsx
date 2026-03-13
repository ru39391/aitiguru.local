import type { FC } from "react";
import { ArrowLeft, ArrowRight } from "@/shared/icons";
import type { IPagination } from "../model/types";
import styles from './pagination.module.css';

const Pagination: FC<IPagination> = ({ handleClick, isHidden, page, perPage, totalPages }) => {
  if(isHidden) {
    return "";
  }

  return (
    totalPages > 1
      ? <div className={styles.pagination}>
          {page > 1
            && <button
              className={styles.pagination__btn}
              onClick={() => handleClick({ page: page - 1, perPage })}
              type="button"
            >
              <ArrowLeft />
            </button>
          }
          <div className={styles.pagination__wrapper}>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index.toString()}
                className={page === index + 1 ? `${styles.pagination__item} ${styles.pagination__item_current}` : styles.pagination__item}
                onClick={() => handleClick({ page: index + 1, perPage })}
                type="button"
              >
                {index + 1}
              </button>
            ))}
          </div>
          {page !== totalPages
            && <button
                className={styles.pagination__btn}
                onClick={() => handleClick({ page: page + 1, perPage })}
                type="button"
              >
                <ArrowRight />
              </button>
          }
        </div>
      : ""
  )
};

export default Pagination;
