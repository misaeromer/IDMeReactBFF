# React + ID.Me Hosted Login Example

This example shows how to use ID.ME OAuth/OIDC flows and [React Router](https://github.com/ReactTraining/react-router) to login a user to a React application. The login is achieved through a redirect model where the user is redirect to the ID.Me Hosted Login Page. The archietecture of this sample application is Authroization Code Flow + PCKE in the BFF(backend for frontend) pattern.

## Run the Example

To run this application, install its dependencies:

```
npm install
```

start the app

```
npm start
```

Navigate to http://localhost:3000 in your browser.

If you see a home page that prompts you to login, then things are working! Clicking the **Log in** button will redirect you to the ID.Me hosted sign-in page.
