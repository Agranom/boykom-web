export enum eGroceryCategory {
    Fruits = 'fruits',
    Vegetables = 'vegetables',
    HouseholdGoods = 'household_goods',
    PersonalCare = 'personal_care',
    Dairy = 'dairy',
    Meat = 'meat',
    Seafood = 'seafood',
    PantryStaples = 'pantry_staples',
    CannedGoods = 'canned_goods',
    Bakery = 'bakery',
    Beverages = 'beverages',
    Alcohol = 'alcohol',
    Spices = 'spices',
    Oils = 'oils',
    HygieneProducts = 'hygiene_products',
    Greens = 'greens',
    Drugs = 'drugs',
    Sweets = 'sweets',
    Snacks = 'snacks',
    Souces = 'souces',
    Fungi = 'fungi',
    Nuts = 'nuts',
    SemiProducts = 'semi_products',
    Unknown = 'unknown',
}

export enum eGroceryType {
    Fruit = 'fruit',
    Vegetable = 'vegetable',
    Other = 'other',
}

export enum eGroceryItemStatus {
    Done = 'done',
    Undone = 'undone',
}

export enum eGroceryItemPriority {
    Major= 'major',
    Medium = 'medium',
    Low = 'low',
}

export interface IGroceryItem {
    id?: string;
    name: string;
    status: eGroceryItemStatus;
    priority: eGroceryItemPriority;
    category: eGroceryCategory;
    version: number;
    inFridge: boolean;
    recipeId?: string;
}

export interface INewGroceryItem {
    name: string;
    priority: eGroceryItemPriority;
    inFridge?: boolean;
}
