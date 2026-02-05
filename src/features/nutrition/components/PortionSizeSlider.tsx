import { Slider } from 'antd'

interface PortionSizeSliderProps {
    value: number;
    onChange: (value: number) => void;
    onChangeComplete: (value: number) => void;
}

export const PortionSizeSlider = ({ value, onChange, onChangeComplete }: PortionSizeSliderProps) => {
    return (
        <Slider
            min={1}
            max={1000}
            value={value}
            onChange={onChange}
            onChangeComplete={onChangeComplete}
            marks={{
                1: '1г',
                100: '100г',
                250: '250г',
                500: '500г',
                750: '750г',
                1000: '1000г',
            }}
            tooltip={{
                formatter: (value) => `${value}г`,
                placement: 'top',
            }}
        />
    );
}