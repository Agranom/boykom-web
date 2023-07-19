import { Add } from '@mui/icons-material';
import { Fab, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { eGroceryItemPriority, INewGroceryItem } from '../models/grocery-item';
import { GroceryTypesTranslator } from '../utils/grocery-types-translator';
import styles from './GroceryForm.module.scss'
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup.string().required('Введите продукт').max(50, 'Название должно быть меньше 50 символов'),
    priority: yup.string().required('Выберите одно из значений'),
});

const GroceryForm: React.FC<{item?: INewGroceryItem, onSubmit: (item: INewGroceryItem) => void}> = ({ item, onSubmit }) => {
    const formik = useFormik<INewGroceryItem>({
        initialValues: {
            name: item?.name || '',
            priority: item?.priority || eGroceryItemPriority.Major,
        },
        validationSchema,
        onSubmit: (values: INewGroceryItem) => {
            onSubmit(values);
            formik.resetForm();
        },
    })
    return (
        <form className={styles.groceryForm} onSubmit={formik.handleSubmit}>
            <TextField
                className={styles.groceryFormProductName}
                variant={'standard'}
                id="name"
                name="name"
                label="Продукт"
                placeholder="Введите название продукта"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <FormControl variant={'standard'}
                         className={styles.groceryFormPriority}
                         error={formik.touched.priority && Boolean(formik.errors.priority)}
            >
                <InputLabel id="priority">Наличие</InputLabel>
                <Select labelId={'priority'}
                        value={formik.values.priority}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="priority"
                        name="priority"
                >
                    <MenuItem value={eGroceryItemPriority.Major}>{GroceryTypesTranslator.toItemPriority(eGroceryItemPriority.Major)}</MenuItem>
                    <MenuItem value={eGroceryItemPriority.Medium}>{GroceryTypesTranslator.toItemPriority(eGroceryItemPriority.Medium)}</MenuItem>
                    <MenuItem value={eGroceryItemPriority.Low}>{GroceryTypesTranslator.toItemPriority(eGroceryItemPriority.Low)}</MenuItem>
                </Select>
                { formik.touched.priority && Boolean(formik.errors.priority) && <FormHelperText>{formik.errors.priority}</FormHelperText>}
            </FormControl>
            <Fab aria-label="add" size={'small'} color={'primary'} type={'submit'}>
                <Add/>
            </Fab>
        </form>
    );
};

export default GroceryForm;
