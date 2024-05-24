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
import { Action } from "types/action";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
interface Props extends Action {
  data: StaffDetail;
}

export const Analytic = ({ data, action }: Props) => {
  const [value, setValue] = useState(0);
  const [schoolYear, setSchoolYear] = useState('');

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleSchoolYearChange = (event: SelectChangeEvent<string>) => {
    setSchoolYear(event.target.value);
  };

  return (
    <div>
      <FormControl size="small" variant="outlined" style={{ minWidth: 200, marginBottom: 2 }}>
        <InputLabel id="school-year-label">Năm học</InputLabel>
        <Select
          labelId="school-year-label"
          id="school-year"
          value={schoolYear}
          onChange={handleSchoolYearChange}
          label="Năm học"
        >
          <MenuItem value={"2023-2024"}>2023-2024</MenuItem>
          <MenuItem value={"2022-2023"}>2022-2023</MenuItem>
          <MenuItem value={"2021-2022"}>2021-2022</MenuItem>
          {/* Add more school years as needed */}
        </Select>
      </FormControl>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation">
        <Tab label="Tổng quan" />
        <Tab label="Giảng dạy" />
        <Tab label="Đánh giá học phần" />
        <Tab label="HD luận án, luận văn, đồ án" />
        <Tab label="NCKH" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Overview data={data.summary} all_data={data} schoolYear={schoolYear}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Teaching data={data.teaching} schoolYear={schoolYear}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Assess data={data.examCourses} schoolYear={schoolYear}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Guide data={data.instructProject} schoolYear={schoolYear}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ScientificResearch data={data} schoolYear={schoolYear}/>
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
      {...other}>
      {value === index && <Box sx={{ p: 3, height:"calc(100vh - 344px)", overflow:"auto" }}>{children}</Box>}
    </div>
  );
}
