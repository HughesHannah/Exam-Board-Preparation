import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function TableSkeleton() {
  return (
    <Box sx={{ width: 500 }}>
      <Skeleton animation="wave"/>
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
}