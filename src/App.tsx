import { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [count, setCount] = useState(0);

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
