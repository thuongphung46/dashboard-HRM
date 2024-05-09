import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ReusableField, { IFormData } from "components/atoms/field";
import { FC, useState, useCallback, useEffect } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro/DataGridPro";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { DataGridProProps } from "@mui/x-data-grid-pro/models/dataGridProProps";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IDataDetail } from "types/model";

interface Props {
  dataDetail: IDataDetail;
  listSubject: any[];
}
const fieldsData: IFormData[] = [
  { id: "dean_of_department", label: "Chủ nhiệm khoa", type: "text" },
  {
    id: "deputy_dean_of_department",
    label: "Phó chủ nhiệm khoa",
    type: "text",
  },
];
export const DetailDepartMent: FC<Props> = ({ dataDetail, listSubject }) => {
  const [formData, setFormData] = useState<any>({});
  const [dataRows, setDataRows] = useState<any[]>([]);

  useEffect(() => {
    //convert dataDetail to row
    let data: any[] = [];
    if (dataDetail.groups) {
      dataDetail.groups.flatMap((group) => {
        return group.members.forEach((member) => {
          if (
            data.filter((item) => item?.hierarchy[0] === group.name).length ===
            0
          ) {
            data.push({
              hierarchy: [group.name],
              subject: group.name,
              name: "",
              id: group.id,
            });
          }
          data.push({
            hierarchy: [group.name, member.jobTitle],
            subject: group.name,
            name: member.fullName,
            id: member.id,
          });
        });
      });

      setDataRows(data);
    }
  }, [dataDetail.groups, dataDetail.name]);

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
            rows={dataRows}
            columns={columns}
            getTreeDataPath={
              getTreeDataPath as DataGridProProps["getTreeDataPath"]
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const getTreeDataPath: DataGridProProps["getTreeDataPath"] = (row) =>
  row.hierarchy;
