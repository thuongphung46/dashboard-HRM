import React, { FC, useState, ChangeEvent } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { InfoStaff } from "./info_staff";
import { WorkingHistory } from "./working_history";
import { Analytic } from "components/molecules/staff/tab_analytic";

interface Props {
  staff: any;
}

export const TabDetailStaff: FC<Props> = (props) => {
  const [value, setValue] = useState(0);
  const staff = props.staff || {};

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
      >
        <Tab label="Thông tin chung" />
        <Tab label="Quá trình làm việc" />
        <Tab label="Thống kê" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <InfoStaff />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WorkingHistory />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Analytic />
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
