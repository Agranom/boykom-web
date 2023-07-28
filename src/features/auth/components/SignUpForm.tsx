import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { formValidationSchema } from '../../const/form-validation.schema';
import { signUp } from '../api/sign-up';
import { eAuthRoutes } from '../routes/AuthRoutes';
import styles from './SignInForm.module.scss';

type SignUpFormValues = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const validationSchema = yup.object({
    firstName: yup.string()
        .required('Введите имя')
        .max(155, 'Имя должно быть меньше 155 символов'),
    lastName: yup.string()
        .required('Введите фамилию')
        .max(155, 'Фамилия должно быть меньше 155 символов'),
}).concat(formValidationSchema);

const SignUpForm: React.FC<{ onSuccess: (credentials: SignUpFormValues) => void }> = ({ onSuccess }) => {
    const formik = useFormik<SignUpFormValues>({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        },
        validationSchema,
        onSubmit: async (values: SignUpFormValues) => {
            const { email: username, ...rest } = values;
            await signUp({ username, ...rest });
            onSuccess(values);
        },
    });
    return (
        <>
            <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                <div className={styles.formGroup}>
                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label={'Имя'}
                        variant={'standard'}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstName && !!formik.errors.firstName}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label={'Фамилия'}
                        variant={'standard'}
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastName && !!formik.errors.lastName}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                </div>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label={'E-mail'}
                    variant={'standard'}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    label={'Пароль'}
                    variant={'standard'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button color={'primary'} variant={'contained'} type="submit" size={'large'}
                        disabled={!(formik.dirty && formik.isValid)} fullWidth>
                    Зарегистрировать
                </Button>
            </form>
            <p>Уже имеете аккаунт? Тогда <Link to={`../${eAuthRoutes.SignIn}`}>войдите</Link></p>
        </>
    );
};

export default SignUpForm;
