import mongoose from "mongoose";

const savedMovieSchema = new mongoose.Schema(
  {
    imdbID: { type: String, required: true },
    title:   { type: String, required: true },
    poster:  { type: String },
    runtime: {type: Number},
    userRating:{type: Number},
    imdbRating: {type: Number},
    addedAt: { type: Date,   default: Date.now },
  },
  { _id: false }
);


const userSchema = new mongoose.Schema({
  username:     { type: String, required: true, unique: true },
  email:        { type: String, required: true, unique: true },
  password:     { type: String, required: true },       
  refreshToken: { type: String },
  refreshTokenExpires: { type: Date },
  savedMovies:  [savedMovieSchema],                       
});

export const User = mongoose.model('User', userSchema);