import React, { FC, useState } from "react";
import { GeneralPosition } from "components/molecules/general/position_columns";
import { GeneralResion } from "components/molecules/general/resion_columns";
import { GeneralRank } from "components/molecules/general/rank_columns";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel'; // Import InputLabel
import Input from '@mui/material/Input'; // Import Input

interface Props{}

export const MultipleTablesPage: FC<Props> = () => {
  const [giangDay, setGiangDay] = useState(""); // State for "Số tiết phải giảng dạy"
  const [luongCoSo, setLuongCoSo] = useState(""); // State for "Mức lương cơ sở"
  const [thoiGianCongTac, setThoiGianCongTac] = useState(""); // State for "Thời gian công tác để đề xuất tăng hệ số lương"

  const handleGiangDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGiangDay(event.target.value); // Update state for "Số tiết phải giảng dạy"
  };

  const handleLuongCoSoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLuongCoSo(event.target.value); // Update state for "Mức lương cơ sở"
  };

  const handleThoiGianCongTacChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThoiGianCongTac(event.target.value); // Update state for "Thời gian công tác để đề xuất tăng hệ số lương"
  };

  return (
    <div>
      <div>
        <InputLabel htmlFor="input">Số tiết phải giảng dạy</InputLabel>
        <Input
          id="input"
          value={giangDay}
          onChange={handleGiangDayChange}
          style={{ marginBottom: '1rem' }}
        />
      </div>

      <div>
        <InputLabel htmlFor="base_salary">Mức lương cơ sở</InputLabel>
        <Input
          id="base_salary"
          value={luongCoSo}
          onChange={handleLuongCoSoChange}
          style={{ marginBottom: '1rem' }}
        />
      </div>

      <div>
        <InputLabel htmlFor="work_time">Thời gian công tác để đề xuất tăng hệ số lương</InputLabel>
        <Input
          id="work_time"
          value={thoiGianCongTac}
          onChange={handleThoiGianCongTacChange}
          style={{ marginBottom: '1rem' }}
        />
      </div>
      
      <GeneralResion />
      <GeneralPosition />
      <GeneralRank />
    </div>
  );
};
