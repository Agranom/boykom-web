import React, { useEffect, useState } from 'react';
import { Card, DatePicker, Space, Typography, Spin, Row, Col, Statistic, Collapse, Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useGetNutritionSummary } from '../api/get-nutrition-summary';
import { Nutrients } from '@agranom/boykom-common';
import { useSearchParams } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Panel } = Collapse;

const urlDateFormat = 'DDMMYYYY';

const formatNutrientValue = (value: number | null | undefined): string => {
  return `~${(value ?? 0).toFixed(2)}`;
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
  }, [searchParams]);


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
                <Tooltip title={nutrients.kj ? `${formatNutrientValue(nutrients.kj)} (кДж)` : ''}>
                  <Statistic title="Энергия" value={formatNutrientValue(nutrients.kcal)} suffix="кКал" />
                </Tooltip>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="Белки" value={formatNutrientValue(nutrients.prot)} suffix="г" />
              </Col>
              <Col span={8}>
                <Tooltip title={
                  <>
                    <p>Насыщенные жиры: {formatNutrientValue(nutrients.fatSaturated)} г</p>
                    <p>Ненасыщенные
                      жиры: {formatNutrientValue((nutrients.fatMono || 0) + (nutrients.fatPoly || 0))} г</p>
                  </>
                }>
                  <Statistic title="Жиры" value={formatNutrientValue(nutrients.fat)} suffix="г" />
                </Tooltip>
              </Col>
              <Col span={8}>
                <Statistic title="Углеводы" value={formatNutrientValue(nutrients.carbo)} suffix="г" />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Tooltip title="Основной показатель для здоровья">
                  <Statistic title="Сахара (добавленые)" value={formatNutrientValue(nutrients.sugAdded)} suffix="г" />
                </Tooltip>
              </Col>
              <Col span={8}>
                <Tooltip title="Холестерин из пищи — не то же самое, что ‘плохой’ холестерин в крови">
                  <Statistic title="Холестерин" value={formatNutrientValue(nutrients.chol)} suffix="мг" />
                </Tooltip>
              </Col>
              <Col span={8}>
                <Statistic title="Клетчатка" value={formatNutrientValue(nutrients.fiber)} suffix="г" />
              </Col>
            </Row>
            <Collapse>
              <Panel key="1" header="Минералы">
                <Row gutter={16}>
                  <Col span={8}>
                    <Statistic title="Кальций" value={formatNutrientValue(nutrients.cal)} suffix="мг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Железо" value={formatNutrientValue(nutrients.iron)} suffix="мг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Магний" value={formatNutrientValue(nutrients.mag)} suffix="мг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Йод" value={formatNutrientValue(nutrients.iod)} suffix="мкг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Цинк" value={formatNutrientValue(nutrients.zinc)} suffix="мг" />
                  </Col>
                  <Col span={8}>
                    <Tooltip title={
                      <p>Соль: {formatNutrientValue(nutrients.salt)} мг</p>
                    }>
                      <Statistic title="Натрий" value={formatNutrientValue(nutrients.sod)} suffix="мг" />
                    </Tooltip>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
            <Collapse>
              <Panel header="Витамины" key="2">
                <Row gutter={16}>
                  <Col span={8}>
                    <Statistic title="Витамин A" value={formatNutrientValue(nutrients.vA)} suffix="мкг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Витамин D3" value={formatNutrientValue(nutrients.vD3)} suffix="мкг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Витамин E" value={formatNutrientValue(nutrients.vE)} suffix="мг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Витамин C" value={formatNutrientValue(nutrients.vC)} suffix="мг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Витамин K1" value={formatNutrientValue(nutrients.vK1)} suffix="мкг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Витамин K2" value={formatNutrientValue(nutrients.vK2)} suffix="мкг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Витамин B1" value={formatNutrientValue(nutrients.vB1)} suffix="мг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Витамин B2" value={formatNutrientValue(nutrients.vB2)} suffix="мг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Витамин B3" value={formatNutrientValue(nutrients.vB3)} suffix="мг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Витамин B5" value={formatNutrientValue(nutrients.vB5)} suffix="мг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Витамин B6" value={formatNutrientValue(nutrients.vB6)} suffix="мг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Витамин B9" value={formatNutrientValue(nutrients.vB9)} suffix="мкг" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Витамин B12" value={formatNutrientValue(nutrients.vB12)} suffix="мкг" />
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