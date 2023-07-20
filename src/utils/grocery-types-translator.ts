import { eGroceryItemPriority, eGroceryType } from '../features/grocery/models/grocery-item';

export class GroceryTypesTranslator {
    static toCategoryType(type: eGroceryType): string {
        switch (type) {
            case eGroceryType.Fruit:
                return 'Фрукты';
            case eGroceryType.Vegetable:
                return 'Овощи';
            default:
                return 'Остальное';
        }
    }

    static toItemPriority(type: eGroceryItemPriority): string {
        switch (type) {
            case eGroceryItemPriority.Major:
                return 'Закончился';
            case eGroceryItemPriority.Medium:
                return 'Заканчивается';
            case eGroceryItemPriority.Low:
                return 'Хватает';
        }
    }
}
