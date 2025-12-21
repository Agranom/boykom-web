import React, { useState } from 'react';
import { Card, Typography, Space } from 'antd';
import { NutritionAutocomplete } from './components/NutritionAutocomplete';

interface NutritionProduct {
  productId: string;
  name: string;
}

const { Title, Text } = Typography;

const Nutrition: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<NutritionProduct | null>(null);

  const handleProductSelect = (product: NutritionProduct) => {
    setSelectedProduct(product);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Title level={2}>Nutrition Information</Title>
      <Card style={{ marginBottom: '20px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text strong>Search for food products to see their nutrition information:</Text>
          <NutritionAutocomplete onSelect={handleProductSelect} />
        </Space>
      </Card>
      
      {selectedProduct && (
        <Card title="Selected Product">
          <p><Text strong>Name:</Text> {selectedProduct.name}</p>
          <p><Text strong>Product ID:</Text> {selectedProduct.productId}</p>
        </Card>
      )}
    </div>
  );
};

export default Nutrition;
