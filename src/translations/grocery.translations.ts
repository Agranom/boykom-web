import { eGroceryCategory } from '../features/grocery/models/grocery-item';
import { eSystemLanguages } from '../const/system-languages.enum';

export const groceryCategories: Record<eSystemLanguages, Record<eGroceryCategory, string>> = {
  [eSystemLanguages.Ru]: {
    [eGroceryCategory.Alcohol]: 'Алкоголь',
    [eGroceryCategory.Bakery]: 'Выпечка',
    [eGroceryCategory.Beverages]: 'Напитки',
    [eGroceryCategory.Fruits]: 'Фрукты',
    [eGroceryCategory.Dairy]: 'Молочные продукты',
    [eGroceryCategory.CannedGoods]: 'Консервы',
    [eGroceryCategory.HouseholdGoods]: 'Для дома',
    [eGroceryCategory.HygieneProducts]: 'Средства гигиены',
    [eGroceryCategory.Meat]: 'Мясо',
    [eGroceryCategory.Oils]: 'Масло',
    [eGroceryCategory.PantryStaples]: 'Крупы',
    [eGroceryCategory.PersonalCare]: 'Уход за собой',
    [eGroceryCategory.Seafood]: 'Морепродукты',
    [eGroceryCategory.Spices]: 'Специи',
    [eGroceryCategory.Vegetables]: 'Овощи',
    [eGroceryCategory.Greens]: 'Зелень',
    [eGroceryCategory.Drugs]: 'Лекарства',
    [eGroceryCategory.Sweets]: 'Сладкое',
    [eGroceryCategory.Snacks]: 'Снеки',
    [eGroceryCategory.Souces]: 'Соусы',
    [eGroceryCategory.Fungi]: 'Грибы',
    [eGroceryCategory.Nuts]: 'Орехи',
    [eGroceryCategory.SemiProducts]: 'Полуфабрикаты',
    [eGroceryCategory.Unknown]: 'Разное',
  },
};
