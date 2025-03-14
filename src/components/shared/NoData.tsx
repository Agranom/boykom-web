import { Box, Typography, Paper } from '@mui/material';
import { InboxOutlined } from '@mui/icons-material';

interface INoDataProps {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
}

const NoData = ({ 
  message = 'No data available', 
  icon = <InboxOutlined className="text-gray-400" sx={{ fontSize: 48 }} />,
  className = ''
}: INoDataProps) => {
  return (
    <Paper 
      elevation={0}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <Box className="mb-4">
        {icon}
      </Box>
      <Typography 
        variant="h6" 
        className="text-gray-600 font-medium"
      >
        {message}
      </Typography>
    </Paper>
  );
};

export default NoData; 