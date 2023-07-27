import * as yup from 'yup';

export const formValidationSchema = yup.object({
    email: yup.string()
        .email('Введите правильный e-mail')
        .required('Введите e-mail'),
    password: yup.string()
        .min(4, 'Пароль должен быть не меньше 4 символов')
        .required('Введите пароль'),
});
