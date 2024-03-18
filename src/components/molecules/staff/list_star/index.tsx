import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { FC, useMemo, useState } from "react";
import { columns } from "./columns";
import { TabDetailStaff } from "components/molecules/staff/tab_detail";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface Props {}
export const ListStaff: FC<Props> = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedStaff, setSelectedStaff] = useState<any>({});

  const rows = [
    {
      id: 1,
      staff_id: "GV0001",
      staff_name: "Nguyễn Văn A",
      position_name: "Giảng viên",
      rank_name: "Thượng úy",
      level_name: "Bộ môn A",
    },
    {
      id: 2,
      staff_id: "GV0002",
      staff_name: "Trần Văn B",
      position_name: "Giảng viên",
      rank_name: "",
      level_name: "Bộ môn B",
    },
    {
      id: 3,
      staff_id: "GV0003",
      staff_name: "Bùi Thị C",
      position_name: "Giảng viên",
      rank_name: "",
      level_name: "Bộ môn C",
    },
  ];
  const handleClose = () => {
    setIsVisible(false);
    setSelectedStaff({});
  };
  const RenderModal = useMemo(() => {
    return (
      <div>
        <Dialog
          fullScreen
          open={isVisible}
          onClose={() => {
            setIsVisible(false);
            setSelectedStaff({});
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              padding: "12px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </div>

          <div
            style={{
              padding: "12px",
              height: `calc(100vh - 50px)`,
              overflow: "auto",
            }}
          >
            <TabDetailStaff staff={selectedStaff} />
          </div>
        </Dialog>
      </div>
    );
  }, [isVisible, selectedStaff]);
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Danh sách nhân viên
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
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
          onCellClick={(ele) => {
            setIsVisible(true);
            setSelectedStaff(ele?.row);
          }}
        />
      </Box>
      {RenderModal}
    </div>
  );
};
