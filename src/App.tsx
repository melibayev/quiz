import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Results from "./pages/Results/Results";
import Test from "./pages/Test/Test";
import { RootState } from "./redux/store";


function App() {
const authValue = useSelector((state: RootState) => state.authorizationSetting.value);
console.log(authValue);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {authValue ? (
          <Route path="/">
            <Route path="/" element={<Home />} />
            <Route path="test/:id" element={<Test />}/>
            <Route path="results" element={<Results />}/>
            <Route path="admin" element={<Admin />}/>
          </Route>
        ) : (
          <Route path="/" element={<Navigate to="/login" />}
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
