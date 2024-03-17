import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ReusableField from "components/atoms/field";
import { FC, useState, useCallback } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { DataGridPro } from "@mui/x-data-grid-pro/DataGridPro";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridRowsProp } from "@mui/x-data-grid/models/gridRows";
import { DataGridProProps } from "@mui/x-data-grid-pro/models/dataGridProProps";

interface Props {
  dataDetail: any;
  listSubject: any[];
}
const fieldsData = [
  { id: "dean_of_department", label: "Chủ nhiệm khoa", type: "text" },
  {
    id: "deputy_dean_of_department",
    label: "Phó chủ nhiệm khoa",
    type: "text",
  },
];
export const DetailDepartMent: FC<Props> = ({ dataDetail, listSubject }) => {
  const [formData, setFormData] = useState<any>({});
  const hanldeOnChangefield = useCallback(
    (e: any) => {
      let value = e.target.value;
      let field = e.target.name;
      setFormData({ ...formData, [field]: value });
    },
    [formData]
  );
  const handleClickItem = useCallback((e: any) => {}, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Typography>
          Tên cấp quản lý: <span>{dataDetail.name}</span>
        </Typography>

        <Grid container spacing={2}>
          {fieldsData.map((item) => {
            return (
              <ReusableField
                key={item.id}
                field={item}
                formData={formData}
                hanldeOnChangefield={hanldeOnChangefield}></ReusableField>
            );
          })}
        </Grid>
        <Grid container p={4}>
          <DataGridPro
            sx={{
              height: `calc(100vh - 210px)`,
            }}
            treeData
            rows={rows}
            columns={columns}
            getTreeDataPath={getTreeDataPath}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const getTreeDataPath: DataGridProProps["getTreeDataPath"] = (row) =>
  row.hierarchy;
const columns: GridColDef[] = [
  // { field: "subject", headerName: "Bộ Môn" },
  {
    field: "name",
    headerName: "Họ tên",
    type: "string",
    minWidth: 400,
  },
];
const rows: GridRowsProp = [
  {
    hierarchy: ["Bộ môn an toàn thông tin"],
    subject: "Head of Human Resources",
    name: "Nguyễn Văn A",
    id: 0,
  },
  {
    hierarchy: ["Bộ môn lịch sử đảng"],
    subject: "Head of Sales",
    name: "Trần Văn B",
    id: 1,
  },
  {
    hierarchy: ["Bộ môn lịch sử đảng", "Chủ nhiệm bộ môn"],
    subject: "Sales Person",
    name: "Phùng văn H",
    id: 2,
  },
  {
    hierarchy: ["Bộ môn lịch sử đảng", "Phó chủ nhiệm bộ môn"],
    subject: "Sales Person",
    name: "Trần Thị Hoài Ninh",
    id: 3,
  },
  {
    hierarchy: ["Bộ môn lịch sử đảng", "Nhân viên"],
    subject: "Sales Person",
    name: "Lê Minh Phúc",
    id: 4,
  },
  {
    hierarchy: ["Bộ môn lịch sử đảng", "Giảng viên mời"],
    subject: "Sales Person",
    name: "Đặng văn K",
    id: 5,
  },
  {
    hierarchy: ["Bộ môn lịch sử đảng", "Trợ giảng"],
    subject: "Sales Person",
    name: "Vũ Ngọc An",
    id: 6,
  },
  {
    hierarchy: ["Bộ môn lịch sử đảng", "Trợ lý"],
    subject: "Sales Person",
    name: "Tô Văn Tương",
    id: 7,
  },
  {
    hierarchy: ["Bộ môn lập trình căn bản"],
    subject: "Head of Engineering",
    name: "Vũ Ngọc G",
    id: 8,
  },
  {
    hierarchy: ["Bộ môn lập trình căn bản", "Chủ nhiệm bộ môn"],
    subject: "Tech lead front",
    name: "nguyễn văn j",
    id: 9,
  },
  {
    hierarchy: ["Bộ môn lập trình căn bản", "Phó chủ nhiệm"],
    subject: "Front-end developer",
    name: "nguyễn văn j",
    id: 10,
  },
  {
    hierarchy: ["Bộ môn lập trình căn bản", "Nhân viên"],
    subject: "Tech lead devops",
    name: "nguyễn văn j",
    id: 11,
  },
  {
    hierarchy: ["Bộ môn lập trình căn bản", "Giảng viên mời"],
    subject: "Tech lead back",
    name: "nguyễn văn j",
    id: 12,
  },
  {
    hierarchy: ["Bộ môn lập trình căn bản", "Trợ giảng"],
    subject: "Back-end developer",
    name: "nguyễn văn j",
    id: 13,
  },
  {
    hierarchy: ["Bộ môn lập trình căn bản", "Trợ lý"],
    subject: "Back-end developer",
    name: "nguyễn văn j",
    id: 14,
  },
];
