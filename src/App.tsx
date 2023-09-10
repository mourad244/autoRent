import { useState, useEffect } from "react";
import { IUser } from "./types/user.type";
import { eventBus } from "./common/EventBus";
import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";
import * as AuthService from "./services/auth.service";
import { DirectionProvider } from "./context/DirectionContext";
import Header from "./common/Header";
import { NavbarDefault } from "./common/NavBar";
import Cars from "./components/cars/Cars";

function App() {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
    eventBus.on("logout", logOut);

    return () => {
      eventBus.remove("logout", logOut);
    };
  }, []);

  const openNav = () => {
    setIsNavOpen(true);
  };
  const closeNav = () => {
    setIsNavOpen(false);
  };
  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

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
