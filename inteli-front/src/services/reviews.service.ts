import axios from "axios";
import { Review } from "../types/Review.interfaces";
import { handleAxiosError } from "../utils/handleAxiosError";

export const getReviews = async (movieId: string): Promise<Review[]> => {
  try {
    const response = await axios.get<Review[]>(
      `http://localhost:3000/review/movie/${movieId}`
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
export const postReview = async (
  movieId: string,
  reviewBody: string
): Promise<Review> => {
  try {
    const token = localStorage.getItem("jwt");

    const sentimentAnalysis = await analyzeReview(reviewBody);
    const rating = sentimentAnalysis.rating;
    const response = await axios.post<Review>(
      `http://localhost:3000/review/`,
      {
        movieId,
        reviewBody,
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

const analyzeReview = async (text: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/analyze_sentiment`,
      {
        text,
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
