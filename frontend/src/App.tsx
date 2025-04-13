// src/App.tsx
import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App(): JSX.Element {
  const element = useRoutes(routes);

  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      {element}
    </Suspense>
  );
}

export default App;
