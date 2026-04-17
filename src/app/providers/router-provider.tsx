import { BrowserRouter } from "react-router";
import AppRouter from "../router/app-router";

const RouterProvider = () => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);

export default RouterProvider;
