import { FC, useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from '@mui/material/Typography';

interface Props{}

const GeneralResion: FC<Props> = () => {
  
  const [isAddingRow, setIsAddingRow] = useState(false);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'STT', width: 90 },
    {
      field: 'resion_id',
      headerName: 'Mã lý do giảm trừ',
      width: 150,
      editable: isAddingRow,
    },
    {
      field: 'resion',
      headerName: 'Lý do giảm trừ',
      width: 150,
      editable: true,
    },
    {
      field: 'reduce',
      headerName: 'Giảm (%)',
      width: 150,
      editable: true,
    }
  ];

  const handleAddRow = () => {
    setIsAddingRow(true); // Set isAddingRow to true when adding a new row

    const newRow = {
      id: rows.length + 1,
      resion_id: '',
      resion: '',
      reduce: ''
    };
    setRows([...rows, newRow]);
  };

  const [rows, setRows] = useState([
    { id: 1, resion_id: 'cnbm', resion: 'Chủ nhiệm bộ môn', reduce: '20%'},
    { id: 2, resion_id: 'cvht', resion: 'Cố vấn học tập', reduce: '15%'},
    { id: 3, resion_id: 'dh', resion: 'Đi học', reduce: '10%'},
  ]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Lý do giảm trừ
      </Typography>
      <button >Lưu</button>
      <button >Xóa</button>
      <button onClick={handleAddRow}>Add Row</button>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
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
        />
      </Box>
    </div>
  );
};

const GeneralPosition: FC<Props> = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'STT', width: 90 },
    {
      field: 'position_id',
      headerName: 'Mã chức  vụ',
      width: 150,
    },
    {
      field: 'position_name',
      headerName: 'Tên chức vụ',
      width: 150,
      editable: true,
    },
  ];

  const rows = [
    { id: 1, position_id: 'giamdoc', position_name: 'Giám đốc'},
    { id: 2, position_id: 'phogiamdoc', position_name: 'Phó giám đốc'},
    { id: 3, position_id: 'chunhiem', position_name: 'Chủ nhiệm'},
  ];

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Chức vụ
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
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
        />
      </Box>
    </div>
  );
};

const GeneralRank: FC<Props> = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'STT', width: 90 },
    {
      field: 'rank_id',
      headerName: 'Mã hàm',
      width: 150,
    },
    {
      field: 'rank_name',
      headerName: 'Tên hàm',
      width: 150,
    },
    {
      field: 'coefficients',
      headerName: 'Hệ số lương',
      width: 150,
    },
    {
      field: 'promotion_period',
      headerName: 'Thời hạn thăng cấp (năm)',
      width: 200,
    }
  ];

  const rows = [
    { id: 1, rank_id: 'thuong_ta', rank_name:'Thượng tá', coefficients: '7.3', promotion_period: '4'},
    { id: 2, rank_id: 'trung_ta', rank_name:'Trung tá', coefficients: '6.6', promotion_period: '4'},
    { id: 3, rank_id: 'thieu_ta', rank_name:'Thiếu tá', coefficients: '6', promotion_period: '4'},
    { id: 4, rank_id: 'dai_uy', rank_name:'Đại úy', coefficients: '5.4', promotion_period: '4'},
    { id: 5, rank_id: 'thuong_uy', rank_name:'Thượng úy', coefficients: '5', promotion_period: '3'},
    { id: 6, rank_id: 'trung_uy', rank_name:'Trung úy', coefficients: '4.6', promotion_period: '3'},
    { id: 7, rank_id: 'thieu_uy', rank_name:'Thiếu úy', coefficients: '4.2', promotion_period: '2'},
  ];

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Tổ chức cán bộ
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};
export  const MultipleTablesPage: FC<Props> = () => {
  return (
    <div>
      <GeneralResion />
      <GeneralPosition />
      <GeneralRank />
    </div>
  );
};
