export interface Review {
  _id: string;
  createdAt: Date;
  isSpoiler: boolean;
  movieId: string;
  rating: number;
  reviewBody: string;
  updatedAt: Date;
  userId: string;
}
