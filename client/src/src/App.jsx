import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routes from "./constants/routes";
import ThemeButton from "./components/ThemeButton";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <ThemeButton />

      <Routes>
        {routes.map(
          ({ path, component: Component, protected: isProtected }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  loggedIn ? (
                    <Component />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                ) : path === "/login" || path === "/signup" ? (
                  loggedIn ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Component loginHandler={setLoggedIn} />
                  )
                ) : (
                  <Component />
                )
              }
            />
          )
        )}

        {/* Redirect all unknown paths to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
