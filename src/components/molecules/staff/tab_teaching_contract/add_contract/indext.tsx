import { Label } from "@mui/icons-material";
import { Button } from "@mui/material";
import ReusableField from "components/atoms/field";
import { type } from "os";
import { FC, useState } from "react";
import { useGetDetailContract } from "services/hooks/useGetListStaff";

interface Props {
    contract: any;
  }
export const AddNewContract: FC<Props> = (props) => {
    const [formData, setFormData] = useState<any>({});
    const { data: contractDetail, loading:detailLoading } = useGetDetailContract(props.contract.id);
    console.log(contractDetail);
    // console.log(props.contract.id);
    const fieldsData = [
        { id: "semeter", label: "Học kỳ:", type: "select", Options: ["Học kỳ I", "Học kỳ II"] },
        { id: "year", label: "Năm học:", type: "text" },
        { id: "per_a", label: "Bên A:", type: "text" },
        { id: "staff.fullName", label: "Đại diện:", type: "text" },
        { id: "position_a", label: "Chức vụ:", type: "text" },
        { id: "address", label: "Địa chỉ:", type: "text" },
        { id: "phone_a", label: "Điện thoại:", type: "text" },
        { id: "bank_a_num", label: "Tài khoản:", type: "text" },
        { id: "bank_a", label: "Mở tại:", type: "text" },
        { id: "per_b", label: "Bên B:", type: "text" },
        { id: "cccd", label: "CCCD:", type: "text" },
        { id: "day_issuance", label: "Ngày cấp:", type: "text" },
        { id: "where_issuance", label: "Nơi cấp:", type: "text" },
        { id: "position_b", label: "Chức vụ:", type: "text" },
        { id: "rank", label: "Cấp bậc, học hàm, học vị:", type: "text" },
        { id: "coefficients_sal", label: "Hệ số lương:", type: "text" },
        { id: "unit", label: "Đơn vị:", type: "text" },
        { id: "phone_b", label: "Điện thoại:", type: "text" },
        { id: "bank_b_num", label: "Số tài khoản:", type: "text" },
        { id: "bank_b", label: "Mở tại:", type: "text" },
        { id: "start_time", label: "Thời gian thực hiện hợp đồng:", type: "text" },
        { id: "location", label: "Địa điểm giảng dạy:", type: "text" },
        { id: "quantity", label: "Số tiết dạy:", type: "text" },
        { id: "contract_value", label: "Giá trị hợp đồng:", type: "text" },
        { id: "byWord", label: "Bằng chữ", type: "text" },
        { id: "vat_tncn", label: "Trừ thuế TNCN (nếu có):", type: "text" },
        { field: "file1", label: "File hợp đồng", width: 150, type: "file"},
        { field: "file2", label: "File phụ lục", width: 150, type: "file"},
    ];

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown; }>) => {
        const { name, value } = event.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name as string]: value,
        }));
    };

    return (
        <div>
            <Button>Lưu</Button>
            {fieldsData.map((field, index) => (
                <ReusableField
                    key={index}
                    field={field}
                    hanldeOnChangefield={handleFieldChange}
                    formData={contractDetail}
                />
            ))}
        </div>

    );
};