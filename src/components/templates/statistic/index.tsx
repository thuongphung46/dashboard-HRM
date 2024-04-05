import { Margin } from "@mui/icons-material";
import { BasicColor } from "components/molecules/statistic/chart";
import { GridStatistic } from "components/molecules/statistic/grid";

export const StatisticTemplate = () => {

  return (
    <div>
      <div>
        <label style={{margin:"5px"}} htmlFor="semester">Học kỳ: </label>
        <select style={{margin:"5px"}}>
          <option value="1">Học kỳ I</option>
          <option value="2">Học kỳ II</option>
        </select>

        <label style={{margin:"5px"}} htmlFor="year">Năm học: </label>
        <input style={{margin:"5px"}} type="text" id="year" name="year"/>

        <label style={{margin:"5px"}} htmlFor="department">Khoa: </label>
        <select style={{margin:"5px", width:"20px"}} id="department" name="department">
          {/* {facultyList.map((faculty) => (
            <option key={faculty.content.id} value={faculty.content.name}>
              {faculty.content.name}
            </option>
          ))} */}
        </select>
      

        <label style={{margin:"5px"}} htmlFor="department">Bộ môn: </label>
        <input style={{margin:"5px"}} type="text" id="department" name="department" value="Bộ môn khoa học máy tính" />

      </div>
      <BasicColor />
      <GridStatistic />
    </div>
  );
};
