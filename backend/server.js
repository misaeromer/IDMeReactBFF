import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import { configurePassport } from "./passportConfig.js"; // Separate file for Passport config
import { setupRoutes } from "./routes.js"; // Separate file for routes

const app = express();
const PORT = process.env.PORT || 8000;

// Validate necessary environment variables
const requiredEnvVars = [
  "SESSION_SECRET",
  "IDME_CLIENT_ID",
  "IDME_CLIENT_SECRET",
];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

// Setup session management
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-session-secret", // Use a strong secret in production
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set `secure` to false in development (HTTP)
      httpOnly: true, // Prevent client-side JS access to the cookie
      sameSite: "lax", // Protect against CSRF attacks
    },
  })
);

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json()); // For parsing JSON bodies
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport with the ID.me strategy
configurePassport(passport);

// Setup routes (e.g., /login, /callback, /auth-check)
setupRoutes(app);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
