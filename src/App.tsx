import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import * as AuthService from "./services/auth.service";

import Header from "./common/Header";
import Cars from "./components/cars/Cars";
import LoginForm from "./components/LoginForm";

import { IUser } from "./types/user.type";
import { eventBus } from "./common/EventBus";
import { NavbarDefault } from "./common/NavBar";
import { DirectionProvider } from "./context/DirectionContext";

function App() {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
    eventBus.on("logout", logOut);

    return () => {
      eventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };
  if (loading) return null;
  if (!currentUser)
    return (
      <DirectionProvider>
        <LoginForm />
      </DirectionProvider>
    );
  return (
    <DirectionProvider>
      <div className="flex flex-col items-stretch min-w-max ">
        <Header />
        <NavbarDefault />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/cars" element={<Cars />} />
        </Routes>
      </div>
    </DirectionProvider>
  );
}

export default App;
