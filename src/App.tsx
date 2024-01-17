import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* {authenticated ? (
            <Route index element={<Home />} />
        ) : (
          <Route
            path="/*"
            element={<Navigate to="/login" />}
          />
        )} */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
