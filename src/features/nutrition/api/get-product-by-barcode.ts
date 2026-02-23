import { useQuery, UseQueryResult } from '@tanstack/react-query';
import httpClient from '../../../services/http-client';
import { ExternalProduct } from '../models/external-product.interface';
import { queryKeys } from '../../../const/query-keys';
import { useAlert } from '../../../hooks/use-alert';

export const getProductByBarcode = async (barcode: string): Promise<ExternalProduct> => {
  return httpClient.get(`food-products/external/${barcode}`).json();
};

export const useGetProductByBarcode = (
  barcode: string | null,
): UseQueryResult<ExternalProduct, unknown> => {
  const { showError } = useAlert();
  return useQuery({
    queryKey: [queryKeys.productByBarcode, barcode],
    queryFn: () => {
      if (barcode == null || barcode.length === 0) {
        throw new Error('Barcode is required');
      }

      return getProductByBarcode(barcode);
    },
    enabled: !!barcode,
    staleTime: 60000, // 1 minute
    retry: false,
    onError: () => {
      showError('Не удалось найти продукт по штрихкоду');
    },
  });
};
