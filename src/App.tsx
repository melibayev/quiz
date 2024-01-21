import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/loader/Loader";
import NotFound from "./pages/NotFound/NotFound";
import { RootState } from "./redux/store";

// Lazy-loaded components
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Home = lazy(() => import("./pages/Home/Home"));
const Test = lazy(() => import("./pages/Test/Test"));
const Results = lazy(() => import("./pages/Results/Results"));
const Admin = lazy(() => import("./pages/admin/Admin"));


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
                <Route path="/" element={<Suspense fallback={<Loader />}><Admin /></Suspense>} />
                <Route path="home" element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
                <Route path="test/:id" element={<Suspense fallback={<Loader />}><Test /></Suspense>} />
                <Route path="results" element={<Suspense fallback={<Loader />}><Results /></Suspense>} />
              </>
            ) : (
              // If user is not an admin, show the Home page by default
              <>
                <Route index element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
                <Route path="test/:id" element={<Suspense fallback={<Loader />}><Test /></Suspense>} />
                <Route path="results" element={<Suspense fallback={<Loader />}><Results /></Suspense>} />
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
