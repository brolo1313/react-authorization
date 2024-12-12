import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Registration from "./pages/auth/components/Registration";
import Login from "./pages/auth/components/Login";
import ResetPassword from "./pages/auth/components/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./shared/helpers/privateRoute";
import { LoaderProvider } from "./shared/components/loader/loaderContext";
import { Loader } from "./shared/components/loader/loader";
import Header from "./pages/header/header";
import { AuthProvider } from "./pages/auth/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <LoaderProvider>
        <Loader />
        <Header />
        <BrowserRouter>
          <div className="main">
            <Routes>
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/registration"
                element={<Registration />}
              />
              <Route
                path="/reset-password"
                element={<ResetPassword />}
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
          </div>
        </BrowserRouter>
      </LoaderProvider>
    </AuthProvider>


  );
}

export default App;
