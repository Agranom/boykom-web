import { GroceryTypes } from '../models/grocery-item';

export class GroceryMapper {
    static toCategoryType(type: GroceryTypes): string {
        switch (type) {
            case GroceryTypes.Fruit:
                return 'Фрукты';
            case GroceryTypes.Vegetable:
                return 'Овощи';
            default:
                return 'Остальное';
        }
    }
}
