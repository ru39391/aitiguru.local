import type { FC, JSX } from "react";
import { CheckedIcon, CloseIcon } from "@/shared/icons";
import { useNotificationStore, type TNotification } from "@/shared/store";
import styles from './notification.module.css';

const Notification: FC = () => {
  const { data: notifications, remove } = useNotificationStore();

  if (!notifications.length) {
    return "";
  }

  return notifications.map(({ id, type, title, desc }: TNotification, index: number) => {
    const classNameMod = `notification__wrapper_type_${type}`
    const icons: Record<Required<TNotification>["type"], JSX.Element> = {
      error: <CloseIcon />,
      success: <CheckedIcon />,
      warning: <>!</>
    }

    return (
      <div
        key={id.toString()}
        className={styles.notification}
        style={{ transform: `translateY(calc(${index * 16}px + ${index * 100}%))` }}
      >
        <div className={type ? `${styles.notification__wrapper} ${styles[classNameMod]}` : styles.notification__wrapper}>
          <div className={styles.notification__aside}>
            <div className={styles.notification__icon}>{type ? icons[type] : "i"}</div>
          </div>
          <div className={styles.notification__content}>
            <div className={styles.notification__title}>{title}</div>
            {desc && <div className={styles.notification__desc}>{desc}</div>}
          </div>
          <button className={styles.notification__close} type="button" onClick={() => remove(id)}>
            <CloseIcon />
          </button>
        </div>
      </div>
    );
  });
};

export default Notification;
