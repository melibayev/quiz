import { BiShow, BiHide } from "react-icons/bi";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import styles from './Register.module.scss'

import LOGO from '../../assets/login-register/logo-no-background.png'
import BG from '../../assets/login-register/bg.jpg'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
const {
    register, 
    handleSubmit,
} = useForm()
const [ passwordShow, setPasswordShow ] = useState(false)
const [loading, setLoading] = useState([]);
const [ haveError, setHaveError ] = useState(false)
const [ error, setError ] = useState('')
const navigate = useNavigate()
// const submit = async (data) => {
//     try {
//       await registerValidation.validate(data);
//       setHaveError(false);
//       enterLoading(0)
  
//       try {
//         enterLoading(0)
//         let res = await request.post('Auth/register', data);
//         toast.success('Successfully authorized', {
//             position: toast.POSITION.BOTTOM_RIGHT,
//             autoClose: 3000, 
//         });
//         res.status === 200 && setTimeout(() => {
//             navigate('/login');
//         }, 3400);
//         console.log(res);
//       } catch (error) {
//         stopLoading(0)
//         setHaveError(true);
//         setError('Username has already taken.');
//       }
//     } catch (validationError) {
//       stopLoading(0)
//       setHaveError(true);
//       setError(validationError.message);
//     }
//   };
// const enterLoading = (index) => {
//     setLoading((prevLoadings) => {
//       const newLoadings = [...prevLoadings];
//       newLoadings[index] = true;
//       return newLoadings;
//     });
// }
// const stopLoading = (index) => {
//     setLoading((prevLoadings) => {
//       const newLoadings = [...prevLoadings];
//       newLoadings[index] = false;
//       return newLoadings;
//     });
// }

  return (
    <section id={styles.register}>
            <div className="container">
                <div className={styles.form}>
                <div className={styles['form-img']}>
                        <img src={BG} alt="" />
                    </div>
                    <div className={styles['form-info']}>
                        <img src={LOGO} alt="logo" />                        
                        <h1>Hi, New Friend! Join the Quiz</h1>
                        <form>
                            <input type="email" placeholder="Enter your email" {...register('email', { required: true })} />
                            <input type="text" placeholder="Enter your name" {...register('name', { required: true })} />
                            <div className={styles['password']}>
                                <input type={passwordShow ? 'text' : 'password'} placeholder="Set your password" {...register('password', { required: true })} />
                                <div onClick={() => setPasswordShow(!passwordShow)}>
                                    { passwordShow ? <BiShow /> : <BiHide /> } 
                                </div>
                            </div>                            
                            <Button htmlType="submit" loading={loading[0]} className={styles['form-info-button']}>
                                Sign up
                            </Button>
                        </form>
                        <div className={styles['form-info-sign-up-message']}>
                            <p>Already have an account?</p>
                            <NavLink to={'/login'}>Sign in</NavLink>
                        </div>
                        <div className={styles['form-info-error-message']}>{haveError ? error : ''}</div>
                        <div className={styles['form-info-credits']}>
                            © Quiz 2024
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}
export default Register
