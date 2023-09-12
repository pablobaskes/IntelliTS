import { ReactNode } from "react";

export interface AuthenticatedRouteProps {
  children: ReactNode;
}
export interface IAuthContext {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface IProps {
  children: ReactNode;
}
