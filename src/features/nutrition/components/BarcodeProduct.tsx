import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Modal, Input, Button, Typography } from 'antd';
import { ScanOutlined } from '@ant-design/icons';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useGetProductByBarcode } from '../api/get-product-by-barcode';
import { ExternalProduct } from '../models/external-product.interface';
import { useGetNutrientsMetadata } from '../api/get-nutrients-metadata';
import { ProductView } from './ProductView';

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
  const [nutrientValues, setNutrientValues] = useState<Record<number, number | null>>({});
  const { data: product, isFetching } = useGetProductByBarcode(requestedBarcode);
  const { data: nutrientsMetadata } = useGetNutrientsMetadata();

  const hasProduct = !!product;

  useEffect(() => {
    if (hasProduct) {
      setViewMode('product');
      // Initialize nutrient values from product data
      const initialNutrients: Record<number, number | null> = {};
      if (nutrientsMetadata) {
        Object.keys(nutrientsMetadata).forEach(nutrientNumberStr => {
          const nutrientNumber = Number(nutrientNumberStr);
          initialNutrients[nutrientNumber] = product.nutrientsPer100g[nutrientNumber] ?? null;
        });
      }
      setNutrientValues(initialNutrients);
    } else if (requestedBarcode && !hasProduct) {
      // Product not found, show manual entry mode
      setViewMode('product');
      // Initialize empty nutrient values
      const emptyNutrients: Record<number, number | null> = {};
      if (nutrientsMetadata) {
        Object.keys(nutrientsMetadata).forEach(nutrientNumberStr => {
          const nutrientNumber = Number(nutrientNumberStr);
          emptyNutrients[nutrientNumber] = null;
        });
      }
      setNutrientValues(emptyNutrients);
    }
  }, [product, requestedBarcode, nutrientsMetadata]);

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


  const handleNutrientValueChange = useCallback((nutrientNumber: number, value: number | null): void => {
    setNutrientValues(prev => ({
      ...prev,
      [nutrientNumber]: value,
    }));
  }, []);

  const handleScanButtonClick = useCallback((): void => {
    executeBarcodeSearch(manualBarcode);
  }, [executeBarcodeSearch, manualBarcode]);

  const handleProductAdded = useCallback((addedProduct: { barcode: string; productName: string }): void => {
    onBarcodeDetected(addedProduct);
    onClose();
  }, [onBarcodeDetected, onClose]);

  const handleReturnToScannerView = useCallback((): void => {
    setViewMode('scanner');
    setRequestedBarcode(null);
    setNutrientValues({});
    setIsScannerEnabled(true);
  }, []);

  const isScanButtonEnabled = manualBarcode.trim().length > 0;
  const isManualEntry = requestedBarcode != null && product === null;

  const footer = useMemo(() => viewMode === 'scanner' ? [
    <Button key="cancel" onClick={onClose}>
      Отмена
    </Button>,
  ] : null, [viewMode, onClose]);

  const modalTitle = useMemo(() => {
    if (viewMode === 'scanner') {
      return 'Поиск продукта по штрихкоду';
    }
    return isManualEntry ? 'Добавление нового продукта' : 'Найденный продукт';
  }, [viewMode, isManualEntry]);

  return (
    <Modal
      title={modalTitle}
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
        <ProductView
          product={product ?? null}
          requestedBarcode={requestedBarcode}
          nutrientValues={nutrientValues}
          onNutrientValueChange={handleNutrientValueChange}
          onProductAdded={handleProductAdded}
          onCancel={handleReturnToScannerView}
        />
      )}
    </Modal>
  );
};