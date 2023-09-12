import { Schema, model } from "mongoose";
import { IReview, ReviewDocument } from "../interfaces/review.interface";

// Create the schema
const ReviewSchema = new Schema<ReviewDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    reviewBody: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    isSpoiler:{
      type:Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ReviewModel = model<ReviewDocument>("Review", ReviewSchema);

export { ReviewModel, IReview };
