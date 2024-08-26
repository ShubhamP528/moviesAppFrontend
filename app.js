import React, { useEffect } from "react";
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
import TermsAndConditions from "./src/components/TermAndCondition";
import PrivacyAndPolicy from "./src/components/PrivacyPolicy";
import PrivacyPolicy from "./src/components/PrivacyPolicy";

const Applayout = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/");
        console.log("Data fetched successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 10 minutes
    const interval = setInterval(fetchData, 2 * 60 * 1000);

    // Cleanup function to clear interval
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once

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
        path: "/term-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
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
