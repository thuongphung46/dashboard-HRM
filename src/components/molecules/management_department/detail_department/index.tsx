import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FC, useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { Link } from "react-router-dom";
import { IDataDetail } from "types/model";
import { DataGrid } from "@mui/x-data-grid";
import { TreeView, TreeItemData } from "components/atoms/tree_view";

interface Props {
  dataDetail: IDataDetail;
}
interface IMember {
  fullName?: string;
  id?: number;
  jobTitle?: string;
}

export const DetailDepartMent: FC<Props> = ({ dataDetail }) => {
  const [gridGroup, setGridGroup] = useState<TreeItemData[]>([]);
  const [gridMember, setGridMember] = useState<IMember[]>([]);

  useEffect(() => {
    let data: TreeItemData[] = [];
    if (dataDetail.groups && dataDetail.members) {
      setGridMember(dataDetail.members);
      dataDetail.groups.forEach((group) => {
        let item: TreeItemData = {
          itemId: group.id.toString(),
          label: group.name,
          children: group.members,
        };
        data.push(item);
      });
      setGridGroup(data);
    }
  }, [dataDetail]);
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
          <Link
            style={{
              textDecoration: "none",
              color: "#5ae1ff",
              fontWeight: "bold",
            }}
            to={`/detail_employee/${params.id}`}
          >
            <span>{params.value}</span>
          </Link>
        );
      },
    },
  ];
  return (
    <Box sx={{ width: "70%" }}>
      <Grid
        sx={{ overflow: "auto", height: "calc(100vh - 70px)", padding: 2 }}
        container
      >
        <Grid sx={{ width: "100%" }} item>
          <DataGrid
            sx={{
              height: "400px",
            }}
            rows={gridMember}
            columns={columnsGridMember}
          />
        </Grid>

        <Grid sx={{ marginTop: "20px", width: "100%" }} item>
          <TreeView
            data={gridGroup}
            setData={(data: TreeItemData[]) => {
              setGridGroup(data);
            }}
          ></TreeView>
        </Grid>
      </Grid>
    </Box>
  );
};
