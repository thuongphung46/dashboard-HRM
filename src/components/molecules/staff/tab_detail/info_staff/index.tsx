import React, { FC, useCallback, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { GridRowId } from "@mui/x-data-grid";
import { GridTrainingSummary } from "../grid_training_summary";

type Props = {
  data: any;
};

export const InfoStaff = ({ data }: Props) => {
  const [isAddingRow, setIsAddingRow] = useState(false);
  const gridRef = useRef<any>(null);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]); // State để lưu trữ các dòng được chọn
  const [formData, setFormData] = useState<any>({});
  const [dataSource, setDataSource] = useState<any[]>(
    data?.staffWorkingHistories
  );

  data.identityBirthPlace2 = data?.identityBirthPlace;
  data?.staffAdmissions.forEach((item: any) => {
    if (item.type === "doan_tncs_hcm") {
      data.doan_tncs_hcm = item.date;
    }
    if (item.type === "dang_csvn") {
      data.dang_csvn = item.date;
    }
  });
  const fieldsData = [
    { id: "username", label: "Mã nhân viên", type: "text" },
    { id: "fullName", label: "Họ và tên", type: "text" },
    {
      id: "gender",
      label: "Giới tính",
      type: "select",
      options: ["Nam", "Nữ"],
    },
    { id: "dateOfBirth", label: "Ngày sinh", type: "date" },
    { id: "personalEmail", label: "Email", type: "text" },
    { id: "phoneNumber", label: "Số điện thoại", type: "text" },
    { id: "department", label: "Cấp quản lý", type: "text" },
    { id: "jobTitle", label: "Chức vụ", type: "text" },
    { id: "rankName", label: "Hàm (Sĩ quan)", type: "text" },
    { id: "identityBirthPlace", label: "Nơi sinh", type: "text" },
    { id: "identityBirthPlace2", label: "Nguyên quán", type: "text" },
    { id: "currentPlace", label: "Chỗ ở hiện nay", type: "text" },
    {
      id: "identityPlace",
      label: "Nơi đăng ký hộ khẩu thường trú",
      type: "text",
    },
    { id: "ethnicity", label: "Dân tộc", type: "text" },
    { id: "religion", label: "Tôn giáo", type: "text" },
    { id: "education_level", label: "Trình độ văn hóa", type: "text" },
    { id: "doan_tncs_hcm", label: "Kết nạp Đoàn TNCS HCM tại", type: "text" },
    { id: "dang_csvn", label: "Kết nạp Đảng CSVN tại", type: "text" },
  ];

  const handleAddRow = () => {
    setIsAddingRow(true);

    const newRow = {
      id: dataSource.length + 1,
      day: "",
      school_name: "",
      major: "",
      forms_of_training: "",
      certificates: "",
    };

    setDataSource([...dataSource, newRow]);
  };

  const handleSave = () => {};

  const handleRowSelectionChange = (selection: GridRowId[]) => {
    setSelectedRows(selection); // Cập nhật state khi có sự thay đổi trong việc chọn dòng
  };

  const handleDelete = () => {
    const updatedDataSource = dataSource.filter(
      (row: any) => !selectedRows.includes(row.id)
    );
    setDataSource(updatedDataSource);
    setSelectedRows([]); // Clear selected rows after delete
  };

  const hanldeOnChangefield = useCallback(
    (e: any) => {
      let value = e.target.value;
      let field = e.target.name;
      setFormData({ ...formData, [field]: value });
    },
    [formData]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid container spacing={2}>
          {fieldsData.map((field) => (
            <Grid item xs={6} key={field.id}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                </Grid>
                <Grid item xs={6}>
                  {field.type === "select" && field.options ? (
                    <FormControl fullWidth>
                      <Select
                        name={field.id}
                        size="small"
                        id={field.id}
                        onChange={hanldeOnChangefield}
                        value={data[field.id] || ""}
                      >
                        {field.options.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      size="small"
                      fullWidth
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      value={data[field.id] || ""}
                      onChange={hanldeOnChangefield}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid sx={{ marginTop: "24px" }} container alignItems="center">
          <GridTrainingSummary
            dataSelectRow={selectedRows}
            dataSource={dataSource}
            gridRef={gridRef}
            handleAddRow={handleAddRow}
            handleDel={handleDelete}
            handleRowSelect={handleRowSelectionChange}
            handleSave={handleSave}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
