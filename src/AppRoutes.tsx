// AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/components/Login";
import Registration from "./pages/auth/components/Registration";
import ResetPassword from "./pages/auth/components/ResetPassword";
import PrivateRoute from "./shared/helpers/privateRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import { useAuth } from "./context/AuthContext";
import { redirectFromAuthRoutes } from "./shared/helpers/redirectUtils";

const AppRoutes = () => {
  const { userSettings } = useAuth();

  const routes = [
    {
      path: "/login",
      element: redirectFromAuthRoutes(userSettings, <Login />),
    },
    {
      path: "/registration",
      element: redirectFromAuthRoutes(userSettings, <Registration />),
    },
    {
      path: "/reset-password",
      element: redirectFromAuthRoutes(userSettings, <ResetPassword />),
    },
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/dashboard",
      element: <PrivateRoute element={<Dashboard />} />,
    },
  ];

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
