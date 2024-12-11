import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
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
            element={<Dashboard />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
