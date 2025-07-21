import React from 'react';
import { eGroceryCategory, IGroceryItem } from './models/grocery-item';
import GroceriesList from './GroceriesList';
import styles from './GroceryCategory.module.scss';
import { groceryCategories } from '../../translations/grocery.translations';
import { eSystemLanguages } from '../../const/system-languages.enum';

type GroceryCategoryType = {
  data: { [key: string]: IGroceryItem[] } | undefined;
}

const GroceryCategory: React.FC<GroceryCategoryType> = ({ data }) => {
  const categoryTranslations = groceryCategories[eSystemLanguages.Ru]

  return (
    <>
      {Object.entries(data || {})
        .map(([category, items]) => (
          <div className={styles.groceryCategoryGroup} key={category}>
            <span className={styles.groceryCategoryGroupLabel}>
              {categoryTranslations[category as eGroceryCategory] || categoryTranslations[eGroceryCategory.Unknown]}
            </span>
            <GroceriesList data={items} />
          </div>
        ))}
    </>
  );
};

export default GroceryCategory;
