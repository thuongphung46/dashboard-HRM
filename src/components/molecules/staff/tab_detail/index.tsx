import React, { FC, useState, ChangeEvent, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { InfoStaff } from "./info_staff";
import { WorkingHistory } from "./working_history";
import { Analytic } from "components/molecules/staff/tab_analytic";
import { useParams } from "react-router-dom";
import { useGetStaff } from "services/hooks/useGetListStaff";

interface Props {}

export const TabDetailStaff: FC<Props> = () => {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const { data, loading } = useGetStaff(Number(id));

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
        <Tab label="Quá trình làm việc tại đơn vị" />
        <Tab label="Thống kê" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {loading ? <div>Loading...</div> : <InfoStaff data={data} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
      {loading ? <div>Loading...</div> : <WorkingHistory data={data} />}
        {/* <WorkingHistory /> */}
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
