import React, { FC, useCallback, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { DataGrid, GridRowId, GridColDef } from "@mui/x-data-grid";

export const InfoStaff: React.FC = () => {
  const [isAddingRow, setIsAddingRow] = useState(false);
  const gridRef = useRef<any>(null);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]); // State để lưu trữ các dòng được chọn
  const [formData, setFormData] = useState<any>({});
  const [dataSource, setDataSource] = useState<any[]>([
    {
      id: "",
      day: "",
      school_name: "",
      major: "",
      forms_of_training: "",
      certificates: "",
    },
  ]);
  const fieldsData = [
    { id: "code", label: "Mã nhân viên", type: "text" },
    { id: "name", label: "Họ và tên", type: "text" },
    { id: "sex", label: "Giới tính", type: "select", options: ["Nam", "Nữ"] },
    { id: "date", label: "Ngày sinh", type: "date" },
    { id: "email", label: "Email", type: "text" },
    { id: "phone", label: "Số điện thoại", type: "text" },
    { id: "department", label: "Cấp quản lý", type: "text" },
    { id: "position", label: "Chức vụ", type: "text" },
    { id: "rank", label: "Hàm (Sĩ quan)", type: "text" },
    { id: "place_of_birth", label: "Nơi sinh", type: "text" },
    { id: "domicile", label: "Nguyên quán", type: "text" },
    { id: "current_residence", label: "Chỗ ở hiện nay", type: "text" },
    {
      id: "permanent_address",
      label: "Nơi đăng ký hộ khẩu thường trú",
      type: "text",
    },
    { id: "ethnicity", label: "Dân tộc", type: "text" },
    { id: "religion", label: "Tôn giáo", type: "text" },
    { id: "education_level", label: "Trình độ văn hóa", type: "text" },
    { id: "doan_tncs_hcm", label: "Kết nạp Đoàn TNCS HCM tại", type: "date" },
    { id: "dang_csvn", label: "Kết nạp Đảng CSVN tại", type: "date" },
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
      <Grid container spacing={2}>
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
                        value={formData[field.id] || ""}>
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
                      value={formData[field.id] || ""}
                      onChange={hanldeOnChangefield}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid container alignItems="center">
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

export default InfoStaff;

interface IGridTraining {
  handleDel: () => void;
  handleAddRow: () => void;
  handleSave: () => void;
  handleRowSelect: (e: any) => void;
  dataSelectRow: any;
  dataSource: any;
  gridRef: any;
}
const GridTrainingSummary: FC<IGridTraining> = ({
  handleDel,
  handleAddRow,
  handleSave,
  dataSource,
  gridRef,
  dataSelectRow,
  handleRowSelect,
}) => {
  const columns: GridColDef[] = [
    {
      field: "from_date",
      headerName: "Từ tháng năm",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      field: "to_date",
      headerName: "Đến tháng năm",
      width: 150,
      editable: true,
      type: "date",
    },
    {
      field: "school_name",
      headerName: "Tên trường hoặc cơ sở đào tạo",
      width: 250,
      editable: true,
    },
    {
      field: "major",
      headerName: "Ngành học",
      width: 200,
      editable: true,
    },
    {
      field: "forms_of_training",
      headerName: "Hình thức đào tạo",
      width: 200,
      editable: true,
    },
    {
      field: "certificates",
      headerName: "Văn bằng chứng chỉ",
      width: 200,
      editable: true,
    },
  ];

  return (
    <>
      <Typography variant="h5" gutterBottom>
        TÓM TẮT QUÁ TRÌNH ĐÀO TẠO
      </Typography>

      <button onClick={handleSave}>Save</button>
      <button onClick={handleDel}>Delete</button>
      <button onClick={handleAddRow}>Add Row</button>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={dataSource}
          columns={columns}
          ref={gridRef}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleRowSelect}
          rowSelectionModel={dataSelectRow}
        />
      </Box>
    </>
  );
};
