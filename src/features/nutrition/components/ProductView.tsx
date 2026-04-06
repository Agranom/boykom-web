import React, { useCallback, useMemo, useState } from 'react';
import { Input, Typography, InputNumber, Button } from 'antd';
import { ExternalProduct } from '../models/external-product.interface';
import { useGetNutrientsMetadata } from '../api/get-nutrients-metadata';
import { useUpsertFoodProduct } from '../api/upsert-food-product';
import { useAlert } from '../../../hooks/use-alert';
import { FoodProductType } from '@agranom/boykom-common';

const { Text } = Typography;

export interface SelectedBarcodeProduct {
  barcode: string;
  productName: string;
}

export interface ProductViewProps {
  product: ExternalProduct | null;
  requestedBarcode: string | null;
  nutrientValues: Record<number, number | null>;
  onNutrientValueChange: (nutrientNumber: number, value: number | null) => void;
  onProductAdded: (product: SelectedBarcodeProduct) => void;
  onCancel: () => void;
}

/**
 * ProductView component handles the display and editing of product information
 * including nutrients, search name, and product details for both found and manual entry modes.
 */
export const ProductView: React.FC<ProductViewProps> = ({
  product,
  requestedBarcode,
  nutrientValues,
  onNutrientValueChange,
  onProductAdded,
  onCancel,
}) => {
  const [searchName, setSearchName] = useState<string>('');
  const [originalProductName, setOriginalProductName] = useState<string>('');
  const { data: nutrientsMetadata } = useGetNutrientsMetadata();
  const { isLoading: isUpserting, mutate: upsertProduct } = useUpsertFoodProduct();
  const { showError } = useAlert();

  const hasProduct = product != null;
  const isManualEntry = requestedBarcode != null && product == null;

  const formatProductName = useCallback((value: Pick<ExternalProduct, 'name' | 'brand'>): string => {
    return `${value.name} (${value.brand})`;
  }, []);

  const productLabel = hasProduct ? formatProductName(product) : originalProductName;

  const handleSearchNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchName(e.target.value);
  }, []);

  const handleOriginalProductNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setOriginalProductName(e.target.value);
  }, []);

  const handleAddProduct = useCallback((): void => {
    if (requestedBarcode == null || !searchName.trim()) {
      return;
    }

    const productName = product ? formatProductName(product) : originalProductName.trim();
    const finalSearchName = product ?
      formatProductName({ name: searchName.trim(), brand: product.brand }) :
      searchName.trim();

    // Convert nutrient values to the format expected by the API
    const nutrientsPer100g = Object.entries(nutrientValues)
      .filter(([_, value]) => value != null)
      .map(([nutrientNumber, amount]) => ({
        nutrientNumber: Number(nutrientNumber),
        amount: amount!,
      }));

    // Upsert the product to the database
    upsertProduct(
      {
        productNumber: requestedBarcode,
        data: {
          name: productName,
          type: FoodProductType.Barcode,
          searchName: finalSearchName,
          nutrientsPer100g,
        },
      },
      {
        onSuccess: () => {
          onProductAdded({
            barcode: requestedBarcode,
            productName: finalSearchName,
          });
        },
        onError: (error) => {
          console.error('Error upserting product:', error);
          showError('Не удалось добавить продукт');
        },
      },
    );
  }, [
    formatProductName,
    onProductAdded,
    product,
    requestedBarcode,
    searchName,
    nutrientValues,
    upsertProduct,
    showError,
  ]);

  // Get sorted nutrients based on order field
  const sortedNutrients = useMemo(() => {
    if (!nutrientsMetadata) return [];

    return Object.entries(nutrientsMetadata)
      .map(([nutrientNumber, metadata]) => ({
        nutrientNumber: Number(nutrientNumber),
        ...metadata,
      }))
      .sort((a, b) => a.order - b.order);
  }, [nutrientsMetadata]);

  const renderNutrientsSection = useCallback(() => {
    if (!nutrientsMetadata || sortedNutrients.length === 0) {
      return null;
    }

    return (
      <div className="space-y-2">
        <Text strong>Пищевая ценность на 100г:</Text>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {sortedNutrients.map(({ nutrientNumber, name, unit }) => (
              <div key={nutrientNumber} className="space-y-1">
                <Text className="text-sm">{name}:</Text>
                <InputNumber
                  size="small"
                  placeholder="0"
                  value={nutrientValues[nutrientNumber]}
                  onChange={(value) => onNutrientValueChange(nutrientNumber, value)}
                  addonAfter={unit}
                  className="w-full"
                  min={0}
                  precision={unit === 'мкг' ? 1 : 2}
                  type='number'
                  controls={false}
                  stringMode={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }, [nutrientsMetadata, sortedNutrients, nutrientValues, onNutrientValueChange]);

  return (
    <div className="space-y-4">

      <div className="space-y-2">
        <Text strong>Штрихкод:</Text>
        <Input value={requestedBarcode || ''} disabled size="large" />
      </div>
      
      {!hasProduct && (
        <div className="space-y-2">
          <Text strong>Оригинальное название продукта:</Text>
          <Input
            value={productLabel}
            onChange={handleOriginalProductNameChange}
            disabled={hasProduct}
            required={!hasProduct}
            size="large"
            status={!hasProduct && !originalProductName ? 'error' : undefined}
            placeholder="Например: Греческий йогурт"
          />
        </div>
      )}


      <div className="space-y-2">
        <Text strong>Название для поиска:</Text>
        <Input
          required
          value={searchName}
          onChange={handleSearchNameChange}
          placeholder="Например: Фруктовый йогурт"
          size="large"
          autoFocus
          disabled={isUpserting}
          status={!searchName ? 'error' : undefined}
        />
      </div>

      {/* Nutrients section with input fields */}
      {renderNutrientsSection()}

      {/* Action buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button onClick={onCancel} disabled={isUpserting}>
          Отмена
        </Button>
        <Button
          type="primary"
          onClick={handleAddProduct}
          loading={isUpserting}
          disabled={isUpserting || !searchName.trim()}
        >
          Добавить
        </Button>
      </div>
    </div>
  );
};