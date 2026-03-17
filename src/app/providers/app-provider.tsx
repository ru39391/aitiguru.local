import { Notification } from "@/entities/notification";
//import { ModalContainer } from "@/entities/modal";
import { RouterProvider } from "./";

const AppProvider = () => {
  return (
    <>
      <RouterProvider />
      <Notification />
      {/*
      <ModalContainer />
      */}
    </>
  );
};

export default AppProvider;
