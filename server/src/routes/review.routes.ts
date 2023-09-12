import { Router } from "express";
import {
  deleteReview,
  deleteReviews,
  getReview,
  getReviews,
  getReviewsForMovie,
  postReview,
  updateReview,
} from "../controllers/review.controllers";
import { checkjwt } from "../middlewares/session.middleware";

const router = Router();

router.get("/", getReviews);
router.get("/:id", getReview);
router.post("/", checkjwt, postReview);
router.delete("/", deleteReviews);
router.put("/:id", checkjwt, updateReview);
router.delete("/:id", checkjwt, deleteReview);
router.get("/movie/:movieId", getReviewsForMovie);

export { router };
