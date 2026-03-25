import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { nutrientNumbers } from '@agranom/boykom-common';
import { queryKeys } from '../../../const/query-keys';
import httpClient from '../../../services/http-client';
import { NutrientsMetadata } from '../models/nutrients-metadata.interface';


export interface Nutrient {
    id: number;
    nutrientNumber: number;
    name: string;
    unit: string;
}

const nutrientUnitsMapRu: Record<string, string> = {
    'g': 'г',
    'mg': 'мг',
    'mcg': 'мкг',
    'ug': 'мкг',
    'kj': 'кДж',
    'kcal': 'ккал',
};

const nutrientMetadataMapRu: Record<number, {name: string, order: number}> = {
    [nutrientNumbers.kcal]: {
        name: 'Энергия',
        order: 1,
    },
    [nutrientNumbers.prot]: {
        name: 'Белки',
        order: 2,
    },
    [nutrientNumbers.carbo]: {
        name: 'Углеводы',
        order: 3,
    },
    [nutrientNumbers.fat]: {
        name: 'Жиры',
        order: 4,
    },
    [nutrientNumbers.fatSaturated]: {
        name: 'Насыщенные жиры',
        order: 5,
    },
    [nutrientNumbers.fatMono]: {
        name: 'Мононенасыщенные жиры',
        order: 6,
    },
    [nutrientNumbers.fatPoly]: {
        name: 'Полиненасыщенные жиры',
        order: 7,
    },
    [nutrientNumbers.sug]: {
        name: 'Сахар',
        order: 8,
    },
    [nutrientNumbers.sugAdded]: {
        name: 'Добавленный сахар',
        order: 9,
    },
    [nutrientNumbers.chol]: {
        name: 'Холестерин',
        order: 10,
    },
    [nutrientNumbers.fiber]: {
        name: 'Клетчатка',
        order: 11,
    },
    [nutrientNumbers.salt]: {
        name: 'Соль',
        order: 12,
    },
    [nutrientNumbers.epa]: {
        name: 'ЭПА',
        order: 13,
    },
    [nutrientNumbers.dha]: {
        name: 'ДГА',
        order: 14,
    },
    [nutrientNumbers.dpa]: {
        name: 'ДПА',
        order: 15,
    },
    [nutrientNumbers.sod]: {
        name: 'Натрий',
        order: 16,
    },
    [nutrientNumbers.cal]: {
        name: 'Кальций',
        order: 17,
    },
    [nutrientNumbers.iron]: {
        name: 'Железо',
        order: 18,
    },
    [nutrientNumbers.iod]: {
        name: 'Йод',
        order: 19,
    },
    [nutrientNumbers.mag]: {
        name: 'Магний',
        order: 20,
    },
    [nutrientNumbers.zinc]: {
        name: 'Цинк',
        order: 21,
    },
    [nutrientNumbers.vA]: {
        name: 'Витамин A',
        order: 22,
    },
    [nutrientNumbers.vD]: {
        name: 'Витамин D',
        order: 23,
    },
    [nutrientNumbers.vD3]: {
        name: 'Витамин D3',
        order: 24,
    },
    [nutrientNumbers.vE]: {
        name: 'Витамин E',
        order: 25,
    },
    [nutrientNumbers.vK1]: {
        name: 'Витамин K1',
        order: 26,
    },
    [nutrientNumbers.vK2]: {
        name: 'Витамин K2',
        order: 27,
    },
    [nutrientNumbers.vC]: {
        name: 'Витамин C',
        order: 28,
    },
    [nutrientNumbers.vB1]: {
        name: 'Витамин B1',
        order: 29,
    },
    [nutrientNumbers.vB2]: {
        name: 'Витамин B2',
        order: 30,
    },
    [nutrientNumbers.vB3]: {
        name: 'Витамин B3',
        order: 31,
    },
    [nutrientNumbers.vB5]: {
        name: 'Витамин B5',
        order: 32,
    },
    [nutrientNumbers.vB6]: {
        name: 'Витамин B6',
        order: 33,
    },
    [nutrientNumbers.vB9]: {
        name: 'Витамин B9',
        order: 34,
    },
    [nutrientNumbers.vB12]: {
        name: 'Витамин B12',
        order: 35,
    },
};

/**
 * Fetches all nutrients from the API
 */
const getNutrients = async (): Promise<Nutrient[]> => {
    return httpClient
        .get('nutrients')
        .json();
};

/**
 * Transforms nutrients array to metadata record with Russian translations
 */
const transformToNutrientsMetadata = (nutrients: Nutrient[]): Record<number, NutrientsMetadata> => {
    const metadata: Record<number, NutrientsMetadata> = {};
    
    nutrients.forEach(nutrient => {
        const ruMetadata = nutrientMetadataMapRu[nutrient.nutrientNumber] || {};
        const ruUnit = nutrientUnitsMapRu[nutrient.unit.toLowerCase()] || nutrient.unit;
        
        metadata[nutrient.nutrientNumber] = {
            name: ruMetadata.name || nutrient.name,
            unit: ruUnit,
            order: ruMetadata.order || 999,
        };
    });

    return metadata;
};

/**
 * React Query hook to get nutrients metadata
 */
export const useGetNutrientsMetadata = (): UseQueryResult<Record<number, NutrientsMetadata>, unknown> => {
    return useQuery({
        queryKey: [queryKeys.nutrientsMetadata],
        queryFn: async () => {
            const nutrients = await getNutrients();
            return transformToNutrientsMetadata(nutrients);
        },
        staleTime: 5 * 60 * 1000,
        keepPreviousData: true,
    });
};