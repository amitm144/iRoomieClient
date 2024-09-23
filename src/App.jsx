import React, { useState, useEffect, createContext } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import Filter from "./Pages/Prefrences/Filter";
import RegistrationProcess from "./Pages/Register/registerProcess";
import { auth } from "@/lib/http.js";
import CardsList from "./Pages/Discover/cardsList";
import MyProfile from "./Pages/MyProfile/myProfile";
import SidebarDemo from "./Pages/Nav/sidebar";
import Authentication from "./Pages/Auth/authentication";
import PreferencesPage from "./Pages/Prefrences/preferencesPage";
import MyActivity from "./Pages/Activity/myActivity";
import Chat from "./Pages/Chat/chat";
import SettingsPage from "./Pages/Setting/settingPage";
export const UserContext = createContext(null);

const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return user ? children : null;
};

const ProfileRoute = () => {
  return <MyProfile />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <SidebarDemo />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/discover" replace />,
      },
      {
        path: "discover",
        element: <CardsList />,
      },
      {
        path: "preferences",
        element: <PreferencesPage />,
      },
      {
        path: "activity",
        element:  <MyActivity/>,
      },
      {
        path: "chat",
        element:  <Chat/>,
      },
      {
        path: "settings",
        element: <SettingsPage/>,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfileRoute />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Authentication />,
  },
  {
    path: "/complete-signup",
    element: <RegistrationProcess />,
  },

  
]);

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        // const userData = await auth.testRoommate();
        // const userData = await auth.testApartment();
        const userData = await auth.currentUser();

        setUser(userData);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
