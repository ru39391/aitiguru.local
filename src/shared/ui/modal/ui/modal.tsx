import { type FC } from "react";
import { useModalStore } from "@/shared/store";
import { CloseIcon } from "@/shared/icons";
import styles from './modal.module.css';

const Modal: FC = () => {
  const { content, isOpen, close } = useModalStore();

  if(!isOpen) {
    return "";
  }

  return (
    <div className={styles.modal}>
      <button className={styles.modal__close} onClick={() => close()} type="button">
        <CloseIcon />
      </button>
      {content && <div className={styles.modal__wrapper}>{content}</div>}
    </div>
  );
};

export default Modal;
