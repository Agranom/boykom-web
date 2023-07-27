import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import { formValidationSchema } from '../../const/form-validation.schema';
import { signIn } from '../api/sign-in';
import { eAuthRoutes } from '../routes/AuthRoutes';
import styles from './SignInForm.module.scss';

type SignInFormValues = {
    email: string;
    password: string;
}

type SignInProps = SignInFormValues & {
    onSuccess: () => void;
}

const SignInForm: React.FC<SignInProps> = ({ email, password, onSuccess }) => {
    const formik = useFormik<SignInFormValues>({
        initialValues: {
            email,
            password,
        },
        validationSchema: formValidationSchema,
        onSubmit: async (values: SignInFormValues) => {
            const { email: username, password } = values;
            await signIn({ username, password });
            onSuccess();
        },
    });

    return (
        <>
            <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
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
                        disabled={!(formik.touched && formik.isValid)} fullWidth>
                    Войти
                </Button>
            </form>
            <p>Нет аккаунта? Тогда <Link to={`../${eAuthRoutes.SignUp}`}>зарегистрируйте</Link></p>
        </>

    );
};

export default SignInForm;
