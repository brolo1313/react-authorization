import "./App.css";
import AppRoutes from "./AppRoutes";

import { BrowserRouter } from "react-router-dom";
import { LoaderProvider } from "./context/loaderContext";
import { Loader } from "./shared/components/loader/loader";
import Header from "./blocks/header/header";
import { AuthProvider } from "./context/AuthContext";

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
