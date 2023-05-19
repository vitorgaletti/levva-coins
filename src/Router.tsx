import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NewAccount } from "./pages/NewAccount";

export function Router() {
  return (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="/new-account" element={<NewAccount />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
