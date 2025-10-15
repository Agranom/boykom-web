import { eSystemLanguages } from '../const/system-languages.enum';
import { GroceryCategory } from '@agranom/boykom-common';

export const groceryCategories: Record<eSystemLanguages, Record<GroceryCategory, string>> = {
  [eSystemLanguages.Ru]: {
    [GroceryCategory.Alcohol]: 'Алкоголь',
    [GroceryCategory.Bakery]: 'Выпечка',
    [GroceryCategory.Beverages]: 'Напитки',
    [GroceryCategory.Fruits]: 'Фрукты',
    [GroceryCategory.Dairy]: 'Молочные продукты',
    [GroceryCategory.CannedGoods]: 'Консервы',
    [GroceryCategory.HouseholdGoods]: 'Для дома',
    [GroceryCategory.HygieneProducts]: 'Средства гигиены',
    [GroceryCategory.Meat]: 'Мясо',
    [GroceryCategory.Oils]: 'Масло',
    [GroceryCategory.PantryStaples]: 'Крупы',
    [GroceryCategory.PersonalCare]: 'Уход за собой',
    [GroceryCategory.Seafood]: 'Морепродукты',
    [GroceryCategory.Spices]: 'Специи',
    [GroceryCategory.Vegetables]: 'Овощи',
    [GroceryCategory.Greens]: 'Зелень',
    [GroceryCategory.Drugs]: 'Лекарства',
    [GroceryCategory.Sweets]: 'Сладкое',
    [GroceryCategory.Snacks]: 'Снеки',
    [GroceryCategory.Souces]: 'Соусы',
    [GroceryCategory.Fungi]: 'Грибы',
    [GroceryCategory.Nuts]: 'Орехи',
    [GroceryCategory.SemiProducts]: 'Полуфабрикаты',
    [GroceryCategory.Unknown]: 'Разное',
  },
};
