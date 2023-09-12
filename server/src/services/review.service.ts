import { ReviewDocument } from "../interfaces/review.interface";
import { ReviewModel } from "../models/review.model";

const insertReview = async (review: ReviewDocument) => {
  const newReview = await ReviewModel.create(review);
  return newReview;
};

const deleteAllReviews = async () => {
  const deleteResult = await ReviewModel.deleteMany({});
  return deleteResult;
};

const getAllReviews = async () => {
  const reviews = await ReviewModel.find({});
  return reviews;
};

const getReviewById = async (id: string) => {
  const review = await ReviewModel.findById(id);
  return review;
};

const updateReviewById = async (id: string, reviewData: ReviewDocument) => {
  const updatedReview = await ReviewModel.findByIdAndUpdate(id, reviewData, {
    new: true,
  });
  return updatedReview;
};

const deleteReviewById = async (id: string) => {
  const deleteResult = await ReviewModel.findByIdAndDelete(id);
  return deleteResult;
};

const getReviewsByMovieId = async (movieId: string) => {
  const reviews = await ReviewModel.find({ movieId: movieId });
  return reviews;
};


export {
  insertReview,
  deleteAllReviews,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  getReviewsByMovieId
};
