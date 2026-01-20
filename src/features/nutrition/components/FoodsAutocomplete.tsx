import React, { useState, useMemo, useEffect } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useFoodsAutocomplete } from '../api/foods-autocomplete';
import { FoodAutocomplete } from '../models/nutrition.interface';
import { useDebounce } from '../../../hooks/useDebounce';
import { autocompleteConfig } from '../const/autocomplete-config';

enum Actions {
  CreateDish = 'createDish',
}

interface FoodsAutocompleteProps {
  enableCreateDish: boolean;
  onCreateDish?: () => void;
  onSelect?: (product: FoodAutocomplete) => void;
  value?: string;
}

export const FoodsAutocomplete: React.FC<FoodsAutocompleteProps> = ({
                                                                      enableCreateDish,
                                                                      onCreateDish,
                                                                      onSelect,
                                                                      value,
                                                                    }) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);

  // Use React Query to fetch autocomplete options
  const { data, isLoading, isError } = useFoodsAutocomplete(debouncedSearch);

  useEffect(() => {
    if (value) {
      setSearchValue(value);
    }
  }, [value]);

  // Transform API response to AutoComplete options format
  const options = useMemo(() => {
    const foodOptions = data ? data.map((product) => ({
      value: product.value,
      label: product.value,
      data: product,
    })) : [];
    if (enableCreateDish && searchValue.length >= autocompleteConfig.minQueryLength) {
      const createFoodOption = {
        value: Actions.CreateDish,
        label: (
          <span>
            <PlusOutlined className="mr-4"/>
            Добавить блюдо
          </span>
        ),
        data: null,
      };
      const separatorOption = {
        value: '__separator__',
        label: '------',
        disabled: true,
        data: null,
      };
      return [createFoodOption, separatorOption, ...foodOptions];
    }
    return foodOptions;
  }, [data, searchValue, enableCreateDish]);

  const handleSelect = (value: string, option: any) => {
    if (value === Actions.CreateDish) {
      if (enableCreateDish && onCreateDish) {
        onCreateDish();
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
      <Input prefix={<SearchOutlined/>}/>
    </AutoComplete>
  );
};
