import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, AutoComplete } from 'antd';
import React from 'react';
import { eGroceryItemPriority, INewGroceryItem } from './models/grocery-item';
import styles from './GroceryForm.module.scss';
import { useGroceriesAutocomplete } from './api/get-groceries-autocomplete';

const GroceryForm: React.FC<{item?: INewGroceryItem, onSubmit: (item: INewGroceryItem) => void}> = ({ item, onSubmit }) => {
    const [form] = Form.useForm();
    const [searchQuery, setSearchQuery] = React.useState('');
    const { data: allAutocompleteOptions } = useGroceriesAutocomplete();

    const filteredOptions = React.useMemo(() => {
        if (!allAutocompleteOptions || !searchQuery) {
            return allAutocompleteOptions || [];
        }
        return allAutocompleteOptions.filter(option => 
            option.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [allAutocompleteOptions, searchQuery]);

    const handleSubmit = (values: INewGroceryItem) => {
        onSubmit(values);
        form.resetFields();
        setSearchQuery('');
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    const handleSelect = (value: string) => {
        handleSubmit({ name: value, priority: eGroceryItemPriority.Major });
    };

    return (
        <Form
            form={form}
            className={styles.groceryForm}
            onFinish={handleSubmit}
            initialValues={{
                name: item?.name || '',
                priority: item?.priority || eGroceryItemPriority.Major,
            }}
        >
            <Form.Item
                name="name"
                rules={[
                    { required: true, message: 'Введите продукт' },
                    { max: 50, message: 'Название должно быть меньше 50 символов' }
                ]}
                className="w-full"
            >
                <AutoComplete
                    variant="underlined"
                    className={styles.groceryFormProductName}
                    placeholder="Введите название продукта"
                    options={filteredOptions.map(option => ({ label: option, value: option }))}
                    onSearch={handleSearch}
                    onSelect={handleSelect}
                />
            </Form.Item>

            <Button 
                type="primary" 
                htmlType="submit" 
                shape="circle" 
                icon={<PlusOutlined />} 
                size="large"
            />
        </Form>
    );
};

export default GroceryForm;
