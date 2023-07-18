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

export class GroceryItemDTO {
    id: string;
    name: string;
    type: eGroceryType;

    constructor(id: string, name: string, type: eGroceryType) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}

export interface IGroceryItem {
    id: string;
    name: string;
    // type: eGroceryType;
    status: eGroceryItemStatus;
    priority: eGroceryItemPriority;
}

export interface INewGroceryItem {
    name: string;
    priority: eGroceryItemPriority;
}
