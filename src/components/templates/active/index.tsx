import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toastMessage } from "components/molecules/toast_message";
import { useCallback, useEffect, useState } from "react";
import { StaffService } from "services/staff_service";
import { MessageCode } from "types/enum/message_code";

interface IData {
    id: number
    staffId: number
    status: number
    metaData: string
}
export const ActiveTemplates = () => {
    const [data, setData] = useState<IData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await StaffService.GetListStaffPending(0);
            if (response.msg_code === MessageCode.Success) {
                setData(response.content);
            }
        };
        fetchData();
    }, []);
    const handleActive = useCallback(async (data: any) => {
        let id = data.staffId;
        if (!id) return;
        let response = await StaffService.ConfirmStaff(id);
        if (response.msg_code === MessageCode.Success) {
            let newData = data.filter((item: any) => item.id !== id);
            setData(newData);
            toastMessage("Thành công", "success");
        } else {
            toastMessage(response.message, "error");
        }
    }, []);

    const Columns: GridColDef[] = [
        {
            field: "staffId",
            headerName: "ID nhân viên",
            width: 150,
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 150,
            type: "singleSelect",
            getOptionValue: (value: any) => value.code,
            getOptionLabel: (value: any) => value.label,
            valueOptions: [
                { code: 0, label: "Chờ duyệt" },
                { code: 1, label: "Đã duyệt" }
            ]
        },
        {
            field: "action",
            headerName: "",
            renderCell: (params) => {
                return (
                    <Box >
                        <Button onClick={() => handleActive(params.row)} variant="outlined" size="small" >Đồng ý</Button>
                    </Box>
                );
            },
        }
    ]
    return (
        <div style={{
            padding: "8px",
        }}>
            <><DataGrid
                rows={data}
                columns={Columns}
            ></DataGrid></>
        </div>
    );
};
