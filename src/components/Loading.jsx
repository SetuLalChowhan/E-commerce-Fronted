import React from "react";
import CircularProgress from '@mui/joy/CircularProgress';

const Loading = () => {
  return (
    <div>
      <CircularProgress variant="solid"  color="primary" size="lg"  />
    </div>
  );
};

export default Loading;
