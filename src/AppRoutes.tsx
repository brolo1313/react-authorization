// AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/components/Login";
import Registration from "./pages/auth/components/Registration";
import ResetPassword from "./pages/auth/components/ResetPassword";
import PrivateRoute from "./shared/helpers/privateRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import { useAuth } from "./context/AuthContext";
import { IUserSettings } from "./shared/models/auth";

const AppRoutes = () => {
  const { userSettings } = useAuth();
  const redirectFromAuthRoutes = (
    userSettings: IUserSettings | undefined,
    finiteElement: JSX.Element
  ) => {
    return userSettings?.accessToken ? (
      <Navigate to="/dashboard" />
    ) : (
      finiteElement
    );
  };
  return (
    <Routes>
      <Route
        path="/login"
        element={redirectFromAuthRoutes(userSettings, <Login />)}
      />
      <Route
        path="/registration"
        element={redirectFromAuthRoutes(userSettings, <Registration />)}
      />
      <Route
        path="/reset-password"
        element={redirectFromAuthRoutes(userSettings, <ResetPassword />)}
      />
      <Route
        path="/"
        element={<Navigate to="/login" />}
      />
      <Route
        path="/dashboard"
        element={<PrivateRoute element={<Dashboard />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
