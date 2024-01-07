import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import Edit from "../pages/Edit";
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
            path: '/',
            element: <Posts
                messages={messages}
                setMessages={setMessages}
                comments={comments}
                setComments={setComments}
            />,
            errorElement: <ErrorPage />
        },

        {
            path: "/login",
            element: <Login
                setToken={setToken}
            />,
            errorElement: <ErrorPage />,
        },

        {
            path: '/post/:id',
            element: <Edit
                messages={messages}
                setMessages={setMessages}
                comments={comments}
                setComments={setComments}
            />,
            errorElement: <ErrorPage />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Router;