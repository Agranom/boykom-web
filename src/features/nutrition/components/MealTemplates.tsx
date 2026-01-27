import React, { useMemo } from 'react';
import { useGetMealTemplates } from '../api/get-meal-templates';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface MealTemplateProps {
  onSelect: (templateId: string) => void;
}

export const MealTemplates: React.FC<MealTemplateProps> = ({onSelect}) => {
  const { data: templates } = useGetMealTemplates();
  const options = useMemo(() => {
    if (!templates?.length) {
      return [];
    }

    return templates.map(({id, title}) => ({
      value: id,
      label: title,
    }));
  }, [templates]);

  return (
    <Select
      showSearch
      className="w-full"
      options={options}
      onSelect={onSelect}
      placeholder="Выберите шаблон"
    >
      <Input prefix={<SearchOutlined/>}/>
    </Select>
  );
}