import { FC, useState } from "react";
import Box from '@mui/material/Box';
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { BaseGrid } from "components/atoms/datagrid";

interface Props{}
export const GeneralPosition: FC<Props> = () => {

    const [isAddingRow, setIsAddingRow] = useState(false);
    // const gridRef = useRef<any>(null);
    const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]); // State để lưu trữ các dòng được chọn
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'STT', width: 90 },
      { field: 'position_id', headerName: 'Mã chức  vụ', width: 150, editable: isAddingRow },
      { field: 'position_name', headerName: 'Tên chức vụ', width: 150, editable: true},
    ];
    const rows = [
      { id: 1, position_id: 'giamdoc', position_name: 'Giám đốc'},
      { id: 2, position_id: 'phogiamdoc', position_name: 'Phó giám đốc'},
      { id: 3, position_id: 'chunhiem', position_name: 'Chủ nhiệm'},
    ];
    const [dataSource, setDataSource] = useState<any[]>(rows);
  
  
   
    const handleAddRow = () => {
      setIsAddingRow(true);
    
      const newRow = {
        id: rows.length + 1,
        position_id: '',
        position_name: '',
      };
   const index =  rows.findIndex((row) => row.position_id === newRow.position_id);
    if (index !== -1) {
      alert('Dữ liệu đã tồn tại');
      return;
    }
    
      // Update dataSource with the new row
      setDataSource([...rows, newRow]);
    };

    const handleChange = (e: any) => {
    }
  
    return (
      <div>
        <Box>
          <BaseGrid
            columns={columns}
            rows={dataSource}
            title="Chức vụ"
            
            onSave={handleAddRow}
            callBack={handleChange}
            onRowSelectionChange={setSelectedRows}
            selectedRows={selectedRows}

          />
      </Box>
      </div>
    );
  };