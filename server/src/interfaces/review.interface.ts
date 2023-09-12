import { Schema } from "mongoose";

export interface IReview {
    userId: Schema.Types.ObjectId,
    movieId: string,
    reviewBody: string,
    rating: number,
    isSpoiler: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export interface ReviewDocument extends IReview, Document {}