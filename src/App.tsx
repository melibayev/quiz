import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/loader/Loader";
import Admin from "./pages/admin/Admin";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Results from "./pages/Results/Results";
import Test from "./pages/Test/Test";
import { RootState } from "./redux/store";

// Lazy-loaded components
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));


function App() {
const authValue = useSelector((state: RootState) => state.authorizationSetting.value);
authValue && localStorage.setItem('authorized', 'true')
const isAuthorized = localStorage.getItem('authorized') === 'true'
const isAdmin = localStorage.getItem('admin') === 'true'
  return (
<BrowserRouter>
      <Routes>
        <Route path="login" element={<Suspense fallback={<Loader />}><Login /></Suspense>} />
        <Route path="register" element={<Suspense fallback={<Loader />}><Register /></Suspense>} />
        {isAuthorized ? (
          <Route path="/">
            {isAdmin ? (
              // If user is an admin, show the Admin page by default
              <>
                <Route path="/" element={<Admin />} />
                <Route path="home" element={<Home />} />
                <Route path="test/:id" element={<Test />} />
                <Route path="results" element={<Results />} />
              </>
            ) : (
              // If user is not an admin, show the Home page by default
              <>
                <Route index element={<Home />} />
                <Route path="test/:id" element={<Test />} />
                <Route path="results" element={<Results />} />
              </>
            )}
          </Route>
        ) : (
          // If not authorized, redirect to login
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
