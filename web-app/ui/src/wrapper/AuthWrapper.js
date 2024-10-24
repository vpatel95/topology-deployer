import { Navigate, Outlet } from "react-router-dom";
import {SessionStore} from "services/store";

export const AuthWrapper = () => {
  const user = SessionStore.getUser();

  return (
    user
      ? <Outlet />
      : <Navigate to={"/auth/login"} replace />
  );
};