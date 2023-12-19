import { Box, Collapse, IconButton, Tab } from '@mui/material';
import { ReactNode, useState } from 'react';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { arrowBtn, headerWrapper } from './styles';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface TabPanelProps {
  tabsPanels: ReactNode[];
  tabsLabels: string[];
}

const CustomTabPanel = ({ tabsPanels, tabsLabels }: TabPanelProps) => {
  const [tab, setTab] = useState('0');
  const [open, setOpen] = useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tab}>
        <Box sx={headerWrapper}>
          <TabList
            onChange={handleChange}
            aria-label="query variables and headers"
            indicatorColor="secondary"
            textColor="inherit"
          >
            {tabsLabels.map((label, index) => {
              return (
                <Tab
                  key={label}
                  label={label}
                  value={index + ''}
                  id={`tab-${index}`}
                  aria-controls={`tabpanel-${index}`}
                />
              );
            })}
          </TabList>
          <IconButton
            onClick={() => setOpen(!open)}
            aria-label="expand"
            size="small"
            sx={arrowBtn}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {tabsPanels.map((element, index) => {
            return (
              <TabPanel key={index} value={index + ''}>
                {element}
              </TabPanel>
            );
          })}
        </Collapse>
      </TabContext>
    </Box>
  );
};

export default CustomTabPanel;
