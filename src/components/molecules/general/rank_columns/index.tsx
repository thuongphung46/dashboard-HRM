import React, { FC } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from "@mui/x-data-grid";
import Typography from '@mui/material/Typography';
import { columns } from "./columns";

interface Props{}

export const GeneralRank: FC<Props> = () => {

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
  