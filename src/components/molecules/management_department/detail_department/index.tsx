import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FC, useState, useCallback, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IDataDetail } from "types/model";
import { DataGrid } from "@mui/x-data-grid";

interface Props {
  dataDetail: IDataDetail;
  listSubject: any[];
}
interface IMember {
  fullName?: string;
  id?: number;
  jobTitle?: string;
}
interface IGroup {
  id?: number;
  name?: string;
}
export const DetailDepartMent: FC<Props> = ({ dataDetail, listSubject }) => {
  const [formData, setFormData] = useState<any>({});
  const [gridGroup, setGridGroup] = useState<IGroup[]>([]);
  const [gridMember, setGridMember] = useState<IMember[]>([]);

  useEffect(() => {
    if (dataDetail.groups && dataDetail.members) {
      setGridMember(dataDetail.members);
      setGridGroup(dataDetail.groups);
    }
  }, [dataDetail]);

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

  const columnsGroup: GridColDef[] = [
    {
      field: "name",
      headerName: "",
      type: "string",
      minWidth: 400,
      // renderCell: (params) => {
      //   return (
      //     <Link to={`/detail_employee/${params.id}`}>
      //       <span>{params.value}</span>
      //     </Link>
      //   );
      // },
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

  const columnsGridMember: GridColDef[] = [
    {
      field: "jobTitle",
      headerName: "Chức vụ",
      minWidth: 300,
    },
    {
      field: "fullName",
      headerName: "Họ tên",
      minWidth: 200,
      renderCell: (params) => {
        return (
          <Link to={`/detail_employee/${params.id}`}>
            <span>{params.value}</span>
          </Link>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: "70%" }}>
      <Grid container>
        <Grid sx={{ width: "90%" }} item>
          <DataGrid
            sx={{
              height: "400px",
            }}
            rows={gridMember}
            columns={columnsGridMember}
          />
        </Grid>
        <Grid sx={{ marginTop: "20px", width: "90%" }} item>
          <DataGrid
            sx={{
              height: "400px",
            }}
            rows={gridGroup}
            columns={columnsGroup}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
