import { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

// local imports
import { TOKEN } from "../../const";
import { authorized, setToken } from "../../redux/authorizationSlice";
// design
import { Button } from "antd";
import styles from "./Login.module.scss";

// icons and images
import { BiShow, BiHide } from "react-icons/bi";
import LOGO from "../../assets/login-register/logo-no-background.png";
import BG from "../../assets/login-register/bg.jpg";
import loginValidation from "../../validation/loginValidation";
import { request } from "../../server/request";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState<boolean[]>([]);
  const [haveError, setHaveError] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (data: any) => {
    try {
      await loginValidation.validate(data);
      setHaveError(false);
      enterLoading(0);
      try {
        enterLoading(0);
        let res = await request.post("Auth/login", data);
        Cookies.set(TOKEN, res.data.token);
        dispatch(setToken(res.data.token));
        localStorage.setItem('admin', res.data.isAdmin)
        dispatch(authorized());
        navigate("/");
      } catch (error) {
        stopLoading(0);
        setHaveError(true);
        setError("Your account is not found. Check your username and password");
      }
    } catch (validationError: any) {
      stopLoading(0);
      setHaveError(true);
      setError(validationError.message);
    }
  };

  const enterLoading = (index: number): void => {
    setLoading((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };

  const stopLoading = (index: number): void => {
    setLoading((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  };
  return (
    <Fragment>
      <section id={styles.login}>
        <div className="container">
          <div className={styles.form}>
            <div className={styles["form-info"]}>
              <img src={LOGO} alt="logo" />
              <h1>Welcome Back, Knowledge Seeker!</h1>
              <p>Time to Challenge Yourself – Login</p>
              <form onSubmit={handleSubmit(submit)}>
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", { required: true })}
                />
                <div className={styles["password"]}>
                  <input
                    type={passwordShow ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  <div onClick={() => setPasswordShow(!passwordShow)}>
                    {passwordShow ? <BiShow /> : <BiHide />}
                  </div>
                </div>
                <Button
                  htmlType="submit"
                  loading={loading[0]}
                  className={styles["form-info-button"]}
                >
                  Sign in
                </Button>
              </form>
              <div className={styles["form-info-sign-up-message"]}>
                <p>Don't have an account?</p>
                <NavLink to={"/register"}>Sign up now</NavLink>
              </div>
              <div className={styles["form-info-error-message"]}>
                {haveError ? error : ""}
              </div>
              <div className={styles["form-info-credits"]}>© Quiz 2024</div>
            </div>
            <div className={styles["form-img"]}>
              <img src={BG} alt="" />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
