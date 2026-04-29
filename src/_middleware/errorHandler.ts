// src/_middleware/errorHandler.ts
import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: any, // Changed to 'any' for better compatibility with Express error objects
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  
  if (typeof err === 'string') {
    // Custom application error (like 'User not found' from your service)
    const is404 = err.toLowerCase().endsWith('not found');
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    // JWT authentication error (if you're using express-jwt)
    return res.status(401).json({ message: 'Invalid Token' });
  }

  // Default to 500 server error
  return res.status(500).json({ message: err.message || 'Internal server error' });
}