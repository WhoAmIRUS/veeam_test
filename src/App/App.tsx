import React, { useState } from 'react';
import Config from "../Config";
import Result from "../Result";
import { Box, Container, Tab, Tabs } from "@mui/material";
import TabPanel from "../components/TabPanel";

enum TabsValue {
  Config = 'config',
  Result = 'result'
}

const App = () => {
  const [activeTab, setActiveTab] = useState<TabsValue>(TabsValue.Config);
  const [config, setConfig] = useState<string>('');

  const handleChange = (event: React.SyntheticEvent, newValue: TabsValue) => {
    setActiveTab(newValue)
  }

  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleChange}>
            <Tab label="Config" value={TabsValue.Config} />
            <Tab label="Result" value={TabsValue.Result} />
          </Tabs>
        </Box>
        <TabPanel value={TabsValue.Config} activeTab={activeTab}>
          <Config config={config} onChangeConfig={(value: string) => setConfig(value)}/>
        </TabPanel>
        <TabPanel value={TabsValue.Result} activeTab={activeTab}>
          <Result config={config} />
        </TabPanel>
      </Box>
    </Container>
  );
}

export default App;
