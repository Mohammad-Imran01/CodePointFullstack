import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store"; // your redux store

import "./index.css";

import AppContainer from "./sections/AppContainer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";
import ThemeButton from "./components/ThemeButton";

const routes = createBrowserRouter([
  { path: "/", element: <AppContainer /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "*", element: <PageNotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeButton />
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>
);
