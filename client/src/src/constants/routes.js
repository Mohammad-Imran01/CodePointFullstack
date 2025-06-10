import Login from "../components/Login";
import Signup from "../components/Signup";
import PageNotFound from "../components/PageNotFound";
import AppContainer from "../sections/AppContainer";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        path: "/", element: <AppContainer />
    },
    {
        path: "/login", element: <Login />
    },
    {
        path: "/signup", element: <Signup />

    },
    {
        path: "*", element: <PageNotFound />

    },
])

export default routes;
