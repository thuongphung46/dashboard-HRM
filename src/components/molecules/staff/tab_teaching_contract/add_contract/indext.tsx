import { Button } from "@mui/material";
import ReusableField from "components/atoms/field";
import { FC, useState } from "react";

interface Props {
    contract: any;
  }
export const AddNewContract: FC<Props> = (props) => {
    const [formData, setFormData] = useState<any>({});
    const fieldsData = [
        { id: "code", label: "Học kỳ:", type: "text" },
        { id: "code", label: "Năm học:", type: "text" },
        { id: "code", label: "Bên A:", type: "text" },
        { id: "code", label: "Đại diện:", type: "text" },
        { id: "code", label: "chức vụ:", type: "text" },
        { id: "code", label: "Địa chỉ:", type: "text" },
        { id: "code", label: "Điện thoại:", type: "text" },
        { id: "code", label: "Tài khoản:", type: "text" },
        { id: "code", label: "Mở tại:", type: "text" },
        { id: "code", label: "Bên B:", type: "text" },
        { id: "code", label: "CCCD:", type: "text" },
        { id: "code", label: "Ngày cấp:", type: "text" },
        { id: "code", label: "Nơi cấp:", type: "text" },
        { id: "code", label: "Chức vụ:", type: "text" },
        { id: "code", label: "Cấp bậc, học hàm, học vị:", type: "text" },
        { id: "code", label: "Hệ số lương:", type: "text" },
        { id: "code", label: "Đơn vị:", type: "text" },
        { id: "code", label: "Điện thoại:", type: "text" },
        { id: "code", label: "Số tài khoản:", type: "text" },
        { id: "code", label: "Mở tại:", type: "text" },
        { id: "code", label: "Thời gian thực hiện hợp đồng:", type: "text" },
        { id: "code", label: "Địa điểm giảng dạy:", type: "text" },
        { id: "code", label: "Số tiết dạy:", type: "text" },
        { id: "code", label: "Giá trị hợp đồng:", type: "text" },
        { id: "code", label: "Bằng chữ", type: "text" },
        { id: "code", label: "Trừ thuế TNCN (nếu có):", type: "text" },
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