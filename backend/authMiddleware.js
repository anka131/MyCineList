
import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;
  
  console.log('Received headers:', req.headers); // Debug headers
  console.log('Auth header:', authHeader); // Specific header check

  if (!authHeader?.startsWith('Bearer ')) {
    console.error('Invalid auth format');
    return res.status(401).json({ message: "Invalid authorization format" });
  }

  const token = authHeader.split(' ')[1];
  
  if (!token || token === 'undefined') {
    console.error('Empty token received');
    return res.status(401).json({ message: "No token provided" });
  }

  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    // Debug logs
    console.log("Decoded token:", decoded);
    console.log("Verification secret:", process.env.SECRET_KEY ? "Exists" : "Missing");
    
    req.user = {
      id: decoded.userId, // Must match payload field
      ...decoded
    };
    
    next();
  } catch (err) {
    console.error("Token verification failed:", {
      error: err.message,
      token: token.slice(0, 20) + "..." // Log partial token
    });
    res.status(401).json({ 
      message: "Invalid token",
      debug: err.message 
    });
  }
};

export const checkTokenExpiry = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) return next(); // Continue to authMiddleware for rejection

  try {
    const decoded = jwt.decode(token);
    if (decoded.exp < Date.now() / 1000) {
      req.tokenExpired = true;
    }
  } catch(error){
    console.error("Error decoding token:", error);
  }
  
  next();
};