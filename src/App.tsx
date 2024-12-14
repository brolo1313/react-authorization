import "./App.css";
import AppRoutes from "./AppRoutes";

import { BrowserRouter } from "react-router-dom";
import { LoaderProvider } from "./shared/components/loader/loaderContext";
import { Loader } from "./shared/components/loader/loader";
import Header from "./pages/header/header";
import { AuthProvider } from "./pages/auth/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <LoaderProvider>
        <Header />
        <BrowserRouter>
          <div className="main">
            <Loader />
            <AppRoutes />
          </div>
        </BrowserRouter>
      </LoaderProvider>
    </AuthProvider>
  );
}

export default App;
