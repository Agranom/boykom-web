import React, { useMemo, useState } from 'react';
import { Card, Space, Typography, Spin, Row, Col, Collapse } from 'antd';
import { Dayjs } from 'dayjs';
import { NutrientsSummary, useGetNutritionSummary } from '../api/get-nutrition-summary';
import { useGetMeals } from '../api/get-meals';
import { useGetNutrientsMetadata } from '../api/get-nutrients-metadata';
import { Nutrient } from './Nutrient';
import { NutrientModal } from './NutrientModal';
import { dateFormat } from '../const/date-format';
import { nutrientNumbers } from '@agranom/boykom-common';

const { Title } = Typography;
const { Panel } = Collapse;

const sumValues = (...values: (number | null | undefined)[]): number => {
  if (!Array.isArray(values) || !values.length) {
    return 0;
  }
  return values.reduce((acc: number, value) => acc + (value ?? 0), 0);
};

interface NutritionDashboardProps {
  startDate: Dayjs;
  endDate: Dayjs;
}

const NutritionDashboard: React.FC<NutritionDashboardProps> = ({ startDate, endDate }) => {
  const daysDiff = useMemo(() => endDate.diff(startDate, 'days') + 1, [startDate, endDate]);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    nutrientName: string;
    nutrientUnit: string;
    nutrientNumber: number;
  } | null>(null);

  const { data, isLoading } = useGetNutritionSummary({
    from: startDate.toDate(),
    to: endDate.toDate(),
  });

  const { data: meals = [] } = useGetMeals({
    page: 1,
    limit: 100, // Get more meals to show comprehensive data
    from: startDate.toDate(),
    to: endDate.toDate(),
  });

  const { data: nutrientsMetadata = {}, isLoading: isMetadataLoading } = useGetNutrientsMetadata();

  const nutrients: NutrientsSummary = data?.nutrients || {};
  const selectedDateRange = useMemo(() => daysDiff > 1 ?
   `${startDate.format(dateFormat)} - ${endDate.format(dateFormat)}` : startDate.format(dateFormat), [daysDiff, startDate, endDate]);

    /**
   * Handles nutrient click to open modal with meal items
   */
    const handleNutrientClick = (nutrientNumber: number): void => {
      const metadata = nutrientsMetadata[nutrientNumber];
      if (!metadata) return;
      
      setModalState({
        isOpen: true,
        nutrientName: metadata.name,
        nutrientUnit: metadata.unit,
        nutrientNumber
      });
    };
  
    /**
     * Closes the nutrient modal
     */
    const handleCloseModal = (): void => {
      setModalState(null);
    };

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Title level={4}>Сводка по питанию за {selectedDateRange}</Title>
        {isLoading || isMetadataLoading ? (
          <Spin size="large" />
        ) : (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Row gutter={16}>
              <Col span={24} style={{ textAlign: 'center' }}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.kcal] ?? 0}
                  desiredValue={2800 * daysDiff}
                  metadata={nutrientsMetadata[nutrientNumbers.kcal]}
                  onClick={() => handleNutrientClick(nutrientNumbers.kcal)}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.prot] ?? 0}
                  desiredValue={140 * daysDiff}
                  metadata={nutrientsMetadata[nutrientNumbers.prot]}
                  onClick={() => handleNutrientClick(nutrientNumbers.prot)}
                />
              </Col>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.fat] ?? 0}
                  desiredValue={85 * daysDiff}
                  metadata={nutrientsMetadata[nutrientNumbers.fat]}
                  onClick={() => handleNutrientClick(nutrientNumbers.fat)}
                />
              </Col>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.carbo] ?? 0}
                  desiredValue={370 * daysDiff}
                  metadata={nutrientsMetadata[nutrientNumbers.carbo]}
                  onClick={() => handleNutrientClick(nutrientNumbers.carbo)}
                />
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.sugAdded] ?? 0}
                  desiredValue={30 * daysDiff}
                  metadata={nutrientsMetadata[nutrientNumbers.sugAdded]}
                  reverseProgress={true}
                  onClick={() => handleNutrientClick(nutrientNumbers.sugAdded)}
                />
              </Col>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.chol] ?? 0}
                  desiredValue={0}
                  metadata={nutrientsMetadata[nutrientNumbers.chol]}
                />
              </Col>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.fiber] ?? 0}
                  desiredValue={30 * daysDiff}
                  metadata={nutrientsMetadata[nutrientNumbers.fiber]}
                  onClick={() => handleNutrientClick(nutrientNumbers.fiber)}
                />
              </Col>
            </Row>
            <Collapse>
              <Panel key="fats" header="Жиры">
                <Row gutter={16}>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.fatSaturated] ?? 0}
                      desiredValue={30 * daysDiff}
                      metadata={nutrientsMetadata[nutrientNumbers.fatSaturated]}
                      reverseProgress={true}
                      onClick={() => handleNutrientClick(nutrientNumbers.fatSaturated)}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.fatMono] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.fatMono]}
                      onClick={() => handleNutrientClick(nutrientNumbers.fatMono)}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.fatPoly] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.fatPoly]}
                      onClick={() => handleNutrientClick(nutrientNumbers.fatPoly)}
                    />
                  </Col>
                </Row>
              </Panel>
            </Collapse>
            <Collapse>
              <Panel key="1" header="Минералы">
                <Row gutter={16}>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.cal] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.cal]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.iron] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.iron]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.mag] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.mag]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.iod] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.iod]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.zinc] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.zinc]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient     
                      currentValue={nutrients[nutrientNumbers.sod] ?? 0}
                      desiredValue={2000 * daysDiff}
                      metadata={nutrientsMetadata[nutrientNumbers.sod]}
                      reverseProgress={true}
                      onClick={() => handleNutrientClick(nutrientNumbers.sod)}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={sumValues(nutrients[nutrientNumbers.epa] ?? 0, nutrients[nutrientNumbers.dha] ?? 0, nutrients[nutrientNumbers.dpa] ?? 0) ?? 0}
                      desiredValue={0}
                      metadata={{ name: 'Омега-3', unit: 'мг', order: 999 }}
                    />
                  </Col>
                </Row>
              </Panel>
            </Collapse>
            <Collapse>
              <Panel header="Витамины" key="2">
                <Row gutter={16}>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vA] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.vA]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vD] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.vD]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vE] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.vE]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vC] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.vC]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vK1] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.vK1]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vK2] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.vK2]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vB1] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.vB1]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vB2] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.vB2]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vB3] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.vB3]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vB5] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.vB5]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vB6] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.vB6]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vB9] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.vB9]}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vB12] ?? 0}
                      desiredValue={0}
                      metadata={nutrientsMetadata[nutrientNumbers.vB12]}
                    />
                  </Col>
                </Row>
              </Panel>
            </Collapse>

          </Space>
        )}
      </Space>
      
      {modalState && (
        <NutrientModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          nutrientName={modalState.nutrientName}
          nutrientUnit={modalState.nutrientUnit}
          meals={meals}
          nutrientNumber={modalState.nutrientNumber}
        />
      )}
    </Card>
  );
};

export { NutritionDashboard };