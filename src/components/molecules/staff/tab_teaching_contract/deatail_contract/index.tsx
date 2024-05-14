import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetListStaffParams,
  useGetDetailContract,
  useGetListStaff,
  useGetStaffSelected,
} from "services/hooks/useGetListStaff";
import { IContent, IStaff, IRenter } from "types/teaching_contact";
import { useDebouncedCallback } from "use-debounce";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { IFormData } from "components/atoms/field";
import { Typography } from "@mui/material";
import { StaffDetail } from "types/ApplicationType";
import { IListStaff } from "types/list_staff";

interface Props {
  data: StaffDetail;
  action: "add" | "edit";
  formData: any;
  setFormData: (value: React.SetStateAction<StaffDetail>) => void;
}

export const AddNewContract: FC<Props> = ({ data, action }) => {
  const { id } = useParams();

  const refJobTitleA = useRef<any>(null);
  const refphoneNumberA = useRef<any>(null);
  const refBankAccountA = useRef<any>(null);
  const refBankNameA = useRef<any>(null);

  const refJobTitleB = useRef<any>(null);
  const refIdentityCodeB = useRef<any>(null);
  const refIdentityDateB = useRef<any>(null);
  const refplaceOfIssueB = useRef<any>(null);
  const refphoneNumberB = useRef<any>(null);
  const refRatioB = useRef<any>(null);
  const refBankAccountB = useRef<any>(null);
  const refBankNameB = useRef<any>(null);

  const [formData, setFormData] = useState<IContent>();
  const [staffData, setStaffData] = useState<IStaff>();
  const [renterData, setRenterData] = useState<IRenter>();
  const [editData, setEditData] = useState({
    jobTitleRenter: "",
    jobTitle: "",
  });
  const { getStaff } = useGetStaffSelected();

  const { data: contractDetail, loading: detailLoading } = useGetDetailContract(
    action === "edit" ? id : ""
  );

  const [params, setParams] = useState<GetListStaffParams>({
    query: "",
    active: undefined,
    page: 0,
    size: 25,
  });
  const [listStaff, setListStaff] = useState<IListStaff[]>([]);
  const { loading: loadingListStaff, data: listStaffData } =
    useGetListStaff(params);

  useEffect(() => {
    if (contractDetail && contractDetail.staff && contractDetail.renter) {
      setStaffData(contractDetail.staff);
      setRenterData(contractDetail.renter);
      setFormData(contractDetail);
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
      defaultValue: renterData?.username || "",
      options: [],
    },
    {
      id: "jobTitle",
      ref: refJobTitleA,
      label: "Chức vụ:",
      type: "text",
      defaultValue: renterData?.jobTitle || "",
    },
    {
      id: "address",
      label: "Địa chỉ:",
      type: "text",
      defaultValue: "141 Đường Chiến Thắng - Tân Triều - Thanh Trì - Hà Nội.",
    },
    {
      id: "phoneNumberRenter",
      ref: refphoneNumberA,
      label: "Điện thoại:",
      type: "text",
      defaultValue: renterData?.phoneNumber || "",
    },
    {
      id: "bank_a_account",
      ref: refBankAccountA,
      label: "Tài khoản:",
      type: "text",
      defaultValue: renterData?.bankAccount || "",
    },
    {
      id: "bank_a",
      ref: refBankNameA,
      label: "Mở tại:",
      type: "text",
      defaultValue: renterData?.bankName || "",
    },
  ];
  const formDataB: IFormData[] = [
    {
      id: "per_b",
      label: "Ông/Bà:",
      type: "select",
      defaultValue: staffData?.username || "",
      options: [],
    },
    {
      id: "identityCode",
      ref: refIdentityCodeB,
      label: "CCCD:",
      type: "text",
      defaultValue: staffData?.identityCode || "",
    },
    {
      id: "identityDate",
      ref: refIdentityDateB,
      label: "Ngày cấp:",
      type: "text",
      defaultValue: staffData?.identityDate || "",
    },
    {
      id: "identityPlace",
      ref: refplaceOfIssueB,
      label: "Nơi cấp:",
      type: "text",
      defaultValue: staffData?.identityPlace || "",
    },
    {
      id: "jobTitleRenter",
      ref: refJobTitleB,
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
      id: "ratio",
      ref: refRatioB,
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
      id: "phoneNumber",
      ref: refphoneNumberB,
      label: "Điện thoại:",
      type: "text",
      defaultValue: staffData?.phoneNumber || "",
    },
    {
      id: "bank_b_account",
      ref: refBankAccountB,
      label: "Số tài khoản:",
      type: "text",
      defaultValue: staffData?.bankAccount || "",
    },
    {
      id: "bank_b",
      ref: refBankNameB,
      label: "Mở tại:",
      type: "text",
      defaultValue: staffData?.bankName || "",
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
      defaultValue: formData?.teachingAddress || "Học viện Kỹ thuật Mật mã",
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
      type: "number",
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
      label: "Giá trị hợp đồng (bằng chữ):",
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

  const hanldeOnChangefield = useDebouncedCallback(async (e: any) => {
    const { name: field, value } = e.target;

    if (field === "fullName") {
      const selectedStaff = listStaff.find((staff) => staff.username === value);
      const dataDetail = await getStaff(selectedStaff?.id);
      setEditData((prevData) => ({
        ...prevData,
        [field]: value,
        jobTitle: dataDetail ? dataDetail?.jobTitle : "",
        phoneNumberRenter: dataDetail ? dataDetail?.phoneNumber : "",
        bank_a_account: dataDetail ? dataDetail?.bankAccount : "",
        bank_a: dataDetail ? dataDetail?.bankName : "",
        ...dataDetail,
      }));
      refJobTitleA.current.value = selectedStaff?.jobTitle;
      refphoneNumberA.current.value = dataDetail ? dataDetail?.phoneNumber : "";
      refBankAccountA.current.value = dataDetail ? dataDetail?.bankAccount : "";
      refBankNameA.current.value = dataDetail ? dataDetail?.bankName : "";
    } else if (field === "per_b") {
      const selectedStaff = listStaff.find((staff) => staff.username === value);
      const dataDetail = await getStaff(selectedStaff?.id);
      setEditData((prevData) => ({
        ...prevData,
        [field]: value,
        identityCode: dataDetail ? dataDetail.identityCode : "",
        identityDate: dataDetail ? dataDetail.identityDate : "",
        identityPlace: dataDetail ? dataDetail.identityPlace : "",
        jobTitleRenter: dataDetail ? dataDetail.jobTitle : "",
        ratio: dataDetail ? dataDetail.ratio : "",
        phoneNumber: dataDetail ? dataDetail?.phoneNumber : "",
        bank_b_account: dataDetail ? dataDetail?.bankAccount : "",
        bank_b: dataDetail ? dataDetail.bankName : "",
        ...dataDetail,
      }));
      refJobTitleB.current.value = dataDetail ? dataDetail.jobTitle : "";
      refIdentityCodeB.current.value = dataDetail
        ? dataDetail.identityCode
        : "";
      refIdentityDateB.current.value = dataDetail
        ? dataDetail.identityDate
        : "";
      refplaceOfIssueB.current.value = dataDetail
        ? dataDetail.identityPlace
        : "";
      refphoneNumberB.current.value = dataDetail ? dataDetail?.phoneNumber : "";
      refBankAccountB.current.value = dataDetail ? dataDetail?.bankAccount : "";
      refBankNameB.current.value = dataDetail ? dataDetail.bankName : "";
      refRatioB.current.value = dataDetail ? dataDetail.ratio : "";
    } else {
      setEditData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
    handleInputChange();
  }, 500);

  const debounce = useDebouncedCallback(() => {
    const formElement = document.getElementById(
      "createForm"
    ) as HTMLFormElement;
    if (!formElement) {
      console.error("Form element not found");
      return;
    }
    const formData = new FormData(formElement);
    const updatedData: any = {};
    formData.forEach((value, key) => {
      updatedData[key] = value;
    });
    setEditData(updatedData);
  }, 1000);

  const handleInputChange = useCallback(() => {
    debounce();
  }, [debounce]);

  const handleSave = () => {
    console.log(editData);
  };

  // const handleSave = useCallback(() => {
  //   // console.log("staffData: ", staffData);
  //   // console.log("renterData: ", renterData);
  //   // console.log("formData: ", formData);
  //   console.log("formData: ", formData);

  // }, [staffData, renterData, formData, editData]);

  return (
    <>
      <Button sx={{ margin: "4px" }} variant="outlined" onClick={handleSave}>
        Lưu
      </Button>
      {(formData && renterData && staffData) || action === "add" ? (
        <>
          <form id="createForm">
            <Grid
              sx={{
                padding: "8px",
                height: "calc(100% - 60px)",
                overflow: "auto",
              }}
              container
            >
              <Grid
                sx={{
                  marginTop: 2,
                  width: "100%",
                }}
                item
              >
                <Typography variant="h5" marginBottom={2}>
                  Bên A: HỌC VIÊN KỸ THUẬT MẬT MÃ
                </Typography>
              </Grid>
              <Grid container spacing={2}>
                {formDataA.map((field, index) => (
                  <Grid item xs={6} key={field.id + index}>
                    <Grid container alignItems="center">
                      <Grid item xs={5}>
                        <InputLabel htmlFor={field.id}>
                          {field.label}
                        </InputLabel>
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
                              defaultValue={
                                field.defaultValue || field.options[0].value
                              }
                            >
                              {(() => {
                                if (field.id === "fullName") {
                                  return listStaff.map((staff, index) => (
                                    <MenuItem
                                      key={staff.id + index}
                                      value={staff.username}
                                    >
                                      {staff.fullName}
                                    </MenuItem>
                                  ));
                                } else {
                                  return field.options.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                      {option.label}
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
                item
              >
                <Typography variant="h5" marginBottom={2}>
                  Bên B
                </Typography>
              </Grid>
              <Grid container spacing={2}>
                {formDataB.map((field, index) => (
                  <Grid item xs={6} key={field.id}>
                    <Grid container alignItems="center">
                      <Grid item xs={5}>
                        <InputLabel htmlFor={field.id}>
                          {field.label}
                        </InputLabel>
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
                                  const data = listStaff.filter(
                                    (staff) =>
                                      staff.jobTitle === "Giảng viên mời"
                                  );
                                  return data.map((staff, index) => (
                                    <MenuItem
                                      key={staff.id + index}
                                      value={staff.username}
                                    >
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
                item
              >
                <Typography variant="h5" marginBottom={2}>
                  Thông tin hợp đồng
                </Typography>
              </Grid>
              <Grid container spacing={2}>
                {formDataC.map((field, index) => (
                  <Grid item xs={6} key={field.id + index}>
                    <Grid container alignItems="center">
                      <Grid item xs={5}>
                        <InputLabel htmlFor={field.id}>
                          {field.label}
                        </InputLabel>
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
                              onChange={hanldeOnChangefield}
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
          </form>
        </>
      ) : (
        <>loading</>
      )}
    </>
  );
};
