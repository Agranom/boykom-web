import { Nutrients } from '@agranom/boykom-common';

export interface ExternalProduct {
    name: string;
    brand: string;
    nutrientsPer100g: Nutrients;
}
