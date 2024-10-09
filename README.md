# IDMeReactBFF

## Architecture

React Frontend (client) + Node Backend (server) with the BFF pattern

## PCKE vs. BFF

### PKCE (Proof Key for Code Exchange) Flow:

In the PKCE flow:

- The frontend (client-side) communicates directly with the authorization server (e.g., ID.me) to handle the OAuth 2.0 flow.
- After successful authentication, the client receives the authorization code and uses it to exchange for access tokens, ID tokens, and potentially refresh tokens directly in the browser.
- Tokens are stored in the frontend (e.g., browser storage like localStorage or sessionStorage), which can be vulnerable to Cross-Site Scripting (XSS) attacks.

### BFF Model:

In the BFF (Backend for Frontend) model:

- The frontend does not directly interact with the authorization server (e.g., ID.me). Instead, the frontend simply redirects the user to the backend (BFF), which acts as an intermediary.
- The backend handles the OAuth 2.0 flow (including exchanging the authorization code for tokens) and stores the tokens securely on the server.
- The backend issues a session ID to the frontend, stored in a secure, HTTP-only cookie. The frontend does not have direct access to any sensitive tokens.
