import React from 'react';
import { Modal, List, Typography } from 'antd';
import { Meal, MealItem } from '../models/meal.interface';
import { Nutrients } from '@agranom/boykom-common';

const { Text } = Typography;

type NutrientKey = keyof Pick<Nutrients, 'kcal' | 'prot' | 'carbo' | 'fat'>;
type MicroNutrientKey = keyof Omit<Nutrients, 'kcal' | 'prot' | 'carbo' | 'fat'>;

interface NutrientModalProps {
  isOpen: boolean;
  onClose: () => void;
  nutrientName: string;
  nutrientUnit: string;
  meals: Meal[];
  nutrientKeys: Array<keyof Nutrients>;
}

interface MealItemWithNutrient {
  mealItem: MealItem;
  mealTitle: string;
  nutrientValue: number;
}

/**
 * Gets the nutrient value from a meal item
 */
const getNutrientValue = (item: MealItem, nutrientKey: keyof Nutrients): number => {
  const value = item[nutrientKey as NutrientKey] || item.microNutrients?.[nutrientKey as MicroNutrientKey];
  return typeof value === 'number' ? value : 0;
};

/**
 * Filters meal items that have the specified nutrient value > 0
 */
const getMealItemsWithNutrient = (meals: Meal[], nutrientKey: Array<keyof Nutrients>): Array<MealItemWithNutrient> => {
  const itemsWithNutrient: Array<MealItemWithNutrient> = [];
  
  meals.forEach(meal => {
    if (meal.items) {
      meal.items.forEach(item => {
        nutrientKey.forEach(key => {
          const nutrientValue = getNutrientValue(item, key);
          if (nutrientValue > 0) {
            itemsWithNutrient.push({
              mealItem: item,
              mealTitle: meal.title,
              nutrientValue: nutrientValue
            });
          }
        });
      });
    }
  });
  
  return itemsWithNutrient;
};

export const NutrientModal: React.FC<NutrientModalProps> = ({
  isOpen,
  onClose,
  nutrientName,
  nutrientUnit,
  meals,
  nutrientKeys
}) => {
  const itemsWithNutrient = getMealItemsWithNutrient(meals, nutrientKeys);


  return (
    <Modal
      title={`Продукты с содержанием: ${nutrientName}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      zIndex={1000}
    >
      {itemsWithNutrient.length === 0 ? (
        <Text type="secondary">Нет продуктов с содержанием {nutrientName.toLowerCase()}</Text>
      ) : (
        <>
          <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
            <Text strong>
              Всего найдено: {itemsWithNutrient.length} продуктов
            </Text>
            <br />
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <List
              dataSource={itemsWithNutrient}
              renderItem={({ mealItem, mealTitle, nutrientValue }) => {
                return (
                  <List.Item>
                    <div className='w-full'>
                      <div className='flex justify-between items-center'>
                        <div className='flex-1'>
                          <Text strong>{mealItem.name}</Text>
                          <br />
                          <Text type="secondary" className='text-lg'>
                            из "{mealTitle}" ({mealItem.grams}г)
                          </Text>
                        </div>
                        <Text strong style={{ color: '#1890ff' }} className='flex-shrink-0'>
                          {nutrientValue.toLocaleString()} {nutrientUnit}
                        </Text>
                      </div>
                    </div>
                  </List.Item>
                );
              }}
            />
          </div>
        </>
      )}
    </Modal>
  );
};