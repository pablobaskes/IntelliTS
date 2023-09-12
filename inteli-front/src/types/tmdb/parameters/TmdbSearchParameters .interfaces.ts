export interface TmdbSearchParameters {
  query: string; // Requerido
  include_adult?: boolean;
  language?: string;
  primary_release_year?: string;
  page?: number;
  region?: string;
  year?: string;
  api_key?: string;
}
export type Time_window = "day" | "week";
