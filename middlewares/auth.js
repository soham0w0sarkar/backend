import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";

export const isAuthentiated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Please Login!!!", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  next();
});

export const isAdmin = (req, res, next) => {
  const role = req.user.role;

  if (role !== "admin")
    return next(
      new ErrorHandler("Only Admin accounts can access this feature!!", 409)
    );

  next();
};

export const isSubsciber = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.subscription.status !== "active")
    return next(
      new ErrorHandler("Only Subcribers can Access this course!!", 409)
    );

  next();
};
