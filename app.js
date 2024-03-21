import React from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./src/components/Navbar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./src/Contexts/AuthContext";
import Login from "./src/components/Login";
import { Toaster } from "react-hot-toast";
import Signup from "./src/components/Signup";
import Error from "./src/components/Error";
import Home from "./src/components/Home";
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Theator from "./src/components/Theator";
import Ytplayer from "./src/components/Ytplayer";
import Footer from "./src/components/Footer";
import Temp from "./src/components/Temp";
import { AppContextProvider } from "./src/Contexts/AppContext";

const Applayout = () => {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <React.Fragment>
          <NavBar />
          <Outlet />
          {/* <Temp /> */}
          <Footer />
          <Toaster />
        </React.Fragment>
      </AppContextProvider>
    </AuthContextProvider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/theator",
        element: <Theator />,
      },
      {
        path: "video/:id/:room",
        element: <Ytplayer />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
