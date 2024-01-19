import * as Yup from 'yup';

const loginValidation = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),

  password: Yup.string()
    .required('Password is required')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{4,}$/,
      'Password must contain at least 4 characters, including uppercase-lowercase letters, number and symbol.'
    ),
});

export default loginValidation;
