import React, { useState, useEffect } from 'react';
import { Typography, Tooltip } from 'antd';
import styles from './Nutrient.module.scss';

const { Text } = Typography;

interface NutrientProps {
  /** Current nutrient value */
  currentValue: number;
  /** Desired/target nutrient value */
  desiredValue: number;
  /** Unit of measurement (e.g., 'kcal', 'g', 'mg') */
  unit: string;
  /** Name of the nutrient */
  name: string;
  /** Size of the circle in pixels */
  size?: number;
  reverseProgress?: boolean;
  /** Click handler for the nutrient */
  onClick?: () => void;
}

/**
 * Calculates the color based on progress percentage with smooth transitions
 * Red (0%) -> Orange (25%) -> Yellow (50%) -> Light Green (90%) -> Green (100%+)
 */
const calculateColor = (progress: number): string => {
  // Clamp progress between 0 and 1 for color calculation
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  
  if (clampedProgress <= 0.25) {
    // Red to Orange (0% to 25%)
    const ratio = clampedProgress * 4; // 0 to 1
    const red = 255;
    const green = Math.round(165 * ratio); // 0 to 165 (orange)
    return `rgb(${red}, ${green}, 0)`;
  } else if (clampedProgress <= 0.5) {
    // Orange to Yellow (25% to 50%)
    const ratio = (clampedProgress - 0.25) * 4; // 0 to 1
    const red = 255;
    const green = Math.round(165 + (255 - 165) * ratio); // 165 to 255
    return `rgb(${red}, ${green}, 0)`;
  } else if (clampedProgress < 0.90) {
    // Yellow to Yellow-Green (50% to 90%)
    const ratio = (clampedProgress - 0.5) * 4; // 0 to 1
    const red = Math.round(255 - 100 * ratio); // 255 to 155 (yellow-green)
    const green = 255;
    return `rgb(${red}, ${green}, 0)`;
  } else {
    // Yellow-Green to Green (90% to 100%)
    const ratio = (clampedProgress - 0.9) * 4; // 0 to 1
    const red = Math.round(155 - 155 * ratio); // 155 to 0 (pure green)
    const green = 255;
    return `rgb(${red}, ${green}, 0)`;
  }
};

const calculateReverseColor = (progress: number): string => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  if (clampedProgress <= 0.25) {
     // Yellow-Green to Green (0% to 25%)
     const ratio = clampedProgress * 4; // 0 to 1
     const red = Math.round(155 - 155 * ratio); // 155 to 0 (pure green)
     const green = 255;
     return `rgb(${red}, ${green}, 0)`;
  } else if (clampedProgress <= 0.5) {
      // Yellow to Yellow-Green (25% to 50%)
      const ratio = (clampedProgress - 0.25) * 4; // 0 to 1
      const red = Math.round(255 - 100 * ratio); // 255 to 155 (yellow-green)
      const green = 255;
      return `rgb(${red}, ${green}, 0)`;
  } else if (clampedProgress < 0.75) {
    // Orange to Yellow (50% to 90%)
    const ratio = (clampedProgress - 0.5) * 4; // 0 to 1
    const red = 255;
    const green = Math.round(165 + (255 - 165) * ratio); // 165 to 255
    return `rgb(${red}, ${green}, 0)`;
  } else {
     // Red to Orange (90% to 100%)
     const ratio = (clampedProgress - 0.9) * 4; // 0 to 1
     const red = 255;
     const green = Math.round(165 * ratio); // 0 to 165 (orange)
     return `rgb(${red}, ${green}, 0)`;
  }
};
export const Nutrient: React.FC<NutrientProps> = ({
  currentValue,
  desiredValue,
  unit,
  name,
  size = 120,
  reverseProgress = false,
  onClick,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = (): void => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const progress = desiredValue > 0 ? currentValue / desiredValue : 0;
  const progressPercentage = progress * 100;
  const color = reverseProgress ? calculateReverseColor(progress) : calculateColor(progress);
  
  // Use responsive size: 100px on mobile, provided size on desktop
  const responsiveSize = isMobile ? 100 : size;
  
  // SVG circle parameters
  const radius = (responsiveSize - 20) / 2; // Leave some padding
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (Math.min(progressPercentage, 100) / 100) * circumference;
  
  const center = responsiveSize / 2;
  const strokeWidth = isMobile ? 10 : 12; // Slightly thinner stroke on mobile

  const tooltipTitle = desiredValue > 0 ? (
    <p>{Math.round(progressPercentage)}% из {desiredValue.toLocaleString()} {unit}</p>
  ) : (
    <p>Нет данных</p>
  );

  return (
    <Tooltip 
      title={tooltipTitle} 
      placement="top"
      mouseLeaveDelay={0}
      zIndex={999} // Lower z-index than modal (default modal z-index is 1000)
    >
      <div 
        className={styles.nutrientContainer} 
        style={{ 
          width: responsiveSize, 
          height: responsiveSize,
          cursor: onClick ? 'pointer' : 'default'
        }}
        onClick={onClick}
      >
        <svg width={responsiveSize} height={responsiveSize} className={styles.circleChart}>
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth={strokeWidth}
            className={styles.backgroundCircle}
          />
          
          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={styles.progressCircle}
            transform={`rotate(-90 ${center} ${center})`}
          />
        </svg>
        
        {/* Center content */}
        <div className={styles.centerContent}>
          <div className={styles.currentValue}>
            <Text type="secondary" className={styles.nutrientName}>
              {name}
            </Text>
            <Text strong className={styles.valueText}>
              {currentValue.toLocaleString()}
            </Text>
            <Text type="secondary" className={styles.unitText}>
              {unit}
            </Text>
          </div>
        </div>
      </div>
      
    </Tooltip>
  );
};