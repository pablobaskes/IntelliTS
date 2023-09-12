import axios, { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
export const handleAxiosError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error("Error fetching data:", axiosError.message);
  } else {
    console.error("An unknown error occurred:", error);
  }
};

export const isTokenExpired = () => {
  const token = localStorage.getItem("jwt");
  if (!token) return true;

  const decodedToken: any = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Convert to seconds

  return decodedToken.exp < currentTime;
}

