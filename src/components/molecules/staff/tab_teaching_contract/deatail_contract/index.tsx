import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { GetListStaffParams, useGetDetailContract, useGetListStaff } from "services/hooks/useGetListStaff";
import { IContent, IStaff, IRenter } from "types/teaching_contact";
import { useDebouncedCallback } from "use-debounce";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel, {InputLabelProps}from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { IFormData } from "components/atoms/field";
import { Typography } from "@mui/material";
import { StaffDetail } from "types/ApplicationType";

interface Props {
  data: StaffDetail;
  action: "add" | "edit";
  formData: any;
  setFormData: (value: React.SetStateAction<StaffDetail>) => void;
}

export const AddNewContract: FC<Props> = ({ data, action }) => {
  const { id } = useParams();
  const refJobTitle = useRef<any>(null);
  const [formData, setFormData] = useState<IContent>();
  const [staffData, setStaffData] = useState<IStaff>();
  const [renterData, setRenterData] = useState<IRenter>();
  const [editData, setEditData] = useState({
    jobTitleRenter: '',
  });

  const { data: contractDetail, loading: detailLoading } = useGetDetailContract(
    action === "edit" ? id : ""
  );

  const [params, setParams] = useState<GetListStaffParams>({
    query: "",
    active: undefined,
    page: 0,
    size: 25,
  });
  const [listStaff, setListStaff] = useState<any[]>([{}]);
  const { loading: loadingListStaff, data: listStaffData } = useGetListStaff(params);

  useEffect(() => {
    if (contractDetail && contractDetail.staff && contractDetail.renter) {
      setStaffData(contractDetail.staff);
      setRenterData(contractDetail.renter);
      setFormData(contractDetail);
      // setContractData(contractDetail.contract);
    }
  }, [contractDetail]);

  useEffect(() => {
    if (!loadingListStaff && listStaffData) {
      setListStaff(listStaffData);
    }
  }, [loadingListStaff, listStaffData]);

  const formDataA: IFormData[] = [
    {
      id: "semeter",
      label: "Học kỳ:",
      type: "select",
      options: [
        {
          value: "hk1",
          label: "Học kỳ I",
        },
        {
          value: "hk2",
          label: "Học kỳ II",
        },
      ],

    },
    {
      id: "year",
      label: "Năm học:",
      type: "text",
      defaultValue: "2024",
    },
    {
      id: "fullName",
      label: "Đại diện:",
      type: "select",
      defaultValue: renterData?.fullName || "",
      options: [],
    },
    {
      id: "jobTitle",
      ref: refJobTitle,
      label: "Chức vụ:",
      type: "text",
      defaultValue: renterData?.jobTitle || "",
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
      defaultValue: renterData?.phoneNumber || "",
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
  const formDataB: IFormData[] = [
    {
      id: "per_b",
      label: "Ông/Bà:",
      type: "select",
      defaultValue: staffData?.fullName || "",
      options: [],
    },
    {
      id: "identityCode",
      label: "CCCD:",
      type: "text",
      defaultValue: staffData?.identityCode || "",
    },
    {
      id: "identityDate",
      label: "Ngày cấp:",
      type: "text",
      defaultValue: staffData?.identityDate || "",
    },
    {
      id: "identityPlace",
      label: "Nơi cấp:",
      type: "text",
      defaultValue: staffData?.identityPlace || "",
    },
    {
      id: "jobTitleRenter",
      label: "Chức vụ:",
      type: "text",
      defaultValue: staffData?.jobTitle || "",
    },
    {
      id: "rankName",
      label: "Cấp bậc, học hàm, học vị:",
      type: "text",
      defaultValue: staffData?.rankName || "",
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
      defaultValue: staffData?.phoneNumber || "",
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
  const formDataC: IFormData[] = [
    {
      id: "fromDate",
      label: "Ngày bắt đầu thực hiện hợp đồng:",
      type: "date",
      defaultValue: formData?.fromDate || "",
    },
    {
      id: "toDate",
      label: "Thời gian kết thúc hợp đồng:",
      type: "date",
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

  const hanldeOnChangefield = useDebouncedCallback((e: any) => {
    let value = e.target.value;
    let field = e.target.name;

    if (field === "per_b" || field === "fullName") {
      // Tìm staff tương ứng với per_b được chọn
      const selectedStaff = listStaff.find(staff => staff.username === value);
      console.log("selectedStaff: ", selectedStaff);
      // Lấy giá trị jobTitle của staff đó và cập nhật vào state của jobTitleRenter
      setEditData({
        ...editData,
        [field]: value,
        jobTitleRenter: selectedStaff ? selectedStaff.jobTitle : "",
      });
      
      // setRenterData({
      //   ...renterData,
      //  jobTitle : selectedStaff.jobTitle,
      // })
      refJobTitle.current.value = selectedStaff.jobTitle;
    } else {
      setEditData({
        ...editData,
        [field]: value,
      });
    }
  }, 500);

  const handleSave = useCallback(() => {
    console.log("data: ", formData);
  }, [formData]);
  return (
    <>
      <Button sx={{ margin: "4px" }} variant="outlined" onClick={handleSave}>
        Lưu
      </Button>
      {(formData && renterData && staffData) || action === "add" ? (
        <>
          <Grid
            sx={{
              padding: "8px",
              height: "calc(100% - 60px)",
              overflow: "auto",
            }}
            container>
            <Grid
              sx={{
                marginTop: 2,
                width: "100%",
              }}
              item>
              <Typography variant="h5">Bên A: HỌC VIÊN KỸ THUẬT MẬT MÃ</Typography>
            </Grid>
            <Grid container spacing={2}>
              {formDataA.map((field, index) => (
                <Grid item xs={6} key={field.id +index}>
                  <Grid container alignItems="center">
                    <Grid item xs={5}>
                      <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      {field.type === "select" && field.options ? (
                        <FormControl fullWidth>
                        <Select
                          name={field.id}
                          ref={field?.ref}
                          size="small"
                          id={field.id}
                          onChange={hanldeOnChangefield}
                          defaultValue={data ? data[field.id] : ""}
                        >
                          {(() => {
                            if (field.id === "fullName") {
                              return listStaff.map((staff, index) => (
                                <MenuItem key={staff.id+index} value={staff.username}>
                                  {staff.fullName}
                                </MenuItem>
                              ));
                            } 
                          })()}
                        </Select>
                      </FormControl>
                      ) : (
                        <TextField
                          size="small"
                          fullWidth
                          inputRef={field?.ref}
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          defaultValue={field.defaultValue}
                          onChange={hanldeOnChangefield}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            <Grid
              sx={{
                marginTop: 2,
                width: "100%",
              }}
              item>
              <Typography variant="h5">Bên B</Typography>
            </Grid>
            <Grid container spacing={2}>
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
                          onChange={hanldeOnChangefield}
                          defaultValue={data ? data[field.id] : ""}
                        >
                          {(() => {
                            if (field.id === "per_b") {
                              const data = listStaff.filter((staff) => staff.jobTitle === "Giảng viên mời");
                              return data.map((staff, index) => (
                                <MenuItem key={staff.id + index} value={staff.username}>
                                  {staff.fullName}
                                </MenuItem>
                              ));
                            }
                          })()}
                        </Select>
                      </FormControl>
                      ) : (
                        <TextField
                          size="small"
                          fullWidth
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          defaultValue={field.defaultValue}
                          onChange={hanldeOnChangefield}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid
              sx={{
                marginTop: 2,
                width: "100%",
              }}
              item>
              <Typography variant="h5">Thông tin hợp đồng</Typography>
            </Grid>
            <Grid container spacing={2}>
              {formDataC.map((field, index) => (
                <Grid item xs={6} key={field.id +index}>
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
                            defaultValue={
                              field.defaultValue || field.options[0].value
                            }
                            onChange={hanldeOnChangefield}>
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
                          defaultValue={field.defaultValue}
                          onChange={hanldeOnChangefield}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      ) : (
        <>loading</>
      )}
    </>
  );
};
