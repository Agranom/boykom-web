import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../../../const/query-keys';
import { queryClient } from '../../../config/react-query';
import httpClient from '../../../services/http-client';

export const addIngredientsToGrocery = ({ recipeId, ingredientIds }: { recipeId: string, ingredientIds: number[] }): Promise<void> => {
    return httpClient
        .post(`recipes/${recipeId}/ingredients/add-to-grocery`, { json: { ingredientIds } })
        .json();
};

export const useAddIngredientsToGrocery = () => {
    return useMutation({
        mutationFn: addIngredientsToGrocery,
    });
};