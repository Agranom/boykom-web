import React, { useMemo, useState } from 'react';
import { Card, Space, Typography, Spin, Row, Col, Collapse } from 'antd';
import { Dayjs } from 'dayjs';
import { NutrientsSummary, useGetNutritionSummary } from '../api/get-nutrition-summary';
import { useGetMeals } from '../api/get-meals';
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
    nutrientNumbers: Array<number>;
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

  const nutrients: NutrientsSummary = data?.nutrients || {};
  const selectedDateRange = useMemo(() => daysDiff > 1 ?
   `${startDate.format(dateFormat)} - ${endDate.format(dateFormat)}` : startDate.format(dateFormat), [daysDiff, startDate, endDate]);

    /**
   * Handles nutrient click to open modal with meal items
   */
    const handleNutrientClick = (nutrientNumbers: Array<number>, nutrientName: string, nutrientUnit: string): void => {
      setModalState({
        isOpen: true,
        nutrientName,
        nutrientUnit,
        nutrientNumbers
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
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Row gutter={16}>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.kcal] ?? 0}
                  desiredValue={2800 * daysDiff}
                  unit="ккал"
                  name="Энергия"
                  onClick={() => handleNutrientClick([nutrientNumbers.kcal], 'Энергия', 'ккал')}
                />
              </Col>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.prot] ?? 0}
                  desiredValue={140 * daysDiff}
                  unit="г"
                  name="Белки"
                  onClick={() => handleNutrientClick([nutrientNumbers.prot], 'Белки', 'г')}
                />
              </Col>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.carbo] ?? 0}
                  desiredValue={370 * daysDiff}
                  unit="г"
                  name="Углеводы"
                  onClick={() => handleNutrientClick([nutrientNumbers.carbo], 'Углеводы', 'г')}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.fat] ?? 0}
                  desiredValue={85 * daysDiff}
                  unit="г"
                  name="Жиры"
                  onClick={() => handleNutrientClick([nutrientNumbers.fat], 'Жиры', 'г')}
                />
              </Col>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.fatSaturated] ?? 0}
                  desiredValue={30 * daysDiff}
                  unit="г"
                  name="Насыщ. жиры"
                  reverseProgress={true}
                  onClick={() => handleNutrientClick([nutrientNumbers.fatSaturated], 'Насыщ. жиры', 'г')}
                />
              </Col>
              <Col span={8}>
                <Nutrient 
                  currentValue={(nutrients[nutrientNumbers.fatMono] ?? 0) + (nutrients[nutrientNumbers.fatPoly] ?? 0)}
                  desiredValue={60 * daysDiff}
                  unit="г"
                  name="Ненасыщ. жиры"
                  onClick={() => handleNutrientClick([nutrientNumbers.fatMono, nutrientNumbers.fatPoly], 'Ненасыщ. жиры', 'г')}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.sugAdded] ?? 0}
                  desiredValue={30 * daysDiff}
                  unit="г"
                  name="Сахар"
                  reverseProgress={true}
                  onClick={() => handleNutrientClick([nutrientNumbers.sugAdded], 'Сахар', 'г')}
                />
              </Col>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.chol] ?? 0}
                  desiredValue={0}
                  unit="мг"
                  name="Холестерин"
                />
              </Col>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients[nutrientNumbers.fiber] ?? 0}
                  desiredValue={30 * daysDiff}
                  unit="г"
                  name="Клетчатка"
                  onClick={() => handleNutrientClick([nutrientNumbers.fiber], 'Клетчатка', 'г')}
                />
              </Col>
            </Row>
            <Collapse>
              <Panel key="1" header="Минералы">
                <Row gutter={16}>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.cal] ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="Кальций"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.iron] ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="Железо"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.mag] ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="Магний"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.iod] ?? 0}
                      desiredValue={0}
                      unit="мкг"
                      name="Йод"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.zinc] ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="Цинк"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient     
                      currentValue={nutrients[nutrientNumbers.sod] ?? 0}
                      desiredValue={2000 * daysDiff}
                      unit="мг"
                      name="Натрий"
                      reverseProgress={true}
                      onClick={() => handleNutrientClick([nutrientNumbers.sod], 'Натрий', 'мг')}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={sumValues(nutrients[nutrientNumbers.epa] ?? 0, nutrients[nutrientNumbers.dha] ?? 0, nutrients[nutrientNumbers.dpa] ?? 0) ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="Омега-3"
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
                      unit="мкг"
                      name="A"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vD] ?? 0}
                      desiredValue={0}
                      unit="мкг"
                      name="D"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vE] ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="E"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vC] ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="C"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vK1] ?? 0}
                      desiredValue={0}
                      unit="мкг"
                      name="K1"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vK2] ?? 0}
                      desiredValue={0}
                      unit="мкг"
                      name="K2"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vB1] ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="B1"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vB2] ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="B2"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vB3] ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="B3"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vB5] ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="B5"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vB6] ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="B6"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vB9] ?? 0}
                      desiredValue={0}
                      unit="мкг"
                      name="B9"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients[nutrientNumbers.vB12] ?? 0}
                      desiredValue={0}
                      unit="мкг"
                      name="B12"
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
          nutrientNumbers={modalState.nutrientNumbers}
        />
      )}
    </Card>
  );
};

export { NutritionDashboard };