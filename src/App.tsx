import "./App.css";
import AppRoutes from "./AppRoutes";

import { BrowserRouter } from "react-router-dom";
import { LoaderProvider } from "./context/loaderContext";
import { Loader } from "./shared/components/loader/loader";
import Header from "./blocks/header/header";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Footer from "./blocks/footer/footers";
import Neon from "./blocks/neon/neon";

function App() {
  return (
    <GoogleOAuthProvider clientId="64531276471-rsgodsdm2879qssn0kvo3pkmtni0q1d5.apps.googleusercontent.com">
      <AuthProvider>
        <LoaderProvider>
          <BrowserRouter>
            <div className="main">
              <Neon className="left-neon" />
              <Loader />
              <Header />
              <AppRoutes />
              <Footer />
              <Neon className="right-neon"/>
            </div>
          </BrowserRouter>
        </LoaderProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
