import { Button } from "@mui/material";
import ReusableField from "components/atoms/field";
import { FC, useState } from "react";

interface Props {
    contract: any;
  }
export const AddNewContract: FC<Props> = (props) => {
    const [formData, setFormData] = useState<any>({});
    const fieldsData = [
        { id: "semeter", label: "Học kỳ:", type: "text" },
        { id: "year", label: "Năm học:", type: "text" },
        { id: "per_a", label: "Bên A:", type: "text" },
        { id: "represent", label: "Đại diện:", type: "text" },
        { id: "position_a", label: "chức vụ:", type: "text" },
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
        { id: "text", label: "Bằng chữ", type: "text" },
        { id: "vat_tncn", label: "Trừ thuế TNCN (nếu có):", type: "text" },
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
            <Button>Cập nhật</Button>
            {fieldsData.map((field, index) => (
                <ReusableField
                    key={index}
                    field={field}
                    hanldeOnChangefield={handleFieldChange}
                    formData={formData}
                />
            ))}
        </div>

    );
};