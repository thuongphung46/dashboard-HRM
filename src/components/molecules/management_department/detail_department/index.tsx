import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FC, useState, useEffect, useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { Link, useParams } from "react-router-dom";
import { IDataDetail } from "types/model";
import { DataGrid } from "@mui/x-data-grid";
import { TreeView, TreeItemData } from "components/atoms/tree_view";
import { useGetListJobTitle } from "services/hooks/useGetListJobTitle";
import { useGetDepartment } from "services/hooks/useGetListDepartment";
import HRMStorage from "common/function";
import { KeyValue } from "constants/GlobalConstant";

interface Props {
  // dataDetail: IDataDetail;
  // disable?: boolean;
}
interface IMember {
  fullName?: string;
  id?: number;
  jobTitle?: string;
}

export const DetailDepartMent: FC<Props> = () => {
  const { id } = useParams();
  const [gridGroup, setGridGroup] = useState<TreeItemData[]>([]);
  const [dataDetail, setDataDetail] = useState<IDataDetail>();
  const [gridMember, setGridMember] = useState<IMember[]>([]);
  const [disable, setDisable] = useState(true);

  const { data: jobTitleData } = useGetListJobTitle();
  const { data: department } = useGetDepartment(id);
  const level = HRMStorage.get(KeyValue.Level);
  useEffect(() => {
    if (level === "LEVEL_4") {
      setDisable(false);
    }
  }, [level]);

  useEffect(() => {
    if (department) {
      setDataDetail(department);
    }
  }, [department]);

  useEffect(() => {
    let data: TreeItemData[] = [];
    if (dataDetail && dataDetail.groups && dataDetail.members) {
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
              color: "#1976d2",
              fontWeight: "bold",
            }}
            to={`/detail_employee/${params.id}`}>
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
      jobTitle:
        member.jobTitle && jobTitleMap[member.jobTitle]
          ? jobTitleMap[member.jobTitle]
          : member.jobTitle,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridMember, jobTitleData]);

  const transformedGridGroup = gridGroup.map((group) => ({
    ...group,
    children: group?.children?.map((child) => ({
      ...child,
      jobTitle: jobTitleMap[child.jobTitle] || child.jobTitle,
    })),
  }));

  return (
    <Box sx={{ width: "70%" }}>
      <Grid
        sx={{ overflow: "auto", padding: 2, height: "calc(100vh - 90px)" }}
        container>
        <Grid sx={{ width: "100%" }} item>
          <DataGrid
            sx={{
              height: "280px",
            }}
            rows={transformedGridMember}
            columns={columnsGridMember}
          />
        </Grid>

        <Grid sx={{ width: "100%", paddingTop: 2 }} item>
          <TreeView
            data={transformedGridGroup}
            setData={(data: TreeItemData[]) => {
              setGridGroup(data);
            }}
            disable={disable}></TreeView>
        </Grid>
      </Grid>
    </Box>
  );
};
