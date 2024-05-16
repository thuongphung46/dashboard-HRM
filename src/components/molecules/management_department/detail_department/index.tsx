import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FC, useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { Link } from "react-router-dom";
import { IDataDetail } from "types/model";
import { DataGrid } from "@mui/x-data-grid";

import {
  DataGrid as DevExtremeDataGrid,
  Column,
  Grouping,
  Summary,
  GroupItem,
} from "devextreme-react/data-grid";

interface Props {
  dataDetail: IDataDetail;
}
interface IMember {
  fullName?: string;
  id?: number;
  jobTitle?: string;
}
interface IGroup extends IMember {
  id?: number;
  name?: string;
  idGroup?: number;
}
export const DetailDepartMent: FC<Props> = ({ dataDetail }) => {
  const [gridGroup, setGridGroup] = useState<IGroup[]>([]);
  const [gridMember, setGridMember] = useState<IMember[]>([]);

  useEffect(() => {
    let data: IGroup[] = [];
    if (dataDetail.groups && dataDetail.members) {
      setGridMember(dataDetail.members);
      dataDetail.groups.forEach((group) => {
        group.members.forEach((i) => {
          data.push({
            id: i.id,
            jobTitle: i.jobTitle,
            fullName: i.fullName,
            name: group.name,
            idGroup: group.id,
          });
        });
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
          <DevExtremeDataGrid
            allowColumnReordering={true}
            width="100%"
            height="400px"
            showBorders={true}
            hoverStateEnabled
            dataSource={gridGroup}
          >
            <Grouping autoExpandAll={false} expandMode="rowClick" />
            <Column dataField="jobTitle" caption="Chức vụ"></Column>
            <Column
              dataField="fullName"
              caption="Họ tên"
              cellRender={(e) => {
                return (
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#5ae1ff",
                      fontWeight: "bold",
                    }}
                    to={`/detail_employee/${e.data.id}`}
                  >
                    <span>{e.data.fullName}</span>
                  </Link>
                );
              }}
            ></Column>
            <Column
              dataField="name"
              caption=""
              dataType="string"
              groupIndex={0}
            />
            <Summary>
              <GroupItem column="name" />
            </Summary>
          </DevExtremeDataGrid>
        </Grid>
      </Grid>
    </Box>
  );
};
