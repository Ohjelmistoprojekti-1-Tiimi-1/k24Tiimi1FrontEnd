import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './components/Error.jsx';
import About from './components/About.jsx';
import Products from './components/Products.jsx';
import FrontPage from './components/FrontPage.jsx';
import Reservations from './components/Reservations.jsx';
import Login from './components/Login.jsx';
import Manufacturers from './components/Manufacturers.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainApp />,
        errorElement: <Error />,
        children: [
            {
                element: <FrontPage />,
                index: true
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "reservations",
                element: <Reservations />,
            },
            {
                path: "products",
                element: <Products />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "manufacturers",
                element: <Manufacturers />
            }

        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
