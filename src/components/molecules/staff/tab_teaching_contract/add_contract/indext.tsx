import { Label } from "@mui/icons-material";
import { Button } from "@mui/material";
import ReusableField from "components/atoms/field";
import { FC, useEffect, useState } from "react";
import { useGetDetailContract } from "services/hooks/useGetListStaff";

interface Props {
    contract: any;
}

export const AddNewContract: FC<Props> = (props) => {
    const [formData, setFormData] = useState<any>({});
    const { data: contractDetail, loading: detailLoading } = useGetDetailContract(props.contract.id);
    const [staffData, setStaffData] = useState<any>(null);
    const [renterData, setRenterData] = useState<any>(null);
    console.log(contractDetail);
    useEffect(() => {
        if (contractDetail && contractDetail.staff && contractDetail.renter) {
            setStaffData({
                per_a: contractDetail.staff.per_a || "",
                fullName: contractDetail.staff.fullName || "",
                jobTitle: contractDetail.staff.jobTitle || "",
                address: contractDetail.staff.address || "",
                phoneNumber: contractDetail.staff.phoneNumber || "",
                bank_a_num: contractDetail.staff.bank_a_num || "",
                bank_a: contractDetail.staff.bank_a || ""
            });
            setRenterData({
                per_b: contractDetail.renter.per_b || "",
                identityCode: contractDetail.renter.identityCode || "",
                identityDate: contractDetail.renter.identityDate || "",
                identityPlace: contractDetail.renter.identityPlace || "",
                jobTitle: contractDetail.renter.jobTitle || "",
                rankName: contractDetail.renter.rankName || "",
                coefficients_sal: contractDetail.renter.coefficients_sal || "",
                unit: contractDetail.renter.unit || "",
                phoneNumber: contractDetail.renter.phoneNumber || "",
                bank_b_num: contractDetail.renter.bank_b_num || "",
                bank_b: contractDetail.renter.bank_b || ""
            });
            setFormData({
                semeter: contractDetail.semeter || "",
                year: contractDetail.year || "",
                fromDate: contractDetail.fromDate || "",
                toDate: contractDetail.toDate || "",
                teachingAddress: contractDetail.teachingAddress || "",
                numberOfLesson: contractDetail.numberOfLesson || "",
                lessonPrice: contractDetail.lessonPrice || "",
                contractValue: contractDetail.contractValue || "",
                byWord: contractDetail.byWord || "",
                taxPercent: contractDetail.taxPercent || "",
                taxValue: contractDetail.taxValue || "",
                file1: contractDetail.file1 || "",
                file2: contractDetail.file2 || "",
            });
        }
    }, [contractDetail]);

    const fieldsData = contractDetail ? [
        { id: "semeter", label: "Học kỳ:", type: "select", options: ["Học kỳ I", "Học kỳ II"], defaultValue: formData?.semeter || ''},
        { id: "year", label: "Năm học:", type: "text", defaultValue: formData?.year || ''},

        { id: "per_a", label: "Bên A:", type: "text", defaultValue: staffData?.per_a || '' },
        { id: "fullName", label: "Đại diện:", type: "text", defaultValue: staffData?.fullName || '' },
        { id: "jobTitle", label: "Chức vụ:", type: "text", defaultValue: staffData?.jobTitle || '' },
        { id: "address", label: "Địa chỉ:", type: "text", defaultValue: staffData?.address || '' },
        { id: "phoneNumber", label: "Điện thoại:", type: "text", defaultValue: staffData?.phoneNumber || '' },
        { id: "bank_a_num", label: "Tài khoản:", type: "text", defaultValue: staffData?.bank_a_num || '' },
        { id: "bank_a", label: "Mở tại:", type: "text", defaultValue: staffData?.bank_a || '' },
        
        { id: "per_b", label: "Bên B:", type: "text", defaultValue: renterData?.per_b || '' },
        { id: "identityCode", label: "CCCD:", type: "text", defaultValue: renterData?.identityCode || '' },
        { id: "identityDate", label: "Ngày cấp:", type: "text", defaultValue: renterData?.identityDate || ''},
        { id: "identityPlace", label: "Nơi cấp:", type: "text", defaultValue: renterData?.identityPlace || '' },
        { id: "jobTitleRenter", label: "Chức vụ:", type: "text", defaultValue: renterData?.jobTitle || '' },
        { id: "rankName", label: "Cấp bậc, học hàm, học vị:", type: "text", defaultValue: renterData?.rankName || '' },
        { id: "coefficients_sal", label: "Hệ số lương:", type: "text", defaultValue: renterData?.coefficients_sal || '' },
        { id: "unit", label: "Đơn vị:", type: "text", defaultValue: renterData?.unit || '' },
        { id: "phoneNumberRenter", label: "Điện thoại:", type: "text", defaultValue: renterData?.phoneNumber || ''},
        { id: "bank_b_num", label: "Số tài khoản:", type: "text", defaultValue: renterData?.bank_b_num || ''},
        { id: "bank_b", label: "Mở tại:", type: "text", defaultValue: renterData?.bank_b || ''},

        { id: "fromDate", label: "Ngày bắt đầu thực hiện hợp đồng:", type: "text", defaultValue: formData?.fromDate || '' },
        { id: "toDate", label: "Thời gian kết thúc hợp đồng:", type: "text", defaultValue: formData?.toDate || '' },
        { id: "teachingAddress", label: "Địa điểm giảng dạy:", type: "text", defaultValue: formData?.teachingAddress || '' },
        { id: "numberOfLesson", label: "Số tiết dạy:", type: "text", defaultValue: formData?.numberOfLesson || '' },
        { id: "lessonPrice", label: "Giá một tiết dạy:", type: "text", defaultValue: formData?.lessonPrice || '' },
        { id: "contractValue", label: "Giá trị hợp đồng:", type: "text", defaultValue: formData?.contractValue || '' },
        { id: "byWord", label: "Bằng chữ", type: "text", defaultValue: formData?.byWord || '' },
        { id: "taxPercent", label: "Trừ thuế TNCN (nếu có):", type: "text", defaultValue: formData?.taxPercent || '' },
        { id: "taxValue", label: "Giá trị thuế:", type: "text", defaultValue: formData?.taxValue || '' },
        { id: "file1", label: "File hợp đồng", width: 150, type: "file", defaultValue: formData?.file1 || '' },
        { id: "file2", label: "File phụ lục", width: 150, type: "file", defaultValue: formData?.file2 || '' },
    ]: [];

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
                    formData={field.id in staffData ? staffData : (field.id in renterData ? renterData : formData)}
                />
            ))}
        </div>
    );
};