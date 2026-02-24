import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useSearchParams } from 'react-router-dom';

const { RangePicker } = DatePicker;

const urlDateFormat = 'DDMMYYYY';

const getDefaultRanges = (searchParams: URLSearchParams): [Dayjs, Dayjs] => {
  const today = dayjs();

  return searchParams.get('from') && searchParams.get('to')
    ? [
      dayjs(searchParams.get('from'), urlDateFormat).startOf('day'),
      dayjs(searchParams.get('to'), urlDateFormat).endOf('day'),
    ]
    : [today.startOf('day'), today.endOf('day')];
};

interface NutritionFiltersProps {
  onDateRangeChange: (dateRange: [Dayjs, Dayjs]) => void;
}

export const NutritionFilters: React.FC<NutritionFiltersProps> = ({
  onDateRangeChange,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>(getDefaultRanges(searchParams));

  useEffect(() => {
    onDateRangeChange(dateRange);
  }, [dateRange, onDateRangeChange]);

  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null): void => {
    if (dates && dates[0] && dates[1]) {
      const from = dates[0].startOf('day');
      const to = dates[1].endOf('day');
      const newDateRange: [Dayjs, Dayjs] = [from, to];

      setDateRange(newDateRange);
      setSearchParams({ from: from.format(urlDateFormat).toString(), to: to.format(urlDateFormat).toString() });
    }
  };

  return (
    <RangePicker
      value={dateRange}
      onChange={handleDateRangeChange}
      format="DD.MM.YYYY"
      style={{ width: '100%' }}
    />
  );
};