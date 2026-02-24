import React, { useEffect, useState } from 'react';
import { Card, DatePicker, Space, Typography, Spin, Row, Col, Collapse } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useGetNutritionSummary } from '../api/get-nutrition-summary';
import { Nutrients } from '@agranom/boykom-common';
import { useSearchParams } from 'react-router-dom';
import { Nutrient } from './Nutrient';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Panel } = Collapse;

const urlDateFormat = 'DDMMYYYY';

const sumValues = (...values: (number | null | undefined)[]): number => {
  if (!Array.isArray(values) || !values.length) {
    return 0;
  }
  return values.reduce((acc: number, value) => acc + (value ?? 0), 0);
};

const getDefaultRanges = (searchParams: URLSearchParams): [Dayjs, Dayjs] => {
  const today = dayjs();

  return searchParams.get('from') && searchParams.get('to')
    ? [
      dayjs(searchParams.get('from'), urlDateFormat).startOf('day'),
      dayjs(searchParams.get('to'), urlDateFormat).endOf('day'),
    ]
    : [today.startOf('day'), today.endOf('day')];
};

const NutritionDashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>(getDefaultRanges(searchParams));
  const { data, isLoading, refetch } = useGetNutritionSummary({
    from: dateRange[0].toDate(),
    to: dateRange[1].toDate(),
  });

  useEffect(() => {
    void refetch();
  }, [searchParams, refetch]);


  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null): void => {
    if (dates && dates[0] && dates[1]) {
      const from = dates[0].startOf('day');
      const to = dates[1].endOf('day');

      setDateRange([from, to]);
      setSearchParams({ from: from.format(urlDateFormat).toString(), to: to.format(urlDateFormat).toString() });
    }
  };

  const nutrients: Nutrients = data?.nutrients || {} as Nutrients;

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Title level={4}>Сводка по питанию</Title>
        <RangePicker
          value={dateRange}
          onChange={handleDateRangeChange}
          format="DD.MM.YYYY"
          style={{ width: '100%' }}
        />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Row gutter={16}>
              <Col span={24} className="text-center">
                <Nutrient 
                  currentValue={nutrients.kcal ?? 0}
                  desiredValue={2800}
                  unit="ккал"
                  name="Энергия"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients.prot ?? 0}
                  desiredValue={140}
                  unit="г"
                  name="Белки"
                />
              </Col>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients.fat ?? 0}
                  desiredValue={85}
                  unit="г"
                  name="Жиры"
                />
              </Col>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients.carbo ?? 0}
                  desiredValue={370}
                  unit="г"
                  name="Углеводы"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients.sugAdded ?? 0}
                  desiredValue={30}
                  unit="г"
                  name="Сахар"
                  reverseProgress={true}
                />
              </Col>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients.chol ?? 0}
                  desiredValue={0}
                  unit="мг"
                  name="Холестерин"
                />
              </Col>
              <Col span={8}>
                <Nutrient 
                  currentValue={nutrients.fiber ?? 0}
                  desiredValue={30}
                  unit="г"
                  name="Клетчатка"
                />
              </Col>
            </Row>
            <Collapse>
              <Panel key="1" header="Минералы">
                <Row gutter={16}>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.cal ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="Кальций"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.iron ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="Железо"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.mag ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="Магний"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.iod ?? 0}
                      desiredValue={0}
                      unit="мкг"
                      name="Йод"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.zinc ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="Цинк"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient     
                      currentValue={nutrients.sod ?? 0}
                      desiredValue={2000}
                      unit="мг"
                      name="Натрий"
                      reverseProgress={true}
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={sumValues(nutrients.epa, nutrients.dha, nutrients.dpa) ?? 0}
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
                      currentValue={nutrients.vA ?? 0}
                      desiredValue={0}
                      unit="мкг"
                      name="A"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.vD ?? 0}
                      desiredValue={0}
                      unit="мкг"
                      name="D"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.vE ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="E"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.vC ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="C"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.vK1 ?? 0}
                      desiredValue={0}
                      unit="мкг"
                      name="K1"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.vK2 ?? 0}
                      desiredValue={0}
                      unit="мкг"
                      name="K2"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.vB1 ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="B1"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.vB2 ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="B2"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.vB3 ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="B3"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.vB5 ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="B5"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.vB6 ?? 0}
                      desiredValue={0}
                      unit="мг"
                      name="B6"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.vB9 ?? 0}
                      desiredValue={0}
                      unit="мкг"
                      name="B9"
                    />
                  </Col>
                  <Col span={8}>
                    <Nutrient 
                      currentValue={nutrients.vB12 ?? 0}
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
    </Card>
  );
};

export { NutritionDashboard };