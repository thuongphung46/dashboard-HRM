import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ReusableField, { IFormData } from "components/atoms/field";
import { FC, useCallback, useEffect, useState } from "react";
import { useGetDetailContract } from "services/hooks/useGetListStaff";
import { IContent, IStaff, IRenter } from "types/teaching_contact";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  contract?: any;
  action: "add" | "edit";
}

export const AddNewContract: FC<Props> = (props) => {
  const [formData, setFormData] = useState<IContent>();
  const [staffData, setStaffData] = useState<IStaff>();
  const [renterData, setRenterData] = useState<IRenter>();
  const [editData, setEditData] = useState<any>();

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

  const formDataA: IFormData[] = [
    {
      id: "semeter",
      label: "Học kỳ:",
      type: "select",
      options: [
        {
          value: "Học kỳ I",
          label: "Học kỳ I",
        },
        {
          value: "Học kỳ II",
          label: "Học kỳ II",
        },
      ],
    },
    {
      id: "year",
      label: "Năm học:",
      type: "text",
    },

    {
      id: "per_a",
      label: "Bên A:",
      type: "text",
    },
    {
      id: "fullName",
      label: "Đại diện:",
      type: "text",
    },
    {
      id: "jobTitle",
      label: "Chức vụ:",
      type: "text",
    },
    {
      id: "address",
      label: "Địa chỉ:",
      type: "text",
    },
    {
      id: "phoneNumber",
      label: "Điện thoại:",
      type: "text",
    },
    {
      id: "bank_a_num",
      label: "Tài khoản:",
      type: "text",
    },
    {
      id: "bank_a",
      label: "Mở tại:",
      type: "text",
    },
  ];

  const formDataB: IFormData[] = [
    {
      id: "per_b",
      label: "Bên B:",
      type: "text",
    },
    {
      id: "identityCode",
      label: "CCCD:",
      type: "text",
    },
    {
      id: "identityDate",
      label: "Ngày cấp:",
      type: "text",
    },
    {
      id: "identityPlace",
      label: "Nơi cấp:",
      type: "text",
    },
    {
      id: "jobTitleRenter",
      label: "Chức vụ:",
      type: "text",
    },
    {
      id: "rankName",
      label: "Cấp bậc, học hàm, học vị:",
      type: "text",
    },
    {
      id: "coefficients_sal",
      label: "Hệ số lương:",
      type: "text",
    },
    {
      id: "unit",
      label: "Đơn vị:",
      type: "text",
    },
    {
      id: "phoneNumberRenter",
      label: "Điện thoại:",
      type: "text",
    },
    {
      id: "bank_b_num",
      label: "Số tài khoản:",
      type: "text",
    },
    {
      id: "bank_b",
      label: "Mở tại:",
      type: "text",
    },
  ];

  const formDataC: IFormData[] = [
    {
      id: "fromDate",
      label: "Ngày bắt đầu thực hiện hợp đồng:",
      type: "text",
    },
    {
      id: "toDate",
      label: "Thời gian kết thúc hợp đồng:",
      type: "text",
    },
    {
      id: "teachingAddress",
      label: "Địa điểm giảng dạy:",
      type: "text",
    },
    {
      id: "numberOfLesson",
      label: "Số tiết dạy:",
      type: "text",
    },
    {
      id: "lessonPrice",
      label: "Giá một tiết dạy:",
      type: "text",
    },
    {
      id: "contractValue",
      label: "Giá trị hợp đồng:",
      type: "text",
    },
    {
      id: "byWord",
      label: "Bằng chữ",
      type: "text",
    },
    {
      id: "taxPercent",
      label: "Trừ thuế TNCN (nếu có):",
      type: "text",
    },
    {
      id: "taxValue",
      label: "Giá trị thuế:",
      type: "text",
    },
    {
      id: "file1",
      label: "File hợp đồng",
      type: "file",
    },
    {
      id: "file2",
      label: "File phụ lục",
      type: "file",
    },
  ];

  // const handleFieldChange = useDebouncedCallback(
  //   (
  //     event: React.ChangeEvent<
  //       HTMLInputElement | { name?: string | undefined; value: unknown }
  //     >
  //   ) => {
  //     const { name, value } = event.target;
  //     setFormData((prevData: any) => ({
  //       ...prevData,
  //       [name as string]: value,
  //     }));
  //   },
  //   500
  // );

  const hanldeOnChangefield = useDebouncedCallback((e: any) => {
    let value = e.target.value;
    let field = e.target.name;

    setEditData({
      ...editData,
      [field]: value,
    });
  }, 500);

  const handleSave = useCallback(() => {
    console.log("data: ", formData);
  }, [formData]);

  const getData = useCallback((id: string) => {
    // tìm ra data cho
  }, []);

  return (
    <>
      {props.action === "edit" && detailLoading ? (
        <>loading</>
      ) : (
        <>
          <Grid container>
            <Button onClick={handleSave}>Lưu</Button>
            <Grid container spacing={2}>
              {formDataA.map((field, index) => (
                <Grid item xs={6} key={field.id}>
                  <Grid container alignItems="center">
                    <Grid item xs={5}>
                      <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      {field.type === "select" && field.options ? (
                        <FormControl fullWidth>
                          <Select
                            name={field.id}
                            size="small"
                            id={field.id}
                            onChange={hanldeOnChangefield}
                            defaultValue={
                              props.action === "edit"
                                ? contractDetail
                                  ? contractDetail[field.id]
                                  : ""
                                : ""
                            }
                          >
                            {field.options.map((option, index) => (
                              <MenuItem key={index} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <TextField
                          size="small"
                          fullWidth
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          defaultValue={
                            props.action === "edit"
                              ? contractDetail
                                ? contractDetail[field.id]
                                : ""
                              : ""
                          }
                          onChange={hanldeOnChangefield}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
              {formDataB.map((field, index) => (
                <Grid item xs={6} key={field.id}>
                  <Grid container alignItems="center">
                    <Grid item xs={5}>
                      <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      {field.type === "select" && field.options ? (
                        <FormControl fullWidth>
                          <Select
                            name={field.id}
                            size="small"
                            id={field.id}
                            // onChange={}
                          >
                            {field.options.map((option, index) => (
                              <MenuItem key={index} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <TextField
                          size="small"
                          fullWidth
                          id={field.id}
                          name={field.id}
                          type={field.type}

                          // onChange={hanldeOnChangefield}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              ))}

              {formDataC.map((field, index) => (
                <Grid item xs={6} key={field.id}>
                  <Grid container alignItems="center">
                    <Grid item xs={5}>
                      <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      {field.type === "select" && field.options ? (
                        <FormControl fullWidth>
                          <Select
                            name={field.id}
                            size="small"
                            id={field.id}
                            // onChange={}
                          >
                            {field.options.map((option, index) => (
                              <MenuItem key={index} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <TextField
                          size="small"
                          fullWidth
                          id={field.id}
                          name={field.id}
                          type={field.type}

                          // onChange={hanldeOnChangefield}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
