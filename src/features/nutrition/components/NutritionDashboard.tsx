import React, { useEffect, useState } from 'react';
import { Card, DatePicker, Space, Typography, Spin, Row, Col, Statistic, Collapse, Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useGetNutritionSummary } from '../api/get-nutrition-summary';
import { Nutrients } from '@agranom/boykom-common';
import { useSearchParams } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { Panel } = Collapse;

const urlDateFormat = 'DDMMYYYY';

const formatNutrientValue = (value: number | null | undefined): string => {
  if (value == null) {
    return '—';
  }
  return `~${value.toFixed(2)}`;
};

const getDefaultRanges = (searchParams: URLSearchParams): [Dayjs, Dayjs] => {
  const today = dayjs();

  return searchParams.get('from') && searchParams.get('to')
    ? [dayjs(searchParams.get('from'), urlDateFormat), dayjs(searchParams.get('to'), urlDateFormat)]
    : [today.startOf('day'), today.endOf('day')]
}

const NutritionDashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>(getDefaultRanges(searchParams));
  const { data, isLoading, refetch } = useGetNutritionSummary({
    from: dateRange[0].toDate(),
    to: dateRange[1].toDate(),
  });

  useEffect(() => {
    void refetch()
  }, [searchParams])



  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null): void => {
    if (dates && dates[0] && dates[1]) {
      const from = dates[0].startOf('day');
      const to = dates[1].endOf('day');

      setDateRange([from, to]);
      setSearchParams({from: from.format(urlDateFormat).toString(), to: to.format(urlDateFormat).toString()})
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
          <Spin size="large"/>
        ) : Object.keys(nutrients).length ? (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Row gutter={16}>
              <Col span={6}>
                <Tooltip title={nutrients.kj ? `${formatNutrientValue(nutrients.kj)} (кДж)` : ''}>
                  <Statistic title="Энергия (кКал)" value={formatNutrientValue(nutrients.kcal)}/>
                </Tooltip>
              </Col>
              <Col span={6}>
                <Statistic title="Белки (г)" value={formatNutrientValue(nutrients.prot)} suffix="г"/>
              </Col>
              <Col span={6}>
                <Tooltip title={
                  <>
                    <p>Насыщенные жиры: {formatNutrientValue(nutrients.fatSaturated)} г</p>
                    <p>Ненасыщенные жиры: {formatNutrientValue((nutrients.fatMono || 0) + (nutrients.fatPoly || 0))} г</p>
                  </>
                }>
                  <Statistic title="Жиры (г)" value={formatNutrientValue(nutrients.fat)} suffix="г"/>
                </Tooltip>
              </Col>
              <Col span={6}>
                <Statistic title="Углеводы (г)" value={formatNutrientValue(nutrients.carbo)} suffix="г"/>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Statistic title="Сахар (г)" value={formatNutrientValue(nutrients.sug)} suffix="г"/>
              </Col>
              <Col span={6}>
                <Statistic title="Холестерин (мг)" value={formatNutrientValue(nutrients.chol)} suffix="мг"/>
              </Col>
              <Col span={6}>
                <Statistic title="Соль (г)" value={formatNutrientValue(nutrients.salt)} suffix="г"/>
              </Col>
            </Row>
            <Collapse>
              <Panel key="1" header="Минералы">
                <Row gutter={16}>
                  <Col span={6}>
                    <Statistic title="Кальций (мг)" value={formatNutrientValue(nutrients.cal)} suffix="мг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Железо (мг)" value={formatNutrientValue(nutrients.iron)} suffix="мг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Магний (мг)" value={formatNutrientValue(nutrients.mag)} suffix="мг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Йод (мкг)" value={formatNutrientValue(nutrients.iod)} suffix="мкг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Цинк (мг)" value={formatNutrientValue(nutrients.zinc)} suffix="мг"/>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
            <Collapse>
              <Panel header="Витамины" key="2">
                <Row gutter={16}>
                  <Col span={6}>
                    <Statistic title="Витамин A (мкг)" value={formatNutrientValue(nutrients.vA)} suffix="мкг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Витамин D3 (мкг)" value={formatNutrientValue(nutrients.vD3)} suffix="мкг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Витамин E (мг)" value={formatNutrientValue(nutrients.vE)} suffix="мг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Витамин C (мг)" value={formatNutrientValue(nutrients.vC)} suffix="мг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Витамин K1 (мкг)" value={formatNutrientValue(nutrients.vK1)} suffix="мкг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Витамин K2 (мкг)" value={formatNutrientValue(nutrients.vK2)} suffix="мкг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Витамин B1 (мг)" value={formatNutrientValue(nutrients.vB1)} suffix="мг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Витамин B2 (мг)" value={formatNutrientValue(nutrients.vB2)} suffix="мг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Витамин B3 (мг)" value={formatNutrientValue(nutrients.vB3)} suffix="мг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Витамин B5 (мг)" value={formatNutrientValue(nutrients.vB5)} suffix="мг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Витамин B6 (мг)" value={formatNutrientValue(nutrients.vB6)} suffix="мг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Витамин B9 (мкг)" value={formatNutrientValue(nutrients.vB9)} suffix="мкг"/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="Витамин B12 (мкг)" value={formatNutrientValue(nutrients.vB12)} suffix="мкг"/>
                  </Col>
                </Row>
              </Panel>
            </Collapse>

          </Space>
        ) : (
          <Text>Нет данных за выбранный период</Text>
        )}
      </Space>
    </Card>
  );
};

export { NutritionDashboard };