import { Modal } from "@/shared/ui/modal";
import { Notification } from "@/entities/notification";
import { RouterProvider } from "./";

const AppProvider = () => {
  return (
    <>
      <RouterProvider />
      <Notification />
      <Modal />
    </>
  );
};

export default AppProvider;
