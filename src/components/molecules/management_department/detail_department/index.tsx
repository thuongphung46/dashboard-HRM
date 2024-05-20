import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FC, useState, useEffect, useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { Link } from "react-router-dom";
import { IDataDetail } from "types/model";
import { DataGrid } from "@mui/x-data-grid";
import { TreeView, TreeItemData } from "components/atoms/tree_view";
import { useGetListJobTitle } from "services/hooks/useGetListJobTitle";

interface Props {
  dataDetail: IDataDetail;
  disable?: boolean;
}
interface IMember {
  fullName?: string;
  id?: number;
  jobTitle?: string;
}

export const DetailDepartMent: FC<Props> = ({ dataDetail, disable }) => {
  const [gridGroup, setGridGroup] = useState<TreeItemData[]>([]);
  const [gridMember, setGridMember] = useState<IMember[]>([]);
  const { loading: loadingJobTitle, data: jobTitleData } = useGetListJobTitle();
  

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

  const jobTitleMap = useMemo(() => {
    if (!jobTitleData) return {};
    const map: { [key: string]: string } = {};
    jobTitleData.forEach((job) => {
      map[job.code] = job.jobTitle;
    });
    return map;
  }, [jobTitleData]);

  const transformedGridMember = useMemo(() => {
    if (!gridMember) return [];
    return gridMember.map((member) => ({
      ...member,
      jobTitle: member.jobTitle && jobTitleMap[member.jobTitle] ? jobTitleMap[member.jobTitle] : member.jobTitle,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridMember, jobTitleData]);

  return (
    <Box sx={{ width: "70%" }}>
      <Grid
        sx={{ overflow: "auto", height: "calc(100vh - 80px)", padding: 2 }}
        container
      >
        <Grid sx={{ width: "100%" }} item>
          <DataGrid
            sx={{
              height: "400px",
            }}
            rows={transformedGridMember}
            columns={columnsGridMember}
          />
        </Grid>

        <Grid sx={{ marginTop: "20px", width: "100%" }} item>
          <TreeView
            data={gridGroup}
            setData={(data: TreeItemData[]) => {
              setGridGroup(data);
            }}
            disable={disable}
          ></TreeView>
        </Grid>
      </Grid>
    </Box>
  );
};
