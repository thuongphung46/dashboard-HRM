import React, { ChangeEvent, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Overview } from "./overview";
import { Teaching } from "./teaching";
import { Assess } from "./assess";
import { Guide } from "./guide";
import { ScientificResearch } from "./scientific_research";

interface Props {}

export const Analytic: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
      >
        <Tab label="Tổng quan" />
        <Tab label="Giảng dạy" />
        <Tab label="Đánh giá học phần" />
        <Tab label="HD luận án, luận văn, đồ án" />
        <Tab label="NCKH" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Overview />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Teaching />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Assess />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Guide />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ScientificResearch />
      </TabPanel>
    </div>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
