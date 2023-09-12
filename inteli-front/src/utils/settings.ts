import dotenv from 'dotenv';

dotenv.config();

export const BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = process.env.REACT_APP_API_KEY;
export const IMAGE_BASE_URLw92 = "https://image.tmdb.org/t/p/w92";
export const IMAGE_BASE_URLw154 = "https://image.tmdb.org/t/p/w154";
export const IMAGE_BASE_URLw185 = "https://image.tmdb.org/t/p/w185";
export const IMAGE_BASE_URLw342 = "https://image.tmdb.org/t/p/w342";
export const IMAGE_BASE_URLw500 = "https://image.tmdb.org/t/p/w500";
export const IMAGE_BASE_URLw780 = "https://image.tmdb.org/t/p/w780";
export const IMAGE_BASE_URLoriginal = "https://image.tmdb.org/t/p/original";
export const LOCAL_BASE_URL = "http://localhost:3000";
export const USER_URL = `${LOCAL_BASE_URL}/user`;
export const LIST_URL = `${LOCAL_BASE_URL}/list`;
export const LIST_ITEM_URL = `${LOCAL_BASE_URL}/listItem`;

export const TMDB_TOKEN = process.env.REACT_APP_TMDB_TOKEN;
