
import { useEffect, type FC } from "react";
import { Button, Card, Loader } from "@/shared/ui";
import { LogoutIcon } from "@/shared/icons";
import { useAuthStore } from "@/entities/auth";
import { useModalStore } from "@/shared/store";
import styles from './logout-btn.module.css';

const LogoutConfirmModal: FC = () => {
  const { close } = useModalStore();
  const { isAuth, isLoading, logout } = useAuthStore();

  useEffect(() => {
    if(!isAuth) close();
  }, [isAuth]);

  return (
    <Card
      {...{
        title: "Выход",
        subtitle: "Вы действительно хотите выйти из аккаунта?",
        type: ["md"]
      }}
    >
      <div className={styles.actions}>
        <Button
          handleClick={() => logout()}
          isDisabled={isLoading}
          style={isLoading ? "plain" : "row"}
        >
          {isLoading ? <Loader isVisible={isLoading} size="xs" /> : "Да"}
        </Button>
        <Button
          handleClick={() => close()}
          isDisabled={isLoading}
          style="plain"
        >
          Нет
        </Button>
      </div>
    </Card>
  )
};

const LogoutBtn: FC = () => {
  const { open } = useModalStore();

  return (
    <Button
      handleClick={() => open({ content: <LogoutConfirmModal /> })}
      style="unstyled"
    >
      <LogoutIcon />
    </Button>
  )
};

export default LogoutBtn;
