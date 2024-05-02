import { Button, Grid } from "@mui/material";
import ReusableField, { IFormData } from "components/atoms/field";
import { FC, useEffect, useMemo, useState } from "react";
import { useGetDetailContract } from "services/hooks/useGetListStaff";
import { IContent, IStaff, IRenter } from "types/teaching_contact";

interface Props {
  contract?: any;
  action: "add" | "edit";
}

export const AddNewContract = (props: Props) => {
  const [formData, setFormData] = useState<IContent>();
  const [staffData, setStaffData] = useState<IStaff>();
  const [renterData, setRenterData] = useState<IRenter>();

  const { data: contractDetail, loading: detailLoading } = useGetDetailContract(
    props.action === "edit" ? props.contract.id : ""
  );
  useEffect(() => {
    if (contractDetail && contractDetail.staff && contractDetail.renter) {
      setStaffData(contractDetail.staff);
      setRenterData(contractDetail.renter);
      setFormData(contractDetail);
    }
  }, [contractDetail]);

  const formDataA = useMemo(() => {
    const data: IFormData[] = [
      {
        id: "semeter",
        label: "Học kỳ:",
        type: "select",
        options: ["Học kỳ I", "Học kỳ II"],
        defaultValue: "",
      },
      {
        id: "year",
        label: "Năm học:",
        type: "text",
        defaultValue: "",
      },

      {
        id: "per_a",
        label: "Bên A:",
        type: "text",
        defaultValue: staffData?.fullName || "",
      },
      {
        id: "fullName",
        label: "Đại diện:",
        type: "text",
        defaultValue: staffData?.fullName || "",
      },
      {
        id: "jobTitle",
        label: "Chức vụ:",
        type: "text",
        defaultValue: staffData?.jobTitle || "",
      },
      {
        id: "address",
        label: "Địa chỉ:",
        type: "text",
        defaultValue: "",
      },
      {
        id: "phoneNumber",
        label: "Điện thoại:",
        type: "text",
        defaultValue: staffData?.phoneNumber || "",
      },
      {
        id: "bank_a_num",
        label: "Tài khoản:",
        type: "text",
        defaultValue: "",
      },
      {
        id: "bank_a",
        label: "Mở tại:",
        type: "text",
        defaultValue: "",
      },
    ];
    return data;
  }, [staffData]);

  const formDataB = useMemo(() => {
    const formDataB: IFormData[] = [
      {
        id: "per_b",
        label: "Bên B:",
        type: "text",
        defaultValue: "",
      },
      {
        id: "identityCode",
        label: "CCCD:",
        type: "text",
        defaultValue: renterData?.identityCode || "",
      },
      {
        id: "identityDate",
        label: "Ngày cấp:",
        type: "text",
        defaultValue: renterData?.identityDate || "",
      },
      {
        id: "identityPlace",
        label: "Nơi cấp:",
        type: "text",
        defaultValue: renterData?.identityPlace || "",
      },
      {
        id: "jobTitleRenter",
        label: "Chức vụ:",
        type: "text",
        defaultValue: renterData?.jobTitle || "",
      },
      {
        id: "rankName",
        label: "Cấp bậc, học hàm, học vị:",
        type: "text",
        defaultValue: renterData?.rankName || "",
      },
      {
        id: "coefficients_sal",
        label: "Hệ số lương:",
        type: "text",
        defaultValue: "",
      },
      {
        id: "unit",
        label: "Đơn vị:",
        type: "text",
        defaultValue: "",
      },
      {
        id: "phoneNumberRenter",
        label: "Điện thoại:",
        type: "text",
        defaultValue: renterData?.phoneNumber || "",
      },
      {
        id: "bank_b_num",
        label: "Số tài khoản:",
        type: "text",
        defaultValue: "",
      },
      {
        id: "bank_b",
        label: "Mở tại:",
        type: "text",
        defaultValue: "",
      },
    ];
    return formDataB;
  }, [renterData]);

  const formDataC = useMemo(() => {
    const formDataC: IFormData[] = [
      {
        id: "fromDate",
        label: "Ngày bắt đầu thực hiện hợp đồng:",
        type: "text",
        defaultValue: formData?.fromDate || "",
      },
      {
        id: "toDate",
        label: "Thời gian kết thúc hợp đồng:",
        type: "text",
        defaultValue: formData?.toDate || "",
      },
      {
        id: "teachingAddress",
        label: "Địa điểm giảng dạy:",
        type: "text",
        defaultValue: formData?.teachingAddress || "",
      },
      {
        id: "numberOfLesson",
        label: "Số tiết dạy:",
        type: "text",
        defaultValue: formData?.numberOfLesson || "",
      },
      {
        id: "lessonPrice",
        label: "Giá một tiết dạy:",
        type: "text",
        defaultValue: formData?.lessonPrice || "",
      },
      {
        id: "contractValue",
        label: "Giá trị hợp đồng:",
        type: "text",
        defaultValue: formData?.contractValue || "",
      },
      {
        id: "byWord",
        label: "Bằng chữ",
        type: "text",
        defaultValue: formData?.byWord || "",
      },
      {
        id: "taxPercent",
        label: "Trừ thuế TNCN (nếu có):",
        type: "text",
        defaultValue: formData?.taxPercent || "",
      },
      {
        id: "taxValue",
        label: "Giá trị thuế:",
        type: "text",
        defaultValue: formData?.taxValue || "",
      },
      {
        id: "file1",
        label: "File hợp đồng",
        type: "file",
        defaultValue: "",
      },
      {
        id: "file2",
        label: "File phụ lục",
        type: "file",
        defaultValue: "",
      },
    ];
    return formDataC;
  }, [formData]);

  const handleFieldChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name?: string | undefined; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  const renderContact = useMemo(() => {
    return (
      <>
        {props.action === "edit" && detailLoading ? (
          <>loading</>
        ) : (
          <>
            <Grid container>
              <Button>Lưu</Button>
              <Grid container spacing={2}>
                {formDataA.map((field, index) => (
                  <ReusableField
                    key={index}
                    field={field}
                    hanldeOnChangefield={handleFieldChange}
                    formData={formDataA}
                  />
                ))}
                {formDataB.map((field, index) => (
                  <ReusableField
                    key={index}
                    field={field}
                    hanldeOnChangefield={handleFieldChange}
                    formData={formDataB}
                  />
                ))}
                {formDataC.map((field, index) => (
                  <ReusableField
                    key={index}
                    field={field}
                    hanldeOnChangefield={handleFieldChange}
                    formData={formDataC}
                  />
                ))}
              </Grid>
            </Grid>
          </>
        )}
      </>
    );
  }, [detailLoading, formDataA, formDataB, formDataC, props.action]);
  return <>{renderContact}</>;
};
