import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { StaffService } from "services/staff_service";


export const ActiveTemplates = () => {
    const [data, setData] = useState<any>([]);



    useEffect(() => {
        const fetchData = async () => {
            const response = await StaffService.GetListStaffPending(1);
            console.log("data", response);
        };
        fetchData();
    }, []);
    const handleActive = useCallback(async (data: any) => {
        let id = data.id;
        let response = await StaffService.ConfirmStaff(id);
        console.log("response", response);
    }, []);

    const Columns : GridColDef[] =[
        {
            field: "code",
            headerName: "Mã hàm",
            width: 150,
        },
        {
            field: "name",
            headerName: "Tên",
            width: 150,
        },
        {
            field: "action",
            headerName: "",
            renderCell:(params)=>{
                return (
                    <Box >
                        <Button  onClick={()=> handleActive(params.row)} variant="outlined" size="small" >Đồng ý</Button>
                    </Box>
                );
            },
        }
    ]
    return (
        <div>
            <><DataGrid
                rows={[
                    { id: 1, col1: "Hello", col2: "World" },
                    { id: 2, col1: "XGrid", col2: "is Awesome" },
                    { id: 3, col1: "Material-UI", col2: "is Amazing" },
                ]}
                columns={Columns}
            ></DataGrid></>
        </div>
    );
};
