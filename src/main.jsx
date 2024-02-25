import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./firebas_condiq.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Regestration from "./pages/Regestration.jsx";
import Login from "./pages/Login.jsx";
import Forget from "./pages/Forget.jsx";
import Home from "./pages/Home.jsx";
import "./components/Sidevar.jsx";
import "./components/input.jsx";
import "./components/Group.jsx";
import "./components/Friendrequest.jsx";
import { store } from "./store";
import { Provider } from "react-redux";
import Message from "./pages/Message.jsx";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <div>Hello world!</div>,
  // },
  {
    path: "/Regestration",
    element: <Regestration />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Forget",
    element: <Forget />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Message",
    element: <Message />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
