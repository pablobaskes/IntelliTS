import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import {
  deleteAllReviews,
  deleteReviewById,
  getAllReviews,
  getReviewById,
  getReviewsByMovieId,
  insertReview,
  updateReviewById,
} from "../services/review.service";
import { ReqExtended } from "../interfaces/ReqExtended.interface";

const postReview = async (req: any, res: Response) => {
  try {
    const { body } = req;
    body.userId = req.user.id;
    const responseReview = await insertReview(body);
    res.send(responseReview);
  } catch (e) {
    handleHttp(res, "ERROR_CREATE_REVIEW", e);
  }
};

const deleteReviews = async (req: Request, res: Response): Promise<any> => {
  try {
    const deleteResult = await deleteAllReviews();
    res.send(deleteResult);
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_REVIEWS", e);
  }
};

const getReviews = async (req: ReqExtended, res: Response) => {
  try {
    const reviews = await getAllReviews();
    res.send({ reviews, user: req.user });
  } catch (e) {
    handleHttp(res, "ERROR_GET_REVIEWS", e);
  }
};

const getReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);
    res.send(review);
  } catch (e) {
    handleHttp(res, "ERROR_GET_REVIEW", e);
  }
};

const updateReview = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const review = await getReviewById(id);

    if (!review) {
      res.status(404).send("Review not found");
      return;
    }

    if (review.userId.toString() !== req.user.id) {
      res.status(403).send("Forbidden");
      return;
    }

    const updatedReview = await updateReviewById(id, body);
    res.send(updatedReview);
  } catch (e) {
    handleHttp(res, "ERROR_UPDATE_REVIEW", e);
  }
};

const deleteReview = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);

    if (!review) {
      res.status(404).send("Review not found");
      return;
    }

    if (review.userId.toString() !== req.user.id) {
      res.status(403).send("Forbidden");
      return;
    }

    const deleteResult = await deleteReviewById(id);
    res.send(deleteResult);
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_REVIEW", e);
  }
};

const getReviewsForMovie = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const reviews = await getReviewsByMovieId(movieId);
    res.send(reviews);
  } catch (e) {
    handleHttp(res, "ERROR_GET_REVIEWS_FOR_MOVIE", e);
  }
};

export {
  postReview,
  deleteReviews,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
  getReviewsForMovie,
};
