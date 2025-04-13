import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import * as Sentry from "@sentry/react";

import { store, persistor } from "./store";
import "./index.css";
import routes from "./routes";
import Layout from "./components/Layout";
import ErrorPage404 from "./pages/ErrorPage404";

Sentry.init({
  dsn: "https://ca3af9d71a3d67f7399f07c150d50725@o878041.ingest.sentry.io/4505722796965888",
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage404 />,
    children: routes,
  },
]);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
