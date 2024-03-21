import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ReusableField from "components/atoms/field";
import { FC, useState, useCallback } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro/DataGridPro";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridRowsProp } from "@mui/x-data-grid/models/gridRows";
import { DataGridProProps } from "@mui/x-data-grid-pro/models/dataGridProProps";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const onButtonClick = useCallback((e: any, row: any) => {
    // handle delete
  }, []);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Họ tên",
      type: "string",
      minWidth: 400,
      renderCell: (params) => {
        return (
          <Link to={`/detail_employee/${params.id}`}>
            <span>{params.value}</span>
          </Link>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {
        return (
          <IconButton onClick={(e) => onButtonClick(e, params.row)}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Typography>
          Tên cấp quản lý: <span>{dataDetail.name}</span>
        </Typography>

        <Grid container>
          {fieldsData.map((item) => {
            return (
              <ReusableField
                key={item.id}
                field={item}
                formData={formData}
                hanldeOnChangefield={hanldeOnChangefield}
              ></ReusableField>
            );
          })}
        </Grid>
        <Grid sx={{ marginTop: "20px" }} container>
          <DataGridPro
            sx={{
              height: `calc(100vh - 210px)`,
              width: "100%",
            }}
            editMode="row"
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

const rows: GridRowsProp = [
  {
    hierarchy: ["Bộ môn an toàn thông tin"],
    subject: "Head of Human Resources",
    name: "",
    id: 0,
  },
  {
    hierarchy: ["Bộ môn lịch sử đảng"],
    subject: "Head of Sales",
    name: "",
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
    name: "",
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
