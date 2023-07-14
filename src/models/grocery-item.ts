export enum GroceryTypes {
    Fruit = 'fruit',
    Vegetable = 'vegetable',
    Other = 'other',
}

export enum GroceryItemStatuses {
    Done = 'done',
    Undone = 'undone',
}

export class GroceryItemDTO {
    id: string;
    name: string;
    type: GroceryTypes;

    constructor(id: string, name: string, type: GroceryTypes) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}

export interface IGroceryItem {
    id: string;
    name: string;
    type: GroceryTypes;
    status: GroceryItemStatuses;
}
