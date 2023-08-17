import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import styles from './NewUsersGroup.module.scss';

type UserAutocompleteProps = {
    onSubmit: (username: string) => void;
}

const validationSchema = yup.object({
    email: yup.string()
        .email('Неверный формат')
        .required('Введите e-mail'),
});

const NewUsersGroup: React.FC<UserAutocompleteProps> = ({ onSubmit }) => {
    const userForm = useFormik({
        validationSchema,
        initialValues: {
            email: '',
        },
        onSubmit: ({ email }) => {
            onSubmit(email);
            userForm.resetForm();
        },
    });

    return (
        <form className={styles.newUsersGroup} onSubmit={userForm.handleSubmit}>
            <TextField variant={'standard'} label="E-mail пользователя"
                       className={styles.newUsersGroupEmailField}
                       placeholder="Введите e-mail пользователя"
                       name="email"
                       autoComplete="off"
                       value={userForm.values.email}
                       onChange={userForm.handleChange}
                       onBlur={userForm.handleBlur}
                       error={userForm.touched.email && Boolean(userForm.errors.email)}
                       helperText={userForm.touched.email && userForm.errors.email}
            />
            <Button color={'primary'} variant={'contained'} type={'submit'}>Добвить</Button>
        </form>
    );
};

export default NewUsersGroup;
