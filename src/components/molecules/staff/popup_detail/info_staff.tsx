import React, { useRef, useState } from "react";
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


  const [dataSource, setDataSource] = useState<any[]>([
    {id: '', day: '', school_name: '',major: '', forms_of_training: '', certificates:''}
  ]);

  const columns: GridColDef[] = [
    {
      field: 'from_date',
      headerName: 'Từ tháng năm',
      width: 150,
      editable: true,
      type: 'date',
    },
    {
      field: 'to_date',
      headerName: 'Đến tháng năm',
      width: 150,
      editable: true,
      type: 'date',
    },
    {
      field: 'school_name',
      headerName: 'Tên trường hoặc cơ sở đào tạo',
      width: 250,
      editable: true,
    },
    {
      field: 'major',
      headerName: 'Ngành học',
      width: 200,
      editable: true,
    },
    {
      field: 'forms_of_training',
      headerName: 'Hình thức đào tạo',
      width: 200,
      editable: true,
    },
    {
      field: 'certificates',
      headerName: 'Văn bằng chứng chỉ',
      width: 200,
      editable: true,
    },
  ];

  const handleAddRow = () => {
    setIsAddingRow(true);

    const newRow = {
      id: dataSource.length + 1,
      day: '',
      school_name: '',
      major: '',
      forms_of_training: '',
      certificates: '',
    };

    setDataSource([...dataSource, newRow]);
  };

  const handleSave = () => {

  };

  const handleRowSelectionChange = (selection: GridRowId[]) => {
    setSelectedRows(selection); // Cập nhật state khi có sự thay đổi trong việc chọn dòng
  };

  const handleDelete = () => {
    const updatedDataSource = dataSource.filter((row: any) => !selectedRows.includes(row.id));
    setDataSource(updatedDataSource);
    setSelectedRows([]); // Clear selected rows after delete
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="code">Mã nhân viên*</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="code" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="name">Họ và tên*</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="name" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="sex">Giới tính*</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth>
                <Select id="sex">
                  <MenuItem value="male">Nam</MenuItem>
                  <MenuItem value="female">Nữ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="date">Ngày sinh*</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="date" type="date"/>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="email">Email</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="email" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="phone">Số điện thoại</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="phone"/>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="department">Cấp quản lý*</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="department" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="position">Chức vụ*</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="position" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="rank">Hàm (Sĩ quan)</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="rank" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="place_of_birth">Nơi sinh</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="place_of_birth" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="domicile">Nguyên quán</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="domicile" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="domicile">Chỗ ở hiện nay</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="domicile" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="domicile">Nơi đăng ký hộ khẩu thường trú</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="domicile" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="date">Dân tộc</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="date" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="date">Tôn giáo</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="date" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="date">Trình độ văn hóa</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="date" />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="date">Kết nạp Đoàn TNCS HCM </InputLabel>
              <InputLabel htmlFor="">tại</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="date" type="date"/>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="date">Kết nạp Đảng CSVN</InputLabel>
              <InputLabel htmlFor="">tại</InputLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField fullWidth id="date" type="date"/>
            </Grid>
          </Grid>
        </Grid>

        <div>
        <Typography variant="h5" gutterBottom>
          TÓM TẮT QUÁ TRÌNH ĐÀO TẠO
        </Typography>
  
        <button onClick={handleSave}>Save</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleAddRow}>Add Row</button>
  
        <Box sx={{ height: 400, width: '100%' }}>
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
            onRowSelectionModelChange={handleRowSelectionChange}
            rowSelectionModel={selectedRows}
          />
        </Box>
      </div>

      </Grid>
    </Box>
  );
};

export default InfoStaff;