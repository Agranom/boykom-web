import React, { useState, useMemo } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFoodsAutocomplete } from '../api/foods-autocompletei';
import { FoodAutocomplete } from '../models/nutrition.interface';
import { useDebounce } from '../../../hooks/useDebounce';

interface NutritionAutocompleteProps {
  onSelect?: (product: FoodAutocomplete) => void;
}

export const NutritionAutocomplete: React.FC<NutritionAutocompleteProps> = ({ 
  onSelect 
}) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);
  
  // Use React Query to fetch autocomplete options
  const { data, isLoading, isError } = useFoodsAutocomplete(debouncedSearch);
  
  // Transform API response to AutoComplete options format
  const options = useMemo(() => {
    if (!data) return [];
    
    return data.map((product) => ({
      value: product.name,
      label: product.name,
      data: product
    }));
  }, [data]);

  const handleSelect = (value: string, option: any) => {
    if (onSelect) {
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
          ? 'Loading...' 
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
