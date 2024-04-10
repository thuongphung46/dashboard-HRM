import React, { ChangeEvent, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Overview } from "./overview";
import { Teaching } from "./teaching";
import { Assess } from "./assess";
import { Guide } from "./guide";
import { ScientificResearch } from "./scientific_research";
import { StaffDetail } from "types/ApplicationType";

interface Props {
  data: StaffDetail;
}

export const Analytic = ({ data }: Props) => {
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
        <Overview data={data.summary} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Teaching data={data.teaching} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Assess data={data.examCourses} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Guide data={data.instructProject} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ScientificResearch data={data} />
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
