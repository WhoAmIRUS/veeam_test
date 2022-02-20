import { Box } from "@mui/material";
import React from "react";

const TabPanel: React.FC<{ value: unknown, activeTab: unknown }> = (props) => {
  const { children, value, activeTab } = props;

  return (
    <div hidden={value !== activeTab}>
      {value === activeTab && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
