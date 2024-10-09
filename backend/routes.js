import passport from "passport";
export const setupRoutes = (app) => {
  // Route to check if the user is authenticated
  app.get("/auth-check", (req, res) => {
    if (req.isAuthenticated()) {
      res.json({
        isAuthenticated: true,
        user: req.user,
      });
    } else {
      res.status(401).json({ isAuthenticated: false });
    }
  });

  // Initiate the OAuth 2.0 login flow with ID.me
  app.get("/auth/idme", passport.authenticate("oauth2"));

  // Callback route after ID.me authenticates the user
  app.get(
    "/auth/idme/callback",
    passport.authenticate("oauth2", {
      failureRedirect: "/", // Redirect on failure
    }),
    (req, res) => {
      // Log the user authentication
      console.log("User authenticated:", req.user);

      // After successful login, redirect to the frontend
      res.redirect("http://localhost:3000/");
    }
  );

  // Route to log out the user and clear session
  /**
   * When req.logout() is called, Passport.js removes the req.user object from the session.
   * If the session is being persisted (e.g., using express-session), the session data on the server is cleared,
   *  and the session ID stored in the cookie is no longer valid.
   **/
  app.get("/logout", (req, res) => {
    req.logout(() => {
      res.json({ success: true, message: "Logged out successfully" });
    });
  });

  // Test route to return authenticated user profile
  app.get("/api/user", (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });
};
