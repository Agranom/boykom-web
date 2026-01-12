import React, { useState, useMemo } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useFoodsAutocomplete } from '../api/foods-autocomplete';
import { FoodAutocomplete } from '../models/nutrition.interface';
import { useDebounce } from '../../../hooks/useDebounce';
import { autocompleteConfig } from '../const/autocomplete-config';

interface FoodsAutocompleteProps {
  onSelect?: (product: FoodAutocomplete) => void;
  onCreateFood?: () => void;
}

export const FoodsAutocomplete: React.FC<FoodsAutocompleteProps> = ({ 
  onSelect,
  onCreateFood
}) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);
  
  // Use React Query to fetch autocomplete options
  const { data, isLoading, isError } = useFoodsAutocomplete(debouncedSearch);
  
  // Transform API response to AutoComplete options format
  const options = useMemo(() => {
    const foodOptions = data ? data.map((product) => ({
      value: product.value,
      label: product.value,
      data: product
    })) : [];
    if (searchValue.length >= autocompleteConfig.minQueryLength) {
      const createFoodOption = {
        value: '__create_food__',
        label: (
          <span>
            <PlusOutlined className='mr-4' />
            Добавить блюдо
          </span>
        ),
        data: null
      };
      const separatorOption = {
        value: '__separator__',
        label: '------',
        disabled: true,
        data: null
      };
      return [createFoodOption, separatorOption, ...foodOptions];
    }
    return foodOptions;
  }, [data, searchValue]);

  const handleSelect = (value: string, option: any) => {
    if (value === '__create_food__') {
      if (onCreateFood) {
        onCreateFood();
      }
      setSearchValue('');
      return;
    }
    if (onSelect && option.data) {
      onSelect(option.data);
    }
    setSearchValue(value);
  };

  return (
    <AutoComplete
      style={{ width: '100%' }}
      options={options}
      value={searchValue}
      onChange={setSearchValue}
      onSelect={handleSelect}
      notFoundContent={
        isLoading 
          ? 'Пиши название...' 
          : isError 
            ? 'Error loading suggestions' 
            : options.length === 0 
              ? 'No products found' 
              : null
      }
      placeholder="Поиск продуктов"
    >
      <Input prefix={<SearchOutlined />} />
    </AutoComplete>
  );
};
