import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { formValidationSchema } from '../../const/form-validation.schema';
import { signUp } from '../api/sign-up';
import styles from './SignInForm.module.scss';

type SignUpFormValues = {
    email: string;
    password: string;
}

const SignUpForm: React.FC<{ onSuccess: (credentials: SignUpFormValues) => void }> = ({ onSuccess }) => {
    const formik = useFormik<SignUpFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: formValidationSchema,
        onSubmit: async (values: SignUpFormValues) => {
            const { email: username, password } = values;
            await signUp({ username, password });
            onSuccess(values);
        },
    });
    return (
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
                    disabled={!(formik.dirty && formik.isValid)} fullWidth>
                Зарегистрировать
            </Button>
        </form>
    );
};

export default SignUpForm;
