import { Strategy as OAuth2Strategy } from "passport-oauth2";
import jose from "node-jose";
import fs from "fs/promises";

export const configurePassport = async (passport) => {
  try {
    const privateKeyPem = await fs.readFile("private_key.pem", "utf8");
    const kid = (await fs.readFile("key_id.txt", "utf8")).trim();

    // Create a keystore and add the private key
    const keystore = jose.JWK.createKeyStore();
    await keystore.add(privateKeyPem, "pem", { kid });

    passport.use(
      new OAuth2Strategy(
        {
          authorizationURL: "https://api.idmelabs.com/oauth/authorize",
          tokenURL: "https://api.idmelabs.com/oauth/token",
          clientID: process.env.IDME_CLIENT_ID,
          clientSecret: process.env.IDME_CLIENT_SECRET,
          callbackURL: "http://localhost:8000/auth/idme/callback",
          issuer: "https://api.idmelabs.com/oidc",
          scope: ["openid", "http://idmanagement.gov/ns/assurance/ial/2/aal/2"],
        },
        async (accessToken, refreshToken, params, profile, done) => {
          try {
            const result = await jose.JWE.createDecrypt(keystore).decrypt(
              params.id_token
            );
            const decodedPayload = jose.util.base64url.decode(
              result.payload.toString().split(".")[1]
            );
            const decodedToken = JSON.parse(decodedPayload.toString());

            return done(null, decodedToken);
          } catch (error) {
            console.error("Error decrypting or parsing JWE:", error);
            return done(error);
          }
        }
      )
    );

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
  } catch (error) {
    console.error("Error configuring Passport.js:", error);
    process.exit(1);
  }
};
