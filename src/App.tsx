import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./shared/helpers/privateRoute";
import { LoaderProvider } from "./shared/components/loader/loaderContext";
import { Loader } from "./shared/components/loader/loader";

function App() {
  return (
    <LoaderProvider>
      <Loader />
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

  );
}

export default App;
