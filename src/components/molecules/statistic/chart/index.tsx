import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Tableau3 = ["#4e79a7", "#f28e2c", "#e15759"];

const chartsParams = {
  margin: { bottom: 20, left: 25, right: 5 },
  height: 300,
};
export const BasicColor = () => {
  const [color, setColor] = React.useState("#4e79a7");

  const handleChange = ({ event, nextColor }: any) => {
    setColor(nextColor);
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <LineChart
        sx={{
          //This sx does nothing
          "& .MuiXAxis-root line": {
            stroke: "blue", // Change the color of the x-axis line
          },
          "& .MuiYAxis-root line": {
            stroke: "blue", // Change the color of the y-axis line
          },
        }}
        {...chartsParams}
        series={[
          {
            data: [15, 23, 18, 19, 13],
            label: "example",
            color,
          },
        ]}
      />
      <ToggleButtonGroup
        // orientation="vertical"
        value={color}
        exclusive
        onChange={handleChange}
      >
        {Tableau3.map((value) => (
          <ToggleButton key={value} value={value} sx={{ p: 1 }}>
            <div
              style={{
                width: 15,
                height: 15,
                backgroundColor: value,
                display: "inline-block",
              }}
            />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};
