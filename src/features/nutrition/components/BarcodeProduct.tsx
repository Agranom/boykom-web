import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Modal, Input, Button, Typography } from 'antd';
import { ScanOutlined } from '@ant-design/icons';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useGetProductByBarcode } from '../api/get-product-by-barcode';
import { ExternalProduct } from '../models/external-product.interface';
import { useUpsertFoodProduct } from '../api/upsert-food-product';
import { useAlert } from '../../../hooks/use-alert';
import { FoodProductType, nutrientNumbers } from '@agranom/boykom-common';

const { Text } = Typography;
type ViewMode = 'scanner' | 'product';
interface SelectedBarcodeProduct {
  barcode: string;
  productName: string;
}

interface BarcodeProductProps {
  onClose: () => void;
  onBarcodeDetected: (product: SelectedBarcodeProduct) => void;
}

/**
 * BarcodeProduct component provides a modal interface for searching products by barcodes
 * or manually entering barcode values. Uses @yudiel/react-qr-scanner for scanning functionality.
 */
export const BarcodeProduct: React.FC<BarcodeProductProps> = ({
  onClose,
  onBarcodeDetected,
}) => {
  const [manualBarcode, setManualBarcode] = useState<string>('');
  const [scannedBarcode, setScannedBarcode] = useState<string>('');
  const [requestedBarcode, setRequestedBarcode] = useState<string | null>(null);
  const [isScannerEnabled, setIsScannerEnabled] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<ViewMode>('scanner');
  const [searchName, setSearchName] = useState<string>('');
  const { data: product, isFetching } = useGetProductByBarcode(requestedBarcode, {
    onError: () => {
      setRequestedBarcode(null);
    },
  });
  const { isLoading: isUpserting, mutate: upsertProduct } = useUpsertFoodProduct();
  const { showError } = useAlert();

  const formatProductName = useCallback((value: Pick<ExternalProduct, 'name' | 'brand'>): string => {
    return `${value.name} (${value.brand})`;
  }, []);

  useEffect(() => {
    if (product != null) {
      setViewMode('product');
    }
  }, [product]);

  const executeBarcodeSearch = useCallback((barcode: string): void => {
    const normalizedBarcode = barcode.trim();
    if (normalizedBarcode.length === 0) {
      return;
    }
    setManualBarcode(normalizedBarcode);
    setScannedBarcode(normalizedBarcode);
    setRequestedBarcode(normalizedBarcode);
    setIsScannerEnabled(false);
  }, []);

  const handleScanSuccess = useCallback((detectedCodes: IDetectedBarcode[]): void => {
    if (detectedCodes.length > 0) {
      executeBarcodeSearch(detectedCodes[0].rawValue);
    }
  }, [executeBarcodeSearch]);

  const handleScanError = useCallback((error: unknown): void => {
    console.error('Barcode scan error:', error);
  }, []);

  const handleManualBarcodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setManualBarcode(value);
    if (value !== scannedBarcode) {
      setScannedBarcode('');
      setRequestedBarcode(null);
      setIsScannerEnabled(true);
    }
  }, [scannedBarcode]);

  const handleSearchNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchName(e.target.value);
  }, []);

  const handleScanButtonClick = useCallback((): void => {
    executeBarcodeSearch(manualBarcode);
  }, [executeBarcodeSearch, manualBarcode]);

  const handleAddProduct = useCallback((): void => {
    if (product == null || requestedBarcode == null || !searchName.trim()) {
      return;
    }

    const finalSearchName = formatProductName({name: searchName.trim(), brand: product.brand});

    // Upsert the product to the database
    upsertProduct(
      {
        productNumber: requestedBarcode,
        data: {
          name: formatProductName(product),
          type: FoodProductType.Barcode,
          searchName: finalSearchName,
          nutrientsPer100g: Object.entries(product.nutrientsPer100g).map(([nutrientNumber, amount]) => ({
            nutrientNumber: Number(nutrientNumber),
            amount: amount ?? 0,
          })),
        },
      },
      {
        onSuccess: () => {
          onBarcodeDetected({
            barcode: requestedBarcode,
            productName: finalSearchName,
          });
          onClose();
        },
        onError: (error) => {
          console.error('Error upserting product:', error);
          showError('Не удалось добавить продукт');
        },
      },
    );
  }, [
    formatProductName,
    onBarcodeDetected,
    product,
    requestedBarcode,
    searchName,
    onClose,
    upsertProduct,
    showError,
  ]);

  const handleReturnToScannerView = useCallback((): void => {
    setViewMode('scanner');
    setRequestedBarcode(null);
    setSearchName('');
    setIsScannerEnabled(true);
  }, []);

  const isScanButtonEnabled = manualBarcode.trim().length > 0;
  const hasProduct = product != null;
  const productLabel = hasProduct ? formatProductName(product) : '';

  const footer = useMemo(() => viewMode === 'product' ?
    [
      <Button key="back" onClick={handleReturnToScannerView} disabled={isUpserting}>
        Отмена
      </Button>,
      <Button
        key="add"
        type="primary"
        onClick={handleAddProduct}
        loading={isUpserting}
        disabled={isUpserting}
      >
        Добавить
      </Button>,
    ] : [
      <Button key="cancel" onClick={onClose}>
        Отмена
      </Button>,
    ], [viewMode, handleReturnToScannerView, handleAddProduct, onClose, isUpserting]);

  return (
    <Modal
      title="Поиск продукта по штрихкоду"
      open={true}
      onCancel={onClose}
      footer={footer}
      width={600}
    >
      {viewMode === 'scanner' && (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="bg-black rounded-lg overflow-hidden relative" style={{ height: '300px' }}>
              {isScannerEnabled ? (
                <Scanner
                  onScan={handleScanSuccess}
                  onError={handleScanError}
                  constraints={{
                    facingMode: 'environment',
                  }}
                  styles={{
                    container: {
                      width: '100%',
                      height: '100%',
                    },
                    video: {
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    },
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white" onClick={() => setIsScannerEnabled(true)}>
                  <div className="w-16 h-16 border-4 border-white rounded-full flex items-center justify-center mb-4">
                    <ScanOutlined className="text-2xl cursor-pointer" />
                  </div>
                  <Text className="text-white text-center">
                    Нажмите для сканирования штрихкода и поиска продукта
                  </Text>
                </div>
              )}
            </div>
            {isFetching && (
              <Text type="secondary">Ищу продукт по штрихкоду...</Text>
            )}
          </div>
          <div className="space-y-3">
            <Text type="secondary">Или введите штрихкод вручную</Text>
            <div className="flex gap-3">
              <Input
                placeholder="Введите штрихкод"
                value={manualBarcode}
                onChange={handleManualBarcodeChange}
                size="large"
                className="flex-1"
              />
              <Button
                type="primary"
                size="large"
                disabled={!isScanButtonEnabled || isFetching}
                onClick={handleScanButtonClick}
              >
                Искать
              </Button>
            </div>
          </div>
        </div>
      )}
      {viewMode === 'product' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Text strong>Оригинальное название продукта:</Text>
            <Input value={productLabel} disabled size="large" />
          </div>
          <div className="space-y-2">
            <Text strong>Пищевая ценность на 100г:</Text>
            {hasProduct && product.nutrientsPer100g && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Калории:</span>
                      <span className="font-medium">{product.nutrientsPer100g[nutrientNumbers.kcal] ?? '-'} ккал</span>
                    </div>
                    <div className="flex justify-between">  
                      <span>Белки:</span>
                      <span className="font-medium">{product.nutrientsPer100g[nutrientNumbers.prot] ?? '-'}г</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Углеводы:</span>
                      <span className="font-medium">{product.nutrientsPer100g[nutrientNumbers.carbo] ?? '-'}г</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Жиры:</span>
                      <span className="font-medium">{product.nutrientsPer100g[nutrientNumbers.fat] ?? '-'}г</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Клетчатка:</span>
                      <span className="font-medium">{product.nutrientsPer100g[nutrientNumbers.fiber] ?? '-'}г</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Сахар:</span>
                      <span className="font-medium">{product.nutrientsPer100g[nutrientNumbers.sug] ?? '-'}г</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Соль:</span>
                      <span className="font-medium">{product.nutrientsPer100g[nutrientNumbers.salt] ?? '-'}г</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Натрий:</span>
                      <span className="font-medium">{product.nutrientsPer100g[nutrientNumbers.sod] ?? '-'}мг</span>
                    </div>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Text strong>Название для поиска:</Text>
            <Input
              required
              onChange={handleSearchNameChange}
              placeholder="Например: Фруктовый йогурт"
              size="large"
              autoFocus
              disabled={isUpserting}
              status={!searchName ? 'error' : undefined}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};