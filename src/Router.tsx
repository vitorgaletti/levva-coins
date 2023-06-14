import {
  Navigate,
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { NewAccount } from './pages/NewAccount';
import { ProtectedRoutes } from './ProtectedRoutes';

import { validateToken } from './helpers/validateToken';

const isAuthenticated = validateToken();

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route element={isAuthenticated ? <Navigate to="/home" /> : <Outlet />}>
        <Route index path="/login" element={<Login />} />
        <Route path="/new-account" element={<NewAccount />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Route>,
  ),
);
