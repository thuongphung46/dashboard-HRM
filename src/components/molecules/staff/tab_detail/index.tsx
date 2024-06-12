import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ChangeEvent,
} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { InfoStaff } from "./info_staff";
import { WorkingHistory } from "./working_history";
import { Analytic } from "components/molecules/staff/tab_analytic";
import { useNavigate, useParams } from "react-router-dom";
import { useGetStaff } from "services/hooks/useGetListStaff";
import { Action } from "types/action";
import { StaffService } from "services/staff_service";
import { MessageCode } from "types/enum/message_code";
import { toastMessage } from "components/molecules/toast_message";
import { initStaffInfo } from "services/mock_data/staff_info";
import HRMStorage from "common/function";
import { KeyValue } from "constants/GlobalConstant";
import { TeachingContract } from "../tab_teaching_contract";
import { useConfirm } from "material-ui-confirm";
import { PopupImportCV } from "components/atoms/popup";
import { AIService } from "services/ai_service";
import { ICV } from "types/ai_scan";

interface Props extends Action { }

export const TabDetailStaff: FC<Props> = ({ action }) => {
  const { id } = useParams();
  const confirm = useConfirm();
  const navigate = useNavigate();
  //#region state
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [formData, setFormData] = useState<any>({});
  const [dataDetailMe, setDataDetailMe] = useState<any>(initStaffInfo);
  const [dataScan, setDataScan] = useState<ICV>({});
  const [dataDetail, setDataDetail] = useState<any>(initStaffInfo);
  const [isScanning, setIsScanning] = useState(false); // New state for controlling visibility

  const { data, loading } = useGetStaff(id);
  const level = HRMStorage.get(KeyValue.Level);
  //#endregion

  useEffect(() => {
    if (data) {
      setDataDetail(data);
    }
  }, [data]);

  useEffect(() => {
    const fetch = async () => {
      const res = await StaffService.GetMyProfile();
      if (res.msg_code === MessageCode.Success) {
        setDataDetailMe(res.content);
      } else {
        toastMessage(res.message, "error");
      }
    };
    if (action === "me") {
      fetch();
    }
  }, [data, action]);

  useEffect(() => {
    if (dataScan && action === "add") {
      setDataDetail((prevDataDetail: any) => ({
        ...prevDataDetail,
        fullName: dataScan.name,
        dateOfBirth: dataScan.dateOfBirth,
        currentPlace: dataScan.address,
        phoneNumber: dataScan.phoneNumber,
        personalEmail: dataScan.email,
        introduction: dataScan.introduction,
        education: dataScan.education,
        experience: dataScan.experience,
        skills: dataScan.skills,
        languages: dataScan.languages,
        certifications: dataScan.certifications,
      }));
      setFormData({
        fullName: dataScan.name,
        dateOfBirth: dataScan.dateOfBirth,
        currentPlace: dataScan.address,
        phoneNumber: dataScan.phoneNumber,
        personalEmail: dataScan.email,
      });
      setOpen(false);
    }
  }, [action, dataScan]);

  const handleSubmit = useCallback(async () => {
    if (!file) {
      toastMessage("Chưa chọn file", "error");
      return;
    }
    setIsScanning(true); // Set scanning state to true
    const res = await AIService.Scan(file);
    setIsScanning(false); // Set scanning state to false after scanning
    if (res.msg_code === MessageCode.Success) {
      setDataScan(res.content);
      toastMessage("Quét thành công", "success");
    } else {
      toastMessage("Quét thất bại", "error");
    }
  }, [file]);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleOnClickSave = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (action === "add") {
        StaffService.createStaff(formData)
          .then((res) => {
            if (res.msg_code === MessageCode.Success) {
              toastMessage("Thành công", "success");
            } else {
              toastMessage(res.message, "error");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (id) {
        StaffService.UpdateInfoStaff(formData, id)
          .then((res) => {
            if (res.msg_code === MessageCode.Success) {
              if (level !== "LEVEL_4") {
                toastMessage("Đã gửi yêu cầu cập nhật thành công", "success");
              } else {
                setDataDetail({
                  ...dataDetail,
                  ...formData,
                });
                toastMessage("Thành công", "success");

              }
            } else {
              toastMessage(res.message, "error");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (action === "me") {
        let id = HRMStorage.get(KeyValue.id);
        StaffService.UpdateInfoStaff(formData, id)
          .then((res) => {
            if (res.msg_code === MessageCode.Success) {
              toastMessage("Thành công", "success");
            } else {
              toastMessage(res.message, "error");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [action, dataDetail, formData, id, level]
  );

  const handleExit = useCallback(() => {
    if (formData) {
      confirm({
        title: "Xác nhận thoát",
        description: "Bạn có muốn thoát không?",
        confirmationText: "Thoát",
        cancellationText: "Hủy",
      })
        .then(() => navigate(-1))
        .catch(() => console.log("Thoát không thành công"));
    } else {
      navigate(-1);
    }
  }, [confirm, formData, navigate]);

  const renderTabPannel = useMemo(() => {
    return (
      <>
        <TabPanel value={value} index={0}>
          {!isScanning && action === "add" && (
            <InfoStaff
              formData={formData}
              setFormData={setFormData}
              action={action}
              data={dataDetail}
              handleSave={handleOnClickSave}
            />
          )}
          {action === "edit" && dataDetail && dataDetail?.departmentId && (
            <InfoStaff
              formData={formData}
              setFormData={setFormData}
              action={action}
              data={dataDetail}
              handleSave={handleOnClickSave}
            />
          )}
          {action === "me" && dataDetailMe && dataDetailMe?.id && (
            <InfoStaff
              formData={formData}
              setFormData={setFormData}
              action={action}
              data={dataDetailMe}
              handleSave={handleOnClickSave}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <WorkingHistory
              id={id}
              action={action}
              dataStaffDetail={dataDetail}
              setDataWorkingHistory={(e) => {
                setDataDetail({ ...data, staffWorkingHistoriesInAcademy: e });
              }}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {level !== "LEVEL_1" ? (
            <>
              <Analytic action={action} data={data} />
            </>
          ) : null}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {level === "LEVEL_1" || level === "LEVEL_4" ? (
            <>
              <TeachingContract action={action} />
            </>
          ) : null}
        </TabPanel>
      </>
    );
  }, [
    action,
    data,
    dataDetail,
    dataDetailMe,
    formData,
    handleOnClickSave,
    id,
    level,
    loading,
    value,
    isScanning, // Include isScanning in dependencies
  ]);

  return (
    <div
      style={{
        padding: "8px",
      }}
    >
      <Button size="small" variant="outlined" onClick={handleExit}>
        Thoát
      </Button>
      <Button
        size="small"
        variant="outlined"
        sx={{ marginLeft: "4px" }}
        onClick={() => setOpen(true)}
      >
        Scan
      </Button>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
      >
        <Tab value={0} label="Thông tin chung" />
        {(action === "edit" || action === "me") && (
          <Tab value={1} label="Quá trình làm việc tại đơn vị" />
        )}
        {(action === "edit" || action === "me") && level !== "LEVEL_1" && (
          <Tab value={2} label="Thống kê" />
        )}
        {(action === "edit" || action === "me") &&
          (level === "LEVEL_4" || level === "LEVEL_1") && (
            <Tab value={3} label={"Hợp đồng giảng dạy"} />
          )}
      </Tabs>
      {renderTabPannel}

      <PopupImportCV
        onClose={() => {
          setOpen(false);
        }}
        onImport={(file: File) => {
          setFile(file);
        }}
        open={open}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1, height: "calc(100vh - 180px)", overflow: "auto" }}>
          {children}
        </Box>
      )}
    </div>
  );
}
