import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";

const Router = (props) => {
    const {
        messages,
        setMessages,
        comments,
        setComments,
        token,
        setToken,
    } = props;

    const router = createBrowserRouter([

        {
            path: "/login",
            element: <Login
                setToken={setToken}
            />,
            errorElement: <ErrorPage />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Router;